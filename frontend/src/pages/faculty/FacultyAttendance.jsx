import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  Save,
  BarChart3,
  TrendingDown,
  User,
  RefreshCw
} from "lucide-react";
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


// Mock faculty courses data
const facultyCoursesData = [
  { id: "CS301", name: "Database Management Systems", totalStudents: 45 },
  { id: "CS302", name: "Operating Systems", totalStudents: 38 },
  { id: "CS303", name: "Computer Networks", totalStudents: 42 },
];

// Mock students data
const studentsData = {
  CS301: [
    { id: "S001", name: "Rahul Sharma", rollNo: "20CS001", totalClasses: 24, present: 22, absent: 1, late: 1 },
    { id: "S002", name: "Priya Patel", rollNo: "20CS002", totalClasses: 24, present: 24, absent: 0, late: 0 },
    { id: "S003", name: "Amit Kumar", rollNo: "20CS003", totalClasses: 24, present: 18, absent: 5, late: 1 },
    { id: "S004", name: "Sneha Gupta", rollNo: "20CS004", totalClasses: 24, present: 23, absent: 1, late: 0 },
    { id: "S005", name: "Vikram Singh", rollNo: "20CS005", totalClasses: 24, present: 16, absent: 7, late: 1 },
    { id: "S006", name: "Ananya Roy", rollNo: "20CS006", totalClasses: 24, present: 21, absent: 2, late: 1 },
  ],
  CS302: [
    { id: "S007", name: "Rohan Verma", rollNo: "20CS007", totalClasses: 20, present: 19, absent: 1, late: 0 },
    { id: "S008", name: "Kavya Reddy", rollNo: "20CS008", totalClasses: 20, present: 20, absent: 0, late: 0 },
    { id: "S009", name: "Arjun Mehta", rollNo: "20CS009", totalClasses: 20, present: 15, absent: 4, late: 1 },
  ],
  CS303: [
    { id: "S010", name: "Neha Joshi", rollNo: "20CS010", totalClasses: 22, present: 20, absent: 2, late: 0 },
  ],
};

const attendanceStatuses = [
  { value: "present", label: "Present", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  { value: "absent", label: "Absent", icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  { value: "late", label: "Late", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
];

export default function FacultyAttendance() {
  const [selectedCourse, setSelectedCourse] = useState(facultyCoursesData[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState("mark"); // mark or analytics
  
  // Attendance state for current date
  const [attendance, setAttendance] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  const students = studentsData[selectedCourse.id] || [];

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setAttendance({});
    setIsSaved(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAttendance({});
    setIsSaved(false);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
    setIsSaved(false);
  };

  const handleMarkAll = (status) => {
    const newAttendance = {};
    students.forEach(student => {
      newAttendance[student.id] = status;
    });
    setAttendance(newAttendance);
    setIsSaved(false);
  };

  const handleSave = () => {
    // In a real app, this would save to the database
    console.log("Saving attendance:", {
      course_id: selectedCourse.id,
      date: selectedDate,
      attendance: attendance,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getAttendanceStats = () => {
    const total = students.length;
    const marked = Object.keys(attendance).length;
    const present = Object.values(attendance).filter(s => s === "present").length;
    const absent = Object.values(attendance).filter(s => s === "absent").length;
    const late = Object.values(attendance).filter(s => s === "late").length;
    
    return { total, marked, present, absent, late };
  };

  const stats = getAttendanceStats();

  const calculatePercentage = (student) => {
    if (student.totalClasses === 0) return 0;
    return ((student.present / student.totalClasses) * 100).toFixed(1);
  };

  const getAttendanceVariant = (percentage) => {
    if (percentage >= 85) return "success";
    if (percentage >= 75) return "warning";
    return "error";
  };

  const lowAttendanceStudents = students.filter(s => {
    const percentage = calculatePercentage(s);
    return percentage < 75;
  });

  const averageAttendance = students.length > 0
    ? (students.reduce((sum, s) => sum + parseFloat(calculatePercentage(s)), 0) / students.length).toFixed(1)
    : 0;

  return (
    <AppLayout navigation={<FacultyNav />}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif">Attendance Management</h1>
      </div>

      {/* Course Selector */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {facultyCoursesData.map((course) => (
          <button
            key={course.id}
            onClick={() => handleCourseChange(course)}
            className={`px-4 py-2 rounded-lg border transition ${
              selectedCourse.id === course.id
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            {course.id} - {course.name}
          </button>
        ))}
      </div>

      {/* Course Info Card */}
      <GlassCard className="p-5 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{selectedCourse.name}</h2>
            <p className="text-sm text-gray-500">Course ID: {selectedCourse.id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Students</p>
            <p className="text-2xl font-bold text-blue-600">{selectedCourse.totalStudents}</p>
          </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("mark")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            activeTab === "mark"
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          <Users size={16} />
          Mark Attendance
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            activeTab === "analytics"
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          <BarChart3 size={16} />
          Analytics & Reports
        </button>
      </div>

      {/* Mark Attendance Tab */}
      {activeTab === "mark" && (
        <>
          {/* Date Selector */}
          <GlassCard className="p-5 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-blue-600" />
                <label className="font-medium">Select Date:</label>
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => handleMarkAll("present")}
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                >
                  <CheckCircle size={16} />
                  Mark All Present
                </button>
                <button
                  onClick={() => handleMarkAll("absent")}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                >
                  <XCircle size={16} />
                  Mark All Absent
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Stats Cards */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <GlassCard className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Students</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Marked</p>
              <p className="text-2xl font-bold text-blue-600">{stats.marked}</p>
            </GlassCard>
            <GlassCard className="p-4 text-center bg-green-50">
              <p className="text-sm text-green-700 mb-1">Present</p>
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
            </GlassCard>
            <GlassCard className="p-4 text-center bg-red-50">
              <p className="text-sm text-red-700 mb-1">Absent</p>
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
            </GlassCard>
            <GlassCard className="p-4 text-center bg-orange-50">
              <p className="text-sm text-orange-700 mb-1">Late</p>
              <p className="text-2xl font-bold text-orange-600">{stats.late}</p>
            </GlassCard>
          </div>

          {/* Students List */}
          <div className="space-y-3 mb-6">
            {students.map((student) => (
              <GlassCard key={student.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">Roll No: {student.rollNo}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right mr-4">
                      <p className="text-xs text-gray-500">Overall</p>
                      <StatusBadge variant={getAttendanceVariant(calculatePercentage(student))}>
                        {calculatePercentage(student)}%
                      </StatusBadge>
                    </div>

                    {attendanceStatuses.map((status) => {
                      const Icon = status.icon;
                      const isSelected = attendance[student.id] === status.value;
                      
                      return (
                        <button
                          key={status.value}
                          onClick={() => handleAttendanceChange(student.id, status.value)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition ${
                            isSelected
                              ? `${status.bg} border-current ${status.color}`
                              : "bg-white border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <Icon size={18} className={isSelected ? "" : "text-gray-400"} />
                          <span className={isSelected ? "font-medium" : "text-gray-600"}>
                            {status.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSave}
              disabled={stats.marked === 0}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition ${
                stats.marked === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Save size={20} />
              Save Attendance ({stats.marked}/{stats.total} marked)
            </button>
          </div>

          {isSaved && (
            <div className="mt-4 text-center">
              <StatusBadge variant="success">
                ✓ Attendance saved successfully!
              </StatusBadge>
            </div>
          )}
        </>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <GlassCard className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-3xl font-bold">{students.length}</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BarChart3 size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Attendance</p>
                  <p className="text-3xl font-bold text-green-600">{averageAttendance}%</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingDown size={24} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Low Attendance (&lt;75%)</p>
                  <p className="text-3xl font-bold text-red-600">{lowAttendanceStudents.length}</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* All Students Table */}
          <GlassCard className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users size={20} />
              Student Attendance Summary
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Roll No</th>
                    <th className="text-left py-3 px-4">Student Name</th>
                    <th className="text-center py-3 px-4">Total Classes</th>
                    <th className="text-center py-3 px-4">Present</th>
                    <th className="text-center py-3 px-4">Absent</th>
                    <th className="text-center py-3 px-4">Late</th>
                    <th className="text-center py-3 px-4">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {students
                    .sort((a, b) => calculatePercentage(b) - calculatePercentage(a))
                    .map((student) => {
                      const percentage = calculatePercentage(student);
                      return (
                        <tr key={student.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{student.rollNo}</td>
                          <td className="py-3 px-4">{student.name}</td>
                          <td className="py-3 px-4 text-center">{student.totalClasses}</td>
                          <td className="py-3 px-4 text-center text-green-600 font-medium">
                            {student.present}
                          </td>
                          <td className="py-3 px-4 text-center text-red-600 font-medium">
                            {student.absent}
                          </td>
                          <td className="py-3 px-4 text-center text-orange-600 font-medium">
                            {student.late}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <StatusBadge variant={getAttendanceVariant(percentage)}>
                              {percentage}%
                            </StatusBadge>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </GlassCard>

          {/* Low Attendance Alert */}
          {lowAttendanceStudents.length > 0 && (
            <GlassCard className="p-6 bg-red-50 border-red-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-700">
                <TrendingDown size={20} />
                Students with Low Attendance (&lt;75%)
              </h3>
              
              <div className="space-y-3">
                {lowAttendanceStudents.map((student) => {
                  const percentage = calculatePercentage(student);
                  return (
                    <div
                      key={student.id}
                      className="bg-white p-4 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-600">
                          Roll No: {student.rollNo}
                        </p>
                      </div>
                      <div className="text-right">
                        <StatusBadge variant="error">{percentage}%</StatusBadge>
                        <p className="text-xs text-gray-500 mt-1">
                          {student.present}/{student.totalClasses} classes
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          )}
        </>
      )}
    </AppLayout>
  );
}