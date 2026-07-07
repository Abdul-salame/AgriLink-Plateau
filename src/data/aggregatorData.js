export const aggregatorProfile = {
  name: 'Yakubu Mohammed',
  firstName: 'Yakubu',
  businessName: 'Mohammed Agro Aggregators',
  lga: 'Pankshin',
  avatar: 'YM',
  memberSince: 'February 2024',
  kycStatus: 'approved',
}

export const aggregatorStats = [
  { label: 'Farmers managed',  value: '14',         sub: '+2 this month',       trend: 'up'     },
  { label: 'Active listings',  value: '8',          sub: '3 expiring this week', trend: 'neutral' },
  { label: 'Total orders',     value: '47',         sub: '+6 this month',       trend: 'up'     },
  { label: 'Total earnings',   value: '₦2,340,000', sub: '₦380,000 this month', trend: 'up'     },
]

export const farmerNetwork = [
  { id: 'USR-001', name: 'Danjuma Pwajok',  lga: 'Bokkos',      produce: 'Irish potato',  verified: true,  listings: 3, commission: 8  },
  { id: 'USR-004', name: 'Yakubu Garkuwa',  lga: 'Riyom',       produce: 'Carrot',         verified: true,  listings: 2, commission: 8  },
  { id: 'USR-005', name: 'Ruth Gyang',      lga: 'Jos South',   produce: 'Cabbage',        verified: true,  listings: 2, commission: 10 },
  { id: 'USR-008', name: 'Grace Mwanret',   lga: 'Pankshin',    produce: 'Fonio',           verified: false, listings: 1, commission: 8  },
  { id: 'USR-009', name: 'Daniel Choji',    lga: 'Mangu',       produce: 'Sweet pepper',   verified: true,  listings: 2, commission: 9  },
  { id: 'USR-012', name: 'Ibrahim Jang',    lga: 'Wase',        produce: 'Soybean',        verified: true,  listings: 1, commission: 8  },
]

export const bulkListings = [
  { id: 'BLK-004', produce: 'Irish potato',  qty: '200 bags (50kg)', price: 37000, unit: '50kg bag', farmers: 3, status: 'active',  harvestDate: '28 Jun 2026', views: 84, offers: 6  },
  { id: 'BLK-003', produce: 'Carrot',         qty: '80 bags (50kg)',  price: 26000, unit: '50kg bag', farmers: 2, status: 'active',  harvestDate: '02 Jul 2026', views: 41, offers: 2  },
  { id: 'BLK-002', produce: 'Cabbage',         qty: '300 nets',        price: 9000,  unit: 'net',      farmers: 2, status: 'active',  harvestDate: '30 Jun 2026', views: 67, offers: 4  },
  { id: 'BLK-001', produce: 'Fonio',            qty: '30 bags',         price: 62000, unit: '100kg bag',farmers: 1, status: 'sold',   harvestDate: '15 Jun 2026', views: 120, offers: 0 },
]

export const aggregatorOrders = [
  { id: 'ORD-0041', buyer: 'Aisha Musa',       produce: 'Irish potato',  qty: '50 bags',  amount: 1850000, status: 'confirmed',  date: '24 Jun 2026' },
  { id: 'ORD-0039', buyer: 'Emeka Okafor Ltd', produce: 'Cabbage',        qty: '100 nets', amount: 900000,  status: 'delivered',  date: '20 Jun 2026' },
  { id: 'ORD-0037', buyer: 'Jos Fresh Market', produce: 'Carrot',         qty: '20 bags',  amount: 520000,  status: 'delivered',  date: '17 Jun 2026' },
  { id: 'ORD-0035', buyer: 'Fatima Sale',       produce: 'Irish potato',  qty: '30 bags',  amount: 1110000, status: 'in_transit', date: '12 Jun 2026' },
]

export const earningsChart = [
  { month: 'Jan', earnings: 180000 },
  { month: 'Feb', earnings: 240000 },
  { month: 'Mar', earnings: 310000 },
  { month: 'Apr', earnings: 275000 },
  { month: 'May', earnings: 420000 },
  { month: 'Jun', earnings: 380000 },
]
