export const logisticsProfile = {
  name: 'Plateau Swift Haulage',
  firstName: 'Plateau',
  contactName: 'Emmanuel Dachung',
  lga: 'Jos North',
  avatar: 'PS',
  memberSince: 'January 2024',
  kycStatus: 'approved',
  vehicle: 'Mitsubishi Canter (3-tonne)',
  plate: 'ABC-123-XY',
  coverage: 'All Plateau State LGAs',
  pricePerKm: 850,
}

export const logisticsStats = [
  { label: 'Pending requests',   value: '5',        sub: '2 need response today', trend: 'alert'  },
  { label: 'Active deliveries',  value: '3',        sub: '1 arriving today',      trend: 'neutral' },
  { label: 'Completed',          value: '89',       sub: 'All time',              trend: 'up'     },
  { label: 'Total earned',       value: '₦1,240,000', sub: '₦180,000 this month', trend: 'up'     },
]

export const deliveryRequests = [
  { id: 'REQ-012', farmer: 'Danjuma Pwajok',  farmerLga: 'Bokkos',      produce: 'Irish potato',  qty: '10 bags',   distance: '62km', fee: 52700, pickupDate: '27 Jun 2026', status: 'pending',  phone: '08033344455' },
  { id: 'REQ-011', farmer: 'Blessing Dung',   farmerLga: 'Barkin Ladi', produce: 'Tomato',         qty: '12 baskets',distance: '44km', fee: 37400, pickupDate: '28 Jun 2026', status: 'pending',  phone: '08022233344' },
  { id: 'REQ-010', farmer: 'Ruth Gyang',      farmerLga: 'Jos South',   produce: 'Cabbage',        qty: '30 nets',   distance: '18km', fee: 15300, pickupDate: '29 Jun 2026', status: 'pending',  phone: '08099988776' },
  { id: 'REQ-009', farmer: 'Grace Mwanret',   farmerLga: 'Pankshin',    produce: 'Fonio',           qty: '8 bags',    distance: '88km', fee: 74800, pickupDate: '30 Jun 2026', status: 'pending',  phone: '08055566677' },
  { id: 'REQ-008', farmer: 'Daniel Choji',    farmerLga: 'Mangu',       produce: 'Sweet pepper',   qty: '6 baskets', distance: '54km', fee: 45900, pickupDate: '01 Jul 2026', status: 'pending',  phone: '08077788899' },
]

export const activeDeliveries = [
  { id: 'DEL-007', farmer: 'Yakubu Garkuwa',  produce: 'Carrot',        qty: '8 bags',   from: 'Riyom',    to: 'Jos North',    status: 'in_transit', pickupDate: '23 Jun 2026', fee: 38250 },
  { id: 'DEL-006', farmer: 'Esther Pam',      produce: 'Onion',          qty: '5 bags',   from: 'Bokkos',   to: 'Barkin Ladi',  status: 'picked_up',  pickupDate: '24 Jun 2026', fee: 29750 },
  { id: 'DEL-005', farmer: 'Ibrahim Jang',    produce: 'Soybean',        qty: '4 bags',   from: 'Wase',     to: 'Jos South',    status: 'in_transit', pickupDate: '22 Jun 2026', fee: 63750 },
]

export const completedDeliveries = [
  { id: 'DEL-004', farmer: 'Danjuma Pwajok',  produce: 'Irish potato', qty: '6 bags',   from: 'Bokkos', to: 'Jos North',   date: '20 Jun 2026', fee: 52700, rating: 5 },
  { id: 'DEL-003', farmer: 'Ruth Gyang',      produce: 'Cabbage',       qty: '20 nets',  from: 'Jos South', to: 'Barkin Ladi', date: '17 Jun 2026', fee: 15300, rating: 4 },
  { id: 'DEL-002', farmer: 'Blessing Dung',   produce: 'Tomato',        qty: '8 baskets',from: 'Barkin Ladi', to: 'Jos North', date: '14 Jun 2026', fee: 37400, rating: 5 },
  { id: 'DEL-001', farmer: 'Grace Mwanret',   produce: 'Fonio',          qty: '5 bags',   from: 'Pankshin', to: 'Mangu',      date: '10 Jun 2026', fee: 74800, rating: 5 },
]

export const earningsChart = [
  { month: 'Jan', earned: 95000  },
  { month: 'Feb', earned: 128000 },
  { month: 'Mar', earned: 175000 },
  { month: 'Apr', earned: 142000 },
  { month: 'May', earned: 210000 },
  { month: 'Jun', earned: 180000 },
]
