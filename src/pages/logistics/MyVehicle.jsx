import { useState } from 'react'
import { CheckCircle2, Truck } from 'lucide-react'
import LogisticsLayout from '../../layouts/LogisticsLayout'
import { FormInput, FormSelect } from '../../components/FormInput'
import Button from '../../components/Button'
import { logisticsProfile } from '../../data/logisticsData'

export default function MyVehicle() {
  const [saved, setSaved] = useState(false)
  const [fields, setFields] = useState({
    vehicleType: logisticsProfile.vehicle,
    plate: logisticsProfile.plate,
    capacity: '3 tonnes',
    pricePerKm: logisticsProfile.pricePerKm,
    coverage: 'All Plateau State LGAs',
    available: true,
  })
  function set(k) { return e => setFields(f=>({...f,[k]:e.target.value})) }

  return (
    <LogisticsLayout title="My Vehicle">
      <div className="px-6 lg:px-8 py-8 max-w-[600px] mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">My vehicle</h1>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">Keep your vehicle details accurate so farmers can make informed booking decisions.</p>
        </div>
        {saved && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-[14px] mb-5">
            <CheckCircle2 size={16}/> Vehicle details saved.
          </div>
        )}
        <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-6 flex flex-col gap-5">
          <div className="flex items-center gap-4 pb-2 border-b border-[var(--border)]">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400"><Truck size={22} strokeWidth={1.8}/></div>
            <div>
              <p className="text-[15px] font-medium text-[var(--text)]">{fields.vehicleType}</p>
              <p className="text-[13px] text-[var(--text-muted)]">Plate: {fields.plate}</p>
            </div>
            <span className={`ml-auto text-[12px] font-medium px-3 py-1.5 rounded-full border ${fields.available?'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800':'bg-[var(--bg-subtle)] text-[var(--text-muted)] border-[var(--border)]'}`}>
              {fields.available ? 'Available' : 'Busy'}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput label="Vehicle type" id="vehicleType" value={fields.vehicleType} onChange={set('vehicleType')}/>
            <FormInput label="Plate number"  id="plate"       value={fields.plate}       onChange={set('plate')}/>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput label="Load capacity" id="capacity"    value={fields.capacity}    onChange={set('capacity')} hint="e.g. 3 tonnes"/>
            <FormInput label="Base rate (₦/km)" id="pricePerKm" type="number" value={fields.pricePerKm} onChange={set('pricePerKm')}/>
          </div>
          <FormInput label="Coverage area" id="coverage" value={fields.coverage} onChange={set('coverage')} hint="LGAs or regions you serve"/>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-[14px] font-medium text-[var(--text)]">Available for pickups</p>
              <p className="text-[13px] text-[var(--text-muted)] mt-0.5">Toggle off when you're on a delivery or unavailable</p>
            </div>
            <button onClick={()=>setFields(f=>({...f,available:!f.available}))}
              className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${fields.available?'bg-navy-600':'bg-[var(--border-mid)]'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${fields.available?'left-6':'left-1'}`}/>
            </button>
          </div>
          <Button variant="primary" size="lg" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2500)}}>Save vehicle details</Button>
        </div>
      </div>
    </LogisticsLayout>
  )
}
