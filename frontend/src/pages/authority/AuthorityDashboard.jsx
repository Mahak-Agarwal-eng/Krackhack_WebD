import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Clock,
} from "lucide-react";

const stats = [
  { label: "Pending Resources", value: "8", icon: ShieldCheck, color: "text-blue-700" },
  { label: "Active Courses", value: "34", icon: CheckCircle2, color: "text-emerald-600" },
  { label: "Open Grievances", value: "12", icon: AlertTriangle, color: "text-amber-500" },
  { label: "Avg Resolution Time", value: "36h", icon: Clock, color: "text-indigo-600" },
];

const AuthorityDashboard = () => (
  <AppLayout>
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-blue-800">
        Authority Dashboard
      </h1>
      <p className="mt-1 text-gray-500">
        Monitor system integrity and academic operations.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

    <div className="mt-8">
      <GlassCard>
        <h3 className="font-semibold text-blue-800 mb-4">
          System Analytics
        </h3>
        <div className="text-sm text-gray-500">
          📈 Department performance trends and grievance patterns will appear here.
        </div>
      </GlassCard>
    </div>
  </AppLayout>
);

export default AuthorityDashboard;