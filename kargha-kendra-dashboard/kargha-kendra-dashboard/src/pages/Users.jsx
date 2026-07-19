import React, { useState } from 'react';
import { FiCheck, FiX, FiShield, FiUserPlus } from 'react-icons/fi';
import { userManagement } from '../utils/dummyData';

export default function Users() {
  const [users, setUsers] = useState(userManagement.users);
  
  // Matrix of role permissions
  const [rolePermissions, setRolePermissions] = useState({
    'Cooperative Admin': { read: true, write: true, delete: true },
    'Production Manager': { read: true, write: true, delete: false },
    'Quality Inspector': { read: true, write: true, delete: false },
    'Finance Officer': { read: true, write: true, delete: false }
  });

  const togglePermission = (role, perm) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [perm]: !prev[role][perm]
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Role list and user count */}
      <div className="premium-card p-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-base font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">Cooperative Accounts</h3>
            <p className="text-xs text-[#C9B79C] mt-0.5">Manage permissions and team access levels.</p>
          </div>
          <button className="flex items-center gap-1.5 bg-[#5C3B1E] dark:bg-[#B88A44] hover:bg-[#B88A44] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200">
            <FiUserPlus size={16} /> Add Co-op Member
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {users.map((u) => (
            <div key={u.id} className="p-3.5 border border-[#5C3B1E]/10 dark:border-white/10 rounded-xl bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-xs space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">{u.name}</h4>
                <FiShield size={14} className="text-[#B88A44]" />
              </div>
              <p className="text-[#C9B79C] text-[10px] truncate">{u.email}</p>
              <span className="inline-block bg-[#5C3B1E] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                {u.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CRUD Permission Matrix */}
      <div className="premium-card p-5">
        <h3 className="text-sm font-bold text-[#3E2A1A] dark:text-[#F5E9D6] mb-3">Role-Based CRUD Permission Matrix</h3>
        <p className="text-xs text-[#C9B79C] mb-4">Configure access policies dynamically. Changes apply immediately to corresponding account accounts.</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#5C3B1E]/15 dark:border-white/10 text-[#C9B79C] font-semibold uppercase">
                <th className="pb-3 pl-2">Cooperative Role</th>
                <th className="pb-3 text-center">Read Records</th>
                <th className="pb-3 text-center">Create & Write</th>
                <th className="pb-3 text-center">Delete Permissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5C3B1E]/5 dark:divide-white/5">
              {Object.keys(rolePermissions).map((role) => (
                <tr key={role} className="hover:bg-[#F8F3EA]/30 dark:hover:bg-white/5 transition-all">
                  <td className="py-4 pl-2 font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">{role}</td>
                  
                  {/* Read */}
                  <td className="py-4 text-center">
                    <button
                      onClick={() => togglePermission(role, 'read')}
                      className={`p-1.5 rounded-lg border ${
                        rolePermissions[role].read 
                          ? 'bg-green-50 border-[#4D7C4A]/30 text-[#4D7C4A]' 
                          : 'bg-red-50 border-[#A94442]/30 text-[#A94442]'
                      }`}
                    >
                      {rolePermissions[role].read ? <FiCheck size={14} /> : <FiX size={14} />}
                    </button>
                  </td>

                  {/* Write */}
                  <td className="py-4 text-center">
                    <button
                      onClick={() => togglePermission(role, 'write')}
                      className={`p-1.5 rounded-lg border ${
                        rolePermissions[role].write 
                          ? 'bg-green-50 border-[#4D7C4A]/30 text-[#4D7C4A]' 
                          : 'bg-red-50 border-[#A94442]/30 text-[#A94442]'
                      }`}
                    >
                      {rolePermissions[role].write ? <FiCheck size={14} /> : <FiX size={14} />}
                    </button>
                  </td>

                  {/* Delete */}
                  <td className="py-4 text-center">
                    <button
                      onClick={() => togglePermission(role, 'delete')}
                      className={`p-1.5 rounded-lg border ${
                        rolePermissions[role].delete 
                          ? 'bg-green-50 border-[#4D7C4A]/30 text-[#4D7C4A]' 
                          : 'bg-red-50 border-[#A94442]/30 text-[#A94442]'
                      }`}
                    >
                      {rolePermissions[role].delete ? <FiCheck size={14} /> : <FiX size={14} />}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
