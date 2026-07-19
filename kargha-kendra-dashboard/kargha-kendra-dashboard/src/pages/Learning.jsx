import React from 'react';
import { FiBookOpen, FiYoutube, FiAward, FiHeart, FiTrendingUp } from 'react-icons/fi';
import { learningCourses } from '../utils/dummyData';

export default function Learning() {
  const getCategoryColor = (cat) => {
    switch (cat.toLowerCase()) {
      case 'safety':
        return 'bg-red-50 text-[#A94442] dark:bg-red-950/20 dark:text-red-300';
      case 'financial':
        return 'bg-blue-50 text-blue-800 dark:bg-blue-950/20 dark:text-blue-300';
      default:
        return 'bg-green-50 text-[#4D7C4A] dark:bg-green-950/20 dark:text-green-300';
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat.toLowerCase()) {
      case 'safety':
        return <FiHeart className="text-[#A94442]" />;
      case 'financial':
        return <FiAward className="text-blue-600" />;
      default:
        return <FiYoutube className="text-[#4D7C4A]" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Overview stats */}
      <div className="premium-card p-5 bg-[#5C3B1E]/5 dark:bg-[#2A221C]/25 border border-[#5C3B1E]/10 dark:border-white/5 flex gap-4 items-center">
        <div className="p-3 bg-[#B88A44]/15 rounded-2xl text-[#B88A44]">
          <FiBookOpen size={24} />
        </div>
        <div className="text-xs space-y-1">
          <h4 className="font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">Cooperative Weaver Skill Upgrade Hub</h4>
          <p className="text-[#C9B79C]">Educational resources, safety protocols, and government subsidies list broadcasted to weavers to improve loom performance.</p>
        </div>
      </div>

      {/* Courses/Schemes list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {learningCourses.map((course) => (
          <div key={course.id} className="premium-card p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Category & Badge */}
              <div className="flex justify-between items-center">
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${getCategoryColor(course.category)}`}>
                  {course.category}
                </span>
                <span className="text-[9px] text-[#C9B79C]">{course.duration}</span>
              </div>

              {/* Icon / Media placeholder */}
              <div className="h-32 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 rounded-xl border border-[#5C3B1E]/5 flex items-center justify-center text-[#B88A44]">
                {getCategoryIcon(course.category)}
              </div>

              {/* Title */}
              <h3 className="font-serif text-xs font-bold text-[#3E2A1A] dark:text-[#F5E9D6] leading-snug">
                {course.title}
              </h3>
            </div>

            {/* Progress indicators */}
            <div className="space-y-1.5 pt-2 border-t border-[#5C3B1E]/5">
              <div className="flex justify-between items-center text-[9px] text-[#C9B79C]">
                <span>Registered Weaver Progress</span>
                <span className="font-bold">{course.completionRate}%</span>
              </div>
              <div className="w-full bg-[#5C3B1E]/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#4D7C4A] h-full rounded-full" 
                  style={{ width: `${course.completionRate}%` }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
