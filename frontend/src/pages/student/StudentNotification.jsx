import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import { Link } from "react-router-dom";
import { Bell, BookOpen, AlertCircle, Clock } from "lucide-react";

const StudentNav = () => (
  <div className="flex gap-6 font-sans text-sm font-medium">
    <Link to="/student/dashboard" className="text-[#64748b] hover:text-[#1e293b]">
      Dashboard
    </Link>

    <Link to="/student/calendar" className="text-[#64748b] hover:text-[#1e293b]">
      Calendar
    </Link>

    <Link to="/student/courses" className="text-[#64748b] hover:text-[#1e293b]">
      Courses
    </Link>

    <Link to="/student/attendance" className="text-[#64748b] hover:text-[#1e293b]">
      Attendance
    </Link>

    <Link to="/student/notifications" className="text-[#1e293b] font-semibold">
      Notifications
    </Link>

    <Link to="/student/grievances" className="text-[#64748b] hover:text-[#1e293b]">
      Grievances
    </Link>

    <Link to="/student/opportunities" className="text-[#64748b] hover:text-[#1e293b]">
      Opportunities
    </Link>
  </div>
);

export default function StudentNotifications() {

  const notifications = [
    {
      id: 1,
      title: "Assignment Deadline Approaching",
      message: "Database Systems assignment due tomorrow at 11:59 PM.",
      time: "2 hours ago",
      type: "warning",
      unread: true
    },
    {
      id: 2,
      title: "New Resource Uploaded",
      message: "Machine Learning lecture slides are now available.",
      time: "5 hours ago",
      type: "info",
      unread: true
    },
    {
      id: 3,
      title: "Attendance Updated",
      message: "Your attendance for Operating Systems has been updated.",
      time: "Yesterday",
      type: "success",
      unread: false
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case "warning":
        return <AlertCircle className="text-yellow-500" size={22} />;
      case "success":
        return <BookOpen className="text-green-500" size={22} />;
      default:
        return <Bell className="text-blue-500" size={22} />;
    }
  };

  return (
    <AppLayout navigation={<StudentNav />}>

      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Bell className="text-[#1e293b]" size={28}/>
        <h1 className="text-4xl font-serif text-[#1e293b]">
          Notifications
        </h1>
      </div>

      {/* Notification List */}
      <div className="space-y-4">

        {notifications.map((notif) => (

          <GlassCard
            key={notif.id}
            className={`p-5 flex items-start gap-4 cursor-pointer transition-all duration-200
            hover:shadow-md hover:scale-[1.01]
            ${notif.unread ? "border-l-4 border-blue-500 bg-blue-50/30" : "bg-white"}
            `}
          >

            {/* Icon */}
            <div className="mt-1">
              {getIcon(notif.type)}
            </div>

            {/* Content */}
            <div className="flex-1">

              <div className="flex justify-between items-center">
                <h3 className={`font-semibold text-lg ${notif.unread ? "text-[#1e293b]" : "text-gray-600"}`}>
                  {notif.title}
                </h3>

                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={14}/>
                  {notif.time}
                </div>
              </div>

              <p className="text-gray-500 mt-1">
                {notif.message}
              </p>

            </div>

            {/* Unread indicator */}
            {notif.unread && (
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            )}

          </GlassCard>

        ))}

      </div>

    </AppLayout>
  );
}
