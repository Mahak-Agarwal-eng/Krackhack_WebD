import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import { BookOpen, Users, Briefcase, BarChart3, Upload, CalendarPlus, Megaphone, ClipboardCheck, FolderOpen, Bell } from "lucide-react";

// const stats = [
//   { label: "Active Courses", value: "4", icon: BookOpen, color: "text-[#1e293b]" },
//   { label: "Enrolled Scholars", value: "186", icon: Users, color: "text-[#1e293b]" },
//   { label: "Open Opportunities", value: "5", icon: Briefcase, color: "text-[#1e293b]" },
//   { label: "Avg Attendance", value: "82%", icon: BarChart3, color: "text-[#1e293b]" },
// ];

// const FacultyDashboard = () => (
//   <AppLayout>
//     <div className="mb-10">
//       <h1 className="text-4xl font-serif text-[#1e293b] mb-2">
//         Good morning, <span className="text-[#1e293b]">Professor</span>
//       </h1>
//       <p className="text-[#64748b] font-sans">Manage academic mastery and scholar engagement.</p>
//     </div>

//     <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//       {stats.map((s) => (
//         <GlassCard key={s.label} className="border-[#e2e8f0] bg-white shadow-sm">
//           <div className="flex items-center justify-between p-2">
//             <div>
//               <p className="text-[10px] uppercase tracking-wider font-semibold text-[#94a3b8]">{s.label}</p>
//               <p className="mt-1 text-3xl font-serif text-[#1e293b]">{s.value}</p>
//             </div>
//             <div className="h-12 w-12 rounded-xl bg-[#f1f5f9] flex items-center justify-center">
//               <s.icon className={`h-6 w-6 ${s.color}`} />
//             </div>
//           </div>
//         </GlassCard>
//       ))}
//     </div>

//     <div className="grid gap-8 lg:grid-cols-3">
//       <div className="lg:col-span-2">
//         <h2 className="mb-6 text-xl font-serif text-[#1e293b]">My Courses</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {["CS201: Data Structures", "CS301: Algorithms"].map((course) => (
//             <GlassCard key={course} className="border-[#e2e8f0] bg-white p-6">
//               <h3 className="font-semibold text-[#1e293b] mb-4">{course}</h3>
//               <div className="flex justify-between text-xs text-[#64748b]">
//                 <span>Scholars: 45/50</span>
//                 <span className="text-[#1f3a8a] font-bold">Attendance: 88%</span>
//               </div>
//             </GlassCard>
//           ))}
//         </div>
//       </div>

//       <GlassCard className="border-[#e2e8f0] bg-white p-6">
//         <h2 className="mb-6 text-xl font-serif text-[#1e293b]">Quick Actions</h2>
//         <div className="space-y-3">
//           <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#1e293b] text-white text-sm font-semibold hover:opacity-90 transition">
//             <Upload className="h-4 w-4" /> Upload Study Material
//           </button>
//           <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-[#e2e8f0] text-[#1e293b] text-sm font-semibold hover:bg-gray-50 transition">
//             <CalendarPlus className="h-4 w-4" /> Create Academic Event
//           </button>
//         </div>
//       </GlassCard>
//     </div>
//   </AppLayout>
// );

// export default FacultyDashboard;

/* ---------- NAVBAR ---------- */

const FacultyNav = () => (
  <div className="flex gap-6 font-sans text-sm font-medium">

    <Link to="/faculty/dashboard" className="text-[#1e293b] hover:text-[#38b2ac]">
      Dashboard
    </Link>

    <Link to="/faculty/courses" className="text-[#64748b] hover:text-[#1e293b]">
      Courses
    </Link>

    <Link to="/faculty/attendance" className="text-[#64748b] hover:text-[#1e293b]">
      Attendance
    </Link>

    <Link to="/faculty/resources" className="text-[#64748b] hover:text-[#1e293b]">
      Resources
    </Link>

    <Link to="/faculty/announcements" className="text-[#64748b] hover:text-[#1e293b]">
      Announcements
    </Link>

    <Link to="/faculty/calendar" className="text-[#64748b] hover:text-[#1e293b]">
      Calendar
    </Link>
    <Link to="/faculty/grade" className="text-[#64748b] hover:text-[#1e293b]">
      Grade
    </Link>
    <Link to="/faculty/profile" className="text-[#64748b] hover:text-[#1e293b]">
      Profile
    </Link>
    <Link to="/faculty/students" className="text-[#64748b] hover:text-[#1e293b]">
      Students
    </Link> 
  </div>
);


/* ---------- STATS ---------- */

const stats = [
  {
    label: "Active Courses",
    value: "3",
    icon: BookOpen,
  },
  {
    label: "Total Students",
    value: "8",
    icon: Users,
  },
  {
    label: "Avg Attendance",
    value: "82%",
    icon: BarChart3,
  },
  {
    label: "Announcements",
    value: "3",
    icon: Megaphone,
  },
];


/* ---------- QUICK ACTIONS ---------- */

const actions = [
  {
    label: "Upload Study Material",
    icon: Upload,
    path: "/faculty/resources"
  },
  {
    label: "Mark Attendance",
    icon: ClipboardCheck,
    path: "/faculty/attendance"
  },
  {
    label: "Post Announcement",
    icon: Megaphone,
    path: "/faculty/announcements"
  },
  {
    label: "Create Calendar Event",
    icon: CalendarPlus,
    path: "/faculty/calendar"
  }
];


/* ---------- COURSES ---------- */

const courses = [
  {
    id: "CS201",
    name: "Data Structures",
    students: 45,
    attendance: 88
  },
  {
    id: "CS301",
    name: "Algorithms",
    students: 52,
    attendance: 84
  },
  {
    id: "CS401",
    name: "Operating Systems",
    students: 39,
    attendance: 91
  }
];



/* ---------- MAIN COMPONENT ---------- */

const FacultyDashboard = () => {

  return (

    <AppLayout navigation={<FacultyNav />}>

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-4xl font-serif text-[#1e293b] mb-2">
          Welcome back, Professor
        </h1>

        <p className="text-[#64748b]">
          Manage your courses, scholars, and academic resources.
        </p>

      </div>



      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {stats.map((s) => (

          <GlassCard key={s.label} className="p-5 hover:shadow-lg transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-xs text-gray-400 uppercase">
                  {s.label}
                </p>

                <p className="text-3xl font-serif text-[#1e293b]">
                  {s.value}
                </p>

              </div>

              <s.icon className="h-7 w-7 text-[#1e293b]" />

            </div>

          </GlassCard>

        ))}

      </div>



      <div className="grid lg:grid-cols-3 gap-8">

        {/* COURSES */}

        <div className="lg:col-span-2">

          <div className="flex justify-between mb-4">

            <h2 className="text-xl font-serif text-[#1e293b]">
              Your Courses
            </h2>

            <Link
              to="/faculty/courses"
              className="text-sm text-blue-600 hover:underline"
            >
              View All
            </Link>

          </div>


          <div className="grid md:grid-cols-2 gap-4">

            {courses.map((course) => (

              <Link
                to={`/faculty/courses`}
                key={course.id}
              >

                <GlassCard className="p-5 hover:shadow-md transition cursor-pointer">

                  <div className="flex justify-between">

                    <div>

                      <p className="font-semibold">
                        {course.id}
                      </p>

                      <p className="text-sm text-gray-500">
                        {course.name}
                      </p>

                    </div>

                    <FolderOpen className="h-5 w-5 text-gray-400" />

                  </div>


                  <div className="mt-4 flex justify-between text-sm">

                    <span>
                      Students: {course.students}
                    </span>

                    <StatusBadge variant="success">
                      {course.attendance}%
                    </StatusBadge>

                  </div>

                </GlassCard>

              </Link>

            ))}

          </div>

        </div>



        {/* QUICK ACTIONS */}

        <GlassCard className="p-6">

          <h2 className="text-xl font-serif mb-4">
            Quick Actions
          </h2>

          <div className="space-y-3">

            {actions.map((action) => (

              <Link
                to={action.path}
                key={action.label}
              >

                <button className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50">

                  <action.icon className="h-5 w-5" />

                  {action.label}

                </button>

              </Link>

            ))}

          </div>

        </GlassCard>

      </div>

    </AppLayout>

  );

};


export default FacultyDashboard;