// Dummy data for Kargha Kendra Handloom Cooperative Management System

export const weaversData = [
  {
    id: "W-101",
    name: "Ramesh Devangan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    skill: "Master Weaver (Banarasi Brocade)",
    village: "Sarai Mohana, Varanasi",
    currentTask: "Gold Zari Silk Saree",
    productivity: 96,
    status: "Active",
    experience: "25 Years",
    looms: 2
  },
  {
    id: "W-102",
    name: "Sita Devi",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    skill: "Ikat Warp Designer",
    village: "Pochampally, Telangana",
    currentTask: "Double Ikat Silk Saree",
    productivity: 92,
    status: "Active",
    experience: "15 Years",
    looms: 1
  },
  {
    id: "W-103",
    name: "Madan Lal Salvi",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    skill: "Kota Doria Specialist",
    village: "Kaithoon, Rajasthan",
    currentTask: "Cotton Kota Doria Dupatta",
    productivity: 88,
    status: "Active",
    experience: "18 Years",
    looms: 3
  },
  {
    id: "W-104",
    name: "Anjali Tanti",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    skill: "Eri Silk Spinner",
    village: "Sualkuchi, Assam",
    currentTask: "Assam Eri Silk Shawl",
    productivity: 95,
    status: "Active",
    experience: "12 Years",
    looms: 2
  },
  {
    id: "W-105",
    name: "Gopal Basak",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    skill: "Jamdani Weaver",
    village: "Phulia, West Bengal",
    currentTask: "Fine Cotton Jamdani Saree",
    productivity: 78,
    status: "On Leave",
    experience: "30 Years",
    looms: 2
  },
  {
    id: "W-106",
    name: "Komal Patnisetty",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    skill: "Pochampally Ikat Weaver",
    village: "Koyyalagudem, Andhra Pradesh",
    currentTask: "Cotton Ikat Dress Material",
    productivity: 85,
    status: "Active",
    experience: "8 Years",
    looms: 1
  }
];

export const ordersData = [
  {
    id: "ORD-2026-001",
    buyer: "FabIndia Cooperative",
    date: "2026-07-15",
    items: "50x Banarasi Silk Sarees, 100x Cotton Stoles",
    amount: 385000,
    status: "In Production",
    priority: "High",
    timeline: [
      { status: "Ordered", date: "2026-07-15", done: true },
      { status: "Material Sourced", date: "2026-07-16", done: true },
      { status: "Weaving", date: "2026-07-18", done: true },
      { status: "Quality Check", date: "--", done: false },
      { status: "Shipped", date: "--", done: false }
    ]
  },
  {
    id: "ORD-2026-002",
    buyer: "Craftsvilla Retail",
    date: "2026-07-14",
    items: "200x Kota Doria Dupattas",
    amount: 120000,
    status: "Ready for Dispatch",
    priority: "Medium",
    timeline: [
      { status: "Ordered", date: "2026-07-14", done: true },
      { status: "Material Sourced", date: "2026-07-15", done: true },
      { status: "Weaving", date: "2026-07-16", done: true },
      { status: "Quality Check", date: "2026-07-18", done: true },
      { status: "Shipped", date: "--", done: false }
    ]
  },
  {
    id: "ORD-2026-003",
    buyer: "GoCoop Online",
    date: "2026-07-10",
    items: "10x Double Ikat Silk Masterpieces",
    amount: 250000,
    status: "Shipped",
    priority: "High",
    timeline: [
      { status: "Ordered", date: "2026-07-10", done: true },
      { status: "Material Sourced", date: "2026-07-11", done: true },
      { status: "Weaving", date: "2026-07-12", done: true },
      { status: "Quality Check", date: "2026-07-14", done: true },
      { status: "Shipped", date: "2026-07-16", done: true }
    ]
  },
  {
    id: "ORD-2026-004",
    buyer: "Taneira Handlooms",
    date: "2026-07-08",
    items: "80x Linen Jamdani Sarees",
    amount: 420000,
    status: "Delivered",
    priority: "Critical",
    timeline: [
      { status: "Ordered", date: "2026-07-08", done: true },
      { status: "Material Sourced", date: "2026-07-09", done: true },
      { status: "Weaving", date: "2026-07-10", done: true },
      { status: "Quality Check", date: "2026-07-13", done: true },
      { status: "Shipped", date: "2026-07-14", done: true }
    ]
  }
];

export const productionTasks = [
  {
    id: "TASK-01",
    title: "Varanasi Gold Brocade Saree",
    weaver: "Ramesh Devangan",
    priority: "High",
    progress: 60,
    stage: "Weaving",
    deadline: "2026-07-28"
  },
  {
    id: "TASK-02",
    title: "Warp preparation - Pochampally Ikat Silk",
    weaver: "Sita Devi",
    priority: "Medium",
    progress: 90,
    stage: "Warping",
    deadline: "2026-07-22"
  },
  {
    id: "TASK-03",
    title: "Eri Silk Yarn Dyeing",
    weaver: "Anjali Tanti",
    priority: "High",
    progress: 100,
    stage: "Raw Material",
    deadline: "2026-07-20"
  },
  {
    id: "TASK-04",
    title: "Jamdani Geometrical Border Weaving",
    weaver: "Gopal Basak",
    priority: "Low",
    progress: 15,
    stage: "Weaving",
    deadline: "2026-08-10"
  },
  {
    id: "TASK-05",
    title: "Kota Doria Handblock Print Check",
    weaver: "Madan Lal Salvi",
    priority: "Medium",
    progress: 0,
    stage: "Quality Check",
    deadline: "2026-07-25"
  },
  {
    id: "TASK-06",
    title: "Balaramapuram Fine Cotton Saree Roll",
    weaver: "Komal Patnisetty",
    priority: "High",
    progress: 100,
    stage: "Packaging",
    deadline: "2026-07-21"
  }
];

export const inventoryData = [
  {
    id: "INV-001",
    name: "Mulberry Silk Yarn (Grade A)",
    category: "Silk",
    quantity: "45 kg",
    threshold: "50 kg",
    status: "Low Stock",
    supplier: "Karnataka Silk Board Co.",
    lastUpdated: "2026-07-18"
  },
  {
    id: "INV-002",
    name: "Fine Organic Cotton Yarn (80s Count)",
    category: "Cotton",
    quantity: "240 kg",
    threshold: "100 kg",
    status: "In Stock",
    supplier: "Tamil Nadu Cotton Fed",
    lastUpdated: "2026-07-17"
  },
  {
    id: "INV-003",
    name: "Pure Gold Zari Thread (100m spools)",
    category: "Zari",
    quantity: "12 spools",
    threshold: "15 spools",
    status: "Low Stock",
    supplier: "Surat Zari Emporium",
    lastUpdated: "2026-07-19"
  },
  {
    id: "INV-004",
    name: "Natural Indigo Dye Extract",
    category: "Dyes",
    quantity: "85 kg",
    threshold: "30 kg",
    status: "In Stock",
    supplier: "Andhra Indigo Cultivators",
    lastUpdated: "2026-07-12"
  },
  {
    id: "INV-005",
    name: "Assam Eri Silk Cocoon Fibers",
    category: "Silk",
    quantity: "110 kg",
    threshold: "50 kg",
    status: "In Stock",
    supplier: "Assam Sericulture Dept",
    lastUpdated: "2026-07-15"
  }
];

export const procurementQuotes = [
  {
    id: "REQ-042",
    item: "Mulberry Silk Yarn (100 kg)",
    bids: [
      { supplier: "Karnataka Silk Board Co.", price: 4200, rating: 4.8, selected: true },
      { supplier: "Eastern Sericulture Ltd.", price: 4350, rating: 4.5, selected: false },
      { supplier: "Varanasi Silk Merchants", price: 4500, rating: 4.2, selected: false }
    ],
    status: "Awaiting Cooperative Approval",
    date: "2026-07-18"
  },
  {
    id: "REQ-043",
    item: "Organic Cotton Yarn 120s Count (500 kg)",
    bids: [
      { supplier: "Tamil Nadu Cotton Fed", price: 280, rating: 4.9, selected: false },
      { supplier: "Coimbatore Cotton Mills", price: 275, rating: 4.6, selected: true },
      { supplier: "Deccan Cotton Growers", price: 290, rating: 4.4, selected: false }
    ],
    status: "Approved & PO Released",
    date: "2026-07-17"
  }
];

export const buyersData = [
  {
    id: "BYR-01",
    name: "FabIndia Corporate Sales",
    contact: "Sanjay Verma",
    ordersCount: 45,
    totalSpent: 2840000,
    rating: 4.9,
    status: "Active"
  },
  {
    id: "BYR-02",
    name: "Taneira (A Tata Product)",
    contact: "Aishwarya Sen",
    ordersCount: 32,
    totalSpent: 3450000,
    rating: 4.8,
    status: "Active"
  },
  {
    id: "BYR-03",
    name: "Craftsvilla Retail Portal",
    contact: "Nidhi Sharma",
    ordersCount: 18,
    totalSpent: 980000,
    rating: 4.2,
    status: "Active"
  },
  {
    id: "BYR-04",
    name: "GoCoop Heritage Market",
    contact: "K. R. Rao",
    ordersCount: 29,
    totalSpent: 1890000,
    rating: 4.6,
    status: "Active"
  }
];

export const financeData = {
  kpis: {
    revenue: 1245800,
    expenses: 489200,
    profit: 756600,
    weaversPaid: 320000
  },
  recentTransactions: [
    { id: "TXN-801", date: "2026-07-19", description: "Advance Payment - FabIndia Saree Order", type: "Income", amount: 150000, status: "Cleared" },
    { id: "TXN-802", date: "2026-07-18", description: "Weaver Wage Release (Batch #12)", type: "Expense", amount: 85000, status: "Cleared" },
    { id: "TXN-803", date: "2026-07-17", description: "Silk Yarn Procurement PO #42", type: "Expense", amount: 120000, status: "Pending Approval" },
    { id: "TXN-804", date: "2026-07-15", description: "Final Payment - GoCoop Saree Delivery", type: "Income", amount: 250000, status: "Cleared" }
  ]
};

export const qualityChecks = [
  {
    id: "QC-901",
    fabric: "Banarasi Silk Brocade",
    weaver: "Ramesh Devangan",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400",
    defectsFound: "None - Perfect warp alignment",
    aiConfidence: 98.4,
    status: "Awaiting Review"
  },
  {
    id: "QC-902",
    fabric: "Double Ikat Pochampally",
    weaver: "Sita Devi",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=400",
    defectsFound: "Minor tension variance at border (0.2mm)",
    aiConfidence: 91.2,
    status: "Awaiting Review"
  }
];

export const communicationAlerts = [
  { id: "COM-01", type: "Emergency", sender: "System", content: "Monsoon rainfall alert in Handloom Clusters. Please verify warehouse roof covers.", time: "10 mins ago" },
  { id: "COM-02", type: "Broadcast", sender: "President of Cooperative", content: "National Handloom Day Exhibition participation forms are open until July 31st.", time: "2 hrs ago" },
  { id: "COM-03", type: "Reminder", sender: "Finance Manager", content: "Submit monthly yarn utilization report for government subsidy claim by tomorrow.", time: "4 hrs ago" }
];

export const learningCourses = [
  { id: "LRN-01", title: "Advanced Zari Inserting Techniques", type: "Video Tutorial", duration: "45 mins", completionRate: 85, category: "Skills" },
  { id: "LRN-02", title: "NHDP Government Weaver Mudra Loan Scheme Guide", type: "Government Schemes", duration: "15 mins Read", completionRate: 60, category: "Financial" },
  { id: "LRN-03", title: "Ergonomics & Posture Safety for Handloom Weavers", type: "Health & Safety", duration: "30 mins Video", completionRate: 95, category: "Safety" }
];

export const userManagement = {
  roles: ["Cooperative Admin", "Production Manager", "Quality Inspector", "Finance Officer"],
  users: [
    { id: "USR-01", name: "Anish Devangan", email: "anish@kargha.gov.in", role: "Cooperative Admin", permissions: ["Read", "Write", "Delete"] },
    { id: "USR-02", name: "Meera Nair", email: "meera.nair@kargha.in", role: "Production Manager", permissions: ["Read", "Write"] },
    { id: "USR-03", name: "Dr. R. K. Sen", email: "sen.inspector@kargha.in", role: "Quality Inspector", permissions: ["Read", "Write"] },
    { id: "USR-04", name: "Pranav Shah", email: "pranav.shah@kargha.in", role: "Finance Officer", permissions: ["Read", "Write"] }
  ]
};

export const analyticsTimelineData = {
  week: [
    { name: "Mon", production: 12, sales: 8, orders: 15 },
    { name: "Tue", production: 18, sales: 12, orders: 20 },
    { name: "Wed", production: 15, sales: 10, orders: 18 },
    { name: "Thu", production: 22, sales: 15, orders: 25 },
    { name: "Fri", production: 25, sales: 18, orders: 30 },
    { name: "Sat", production: 20, sales: 20, orders: 24 },
    { name: "Sun", production: 8, sales: 5, orders: 10 }
  ],
  month: [
    { name: "Jan", production: 320, sales: 240, orders: 380 },
    { name: "Feb", production: 400, sales: 310, orders: 420 },
    { name: "Mar", production: 450, sales: 390, orders: 490 },
    { name: "Apr", production: 390, sales: 320, orders: 410 },
    { name: "May", production: 480, sales: 420, orders: 510 },
    { name: "Jun", production: 520, sales: 490, orders: 580 },
    { name: "Jul", production: 600, sales: 540, orders: 630 }
  ],
  year: [
    { name: "2022", production: 4200, sales: 3800, orders: 4500 },
    { name: "2023", production: 4800, sales: 4500, orders: 5100 },
    { name: "2024", production: 5600, sales: 5200, orders: 5900 },
    { name: "2025", production: 6800, sales: 6500, orders: 7200 }
  ]
};
