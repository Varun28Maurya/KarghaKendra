import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiPlusCircle, FiUser, FiCalendar, FiX, FiCheck } from 'react-icons/fi';
import { productionTasks } from '../utils/dummyData';

const LANES = [
  { id: 'Raw Material', title: 'Raw Material', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  { id: 'Warping', title: 'Warping (Tana)', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  { id: 'Weaving', title: 'Weaving (Bana)', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },
  { id: 'Quality Check', title: 'Quality Check', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  { id: 'Packaging', title: 'Packaging', color: 'bg-pink-500/10 text-pink-500 border-pink-500/20' },
  { id: 'Shipped', title: 'Shipped (Moksha)', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
];

export default function Production() {
  const [tasks, setTasks] = useState(productionTasks);
  
  // Allocate task modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formWeaver, setFormWeaver] = useState('');
  const [formPriority, setFormPriority] = useState('Medium');
  const [formDeadline, setFormDeadline] = useState('');

  // Shift task left or right
  const moveTask = (taskId, direction) => {
    const laneIndex = (laneId) => LANES.findIndex(l => l.id === laneId);
    
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const currentIdx = laneIndex(task.stage);
        let nextIdx = currentIdx + direction;
        if (nextIdx >= 0 && nextIdx < LANES.length) {
          // Adjust progress based on stage index
          const progressPercentage = Math.round((nextIdx / (LANES.length - 1)) * 100);
          return {
            ...task,
            stage: LANES[nextIdx].id,
            progress: progressPercentage
          };
        }
      }
      return task;
    }));
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!formTitle || !formWeaver || !formDeadline) return;

    const newTask = {
      id: `TASK-0${tasks.length + 1}`,
      title: formTitle,
      weaver: formWeaver,
      priority: formPriority,
      progress: 0,
      stage: 'Raw Material',
      deadline: formDeadline
    };

    setTasks([...tasks, newTask]);
    setShowAddModal(false);
    setFormTitle('');
    setFormWeaver('');
    setFormDeadline('');
    alert(`Loom task allocated and assigned to ${formWeaver}.`);
  };

  const getPriorityColor = (p) => {
    switch (p.toLowerCase()) {
      case 'high':
        return 'bg-red-50 text-[#A94442] dark:bg-red-950/20 dark:text-red-300';
      case 'medium':
        return 'bg-amber-50 text-amber-800 dark:bg-amber-950/20 dark:text-amber-300';
      default:
        return 'bg-green-50 text-[#4D7C4A] dark:bg-[#4D7C4A]/10 dark:text-green-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="premium-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">Production Control Center</h2>
          <p className="text-xs text-[#C9B79C] mt-0.5">Monitor and shift fabric weaving stages dynamically.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-[#5C3B1E] dark:bg-[#B88A44] hover:bg-[#B88A44] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200"
        >
          <FiPlusCircle size={16} /> Allocate New Loom Task
        </button>
      </div>

      {/* Kanban Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {LANES.map((lane) => {
          const laneTasks = tasks.filter(t => t.stage === lane.id);
          return (
            <div 
              key={lane.id} 
              className="bg-white/40 dark:bg-[#2A221C]/35 rounded-2xl p-4 border border-[#5C3B1E]/5 dark:border-white/5 flex flex-col min-w-[220px] max-h-[70vh]"
            >
              {/* Lane Header */}
              <div className={`p-2 rounded-xl mb-4 border text-center font-bold text-xs uppercase ${lane.color}`}>
                {lane.title} ({laneTasks.length})
              </div>

              {/* Tasks List */}
              <div className="space-y-3 flex-grow overflow-y-auto pr-1">
                <AnimatePresence>
                  {laneTasks.map((task) => (
                    <motion.div
                      layout
                      key={task.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white dark:bg-[#2A221C] rounded-xl p-3.5 border border-[#5C3B1E]/10 dark:border-white/10 shadow-sm relative group space-y-3"
                    >
                      {/* Priority Tag */}
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-wide uppercase ${getPriorityColor(task.priority)}`}>
                        {task.priority} Priority
                      </span>

                      {/* Title */}
                      <h4 className="text-xs font-bold text-[#3E2A1A] dark:text-[#F5E9D6] leading-tight font-serif mt-1">
                        {task.title}
                      </h4>

                      {/* Assignee */}
                      <div className="flex items-center gap-1.5 text-[9px] text-[#C9B79C]">
                        <FiUser size={12} className="text-[#B88A44]" />
                        <span>{task.weaver}</span>
                      </div>

                      {/* Deadline */}
                      <div className="flex items-center gap-1.5 text-[9px] text-[#C9B79C]">
                        <FiCalendar size={12} />
                        <span>{task.deadline}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[8px] font-bold text-[#C9B79C]">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="w-full bg-[#5C3B1E]/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#B88A44] h-full rounded-full transition-all duration-300"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Shift controls */}
                      <div className="flex justify-between items-center pt-2 border-t border-[#5C3B1E]/5 dark:border-white/5">
                        <button
                          disabled={task.stage === 'Raw Material'}
                          onClick={() => moveTask(task.id, -1)}
                          className="p-1 rounded bg-[#F8F3EA] dark:bg-[#18130F] text-[#5C3B1E] dark:text-[#F5E9D6] disabled:opacity-40 disabled:hover:bg-[#F8F3EA] hover:bg-[#B88A44] hover:text-white transition-colors"
                        >
                          <FiChevronLeft size={12} />
                        </button>
                        <span className="text-[8px] font-bold text-[#B88A44] uppercase tracking-wider">{task.id}</span>
                        <button
                          disabled={task.stage === 'Shipped'}
                          onClick={() => moveTask(task.id, 1)}
                          className="p-1 rounded bg-[#F8F3EA] dark:bg-[#18130F] text-[#5C3B1E] dark:text-[#F5E9D6] disabled:opacity-40 disabled:hover:bg-[#F8F3EA] hover:bg-[#B88A44] hover:text-white transition-colors"
                        >
                          <FiChevronRight size={12} />
                        </button>
                      </div>

                    </motion.div>
                  ))}
                </AnimatePresence>
                {laneTasks.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-[#5C3B1E]/5 dark:border-white/5 rounded-xl flex items-center justify-center text-[10px] text-[#C9B79C] p-4 text-center">
                    Empty Stage
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Allocate Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#2A221C] w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-[#5C3B1E]/10 dark:border-white/5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#5C3B1E]/10 dark:border-white/5 pb-3">
              <h3 className="font-bold text-sm text-[#5C3B1E] dark:text-[#EAD8B8]">Allocate Loom Task</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#C9B79C] hover:text-[#A94442]"><FiX size={18} /></button>
            </div>
            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[9px] text-[#C9B79C] font-bold">TASK TITLE (PRODUCT DESC)</label>
                <input 
                  type="text" 
                  value={formTitle} 
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Mulberry Silk Brocade Warping"
                  className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  required 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-[#C9B79C] font-bold">ASSIGNED WEAVER</label>
                <input 
                  type="text" 
                  value={formWeaver} 
                  onChange={(e) => setFormWeaver(e.target.value)}
                  placeholder="e.g. Ramesh Devangan"
                  className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-[#C9B79C] font-bold">PRIORITY</label>
                  <select 
                    value={formPriority} 
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-[#C9B79C] font-bold">TARGET DEADLINE</label>
                  <input 
                    type="date" 
                    value={formDeadline} 
                    onChange={(e) => setFormDeadline(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                    required 
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-[#5C3B1E]/10 dark:border-white/5 gap-2">
                <button type="submit" className="bg-[#4D7C4A] hover:bg-[#3d623b] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1"><FiCheck /> Allocate Task</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="border border-[#5C3B1E]/20 text-[#5C3B1E] dark:text-[#F5E9D6] px-4 py-2 rounded-xl">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
