import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { 
  BookOpen,
  Upload,
  FileText,
  Video,
  Bell,
  Users,
  Edit2,
  Trash2,
  Download,
  Plus,
  X,
  Search,
  Filter,
  Eye,
  CheckCircle
} from "lucide-react";

// Mock faculty courses data
const coursesData = [
  {
    id: "CS301",
    name: "Database Management Systems",
    semester: "Spring 2024",
    credits: 4,
    enrolledStudents: 45,
    progress: 65,
  },
  {
    id: "CS302",
    name: "Operating Systems",
    semester: "Spring 2024",
    credits: 3,
    enrolledStudents: 38,
    progress: 58,
  },
  {
    id: "CS303",
    name: "Computer Networks",
    semester: "Spring 2024",
    credits: 4,
    enrolledStudents: 42,
    progress: 72,
  },
];

// Mock materials data
const initialMaterials = {
  CS301: [
    {
      id: 1,
      title: "DBMS Introduction - Unit 1",
      type: "lecture_notes",
      file_url: "dbms_unit1.pdf",
      file_size: "2.3 MB",
      upload_date: "2024-03-01",
      downloads: 42,
    },
    {
      id: 2,
      title: "Normalization Lecture Recording",
      type: "video",
      file_url: "normalization_lecture.mp4",
      file_size: "125 MB",
      upload_date: "2024-03-05",
      downloads: 38,
    },
    {
      id: 3,
      title: "Mid-Sem PYQ 2023",
      type: "pyq",
      file_url: "midsem_2023.pdf",
      file_size: "1.1 MB",
      upload_date: "2024-02-28",
      downloads: 45,
    },
    {
      id: 4,
      title: "Course Syllabus 2024",
      type: "syllabus",
      file_url: "syllabus_2024.pdf",
      file_size: "0.5 MB",
      upload_date: "2024-01-15",
      downloads: 45,
    },
  ],
  CS302: [
    {
      id: 5,
      title: "Process Scheduling Notes",
      type: "lecture_notes",
      file_url: "scheduling_notes.pdf",
      file_size: "1.8 MB",
      upload_date: "2024-03-03",
      downloads: 35,
    },
  ],
  CS303: [
    {
      id: 6,
      title: "TCP/IP Protocol Stack",
      type: "lecture_notes",
      file_url: "tcpip_notes.pdf",
      file_size: "2.1 MB",
      upload_date: "2024-03-02",
      downloads: 40,
    },
  ],
};

// Mock students data
const studentsData = {
  CS301: [
    { id: "S001", name: "Rahul Sharma", rollNo: "20CS001", email: "rahul@example.com", attendance: 92 },
    { id: "S002", name: "Priya Patel", rollNo: "20CS002", email: "priya@example.com", attendance: 100 },
    { id: "S003", name: "Amit Kumar", rollNo: "20CS003", email: "amit@example.com", attendance: 75 },
    { id: "S004", name: "Sneha Gupta", rollNo: "20CS004", email: "sneha@example.com", attendance: 96 },
    { id: "S005", name: "Vikram Singh", rollNo: "20CS005", email: "vikram@example.com", attendance: 67 },
  ],
  CS302: [
    { id: "S006", name: "Rohan Verma", rollNo: "20CS006", email: "rohan@example.com", attendance: 95 },
    { id: "S007", name: "Kavya Reddy", rollNo: "20CS007", email: "kavya@example.com", attendance: 100 },
    { id: "S008", name: "Arjun Mehta", rollNo: "20CS008", email: "arjun@example.com", attendance: 78 },
  ],
  CS303: [
    { id: "S009", name: "Neha Joshi", rollNo: "20CS009", email: "neha@example.com", attendance: 91 },
    { id: "S010", name: "Aditya Kumar", rollNo: "20CS010", email: "aditya@example.com", attendance: 88 },
  ],
};

// Mock syllabus data
const syllabusData = {
  CS301: [
    { id: 1, unit: 1, title: "Introduction to DBMS", topics: ["Database concepts", "Data models", "Architecture"], status: "completed" },
    { id: 2, unit: 2, title: "Relational Model", topics: ["Relations", "Keys", "Integrity constraints"], status: "completed" },
    { id: 3, unit: 3, title: "Normalization", topics: ["Functional dependencies", "Normal forms", "Decomposition"], status: "in_progress" },
    { id: 4, unit: 4, title: "Transactions", topics: ["ACID properties", "Concurrency control", "Recovery"], status: "pending" },
  ],
  CS302: [
    { id: 1, unit: 1, title: "Introduction to OS", topics: ["OS concepts", "System calls", "Structure"], status: "completed" },
    { id: 2, unit: 2, title: "Process Management", topics: ["Processes", "Threads", "Scheduling"], status: "in_progress" },
  ],
  CS303: [
    { id: 1, unit: 1, title: "Network Fundamentals", topics: ["OSI model", "TCP/IP", "Protocols"], status: "completed" },
  ],
};

const materialTypes = [
  { value: "lecture_notes", label: "Lecture Notes", icon: FileText },
  { value: "video", label: "Video Lecture", icon: Video },
  { value: "pyq", label: "Previous Year Questions", icon: FileText },
  { value: "syllabus", label: "Syllabus", icon: BookOpen },
  { value: "reference", label: "Reference Material", icon: BookOpen },
  { value: "presentation", label: "Presentation", icon: FileText },
];

const tabs = [
  { id: "materials", label: "Course Materials", icon: BookOpen },
  { id: "students", label: "Enrolled Students", icon: Users },
  { id: "syllabus", label: "Syllabus", icon: FileText },
  { id: "announcements", label: "Announcements", icon: Bell },
];

export default function FacultyCourses() {
  const [selectedCourse, setSelectedCourse] = useState(coursesData[0]);
  const [activeTab, setActiveTab] = useState("materials");
  const [materials, setMaterials] = useState(initialMaterials);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    title: "",
    type: "lecture_notes",
    file: null,
  });

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setActiveTab("materials");
  };

  const handleUploadChange = (e) => {
    const { name, value } = e.target;
    setUploadForm({ ...uploadForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setUploadForm({ ...uploadForm, file: e.target.files[0] });
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    
    const newMaterial = {
      id: Date.now(),
      title: uploadForm.title,
      type: uploadForm.type,
      file_url: uploadForm.file?.name || "file.pdf",
      file_size: uploadForm.file ? `${(uploadForm.file.size / (1024 * 1024)).toFixed(2)} MB` : "0 MB",
      upload_date: new Date().toISOString().split('T')[0],
      downloads: 0,
    };

    setMaterials({
      ...materials,
      [selectedCourse.id]: [...(materials[selectedCourse.id] || []), newMaterial],
    });

    setUploadForm({ title: "", type: "lecture_notes", file: null });
    setShowUploadForm(false);
  };

  const handleDeleteMaterial = (materialId) => {
    if (confirm("Are you sure you want to delete this material?")) {
      setMaterials({
        ...materials,
        [selectedCourse.id]: materials[selectedCourse.id].filter(m => m.id !== materialId),
      });
    }
  };

  const courseMaterials = materials[selectedCourse.id] || [];
  const courseStudents = studentsData[selectedCourse.id] || [];
  const courseSyllabus = syllabusData[selectedCourse.id] || [];

  // Filter materials
  const filteredMaterials = courseMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || material.type === filterType;
    return matchesSearch && matchesType;
  });

  const getMaterialTypeInfo = (type) => {
    return materialTypes.find(t => t.value === type) || materialTypes[0];
  };

  const getAttendanceVariant = (percentage) => {
    if (percentage >= 85) return "success";
    if (percentage >= 75) return "warning";
    return "error";
  };

  const getSyllabusStatusColor = (status) => {
    switch (status) {
      case "completed": return "success";
      case "in_progress": return "warning";
      default: return "default";
    }
  };

  const renderMaterialsTab = () => (
    <>
      {/* Search and Upload Section */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          {materialTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showUploadForm ? <X size={20} /> : <Upload size={20} />}
          {showUploadForm ? "Cancel" : "Upload Material"}
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <GlassCard className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Upload size={20} />
            Upload Course Material
          </h3>

          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Material Title *
              </label>
              <input
                type="text"
                name="title"
                value={uploadForm.title}
                onChange={handleUploadChange}
                required
                placeholder="e.g., Database Normalization Notes"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Material Type *
              </label>
              <select
                name="type"
                value={uploadForm.type}
                onChange={handleUploadChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {materialTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Upload File *
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                  <Upload size={16} />
                  Choose File
                  <input
                    type="file"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.zip"
                  />
                </label>
                {uploadForm.file && (
                  <span className="text-sm text-gray-600">
                    {uploadForm.file.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: PDF, DOC, PPT, MP4, ZIP (Max 100MB)
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Upload size={16} />
                Upload Material
              </button>
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Materials Grid */}
      <div className="grid gap-4">
        {filteredMaterials.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">
              {searchQuery || filterType !== "all" 
                ? "No materials found matching your filters."
                : "No materials uploaded yet. Upload your first course material to get started."}
            </p>
          </GlassCard>
        ) : (
          filteredMaterials.map((material) => {
            const typeInfo = getMaterialTypeInfo(material.type);
            const Icon = typeInfo.icon;

            return (
              <GlassCard key={material.id} className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon size={24} className="text-blue-600" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{material.title}</h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <StatusBadge variant="default">
                          {typeInfo.label}
                        </StatusBadge>
                        <span>{material.file_size}</span>
                        <span>📅 {material.upload_date}</span>
                        <span className="flex items-center gap-1">
                          <Download size={14} />
                          {material.downloads} downloads
                        </span>
                      </div>

                      <p className="text-sm text-gray-600">
                        File: {material.file_url}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                      title="Download"
                    >
                      <Download size={18} />
                    </button>
                    <button
                      className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteMaterial(material.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </GlassCard>
            );
          })
        )}
      </div>
    </>
  );

  const renderStudentsTab = () => (
    <>
      {/* Students Stats */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Enrolled</p>
              <p className="text-3xl font-bold">{courseStudents.length}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Good Attendance (&gt;85%)</p>
              <p className="text-3xl font-bold text-green-600">
                {courseStudents.filter(s => s.attendance >= 85).length}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Bell size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Low Attendance (&lt;75%)</p>
              <p className="text-3xl font-bold text-red-600">
                {courseStudents.filter(s => s.attendance < 75).length}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Students Table */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users size={20} />
          Enrolled Students
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Roll No</th>
                <th className="text-left py-3 px-4">Student Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-center py-3 px-4">Attendance</th>
                <th className="text-center py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courseStudents
                .sort((a, b) => b.attendance - a.attendance)
                .map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{student.rollNo}</td>
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4 text-gray-600">{student.email}</td>
                    <td className="py-3 px-4 text-center">
                      <StatusBadge variant={getAttendanceVariant(student.attendance)}>
                        {student.attendance}%
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="text-blue-600 hover:underline">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </>
  );

  const renderSyllabusTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Course Syllabus</h3>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus size={16} />
          Add Unit
        </button>
      </div>

      {courseSyllabus.map((unit) => (
        <GlassCard key={unit.id} className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-blue-600">{unit.unit}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{unit.title}</h4>
                  <StatusBadge variant={getSyllabusStatusColor(unit.status)}>
                    {unit.status === "completed" && "Completed"}
                    {unit.status === "in_progress" && "In Progress"}
                    {unit.status === "pending" && "Pending"}
                  </StatusBadge>
                </div>
              </div>

              <div className="ml-13 mt-3">
                <p className="text-sm text-gray-600 mb-2">Topics Covered:</p>
                <ul className="list-disc list-inside space-y-1">
                  {unit.topics.map((topic, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                <Edit2 size={18} />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );

  const renderAnnouncementsTab = () => (
    <GlassCard className="p-8 text-center">
      <Bell size={48} className="mx-auto mb-4 text-gray-400" />
      <p className="text-gray-500 mb-4">
        Manage announcements for {selectedCourse.name}
      </p>
      <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mx-auto">
        <Plus size={16} />
        Create Announcement
      </button>
    </GlassCard>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "materials": return renderMaterialsTab();
      case "students": return renderStudentsTab();
      case "syllabus": return renderSyllabusTab();
      case "announcements": return renderAnnouncementsTab();
      default: return null;
    }
  };

  return (
    <AppLayout>
      <h1 className="text-3xl font-serif mb-6">My Courses</h1>

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
      <GlassCard className="p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{selectedCourse.name}</h2>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span>📚 Course Code: {selectedCourse.id}</span>
              <span>🗓️ {selectedCourse.semester}</span>
              <span>⭐ {selectedCourse.credits} Credits</span>
              <span className="flex items-center gap-1">
                <Users size={14} />
                {selectedCourse.enrolledStudents} Students
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Course Progress</p>
            <div className="flex items-center gap-3">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all"
                  style={{ width: `${selectedCourse.progress}%` }}
                />
              </div>
              <span className="font-semibold text-blue-600">
                {selectedCourse.progress}%
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
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
