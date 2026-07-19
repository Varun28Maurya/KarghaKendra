import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Star, 
  Calendar, 
  DollarSign, 
  Users, 
  CheckSquare, 
  FileText, 
  TrendingUp, 
  Heart,
  Award,
  BookOpen,
  Camera,
  CheckCircle,
  Edit,
  Save,
  X,
  RotateCcw,
  Plus,
  Phone,
  Mail,
  Globe,
  MapPin,
  Trash2,
  Sparkles,
  ArrowRight,
  UserCog,
  Landmark,
  Briefcase,
  Circle,
  CheckCircle2,
  Zap,
  RefreshCw
} from 'lucide-react';

/* ==========================================================================
   1. STATS CARD COMPONENT
   ========================================================================== */
function StatsCard({ title, value, icon: Icon, colorClass = 'bg-[#ECE1CF] text-[#8A4B2A]' }) {
  return (
    <div className="bg-[#FFF8EE] border border-[#D6C3A5] rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center space-x-4">
      {Icon && (
        <div className={`p-3 rounded-xl ${colorClass} transition-colors duration-200`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div>
        <p className="text-xs font-semibold text-[#6B5846] uppercase tracking-wider">{title}</p>
        <h4 className="text-xl font-bold text-[#3B2418] mt-1">{value}</h4>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. EDITABLE FORM FIELD COMPONENT
   ========================================================================== */
function EditableField({
  label,
  name,
  value,
  onChange,
  isEditing,
  type = 'text',
  placeholder = '',
  icon: Icon
}) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && (
        <label className="text-xs font-bold text-[#6B5846] uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full">
        {Icon && (
          <div className="absolute left-3.5 text-[#6B5846]/60">
            <Icon className="w-4 h-4" />
          </div>
        )}
        {isEditing ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full bg-[#FFF8EE] border border-[#D6C3A5] rounded-xl py-2 px-3 text-[#3B2418] font-quicksand focus:outline-none focus:ring-2 focus:ring-[#8A4B2A] focus:border-[#8A4B2A] transition-all duration-200 ${Icon ? 'pl-10' : ''}`}
          />
        ) : (
          <div className={`text-[#3B2418] font-medium py-2 w-full break-all ${Icon ? 'pl-9' : ''}`}>
            {value || <span className="text-[#6B5846]/40 italic">Not specified</span>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   3. EDITABLE MULTILINE TEXTAREA COMPONENT
   ========================================================================== */
function EditableTextarea({
  label,
  name,
  value,
  onChange,
  isEditing,
  placeholder = '',
  rows = 5
}) {
  return (
    <div className="flex flex-col space-y-1.5 w-full">
      {label && (
        <label className="text-xs font-bold text-[#6B5846] uppercase tracking-wider">
          {label}
        </label>
      )}
      {isEditing ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="w-full bg-[#FFF8EE] border border-[#D6C3A5] rounded-xl py-3 px-4 text-[#3B2418] font-quicksand focus:outline-none focus:ring-2 focus:ring-[#8A4B2A] focus:border-[#8A4B2A] transition-all duration-200 resize-y"
        />
      ) : (
        <p className="text-[#3B2418] font-medium text-sm leading-relaxed whitespace-pre-wrap">
          {value || <span className="text-[#6B5846]/40 italic">No description available. Click Edit Profile to add some.</span>}
        </p>
      )}
    </div>
  );
}

/* ==========================================================================
   4. EXPERTISE SKILLS CHIPS COMPONENT
   ========================================================================== */
function SkillsSection({ skills = [], onChange, isEditing }) {
  const [newSkill, setNewSkill] = useState('');

  const handleAdd = (e) => {
    if (e) e.preventDefault();
    const trimmed = newSkill.trim();
    if (trimmed && !skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      onChange([...skills, trimmed]);
      setNewSkill('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (skillToRemove) => {
    onChange(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="bg-[#FFF8EE] border border-[#D6C3A5] rounded-2xl p-6 shadow-sm flex flex-col h-full justify-between">
      <div>
        <h3 className="text-md font-bold text-[#3B2418] uppercase tracking-wider mb-1">Procurement Expertise</h3>
        <p className="text-xs text-[#6B5846] mb-4">Traditional techniques and woven material specialties</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[#ECE1CF] text-[#8A4B2A] border border-[#D6C3A5]/50 shadow-sm transition-all"
            >
              {skill}
              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleRemove(skill)}
                  className="ml-1.5 hover:bg-[#8A4B2A]/20 rounded-full p-0.5 text-[#8A4B2A] transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
          {skills.length === 0 && (
            <span className="text-xs text-[#6B5846]/40 italic">No expertise areas listed.</span>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-[#D6C3A5]/40">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add new weave (e.g. Jamdani)..."
            className="flex-1 bg-[#FFF8EE] border border-[#D6C3A5] rounded-xl py-2 px-3 text-xs text-[#3B2418] font-quicksand focus:outline-none focus:ring-2 focus:ring-[#8A4B2A]"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="bg-[#8A4B2A] hover:bg-[#6E381F] text-[#FFF8EE] font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 shadow-sm transition-all active:scale-95 duration-200 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   5. HERITAGE CERTIFICATION LIST COMPONENT
   ========================================================================== */
function CertificationSection({ certifications = [], onChange, isEditing, plain = false }) {
  const [newCert, setNewCert] = useState('');

  const handleAdd = (e) => {
    if (e) e.preventDefault();
    const trimmed = newCert.trim();
    if (trimmed && !certifications.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      onChange([...certifications, trimmed]);
      setNewCert('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (certToRemove) => {
    onChange(certifications.filter((c) => c !== certToRemove));
  };

  const innerContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h3 className="text-xs font-bold text-[#3B2418] mb-1 uppercase tracking-wider">Heritage Certifications</h3>
        <p className="text-[10px] text-[#6B5846] mb-4">Official credentials and craft authenticity verification marks</p>
        
        <div className="space-y-2">
          {certifications.map((cert) => (
            <div
              key={cert}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#F5EFE3]/50 border border-[#D6C3A5]/45 hover:bg-[#ECE1CF]/40 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 bg-[#FFF8EE] rounded-lg border border-[#D6C3A5]/40 shadow-sm">
                  <Award className="w-4.5 h-4.5 text-[#B8612C]" />
                </div>
                <span className="text-xs font-bold text-[#3B2418]">{cert}</span>
              </div>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleRemove(cert)}
                  className="text-[#6B5846] hover:text-[#8A4B2A] p-1 rounded-lg hover:bg-[#ECE1CF] transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
          {certifications.length === 0 && (
            <span className="text-xs text-[#6B5846]/40 italic">No certifications listed.</span>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-2 mt-4 pt-3 border-t border-[#D6C3A5]/40">
          <input
            type="text"
            value={newCert}
            onChange={(e) => setNewCert(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add cert (e.g. Handloom Mark)..."
            className="flex-1 bg-[#FFF8EE] border border-[#D6C3A5] rounded-xl py-1.5 px-2.5 text-xs text-[#3B2418] font-quicksand focus:outline-none focus:ring-2 focus:ring-[#8A4B2A]"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="bg-[#8A4B2A] hover:bg-[#6E381F] text-[#FFF8EE] font-bold px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-sm transition-all active:scale-95 duration-200 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
        </div>
      )}
    </div>
  );

  if (plain) {
    return innerContent;
  }

  return (
    <div className="bg-[#FFF8EE] border border-[#D6C3A5] rounded-2xl p-6 shadow-sm flex flex-col h-full justify-between">
      {innerContent}
    </div>
  );
}

/* ==========================================================================
   6. RECENT ACTIVITY TIMELINE COMPONENT
   ========================================================================== */
function ActivityTimeline({ activities = [], plain = false }) {
  const iconMap = {
    rfq: { icon: FileText, bg: 'bg-[#ECE1CF]', text: 'text-[#8A4B2A]' },
    coop: { icon: Users, bg: 'bg-[#ECE1CF]', text: 'text-[#B8612C]' },
    order: { icon: ShoppingBag, bg: 'bg-[#ECE1CF]', text: 'text-[#C99A52]' },
    profile: { icon: UserCog, bg: 'bg-[#ECE1CF]', text: 'text-[#6B5846]' }
  };

  const innerContent = (
    <div>
      <h3 className="text-xs font-bold text-[#3B2418] mb-4 uppercase tracking-wider">Recent Activity</h3>
      <div className="relative border-l-2 border-[#D6C3A5]/60 pl-6 ml-3.5 space-y-5">
        {activities.slice(0, 4).map((act) => {
          const config = iconMap[act.type] || { icon: FileText, bg: 'bg-gray-100', text: 'text-gray-600' };
          const IconComponent = config.icon;
          return (
            <div key={act.id} className="relative flex flex-col items-start">
              <div className={`absolute -left-[37px] top-0.5 p-1 rounded-full border border-[#D6C3A5] bg-[#FFF8EE] ${config.text} shadow-sm transition-transform duration-300 hover:scale-110`}>
                <IconComponent className="w-3 h-3" />
              </div>
              <p className="text-[11px] font-semibold text-[#3B2418] leading-snug">{act.text}</p>
              <span className="text-[8px] font-extrabold text-[#6B5846] mt-1 bg-[#ECE1CF]/50 px-1.5 py-0.5 rounded uppercase tracking-wider">{act.time}</span>
            </div>
          );
        })}
        {activities.length === 0 && (
          <p className="text-xs text-[#6B5846]/40 italic">No recent activities.</p>
        )}
      </div>
    </div>
  );

  if (plain) {
    return innerContent;
  }

  return (
    <div className="bg-[#FFF8EE] border border-[#D6C3A5] rounded-2xl p-6 shadow-sm">
      {innerContent}
    </div>
  );
}

/* ==========================================================================
   7. CONTACT SECTION COMPONENT
   ========================================================================== */
function ContactSection({ data = {}, onChange, isEditing }) {
  const handleFieldChange = (e) => {
    onChange({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-[#FFF8EE] border border-[#D6C3A5] rounded-2xl p-6 shadow-sm">
      <h3 className="text-md font-bold text-[#3B2418] mb-4 uppercase tracking-wider">Contact & Location</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <EditableField
          label="Phone Number"
          name="phone"
          value={data.phone}
          onChange={handleFieldChange}
          isEditing={isEditing}
          icon={Phone}
          placeholder="+91 XXXXX XXXXX"
        />
        <EditableField
          label="Email Address"
          name="email"
          value={data.email}
          onChange={handleFieldChange}
          isEditing={isEditing}
          icon={Mail}
          placeholder="email@example.com"
          type="email"
        />
        <EditableField
          label="Website"
          name="website"
          value={data.website}
          onChange={handleFieldChange}
          isEditing={isEditing}
          icon={Globe}
          placeholder="www.example.com"
        />
        <EditableField
          label="Address"
          name="address"
          value={data.address}
          onChange={handleFieldChange}
          isEditing={isEditing}
          icon={MapPin}
          placeholder="Company physical address"
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   8. SOCIAL PROFILE PRESENCE COMPONENT
   ========================================================================== */
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

function SocialSection({ socials = {}, onChange, isEditing }) {
  const handleFieldChange = (e) => {
    onChange({
      ...socials,
      [e.target.name]: e.target.value
    });
  };

  const socialIcons = {
    linkedin: LinkedinIcon,
    instagram: InstagramIcon,
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    website: Globe
  };

  const labels = {
    linkedin: "LinkedIn URL",
    instagram: "Instagram URL",
    facebook: "Facebook URL",
    twitter: "Twitter / X URL",
    website: "Secondary Website"
  };

  return (
    <div className="bg-[#FFF8EE] border border-[#D6C3A5] rounded-2xl p-6 shadow-sm">
      <h3 className="text-md font-bold text-[#3B2418] mb-4 uppercase tracking-wider">Social Presence</h3>
      
      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(socials).map((key) => (
            <EditableField
              key={key}
              label={labels[key]}
              name={key}
              value={socials[key]}
              onChange={handleFieldChange}
              isEditing={true}
              icon={socialIcons[key]}
              placeholder={`Enter ${key} URL`}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {Object.entries(socials).map(([key, val]) => {
            const Icon = socialIcons[key] || Globe;
            if (!val) return null;
            const url = val.startsWith('http') ? val : `https://${val}`;
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl text-sm font-semibold bg-[#ECE1CF] hover:bg-[#D6C3A5] text-[#8A4B2A] border border-[#D6C3A5]/40 shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                <Icon className="w-4 h-4 text-[#8A4B2A]" />
                <span className="capitalize">{key}</span>
              </a>
            );
          })}
          {Object.values(socials).filter(Boolean).length === 0 && (
            <span className="text-xs text-[#6B5846]/40 italic">No social links configured. Click Edit Profile to add them.</span>
          )}
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   9. MERGED PERFORMANCE ANALYTICS PANEL (With Certifications & Timeline Nested)
   ========================================================================== */
function PerformanceCard({
  performance = {},
  onChangePerformance,
  certifications = [],
  onChangeCertifications,
  recentActivity = [],
  isEditing
}) {
  const [widths, setWidths] = useState({
    onTimeDelivery: 0,
    qualityScore: 0,
    vendorSatisfaction: 0,
    repeatOrders: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidths({
        onTimeDelivery: performance.onTimeDelivery || 0,
        qualityScore: performance.qualityScore || 0,
        vendorSatisfaction: performance.vendorSatisfaction || 0,
        repeatOrders: performance.repeatOrders || 0
      });
    }, 150);
    return () => clearTimeout(timer);
  }, [performance]);

  const handleSliderChange = (name, val) => {
    onChangePerformance({
      ...performance,
      [name]: parseInt(val) || 0
    });
  };

  const metrics = [
    {
      key: 'onTimeDelivery',
      label: 'On-time Delivery',
      icon: Zap,
      color: 'bg-[#8A4B2A]',
      textColor: 'text-[#8A4B2A]'
    },
    {
      key: 'qualityScore',
      label: 'Quality Score',
      icon: Award,
      color: 'bg-[#B8612C]',
      textColor: 'text-[#B8612C]'
    },
    {
      key: 'vendorSatisfaction',
      label: 'Vendor Satisfaction',
      icon: Heart,
      color: 'bg-[#C99A52]',
      textColor: 'text-[#C99A52]'
    },
    {
      key: 'repeatOrders',
      label: 'Repeat Orders Rate',
      icon: RefreshCw,
      color: 'bg-[#6B5846]',
      textColor: 'text-[#6B5846]'
    }
  ];

  return (
    <div className="bg-[#FFF8EE] border border-[#D6C3A5] rounded-2xl p-6 shadow-sm flex flex-col space-y-6">
      
      {/* 1. Performance Analytics Progress Bars */}
      <div>
        <h3 className="text-xs font-bold text-[#3B2418] mb-1 uppercase tracking-wider">Performance Analytics</h3>
        <p className="text-[10px] text-[#6B5846] mb-5">Supplier performance scores and historical procurement success</p>
        
        <div className="space-y-4">
          {metrics.map(({ key, label, icon: Icon, color, textColor }) => {
            const val = performance[key] || 0;
            const widthVal = isEditing ? val : widths[key];
            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-[#3B2418]">
                    <Icon className={`w-3.5 h-3.5 ${textColor}`} />
                    <span>{label}</span>
                  </div>
                  <span className="font-bold text-[#3B2418] bg-[#ECE1CF] px-2 py-0.5 rounded-md">{val}%</span>
                </div>
                
                {isEditing ? (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={val}
                    onChange={(e) => handleSliderChange(key, e.target.value)}
                    className="w-full h-2 bg-[#ECE1CF] rounded-lg appearance-none cursor-pointer accent-[#8A4B2A] focus:outline-none"
                  />
                ) : (
                  <div className="w-full bg-[#ECE1CF]/60 h-2.5 rounded-full overflow-hidden border border-[#D6C3A5]/30">
                    <div
                      className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${widthVal}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#D6C3A5]/40" />

      {/* 2. Responsive Grid for Nested Sections inside the Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
        
        {/* Heritage Certifications */}
        <div className="sm:border-r sm:border-[#D6C3A5]/40 sm:pr-4 lg:border-r-0 lg:pr-0">
          <CertificationSection
            certifications={certifications}
            onChange={onChangeCertifications}
            isEditing={isEditing}
            plain={true}
          />
        </div>

        {/* Recent Activity Timeline */}
        <div className="pt-2 sm:pt-0 lg:pt-2 lg:border-t lg:border-[#D6C3A5]/30 lg:mt-2">
          <ActivityTimeline
            activities={recentActivity}
            plain={true}
          />
        </div>

      </div>

    </div>
  );
}

/* ==========================================================================
   10. STRENGTH PROGRESS RING & CHECKLIST COMPONENT
   ========================================================================== */
function ProfileCompletion({ data = {} }) {
  const checklistItems = [
    {
      id: 'avatar',
      label: 'Upload Profile Avatar',
      isComplete: !!data.avatar
    },
    {
      id: 'banner',
      label: 'Upload Custom Cover Banner',
      isComplete: !!data.banner
    },
    {
      id: 'about',
      label: 'Heritage & Craft Description',
      isComplete: !!data.about && data.about.trim().length > 15
    },
    {
      id: 'contact',
      label: 'Complete Contact Information',
      isComplete: !!data.phone && !!data.email && !!data.address
    },
    {
      id: 'skills',
      label: 'Select Procurement Expertise',
      isComplete: !!data.skills && data.skills.length >= 3
    },
    {
      id: 'certificates',
      label: 'Provide Heritage Certifications',
      isComplete: !!data.certifications && data.certifications.length >= 2
    }
  ];

  const completedCount = checklistItems.filter(item => item.isComplete).length;
  const percentage = Math.round((completedCount / checklistItems.length) * 100);

  const radius = 38;
  const strokeWidth = 7;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-[#FFF8EE] border border-[#D6C3A5] rounded-2xl p-6 shadow-sm flex flex-col items-center">
      <h3 className="text-xs font-bold text-[#3B2418] mb-4 uppercase tracking-wider self-start">Profile Completion</h3>
      
      <div className="relative flex items-center justify-center w-36 h-36 mb-5">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-[#ECE1CF] fill-none"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-[#8A4B2A] fill-none transition-all duration-700 ease-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-2xl font-extrabold text-[#3B2418]">{percentage}%</span>
          <p className="text-[9px] font-bold text-[#6B5846] uppercase tracking-wider mt-0.5">Strength</p>
        </div>
      </div>

      <div className="w-full space-y-3.5 border-t border-[#D6C3A5]/40 pt-4">
        {checklistItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3 text-xs font-medium text-[#3B2418]">
            {item.isComplete ? (
              <CheckCircle2 className="w-4.5 h-4.5 text-[#8A4B2A] shrink-0" />
            ) : (
              <Circle className="w-4.5 h-4.5 text-[#6B5846]/40 shrink-0" />
            )}
            <span className={`transition-colors duration-200 ${item.isComplete ? 'line-through text-[#6B5846]/70' : 'text-[#3B2418]'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   11. AI INSIGHT RECOMMENDATION CARD COMPONENT
   ========================================================================== */
function AIInsightCard() {
  return (
    <div className="bg-[#FFF8EE] border-2 border-[#C99A52] rounded-2xl p-6 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
      <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#C99A52]/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-[#C99A52]/20 text-[#B8612C] rounded-lg">
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>
        <span className="text-[10px] font-bold text-[#B8612C] uppercase tracking-wider">Kargha AI Insight</span>
      </div>

      <p className="text-xs font-semibold text-[#3B2418] leading-relaxed mb-4">
        AI recommends sourcing Chanderi fabric directly from 3 verified cooperatives in Ashoknagar district (MP) to reduce logistics costs by <span className="text-[#B8612C] font-bold">14%</span> and guarantee authentic Handloom Mark verification.
      </p>

      <button className="inline-flex items-center gap-1 text-xs font-bold text-[#8A4B2A] hover:text-[#6E381F] transition-colors cursor-pointer group">
        <span>Analyze Cooperatives</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
      </button>
    </div>
  );
}

/* ==========================================================================
   12. BANNER & AVATAR HEADER BLOCKS COMPONENT
   ========================================================================== */
function ProfileHeader({
  profileData = {},
  isEditing,
  onStartEdit,
  onSave,
  onCancel,
  onChangeField,
  onUploadBanner,
  onUploadAvatar,
  onRemoveAvatar
}) {
  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const handleBannerClick = () => {
    if (bannerInputRef.current) {
      bannerInputRef.current.click();
    }
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'banner') {
          onUploadBanner(reader.result);
        } else {
          onUploadAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const initials = profileData.companyName
    ? profileData.companyName
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'KK';

  return (
    <div className="relative w-full">
      <input
        type="file"
        ref={bannerInputRef}
        onChange={(e) => handleFileChange(e, 'banner')}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={avatarInputRef}
        onChange={(e) => handleFileChange(e, 'avatar')}
        accept="image/*"
        className="hidden"
      />

      {/* Cover Banner */}
      <div
        onClick={handleBannerClick}
        className="h-48 md:h-64 w-full rounded-t-3xl relative overflow-hidden group cursor-pointer border-b border-[#D6C3A5] bg-gradient-to-r from-[#3B2418] via-[#8A4B2A] to-[#6E381F] transition-all"
      >
        {profileData.banner ? (
          <img
            src={profileData.banner}
            alt="Woven Cover Banner"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:10px_10px]" />
        )}
        
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-[#FFF8EE] text-[#3B2418] text-xs font-bold py-2 px-4 rounded-xl shadow flex items-center gap-1.5 border border-[#D6C3A5]">
            <Camera className="w-4 h-4 text-[#8A4B2A]" />
            Upload Custom Banner
          </div>
        </div>
      </div>

      {/* Overlapping Info Block */}
      <div className="px-6 md:px-8 pb-6 bg-[#FFF8EE] rounded-b-3xl border-x border-b border-[#D6C3A5] relative pt-20 md:pt-4">
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
          
          {/* Avatar frame */}
          <div className="relative -mt-24 md:-mt-28 w-28 h-28 md:w-36 md:h-36 shrink-0 mx-auto md:mx-0 group rounded-full border-4 border-[#FFF8EE] bg-[#ECE1CF] shadow-md overflow-hidden flex items-center justify-center">
            {profileData.avatar ? (
              <img
                src={profileData.avatar}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl md:text-4xl font-extrabold text-[#8A4B2A] font-quicksand">
                {initials}
              </div>
            )}

            <div
              onClick={handleAvatarClick}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
            >
              <Camera className="w-6 h-6 text-[#FFF8EE]" />
            </div>

            {profileData.avatar && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveAvatar();
                }}
                className="absolute top-1 right-1 p-1.5 bg-[#8A4B2A] hover:bg-[#6E381F] text-white rounded-full shadow transition-all duration-200 hover:scale-105 cursor-pointer"
                title="Remove Avatar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Titles & Quote */}
          <div className="flex-1 text-center md:text-left space-y-3">
            {isEditing ? (
              <div className="space-y-2.5 max-w-xl">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#6B5846] uppercase tracking-wider">Company Name</label>
                  <input
                    type="text"
                    value={profileData.companyName}
                    onChange={(e) => onChangeField('companyName', e.target.value)}
                    placeholder="Company Name"
                    className="w-full text-base font-bold bg-[#FFF8EE] border border-[#D6C3A5] rounded-xl py-1.5 px-3 text-[#3B2418] font-quicksand focus:outline-none focus:ring-2 focus:ring-[#8A4B2A]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#6B5846] uppercase tracking-wider">Tagline</label>
                  <input
                    type="text"
                    value={profileData.tagline}
                    onChange={(e) => onChangeField('tagline', e.target.value)}
                    placeholder="Tagline"
                    className="w-full text-xs font-semibold bg-[#FFF8EE] border border-[#D6C3A5] rounded-xl py-1.5 px-3 text-[#6B5846] font-quicksand focus:outline-none focus:ring-2 focus:ring-[#8A4B2A]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#6B5846] uppercase tracking-wider">Hindi Quote (Amita Font)</label>
                  <input
                    type="text"
                    value={profileData.hindiQuote}
                    onChange={(e) => onChangeField('hindiQuote', e.target.value)}
                    placeholder="Hindi Quote"
                    className="w-full text-sm font-semibold bg-[#FFF8EE] border border-[#D6C3A5] rounded-xl py-1.5 px-3 text-[#8A4B2A] font-amita focus:outline-none focus:ring-2 focus:ring-[#8A4B2A]"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                  <h1 className="text-xl md:text-3xl font-extrabold text-[#3B2418] tracking-tight">
                    {profileData.companyName || 'KarghaKendra Buyer'}
                  </h1>
                  <span className="inline-flex items-center gap-1 bg-[#ECE1CF] border border-[#D6C3A5] text-[#8A4B2A] text-[10px] font-bold px-2 py-0.5 rounded-full select-none">
                    <CheckCircle className="w-3.5 h-3.5 fill-[#8A4B2A] text-[#FFF8EE]" />
                    Verified Partner
                  </span>
                </div>
                
                <p className="text-sm font-bold text-[#6B5846]">
                  {profileData.tagline || 'Premium Handloom & Heritage Textile Buyer'}
                </p>

                {profileData.hindiQuote && (
                  <p className="text-base md:text-lg text-[#8A4B2A] font-semibold font-amita mt-2 italic leading-relaxed">
                    {profileData.hindiQuote}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Edit Actions */}
          <div className="shrink-0 flex items-center justify-center gap-2 mt-4 md:mt-0">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-[#ECE1CF] hover:bg-[#D6C3A5] text-[#3B2418] font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onSave}
                  className="bg-[#8A4B2A] hover:bg-[#6E381F] text-[#FFF8EE] font-bold px-4 py-2.5 rounded-xl text-xs border-2 border-[#3B2418] shadow-[3px_3px_0px_#3B2418] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#3B2418] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onStartEdit}
                className="bg-[#8A4B2A] hover:bg-[#6E381F] text-[#FFF8EE] font-bold px-5 py-3 rounded-xl text-xs border-2 border-[#3B2418] shadow-[4px_4px_0px_#3B2418] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#3B2418] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                Edit Profile
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   13. BUSINESS METADATA DETAILS CARD COMPONENT
   ========================================================================== */
function ProfileCard({ data = {}, onChange, isEditing }) {
  const handleFieldChange = (e) => {
    onChange({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-[#FFF8EE] border border-[#D6C3A5] rounded-2xl p-6 shadow-sm">
      <h3 className="text-md font-bold text-[#3B2418] mb-4 uppercase tracking-wider">Business Credentials</h3>
      <div className="space-y-4">
        <EditableField
          label="GST Number"
          name="gstNumber"
          value={data.gstNumber}
          onChange={handleFieldChange}
          isEditing={isEditing}
          icon={Landmark}
          placeholder="GSTIN (e.g. 07AAAAA1111A1Z1)"
        />
        <EditableField
          label="Business Type"
          name="businessType"
          value={data.businessType}
          onChange={handleFieldChange}
          isEditing={isEditing}
          icon={Briefcase}
          placeholder="e.g. Handloom Cooperative / Export House"
        />
        <EditableField
          label="Founded Year"
          name="foundedYear"
          value={data.foundedYear}
          onChange={handleFieldChange}
          isEditing={isEditing}
          icon={Calendar}
          placeholder="e.g. 2018"
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   14. MAIN CONTAINER APP COMPONENT (ORCHESTRATOR)
   ========================================================================== */
const initialProfileData = {
  companyName: "KarghaKendra Artisan Exports",
  tagline: "Premium Handloom & Heritage Textile Buyer",
  hindiQuote: "हस्तशिल्प और हथकरघा भारत की आत्मा हैं।",
  about: "We are dedicated to sourcing, preserving, and exporting India's finest handloom textiles. Partnering directly with over 150 rural weaver cooperatives across Banaras, Pochampally, Sambalpur, and Bhuj, we bring authentic heritage weaves to the global luxury market. Our procurement model ensures fair trade wages, GI certification verification, and sustainable, natural-dye based textile production.",
  phone: "+91 98765 43210",
  email: "procurement@karghakendra.com",
  website: "www.karghakendra.com",
  address: "12, Heritage Plaza, Janpath, New Delhi, 110001, India",
  gstNumber: "07AAAAA1111A1Z1",
  businessType: "Artisan Procurement & Export House",
  foundedYear: "2018",
  banner: "",
  avatar: "",
  skills: ["Khadi", "Ikat", "Banarasi", "Ajrakh", "Silk", "Organic Cotton", "Natural Dye"],
  certifications: ["Government Verified", "Fair Trade", "GI Certified", "Handloom Mark", "Silk Mark", "Organic Certified"],
  socials: {
    linkedin: "linkedin.com/company/karghakendra",
    instagram: "instagram.com/karghakendra",
    facebook: "facebook.com/karghakendra",
    twitter: "twitter.com/karghakendra",
    website: "www.karghakendra.com"
  },
  stats: {
    orders: "450+",
    rating: "4.9",
    years: "8",
    revenue: "$1.2M",
    activeCooperatives: "150+",
    completedOrders: "412",
    pendingRFQs: "8",
    monthlySpend: "$85K"
  },
  performance: {
    onTimeDelivery: 96,
    qualityScore: 98,
    vendorSatisfaction: 94,
    repeatOrders: 88
  },
  recentActivity: [
    { id: 1, type: "rfq", text: "Created RFQ for 500m of Handspun Pochampally Ikat fabric", time: "2 hours ago" },
    { id: 2, type: "coop", text: "Added 'Kutch Ajrakh Weavers Society' to cooperative registry", time: "1 day ago" },
    { id: 3, type: "order", text: "Completed Order #KK-8924 (200 Banarasi Silk Sarees)", time: "3 days ago" },
    { id: 4, type: "profile", text: "Updated GST identification details and verification files", time: "1 week ago" }
  ]
};

function App() {
  const [profileData, setProfileData] = useState(initialProfileData);
  const [draftProfileData, setDraftProfileData] = useState(initialProfileData);
  const [isEditing, setIsEditing] = useState(false);

  const activeData = isEditing ? draftProfileData : profileData;

  const handleStartEdit = () => {
    setDraftProfileData({ ...profileData });
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedActivity = [
      {
        id: Date.now(),
        type: "profile",
        text: "Updated Profile details and business credentials",
        time: "Just now"
      },
      ...draftProfileData.recentActivity
    ];
    
    setProfileData({
      ...draftProfileData,
      recentActivity: updatedActivity.slice(0, 6)
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdateField = (field, value) => {
    setDraftProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateSocials = (newSocials) => {
    setDraftProfileData(prev => ({
      ...prev,
      socials: newSocials
    }));
  };

  const handleUpdatePerformance = (newPerformance) => {
    setDraftProfileData(prev => ({
      ...prev,
      performance: newPerformance
    }));
  };

  const handleUpdateSkills = (newSkills) => {
    setDraftProfileData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const handleUpdateCertifications = (newCertifications) => {
    setDraftProfileData(prev => ({
      ...prev,
      certifications: newCertifications
    }));
  };

  const handleUploadBanner = (imageSrc) => {
    if (isEditing) {
      setDraftProfileData(prev => ({ ...prev, banner: imageSrc }));
    } else {
      setProfileData(prev => ({
        ...prev,
        banner: imageSrc,
        recentActivity: [
          { id: Date.now(), type: 'profile', text: 'Updated custom cover banner image', time: 'Just now' },
          ...prev.recentActivity
        ]
      }));
    }
  };

  const handleUploadAvatar = (imageSrc) => {
    if (isEditing) {
      setDraftProfileData(prev => ({ ...prev, avatar: imageSrc }));
    } else {
      setProfileData(prev => ({
        ...prev,
        avatar: imageSrc,
        recentActivity: [
          { id: Date.now(), type: 'profile', text: 'Uploaded custom profile avatar', time: 'Just now' },
          ...prev.recentActivity
        ]
      }));
    }
  };

  const handleRemoveAvatar = () => {
    if (isEditing) {
      setDraftProfileData(prev => ({ ...prev, avatar: "" }));
    } else {
      setProfileData(prev => ({
        ...prev,
        avatar: "",
        recentActivity: [
          { id: Date.now(), type: 'profile', text: 'Removed profile avatar', time: 'Just now' },
          ...prev.recentActivity
        ]
      }));
    }
  };

  return (
    <div className="min-height-screen font-quicksand pb-16">
      
      {/* Top Header Bar */}
      <nav className="bg-[#FFF8EE] border-b border-[#D6C3A5] px-6 py-4 mb-8 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#8A4B2A] text-[#FFF8EE] p-2 rounded-xl border border-[#3B2418] shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-md font-extrabold text-[#3B2418] tracking-wider block uppercase">KarghaKendra</span>
              <span className="text-[10px] font-bold text-[#6B5846] uppercase tracking-widest block -mt-1">Handloom & Heritage</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-[#8A4B2A] bg-[#ECE1CF] px-3.5 py-1.5 rounded-full border border-[#D6C3A5]/50">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
              Artisan Procurement Network
            </span>
          </div>
        </div>
      </nav>

      {/* Main Grid container */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 space-y-8">
        
        {/* Banner & Header */}
        <section className="shadow-sm">
          <ProfileHeader
            profileData={activeData}
            isEditing={isEditing}
            onStartEdit={handleStartEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            onChangeField={handleUpdateField}
            onUploadBanner={handleUploadBanner}
            onUploadAvatar={handleUploadAvatar}
            onRemoveAvatar={handleRemoveAvatar}
          />
        </section>

        {/* Multi-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* AI Assistant Insight Card relocated to the top to balance columns */}
            <AIInsightCard />

            {/* About story */}
            <div className="bg-[#FFF8EE] border border-[#D6C3A5] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1 bg-[#ECE1CF] rounded-lg">
                  <BookOpen className="w-4.5 h-4.5 text-[#8A4B2A]" />
                </div>
                <h3 className="text-md font-bold text-[#3B2418] uppercase tracking-wider">Heritage Story & About</h3>
              </div>
              <EditableTextarea
                name="about"
                value={activeData.about}
                onChange={(e) => handleUpdateField('about', e.target.value)}
                isEditing={isEditing}
                placeholder="Share your weaver story, location specialities, and heritage procurement philosophy..."
              />
            </div>

            {/* Metrics cards grid */}
            <div className="bg-[#FFF8EE] border border-[#D6C3A5] rounded-2xl p-6 shadow-sm">
              <h3 className="text-md font-bold text-[#3B2418] mb-4 uppercase tracking-wider">Operational Metrics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <StatsCard title="Total Orders" value={activeData.stats.orders} icon={ShoppingBag} />
                <StatsCard title="Quality Rating" value={activeData.stats.rating} icon={Star} colorClass="bg-[#ECE1CF] text-[#B8612C]" />
                <StatsCard title="Years Active" value={activeData.stats.years} icon={Calendar} colorClass="bg-[#ECE1CF] text-[#C99A52]" />
                <StatsCard title="Est. Revenue" value={activeData.stats.revenue} icon={DollarSign} colorClass="bg-[#ECE1CF] text-[#6B5846]" />
                <StatsCard title="Cooperatives" value={activeData.stats.activeCooperatives} icon={Users} />
                <StatsCard title="Completed" value={activeData.stats.completedOrders} icon={CheckSquare} colorClass="bg-[#ECE1CF] text-[#B8612C]" />
                <StatsCard title="Pending RFQs" value={activeData.stats.pendingRFQs} icon={FileText} colorClass="bg-[#ECE1CF] text-[#C99A52]" />
                <StatsCard title="Monthly Spend" value={activeData.stats.monthlySpend} icon={TrendingUp} colorClass="bg-[#ECE1CF] text-[#6B5846]" />
              </div>
            </div>

            {/* Contact details */}
            <ContactSection
              data={activeData}
              onChange={(updatedContact) => {
                setDraftProfileData(prev => ({
                  ...prev,
                  ...updatedContact
                }));
              }}
              isEditing={isEditing}
            />

            {/* Skills tag chip manager & Business metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SkillsSection
                skills={activeData.skills}
                onChange={handleUpdateSkills}
                isEditing={isEditing}
              />
              <ProfileCard
                data={activeData}
                onChange={(updatedCredentials) => {
                  setDraftProfileData(prev => ({
                    ...prev,
                    ...updatedCredentials
                  }));
                }}
                isEditing={isEditing}
              />
            </div>

            {/* Social linkages */}
            <SocialSection
              socials={activeData.socials}
              onChange={handleUpdateSocials}
              isEditing={isEditing}
            />

          </div>

          {/* Sidebar Right Column */}
          <div className="space-y-8">
            
            {/* Strength rings */}
            <ProfileCompletion data={activeData} />

            {/* Combined analytics & certifications card */}
            <PerformanceCard
              performance={activeData.performance}
              onChangePerformance={handleUpdatePerformance}
              certifications={activeData.certifications}
              onChangeCertifications={handleUpdateCertifications}
              recentActivity={activeData.recentActivity}
              isEditing={isEditing}
            />

          </div>

        </div>

      </main>
    </div>
  );
}

export default App;
