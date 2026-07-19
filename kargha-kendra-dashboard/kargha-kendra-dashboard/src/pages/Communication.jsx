import React, { useState, useRef, useEffect } from 'react';
import { 
  FiPhone, FiVideo, FiPaperclip, FiSend, FiPlus, 
  FiMoreVertical, FiUser, FiFileText, FiImage, FiX 
} from 'react-icons/fi';

const CHATS = [
  {
    id: 1,
    name: "Varanasi Weavers Cluster",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    lastMsg: "Double-warp checking completed for gold borders.",
    messages: [
      { sender: "Ramesh Devangan", text: "Namaste, we need 10kg more Mulberry Silk (Grade A) by tomorrow.", time: "10:15 AM", self: false },
      { sender: "Admin", text: "Approved.Sourcing department has released PO #42 to Karnataka Silk Board.", time: "10:30 AM", self: true },
      { sender: "Ramesh Devangan", text: "Great, warp alignment is set up on Loom #2.", time: "10:45 AM", self: false },
    ]
  },
  {
    id: 2,
    name: "Cooperative Executive Board",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    lastMsg: "exhibition proposals sent for textile ministry sync.",
    messages: [
      { sender: "President", text: "All members please note: National Handloom Day forms close on July 31st.", time: "Yesterday", self: false },
      { sender: "Finance Officer", text: "Weaver wage disbursement NEFT logs are prepared.", time: "Yesterday", self: false },
    ]
  },
  {
    id: 3,
    name: "Pochampally Warp Designers",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    lastMsg: "Double Ikat graph pattern upload ready.",
    messages: [
      { sender: "Sita Devi", text: "I have prepared the graph layout for the next double ikat weave.", time: "2 days ago", self: false },
    ]
  }
];

export default function Communication() {
  const [chats, setChats] = useState(CHATS);
  const [activeChatId, setActiveChatId] = useState(1);
  const [inputText, setInputText] = useState('');
  
  // Modals
  const [showCallModal, setShowCallModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [callType, setCallType] = useState('Voice'); // 'Voice' | 'Video'

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat.messages]);

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const newMsg = {
      sender: "Admin",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      self: true
    };

    setChats(prev => prev.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          lastMsg: textToSend,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));

    setInputText('');
  };

  const triggerCall = (type) => {
    setCallType(type);
    setShowCallModal(true);
  };

  const handleSendMedia = (mediaType, name) => {
    setShowMediaModal(false);
    handleSend(`[Sent ${mediaType}: ${name}]`);
    alert(`${mediaType} attachment broadcasted to cluster.`);
  };

  return (
    <div className="premium-card overflow-hidden h-[72vh] flex border border-[#5C3B1E]/10 dark:border-white/5 relative">
      
      {/* 1. LEFT PANEL: Chats Directory */}
      <div className="w-80 border-r border-[#5C3B1E]/10 dark:border-white/5 bg-white dark:bg-[#2A221C] flex flex-col shrink-0">
        <div className="p-4 border-b border-[#5C3B1E]/10 dark:border-white/5 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45">
          <h3 className="font-bold text-sm text-[#5C3B1E] dark:text-[#EAD8B8]">Cooperative Messenger</h3>
          <p className="text-[10px] text-[#C9B79C] mt-0.5">Live link to loom weavers & clusters.</p>
        </div>
        
        {/* Chats List */}
        <div className="flex-grow overflow-y-auto divide-y divide-[#5C3B1E]/5 dark:divide-white/5">
          {chats.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveChatId(c.id)}
              className={`w-full text-left p-3.5 flex gap-3 transition-colors ${
                activeChatId === c.id 
                  ? 'bg-[#F8F3EA]/60 dark:bg-[#18130F]/40 border-l-4 border-[#B88A44]' 
                  : 'hover:bg-[#F8F3EA]/20 dark:hover:bg-white/5'
              }`}
            >
              <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#B88A44]/20" />
              <div className="overflow-hidden space-y-0.5">
                <h4 className="font-bold text-xs text-[#3E2A1A] dark:text-[#F5E9D6] truncate">{c.name}</h4>
                <p className="text-[10px] text-[#C9B79C] truncate leading-normal">{c.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. RIGHT PANEL: Chat Window */}
      <div className="flex-grow flex flex-col justify-between bg-[#F8F3EA]/15 dark:bg-[#1F1A17]/15">
        
        {/* Chat Window Header */}
        <div className="px-5 py-3 border-b border-[#5C3B1E]/10 dark:border-white/5 bg-white dark:bg-[#2A221C] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <img src={activeChat.avatar} alt={activeChat.name} className="w-9 h-9 rounded-full object-cover border border-[#B88A44]/20" />
            <div>
              <h4 className="font-bold text-xs text-[#3E2A1A] dark:text-[#F5E9D6] leading-tight">{activeChat.name}</h4>
              <span className="text-[9px] text-[#4D7C4A] font-bold block mt-0.5">• Online</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => triggerCall('Voice')}
              className="p-2 rounded-lg text-[#5C3B1E] dark:text-[#F5E9D6] hover:bg-[#F8F3EA] dark:hover:bg-[#18130F] transition-colors"
              title="Voice Call"
            >
              <FiPhone size={16} />
            </button>
            <button 
              onClick={() => triggerCall('Video')}
              className="p-2 rounded-lg text-[#5C3B1E] dark:text-[#F5E9D6] hover:bg-[#F8F3EA] dark:hover:bg-[#18130F] transition-colors"
              title="Video Call"
            >
              <FiVideo size={16} />
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {activeChat.messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col max-w-[70%] space-y-1 ${m.self ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <span className="text-[9px] text-[#C9B79C] px-1">{m.sender}</span>
              <div 
                className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  m.self 
                    ? 'bg-[#5C3B1E] text-white rounded-tr-none' 
                    : 'bg-white dark:bg-[#2A221C] text-[#3E2A1A] dark:text-[#F5E9D6] rounded-tl-none border border-[#5C3B1E]/5 dark:border-white/5'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[8px] text-[#C9B79C] px-1">{m.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Footer */}
        <div className="p-4 bg-white dark:bg-[#2A221C] border-t border-[#5C3B1E]/10 dark:border-white/5 flex items-center gap-3 shadow-inner">
          <button 
            onClick={() => setShowMediaModal(true)}
            className="p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 text-[#5C3B1E] dark:text-[#F5E9D6] hover:bg-[#F8F3EA] dark:hover:bg-[#18130F] hover:text-[#B88A44] transition-all"
            title="Attach Media File"
          >
            <FiPaperclip size={16} />
          </button>
          
          <input 
            type="text" 
            placeholder="Type message, yarn requirement, pattern queries..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow p-2.5 text-xs rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none focus:border-[#B88A44]"
          />

          <button 
            onClick={() => handleSend()}
            className="p-2.5 rounded-xl bg-[#5C3B1E] dark:bg-[#B88A44] hover:bg-[#B88A44] text-white transition-all shadow-sm"
          >
            <FiSend size={16} />
          </button>
        </div>

      </div>

      {/* Call Dialog Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A221C] text-[#F5E9D6] w-full max-w-sm rounded-3xl p-6 text-center space-y-6 shadow-2xl border border-white/5">
            <div className="flex justify-end">
              <button onClick={() => setShowCallModal(false)} className="text-[#C9B79C] hover:text-red-400"><FiX size={20} /></button>
            </div>
            
            <div className="space-y-3">
              <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-[#B88A44] shadow-lg">
                <img src={activeChat.avatar} alt={activeChat.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-base">{activeChat.name}</h3>
              <p className="text-xs text-green-400 animate-pulse">Establishing secure VoIP connection...</p>
            </div>

            <div className="text-xs text-[#C9B79C] bg-[#18130F] p-4 rounded-2xl flex items-center justify-center gap-2">
              <span>{callType} calling handloom cluster...</span>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button 
                onClick={() => {
                  alert("Call answered mock.");
                  setShowCallModal(false);
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-2.5 px-6 rounded-2xl"
              >
                Accept
              </button>
              <button 
                onClick={() => setShowCallModal(false)}
                className="bg-red-700 hover:bg-red-800 text-white font-bold text-xs py-2.5 px-6 rounded-2xl"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Media Modal */}
      {showMediaModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#2A221C] w-full max-w-sm rounded-2xl p-6 shadow-2xl relative border border-[#5C3B1E]/10 dark:border-white/5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#5C3B1E]/10 dark:border-white/5 pb-3">
              <h3 className="font-bold text-sm text-[#5C3B1E] dark:text-[#EAD8B8]">Broadcast Attachment</h3>
              <button onClick={() => setShowMediaModal(false)} className="text-[#C9B79C] hover:text-[#A94442]"><FiX size={18} /></button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button 
                onClick={() => handleSendMedia('Weaving Pattern Schema', 'Double_Ikat_Design_Graph.pdf')}
                className="p-4 border border-[#5C3B1E]/10 rounded-xl hover:bg-[#F8F3EA]/30 dark:hover:bg-white/5 flex flex-col items-center gap-2 font-bold"
              >
                <FiFileText size={24} className="text-[#B88A44]" />
                <span>Send Pattern PDF</span>
              </button>
              
              <button 
                onClick={() => handleSendMedia('Weaver photo scan', 'Loom_Quality_Verify.jpg')}
                className="p-4 border border-[#5C3B1E]/10 rounded-xl hover:bg-[#F8F3EA]/30 dark:hover:bg-white/5 flex flex-col items-center gap-2 font-bold"
              >
                <FiImage size={24} className="text-[#4D7C4A]" />
                <span>Send Photo Scan</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
