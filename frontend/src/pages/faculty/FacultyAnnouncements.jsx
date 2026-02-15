import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { 
  Bell, 
  Plus, 
  Edit2, 
  Trash2, 
  Upload, 
  Calendar, 
  Filter,
  X,
  Send,
  Clock
} from "lucide-react";

// Mock faculty courses data
const facultyCoursesData = [
  { id: "CS301", name: "Database Management Systems" },
  { id: "CS302", name: "Operating Systems" },
  { id: "CS303", name: "Computer Networks" },
];

// Mock announcements data
const initialAnnouncements = [
  {
    id: 1,
    course_id: "CS301",
    courseName: "Database Management Systems",
    title: "Assignment 2 Released",
    message: "The second assignment on database normalization has been released. Please check the course materials section for details. Submission deadline is March 15th.",
    priority: "important",
    attachment_url: null,
    created_at: "2024-03-05",
    scheduled_for: null,
  },
  {
    id: 2,
    course_id: "CS302",
    courseName: "Operating Systems",
    title: "Quiz on Friday",
    message: "There will be a quiz on process scheduling this Friday. Topics include FCFS, SJF, and Round Robin algorithms.",
    priority: "urgent",
    attachment_url: null,
    created_at: "2024-03-06",
    scheduled_for: null,
  },
  {
    id: 3,
    course_id: "CS301",
    courseName: "Database Management Systems",
    title: "Office Hours Update",
    message: "Office hours have been rescheduled to Tuesday and Thursday 2-4 PM.",
    priority: "normal",
    attachment_url: null,
    created_at: "2024-03-04",
    scheduled_for: null,
  },
];

const priorityOptions = [
  { value: "normal", label: "Normal", variant: "default" },
  { value: "important", label: "Important", variant: "warning" },
  { value: "urgent", label: "Urgent", variant: "error" },
];

export default function FacultyAnnouncements() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Filters
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  
  // Form state
  const [formData, setFormData] = useState({
    course_id: "",
    title: "",
    message: "",
    priority: "normal",
    attachment: null,
    scheduleDate: "",
    scheduleTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const courseName = facultyCoursesData.find(
      c => c.id === formData.course_id
    )?.name || "";

    const scheduledFor = formData.scheduleDate && formData.scheduleTime
      ? `${formData.scheduleDate} ${formData.scheduleTime}`
      : null;

    if (editingId) {
      // Update existing announcement
      setAnnouncements(announcements.map(ann => 
        ann.id === editingId 
          ? {
              ...ann,
              course_id: formData.course_id,
              courseName,
              title: formData.title,
              message: formData.message,
              priority: formData.priority,
              attachment_url: formData.attachment?.name || ann.attachment_url,
              scheduled_for: scheduledFor,
            }
          : ann
      ));
      setEditingId(null);
    } else {
      // Create new announcement
      const newAnnouncement = {
        id: announcements.length + 1,
        course_id: formData.course_id,
        courseName,
        title: formData.title,
        message: formData.message,
        priority: formData.priority,
        attachment_url: formData.attachment?.name || null,
        created_at: new Date().toISOString().split('T')[0],
        scheduled_for: scheduledFor,
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    }

    // Reset form
    setFormData({
      course_id: "",
      title: "",
      message: "",
      priority: "normal",
      attachment: null,
      scheduleDate: "",
      scheduleTime: "",
    });
    setShowCreateForm(false);
  };

  const handleEdit = (announcement) => {
    setFormData({
      course_id: announcement.course_id,
      title: announcement.title,
      message: announcement.message,
      priority: announcement.priority,
      attachment: null,
      scheduleDate: announcement.scheduled_for?.split(' ')[0] || "",
      scheduleTime: announcement.scheduled_for?.split(' ')[1] || "",
    });
    setEditingId(announcement.id);
    setShowCreateForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter(ann => ann.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({
      course_id: "",
      title: "",
      message: "",
      priority: "normal",
      attachment: null,
      scheduleDate: "",
      scheduleTime: "",
    });
    setEditingId(null);
    setShowCreateForm(false);
  };

  // Filter announcements
  const filteredAnnouncements = announcements.filter(ann => {
    const courseMatch = filterCourse === "all" || ann.course_id === filterCourse;
    const priorityMatch = filterPriority === "all" || ann.priority === filterPriority;
    return courseMatch && priorityMatch;
  });

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case "urgent": return "error";
      case "important": return "warning";
      default: return "default";
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif">Course Announcements</h1>
        
        {!showCreateForm && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            New Announcement
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <GlassCard className="p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Bell size={20} />
              {editingId ? "Edit Announcement" : "Create New Announcement"}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Course *
              </label>
              <select
                name="course_id"
                value={formData.course_id}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a course...</option>
                {facultyCoursesData.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.id} - {course.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="e.g., Assignment 2 Released"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="5"
                placeholder="Enter your announcement message..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Priority Level *
              </label>
              <div className="flex gap-3">
                {priorityOptions.map(option => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={option.value}
                      checked={formData.priority === option.value}
                      onChange={handleInputChange}
                      className="cursor-pointer"
                    />
                    <StatusBadge variant={option.variant}>
                      {option.label}
                    </StatusBadge>
                  </label>
                ))}
              </div>
            </div>

            {/* Attachment */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Attachment (Optional)
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                  <Upload size={16} />
                  Choose File
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
                {formData.attachment && (
                  <span className="text-sm text-gray-600">
                    {formData.attachment.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: PDF, DOC, DOCX, JPG, PNG
              </p>
            </div>

            {/* Schedule */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Clock size={16} />
                Schedule for Later (Optional)
              </label>
              <div className="flex gap-3">
                <input
                  type="date"
                  name="scheduleDate"
                  value={formData.scheduleDate}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="time"
                  name="scheduleTime"
                  value={formData.scheduleTime}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to publish immediately
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Send size={16} />
                {editingId ? "Update Announcement" : "Publish Announcement"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Filters */}
      <GlassCard className="p-4 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={16} />
            <span className="font-medium">Filters:</span>
          </div>

          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Courses</option>
            {facultyCoursesData.map(course => (
              <option key={course.id} value={course.id}>
                {course.id} - {course.name}
              </option>
            ))}
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {(filterCourse !== "all" || filterPriority !== "all") && (
            <button
              onClick={() => {
                setFilterCourse("all");
                setFilterPriority("all");
              }}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>
      </GlassCard>

      {/* Announcements List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          All Announcements ({filteredAnnouncements.length})
        </h2>

        {filteredAnnouncements.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <Bell size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">
              No announcements found. Create your first announcement to get started.
            </p>
          </GlassCard>
        ) : (
          filteredAnnouncements.map(announcement => (
            <GlassCard key={announcement.id} className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">
                      {announcement.title}
                    </h3>
                    <StatusBadge variant={getPriorityVariant(announcement.priority)}>
                      {announcement.priority}
                    </StatusBadge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="font-medium text-blue-600">
                      {announcement.courseName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {announcement.created_at}
                    </span>
                    {announcement.scheduled_for && (
                      <span className="flex items-center gap-1 text-orange-600">
                        <Clock size={14} />
                        Scheduled: {announcement.scheduled_for}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 mb-3">
                    {announcement.message}
                  </p>

                  {announcement.attachment_url && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Upload size={14} />
                      <span>Attachment: {announcement.attachment_url}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </AppLayout>
  );
}