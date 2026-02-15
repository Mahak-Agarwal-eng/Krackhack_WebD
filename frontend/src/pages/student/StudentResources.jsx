import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import { Link } from "react-router-dom";
const StudentNav = () => (
  <div className="flex gap-6 font-sans text-sm font-medium">
    <Link
      to="/student/dashboard"
      className="text-[#64748b] hover:text-[#1e293b] transition-colors"
    >
      Dashboard
    </Link>
   
    <Link
      to="/student/calendar"
      className="text-[#64748b] hover:text-[#1e293b]"
    >
      Calendar
    </Link>
    <Link to="/student/courses" className="text-[#64748b] hover:text-[#1e293b]">
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
      className="text-[#1e293b] hover:text-[#38b2ac] transition-colors"
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
export default function StudentResources(){

return(

<AppLayout  navigation={<StudentNav />}>

<h1 className="text-3xl mb-6">
Resource Repository
</h1>

<GlassCard>

<button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
Upload Resource
</button>

<table className="w-full">

<tr>
<td>DBMS PYQ 2023</td>
<td>Download</td>
</tr>

</table>

</GlassCard>

</AppLayout>

);

}
