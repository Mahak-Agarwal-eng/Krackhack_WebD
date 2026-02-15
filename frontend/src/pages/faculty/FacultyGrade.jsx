import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";
import { 
  GraduationCap,
  Edit2,
  Save,
  Upload,
  Download,
  Eye,
  TrendingUp,
  BarChart3,
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  Award,
  MessageSquare,
  Send
} from "lucide-react";

// Mock faculty courses data
const coursesData = [
  { id: "CS301", name: "Database Management Systems", totalMarks: 100 },
  { id: "CS302", name: "Operating Systems", totalMarks: 100 },
  { id: "CS303", name: "Computer Networks", totalMarks: 100 },
];
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


// Grade components with weightage
const gradeComponents = [
  { id: "assignment", label: "Assignments", weight: 20, maxMarks: 20 },
  { id: "quiz", label: "Quizzes", weight: 10, maxMarks: 10 },
  { id: "midsem", label: "Mid-Sem Exam", weight: 30, maxMarks: 30 },
  { id: "endsem", label: "End-Sem Exam", weight: 30, maxMarks: 30 },
  { id: "project", label: "Project", weight: 10, maxMarks: 10 },
];

// Grading scale
const gradingScale = [
  { grade: "A+", min: 90, max: 100, gpa: 10 },
  { grade: "A", min: 80, max: 89, gpa: 9 },
  { grade: "B+", min: 70, max: 79, gpa: 8 },
  { grade: "B", min: 60, max: 69, gpa: 7 },
  { grade: "C+", min: 50, max: 59, gpa: 6 },
  { grade: "C", min: 40, max: 49, gpa: 5 },
  { grade: "F", min: 0, max: 39, gpa: 0 },
];

// Mock student grades data
const initialGradesData = {
  CS301: [
    {
      id: "S001",
      name: "Rahul Sharma",
      rollNo: "20CS001",
      grades: { assignment: 18, quiz: 9, midsem: 27, endsem: 28, project: 9 },
      remarks: "Excellent performance throughout the semester",
      published: true,
    },
    {
      id: "S002",
      name: "Priya Patel",
      rollNo: "20CS002",
      grades: { assignment: 20, quiz: 10, midsem: 30, endsem: 30, project: 10 },
      remarks: "Outstanding work! Keep it up.",
      published: true,
    },
    {
      id: "S003",
      name: "Amit Kumar",
      rollNo: "20CS003",
      grades: { assignment: 15, quiz: 7, midsem: 21, endsem: 22, project: 8 },
      remarks: "Good effort. Focus more on exam preparation.",
      published: false,
    },
    {
      id: "S004",
      name: "Sneha Gupta",
      rollNo: "20CS004",
      grades: { assignment: 17, quiz: 9, midsem: 26, endsem: 27, project: 9 },
      remarks: "",
      published: true,
    },
    {
      id: "S005",
      name: "Vikram Singh",
      rollNo: "20CS005",
      grades: { assignment: 12, quiz: 6, midsem: 18, endsem: 20, project: 7 },
      remarks: "Needs improvement in theoretical concepts",
      published: false,
    },
  ],
  CS302: [
    {
      id: "S006",
      name: "Rohan Verma",
      rollNo: "20CS006",
      grades: { assignment: 19, quiz: 10, midsem: 28, endsem: 29, project: 10 },
      remarks: "",
      published: true,
    },
  ],
  CS303: [
    {
      id: "S007",
      name: "Neha Joshi",
      rollNo: "20CS007",
      grades: { assignment: 18, quiz: 9, midsem: 27, endsem: 28, project: 9 },
      remarks: "",
      published: false,
    },
  ],
};

const tabs = [
  { id: "grades", label: "Grade Entry", icon: Edit2 },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "bulk", label: "Bulk Upload", icon: Upload },
];

export default function FacultyGrades() {
  const [selectedCourse, setSelectedCourse] = useState(coursesData[0]);
  const [activeTab, setActiveTab] = useState("grades");
  const [gradesData, setGradesData] = useState(initialGradesData);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showRemarksModal, setShowRemarksModal] = useState(null);
  const [remarksInput, setRemarksInput] = useState("");

  const students = gradesData[selectedCourse.id] || [];

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setEditingStudent(null);
  };

  const calculateTotal = (grades) => {
    return Object.values(grades).reduce((sum, mark) => sum + (mark || 0), 0);
  };

  const calculatePercentage = (grades) => {
    const total = calculateTotal(grades);
    const maxTotal = gradeComponents.reduce((sum, comp) => sum + comp.maxMarks, 0);
    return ((total / maxTotal) * 100).toFixed(2);
  };

  const getLetterGrade = (percentage) => {
    const grade = gradingScale.find(g => percentage >= g.min && percentage <= g.max);
    return grade || gradingScale[gradingScale.length - 1];
  };

  const handleGradeChange = (studentId, component, value) => {
    const numValue = parseFloat(value) || 0;
    const maxMarks = gradeComponents.find(c => c.id === component)?.maxMarks || 0;
    
    if (numValue > maxMarks) {
      alert(`Maximum marks for ${component} is ${maxMarks}`);
      return;
    }

    setGradesData({
      ...gradesData,
      [selectedCourse.id]: gradesData[selectedCourse.id].map(student =>
        student.id === studentId
          ? {
              ...student,
              grades: { ...student.grades, [component]: numValue },
              published: false,
            }
          : student
      ),
    });
  };

  const handleSaveGrades = () => {
    alert("Grades saved successfully!");
    setEditingStudent(null);
  };

  const handlePublishGrades = (studentId) => {
    if (confirm("Are you sure you want to publish grades for this student? Students will be able to view them.")) {
      setGradesData({
        ...gradesData,
        [selectedCourse.id]: gradesData[selectedCourse.id].map(student =>
          student.id === studentId
            ? { ...student, published: true }
            : student
        ),
      });
    }
  };

  const handlePublishAll = () => {
    if (confirm("Are you sure you want to publish grades for ALL students? This action will make grades visible to students.")) {
      setGradesData({
        ...gradesData,
        [selectedCourse.id]: gradesData[selectedCourse.id].map(student => ({
          ...student,
          published: true,
        })),
      });
    }
  };

  const handleSaveRemarks = () => {
    setGradesData({
      ...gradesData,
      [selectedCourse.id]: gradesData[selectedCourse.id].map(student =>
        student.id === showRemarksModal
          ? { ...student, remarks: remarksInput }
          : student
      ),
    });
    setShowRemarksModal(null);
    setRemarksInput("");
  };

  const openRemarksModal = (student) => {
    setShowRemarksModal(student.id);
    setRemarksInput(student.remarks || "");
  };

  // Analytics calculations
  const getGradeDistribution = () => {
    const distribution = {};
    gradingScale.forEach(g => distribution[g.grade] = 0);

    students.forEach(student => {
      const percentage = parseFloat(calculatePercentage(student.grades));
      const grade = getLetterGrade(percentage);
      distribution[grade.grade]++;
    });

    return distribution;
  };

  const getAverageByComponent = () => {
    const averages = {};
    
    gradeComponents.forEach(component => {
      const total = students.reduce((sum, student) => sum + (student.grades[component.id] || 0), 0);
      averages[component.id] = students.length > 0 ? (total / students.length).toFixed(2) : 0;
    });

    return averages;
  };

  const getClassAverage = () => {
    if (students.length === 0) return 0;
    const total = students.reduce((sum, student) => sum + parseFloat(calculatePercentage(student.grades)), 0);
    return (total / students.length).toFixed(2);
  };

  const getTopPerformers = () => {
    return [...students]
      .sort((a, b) => parseFloat(calculatePercentage(b.grades)) - parseFloat(calculatePercentage(a.grades)))
      .slice(0, 5);
  };

  const getFailingStudents = () => {
    return students.filter(student => parseFloat(calculatePercentage(student.grades)) < 40);
  };

  const renderGradesTab = () => (
    <>
      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <button
            onClick={handleSaveGrades}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <Save size={20} />
            Save All Changes
          </button>
          <button
            onClick={handlePublishAll}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Send size={20} />
            Publish All Grades
          </button>
        </div>

        <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          <Download size={20} />
          Export to Excel
        </button>
      </div>

      {/* Grades Table */}
      <GlassCard className="p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 sticky left-0 bg-white z-10">Roll No</th>
              <th className="text-left py-3 px-4 sticky left-24 bg-white z-10">Student Name</th>
              
              {gradeComponents.map(component => (
                <th key={component.id} className="text-center py-3 px-4">
                  {component.label}
                  <br />
                  <span className="text-xs text-gray-500">
                    (Max: {component.maxMarks})
                  </span>
                </th>
              ))}
              
              <th className="text-center py-3 px-4 bg-blue-50">
                Total
                <br />
                <span className="text-xs text-gray-500">(100)</span>
              </th>
              <th className="text-center py-3 px-4 bg-blue-50">Percentage</th>
              <th className="text-center py-3 px-4 bg-blue-50">Grade</th>
              <th className="text-center py-3 px-4">Status</th>
              <th className="text-center py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const total = calculateTotal(student.grades);
              const percentage = calculatePercentage(student.grades);
              const letterGrade = getLetterGrade(parseFloat(percentage));
              const isEditing = editingStudent === student.id;

              return (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium sticky left-0 bg-white">
                    {student.rollNo}
                  </td>
                  <td className="py-3 px-4 sticky left-24 bg-white">
                    {student.name}
                  </td>

                  {gradeComponents.map(component => (
                    <td key={component.id} className="py-3 px-4 text-center">
                      {isEditing ? (
                        <input
                          type="number"
                          value={student.grades[component.id] || 0}
                          onChange={(e) => handleGradeChange(student.id, component.id, e.target.value)}
                          min="0"
                          max={component.maxMarks}
                          className="w-16 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <span className={student.grades[component.id] === component.maxMarks ? "text-green-600 font-semibold" : ""}>
                          {student.grades[component.id] || 0}
                        </span>
                      )}
                    </td>
                  ))}

                  <td className="py-3 px-4 text-center font-semibold bg-blue-50">
                    {total}
                  </td>
                  <td className="py-3 px-4 text-center font-semibold bg-blue-50">
                    {percentage}%
                  </td>
                  <td className="py-3 px-4 text-center bg-blue-50">
                    <StatusBadge 
                      variant={
                        letterGrade.grade.includes("A") ? "success" :
                        letterGrade.grade.includes("B") ? "warning" :
                        letterGrade.grade === "F" ? "error" : "default"
                      }
                    >
                      {letterGrade.grade}
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {student.published ? (
                      <StatusBadge variant="success">
                        <CheckCircle size={12} className="inline mr-1" />
                        Published
                      </StatusBadge>
                    ) : (
                      <StatusBadge variant="warning">
                        <AlertCircle size={12} className="inline mr-1" />
                        Draft
                      </StatusBadge>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      {isEditing ? (
                        <button
                          onClick={() => setEditingStudent(null)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="Done Editing"
                        >
                          <CheckCircle size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditingStudent(student.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                      
                      <button
                        onClick={() => openRemarksModal(student)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                        title="Add Remarks"
                      >
                        <MessageSquare size={18} />
                      </button>

                      {!student.published && (
                        <button
                          onClick={() => handlePublishGrades(student.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="Publish"
                        >
                          <Send size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </GlassCard>

      {/* Remarks Modal */}
      {showRemarksModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <GlassCard className="p-6 max-w-lg w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare size={20} />
              Add Remarks for {students.find(s => s.id === showRemarksModal)?.name}
            </h3>

            <textarea
              value={remarksInput}
              onChange={(e) => setRemarksInput(e.target.value)}
              rows="5"
              placeholder="Enter feedback or remarks for the student..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={handleSaveRemarks}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Save size={16} />
                Save Remarks
              </button>
              <button
                onClick={() => {
                  setShowRemarksModal(null);
                  setRemarksInput("");
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </>
  );

  const renderAnalyticsTab = () => {
    const distribution = getGradeDistribution();
    const componentAverages = getAverageByComponent();
    const classAverage = getClassAverage();
    const topPerformers = getTopPerformers();
    const failingStudents = getFailingStudents();

    return (
      <>
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
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
                <p className="text-sm text-gray-600">Class Average</p>
                <p className="text-3xl font-bold text-green-600">{classAverage}%</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">A+ Grades</p>
                <p className="text-3xl font-bold text-yellow-600">{distribution["A+"]}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Failing Students</p>
                <p className="text-3xl font-bold text-red-600">{failingStudents.length}</p>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Grade Distribution */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 size={20} />
              Grade Distribution
            </h3>

            <div className="space-y-3">
              {gradingScale.map((scale) => {
                const count = distribution[scale.grade];
                const percentage = students.length > 0 ? (count / students.length * 100).toFixed(1) : 0;

                return (
                  <div key={scale.grade}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Grade {scale.grade}</span>
                      <span className="text-sm text-gray-600">
                        {count} students ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-6 bg-gray-200 rounded-lg overflow-hidden">
                      <div
                        className={`h-full ${
                          scale.grade.includes("A") ? "bg-green-500" :
                          scale.grade.includes("B") ? "bg-blue-500" :
                          scale.grade.includes("C") ? "bg-yellow-500" :
                          "bg-red-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Component-wise Average */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Component-wise Average
            </h3>

            <div className="space-y-4">
              {gradeComponents.map((component) => {
                const average = componentAverages[component.id];
                const percentage = (average / component.maxMarks * 100).toFixed(1);

                return (
                  <div key={component.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{component.label}</span>
                      <span className="text-sm text-gray-600">
                        {average} / {component.maxMarks} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-6 bg-gray-200 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Top Performers */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award size={20} />
              Top 5 Performers
            </h3>

            <div className="space-y-3">
              {topPerformers.map((student, index) => {
                const percentage = calculatePercentage(student.grades);
                const letterGrade = getLetterGrade(parseFloat(percentage));

                return (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-yellow-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-gray-600">{student.rollNo}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <StatusBadge variant="success">{letterGrade.grade}</StatusBadge>
                      <p className="text-sm text-gray-600 mt-1">{percentage}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Students Needing Attention */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-600">
              <AlertCircle size={20} />
              Students Needing Attention
            </h3>

            {failingStudents.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="mx-auto mb-4 text-green-400" />
                <p className="text-gray-500">All students are performing well!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {failingStudents.map((student) => {
                  const percentage = calculatePercentage(student.grades);
                  const letterGrade = getLetterGrade(parseFloat(percentage));

                  return (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-gray-600">{student.rollNo}</p>
                      </div>
                      <div className="text-right">
                        <StatusBadge variant="error">{letterGrade.grade}</StatusBadge>
                        <p className="text-sm text-red-600 mt-1">{percentage}%</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </GlassCard>
        </div>
      </>
    );
  };

  const renderBulkUploadTab = () => (
    <>
      <GlassCard className="p-8 mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Upload size={24} />
          Bulk Upload Grades
        </h3>

        <div className="space-y-6">
          <div>
            <p className="text-gray-700 mb-4">
              Upload student grades in bulk using a CSV or Excel file. Make sure your file follows the correct format.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">File Format Requirements:</h4>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>First row should contain headers: Roll No, Assignment, Quiz, Mid-Sem, End-Sem, Project</li>
                <li>Each subsequent row should contain student data</li>
                <li>All marks should be numeric values</li>
                <li>Do not exceed maximum marks for any component</li>
              </ul>
            </div>

            <button className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition mb-4">
              <Download size={20} />
              Download Template
            </button>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition">
            <Upload size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">Drop your file here or click to browse</p>
            <p className="text-sm text-gray-600 mb-4">Supported formats: CSV, XLSX (Max 5MB)</p>
            <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
              <Upload size={16} />
              Select File
              <input
                type="file"
                className="hidden"
                accept=".csv,.xlsx"
              />
            </label>
          </div>
        </div>
      </GlassCard>

      {/* Recent Uploads */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText size={20} />
          Recent Uploads
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-blue-600" />
              <div>
                <p className="font-medium">grades_cs301_march.xlsx</p>
                <p className="text-xs text-gray-600">Uploaded on March 10, 2024</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-600 hover:underline text-sm">View</button>
              <button className="text-green-600 hover:underline text-sm">Download</button>
            </div>
          </div>
        </div>
      </GlassCard>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "grades": return renderGradesTab();
      case "analytics": return renderAnalyticsTab();
      case "bulk": return renderBulkUploadTab();
      default: return null;
    }
  };

  return (
    <AppLayout navigation={<FacultyNav />}>
      <h1 className="text-3xl font-serif mb-6">Grade Management</h1>

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

      {/* Course Info Card */}
      <GlassCard className="p-5 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{selectedCourse.name}</h2>
            <p className="text-sm text-gray-500">Course ID: {selectedCourse.id}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-blue-600">{students.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">
                {students.filter(s => s.published).length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-orange-600">
                {students.filter(s => !s.published).length}
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {renderContent()}
    </AppLayout>
  );
}