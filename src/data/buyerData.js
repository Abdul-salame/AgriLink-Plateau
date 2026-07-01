export const buyerProfile = {
  name: 'Abdulsalam Abdulwasiu',
  firstName: 'Abdulsalam',
  lga: 'Jos North',
  businessName: 'Aisha Fresh Supplies',
  type: 'Business buyer',
  avatar: 'AM',
  memberSince: 'March 2024',
}

export const buyerStats = [
  { label: 'Total orders',        value: '34',         sub: '+4 this month',        trend: 'up'     },
  { label: 'Total spent',         value: '₦4,820,000', sub: '₦680,000 this month',  trend: 'up'     },
  { label: 'Pending deliveries',  value: '3',          sub: '1 arriving tomorrow',   trend: 'neutral' },
  { label: 'Saved listings',      value: '12',         sub: '3 expiring this week',  trend: 'neutral' },
]

export const buyerOrders = [
  { id:'ORD-0041', farmer:'Danjuma Pwajok',  farmerLga:'Bokkos',       produce:'Irish potato',  qty:'10 bags (50kg)', amount:385000,  status:'confirmed',  date:'24 Jun 2026', deliveryDate:'27 Jun 2026', phone:'08033344455', note:'Please ensure bags are properly tied.'       },
  { id:'ORD-0040', farmer:'Abubakar ',   farmerLga:'Barkin Ladi',  produce:'Tomato',         qty:'12 baskets',     amount:264000,  status:'in_transit', date:'23 Jun 2026', deliveryDate:'26 Jun 2026', phone:'08022233344', note:''                                            },
  { id:'ORD-0038', farmer:'Yakubu Garkuwa',  farmerLga:'Riyom',        produce:'Carrot',         qty:'8 bags (50kg)',  amount:216000,  status:'delivered',  date:'20 Jun 2026', deliveryDate:'22 Jun 2026', phone:'08011122334', note:''                                            },
  { id:'ORD-0037', farmer:'Ruth Gyang',      farmerLga:'Jos South',    produce:'Cabbage',         qty:'30 nets',        amount:285000,  status:'delivered',  date:'17 Jun 2026', deliveryDate:'19 Jun 2026', phone:'08099988776', note:''                                            },
  { id:'ORD-0035', farmer:'Daniel Choji',    farmerLga:'Mangu',        produce:'Sweet pepper',   qty:'6 baskets',      amount:210000,  status:'delivered',  date:'12 Jun 2026', deliveryDate:'14 Jun 2026', phone:'08077788899', note:''                                            },
  { id:'ORD-0033', farmer:'Danjuma Pwajok',  farmerLga:'Bokkos',       produce:'Irish potato',   qty:'5 bags (50kg)',  amount:192500,  status:'delivered',  date:'05 Jun 2026', deliveryDate:'07 Jun 2026', phone:'08033344455', note:''                                            },
]

export const savedListings = [
  { id:'LST-012', farmer:'Danjuma Pwajok', lga:'Bokkos',      produce:'Irish potato',  price:38500, unit:'50kg bag',  qty:'80 bags',    harvestDate:'28 Jun 2026', verified:true,  category:'Tubers'     },
  { id:'LST-010', farmer:'Blessing Dung',  lga:'Barkin Ladi', produce:'Cabbage',        price:9500,  unit:'net',       qty:'100 nets',   harvestDate:'30 Jun 2026', verified:true,  category:'Vegetables' },
  { id:'LST-008', farmer:'Grace Mwanret',  lga:'Pankshin',    produce:'Fonio',           price:64000, unit:'100kg bag', qty:'10 bags',    harvestDate:'10 Jul 2026', verified:false, category:'Grains'     },
  { id:'LST-006', farmer:'Yusuf Danboyi',  lga:'Shendam',     produce:'Groundnut',       price:72000, unit:'100kg bag', qty:'20 bags',    harvestDate:'15 Jul 2026', verified:true,  category:'Legumes'    },
]

export const produceCatalogue = [
  { id:'LST-012', farmer:'Danjuma Pwajok', lga:'Bokkos',      produce:'Irish potato',  price:38500, unit:'50kg bag',  qty:'80 bags',    harvestDate:'28 Jun 2026', verified:true,  category:'Tubers',     rating:4.8, reviews:34, description:'Grade A highland potatoes, no pesticides. Perfect for bulk buyers and market resale.' },
  { id:'LST-010', farmer:'Blessing Dung',  lga:'Barkin Ladi', produce:'Cabbage',        price:9500,  unit:'net',       qty:'100 nets',   harvestDate:'30 Jun 2026', verified:true,  category:'Vegetables', rating:4.6, reviews:22, description:'Large firm heads, harvested fresh from Barkin Ladi highlands.'                       },
  { id:'LST-009', farmer:'Yakubu Garkuwa', lga:'Riyom',       produce:'Carrot',         price:27000, unit:'50kg bag',  qty:'30 bags',    harvestDate:'02 Jul 2026', verified:true,  category:'Vegetables', rating:4.5, reviews:17, description:'Sweet Riyom carrots, well-sized and clean. Good shelf life.'                        },
  { id:'LST-008', farmer:'Grace Mwanret',  lga:'Pankshin',    produce:'Fonio',           price:64000, unit:'100kg bag', qty:'10 bags',    harvestDate:'10 Jul 2026', verified:false, category:'Grains',     rating:4.3, reviews:9,  description:'Organic fonio, hand-processed. Great for health food buyers.'                      },
  { id:'LST-007', farmer:'Ruth Gyang',     lga:'Jos South',   produce:'Sweet pepper',   price:35000, unit:'basket',    qty:'25 baskets', harvestDate:'01 Jul 2026', verified:true,  category:'Vegetables', rating:4.7, reviews:28, description:'Tatashe variety, mild heat, excellent shelf life and colour.'                       },
  { id:'LST-006', farmer:'Yusuf Danboyi',  lga:'Shendam',     produce:'Groundnut',       price:72000, unit:'100kg bag', qty:'20 bags',    harvestDate:'15 Jul 2026', verified:true,  category:'Legumes',    rating:4.9, reviews:41, description:'Shelled and sun-dried groundnuts. Ideal for processing or resale.'                  },
  { id:'LST-005', farmer:'Daniel Choji',   lga:'Mangu',       produce:'Tomato',          price:22000, unit:'basket',    qty:'40 baskets', harvestDate:'29 Jun 2026', verified:true,  category:'Vegetables', rating:4.4, reviews:19, description:'Roma tomatoes, firm. Good for long-distance transport and market.'                  },
  { id:'LST-004', farmer:'Esther Pam',     lga:'Bokkos',      produce:'Onion',           price:58000, unit:'100kg bag', qty:'15 bags',    harvestDate:'05 Jul 2026', verified:false, category:'Vegetables', rating:4.2, reviews:11, description:'Dry season onions with long shelf life. Well dried and bagged.'                     },
  { id:'LST-003', farmer:'Ibrahim Jang',   lga:'Wase',        produce:'Soybean',         price:88000, unit:'100kg bag', qty:'8 bags',     harvestDate:'20 Jul 2026', verified:true,  category:'Legumes',    rating:4.6, reviews:14, description:'High-protein soybeans, sun-dried and machine-cleaned.'                            },
]

export const messages = [
  { id:1, farmer:'Danjuma Pwajok', lga:'Bokkos',      avatar:'DP', produce:'Irish potato',  lastMessage:'The bags will be ready by Thursday morning.', time:'10:32 AM', unread:2,
    thread:[
      { from:'buyer',  text:'Hi Danjuma, I want to order 10 bags of Irish potato. Is that available?',  time:'9:15 AM'  },
      { from:'farmer', text:'Yes, all 10 bags are available. Ready for pickup or delivery.',              time:'9:22 AM'  },
      { from:'buyer',  text:'Can we do delivery to Jos North? What is your delivery fee?',               time:'9:45 AM'  },
      { from:'farmer', text:'Delivery to Jos North is ₦15,000 extra. I use Plateau Swift Haulage.',      time:'10:01 AM' },
      { from:'buyer',  text:'Okay, let\'s do it. Can I confirm by tomorrow?',                            time:'10:18 AM' },
      { from:'farmer', text:'The bags will be ready by Thursday morning.',                               time:'10:32 AM' },
    ]
  },
  { id:2, farmer:'Blessing Dung', lga:'Barkin Ladi', avatar:'BD', produce:'Tomato', lastMessage:'I can give you 15 baskets at ₦21,000 each if you order today.', time:'Yesterday', unread:0,
    thread:[
      { from:'buyer',  text:'Do you have any tomatoes ready now?',                                        time:'Yesterday 2:10 PM' },
      { from:'farmer', text:'I can give you 15 baskets at ₦21,000 each if you order today.',              time:'Yesterday 2:35 PM' },
    ]
  },
  { id:3, farmer:'Ruth Gyang', lga:'Jos South', avatar:'RG', produce:'Cabbage', lastMessage:'Thank you for your order! We will deliver on Friday.', time:'Mon', unread:0,
    thread:[
      { from:'farmer', text:'Thank you for your order! We will deliver on Friday.',                       time:'Mon 11:00 AM' },
    ]
  },
]

export const spendingChart = [
  { month:'Jan', spent:520000 },
  { month:'Feb', spent:385000 },
  { month:'Mar', spent:710000 },
  { month:'Apr', spent:640000 },
  { month:'May', spent:890000 },
  { month:'Jun', spent:680000 },
]
