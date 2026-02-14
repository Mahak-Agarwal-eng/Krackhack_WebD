import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import { Users, Shield, Activity, Server, BarChart3, Lock, FileText, Settings, Database } from "lucide-react";

const stats = [
  { label: "Total Users", value: "1,248", icon: Users, color: "text-[#1e293b]" },
  { label: "Active Sessions", value: "312", icon: Activity, color: "text-[#1e293b]" },
  { label: "System Health", value: "99.9%", icon: Server, color: "text-[#1e293b]" },
  { label: "Security Alerts", value: "1", icon: Shield, color: "text-[#1e293b]" },
];

const AdminNav = () => (
  <div className="flex gap-6 font-sans text-sm font-medium">
    <Link to="/admin/dashboard" className="text-[#1e293b] hover:text-[#38b2ac] transition-colors">Dashboard</Link>
    <Link to="/admin/users" className="text-[#64748b] hover:text-[#1e293b] transition-colors">Users</Link>
    <Link to="/admin/security" className="text-[#64748b] hover:text-[#1e293b] transition-colors">Security</Link>
    <Link to="/admin/logs" className="text-[#64748b] hover:text-[#1e293b] transition-colors">Audit Logs</Link>
  </div>
);

const AdminDashboard = () => (
  <AppLayout navigation={<AdminNav />}>
    <div className="mb-10">
      <h1 className="text-4xl font-serif text-[#1e293b] mb-2">
        Good morning, <span className="text-[#1e293b]">Administrator</span>
      </h1>
      <p className="text-[#64748b] font-sans">Full system control and institutional governance.</p>
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

    <div className="grid gap-8 lg:grid-cols-2">
      <GlassCard className="border-[#e2e8f0] bg-white p-6">
        <h2 className="mb-6 text-xl font-serif text-[#1e293b]">Role Distribution</h2>
        <div className="space-y-4">
          {[
            { role: "Students", count: 980, color: "bg-[#1e293b]", pct: 78 },
            { role: "Faculty", count: 124, color: "bg-[#64748b]", pct: 15 },
          ].map((r) => (
            <div key={r.role}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-[#1e293b]">{r.role}</span>
                <span className="text-[#64748b]">{r.count}</span>
              </div>
              <div className="w-full bg-[#f1f5f9] h-2 rounded-full">
                <div className={`${r.color} h-2 rounded-full`} style={{ width: `${r.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="border-[#e2e8f0] bg-white p-6">
        <h2 className="mb-6 text-xl font-serif text-[#1e293b]">System Health</h2>
        <div className="space-y-4">
          {["API Response", "DB Load", "Memory Usage"].map((m) => (
            <div key={m} className="flex items-center justify-between border-b border-[#f1f5f9] pb-3 last:border-0">
              <span className="text-sm font-medium text-[#1e293b]">{m}</span>
              <StatusBadge variant="success">Optimal</StatusBadge>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  </AppLayout>
);

export default AdminDashboard;