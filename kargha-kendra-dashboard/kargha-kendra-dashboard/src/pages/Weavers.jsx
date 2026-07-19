import React, { useState } from 'react';
import { FiSearch, FiEdit, FiTrash2, FiUserPlus, FiFilter, FiX, FiCheck } from 'react-icons/fi';
import { weaversData } from '../utils/dummyData';

export default function Weavers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('All');
  const [weavers, setWeavers] = useState(weaversData);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentWeaver, setCurrentWeaver] = useState(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formSkill, setFormSkill] = useState('');
  const [formVillage, setFormVillage] = useState('');
  const [formTask, setFormTask] = useState('');
  const [formProductivity, setFormProductivity] = useState(90);
  const [formStatus, setFormStatus] = useState('Active');
  const [formExperience, setFormExperience] = useState('5 Years');

  const villages = ['All', ...new Set(weaversData.map(w => w.village.split(',')[0].trim()))];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredWeavers = weavers.filter(weaver => {
    const matchesSearch = 
      weaver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      weaver.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      weaver.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesVillage = 
      selectedVillage === 'All' || 
      weaver.village.toLowerCase().includes(selectedVillage.toLowerCase());

    return matchesSearch && matchesVillage;
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this weaver from the cooperative registry?")) {
      setWeavers(prev => prev.filter(w => w.id !== id));
    }
  };

  const openAddModal = () => {
    setFormName('');
    setFormSkill('Master Weaver (Banarasi Brocade)');
    setFormVillage('Sarai Mohana, Varanasi');
    setFormTask('Assigned Loom Prep');
    setFormProductivity(90);
    setFormStatus('Active');
    setFormExperience('5 Years');
    setShowAddModal(true);
  };

  const handleAddWeaver = (e) => {
    e.preventDefault();
    const newWeaver = {
      id: `W-${Math.floor(100 + Math.random() * 900)}`,
      name: formName,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random()*1000000)}?w=150`,
      skill: formSkill,
      village: formVillage,
      currentTask: formTask,
      productivity: parseInt(formProductivity),
      status: formStatus,
      experience: formExperience,
      looms: 1
    };
    setWeavers([newWeaver, ...weavers]);
    setShowAddModal(false);
    alert(`${formName} registered successfully.`);
  };

  const openEditModal = (weaver) => {
    setCurrentWeaver(weaver);
    setFormName(weaver.name);
    setFormSkill(weaver.skill);
    setFormVillage(weaver.village);
    setFormTask(weaver.currentTask);
    setFormProductivity(weaver.productivity);
    setFormStatus(weaver.status);
    setFormExperience(weaver.experience);
    setShowEditModal(true);
  };

  const handleEditWeaver = (e) => {
    e.preventDefault();
    setWeavers(prev => prev.map(w => {
      if (w.id === currentWeaver.id) {
        return {
          ...w,
          name: formName,
          skill: formSkill,
          village: formVillage,
          currentTask: formTask,
          productivity: parseInt(formProductivity),
          status: formStatus,
          experience: formExperience
        };
      }
      return w;
    }));
    setShowEditModal(false);
    alert(`Weaver profile for ${formName} updated.`);
  };

  return (
    <div className="premium-card p-6 space-y-6">
      
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">Cooperative Weavers Registry</h2>
          <p className="text-xs text-[#C9B79C] mt-0.5">Manage and track weaver details, tasks, and productivity indicators.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-[#5C3B1E] dark:bg-[#B88A44] hover:bg-[#B88A44] dark:hover:bg-[#a37637] text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all duration-200"
        >
          <FiUserPlus size={16} /> Register New Weaver
        </button>
      </div>

      {/* Filter and Search Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#5C3B1E]/40 dark:text-[#C9B79C]/40">
            <FiSearch size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search by name, skill, or ID..." 
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none focus:border-[#B88A44]"
          />
        </div>

        {/* Village Filter */}
        <div className="relative min-w-[160px]">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#5C3B1E]/40 dark:text-[#C9B79C]/40">
            <FiFilter size={14} />
          </span>
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none focus:border-[#B88A44] appearance-none"
          >
            {villages.map((v) => (
              <option key={v} value={v} className="bg-white dark:bg-[#2A221C] text-[#3E2A1A] dark:text-[#F5E9D6]">
                {v === 'All' ? 'All Clusters' : v}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Weavers Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#5C3B1E]/15 dark:border-white/10 text-[#C9B79C] font-semibold uppercase tracking-wider">
              <th className="pb-3 pl-2">Weaver Details</th>
              <th className="pb-3">Handloom Specialization</th>
              <th className="pb-3">Cluster / Village</th>
              <th className="pb-3">Current Assignment</th>
              <th className="pb-3">Productivity</th>
              <th className="pb-3">Loom Status</th>
              <th className="pb-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#5C3B1E]/5 dark:divide-white/5">
            {filteredWeavers.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-[#C9B79C]">
                  No weavers found matching your search.
                </td>
              </tr>
            ) : (
              filteredWeavers.map((weaver) => (
                <tr key={weaver.id} className="hover:bg-[#F8F3EA]/30 dark:hover:bg-[#18130F]/20 transition-all duration-150">
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-3">
                      <img 
                        src={weaver.avatar} 
                        alt={weaver.name} 
                        className="w-10 h-10 rounded-full object-cover border border-[#B88A44]/30"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }}
                      />
                      <div>
                        <h4 className="font-semibold text-[#3E2A1A] dark:text-[#F5E9D6]">{weaver.name}</h4>
                        <span className="text-[10px] text-[#C9B79C] block">{weaver.id} • {weaver.experience} exp</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 font-medium">{weaver.skill}</td>
                  
                  <td className="py-4 text-[#5C3B1E]/80 dark:text-[#C9B79C]/80">{weaver.village}</td>
                  
                  <td className="py-4 italic font-serif text-[#5C3B1E]/95 dark:text-[#F5E9D6]/90">{weaver.currentTask}</td>
                  
                  <td className="py-4">
                    <div className="w-24">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-[#4D7C4A]">{weaver.productivity}%</span>
                      </div>
                      <div className="w-full bg-[#5C3B1E]/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#4D7C4A] h-full rounded-full" 
                          style={{ width: `${weaver.productivity}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      weaver.status === 'Active' 
                        ? 'bg-green-100 text-[#4D7C4A] dark:bg-[#4D7C4A]/25 dark:text-green-300' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/25 dark:text-amber-300'
                    }`}>
                      {weaver.status} ({weaver.looms} Loom{weaver.looms > 1 ? 's' : ''})
                    </span>
                  </td>
                  
                  <td className="py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => openEditModal(weaver)}
                        className="p-1.5 rounded-lg border border-[#5C3B1E]/10 dark:border-white/10 hover:bg-[#F8F3EA] dark:hover:bg-[#18130F] text-[#5C3B1E] dark:text-[#F5E9D6]" 
                        title="Edit Details"
                      >
                        <FiEdit size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(weaver.id)}
                        className="p-1.5 rounded-lg border border-[#5C3B1E]/10 dark:border-white/10 hover:bg-red-50 dark:hover:bg-red-950/20 text-[#A94442]" 
                        title="Delete Weaver"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Weaver Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#2A221C] w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-[#5C3B1E]/10 dark:border-white/5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#5C3B1E]/10 dark:border-white/5 pb-3">
              <h3 className="font-bold text-sm text-[#5C3B1E] dark:text-[#EAD8B8]">Register New Handloom Weaver</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#C9B79C] hover:text-[#A94442]"><FiX size={18} /></button>
            </div>
            <form onSubmit={handleAddWeaver} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[9px] text-[#C9B79C] font-bold">WEAVER FULL NAME</label>
                <input 
                  type="text" 
                  value={formName} 
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  required 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-[#C9B79C] font-bold">WEAVING SPECIALIZATION</label>
                <input 
                  type="text" 
                  value={formSkill} 
                  onChange={(e) => setFormSkill(e.target.value)}
                  placeholder="e.g. Banarasi Silk Brocade"
                  className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  required 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-[#C9B79C] font-bold">CLUSTER / VILLAGE</label>
                <input 
                  type="text" 
                  value={formVillage} 
                  onChange={(e) => setFormVillage(e.target.value)}
                  placeholder="e.g. Sarai Mohana, Varanasi"
                  className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-[#C9B79C] font-bold">EXPERIENCE</label>
                  <input 
                    type="text" 
                    value={formExperience} 
                    onChange={(e) => setFormExperience(e.target.value)}
                    placeholder="e.g. 10 Years"
                    className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-[#C9B79C] font-bold">PRODUCTIVITY (%)</label>
                  <input 
                    type="number" 
                    value={formProductivity} 
                    onChange={(e) => setFormProductivity(e.target.value)}
                    min="1" max="100"
                    className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                    required 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-[#C9B79C] font-bold">INITIAL ASSIGNMENT</label>
                <input 
                  type="text" 
                  value={formTask} 
                  onChange={(e) => setFormTask(e.target.value)}
                  placeholder="e.g. Gold Zari Brocade"
                  className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  required 
                />
              </div>
              <div className="flex justify-end pt-4 border-t border-[#5C3B1E]/10 dark:border-white/5 gap-2">
                <button type="submit" className="bg-[#4D7C4A] hover:bg-[#3d623b] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1"><FiCheck /> Register</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="border border-[#5C3B1E]/20 text-[#5C3B1E] dark:text-[#F5E9D6] px-4 py-2 rounded-xl">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Weaver Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#2A221C] w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-[#5C3B1E]/10 dark:border-white/5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#5C3B1E]/10 dark:border-white/5 pb-3">
              <h3 className="font-bold text-sm text-[#5C3B1E] dark:text-[#EAD8B8]">Edit Weaver Registry Details</h3>
              <button onClick={() => setShowEditModal(false)} className="text-[#C9B79C] hover:text-[#A94442]"><FiX size={18} /></button>
            </div>
            <form onSubmit={handleEditWeaver} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[9px] text-[#C9B79C] font-bold">WEAVER FULL NAME</label>
                <input 
                  type="text" 
                  value={formName} 
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  required 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-[#C9B79C] font-bold">WEAVING SPECIALIZATION</label>
                <input 
                  type="text" 
                  value={formSkill} 
                  onChange={(e) => setFormSkill(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  required 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-[#C9B79C] font-bold">CLUSTER / VILLAGE</label>
                <input 
                  type="text" 
                  value={formVillage} 
                  onChange={(e) => setFormVillage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-[#C9B79C] font-bold">EXPERIENCE</label>
                  <input 
                    type="text" 
                    value={formExperience} 
                    onChange={(e) => setFormExperience(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-[#C9B79C] font-bold">PRODUCTIVITY (%)</label>
                  <input 
                    type="number" 
                    value={formProductivity} 
                    onChange={(e) => setFormProductivity(e.target.value)}
                    min="1" max="100"
                    className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                    required 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-[#C9B79C] font-bold">CURRENT ASSIGNMENT</label>
                <input 
                  type="text" 
                  value={formTask} 
                  onChange={(e) => setFormTask(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-[#C9B79C] font-bold">LOOM STATUS</label>
                  <select 
                    value={formStatus} 
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-[#5C3B1E]/10 dark:border-white/5 gap-2">
                <button type="submit" className="bg-[#B88A44] hover:bg-[#a37637] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1"><FiCheck /> Save Changes</button>
                <button type="button" onClick={() => setShowEditModal(false)} className="border border-[#5C3B1E]/20 text-[#5C3B1E] dark:text-[#F5E9D6] px-4 py-2 rounded-xl">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
