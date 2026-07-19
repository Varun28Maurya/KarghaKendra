import React, { useState } from 'react';
import { FiDownload, FiFileText, FiX, FiCheck } from 'react-icons/fi';

const REPORTS = [
  { 
    id: 'REP-01', 
    title: 'Monthly Loom Production Log', 
    desc: 'Detailed report of weave lengths by weaver and village cluster.', 
    format: 'PDF & Excel', 
    govForm: 'Form NH-12',
    data: [
      { id: "1", weaver: "Ramesh Devangan", cluster: "Varanasi", fabric: "Silk Brocade", length: "45 meters", date: "2026-07-18" },
      { id: "2", weaver: "Sita Devi", cluster: "Pochampally", fabric: "Double Ikat", length: "32 meters", date: "2026-07-15" },
      { id: "3", weaver: "Madan Lal Salvi", cluster: "Kota", fabric: "Cotton Doria", length: "55 meters", date: "2026-07-16" }
    ]
  },
  { 
    id: 'REP-02', 
    title: 'Wage Disbursements & Subsidy Ledger', 
    desc: 'Certified salary logs for national weaver minimum-wage claims.', 
    format: 'PDF & Excel', 
    govForm: 'Form H-24 (Cooperative Board)',
    data: [
      { id: "1", weaver: "Ramesh Devangan", wage: "₹18,500", status: "Cleared", method: "Bank NEFT" },
      { id: "2", weaver: "Sita Devi", wage: "₹14,200", status: "Cleared", method: "Bank NEFT" },
      { id: "3", weaver: "Anjali Tanti", wage: "₹12,800", status: "Cleared", method: "Bank NEFT" }
    ]
  },
  { 
    id: 'REP-03', 
    title: 'GI Craft Verification & Silk Audit', 
    desc: 'Audited log of GI-marked silk count yarn utilization.', 
    format: 'PDF only', 
    govForm: 'Form GI-Marking Certificate',
    data: [
      { id: "1", cluster: "Varanasi", markNo: "GI-MARK-891-VNS", type: "Banarasi Silk", yarnGrade: "Mulberry Silk (A)", verified: "Yes" },
      { id: "2", cluster: "Pochampally", markNo: "GI-MARK-230-PCH", type: "Ikat Silk", yarnGrade: "Tussar Silk", verified: "Yes" }
    ]
  }
];

export default function Reports() {
  const [downloading, setDownloading] = useState(null);
  const [viewingReport, setViewingReport] = useState(null); // Report object currently viewed inline

  const handleDownload = (report, formatType) => {
    setDownloading(report.id);
    
    setTimeout(() => {
      setDownloading(null);
      
      // Trigger a real file download containing report details
      const title = report.title;
      const govForm = report.govForm;
      const dataRows = JSON.stringify(report.data, null, 2);
      const textContent = `=========================================\nKARGHA KENDRA COOPERATIVE GOVERNMENT REPORT\n=========================================\nTitle: ${title}\nForm: ${govForm}\nExport Format: ${formatType}\nGenerated At: ${new Date().toLocaleString()}\n\nData Logs:\n${dataRows}\n\n=========================================`;
      
      const fileBlob = new Blob([textContent], { type: 'text/plain' });
      const element = document.createElement("a");
      element.href = URL.createObjectURL(fileBlob);
      element.download = `${title.toLowerCase().replace(/\s+/g, '_')}_gov_report.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      <div className="premium-card p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">Cooperative Reports Hub</h2>
          <p className="text-xs text-[#C9B79C] mt-0.5">Export certified PDF and Excel documents matching Ministry of Textiles schemas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REPORTS.map((rep) => (
            <div key={rep.id} className="p-5 border border-[#5C3B1E]/10 dark:border-white/10 rounded-2xl bg-[#F8F3EA]/10 dark:bg-[#18130F]/10 flex flex-col justify-between space-y-4">
              
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] bg-[#B88A44]/15 text-[#B88A44] px-2 py-0.5 rounded font-bold">{rep.govForm}</span>
                </div>
                <h3 className="font-serif text-sm font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">
                  {rep.title}
                </h3>
                <p className="text-xs text-[#5C3B1E]/70 dark:text-[#C9B79C]/80 leading-relaxed">
                  {rep.desc}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#5C3B1E]/5">
                <button
                  onClick={() => setViewingReport(rep)}
                  className="w-full flex items-center justify-center gap-1.5 bg-[#5C3B1E] dark:bg-[#B88A44] hover:bg-[#B88A44] text-white text-xs font-semibold py-2 rounded-xl transition-all"
                >
                  <FiFileText size={14} /> View Report Data
                </button>
                <button
                  disabled={downloading !== null}
                  onClick={() => handleDownload(rep, 'Excel Sheet')}
                  className="w-full flex items-center justify-center gap-1.5 border border-[#5C3B1E]/20 text-[#5C3B1E] dark:text-[#F5E9D6] dark:border-white/15 hover:bg-[#F8F3EA] dark:hover:bg-[#18130F] text-xs font-semibold py-2 rounded-xl transition-all disabled:opacity-40"
                >
                  <FiDownload size={14} /> {downloading === rep.id ? 'Generating...' : 'Download Gov Audit'}
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Inline Data Table Viewer */}
      {viewingReport && (
        <div className="premium-card p-5 border border-[#B88A44]/35 relative animate-fade-in">
          <div className="flex justify-between items-center border-b border-[#5C3B1E]/10 dark:border-white/5 pb-3 mb-4">
            <div>
              <span className="text-[10px] text-[#C9B79C] block">{viewingReport.govForm}</span>
              <h3 className="font-serif text-sm font-bold text-[#5C3B1E] dark:text-[#EAD8B8]">{viewingReport.title}</h3>
            </div>
            <button 
              onClick={() => setViewingReport(null)}
              className="text-[#C9B79C] hover:text-[#A94442] p-1 rounded-lg hover:bg-[#F8F3EA]/50"
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 border-b border-[#5C3B1E]/10 dark:border-white/5 text-[#C9B79C] font-semibold uppercase">
                  {Object.keys(viewingReport.data[0]).map((key) => (
                    <th key={key} className="p-3 capitalize">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#5C3B1E]/5 dark:divide-white/5">
                {viewingReport.data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F3EA]/20 dark:hover:bg-white/5">
                    {Object.values(row).map((val, cIdx) => (
                      <td key={cIdx} className="p-3 font-medium">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end gap-2 border-t border-[#5C3B1E]/5 pt-3">
            <button 
              onClick={() => handleDownload(viewingReport, 'PDF Document')}
              className="bg-[#4D7C4A] hover:bg-[#3d623b] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1"
            >
              <FiDownload size={14} /> Download PDF Version
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
