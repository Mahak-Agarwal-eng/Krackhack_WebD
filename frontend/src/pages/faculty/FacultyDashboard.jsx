import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import {
  Upload,
  CalendarPlus,
  Users,
  BookOpen,
  ClipboardList,
  BarChart3,
} from "lucide-react";

const stats = [
  { label: "Active Courses", value: "4", icon: BookOpen, color: "text-blue-700" },
  { label: "Total Enrollments", value: "186", icon: Users, color: "text-indigo-600" },
  { label: "Pending Verifications", value: "3", icon: ClipboardList, color: "text-amber-500" },
  { label: "Avg Attendance", value: "82%", icon: BarChart3, color: "text-emerald-600" },
];

const FacultyDashboard = () => (
  <AppLayout>
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-blue-800">
        Faculty Dashboard
      </h1>
      <p className="mt-1 text-gray-500">
        Manage courses, resources and academic engagement.
      </p>
    </div>

    {/* Stats */}
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <GlassCard key={s.label} hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-800">
                {s.value}
              </p>
            </div>
            <s.icon className={`h-8 w-8 ${s.color}`} />
          </div>
        </GlassCard>
      ))}
    </div>

    {/* Actions */}
    <div className="grid gap-6 md:grid-cols-2">
      <GlassCard hover className="flex items-center gap-4">
        <Upload className="h-8 w-8 text-blue-700" />
        <div>
          <h3 className="font-semibold text-gray-800">Upload Resources</h3>
          <p className="text-xs text-gray-500">
            Share verified study materials
          </p>
        </div>
      </GlassCard>

      <GlassCard hover className="flex items-center gap-4">
        <CalendarPlus className="h-8 w-8 text-indigo-600" />
        <div>
          <h3 className="font-semibold text-gray-800">Create Events</h3>
          <p className="text-xs text-gray-500">
            Schedule academic or department events
          </p>
        </div>
      </GlassCard>
    </div>
  </AppLayout>
);

export default FacultyDashboard;