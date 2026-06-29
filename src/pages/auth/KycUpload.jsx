import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, CheckCircle2, X, FileImage } from 'lucide-react'
import AuthLayout from '../../layouts/AuthLayout'
import Button from '../../components/Button'

function UploadZone({ label, hint, icon: Icon, file, onFile, onClear, accept }) {
  const ref = useRef()

  function handleDrop(e) {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) onFile(f)
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[13.5px] font-medium text-(--text)">{label}</p>
      {file ? (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
          <CheckCircle2 size={20} className="text-green-600 dark:text-green-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[13.5px] font-medium text-green-800 dark:text-green-300 truncate">{file.name}</p>
            <p className="text-[12px] text-green-600 dark:text-green-500">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
          <button onClick={onClear} className="text-green-600 dark:text-green-400 hover:text-red-500 transition-colors p-1">
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => ref.current.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="flex flex-col items-center gap-3 p-8 rounded-xl border-2 border-dashed border-(--border-mid) hover:border-navy-400 dark:hover:border-navy-500 bg-(--bg-subtle) hover:bg-navy-50 dark:hover:bg-navy-800/40 transition-all cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-navy-100 dark:bg-navy-800 flex items-center justify-center text-navy-600 dark:text-gold-400">
            <Icon size={22} strokeWidth={1.8} />
          </div>
          <div className="text-center">
            <p className="text-[14px] font-medium text-(--text)">
              Click to upload <span className="text-(--text-muted) font-normal">or drag and drop</span>
            </p>
            <p className="text-[12.5px] text-(--text-muted) mt-1">{hint}</p>
          </div>
        </div>
      )}
      <input ref={ref} type="file" accept={accept} className="hidden"
        onChange={e => { if (e.target.files[0]) onFile(e.target.files[0]) }} />
    </div>
  )
}

export default function KycUpload() {
  const navigate = useNavigate()
  const [idDoc, setIdDoc] = useState(null)
  const [selfie, setSelfie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit() {
    if (!idDoc || !selfie) {
      setError('Please upload both your ID document and selfie to continue.')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => navigate('/auth/kyc-pending'), 1200)
  }

  return (
    <AuthLayout
      step={5}
      totalSteps={6}
      title="Upload your documents"
      subtitle="We need a photo of your NIN card or slip, plus a clear selfie. This takes about 2 minutes."
      backTo="/auth/kyc-nin"
    >
      <div className="flex flex-col gap-6">
        <UploadZone
          label="NIN card / NIN slip"
          hint="JPG, PNG or PDF · Max 5MB"
          icon={FileImage}
          file={idDoc}
          onFile={setIdDoc}
          onClear={() => setIdDoc(null)}
          accept="image/*,.pdf"
        />

        <UploadZone
          label="Selfie (live photo)"
          hint="Look directly at camera, good lighting · JPG or PNG · Max 5MB"
          icon={Camera}
          file={selfie}
          onFile={setSelfie}
          onClear={() => setSelfie(null)}
          accept="image/*"
        />

        <div className="flex flex-col gap-2 p-4 rounded-xl bg-(--bg-subtle) border border-(--border) text-[12.5px] text-(--text-muted)">
          <p className="font-medium text-(--text)">Tips for a good selfie</p>
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>Face the camera directly — no side angles</li>
            <li>Good, even lighting — avoid shadows on your face</li>
            <li>Remove sunglasses and hats</li>
            <li>No filters or edited images</li>
          </ul>
        </div>

        {error && <p className="text-[13px] text-red-500 -mt-2">{error}</p>}

        <Button
          variant="primary" size="lg" className="w-full"
          onClick={handleSubmit} disabled={loading}
        >
          {loading ? 'Submitting documents…' : 'Submit for verification'}
        </Button>
      </div>
    </AuthLayout>
  )
}
