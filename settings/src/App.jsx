import React, { useState } from 'react';
import { 
  ChevronRight, ArrowLeft, 
  User, Package, Bell, Lock, Link as LinkIcon, Settings as SettingsIcon,
  Monitor, CircleUserRound, KeyRound, MessageSquareText, Languages, LayoutGrid, CircleHelp, LogOut,
  Camera, Upload, Trash2, Crop, Shield, Mail, Smartphone, MessageCircle, FileText, Activity, MapPin, Search, Check
} from 'lucide-react';

const injectedStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Amita:wght@400;700&family=Quicksand:wght@400;600;700&display=swap');
  
  body {
    background-color: #1F1712;
    color: #F3E7D3;
    font-family: 'Quicksand', sans-serif;
    background-image: linear-gradient(to right, rgba(255,255,255,0.01) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.01) 1px, transparent 1px);
    background-size: 20px 20px;
    -webkit-tap-highlight-color: transparent;
    margin: 0;
    overflow-x: hidden;
  }

  /* Custom Scrollbar (Thread Spool Theme) */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #2B2019;
  }
  ::-webkit-scrollbar-thumb {
    background: #D38A45;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #C27B47;
  }

  .font-amita { font-family: 'Amita', serif; }
  
  .setting-row {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  .setting-row:hover, .setting-row:active {
    background-color: #36261D;
  }
  
  /* Toggle Switch styling (Loom Shuttle concept) */
  .shuttle-toggle:checked + div {
    background-color: #8A4B2A;
  }
  .shuttle-toggle:checked + div > div {
    transform: translateX(100%);
    border-color: #F3E7D3;
  }
`;

// Generic Layout wrapper for all pages
const PageLayout = ({ title, showBack, onBack, children }) => (
  <div className="w-full max-w-2xl mx-auto flex flex-col min-h-screen bg-[#1F1712] text-[#F3E7D3] pb-10">
    <style dangerouslySetInnerHTML={{ __html: injectedStyles }} />
    
    {/* Header / App Bar */}
    <header className="sticky top-0 z-10 bg-[#1F1712]/95 backdrop-blur-sm border-b border-dashed border-[#5A4334] px-4 py-4 flex items-center shadow-md">
      {showBack && (
        <button onClick={onBack} className="mr-4 p-1 hover:bg-[#36261D] rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-[#D5C2AA]" />
        </button>
      )}
      <h1 className="text-xl font-bold font-quicksand tracking-wide">{title}</h1>
    </header>
    
    <main className="flex-grow flex flex-col pt-2">
      {children}
    </main>
  </div>
);

// Navigation Row (like WhatsApp main options)
const NavRow = ({ icon: Icon, title, subtitle, onClick, danger }) => (
  <div className="setting-row flex items-center py-4 px-4 w-full" onClick={onClick}>
    {Icon && (
      <div className={`w-10 flex justify-center flex-shrink-0 ${danger ? 'text-[#C43A3A]' : 'text-[#D5C2AA]'}`}>
        <Icon className="w-6 h-6" />
      </div>
    )}
    <div className={`flex flex-col justify-center flex-grow ${Icon ? 'ml-5' : 'ml-2'}`}>
      <h2 className={`text-lg font-bold leading-tight ${danger ? 'text-[#C43A3A]' : 'text-[#F3E7D3]'}`}>
        {title}
      </h2>
      {subtitle && <p className="text-[#D5C2AA] text-[14px] leading-snug mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

// Toggle Row for Boolean settings
const ToggleRow = ({ title, subtitle, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="setting-row flex items-center py-4 px-4 w-full border-b border-dashed border-[#36261D]" onClick={() => setChecked(!checked)}>
      <div className="flex flex-col justify-center flex-grow pr-4">
        <h2 className="text-lg font-bold text-[#F3E7D3] leading-tight">{title}</h2>
        {subtitle && <p className="text-[#D5C2AA] text-[14px] leading-snug mt-0.5">{subtitle}</p>}
      </div>
      <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in flex-shrink-0">
        <input type="checkbox" name="toggle" checked={checked} readOnly className="shuttle-toggle absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer opacity-0 z-10" />
        <div className={`block overflow-hidden h-6 rounded-full bg-[#36261D] cursor-pointer transition-colors duration-300 ${checked ? 'bg-[#D38A45]' : ''}`}>
          <div className={`h-6 w-6 rounded-full bg-[#F3E7D3] shadow transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </div>
      </div>
    </div>
  );
};

// Simple Input Field Row
const InputRow = ({ label, type = "text", placeholder, value }) => (
  <div className="flex flex-col py-3 px-4 border-b border-dashed border-[#36261D]">
    <label className="text-[#D5C2AA] text-sm font-semibold mb-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      defaultValue={value}
      className="bg-transparent border-none outline-none text-[#F3E7D3] text-lg font-medium w-full placeholder-[#5A4334]"
    />
  </div>
);

// Read-only Info Row
const InfoRow = ({ label, value }) => (
  <div className="flex flex-col py-3 px-4 border-b border-dashed border-[#36261D]">
    <label className="text-[#D5C2AA] text-sm font-semibold mb-1">{label}</label>
    <div className="text-[#F3E7D3] text-lg font-medium">{value}</div>
  </div>
);

// --- 1. PROFILE SECTION ---
const ProfileSubpages = {
  PersonalInfo: ({ onBack }) => (
    <PageLayout title="Personal Information" showBack onBack={onBack}>
      <InputRow label="Full Name" value="Aarav Varma" />
      <InputRow label="Email Address" value="aarav.varma@karghakendra.in" />
      <InputRow label="Mobile Number" value="+91 98765 43210" />
      <InputRow label="Designation" value="Master Weaver" />
      <InfoRow label="Employee/Member ID" value="KK-WVR-2023-089" />
      <div className="mt-6 px-4">
        <button className="w-full bg-[#36261D] text-[#D38A45] py-3 rounded-lg font-bold border border-[#5A4334] hover:bg-[#5A4334] transition-colors">
          Change Password
        </button>
      </div>
    </PageLayout>
  ),
  ProfilePicture: ({ onBack }) => (
    <PageLayout title="Profile Picture" showBack onBack={onBack}>
      <div className="flex flex-col items-center py-8">
        <img src="https://placehold.co/150x150/36261D/D38A45?text=AV" alt="Avatar" className="w-40 h-40 rounded-full border-4 border-[#5A4334] shadow-lg mb-6" />
        <div className="w-full px-4 space-y-3 mt-4">
          <NavRow icon={Camera} title="Take Photo" />
          <NavRow icon={Upload} title="Upload from Gallery" />
          <NavRow icon={Crop} title="Crop / Resize" />
          <NavRow icon={Trash2} title="Remove Photo" danger />
        </div>
      </div>
    </PageLayout>
  ),
  AccountType: ({ onBack }) => (
    <PageLayout title="Account Type" showBack onBack={onBack}>
      <div className="p-4">
        <div className="bg-[#36261D] border border-[#5A4334] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-20"><Shield size={64} /></div>
          <h3 className="text-[#D5C2AA] text-sm uppercase tracking-wider font-bold mb-1">Current Role</h3>
          <p className="text-3xl font-amita text-[#D38A45] mb-4">Admin</p>
          <p className="text-sm text-[#D5C2AA] leading-relaxed">
            Your account type is assigned by the system administrator. It dictates your permissions, visibility, and capabilities across the KarghaKendra platform.
          </p>
        </div>
        <h4 className="px-2 mt-8 mb-2 text-[#D5C2AA] font-bold text-sm uppercase">Available Roles</h4>
        <InfoRow label="Admin" value="Full access to cooperative operations." />
        <InfoRow label="Brand" value="Buyer portal access and tracking." />
        <InfoRow label="Government" value="Monitoring and scheme deployment." />
      </div>
    </PageLayout>
  ),
  AuthoritySettings: ({ onBack }) => {
    return (
      <PageLayout title="Authority Settings" showBack onBack={onBack}>
        <div className="px-4 py-3 bg-[#36261D]/50 border-b border-[#5A4334]">
          <p className="text-xs text-[#D38A45]">Viewing as: <span className="font-bold">Admin Profile</span></p>
        </div>
        <InfoRow label="Cooperative Name" value="Varanasi Silk Weavers Union" />
        <InfoRow label="Assigned Manager" value="Priya Sharma" />
        <InfoRow label="Skills" value="Jacquard Weaving, Natural Dyeing" />
        <InfoRow label="Production Unit" value="Unit A - North Block" />
        <InfoRow label="Member Since" value="October 2021" />
        <div className="mt-6 px-4">
          <h4 className="text-[#D5C2AA] font-bold text-sm uppercase mb-3">Assigned Permissions</h4>
          <ul className="space-y-2 text-[#F3E7D3]">
            <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-[#D38A45]" /> Manage Members</li>
            <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-[#D38A45]" /> Approve Inventory</li>
            <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-[#D38A45]" /> Generate Invoices</li>
          </ul>
        </div>
      </PageLayout>
    );
  }
};

// --- 2. INVENTORY SECTION ---
const InventorySubpages = {
  Warehouses: ({ onBack }) => (
    <PageLayout title="Warehouses" showBack onBack={onBack}>
      <NavRow title="Main Hub (Varanasi)" subtitle="Manager: Rahul Singh" icon={MapPin} />
      <NavRow title="Storage B (Surat)" subtitle="Manager: Amit Patel" icon={MapPin} />
      <div className="mt-4 px-4"><button className="w-full text-[#D38A45] py-3 rounded-lg font-bold border border-dashed border-[#D38A45]">+ Add Warehouse</button></div>
    </PageLayout>
  ),
  StockSettings: ({ onBack }) => (
    <PageLayout title="Stock Settings" showBack onBack={onBack}>
      <ToggleRow title="Auto Update Stock" subtitle="Adjust inventory automatically upon order completion" defaultChecked={true} />
      <ToggleRow title="Negative Stock Allowed" subtitle="Allow stock to drop below zero" defaultChecked={false} />
      <InputRow label="Reorder Level (Default)" type="number" value="50" />
      <InputRow label="Default Warehouse" value="Main Hub (Varanasi)" />
    </PageLayout>
  ),
  LowStockAlerts: ({ onBack }) => (
    <PageLayout title="Low Stock Alerts" showBack onBack={onBack}>
      <ToggleRow title="Enable Alerts" subtitle="Get notified when items run low" defaultChecked={true} />
      <InputRow label="Alert Threshold (%)" type="number" value="15" />
      <ToggleRow title="Email Alerts" defaultChecked={true} />
      <ToggleRow title="Push Notifications" defaultChecked={true} />
    </PageLayout>
  ),
  MeasurementUnits: ({ onBack }) => (
    <PageLayout title="Measurement Units" showBack onBack={onBack}>
      <InfoRow label="Standard" value="Meter (m)" />
      <InfoRow label="Standard" value="Kilogram (kg)" />
      <InfoRow label="Standard" value="Piece (pc)" />
      <InfoRow label="Standard" value="Bundle" />
      <InfoRow label="Standard" value="Roll" />
      <div className="mt-4 px-4"><button className="w-full text-[#D38A45] py-3 rounded-lg font-bold border border-dashed border-[#D38A45]">+ Add Custom Unit</button></div>
    </PageLayout>
  ),
  Categories: ({ onBack }) => (
    <PageLayout title="Categories" showBack onBack={onBack}>
      <NavRow title="Raw Materials" subtitle="Cotton yarn, Silk threads, Dyes" />
      <NavRow title="Finished Products" subtitle="Sarees, Dupattas, Fabrics" />
      <NavRow title="Semi-finished Goods" subtitle="Dyed yarn, Warped beams" />
      <NavRow title="Accessories" subtitle="Needles, Shuttles, Bobbins" />
    </PageLayout>
  )
};

// --- 3. NOTIFICATIONS SECTION ---
const NotificationSubpages = {
  Email: ({ onBack }) => (
    <PageLayout title="Email Notifications" showBack onBack={onBack}>
      <ToggleRow title="Orders" subtitle="New orders, updates, and cancellations" defaultChecked={true} />
      <ToggleRow title="Inventory" subtitle="Low stock and procurement updates" defaultChecked={false} />
      <ToggleRow title="Reports" subtitle="Weekly and monthly digests" defaultChecked={true} />
      <ToggleRow title="Announcements" subtitle="System updates and news" defaultChecked={true} />
    </PageLayout>
  ),
  Push: ({ onBack }) => (
    <PageLayout title="Push Notifications" showBack onBack={onBack}>
      <ToggleRow title="Low Stock" defaultChecked={true} />
      <ToggleRow title="New Assignments" subtitle="Task assignments for weavers" defaultChecked={true} />
      <ToggleRow title="Government Notices" subtitle="New schemes and grants" defaultChecked={true} />
      <ToggleRow title="App Updates" defaultChecked={false} />
    </PageLayout>
  ),
  SMS: ({ onBack }) => (
    <PageLayout title="SMS Notifications" showBack onBack={onBack}>
      <ToggleRow title="OTP & Security" subtitle="Login verification codes" defaultChecked={true} />
      <ToggleRow title="Important Alerts" defaultChecked={true} />
      <ToggleRow title="Deliveries" subtitle="Dispatch and arrival updates" defaultChecked={true} />
    </PageLayout>
  ),
  WhatsApp: ({ onBack }) => (
    <PageLayout title="WhatsApp Notifications" showBack onBack={onBack}>
      <ToggleRow title="Procurement Alerts" defaultChecked={true} />
      <ToggleRow title="Delivery Updates" defaultChecked={true} />
      <ToggleRow title="Cooperative Announcements" defaultChecked={true} />
    </PageLayout>
  ),
  Reminders: ({ onBack }) => (
    <PageLayout title="Reminder Settings" showBack onBack={onBack}>
      <ToggleRow title="Inventory Audits" subtitle="Monthly stock check reminders" defaultChecked={true} />
      <ToggleRow title="Pending Tasks" subtitle="Unfinished weaving assignments" defaultChecked={true} />
      <ToggleRow title="Reports Generation" defaultChecked={false} />
    </PageLayout>
  )
};

// --- 4. SECURITY SECTION ---
const SecuritySubpages = {
  Auth: ({ onBack }) => (
    <PageLayout title="Login & Authentication" showBack onBack={onBack}>
      <ToggleRow title="Two-Factor Authentication" subtitle="Require OTP along with password" defaultChecked={true} />
      <ToggleRow title="OTP Login" subtitle="Allow login using mobile number and OTP" defaultChecked={true} />
      <ToggleRow title="Biometric Login" subtitle="Use Fingerprint/Face ID on mobile" defaultChecked={false} />
    </PageLayout>
  ),
  Password: ({ onBack }) => (
    <PageLayout title="Password Settings" showBack onBack={onBack}>
      <InputRow label="Current Password" type="password" placeholder="••••••••" />
      <InputRow label="New Password" type="password" placeholder="••••••••" />
      <InputRow label="Confirm Password" type="password" placeholder="••••••••" />
      <div className="p-4 mt-2">
        <button className="bg-[#D38A45] text-[#1F1712] px-6 py-2 rounded font-bold w-full hover:bg-[#C27B47] transition-colors">Update Password</button>
      </div>
      <InfoRow label="Password Expiry (Admin Only)" value="90 Days" />
    </PageLayout>
  ),
  Sessions: ({ onBack }) => (
    <PageLayout title="Active Sessions" showBack onBack={onBack}>
      <div className="p-4 border-b border-[#36261D]">
        <h3 className="text-[#F3E7D3] font-bold mb-1 flex items-center"><Monitor className="w-4 h-4 mr-2"/> Current Device</h3>
        <p className="text-[#D5C2AA] text-sm">Chrome on Windows 11 • Mumbai, India</p>
        <p className="text-[#8A4B2A] text-xs font-bold mt-1">Active Now</p>
      </div>
      <div className="p-4 border-b border-[#36261D]">
        <h3 className="text-[#F3E7D3] font-bold mb-1 flex items-center"><Smartphone className="w-4 h-4 mr-2"/> Other Devices</h3>
        <p className="text-[#D5C2AA] text-sm">KarghaKendra App on Android • Surat, India</p>
        <p className="text-[#D5C2AA] text-xs mt-1">Last active: 2 hours ago</p>
        <button className="mt-3 text-sm text-[#C43A3A] font-bold">Logout Device</button>
      </div>
      <div className="p-4 mt-4">
        <button className="w-full text-[#C43A3A] font-bold py-2 border border-[#C43A3A] rounded hover:bg-[#36261D] transition-colors">Logout All Devices</button>
      </div>
    </PageLayout>
  ),
  AuditLogs: ({ onBack }) => (
    <PageLayout title="Audit Logs" showBack onBack={onBack}>
      <NavRow title="Login History" subtitle="Track sign-ins and IPs" icon={Activity} />
      <NavRow title="Profile Changes" subtitle="Modifications to user details" icon={User} />
      <NavRow title="Inventory Changes" subtitle="Stock adjustments and audits" icon={Package} />
      <NavRow title="Administrative Actions" subtitle="Permission changes, deletions" icon={Shield} />
    </PageLayout>
  ),
  Privacy: ({ onBack }) => (
    <PageLayout title="Privacy" showBack onBack={onBack}>
      <NavRow title="Download My Data" subtitle="Get a copy of your personal data" icon={FileText} />
      <NavRow title="Request Data Removal" subtitle="Submit a request to delete records" icon={Trash2} />
      <NavRow title="Account Deactivation" subtitle="Temporarily disable your account" icon={Shield} danger />
    </PageLayout>
  )
};

// --- 5. INTEGRATIONS SECTION ---
const IntegrationSubpages = {
  Payment: ({ onBack }) => (
    <PageLayout title="Payment Services" showBack onBack={onBack}>
      <InfoRow label="UPI (Primary)" value="kargha@upi" />
      <InfoRow label="Bank Transfer" value="HDFC Bank ending in **4521" />
      <NavRow title="Payment Gateway Setup" subtitle="Razorpay integration connected" icon={LinkIcon} />
    </PageLayout>
  ),
  AI: ({ onBack }) => (
    <PageLayout title="AI API Keys" showBack onBack={onBack}>
      <InputRow label="Gemini API Key" type="password" value="AIzaSyB...................." />
      <InputRow label="OpenAI API Key" type="password" value="sk-........................" />
      <InfoRow label="Usage Limits" value="45,000 / 50,000 requests this month" />
    </PageLayout>
  ),
  Govt: ({ onBack }) => (
    <PageLayout title="Government Services" showBack onBack={onBack}>
      <NavRow title="Subsidy Portal" subtitle="Connected to Textile Ministry API" icon={LinkIcon} />
      <NavRow title="MSME Verification" subtitle="Udyam Registration Linked" icon={LinkIcon} />
      <NavRow title="Export Registry" subtitle="Awaiting IEC verification" icon={LinkIcon} />
    </PageLayout>
  ),
  ERP: ({ onBack }) => (
    <PageLayout title="ERP Systems" showBack onBack={onBack}>
      <NavRow title="SAP Integration" subtitle="Not configured" icon={LinkIcon} />
      <NavRow title="Zoho Inventory" subtitle="Connected - Last sync 10 mins ago" icon={LinkIcon} />
      <NavRow title="Tally Prime" subtitle="Local sync utility installed" icon={LinkIcon} />
    </PageLayout>
  ),
  Webhooks: ({ onBack }) => (
    <PageLayout title="Webhooks" showBack onBack={onBack}>
      <NavRow title="Incoming Webhooks" subtitle="Manage URLs for receiving data" icon={LinkIcon} />
      <NavRow title="Outgoing Webhooks" subtitle="Trigger events to external apps" icon={LinkIcon} />
      <InputRow label="Secret Key Management" type="password" value="whsec_..................." />
    </PageLayout>
  )
};

// --- 6. SYSTEM PREFS SECTION ---
const SystemPrefsSubpages = {
  Language: ({ onBack }) => (
    <PageLayout title="Language" showBack onBack={onBack}>
      <ToggleRow title="English" defaultChecked={true} />
      <ToggleRow title="Hindi (हिंदी)" defaultChecked={false} />
      <ToggleRow title="Marathi (मराठी)" defaultChecked={false} />
      <ToggleRow title="Gujarati (ગુજરાતી)" defaultChecked={false} />
      <ToggleRow title="Tamil (தமிழ்)" defaultChecked={false} />
      <ToggleRow title="Telugu (తెలుగు)" defaultChecked={false} />
      <ToggleRow title="Bengali (বাংলা)" defaultChecked={false} />
      <ToggleRow title="Kannada (ಕನ್ನಡ)" defaultChecked={false} />
    </PageLayout>
  ),
  Appearance: ({ onBack }) => (
    <PageLayout title="Appearance" showBack onBack={onBack}>
      <ToggleRow title="Light Theme" subtitle="Cotton paper and sunlight" defaultChecked={false} />
      <ToggleRow title="Dark Theme" subtitle="Burnt wood and amber" defaultChecked={true} />
      <ToggleRow title="System Theme" subtitle="Follow device settings" defaultChecked={false} />
    </PageLayout>
  ),
  DateTime: ({ onBack }) => (
    <PageLayout title="Date & Time" showBack onBack={onBack}>
      <InputRow label="Time Zone" value="Asia/Kolkata (IST)" />
      <InputRow label="Date Format" value="DD/MM/YYYY" />
      <InputRow label="Time Format" value="12-hour (AM/PM)" />
    </PageLayout>
  ),
  Regional: ({ onBack }) => (
    <PageLayout title="Regional Settings" showBack onBack={onBack}>
      <InputRow label="Currency" value="Indian Rupee (₹)" />
      <InputRow label="Measurement Units" value="Metric" />
      <InputRow label="Number Format" value="1,00,000.00" />
    </PageLayout>
  ),
  Backup: ({ onBack }) => (
    <PageLayout title="Backup & Restore" showBack onBack={onBack}>
      <NavRow title="Manual Backup" subtitle="Download a copy of database" icon={Upload} />
      <NavRow title="Restore Backup" subtitle="Upload a previous state" icon={Activity} />
      <ToggleRow title="Automatic Backup Schedule" subtitle="Daily at 2:00 AM" defaultChecked={true} />
    </PageLayout>
  ),
  About: ({ onBack }) => (
    <PageLayout title="About" showBack onBack={onBack}>
      <div className="flex flex-col items-center py-10 border-b border-[#36261D]">
        <div className="w-20 h-20 bg-[#36261D] rounded-xl flex items-center justify-center border border-[#D38A45] mb-4">
          <SettingsIcon className="w-10 h-10 text-[#D38A45]" />
        </div>
        <h2 className="text-2xl font-amita text-[#F3E7D3]">KarghaKendra</h2>
        <p className="text-[#D5C2AA]">v2.4.1 (Build 8902)</p>
      </div>
      <NavRow title="Privacy Policy" subtitle="How we handle your data" />
      <NavRow title="Terms & Conditions" subtitle="Usage guidelines" />
      <NavRow title="Open Source Licenses" subtitle="Third-party software" />
    </PageLayout>
  )
};

// Parent pages that list the subpages
const CategoryPages = {
  Profile: ({ onNavigate, onBack }) => (
    <PageLayout title="Profile" showBack onBack={onBack}>
      <div className="flex flex-col items-center py-6 border-b border-[#36261D]">
        <img src="https://placehold.co/150x150/36261D/D38A45?text=AV" alt="Profile" className="w-24 h-24 rounded-full border-[3px] border-[#5A4334]" />
        <h2 className="mt-3 text-xl font-bold font-quicksand">Aarav Varma</h2>
        <p className="text-[#D5C2AA] text-sm">Master Weaver</p>
      </div>
      <NavRow title="Personal Information" subtitle="Name, email, mobile, password" onClick={() => onNavigate('Profile_PersonalInfo')} />
      <NavRow title="Profile Picture" subtitle="Upload, crop, or remove photo" onClick={() => onNavigate('Profile_ProfilePicture')} />
      <NavRow title="Account Type" subtitle="Admin, Brand, or Government" onClick={() => onNavigate('Profile_AccountType')} />
      <NavRow title="Authority Settings" subtitle="Permissions and capabilities" onClick={() => onNavigate('Profile_AuthoritySettings')} />
    </PageLayout>
  ),
  Inventory: ({ onNavigate, onBack }) => (
    <PageLayout title="Inventory" showBack onBack={onBack}>
      <NavRow title="Warehouses" subtitle="Manage storage locations" onClick={() => onNavigate('Inventory_Warehouses')} />
      <NavRow title="Stock Settings" subtitle="Auto update, negative stock, reorder levels" onClick={() => onNavigate('Inventory_StockSettings')} />
      <NavRow title="Low Stock Alerts" subtitle="Thresholds and notification channels" onClick={() => onNavigate('Inventory_LowStockAlerts')} />
      <NavRow title="Measurement Units" subtitle="Meters, kg, pieces, custom units" onClick={() => onNavigate('Inventory_MeasurementUnits')} />
      <NavRow title="Categories" subtitle="Raw materials, finished goods, accessories" onClick={() => onNavigate('Inventory_Categories')} />
    </PageLayout>
  ),
  Notifications: ({ onNavigate, onBack }) => (
    <PageLayout title="Notifications" showBack onBack={onBack}>
      <NavRow title="Email Notifications" subtitle="Orders, inventory, reports" onClick={() => onNavigate('Notifications_Email')} />
      <NavRow title="Push Notifications" subtitle="Low stock, assignments, app updates" onClick={() => onNavigate('Notifications_Push')} />
      <NavRow title="SMS Notifications" subtitle="OTP, delivery alerts" onClick={() => onNavigate('Notifications_SMS')} />
      <NavRow title="WhatsApp Notifications" subtitle="Procurement, cooperative announcements" onClick={() => onNavigate('Notifications_WhatsApp')} />
      <NavRow title="Reminder Settings" subtitle="Tasks, reports, inventory audits" onClick={() => onNavigate('Notifications_Reminders')} />
    </PageLayout>
  ),
  Security: ({ onNavigate, onBack }) => (
    <PageLayout title="Security" showBack onBack={onBack}>
      <NavRow title="Login & Authentication" subtitle="2FA, OTP, Biometrics" onClick={() => onNavigate('Security_Auth')} />
      <NavRow title="Password" subtitle="Change password, expiry rules" onClick={() => onNavigate('Security_Password')} />
      <NavRow title="Active Sessions" subtitle="Manage logged in devices" onClick={() => onNavigate('Security_Sessions')} />
      <NavRow title="Audit Logs" subtitle="History of actions and changes" onClick={() => onNavigate('Security_AuditLogs')} />
      <NavRow title="Privacy" subtitle="Data requests, deactivation" onClick={() => onNavigate('Security_Privacy')} />
    </PageLayout>
  ),
  Integrations: ({ onNavigate, onBack }) => (
    <PageLayout title="Integrations" showBack onBack={onBack}>
      <NavRow title="Payment Services" subtitle="UPI, Banks, Payment Gateways" onClick={() => onNavigate('Integrations_Payment')} />
      <NavRow title="AI API Keys" subtitle="Gemini, OpenAI setups" onClick={() => onNavigate('Integrations_AI')} />
      <NavRow title="Government Services" subtitle="Subsidies, MSME, Export" onClick={() => onNavigate('Integrations_Govt')} />
      <NavRow title="ERP Systems" subtitle="SAP, Zoho, Tally" onClick={() => onNavigate('Integrations_ERP')} />
      <NavRow title="Webhooks" subtitle="Incoming and outgoing triggers" onClick={() => onNavigate('Integrations_Webhooks')} />
    </PageLayout>
  ),
  SystemPrefs: ({ onNavigate, onBack }) => (
    <PageLayout title="System Preferences" showBack onBack={onBack}>
      <NavRow title="Language" subtitle="English, Hindi, Marathi, etc." onClick={() => onNavigate('SystemPrefs_Language')} />
      <NavRow title="Appearance" subtitle="Light, Dark, System Themes" onClick={() => onNavigate('SystemPrefs_Appearance')} />
      <NavRow title="Date & Time" subtitle="Time zones, formats" onClick={() => onNavigate('SystemPrefs_DateTime')} />
      <NavRow title="Regional Settings" subtitle="Currency, numbers, units defaults" onClick={() => onNavigate('SystemPrefs_Regional')} />
      <NavRow title="Backup & Restore" subtitle="Manual and automatic backups" onClick={() => onNavigate('SystemPrefs_Backup')} />
      <NavRow title="About" subtitle="Version, Legal, Licenses" onClick={() => onNavigate('SystemPrefs_About')} />
    </PageLayout>
  )
};

// The Main App Component
export default function App() {
  // Navigation State (Stack)
  const [navStack, setNavStack] = useState(['Main']);
  
  const currentView = navStack[navStack.length - 1];
  
  const navigate = (pageKey) => {
    setNavStack([...navStack, pageKey]);
  };
  
  const goBack = () => {
    if (navStack.length > 1) {
      setNavStack(navStack.slice(0, -1));
    }
  };

  // Router Map
  const routes = {
    // 1. Categories
    Profile: <CategoryPages.Profile onNavigate={navigate} onBack={goBack} />,
    Inventory: <CategoryPages.Inventory onNavigate={navigate} onBack={goBack} />,
    Notifications: <CategoryPages.Notifications onNavigate={navigate} onBack={goBack} />,
    Security: <CategoryPages.Security onNavigate={navigate} onBack={goBack} />,
    Integrations: <CategoryPages.Integrations onNavigate={navigate} onBack={goBack} />,
    SystemPrefs: <CategoryPages.SystemPrefs onNavigate={navigate} onBack={goBack} />,
    
    // 2. Profile Subpages
    Profile_PersonalInfo: <ProfileSubpages.PersonalInfo onBack={goBack} />,
    Profile_ProfilePicture: <ProfileSubpages.ProfilePicture onBack={goBack} />,
    Profile_AccountType: <ProfileSubpages.AccountType onBack={goBack} />,
    Profile_AuthoritySettings: <ProfileSubpages.AuthoritySettings onBack={goBack} />,
    
    // 3. Inventory Subpages
    Inventory_Warehouses: <InventorySubpages.Warehouses onBack={goBack} />,
    Inventory_StockSettings: <InventorySubpages.StockSettings onBack={goBack} />,
    Inventory_LowStockAlerts: <InventorySubpages.LowStockAlerts onBack={goBack} />,
    Inventory_MeasurementUnits: <InventorySubpages.MeasurementUnits onBack={goBack} />,
    Inventory_Categories: <InventorySubpages.Categories onBack={goBack} />,
    
    // 4. Notification Subpages
    Notifications_Email: <NotificationSubpages.Email onBack={goBack} />,
    Notifications_Push: <NotificationSubpages.Push onBack={goBack} />,
    Notifications_SMS: <NotificationSubpages.SMS onBack={goBack} />,
    Notifications_WhatsApp: <NotificationSubpages.WhatsApp onBack={goBack} />,
    Notifications_Reminders: <NotificationSubpages.Reminders onBack={goBack} />,
    
    // 5. Security Subpages
    Security_Auth: <SecuritySubpages.Auth onBack={goBack} />,
    Security_Password: <SecuritySubpages.Password onBack={goBack} />,
    Security_Sessions: <SecuritySubpages.Sessions onBack={goBack} />,
    Security_AuditLogs: <SecuritySubpages.AuditLogs onBack={goBack} />,
    Security_Privacy: <SecuritySubpages.Privacy onBack={goBack} />,
    
    // 6. Integrations Subpages
    Integrations_Payment: <IntegrationSubpages.Payment onBack={goBack} />,
    Integrations_AI: <IntegrationSubpages.AI onBack={goBack} />,
    Integrations_Govt: <IntegrationSubpages.Govt onBack={goBack} />,
    Integrations_ERP: <IntegrationSubpages.ERP onBack={goBack} />,
    Integrations_Webhooks: <IntegrationSubpages.Webhooks onBack={goBack} />,
    
    // 7. System Prefs Subpages
    SystemPrefs_Language: <SystemPrefsSubpages.Language onBack={goBack} />,
    SystemPrefs_Appearance: <SystemPrefsSubpages.Appearance onBack={goBack} />,
    SystemPrefs_DateTime: <SystemPrefsSubpages.DateTime onBack={goBack} />,
    SystemPrefs_Regional: <SystemPrefsSubpages.Regional onBack={goBack} />,
    SystemPrefs_Backup: <SystemPrefsSubpages.Backup onBack={goBack} />,
    SystemPrefs_About: <SystemPrefsSubpages.About onBack={goBack} />,
  };

  // Main Page View
  if (currentView === 'Main') {
    return (
      <PageLayout title="Settings" showBack={false}>
        {/* Branding Header */}
        <div className="flex flex-col items-center pt-8 pb-6 px-4 border-b border-[#36261D]">
          <h1 className="text-3xl font-amita font-bold text-[#D38A45] tracking-wide">KarghaKendra</h1>
          <p className="text-[#D5C2AA] text-sm font-semibold mt-1">Weaving the future together.</p>
        </div>

        {/* Main Menu List */}
        <div className="flex flex-col mt-2">
          <NavRow 
            icon={CircleUserRound} 
            title="Profile" 
            subtitle="Personal details, account role, authorities" 
            onClick={() => navigate('Profile')} 
          />
          <NavRow 
            icon={Package} 
            title="Inventory" 
            subtitle="Warehouses, stock rules, units, categories" 
            onClick={() => navigate('Inventory')} 
          />
          <NavRow 
            icon={Bell} 
            title="Notifications" 
            subtitle="Email, push, SMS, WhatsApp, reminders" 
            onClick={() => navigate('Notifications')} 
          />
          <NavRow 
            icon={Shield} 
            title="Security" 
            subtitle="Login, passwords, sessions, privacy" 
            onClick={() => navigate('Security')} 
          />
          <NavRow 
            icon={LinkIcon} 
            title="Integrations" 
            subtitle="Payments, AI, ERP, Govt portals" 
            onClick={() => navigate('Integrations')} 
          />
          <NavRow 
            icon={SettingsIcon} 
            title="System Preferences" 
            subtitle="Language, theme, backups, about" 
            onClick={() => navigate('SystemPrefs')} 
          />
          
          <div className="mt-8">
            <NavRow 
              icon={LogOut} 
              title="Log out" 
              danger 
              onClick={() => console.log('Logout clicked')} 
            />
          </div>
        </div>
      </PageLayout>
    );
  }

  // Render Subpages
  return routes[currentView] || <div className="p-10 text-white">Page Not Found</div>;
}

