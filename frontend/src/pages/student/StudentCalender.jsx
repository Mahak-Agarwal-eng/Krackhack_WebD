// import AppLayout from "../../components/AppLayout";
// import GlassCard from "../../components/GlassCard";
// import { Link } from "react-router-dom";

// const StudentNav = () => (
//   <div className="flex gap-6 font-sans text-sm font-medium">
//     <Link
//       to="/student/dashboard"
//       className="text-[#64748b] hover:text-[#1e293b] transition-colors"
//     >
//       Dashboard
//     </Link>
    
//     <Link
//       to="/student/calendar"
//       className="text-[#64748b] hover:text-[#1e293b]"
//     >
//       Calendar
//     </Link>
//     <Link to="/student/courses" className="text-[#64748b] hover:text-[#1e293b]">
//       Courses
//     </Link>
//     <Link
//       to="/student/attendance"
//       className="text-[#64748b] hover:text-[#1e293b]"
//     >
//       Attendance
//     </Link>
//     <Link
//       to="/student/notifications"
//       className="text-[#64748b] hover:text-[#1e293b]"
//     >
//       Notifications
//     </Link>
//     <Link
//       to="/student/grievances"
//       className="text-[#1e293b] hover:text-[#38b2ac] transition-colors"
//     >
//       Grievances
//     </Link>
//     <Link
//       to="/student/opportunities"
//       className="text-[#64748b] hover:text-[#1e293b] transition-colors"
//     >
//       Opportunities
//     </Link>
//   </div>
// );
// export default function StudentCalendar(){

// return(

// <AppLayout  navigation={<StudentNav />}>

// <h1 className="text-3xl mb-6">Academic Calendar</h1>

// <GlassCard>

// <table className="w-full">

// <thead>
// <tr>
// <th>Event</th>
// <th>Course</th>
// <th>Date</th>
// </tr>
// </thead>

// <tbody>

// <tr>
// <td>Mid Exam</td>
// <td>DBMS</td>
// <td>Mar 15</td>
// </tr>

// <tr>
// <td>Assignment</td>
// <td>OS</td>
// <td>Mar 18</td>
// </tr>

// </tbody>

// </table>

// </GlassCard>

// </AppLayout>

// );

// }

import { useState, useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import { Link } from "react-router-dom";
import { Calendar, Clock, Plus } from "lucide-react";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

const StudentNav = () => (
  <div className="flex gap-6 font-sans text-sm font-medium">
    <Link to="/student/dashboard" className="text-[#64748b] hover:text-[#1e293b]">Dashboard</Link>
    <Link to="/student/calendar" className="text-[#1e293b] font-semibold">Calendar</Link>
    <Link to="/student/courses" className="text-[#64748b] hover:text-[#1e293b]">Courses</Link>
    <Link to="/student/attendance" className="text-[#64748b] hover:text-[#1e293b]">Attendance</Link>
    <Link to="/student/notifications" className="text-[#64748b] hover:text-[#1e293b]">Notifications</Link>
    <Link to="/student/grievances" className="text-[#64748b] hover:text-[#1e293b]">Grievances</Link>
  </div>
);

export default function StudentCalendar() {

  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);

  const [newEvent, setNewEvent] = useState({
    title: "",
    course: "",
    date: "",
    time: ""
  });

  const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     getUserAndEvents();
//   }, []);

//   async function getUserAndEvents() {
//     const { data: { user } } = await supabase.auth.getUser();

//     if (user) {
//       setUserId(user.id);

//       const { data } = await supabase
//         .from("calendar_events")
//         .select("*")
//         .eq("student_id", user.id)
//         .order("date");

//       setEvents(data || []);
//     }
//   }

//   async function addEvent() {

//     const event = {
//       student_id: userId,
//       title: newEvent.title,
//       course: newEvent.course,
//       date: newEvent.date,
//       time: newEvent.time
//     };

//     await supabase.from("calendar_events").insert(event);

//     setEvents([...events, event]);

//     setShowModal(false);

//     setNewEvent({
//       title: "",
//       course: "",
//       date: "",
//       time: ""
//     });
//   }

  const timetable = {
  Monday: [
    { subject: "CS-512", time: "09:00 - 10:00" },
    { subject: "CS-671", time: "11:00 - 12:00" },
    { subject: "CS-201", time: "02:00 - 03:00" }
  ],
  Tuesday: [
    { subject: "CS-252", time: "10:00 - 11:00" },
    { subject: "CS-512", time: "01:00 - 02:00" }
  ],
  Wednesday: [
    { subject: "CS-671", time: "09:00 - 10:00" },
    { subject: "CS-201", time: "12:00 - 01:00" }
  ],
  Thursday: [
    { subject: "CS-252", time: "02:00 - 03:00" }
  ],
  Friday: [
    { subject: "CS-512", time: "10:00 - 11:00" },
    { subject: "CS-671", time: "01:00 - 02:00" }
  ]
};


  return (

    <AppLayout navigation={<StudentNav />}>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-3">
          <Calendar size={28}/>
          <h1 className="text-4xl font-serif">Academic Calendar</h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18}/>
          Add Event
        </button>

      </div>

      {/* Timetable */}
      <GlassCard className="p-6 mb-6">

        <h2 className="text-xl font-semibold mb-4">Weekly Timetable</h2>

        <div className="grid grid-cols-5 gap-4">

          {Object.entries(timetable).map(([day, subjects]) => (

            <div key={day} className="bg-gray-50 p-4 rounded-lg">

              <h3 className="font-semibold mb-2">{day}</h3>

             {subjects.map((sub, index) => (
  <div key={index} className="text-sm bg-white p-2 rounded mb-2 shadow-sm">
    <div className="font-medium">{sub.subject}</div>
    <div className="text-xs text-gray-500">{sub.time}</div>
  </div>
))}


            </div>

          ))}

        </div>

      </GlassCard>

      {/* Personal Events */}
      <GlassCard className="p-6">

        <h2 className="text-xl font-semibold mb-4">Your Events</h2>

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Event</th>
              <th>Course</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>

            {events.map((event, index) => (

              <tr key={index} className="border-b hover:bg-gray-50">

                <td className="py-2">{event.title}</td>

                <td>{event.course}</td>

                <td>{event.date}</td>

                <td className="flex items-center justify-center gap-1">
                  <Clock size={14}/>
                  {event.time}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </GlassCard>

      {/* Modal */}
      {showModal && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-lg w-96">

            <h2 className="text-xl font-semibold mb-4">Add Event</h2>

            <input
              placeholder="Title"
              className="w-full border p-2 mb-2"
              value={newEvent.title}
              onChange={(e)=>setNewEvent({...newEvent,title:e.target.value})}
            />

            <input
              placeholder="Course"
              className="w-full border p-2 mb-2"
              value={newEvent.course}
              onChange={(e)=>setNewEvent({...newEvent,course:e.target.value})}
            />

            <input
              type="date"
              className="w-full border p-2 mb-2"
              value={newEvent.date}
              onChange={(e)=>setNewEvent({...newEvent,date:e.target.value})}
            />

            <input
              type="time"
              className="w-full border p-2 mb-4"
              value={newEvent.time}
              onChange={(e)=>setNewEvent({...newEvent,time:e.target.value})}
            />

            <button
              onClick={addEvent}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Save
            </button>

          </div>

        </div>

      )}

    </AppLayout>

  );

}
