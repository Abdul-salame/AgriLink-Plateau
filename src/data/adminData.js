export const adminProfile = {
  name: 'Ibrahim Plateau',
  avatar: 'IP',
  role: 'Super Admin',
  email: 'admin@agrilinkplateau.ng',
}

export const platformStats = [
  { label: 'Total users',       value: '3,847',   sub: '+124 this month',  trend: 'up'     },
  { label: 'Active listings',   value: '612',      sub: '+38 this week',    trend: 'up'     },
  { label: 'Total orders',      value: '2,194',    sub: '₦184M+ in value',  trend: 'up'     },
  { label: 'Pending KYC',       value: '27',       sub: '3 flagged',        trend: 'alert'  },
]

export const userGrowthChart = [
  { month: 'Jan', farmers: 180, buyers: 95  },
  { month: 'Feb', farmers: 240, buyers: 130 },
  { month: 'Mar', farmers: 310, buyers: 178 },
  { month: 'Apr', farmers: 390, buyers: 220 },
  { month: 'May', farmers: 460, buyers: 275 },
  { month: 'Jun', farmers: 541, buyers: 312 },
]

export const orderVolumeChart = [
  { month: 'Jan', orders: 210, value: 18400000  },
  { month: 'Feb', orders: 285, value: 24100000  },
  { month: 'Mar', orders: 340, value: 29800000  },
  { month: 'Apr', orders: 412, value: 36200000  },
  { month: 'May', orders: 490, value: 44100000  },
  { month: 'Jun', orders: 457, value: 31900000  },
]

export const recentActivity = [
  { id: 1,  type: 'kyc',     message: 'New KYC submission from Blessing Dung',          time: '5 min ago',  status: 'pending'  },
  { id: 2,  type: 'order',   message: 'Order ORD-0041 marked as delivered',              time: '12 min ago', status: 'success'  },
  { id: 3,  type: 'user',    message: 'New farmer registered — Esther Pam, Bokkos',     time: '28 min ago', status: 'info'     },
  { id: 4,  type: 'dispute', message: 'Dispute raised on order ORD-0038 by Aisha Musa', time: '1 hr ago',   status: 'alert'    },
  { id: 5,  type: 'kyc',     message: 'KYC approved for Daniel Choji',                  time: '2 hrs ago',  status: 'success'  },
  { id: 6,  type: 'listing', message: 'New listing flagged for review — Yusuf Danboyi', time: '3 hrs ago',  status: 'alert'    },
  { id: 7,  type: 'user',    message: 'Buyer account suspended — suspicious activity',   time: '4 hrs ago',  status: 'danger'   },
  { id: 8,  type: 'order',   message: 'Order ORD-0040 in transit — logistics confirmed', time: '5 hrs ago',  status: 'info'     },
]

export const kycQueue = [
  { id: 'KYC-001', name: 'Blessing Dung',    role: 'Farmer',     lga: 'Barkin Ladi', nin: '****56781', submitted: '25 Jun 2026', status: 'pending',  flagged: false, docs: ['NIN slip', 'Selfie'] },
  { id: 'KYC-002', name: 'Yakubu Mohammed',  role: 'Aggregator', lga: 'Pankshin',    nin: '****34521', submitted: '25 Jun 2026', status: 'pending',  flagged: true,  docs: ['NIN slip', 'Selfie'] },
  { id: 'KYC-003', name: 'Grace Pam',        role: 'Farmer',     lga: 'Jos South',   nin: '****89012', submitted: '24 Jun 2026', status: 'pending',  flagged: false, docs: ['NIN card', 'Selfie'] },
  { id: 'KYC-004', name: 'Musa Tanko',       role: 'Buyer',      lga: 'Jos North',   nin: '****22341', submitted: '24 Jun 2026', status: 'pending',  flagged: false, docs: ['NIN slip', 'Selfie'] },
  { id: 'KYC-005', name: 'Rejoice Danladi',  role: 'Logistics',  lga: 'Riyom',       nin: '****67893', submitted: '23 Jun 2026', status: 'pending',  flagged: false, docs: ['NIN card', 'Selfie'] },
  { id: 'KYC-006', name: 'Sunday Bitrus',    role: 'Farmer',     lga: 'Bokkos',      nin: '****11234', submitted: '23 Jun 2026', status: 'approved', flagged: false, docs: ['NIN slip', 'Selfie'] },
  { id: 'KYC-007', name: 'Fatima Lawal',     role: 'Buyer',      lga: 'Mangu',       nin: '****44512', submitted: '22 Jun 2026', status: 'rejected', flagged: false, docs: ['NIN slip', 'Selfie'] },
]

export const allUsers = [
  { id: 'USR-001', name: 'Danjuma Pwajok',  role: 'Farmer',     lga: 'Bokkos',       status: 'active',    joined: 'Jan 2024',  orders: 28, kyc: 'approved'  },
  { id: 'USR-002', name: 'Aisha Musa',      role: 'Buyer',      lga: 'Jos North',    status: 'active',    joined: 'Mar 2024',  orders: 34, kyc: 'approved'  },
  { id: 'USR-003', name: 'Blessing Dung',   role: 'Farmer',     lga: 'Barkin Ladi',  status: 'active',    joined: 'Feb 2024',  orders: 19, kyc: 'pending'   },
  { id: 'USR-004', name: 'Yakubu Garkuwa',  role: 'Farmer',     lga: 'Riyom',        status: 'active',    joined: 'Apr 2024',  orders: 12, kyc: 'approved'  },
  { id: 'USR-005', name: 'Ruth Gyang',      role: 'Farmer',     lga: 'Jos South',    status: 'active',    joined: 'Jan 2024',  orders: 22, kyc: 'approved'  },
  { id: 'USR-006', name: 'Emeka Okafor',    role: 'Buyer',      lga: 'Jos North',    status: 'active',    joined: 'May 2024',  orders: 8,  kyc: 'approved'  },
  { id: 'USR-007', name: 'Yakubu Mohammed', role: 'Aggregator', lga: 'Pankshin',     status: 'suspended', joined: 'Mar 2024',  orders: 5,  kyc: 'pending'   },
  { id: 'USR-008', name: 'Grace Mwanret',   role: 'Farmer',     lga: 'Pankshin',     status: 'active',    joined: 'Jun 2024',  orders: 7,  kyc: 'approved'  },
  { id: 'USR-009', name: 'Daniel Choji',    role: 'Farmer',     lga: 'Mangu',        status: 'active',    joined: 'Feb 2024',  orders: 15, kyc: 'approved'  },
  { id: 'USR-010', name: 'Plateau Haulage', role: 'Logistics',  lga: 'Jos North',    status: 'active',    joined: 'Jan 2024',  orders: 44, kyc: 'approved'  },
  { id: 'USR-011', name: 'Fatima Lawal',    role: 'Buyer',      lga: 'Mangu',        status: 'inactive',  joined: 'May 2024',  orders: 2,  kyc: 'rejected'  },
  { id: 'USR-012', name: 'Ibrahim Jang',    role: 'Farmer',     lga: 'Wase',         status: 'active',    joined: 'Apr 2024',  orders: 9,  kyc: 'approved'  },
]

export const allListings = [
  { id: 'LST-012', farmer: 'Danjuma Pwajok',  produce: 'Irish potato',  lga: 'Bokkos',      price: 38500, qty: '80 bags',    status: 'active',  flagged: false, date: '20 Jun 2026' },
  { id: 'LST-011', farmer: 'Blessing Dung',   produce: 'Tomato',         lga: 'Barkin Ladi', price: 22000, qty: '40 baskets', status: 'active',  flagged: false, date: '19 Jun 2026' },
  { id: 'LST-010', farmer: 'Ruth Gyang',      produce: 'Cabbage',        lga: 'Jos South',   price: 9500,  qty: '100 nets',   status: 'active',  flagged: false, date: '18 Jun 2026' },
  { id: 'LST-009', farmer: 'Yakubu Garkuwa',  produce: 'Carrot',         lga: 'Riyom',       price: 27000, qty: '30 bags',    status: 'active',  flagged: false, date: '17 Jun 2026' },
  { id: 'LST-008', farmer: 'Grace Mwanret',   produce: 'Fonio',           lga: 'Pankshin',    price: 64000, qty: '10 bags',    status: 'active',  flagged: true,  date: '16 Jun 2026' },
  { id: 'LST-007', farmer: 'Yusuf Danboyi',   produce: 'Groundnut',       lga: 'Shendam',     price: 72000, qty: '20 bags',    status: 'active',  flagged: true,  date: '15 Jun 2026' },
  { id: 'LST-006', farmer: 'Daniel Choji',    produce: 'Sweet pepper',   lga: 'Mangu',       price: 35000, qty: '25 baskets', status: 'active',  flagged: false, date: '14 Jun 2026' },
  { id: 'LST-005', farmer: 'Esther Pam',      produce: 'Onion',           lga: 'Bokkos',      price: 58000, qty: '15 bags',    status: 'removed', flagged: true,  date: '13 Jun 2026' },
]

export const allOrders = [
  { id: 'ORD-0041', farmer: 'Danjuma Pwajok',  buyer: 'Aisha Musa',       produce: 'Irish potato',  amount: 385000,  status: 'confirmed',  date: '24 Jun 2026' },
  { id: 'ORD-0040', farmer: 'Blessing Dung',   buyer: 'Emeka Okafor',     produce: 'Tomato',         amount: 264000,  status: 'in_transit', date: '23 Jun 2026' },
  { id: 'ORD-0039', farmer: 'Yakubu Garkuwa',  buyer: 'Aisha Musa',       produce: 'Carrot',         amount: 216000,  status: 'delivered',  date: '21 Jun 2026' },
  { id: 'ORD-0038', farmer: 'Ruth Gyang',      buyer: 'Aisha Musa',       produce: 'Cabbage',        amount: 285000,  status: 'delivered',  date: '20 Jun 2026' },
  { id: 'ORD-0037', farmer: 'Daniel Choji',    buyer: 'Fatima Lawal',     produce: 'Sweet pepper',   amount: 210000,  status: 'pending',    date: '18 Jun 2026' },
  { id: 'ORD-0036', farmer: 'Grace Mwanret',   buyer: 'Emeka Okafor',     produce: 'Fonio',           amount: 640000,  status: 'delivered',  date: '15 Jun 2026' },
  { id: 'ORD-0035', farmer: 'Yusuf Danboyi',   buyer: 'Aisha Musa',       produce: 'Groundnut',       amount: 360000,  status: 'delivered',  date: '12 Jun 2026' },
]

export const disputes = [
  { id: 'DIS-001', order: 'ORD-0038', buyer: 'Aisha Musa',  farmer: 'Ruth Gyang',      issue: 'Produce quality below description — cabbage heads were undersized.', date: '22 Jun 2026', status: 'open',     priority: 'high'   },
  { id: 'DIS-002', order: 'ORD-0036', buyer: 'Emeka Okafor',farmer: 'Grace Mwanret',   issue: 'Delivery was 4 days late. No communication from farmer.',            date: '20 Jun 2026', status: 'open',     priority: 'medium' },
  { id: 'DIS-003', order: 'ORD-0033', buyer: 'Aisha Musa',  farmer: 'Danjuma Pwajok',  issue: 'Short delivery — received 4 bags instead of 5.',                    date: '10 Jun 2026', status: 'resolved', priority: 'medium' },
  { id: 'DIS-004', order: 'ORD-0029', buyer: 'Fatima Lawal',farmer: 'Daniel Choji',    issue: 'Payment not received by farmer despite order marked delivered.',     date: '05 Jun 2026', status: 'resolved', priority: 'high'   },
]

export const adminMarketPrices = [
  { id: 1, crop: 'Irish potato',   unit: '50kg bag',  price: 38500, change: 4.2,  region: 'Bokkos',      lastUpdated: '25 Jun 2026' },
  { id: 2, crop: 'Tomato',         unit: 'basket',    price: 22000, change: -6.8, region: 'Vom',         lastUpdated: '25 Jun 2026' },
  { id: 3, crop: 'Fresh maize',    unit: '100kg bag', price: 31000, change: 1.5,  region: 'Riyom',       lastUpdated: '25 Jun 2026' },
  { id: 4, crop: 'Cabbage',        unit: 'net',       price: 9500,  change: 2.1,  region: 'Barkin Ladi', lastUpdated: '24 Jun 2026' },
  { id: 5, crop: 'Carrot',         unit: '50kg bag',  price: 27000, change: 0.0,  region: 'Bokkos',      lastUpdated: '24 Jun 2026' },
  { id: 6, crop: 'Fonio',          unit: '100kg bag', price: 64000, change: 3.6,  region: 'Mangu',       lastUpdated: '23 Jun 2026' },
  { id: 7, crop: 'Sweet pepper',   unit: 'basket',    price: 35000, change: -2.4, region: 'Jos South',   lastUpdated: '23 Jun 2026' },
  { id: 8, crop: 'Onion',          unit: '100kg bag', price: 58000, change: 5.0,  region: 'Pankshin',    lastUpdated: '22 Jun 2026' },
]
