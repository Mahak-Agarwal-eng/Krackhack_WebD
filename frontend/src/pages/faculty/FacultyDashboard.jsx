import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { BookOpen, Users, Briefcase, BarChart3, Upload, CalendarPlus } from "lucide-react";

const stats = [
  { label: "Active Courses", value: "4", icon: BookOpen, color: "text-[#1e293b]" },
  { label: "Enrolled Scholars", value: "186", icon: Users, color: "text-[#1e293b]" },
  { label: "Open Opportunities", value: "5", icon: Briefcase, color: "text-[#1e293b]" },
  { label: "Avg Attendance", value: "82%", icon: BarChart3, color: "text-[#1e293b]" },
];

const FacultyDashboard = () => (
  <AppLayout>
    <div className="mb-10">
      <h1 className="text-4xl font-serif text-[#1e293b] mb-2">
        Good morning, <span className="text-[#1e293b]">Professor</span>
      </h1>
      <p className="text-[#64748b] font-sans">Manage academic mastery and scholar engagement.</p>
    </div>

    <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <GlassCard key={s.label} className="border-[#e2e8f0] bg-white shadow-sm">
          <div className="flex items-center justify-between p-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-[#94a3b8]">{s.label}</p>
              <p className="mt-1 text-3xl font-serif text-[#1e293b]">{s.value}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-[#f1f5f9] flex items-center justify-center">
              <s.icon className={`h-6 w-6 ${s.color}`} />
            </div>
          </div>
        </GlassCard>
      ))}
    </div>

    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h2 className="mb-6 text-xl font-serif text-[#1e293b]">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["CS201: Data Structures", "CS301: Algorithms"].map((course) => (
            <GlassCard key={course} className="border-[#e2e8f0] bg-white p-6">
              <h3 className="font-semibold text-[#1e293b] mb-4">{course}</h3>
              <div className="flex justify-between text-xs text-[#64748b]">
                <span>Scholars: 45/50</span>
                <span className="text-[#1f3a8a] font-bold">Attendance: 88%</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <GlassCard className="border-[#e2e8f0] bg-white p-6">
        <h2 className="mb-6 text-xl font-serif text-[#1e293b]">Quick Actions</h2>
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#1e293b] text-white text-sm font-semibold hover:opacity-90 transition">
            <Upload className="h-4 w-4" /> Upload Study Material
          </button>
          <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-[#e2e8f0] text-[#1e293b] text-sm font-semibold hover:bg-gray-50 transition">
            <CalendarPlus className="h-4 w-4" /> Create Academic Event
          </button>
        </div>
      </GlassCard>
    </div>
  </AppLayout>
);

export default FacultyDashboard;