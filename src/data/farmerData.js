export const farmerProfile = {
  name: 'Abduljalil Tajudeen',
  firstName: 'Abduljalil',
  lga: 'Bokkos LGA',
  farmName: 'Pwajok Highland Farms',
  kycStatus: 'approved',
  memberSince: 'January 2024',
  rating: 4.8,
  totalReviews: 34,
  avatar: 'AT',
}

export const earningsSummary = {
  totalEarnings: 1_847_500,
  thisMonth: 312_000,
  lastMonth: 428_000,
  pendingPayout: 97_500,
}

export const farmerStats = [
  { label: 'Total earnings',   value: '₦1,847,500', sub: '+₦312,000 this month',  trend: 'up'   },
  { label: 'Active listings',  value: '6',          sub: '2 expiring this week',   trend: 'neutral'},
  { label: 'Pending orders',   value: '4',          sub: '1 awaiting confirmation', trend: 'up'   },
  { label: 'Completed orders', value: '28',         sub: 'All time',               trend: 'up'   },
]

export const recentOrders = [
  { id: 'ORD-0041', buyer: 'Aisha Musa',       produce: 'Irish potato',      qty: '10 bags (50kg)', amount: 385_000, status: 'confirmed',  date: '24 Jun 2026' },
  { id: 'ORD-0040', buyer: 'Emeka Okafor Ltd', produce: 'Cabbage',           qty: '40 nets',        amount: 380_000, status: 'in_transit', date: '23 Jun 2026' },
  { id: 'ORD-0039', buyer: 'Fatima Sale',      produce: 'Carrot',            qty: '5 bags (50kg)',  amount: 135_000, status: 'delivered',  date: '21 Jun 2026' },
  { id: 'ORD-0038', buyer: 'Jos Fresh Market', produce: 'Sweet pepper',      qty: '8 baskets',      amount: 280_000, status: 'delivered',  date: '19 Jun 2026' },
  { id: 'ORD-0037', buyer: 'Ruth Gyang',       produce: 'Irish potato',      qty: '6 bags (50kg)',  amount: 231_000, status: 'pending',    date: '18 Jun 2026' },
]

export const activeListings = [
  { id: 'LST-012', produce: 'Irish potato',    qty: '80 bags',   price: 38_500, unit: '50kg bag', harvestDate: '28 Jun 2026', views: 47, offers: 3 },
  { id: 'LST-011', produce: 'Carrot',          qty: '30 bags',   price: 27_000, unit: '50kg bag', harvestDate: '02 Jul 2026', views: 29, offers: 1 },
  { id: 'LST-010', produce: 'Cabbage',         qty: '100 nets',  price: 9_500,  unit: 'net',      harvestDate: '30 Jun 2026', views: 63, offers: 5 },
]

export const upcomingHarvests = [
  { produce: 'Irish potato', field: 'Field A', date: '28 Jun 2026', daysLeft: 3,  qty: '80 bags'  },
  { produce: 'Cabbage',      field: 'Field C', date: '30 Jun 2026', daysLeft: 5,  qty: '100 nets' },
  { produce: 'Carrot',       field: 'Field B', date: '02 Jul 2026', daysLeft: 7,  qty: '30 bags'  },
]

export const earningsChart = [
  { month: 'Jan', earnings: 210000, orders: 8  },
  { month: 'Feb', earnings: 185000, orders: 6  },
  { month: 'Mar', earnings: 320000, orders: 11 },
  { month: 'Apr', earnings: 275000, orders: 9  },
  { month: 'May', earnings: 410000, orders: 14 },
  { month: 'Jun', earnings: 312000, orders: 10 },
]

export const priceSnapshot = [
  { crop: 'Irish potato',       price: 38_500, change: 4.2  },
  { crop: 'Tomato',             price: 22_000, change: -6.8 },
  { crop: 'Carrot',             price: 27_000, change: 0.0  },
  { crop: 'Cabbage',            price: 9_500,  change: 2.1  },
  { crop: 'Sweet pepper',       price: 35_000, change: -2.4 },
]

/* ── Charts ── */
export const ordersChart = [
  { month: 'Jan', completed: 3, pending: 1 },
  { month: 'Feb', completed: 5, pending: 2 },
  { month: 'Mar', completed: 2, pending: 3 },
  { month: 'Apr', completed: 7, pending: 1 },
  { month: 'May', completed: 6, pending: 2 },
  { month: 'Jun', completed: 5, pending: 4 },
]

/* ── All listings (for Listings page) ── */
export const allListings = [
  { id: 'LST-012', produce: 'Irish potato', category: 'Tubers',     qty: '80 bags',   unit: '50kg bag', price: 38500,  harvestDate: '28 Jun 2026', status: 'active',  views: 47, offers: 3, description: 'Grade A highland potatoes, no pesticides.' },
  { id: 'LST-011', produce: 'Carrot',        category: 'Vegetables', qty: '30 bags',   unit: '50kg bag', price: 27000,  harvestDate: '02 Jul 2026', status: 'active',  views: 29, offers: 1, description: 'Fresh carrots from Bokkos LGA.' },
  { id: 'LST-010', produce: 'Cabbage',       category: 'Vegetables', qty: '100 nets',  unit: 'net',      price: 9500,   harvestDate: '30 Jun 2026', status: 'active',  views: 63, offers: 5, description: 'Large firm heads, ready for market.' },
  { id: 'LST-009', produce: 'Tomato',        category: 'Vegetables', qty: '20 baskets',unit: 'basket',   price: 22000,  harvestDate: '15 Jun 2026', status: 'sold',    views: 91, offers: 0, description: 'Roma tomatoes, good shelf life.' },
  { id: 'LST-008', produce: 'Fonio',         category: 'Grains',     qty: '10 bags',   unit: '100kg bag',price: 64000,  harvestDate: '10 Jun 2026', status: 'sold',    views: 38, offers: 0, description: 'Organic fonio, hand-processed.' },
  { id: 'LST-007', produce: 'Sweet pepper',  category: 'Vegetables', qty: '15 baskets',unit: 'basket',   price: 35000,  harvestDate: '05 Jun 2026', status: 'expired', views: 22, offers: 0, description: 'Tatashe variety, mild heat.' },
]

/* ── All orders (for Orders page) ── */
export const allOrders = [
  { id: 'ORD-0041', buyer: 'Aisha Musa',        buyerLga: 'Jos North',   produce: 'Irish potato', qty: '10 bags', amount: 385000,  status: 'confirmed',  date: '24 Jun 2026', deliveryDate: '27 Jun 2026', phone: '08012345678', note: 'Please deliver early morning.' },
  { id: 'ORD-0040', buyer: 'Emeka Okafor Ltd',  buyerLga: 'Jos South',   produce: 'Cabbage',      qty: '40 nets', amount: 380000,  status: 'in_transit', date: '23 Jun 2026', deliveryDate: '26 Jun 2026', phone: '08098765432', note: '' },
  { id: 'ORD-0039', buyer: 'Fatima Sale',        buyerLga: 'Mangu',       produce: 'Carrot',       qty: '5 bags',  amount: 135000,  status: 'delivered',  date: '21 Jun 2026', deliveryDate: '23 Jun 2026', phone: '08055544433', note: '' },
  { id: 'ORD-0038', buyer: 'Jos Fresh Market',   buyerLga: 'Jos North',   produce: 'Sweet pepper', qty: '8 baskets', amount: 280000, status: 'delivered', date: '19 Jun 2026', deliveryDate: '21 Jun 2026', phone: '08033322211', note: 'Bulk buyer, good relationship.' },
  { id: 'ORD-0037', buyer: 'Ruth Gyang',         buyerLga: 'Barkin Ladi', produce: 'Irish potato', qty: '6 bags',  amount: 231000,  status: 'pending',    date: '18 Jun 2026', deliveryDate: '25 Jun 2026', phone: '08011122334', note: '' },
  { id: 'ORD-0036', buyer: 'Daniel Choji',       buyerLga: 'Riyom',       produce: 'Cabbage',      qty: '20 nets', amount: 190000,  status: 'delivered',  date: '15 Jun 2026', deliveryDate: '17 Jun 2026', phone: '08077788899', note: '' },
  { id: 'ORD-0035', buyer: 'Plateau Co-op',      buyerLga: 'Jos South',   produce: 'Carrot',       qty: '12 bags', amount: 324000,  status: 'delivered',  date: '12 Jun 2026', deliveryDate: '14 Jun 2026', phone: '08044455566', note: 'Cooperative buyer.' },
]

/* ── Logistics providers ── */
export const logisticsProviders = [
  { id: 'LOG-01', name: 'Plateau Swift Haulage', vehicle: 'Pickup truck (1 tonne)', coverage: 'Jos, Barkin Ladi, Bokkos', pricePerKm: 180, rating: 4.7, trips: 89,  phone: '08022233344', available: true  },
  { id: 'LOG-02', name: 'Dung Transport Co.',    vehicle: 'Mini truck (3 tonnes)',   coverage: 'All Plateau State LGAs',   pricePerKm: 250, rating: 4.9, trips: 156, phone: '08066677788', available: true  },
  { id: 'LOG-03', name: 'Ngyap Haulage',         vehicle: 'Motorcycle (100kg)',      coverage: 'Jos metropolis',           pricePerKm: 80,  rating: 4.5, trips: 43,  phone: '08011199900', available: false },
  { id: 'LOG-04', name: 'Highland Movers',       vehicle: 'Flatbed truck (5 tonnes)',coverage: 'All Plateau State LGAs',   pricePerKm: 320, rating: 4.8, trips: 211, phone: '08099988776', available: true  },
]

/* ── Reviews ── */
export const myReviews = [
  { id: 1, buyer: 'Aisha Musa',       rating: 5, comment: 'Very fresh potatoes, delivered exactly as described. Will buy again!',    date: '20 Jun 2026', produce: 'Irish potato' },
  { id: 2, buyer: 'Jos Fresh Market', rating: 5, comment: 'Consistent quality, reliable farmer. Our preferred Plateau supplier.',     date: '18 Jun 2026', produce: 'Sweet pepper' },
  { id: 3, buyer: 'Fatima Sale',      rating: 4, comment: 'Good carrots but delivery was a day late. Otherwise great.',              date: '15 Jun 2026', produce: 'Carrot'       },
  { id: 4, buyer: 'Daniel Choji',     rating: 5, comment: 'Honest pricing, no surprises. The cabbage was top quality.',             date: '10 Jun 2026', produce: 'Cabbage'      },
  { id: 5, buyer: 'Ruth Gyang',       rating: 4, comment: 'Good produce, responsive communication. Recommend.',                     date: '05 Jun 2026', produce: 'Irish potato' },
]
