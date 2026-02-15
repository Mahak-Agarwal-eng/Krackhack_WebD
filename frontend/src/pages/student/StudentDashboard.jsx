
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import {
  MessageSquareWarning,
  GraduationCap,
  Briefcase,
  Car,
  Search,
  AlertTriangle,
  Users,
} from "lucide-react";
const stats = [
  {
    label: "Active Grievances",
    value: "12",
    icon: MessageSquareWarning,
    color: "text-[#1e293b]",
  },
  {
    label: "Courses Enrolled",
    value: "6",
    icon: GraduationCap,
    color: "text-[#1e293b]",
  },
  {
    label: "Open Opportunities",
    value: "24",
    icon: Briefcase,
    color: "text-[#1e293b]",
  },
  {
    label: "Campus Users",
    value: "1.2k",
    icon: Users,
    color: "text-[#1e293b]",
  },
];

const quickLinks = [
  {
    label: "File Grievance",
    path: "/student/grievances",
    icon: MessageSquareWarning,
    desc: "Submit & track issues",
  },
  {
    label: "My Courses",
    path: "/student/courses", // Updated Path
    icon: GraduationCap,
    desc: "Courses & credits",
  },
  {
    label: "Internships",
    path: "/student/opportunities",
    icon: Briefcase,
    desc: "Find gigs & internships",
  },
  {
    label: "Ride Share",
    path: "/student/caravan",
    icon: Car,
    desc: "Share campus rides",
  },
  // Lost & Found and SOS Flare cards have been removed
];

const recentActivity = [
  {
    text: "Grievance #104 resolved",
    badge: "Resolved",
    variant: "success",
    time: "2h ago",
  },
  {
    text: "New internship: Google SWE",
    badge: "New",
    variant: "info",
    time: "5h ago",
  },
  {
    text: "Lost item claimed: AirPods",
    badge: "Claimed",
    variant: "warning",
    time: "1d ago",
  },
  {
    text: "SOS: Water outage Block C",
    badge: "Active",
    variant: "danger",
    time: "1d ago",
  },
];

const StudentNav = () => (
  <div className="flex gap-6 font-sans text-sm font-medium">
    <Link
      to="/student/dashboard"
      className="text-[#1e293b] hover:text-[#38b2ac] transition-colors"
    >
      Dashboard
    </Link>
    <Link
      to="/academics"
      className="text-[#64748b] hover:text-[#1e293b] transition-colors"
    >
      Academics
    </Link>
    <Link
      to="/student/calendar"
      className="text-[#64748b] hover:text-[#1e293b]"
    >
      Calendar
    </Link>
    <Link 
      to="/student/courses" // Ensures navigation to the master view
      className="text-[#64748b] hover:text-[#1e293b]"
    >
      Courses
    </Link>
    <Link
      to="/student/attendance"
      className="text-[#64748b] hover:text-[#1e293b]"
    >
      Attendance
    </Link>
    <Link
      to="/student/notifications"
      className="text-[#64748b] hover:text-[#1e293b]"
    >
      Notifications
    </Link>
    <Link
      to="/student/grievances"
      className="text-[#64748b] hover:text-[#1e293b] transition-colors"
    >
      Grievances
    </Link>
    <Link
      to="/student/opportunities"
      className="text-[#64748b] hover:text-[#1e293b] transition-colors"
    >
      Opportunities
    </Link>
  </div>
);
const StudentDashboard = () => (
  <AppLayout navigation={<StudentNav />}>
    {/* HEADER */}
    <div className="mb-10 text-center lg:text-left">
      <h1 className="text-4xl font-serif text-[#1e293b] mb-2">
        Hello, <span className="text-[#1e293b]">Student</span>
      </h1>
      <p className="text-[#64748b] font-sans">
        
      </p>
    </div>

    {/* STATS */}
    <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <GlassCard
          key={s.label}
          className="border-[#e2e8f0] bg-white shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between p-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-[#94a3b8]">
                {s.label}
              </p>
              <p className="mt-1 text-3xl font-serif text-[#1e293b]">
                {s.value}
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-[#f1f5f9] flex items-center justify-center">
              <s.icon className={`h-6 w-6 ${s.color}`} />
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
    {/* Academic Calendar */}
    <GlassCard className="border-[#e2e8f0] bg-white p-6">
      <h2 className="text-xl font-serif text-[#1e293b] mb-4">
        Academic Calendar
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <div>
            <p className="font-medium text-[#1e293b]">DBMS Assignment</p>
            <p className="text-xs text-[#64748b]">Course: DBMS</p>
          </div>
          <StatusBadge variant="warning">Due Mar 10</StatusBadge>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="font-medium text-[#1e293b]">Operating Systems Mid</p>
            <p className="text-xs text-[#64748b]">Course: OS</p>
          </div>
          <StatusBadge variant="danger">Mar 15</StatusBadge>
        </div>
      </div>

      <Link to="/student/calendar">
        <button className="mt-4 text-sm text-[#38b2ac]">
          View Full Calendar →
        </button>
      </Link>
    </GlassCard>

    
    <GlassCard className="border-[#e2e8f0] bg-white p-6">
      <h2 className="text-xl font-serif text-[#1e293b] mb-4">Notifications</h2>

      <div className="space-y-3">
        <p className="text-sm">DBMS Assignment due in 2 days</p>

        <p className="text-sm">New PYQ uploaded for OS</p>
      </div>

      <Link to="/student/notifications">
        <button className="mt-3 text-[#38b2ac] text-sm">View All →</button>
      </Link>
    </GlassCard>

    <div className="grid gap-8 lg:grid-cols-3">
      {/* QUICK LINKS */}
      <div className="lg:col-span-2">
        <h2 className="mb-6 text-xl font-serif text-[#1e293b]">Quick Access</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((l) => (
            <Link key={l.path} to={l.path}>
              <GlassCard
                hover
                className="flex flex-col items-center gap-3 py-8 text-center border-[#e2e8f0] bg-white"
              >
                <div className="h-10 w-10 rounded-lg bg-[#1e293b] flex items-center justify-center text-white">
                  <l.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-[#1e293b] font-sans">
                  {l.label}
                </span>
                <span className="text-xs text-[#64748b] px-4">{l.desc}</span>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>

      {/* ACTIVITY */}
      <div>
        <h2 className="mb-6 text-xl font-serif text-[#1e293b]">
          Recent Activity
        </h2>

        <GlassCard className="space-y-6 border-[#e2e8f0] bg-white p-6">
          {recentActivity.map((a, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 border-b border-[#f1f5f9] pb-4 last:border-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#1e293b]">
                  {a.text}
                </p>
                <p className="text-[11px] text-[#94a3b8] mt-1">{a.time}</p>
              </div>
              <StatusBadge
                variant={a.variant}
                className="text-[10px] uppercase tracking-tight"
              >
                {a.badge}
              </StatusBadge>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  </AppLayout>
);

export default StudentDashboard;
