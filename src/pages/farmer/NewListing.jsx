import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Upload, X, ChevronLeft, CheckCircle2 } from 'lucide-react'
import FarmerLayout from '../../layouts/FarmerLayout'
import { FormInput, FormSelect } from '../../components/FormInput'
import Button from '../../components/Button'
import api from '../../lib/api'

const CATEGORIES = ['Tubers','Vegetables','Grains','Fruits','Legumes','Spices']
const UNITS      = ['50kg bag','100kg bag','basket','net','crate','tonne','kg','bunch']
const LGAS       = ['Barkin Ladi','Bassa','Bokkos','Jos East','Jos North','Jos South','Kanam','Kanke','Langtang North','Langtang South','Mangu','Mikang','Pankshin',"Qua'an Pan",'Riyom','Shendam','Wase']

function ImageUpload({ images, setImages }) {
  const ref = useRef()
  function handleFiles(files) {
    const valid = Array.from(files).filter(f => f.type.startsWith('image/') && f.size < 5_000_000)
    const previews = valid.map(f => ({ file: f, url: URL.createObjectURL(f) }))
    setImages(prev => [...prev, ...previews].slice(0, 4))
  }
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[13.5px] font-medium text-(--text)">Produce photos <span className="text-(--text-muted) font-normal">(up to 4)</span></p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-(--border) group">
            <img src={img.url} alt="" className="w-full h-full object-cover" />
            <button onClick={() => setImages(p => p.filter((_, j) => j !== i))}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <X size={12} />
            </button>
            {i === 0 && <span className="absolute bottom-1.5 left-1.5 text-[10px] font-medium bg-navy-600 text-white px-1.5 py-0.5 rounded-full">Cover</span>}
          </div>
        ))}
        {images.length < 4 && (
          <button onClick={() => ref.current.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-(--border-mid) hover:border-navy-400 dark:hover:border-navy-500 bg-(--bg-subtle) hover:bg-navy-50 dark:hover:bg-navy-800/40 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-navy-100 dark:bg-navy-800 flex items-center justify-center text-navy-600 dark:text-gold-400"><Upload size={16}/></div>
            <span className="text-[12px] text-(--text-muted)">Add photo</span>
          </button>
        )}
      </div>
      <p className="text-[12px] text-(--text-muted)">JPG or PNG · Max 5MB each · First photo becomes the cover</p>
      <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />
    </div>
  )
}

function validate(f) {
  const e = {}
  if (!f.produce.trim()) e.produce = 'Produce name is required'
  if (!f.category)       e.category = 'Select a category'
  if (!f.quantity.trim())e.quantity = 'Quantity is required'
  if (!f.unit)           e.unit = 'Select a unit'
  if (!f.price || isNaN(f.price) || Number(f.price) <= 0) e.price = 'Enter a valid price'
  if (!f.harvestDate)    e.harvestDate = 'Harvest date is required'
  if (!f.lga)            e.lga = 'Select your LGA'
  return e
}

export default function NewListing() {
  const navigate = useNavigate()
  const [images, setImages]   = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors]   = useState({})
  const [fields, setFields]   = useState({ produce:'', category:'', quantity:'', unit:'', price:'', harvestDate:'', lga:'', description:'', minOrder:'' })

  function set(key) { return e => { setFields(f=>({...f,[key]:e.target.value})); setErrors(er=>({...er,[key]:undefined})) } }

  async function handleSubmit() {
    const errs = validate(fields)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setErrors({})

    try {
      const formData = new FormData()
      formData.append('produce', fields.produce)
      formData.append('category', fields.category)
      formData.append('description', fields.description)
      formData.append('quantity', fields.quantity)
      formData.append('unit', fields.unit)
      formData.append('price', fields.price)
      formData.append('minOrder', fields.minOrder)
      formData.append('lga', fields.lga)
      formData.append('harvestDate', fields.harvestDate)
      images.forEach((img) => formData.append('photos', img.file))

      await api.post('/listings', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setSuccess(true)
      setTimeout(() => navigate('/farmer/listings'), 1800)
    } catch (err) {
      setErrors({ form: err.response?.data?.message || 'Unable to publish listing right now.' })
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <FarmerLayout title="New Listing">
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="font-display text-[24px] text-navy-700 dark:text-navy-100 mb-2">Listing published!</h2>
          <p className="text-[14.5px] text-(--text-muted)">Your produce is now visible to buyers across Plateau State. Redirecting…</p>
        </div>
      </div>
    </FarmerLayout>
  )

  return (
    <FarmerLayout title="New Listing">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-8">
        <Link to="/farmer/listings" className="inline-flex items-center gap-1.5 text-[13.5px] text-(--text-muted) hover:text-navy-600 dark:hover:text-gold-400 transition-colors mb-7">
          <ChevronLeft size={15}/> Back to listings
        </Link>
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Add new listing</h1>
          <p className="mt-1 text-[14.5px] text-(--text-muted)">Post your produce for buyers to find and order directly.</p>
        </div>
        <div className="bg-(--bg) rounded-2xl border border-(--border) p-6 lg:p-8 flex flex-col gap-7">
          <section className="flex flex-col gap-4">
            <h2 className="text-[15px] font-medium text-(--text) pb-2 border-b border-(--border)">Produce details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="Produce name" id="produce" placeholder="e.g. Irish potato" value={fields.produce} onChange={set('produce')} error={errors.produce}/>
              <FormSelect label="Category" id="category" value={fields.category} onChange={set('category')} error={errors.category}>
                <option value="">Select category</option>
                {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
              </FormSelect>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13.5px] font-medium text-(--text)">Description</label>
              <textarea rows={3} placeholder="Grade, quality, growing method, any details buyers should know…" value={fields.description} onChange={set('description')}
                className="w-full px-4 py-3 rounded-xl border border-(--border-mid) bg-(--bg) text-(--text) placeholder:text-(--text-muted) text-[15px] outline-none resize-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800 transition-all"/>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-[15px] font-medium text-(--text) pb-2 border-b border-(--border)">Quantity & pricing</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="Available quantity" id="quantity" placeholder="e.g. 80 bags" value={fields.quantity} onChange={set('quantity')} error={errors.quantity}/>
              <FormSelect label="Unit" id="unit" value={fields.unit} onChange={set('unit')} error={errors.unit}>
                <option value="">Select unit</option>
                {UNITS.map(u=><option key={u} value={u}>{u}</option>)}
              </FormSelect>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="Price per unit (₦)" id="price" type="number" inputMode="numeric" placeholder="e.g. 38500" value={fields.price} onChange={set('price')} error={errors.price} hint="Buyers can still make offers"/>
              <FormInput label="Minimum order quantity" id="minOrder" placeholder="e.g. 5 bags (optional)" value={fields.minOrder} onChange={set('minOrder')}/>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-[15px] font-medium text-(--text) pb-2 border-b border-(--border)">Location & harvest</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormSelect label="Farm LGA" id="lga" value={fields.lga} onChange={set('lga')} error={errors.lga}>
                <option value="">Select your LGA</option>
                {LGAS.map(l=><option key={l} value={l}>{l}</option>)}
              </FormSelect>
              <FormInput label="Expected harvest date" id="harvestDate" type="date" value={fields.harvestDate} onChange={set('harvestDate')} error={errors.harvestDate} hint="Helps buyers plan their orders"/>
            </div>
          </section>

          <ImageUpload images={images} setImages={setImages}/>

          {fields.price && fields.unit && (
            <div className="p-4 rounded-xl bg-navy-50 dark:bg-navy-800/60 border border-navy-200 dark:border-navy-700 flex items-center justify-between">
              <span className="text-[13.5px] text-navy-700 dark:text-navy-200">Your listing price</span>
              <span className="font-mono font-medium text-navy-700 dark:text-gold-400">₦{Number(fields.price||0).toLocaleString('en-NG')} / {fields.unit}</span>
            </div>
          )}

          {errors.form && <p className="text-[13px] text-red-500">{errors.form}</p>}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button variant="primary" size="lg" onClick={handleSubmit} disabled={loading} className="flex-1 sm:flex-none">
              {loading ? 'Publishing…' : 'Publish listing'}
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/farmer/listings')}>Cancel</Button>
          </div>
        </div>
      </div>
    </FarmerLayout>
  )
}
