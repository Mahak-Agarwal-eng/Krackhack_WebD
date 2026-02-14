
import AppLayout from "../components/AppLayout";
import GlassCard from "../components/GlassCard";
import StatusBadge from "../components/StatusBadge";
import {
  MessageSquareWarning,
  GraduationCap,
  Briefcase,
  Car,
  Search,
  AlertTriangle,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Active Grievances", value: "12", icon: MessageSquareWarning },
  { label: "Courses Enrolled", value: "6", icon: GraduationCap },
  { label: "Open Opportunities", value: "24", icon: Briefcase },
  { label: "Campus Users", value: "1.2k", icon: Users },
];

const quickLinks = [
  { label: "File Grievance", path: "/grievances", icon: MessageSquareWarning, desc: "Submit & track issues" },
  { label: "My Courses", path: "/academics", icon: GraduationCap, desc: "Courses & credits" },
  { label: "Internships", path: "/opportunities", icon: Briefcase, desc: "Find gigs & internships" },
  { label: "Ride Share", path: "/caravan", icon: Car, desc: "Share campus rides" },
  { label: "Lost & Found", path: "/lost-found", icon: Search, desc: "Report or find items" },
  { label: "SOS Flare", path: "/sos", icon: AlertTriangle, desc: "Emergency alerts" },
];

const recentActivity = [
  { text: "Grievance #104 resolved", badge: "Resolved", variant: "success", time: "2h ago" },
  { text: "New internship: Google SWE", badge: "New", variant: "info", time: "5h ago" },
  { text: "Lost item claimed: AirPods", badge: "Claimed", variant: "warning", time: "1d ago" },
  { text: "SOS: Water outage Block C", badge: "Active", variant: "danger", time: "1d ago" },
];

const Dashboard = () => (
  <AppLayout>
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-blue-700">
        Good morning, Student
      </h1>
      <p className="mt-1 text-gray-500">
        Here's what's happening on campus today.
      </p>
    </div>

    {/* Stats */}
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <GlassCard key={s.label} hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="mt-1 text-2xl font-bold">{s.value}</p>
            </div>
            <s.icon className="h-8 w-8 text-blue-600 opacity-70" />
          </div>
        </GlassCard>
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      {/* Quick Links */}
      <div className="lg:col-span-2">
        <h2 className="mb-4 text-lg font-semibold text-blue-700">
          Quick Access
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {quickLinks.map((l) => (
            <Link key={l.path} to={l.path}>
              <GlassCard hover className="flex flex-col items-center gap-2 py-6 text-center">
                <l.icon className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium">{l.label}</span>
                <span className="text-xs text-gray-500">{l.desc}</span>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-blue-700">
          Recent Activity
        </h2>
        <GlassCard className="space-y-4">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm">{a.text}</p>
                <p className="text-xs text-gray-500">{a.time}</p>
              </div>
              <StatusBadge variant={a.variant}>
                {a.badge}
              </StatusBadge>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  </AppLayout>
);

export default Dashboard;