export const extensionProfile = {
  name: 'Dr. Rejoice Danladi',
  firstName: 'Rejoice',
  title: 'Agricultural Extension Officer',
  lga: 'Riyom',
  affiliation: 'Plateau State Ministry of Agriculture',
  avatar: 'RD',
  memberSince: 'January 2024',
  kycStatus: 'approved',
}

export const extensionStats = [
  { label: 'Farms verified',      value: '38',  sub: '+4 this month',       trend: 'up'     },
  { label: 'Farmers supported',   value: '62',  sub: 'Across 6 LGAs',      trend: 'up'     },
  { label: 'Advisories posted',   value: '24',  sub: '3 this week',         trend: 'up'     },
  { label: 'Pending verifications',value: '7',  sub: '2 visits overdue',    trend: 'alert'  },
]

export const verificationQueue = [
  { id: 'VER-007', farmer: 'Musa Tanko',      lga: 'Jos North',   produce: 'Onion',         requestDate: '24 Jun 2026', status: 'pending',   visited: false },
  { id: 'VER-006', farmer: 'Sunday Bitrus',   lga: 'Bokkos',      produce: 'Irish potato',  requestDate: '23 Jun 2026', status: 'pending',   visited: false },
  { id: 'VER-005', farmer: 'Rejoice Mwadkon', lga: 'Riyom',       produce: 'Sweet potato',  requestDate: '22 Jun 2026', status: 'pending',   visited: true  },
  { id: 'VER-004', farmer: 'Paul Gyang',      lga: 'Jos South',   produce: 'Tomato',        requestDate: '20 Jun 2026', status: 'pending',   visited: true  },
  { id: 'VER-003', farmer: 'Esther Pam',      lga: 'Bokkos',      produce: 'Carrot',        requestDate: '18 Jun 2026', status: 'approved',  visited: true  },
  { id: 'VER-002', farmer: 'Grace Mwanret',   lga: 'Pankshin',    produce: 'Fonio',          requestDate: '15 Jun 2026', status: 'approved',  visited: true  },
  { id: 'VER-001', farmer: 'Daniel Choji',    lga: 'Mangu',       produce: 'Sweet pepper',  requestDate: '10 Jun 2026', status: 'approved',  visited: true  },
]

export const supportedFarmers = [
  { id: 'USR-001', name: 'Danjuma Pwajok', lga: 'Bokkos',     produce: 'Irish potato', verified: true,  lastContact: '20 Jun 2026' },
  { id: 'USR-004', name: 'Yakubu Garkuwa',lga: 'Riyom',      produce: 'Carrot',        verified: true,  lastContact: '18 Jun 2026' },
  { id: 'USR-005', name: 'Ruth Gyang',    lga: 'Jos South',  produce: 'Cabbage',       verified: true,  lastContact: '15 Jun 2026' },
  { id: 'USR-008', name: 'Grace Mwanret', lga: 'Pankshin',   produce: 'Fonio',          verified: true,  lastContact: '14 Jun 2026' },
  { id: 'USR-009', name: 'Daniel Choji',  lga: 'Mangu',      produce: 'Sweet pepper',  verified: true,  lastContact: '12 Jun 2026' },
  { id: 'USR-012', name: 'Ibrahim Jang',  lga: 'Wase',       produce: 'Soybean',       verified: false, lastContact: '10 Jun 2026' },
]

export const advisories = [
  { id: 'ADV-006', title: 'Early blight alert — tomato farmers in Barkin Ladi', category: 'Pest & Disease', date: '25 Jun 2026', reach: 124, urgent: true,  body: 'Reports of early blight spotted in Barkin Ladi. Farmers should apply copper-based fungicide within 48 hours and remove affected leaves immediately.' },
  { id: 'ADV-005', title: 'Optimal planting window for Irish potato — July 2026', category: 'Planting Guide', date: '22 Jun 2026', reach: 312, urgent: false, body: 'The July planting window for Irish potato in Bokkos and Riyom opens July 5th. Ensure seed selection and soil pH are checked beforehand.' },
  { id: 'ADV-004', title: 'Rainfall forecast — plan your harvest timing', category: 'Weather Alert',  date: '20 Jun 2026', reach: 487, urgent: false, body: 'NIMET forecasts above-average rainfall for Plateau State in late July. Farmers with root crops should plan early harvest to avoid waterlogging.' },
  { id: 'ADV-003', title: 'Subsidy update — fertiliser distribution schedule', category: 'Policy',        date: '17 Jun 2026', reach: 203, urgent: false, body: 'The State Ministry of Agriculture will distribute subsidised NPK fertiliser at LGA headquarters from June 25th. Bring your registration card.' },
]

export const verificationChart = [
  { month: 'Jan', verified: 4 },
  { month: 'Feb', verified: 5 },
  { month: 'Mar', verified: 7 },
  { month: 'Apr', verified: 6 },
  { month: 'May', verified: 8 },
  { month: 'Jun', verified: 8 },
]
