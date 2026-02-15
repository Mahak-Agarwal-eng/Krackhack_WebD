// 

import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Upload,
  Bell,
  BarChart3,
  GraduationCap,
  UserCheck,
  Plus,
  ArrowRight
} from "lucide-react";

// Mock authority data
const authorityData = {
  name: "Dr. Rajesh Kumar",
  role: "Head of Department",
  department: "Computer Science & Engineering",
  photo: null,
};

// Key metrics
const metrics = [
  { 
    label: "Total Students", 
    value: "342", 
    change: "+12 this semester",
    icon: Users, 
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  { 
    label: "Active Courses", 
    value: "24", 
    change: "Spring 2024",
    icon: BookOpen, 
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  { 
    label: "Faculty Members", 
    value: "18", 
    change: "All departments",
    icon: GraduationCap, 
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  { 
    label: "Avg Attendance", 
    value: "84.2%", 
    change: "+2.3% vs last sem",
    icon: UserCheck, 
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
];

const AuthorityNav = () => (
  <div className="flex gap-6 font-sans text-sm font-medium">
    <Link to="/authority/dashboard" className="text-[#1e293b] hover:text-[#38b2ac] transition-colors">Dashboard</Link>
    <Link to="/authority/Students" className="text-[#64748b] hover:text-[#1e293b] transition-colors">Students</Link>
    <Link to="/authority/courses" className="text-[#64748b] hover:text-[#1e293b]">
      Courses
    </Link>
<Link to="/authority/analytics" className="text-[#64748b] hover:text-[#1e293b]">
      Analytics
    </Link>
    <Link to="/authority/notifications" className="text-[#64748b] hover:text-[#1e293b]">
      Notifications
    </Link>
    
  </div>
  
);
// Upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Database Systems Mid-Semester Exam",
    course: "CS301",
    date: "2024-03-15",
    type: "exam",
    daysLeft: 3
  },
  {
    id: 2,
    title: "Operating Systems Assignment 2 Due",
    course: "CS302",
    date: "2024-03-16",
    type: "assignment",
    daysLeft: 4
  },
  {
    id: 3,
    title: "Computer Networks Quiz 3",
    course: "CS303",
    date: "2024-03-18",
    type: "quiz",
    daysLeft: 6
  },
];

// Course overview
const courseOverview = [
  { code: "CS301", name: "Database Management Systems", enrolled: 45, attendance: 82.5, avgMarks: 71.3, alerts: 3 },
  { code: "CS302", name: "Operating Systems", enrolled: 38, attendance: 79.8, avgMarks: 68.7, alerts: 5 },
  { code: "CS303", name: "Computer Networks", enrolled: 42, attendance: 85.2, avgMarks: 74.5, alerts: 2 },
  { code: "CS401", name: "Machine Learning", enrolled: 36, attendance: 88.1, avgMarks: 76.2, alerts: 1 },
];

// Quick actions
const quickActions = [
  { label: "Add New Course", icon: Plus, link: "/authority/courses", color: "bg-blue-600" },
  { label: "Upload Resources", icon: Upload, link: "/authority/resources", color: "bg-green-600" },
  { label: "View Calendar", icon: Calendar, link: "/authority/calendar", color: "bg-purple-600" },
  { label: "Send Notification", icon: Bell, link: "/authority/notifications", color: "bg-orange-600" },
];

// Recent activities
const recentActivities = [
  { id: 1, text: "New course 'Advanced Algorithms' added", time: "2 hours ago", icon: BookOpen },
  { id: 2, text: "Mid-semester exam scheduled for CS301", time: "5 hours ago", icon: Calendar },
  { id: 3, text: "12 students marked attendance in CS302", time: "1 day ago", icon: UserCheck },
  { id: 4, text: "New study material uploaded for CS303", time: "2 days ago", icon: Upload },
];

// Alerts
const systemAlerts = [
  { id: 1, text: "5 students have attendance below 75%", severity: "critical", course: "CS302" },
  { id: 2, text: "3 assignments pending grading", severity: "warning", course: "CS301" },
  { id: 3, text: "Exam schedule needs approval", severity: "info", course: "CS401" },
];

export default function AuthorityDashboard() {
  return (
    <AppLayout navigation={<AuthorityNav />}>
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif text-gray-900 mb-2">
              Welcome back, <span className="text-blue-600">{authorityData.name}</span>
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <ShieldCheck size={18} className="text-blue-600" />
              {authorityData.role} • {authorityData.department}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <BarChart3 size={18} />
              View Reports
            </button>
          </div>
        </div>
      </div>
     
      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <GlassCard key={metric.label} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <p className="text-xs text-gray-500">{metric.change}</p>
                </div>
                <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon size={24} className={metric.color} />
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition flex items-center justify-between`}
              >
                <span className="font-medium">{action.label}</span>
                <Icon size={20} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Overview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Course Overview</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
                View All <ArrowRight size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {courseOverview.map((course) => (
                <GlassCard key={course.code} className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{course.code}</h3>
                        <span className="text-sm text-gray-600">{course.name}</span>
                        {course.alerts > 0 && (
                          <StatusBadge variant="error">
                            <AlertTriangle size={12} className="inline mr-1" />
                            {course.alerts} alerts
                          </StatusBadge>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="flex items-center gap-1 text-gray-600">
                          <Users size={14} />
                          {course.enrolled} students
                        </span>
                        <span className="flex items-center gap-1">
                          <UserCheck size={14} />
                          <span className={course.attendance >= 85 ? "text-green-600" : course.attendance >= 75 ? "text-orange-600" : "text-red-600"}>
                            {course.attendance}% attendance
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <BarChart3 size={14} />
                          <span className={course.avgMarks >= 75 ? "text-green-600" : course.avgMarks >= 60 ? "text-orange-600" : "text-red-600"}>
                            {course.avgMarks}% avg marks
                          </span>
                        </span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming Events (Next 7 Days)</h2>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <GlassCard key={event.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        event.type === 'exam' ? 'bg-red-100' :
                        event.type === 'assignment' ? 'bg-blue-100' :
                        'bg-green-100'
                      }`}>
                        <Calendar size={20} className={
                          event.type === 'exam' ? 'text-red-600' :
                          event.type === 'assignment' ? 'text-blue-600' :
                          'text-green-600'
                        } />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-600">Course: {event.course} • {event.date}</p>
                      </div>
                    </div>
                    <StatusBadge variant={event.daysLeft <= 3 ? "error" : "warning"}>
                      {event.daysLeft} days left
                    </StatusBadge>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* System Alerts */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle size={20} className="text-orange-600" />
              Priority Alerts
            </h3>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border-l-4 ${
                    alert.severity === 'critical' ? 'bg-red-50 border-red-500' :
                    alert.severity === 'warning' ? 'bg-orange-50 border-orange-500' :
                    'bg-blue-50 border-blue-500'
                  }`}
                >
                  <p className={`text-xs font-bold uppercase mb-1 ${
                    alert.severity === 'critical' ? 'text-red-700' :
                    alert.severity === 'warning' ? 'text-orange-700' :
                    'text-blue-700'
                  }`}>
                    {alert.severity}
                  </p>
                  <p className={`text-sm ${
                    alert.severity === 'critical' ? 'text-red-900' :
                    alert.severity === 'warning' ? 'text-orange-900' :
                    'text-blue-900'
                  }`}>
                    {alert.text}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Course: {alert.course}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Recent Activities */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock size={20} className="text-blue-600" />
              Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Attendance Summary */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">Attendance Summary</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Overall Average</span>
                  <span className="font-semibold text-green-600">84.2%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "84.2%" }} />
                </div>
              </div>

              <div className="pt-3 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Above 85%</span>
                  <span className="font-medium text-green-600">65% students</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">75-85%</span>
                  <span className="font-medium text-orange-600">25% students</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Below 75%</span>
                  <span className="font-medium text-red-600">10% students</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </AppLayout>
  );
}