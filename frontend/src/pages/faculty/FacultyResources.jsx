import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { 
  FolderOpen,
  Upload,
  FileText,
  Video,
  BookOpen,
  File,
  Edit2,
  Trash2,
  Download,
  Eye,
  Search,
  Filter,
  Plus,
  X,
  Save,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Folder,
  Tag,
  RefreshCw,
  BarChart3
} from "lucide-react";

// Mock courses data
const coursesData = [
  { id: "CS301", name: "Database Management Systems", semester: "Spring 2024" },
  { id: "CS302", name: "Operating Systems", semester: "Spring 2024" },
  { id: "CS303", name: "Computer Networks", semester: "Spring 2024" },
];

// Resource types with icons and colors
const resourceTypes = [
  { value: "lecture_notes", label: "Lecture Notes", icon: FileText, color: "bg-blue-500" },
  { value: "presentation", label: "Presentation", icon: Video, color: "bg-purple-500" },
  { value: "pyq", label: "Previous Year Questions", icon: FileText, color: "bg-orange-500" },
  { value: "assignment", label: "Assignment", icon: File, color: "bg-green-500" },
  { value: "reference", label: "Reference Material", icon: BookOpen, color: "bg-yellow-500" },
  { value: "syllabus", label: "Syllabus", icon: BookOpen, color: "bg-red-500" },
  { value: "lab", label: "Lab Material", icon: File, color: "bg-teal-500" },
  { value: "solution", label: "Solution", icon: CheckCircle, color: "bg-indigo-500" },
];

// Topics for organization
const topics = [
  "Introduction",
  "Data Structures",
  "Algorithms",
  "Database Design",
  "Normalization",
  "Transactions",
  "SQL",
  "NoSQL",
  "Indexing",
  "Query Optimization",
  "Process Management",
  "Memory Management",
  "File Systems",
  "Networking Basics",
  "TCP/IP",
  "Routing",
  "Security",
];

// Mock resources data
const initialResources = [
  {
    id: 1,
    course_id: "CS301",
    courseName: "Database Management Systems",
    title: "Introduction to DBMS - Unit 1",
    description: "Comprehensive notes covering database concepts, architecture, and data models",
    type: "lecture_notes",
    topic: "Introduction",
    file_name: "dbms_unit1_intro.pdf",
    file_size: "2.3 MB",
    upload_date: "2024-03-01",
    semester: "Spring 2024",
    views: 142,
    downloads: 98,
    tags: ["basics", "theory", "unit-1"],
  },
  {
    id: 2,
    course_id: "CS301",
    courseName: "Database Management Systems",
    title: "Normalization Presentation",
    description: "Slides explaining 1NF, 2NF, 3NF, and BCNF with examples",
    type: "presentation",
    topic: "Normalization",
    file_name: "normalization_slides.pptx",
    file_size: "4.1 MB",
    upload_date: "2024-03-05",
    semester: "Spring 2024",
    views: 128,
    downloads: 87,
    tags: ["normalization", "forms", "unit-2"],
  },
  {
    id: 3,
    course_id: "CS301",
    courseName: "Database Management Systems",
    title: "Mid-Semester PYQ 2023",
    description: "Previous year question paper with solutions",
    type: "pyq",
    topic: "Database Design",
    file_name: "midsem_2023_solved.pdf",
    file_size: "1.8 MB",
    upload_date: "2024-02-28",
    semester: "Spring 2024",
    views: 185,
    downloads: 152,
    tags: ["exam", "pyq", "solutions"],
  },
  {
    id: 4,
    course_id: "CS302",
    courseName: "Operating Systems",
    title: "Process Scheduling Algorithms",
    description: "Detailed notes on FCFS, SJF, Round Robin, and Priority Scheduling",
    type: "lecture_notes",
    topic: "Process Management",
    file_name: "scheduling_algorithms.pdf",
    file_size: "3.2 MB",
    upload_date: "2024-03-03",
    semester: "Spring 2024",
    views: 95,
    downloads: 68,
    tags: ["scheduling", "algorithms", "unit-3"],
  },
  {
    id: 5,
    course_id: "CS302",
    courseName: "Operating Systems",
    title: "Assignment 1: Process Synchronization",
    description: "Implement producer-consumer problem using semaphores",
    type: "assignment",
    topic: "Process Management",
    file_name: "assignment1_synchronization.pdf",
    file_size: "0.8 MB",
    upload_date: "2024-03-08",
    semester: "Spring 2024",
    views: 112,
    downloads: 89,
    tags: ["assignment", "synchronization", "coding"],
  },
];

const tabs = [
  { id: "all", label: "All Resources", icon: FolderOpen },
  { id: "upload", label: "Upload New", icon: Upload },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

export default function FacultyResources() {
  const [activeTab, setActiveTab] = useState("all");
  const [resources, setResources] = useState(initialResources);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    course_id: "",
    title: "",
    description: "",
    type: "lecture_notes",
    topic: "",
    file: null,
    tags: "",
  });

  const handleUploadChange = (e) => {
    const { name, value } = e.target;
    setUploadForm({ ...uploadForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setUploadForm({ ...uploadForm, file: e.target.files[0] });
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();

    const course = coursesData.find(c => c.id === uploadForm.course_id);
    
    const newResource = {
      id: Date.now(),
      course_id: uploadForm.course_id,
      courseName: course?.name || "",
      title: uploadForm.title,
      description: uploadForm.description,
      type: uploadForm.type,
      topic: uploadForm.topic,
      file_name: uploadForm.file?.name || "file.pdf",
      file_size: uploadForm.file ? `${(uploadForm.file.size / (1024 * 1024)).toFixed(2)} MB` : "0 MB",
      upload_date: new Date().toISOString().split('T')[0],
      semester: course?.semester || "Spring 2024",
      views: 0,
      downloads: 0,
      tags: uploadForm.tags.split(',').map(t => t.trim()).filter(t => t),
    };

    if (editingResource) {
      setResources(resources.map(r => r.id === editingResource.id ? { ...r, ...newResource, id: editingResource.id } : r));
      setEditingResource(null);
    } else {
      setResources([newResource, ...resources]);
    }

    setUploadForm({
      course_id: "",
      title: "",
      description: "",
      type: "lecture_notes",
      topic: "",
      file: null,
      tags: "",
    });
    setShowUploadForm(false);
  };

  const handleEdit = (resource) => {
    setUploadForm({
      course_id: resource.course_id,
      title: resource.title,
      description: resource.description,
      type: resource.type,
      topic: resource.topic,
      file: null,
      tags: resource.tags.join(', '),
    });
    setEditingResource(resource);
    setShowUploadForm(true);
    setActiveTab("upload");
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this resource? This action cannot be undone.")) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  const handleCancelUpload = () => {
    setUploadForm({
      course_id: "",
      title: "",
      description: "",
      type: "lecture_notes",
      topic: "",
      file: null,
      tags: "",
    });
    setEditingResource(null);
    setShowUploadForm(false);
  };

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesCourse = selectedCourse === "all" || resource.course_id === selectedCourse;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    const matchesTopic = selectedTopic === "all" || resource.topic === selectedTopic;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCourse && matchesType && matchesTopic && matchesSearch;
  });

  const getResourceTypeInfo = (type) => {
    return resourceTypes.find(t => t.value === type) || resourceTypes[0];
  };

  // Analytics calculations
  const getTotalViews = () => resources.reduce((sum, r) => sum + r.views, 0);
  const getTotalDownloads = () => resources.reduce((sum, r) => sum + r.downloads, 0);
  const getAverageEngagement = () => {
    const total = resources.reduce((sum, r) => sum + ((r.downloads / Math.max(r.views, 1)) * 100), 0);
    return resources.length > 0 ? (total / resources.length).toFixed(1) : 0;
  };

  const getMostAccessedResources = () => {
    return [...resources]
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 5);
  };

  const getResourcesByCourse = () => {
    const counts = {};
    coursesData.forEach(course => {
      counts[course.id] = resources.filter(r => r.course_id === course.id).length;
    });
    return counts;
  };

  const getResourcesByType = () => {
    const counts = {};
    resourceTypes.forEach(type => {
      counts[type.value] = resources.filter(r => r.type === type.value).length;
    });
    return counts;
  };

  const renderAllResourcesTab = () => (
    <>
      {/* Filters */}
      <GlassCard className="p-5 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <span className="font-medium">Filters:</span>
          </div>

          {/* Search */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Course Filter */}
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Courses</option>
            {coursesData.map(course => (
              <option key={course.id} value={course.id}>
                {course.id} - {course.name}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            {resourceTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {/* Topic Filter */}
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Topics</option>
            {topics.map(topic => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>

          {(selectedCourse !== "all" || selectedType !== "all" || selectedTopic !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCourse("all");
                setSelectedType("all");
                setSelectedTopic("all");
                setSearchQuery("");
              }}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>
      </GlassCard>

      {/* Resources Grid */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredResources.length} of {resources.length} resources
        </p>
        <button
          onClick={() => {
            setShowUploadForm(true);
            setActiveTab("upload");
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Upload Resource
        </button>
      </div>

      {filteredResources.length === 0 ? (
        <GlassCard className="p-8 text-center">
          <FolderOpen size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">
            {searchQuery || selectedCourse !== "all" || selectedType !== "all" || selectedTopic !== "all"
              ? "No resources found matching your filters."
              : "No resources uploaded yet. Upload your first resource to get started."}
          </p>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {filteredResources.map((resource) => {
            const typeInfo = getResourceTypeInfo(resource.type);
            const Icon = typeInfo.icon;
            const engagementRate = resource.views > 0 ? ((resource.downloads / resource.views) * 100).toFixed(1) : 0;

            return (
              <GlassCard key={resource.id} className="p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 ${typeInfo.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon size={28} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{resource.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="font-medium text-blue-600">{resource.courseName}</span>
                          <span className="flex items-center gap-1">
                            <Folder size={14} />
                            {resource.topic}
                          </span>
                          <StatusBadge variant="default">
                            {typeInfo.label}
                          </StatusBadge>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>📄 {resource.file_name}</span>
                          <span>💾 {resource.file_size}</span>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {resource.upload_date}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          title="View"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          title="Download"
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(resource)}
                          title="Edit"
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id)}
                          title="Delete"
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    {resource.tags.length > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <Tag size={14} className="text-gray-400" />
                        <div className="flex flex-wrap gap-2">
                          {resource.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Eye size={16} className="text-gray-400" />
                        <span className="text-gray-600">{resource.views} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download size={16} className="text-gray-400" />
                        <span className="text-gray-600">{resource.downloads} downloads</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-gray-400" />
                        <span className="text-gray-600">{engagementRate}% engagement</span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </>
  );

  const renderUploadTab = () => (
    <GlassCard className="p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Upload size={24} />
        {editingResource ? "Edit Resource" : "Upload New Resource"}
      </h3>

      <form onSubmit={handleUploadSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Course Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Course *
            </label>
            <select
              name="course_id"
              value={uploadForm.course_id}
              onChange={handleUploadChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a course...</option>
              {coursesData.map(course => (
                <option key={course.id} value={course.id}>
                  {course.id} - {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Resource Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Resource Type *
            </label>
            <select
              name="type"
              value={uploadForm.type}
              onChange={handleUploadChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {resourceTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Resource Title *
          </label>
          <input
            type="text"
            name="title"
            value={uploadForm.title}
            onChange={handleUploadChange}
            required
            placeholder="e.g., Introduction to Database Systems - Unit 1"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={uploadForm.description}
            onChange={handleUploadChange}
            required
            rows="3"
            placeholder="Provide a detailed description of the resource..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Topic */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Topic *
          </label>
          <select
            name="topic"
            value={uploadForm.topic}
            onChange={handleUploadChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a topic...</option>
            {topics.map(topic => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Tags (Optional)
          </label>
          <input
            type="text"
            name="tags"
            value={uploadForm.tags}
            onChange={handleUploadChange}
            placeholder="e.g., basics, theory, unit-1 (comma separated)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Add tags separated by commas to make resources easier to find
          </p>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {editingResource ? "Replace File (Optional)" : "Upload File *"}
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
            <Upload size={40} className="mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">
              {uploadForm.file ? uploadForm.file.name : "Drop your file here or click to browse"}
            </p>
            <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
              <Upload size={16} />
              Choose File
              <input
                type="file"
                onChange={handleFileChange}
                required={!editingResource}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.mp4"
              />
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: PDF, DOC, PPT, ZIP, MP4 (Max 100MB)
            </p>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {editingResource ? (
              <>
                <Save size={20} />
                Update Resource
              </>
            ) : (
              <>
                <Upload size={20} />
                Upload Resource
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleCancelUpload}
            className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </GlassCard>
  );

  const renderAnalyticsTab = () => {
    const resourcesByCourse = getResourcesByCourse();
    const resourcesByType = getResourcesByType();
    const mostAccessed = getMostAccessedResources();

    return (
      <>
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FolderOpen size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Resources</p>
                <p className="text-3xl font-bold">{resources.length}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Eye size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-3xl font-bold">{getTotalViews()}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Download size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Downloads</p>
                <p className="text-3xl font-bold">{getTotalDownloads()}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <TrendingUp size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Engagement</p>
                <p className="text-3xl font-bold">{getAverageEngagement()}%</p>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Resources by Course */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen size={20} />
              Resources by Course
            </h3>

            <div className="space-y-3">
              {coursesData.map((course) => {
                const count = resourcesByCourse[course.id];
                const percentage = resources.length > 0 ? (count / resources.length * 100).toFixed(1) : 0;

                return (
                  <div key={course.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{course.name}</span>
                      <span className="text-sm text-gray-600">{count} resources</span>
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

          {/* Resources by Type */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 size={20} />
              Resources by Type
            </h3>

            <div className="space-y-3">
              {resourceTypes.slice(0, 6).map((type) => {
                const count = resourcesByType[type.value];
                const percentage = resources.length > 0 ? (count / resources.length * 100).toFixed(1) : 0;

                return (
                  <div key={type.value}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{type.label}</span>
                      <span className="text-sm text-gray-600">{count} resources</span>
                    </div>
                    <div className="w-full h-6 bg-gray-200 rounded-lg overflow-hidden">
                      <div
                        className={`h-full ${type.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Most Accessed Resources */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            Most Accessed Resources
          </h3>

          <div className="space-y-3">
            {mostAccessed.map((resource, index) => {
              const typeInfo = getResourceTypeInfo(resource.type);
              const Icon = typeInfo.icon;

              return (
                <div key={resource.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-yellow-600">#{index + 1}</span>
                  </div>

                  <div className={`w-10 h-10 ${typeInfo.color} rounded-lg flex items-center justify-center`}>
                    <Icon size={20} className="text-white" />
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold">{resource.title}</p>
                    <p className="text-xs text-gray-600">{resource.courseName}</p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        <Eye size={14} className="inline mr-1" />
                        {resource.views}
                      </span>
                      <span className="text-gray-600">
                        <Download size={14} className="inline mr-1" />
                        {resource.downloads}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "all": return renderAllResourcesTab();
      case "upload": return renderUploadTab();
      case "analytics": return renderAnalyticsTab();
      default: return null;
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif">Academic Resources</h1>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            <Download size={20} />
            Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== "upload") {
                  setShowUploadForm(false);
                  setEditingResource(null);
                }
              }}
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