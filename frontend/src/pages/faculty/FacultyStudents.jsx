import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { 
  Users,
  User,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  Mail,
  Phone,
  Eye,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Calendar,
  BookOpen,
  Award,
  MessageSquare,
  FileText,
  X
} from "lucide-react";

// Mock faculty courses data
const coursesData = [
  { 
    id: "CS301", 
    name: "Database Management Systems", 
    semester: "Spring 2024",
    totalStudents: 45,
    averageAttendance: 82.5,
    averageMarks: 71.3
  },
  { 
    id: "CS302", 
    name: "Operating Systems", 
    semester: "Spring 2024",
    totalStudents: 38,
    averageAttendance: 79.8,
    averageMarks: 68.7
  },
  { 
    id: "CS303", 
    name: "Computer Networks", 
    semester: "Spring 2024",
    totalStudents: 42,
    averageAttendance: 85.2,
    averageMarks: 74.5
  },
];

// Mock students data with comprehensive information
const studentsData = {
  CS301: [
    {
      id: "S001",
      name: "Rahul Sharma",
      rollNo: "20CS001",
      email: "rahul.sharma@student.edu",
      phone: "+91 98765 43210",
      attendance: 92,
      totalClasses: 24,
      classesAttended: 22,
      marks: {
        assignment: 18,
        quiz: 9,
        midsem: 27,
        total: 54,
        percentage: 90.0
      },
      status: "excellent",
      lastActive: "2024-03-10",
      alerts: []
    },
    {
      id: "S002",
      name: "Priya Patel",
      rollNo: "20CS002",
      email: "priya.patel@student.edu",
      phone: "+91 98765 43211",
      attendance: 100,
      totalClasses: 24,
      classesAttended: 24,
      marks: {
        assignment: 20,
        quiz: 10,
        midsem: 30,
        total: 60,
        percentage: 100.0
      },
      status: "excellent",
      lastActive: "2024-03-11",
      alerts: []
    },
    {
      id: "S003",
      name: "Amit Kumar",
      rollNo: "20CS003",
      email: "amit.kumar@student.edu",
      phone: "+91 98765 43212",
      attendance: 75,
      totalClasses: 24,
      classesAttended: 18,
      marks: {
        assignment: 15,
        quiz: 7,
        midsem: 21,
        total: 43,
        percentage: 71.7
      },
      status: "warning",
      lastActive: "2024-03-09",
      alerts: ["Attendance on edge (75%)", "Below average marks"]
    },
    {
      id: "S004",
      name: "Sneha Gupta",
      rollNo: "20CS004",
      email: "sneha.gupta@student.edu",
      phone: "+91 98765 43213",
      attendance: 96,
      totalClasses: 24,
      classesAttended: 23,
      marks: {
        assignment: 17,
        quiz: 9,
        midsem: 26,
        total: 52,
        percentage: 86.7
      },
      status: "good",
      lastActive: "2024-03-11",
      alerts: []
    },
    {
      id: "S005",
      name: "Vikram Singh",
      rollNo: "20CS005",
      email: "vikram.singh@student.edu",
      phone: "+91 98765 43214",
      attendance: 67,
      totalClasses: 24,
      classesAttended: 16,
      marks: {
        assignment: 12,
        quiz: 6,
        midsem: 18,
        total: 36,
        percentage: 60.0
      },
      status: "critical",
      lastActive: "2024-03-08",
      alerts: ["Low attendance (67%)", "Poor academic performance", "Not active recently"]
    },
    {
      id: "S006",
      name: "Ananya Roy",
      rollNo: "20CS006",
      email: "ananya.roy@student.edu",
      phone: "+91 98765 43215",
      attendance: 88,
      totalClasses: 24,
      classesAttended: 21,
      marks: {
        assignment: 16,
        quiz: 8,
        midsem: 24,
        total: 48,
        percentage: 80.0
      },
      status: "good",
      lastActive: "2024-03-10",
      alerts: []
    },
    {
      id: "S007",
      name: "Karan Malhotra",
      rollNo: "20CS007",
      email: "karan.malhotra@student.edu",
      phone: "+91 98765 43216",
      attendance: 71,
      totalClasses: 24,
      classesAttended: 17,
      marks: {
        assignment: 11,
        quiz: 5,
        midsem: 15,
        total: 31,
        percentage: 51.7
      },
      status: "critical",
      lastActive: "2024-03-07",
      alerts: ["Attendance below 75%", "Failing grades", "No recent activity"]
    },
    {
      id: "S008",
      name: "Divya Krishnan",
      rollNo: "20CS008",
      email: "divya.krishnan@student.edu",
      phone: "+91 98765 43217",
      attendance: 79,
      totalClasses: 24,
      classesAttended: 19,
      marks: {
        assignment: 14,
        quiz: 7,
        midsem: 19,
        total: 40,
        percentage: 66.7
      },
      status: "warning",
      lastActive: "2024-03-10",
      alerts: ["Attendance on edge (79%)", "Below average performance"]
    },
  ],
  CS302: [
    {
      id: "S009",
      name: "Rohan Verma",
      rollNo: "20CS009",
      email: "rohan.verma@student.edu",
      phone: "+91 98765 43218",
      attendance: 95,
      totalClasses: 20,
      classesAttended: 19,
      marks: {
        assignment: 19,
        quiz: 10,
        midsem: 28,
        total: 57,
        percentage: 95.0
      },
      status: "excellent",
      lastActive: "2024-03-11",
      alerts: []
    },
    {
      id: "S010",
      name: "Kavya Reddy",
      rollNo: "20CS010",
      email: "kavya.reddy@student.edu",
      phone: "+91 98765 43219",
      attendance: 100,
      totalClasses: 20,
      classesAttended: 20,
      marks: {
        assignment: 20,
        quiz: 10,
        midsem: 30,
        total: 60,
        percentage: 100.0
      },
      status: "excellent",
      lastActive: "2024-03-11",
      alerts: []
    },
    {
      id: "S011",
      name: "Arjun Mehta",
      rollNo: "20CS011",
      email: "arjun.mehta@student.edu",
      phone: "+91 98765 43220",
      attendance: 73,
      totalClasses: 20,
      classesAttended: 15,
      marks: {
        assignment: 13,
        quiz: 6,
        midsem: 18,
        total: 37,
        percentage: 61.7
      },
      status: "critical",
      lastActive: "2024-03-09",
      alerts: ["Attendance below 75%", "Below average marks"]
    },
  ],
  CS303: [
    {
      id: "S012",
      name: "Neha Joshi",
      rollNo: "20CS012",
      email: "neha.joshi@student.edu",
      phone: "+91 98765 43221",
      attendance: 91,
      totalClasses: 22,
      classesAttended: 20,
      marks: {
        assignment: 18,
        quiz: 9,
        midsem: 27,
        total: 54,
        percentage: 90.0
      },
      status: "excellent",
      lastActive: "2024-03-11",
      alerts: []
    },
    {
      id: "S013",
      name: "Aditya Kumar",
      rollNo: "20CS013",
      email: "aditya.kumar@student.edu",
      phone: "+91 98765 43222",
      attendance: 77,
      totalClasses: 22,
      classesAttended: 17,
      marks: {
        assignment: 14,
        quiz: 7,
        midsem: 20,
        total: 41,
        percentage: 68.3
      },
      status: "warning",
      lastActive: "2024-03-10",
      alerts: ["Attendance on edge (77%)", "Below average performance"]
    },
  ],
};

const statusConfig = {
  excellent: {
    label: "Excellent",
    variant: "success",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Performing well in all aspects"
  },
  good: {
    label: "Good",
    variant: "success",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Good overall performance"
  },
  warning: {
    label: "Needs Attention",
    variant: "warning",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description: "Attendance or grades need improvement"
  },
  critical: {
    label: "Critical",
    variant: "error",
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "Immediate intervention required"
  }
};

const filterOptions = [
  { value: "all", label: "All Students" },
  { value: "excellent", label: "Excellent Performance" },
  { value: "good", label: "Good Performance" },
  { value: "warning", label: "Needs Attention" },
  { value: "critical", label: "Critical - Requires Intervention" },
];

export default function FacultyStudents() {
  const [selectedCourse, setSelectedCourse] = useState(coursesData[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const students = studentsData[selectedCourse.id] || [];

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setSearchQuery("");
    setFilterStatus("all");
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const handleContactStudent = (student) => {
    window.location.href = `mailto:${student.email}`;
  };

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Get student counts by status
  const getStatusCounts = () => {
    const counts = {
      excellent: students.filter(s => s.status === "excellent").length,
      good: students.filter(s => s.status === "good").length,
      warning: students.filter(s => s.status === "warning").length,
      critical: students.filter(s => s.status === "critical").length,
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  const getAttendanceVariant = (percentage) => {
    if (percentage >= 85) return "success";
    if (percentage >= 75) return "warning";
    return "error";
  };

  const getMarksVariant = (percentage) => {
    if (percentage >= 80) return "success";
    if (percentage >= 60) return "warning";
    return "error";
  };

  return (
    <AppLayout>
      <h1 className="text-3xl font-serif mb-6">Student Management</h1>

      {/* Course Selector */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {coursesData.map((course) => (
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

      {/* Course Overview Card */}
      <GlassCard className="p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{selectedCourse.name}</h2>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span>📚 Course Code: {selectedCourse.id}</span>
              <span>🗓️ {selectedCourse.semester}</span>
              <span className="flex items-center gap-1">
                <Users size={14} />
                {selectedCourse.totalStudents} Students Enrolled
              </span>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Avg Attendance</p>
              <p className="text-2xl font-bold text-blue-600">
                {selectedCourse.averageAttendance}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Avg Marks</p>
              <p className="text-2xl font-bold text-green-600">
                {selectedCourse.averageMarks}%
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {Object.entries(statusConfig).map(([key, config]) => {
          const Icon = config.icon;
          const count = statusCounts[key];

          return (
            <GlassCard 
              key={key} 
              className={`p-6 cursor-pointer hover:shadow-lg transition ${
                filterStatus === key ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setFilterStatus(filterStatus === key ? "all" : key)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${config.bgColor} rounded-full flex items-center justify-center`}>
                  <Icon size={24} className={config.color} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{config.label}</p>
                  <p className="text-3xl font-bold">{count}</p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Search and Filter */}
      <GlassCard className="p-5 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <span className="font-medium">Filter & Search:</span>
          </div>

          {/* Search */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or roll number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {(searchQuery || filterStatus !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
              }}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>
      </GlassCard>

      {/* Students List */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredStudents.length} of {students.length} students
        </p>
      </div>

      {filteredStudents.length === 0 ? (
        <GlassCard className="p-8 text-center">
          <Users size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">
            No students found matching your filters.
          </p>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {filteredStudents.map((student) => {
            const statusInfo = statusConfig[student.status];
            const StatusIcon = statusInfo.icon;

            return (
              <GlassCard 
                key={student.id} 
                className={`p-6 ${student.status === 'critical' ? 'border-2 border-red-500' : ''}`}
              >
                <div className="flex items-start gap-6">
                  {/* Student Avatar & Basic Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={32} className="text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{student.name}</h3>
                          <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Mail size={12} />
                              {student.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              Last active: {student.lastActive}
                            </span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${statusInfo.bgColor}`}>
                          <StatusIcon size={20} className={statusInfo.color} />
                          <span className={`font-semibold ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>

                      {/* Alerts Section */}
                      {student.alerts.length > 0 && (
                        <div className={`mt-3 p-3 rounded-lg ${
                          student.status === 'critical' ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'
                        }`}>
                          <div className="flex items-start gap-2">
                            <AlertTriangle size={16} className={student.status === 'critical' ? 'text-red-600' : 'text-orange-600'} />
                            <div className="flex-1">
                              <p className={`text-sm font-semibold mb-1 ${
                                student.status === 'critical' ? 'text-red-700' : 'text-orange-700'
                              }`}>
                                Alert{student.alerts.length > 1 ? 's' : ''}:
                              </p>
                              <ul className="space-y-1">
                                {student.alerts.map((alert, index) => (
                                  <li key={index} className={`text-sm ${
                                    student.status === 'critical' ? 'text-red-600' : 'text-orange-600'
                                  }`}>
                                    • {alert}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {/* Attendance */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Attendance</span>
                            <StatusBadge variant={getAttendanceVariant(student.attendance)}>
                              {student.attendance}%
                            </StatusBadge>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                student.attendance >= 85 ? 'bg-green-500' :
                                student.attendance >= 75 ? 'bg-orange-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${student.attendance}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {student.classesAttended}/{student.totalClasses} classes
                          </p>
                        </div>

                        {/* Academic Performance */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Academic Performance</span>
                            <StatusBadge variant={getMarksVariant(student.marks.percentage)}>
                              {student.marks.percentage.toFixed(1)}%
                            </StatusBadge>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                student.marks.percentage >= 80 ? 'bg-green-500' :
                                student.marks.percentage >= 60 ? 'bg-orange-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${student.marks.percentage}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {student.marks.total}/60 marks obtained
                          </p>
                        </div>

                        {/* Component Breakdown */}
                        <div className="text-sm">
                          <span className="text-gray-600 block mb-1">Score Breakdown:</span>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Assignments:</span>
                              <span className="font-medium">{student.marks.assignment}/20</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Quizzes:</span>
                              <span className="font-medium">{student.marks.quiz}/10</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Mid-Sem:</span>
                              <span className="font-medium">{student.marks.midsem}/30</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleViewDetails(student)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          <Eye size={16} />
                          View Details
                        </button>
                        <button
                          onClick={() => handleContactStudent(student)}
                          className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                        >
                          <Mail size={16} />
                          Send Email
                        </button>
                        {(student.status === 'critical' || student.status === 'warning') && (
                          <button className="flex items-center gap-2 px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition">
                            <MessageSquare size={16} />
                            Schedule Meeting
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* Student Details Modal */}
      {showDetailsModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <GlassCard className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User size={40} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                    <p className="text-gray-600">Roll No: {selectedStudent.rollNo}</p>
                    <StatusBadge variant={statusConfig[selectedStudent.status].variant} className="mt-2">
                      {statusConfig[selectedStudent.status].label}
                    </StatusBadge>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Mail size={20} />
                  Contact Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Mail size={16} className="text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="text-sm font-medium">{selectedStudent.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Phone size={16} className="text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-600">Phone</p>
                      <p className="text-sm font-medium">{selectedStudent.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Calendar size={20} />
                  Attendance Details
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Overall Attendance</span>
                    <StatusBadge variant={getAttendanceVariant(selectedStudent.attendance)}>
                      {selectedStudent.attendance}%
                    </StatusBadge>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full ${
                        selectedStudent.attendance >= 85 ? 'bg-green-500' :
                        selectedStudent.attendance >= 75 ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${selectedStudent.attendance}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">
                      Present: {selectedStudent.classesAttended} classes
                    </span>
                    <span className="text-red-600">
                      Absent: {selectedStudent.totalClasses - selectedStudent.classesAttended} classes
                    </span>
                  </div>
                </div>
              </div>

              {/* Academic Performance */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 size={20} />
                  Academic Performance
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Overall Performance</span>
                    <StatusBadge variant={getMarksVariant(selectedStudent.marks.percentage)}>
                      {selectedStudent.marks.percentage.toFixed(1)}%
                    </StatusBadge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Assignments</span>
                        <span className="font-medium">{selectedStudent.marks.assignment}/20</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${(selectedStudent.marks.assignment / 20) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Quizzes</span>
                        <span className="font-medium">{selectedStudent.marks.quiz}/10</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500"
                          style={{ width: `${(selectedStudent.marks.quiz / 10) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mid-Semester Exam</span>
                        <span className="font-medium">{selectedStudent.marks.midsem}/30</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${(selectedStudent.marks.midsem / 30) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {selectedStudent.alerts.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle size={20} />
                    Active Alerts
                  </h3>
                  <div className={`p-4 rounded-lg ${
                    selectedStudent.status === 'critical' ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'
                  }`}>
                    <ul className="space-y-2">
                      {selectedStudent.alerts.map((alert, index) => (
                        <li key={index} className={`flex items-center gap-2 ${
                          selectedStudent.status === 'critical' ? 'text-red-600' : 'text-orange-600'
                        }`}>
                          <AlertCircle size={16} />
                          <span>{alert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleContactStudent(selectedStudent)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex-1"
                >
                  <Mail size={16} />
                  Send Email
                </button>
                <button className="flex items-center gap-2 border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition flex-1">
                  <FileText size={16} />
                  Generate Report
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </AppLayout>
  );
}