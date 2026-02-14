import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import {
  Users,
  Shield,
  Activity,
  Server,
  BarChart3,
} from "lucide-react";

const stats = [
  { label: "Total Users", value: "1,248", icon: Users, color: "text-blue-700" },
  { label: "Active Sessions", value: "312", icon: Activity, color: "text-indigo-600" },
  { label: "System Health", value: "99.9%", icon: Server, color: "text-emerald-600" },
  { label: "Security Alerts", value: "1", icon: Shield, color: "text-red-600" },
];

const AdminDashboard = () => (
  <AppLayout>
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-blue-800">
        Admin Dashboard
      </h1>
      <p className="mt-1 text-gray-500">
        Full system control and governance.
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

    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <GlassCard>
        <h3 className="font-semibold text-blue-800 mb-3">
          Role Distribution
        </h3>
        <div className="text-sm text-gray-500">
          Students: 980 <br />
          Faculty: 124 <br />
          Authority: 32 <br />
          Admin: 12
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="font-semibold text-blue-800 mb-3">
          Activity Logs
        </h3>
        <div className="text-sm text-gray-500">
          Recent login activity and system actions will appear here.
        </div>
      </GlassCard>
    </div>
  </AppLayout>
);

export default AdminDashboard;