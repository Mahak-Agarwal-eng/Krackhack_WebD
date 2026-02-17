import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import { 
  Calendar as CalendarIcon,
  Plus,
  Edit2,
  Trash2,
  X,
  Clock,
  BookOpen,
  FileText,
  AlertCircle,
  GraduationCap,
  Video,
  List,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";

// Mock faculty courses data
const facultyCoursesData = [
  { id: "CS301", name: "Database Management Systems" },
  { id: "CS302", name: "Operating Systems" },
  { id: "CS303", name: "Computer Networks" },
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


// Event types with colors
const eventTypes = [
  { value: "lecture", label: "Lecture", icon: Video, color: "bg-blue-500", textColor: "text-blue-700", bgLight: "bg-blue-50" },
  { value: "assignment", label: "Assignment Deadline", icon: FileText, color: "bg-purple-500", textColor: "text-purple-700", bgLight: "bg-purple-50" },
  { value: "quiz", label: "Quiz", icon: BookOpen, color: "bg-orange-500", textColor: "text-orange-700", bgLight: "bg-orange-50" },
  { value: "exam", label: "Exam", icon: GraduationCap, color: "bg-red-500", textColor: "text-red-700", bgLight: "bg-red-50" },
  { value: "extra_class", label: "Extra Class", icon: Clock, color: "bg-green-500", textColor: "text-green-700", bgLight: "bg-green-50" },
  { value: "milestone", label: "Academic Milestone", icon: AlertCircle, color: "bg-yellow-500", textColor: "text-yellow-700", bgLight: "bg-yellow-50" },
];

// Mock events data
const initialEvents = [
  {
    id: 1,
    course_id: "CS301",
    courseName: "Database Management Systems",
    title: "Normalization Lecture",
    description: "Introduction to database normalization and normal forms",
    event_type: "lecture",
    start_date: "2024-03-15",
    start_time: "10:00",
    end_time: "11:30",
    location: "Room 301",
  },
  {
    id: 2,
    course_id: "CS301",
    courseName: "Database Management Systems",
    title: "Assignment 2 Submission",
    description: "Submit the SQL queries assignment",
    event_type: "assignment",
    start_date: "2024-03-20",
    start_time: "23:59",
    end_time: "23:59",
    location: "Online Portal",
  },
  {
    id: 3,
    course_id: "CS302",
    courseName: "Operating Systems",
    title: "Process Scheduling Quiz",
    description: "Quiz covering CPU scheduling algorithms",
    event_type: "quiz",
    start_date: "2024-03-18",
    start_time: "14:00",
    end_time: "15:00",
    location: "Room 205",
  },
  {
    id: 4,
    course_id: "CS301",
    courseName: "Database Management Systems",
    title: "Mid-Semester Examination",
    description: "Covers units 1-3",
    event_type: "exam",
    start_date: "2024-03-25",
    start_time: "09:00",
    end_time: "12:00",
    location: "Exam Hall A",
  },
  {
    id: 5,
    course_id: "CS303",
    courseName: "Computer Networks",
    title: "Extra Session on TCP/IP",
    description: "Additional class for doubt clearing",
    event_type: "extra_class",
    start_date: "2024-03-16",
    start_time: "16:00",
    end_time: "17:00",
    location: "Room 402",
  },
];

const views = [
  { id: "month", label: "Month View" },
  { id: "week", label: "Week View" },
  { id: "agenda", label: "Agenda View" },
];

export default function FacultyCalendar() {
  const [events, setEvents] = useState(initialEvents);
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Form state
  const [formData, setFormData] = useState({
    course_id: "",
    title: "",
    description: "",
    event_type: "lecture",
    start_date: "",
    start_time: "",
    end_time: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const courseName = facultyCoursesData.find(c => c.id === formData.course_id)?.name || "";

    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...formData, courseName }
          : event
      ));
    } else {
      const newEvent = {
        id: events.length + 1,
        ...formData,
        courseName,
      };
      setEvents([...events, newEvent]);
    }

    resetForm();
  };

  const handleEdit = (event) => {
    setFormData({
      course_id: event.course_id,
      title: event.title,
      description: event.description,
      event_type: event.event_type,
      start_date: event.start_date,
      start_time: event.start_time,
      end_time: event.end_time,
      location: event.location,
    });
    setEditingEvent(event);
    setShowEventForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      course_id: "",
      title: "",
      description: "",
      event_type: "lecture",
      start_date: "",
      start_time: "",
      end_time: "",
      location: "",
    });
    setEditingEvent(null);
    setShowEventForm(false);
  };

  // Filter events
  const filteredEvents = events.filter(event => {
    const courseMatch = filterCourse === "all" || event.course_id === filterCourse;
    const typeMatch = filterType === "all" || event.event_type === filterType;
    return courseMatch && typeMatch;
  });

  // Get event type info
  const getEventTypeInfo = (type) => {
    return eventTypes.find(t => t.value === type) || eventTypes[0];
  };

  // Calendar navigation
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  // Get days in month
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: null, isCurrentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: i, isCurrentMonth: true });
    }
    
    return days;
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return filteredEvents.filter(event => event.start_date === dateStr);
  };

  // Get week dates
  const getWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const formatMonthYear = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isToday = (date) => {
    const today = new Date();
    return date === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  return (
    <AppLayout navigation={<FacultyNav />}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif">Academic Calendar</h1>
        
        {!showEventForm && (
          <button
            onClick={() => setShowEventForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Add Event
          </button>
        )}
      </div>

      {/* Event Form Modal */}
      {showEventForm && (
        <GlassCard className="p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CalendarIcon size={20} />
              {editingEvent ? "Edit Event" : "Create New Event"}
            </h2>
            <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Course Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Course *
                </label>
                <select
                  name="course_id"
                  value={formData.course_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a course...</option>
                  {facultyCoursesData.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.id} - {course.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Event Type *
                </label>
                <select
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {eventTypes.map(type => (
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
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="e.g., Database Normalization Lecture"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Event details and additional information..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  End Time *
                </label>
                <input
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Room 301 or Online"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <CalendarIcon size={16} />
                {editingEvent ? "Update Event" : "Create Event"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* View Selector and Filters */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        {/* View Tabs */}
        <div className="flex gap-2">
          {views.map(view => (
            <button
              key={view.id}
              onClick={() => setCurrentView(view.id)}
              className={`px-4 py-2 rounded-lg transition ${
                currentView === view.id
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <Filter size={16} className="text-gray-600" />
          
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Courses</option>
            {facultyCoursesData.map(course => (
              <option key={course.id} value={course.id}>
                {course.id}
              </option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            {eventTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Calendar Navigation */}
      <GlassCard className="p-4 mb-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => currentView === "month" ? navigateMonth(-1) : navigateWeek(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h2 className="text-xl font-semibold">
            {currentView === "month" ? formatMonthYear() : `Week of ${getWeekDates()[0].toLocaleDateString()}`}
          </h2>
          
          <button
            onClick={() => currentView === "month" ? navigateMonth(1) : navigateWeek(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </GlassCard>

      {/* Month View */}
      {currentView === "month" && (
        <GlassCard className="p-6">
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day} className="text-center font-semibold text-gray-700 py-2">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {getDaysInMonth().map((day, index) => {
              const dayEvents = day.date ? getEventsForDate(day.date) : [];
              
              return (
                <div
                  key={index}
                  className={`min-h-24 border rounded-lg p-2 ${
                    !day.isCurrentMonth 
                      ? "bg-gray-50" 
                      : isToday(day.date)
                      ? "bg-blue-50 border-blue-500"
                      : "bg-white"
                  }`}
                >
                  {day.date && (
                    <>
                      <div className={`text-sm font-medium mb-1 ${
                        isToday(day.date) ? "text-blue-600" : "text-gray-700"
                      }`}>
                        {day.date}
                      </div>
                      
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => {
                          const typeInfo = getEventTypeInfo(event.event_type);
                          return (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded ${typeInfo.color} text-white truncate cursor-pointer hover:opacity-80`}
                              title={event.title}
                              onClick={() => handleEdit(event)}
                            >
                              {event.title}
                            </div>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}

      {/* Week View */}
      {currentView === "week" && (
        <GlassCard className="p-6">
          <div className="grid grid-cols-7 gap-4">
            {getWeekDates().map((date, index) => {
              const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
              const dayEvents = filteredEvents.filter(event => event.start_date === dateStr);
              const isCurrentDay = date.toDateString() === new Date().toDateString();
              
              return (
                <div key={index} className={`border rounded-lg p-3 ${isCurrentDay ? "bg-blue-50 border-blue-500" : "bg-white"}`}>
                  <div className="text-center mb-3">
                    <div className="text-xs text-gray-600">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className={`text-lg font-bold ${isCurrentDay ? "text-blue-600" : "text-gray-800"}`}>
                      {date.getDate()}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {dayEvents.map(event => {
                      const typeInfo = getEventTypeInfo(event.event_type);
                      const Icon = typeInfo.icon;
                      
                      return (
                        <div
                          key={event.id}
                          className={`p-2 rounded ${typeInfo.bgLight} border-l-4 ${typeInfo.color} cursor-pointer hover:shadow-md transition`}
                          onClick={() => handleEdit(event)}
                        >
                          <div className="flex items-start gap-2">
                            <Icon size={14} className={typeInfo.textColor} />
                            <div className="flex-1">
                              <div className={`text-xs font-medium ${typeInfo.textColor} truncate`}>
                                {event.title}
                              </div>
                              <div className="text-xs text-gray-600 mt-1">
                                {event.start_time}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}

      {/* Agenda View */}
      {currentView === "agenda" && (
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <GlassCard className="p-8 text-center">
              <List size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">
                No events scheduled. Create your first event to get started.
              </p>
            </GlassCard>
          ) : (
            filteredEvents
              .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
              .map(event => {
                const typeInfo = getEventTypeInfo(event.event_type);
                const Icon = typeInfo.icon;
                const eventDate = new Date(event.start_date);
                
                return (
                  <GlassCard key={event.id} className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Date Box */}
                      <div className="text-center bg-blue-50 rounded-lg p-3 min-w-16">
                        <div className="text-xs text-blue-600 font-medium">
                          {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          {eventDate.getDate()}
                        </div>
                        <div className="text-xs text-gray-600">
                          {eventDate.toLocaleDateString('en-US', { year: 'numeric' })}
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${typeInfo.bgLight} ${typeInfo.textColor}`}>
                                <Icon size={12} />
                                {typeInfo.label}
                              </span>
                              <span className="text-sm text-blue-600 font-medium">
                                {event.courseName}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(event)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(event.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        {event.description && (
                          <p className="text-gray-700 mb-3">{event.description}</p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {event.start_time} - {event.end_time}
                          </span>
                          {event.location && (
                            <span>📍 {event.location}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                );
              })
          )}
        </div>
      )}

      {/* Legend */}
      <GlassCard className="p-5 mt-6">
        <h3 className="font-semibold mb-3">Event Types</h3>
        <div className="flex flex-wrap gap-3">
          {eventTypes.map(type => {
            const Icon = type.icon;
            return (
              <div key={type.value} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${type.color}`}></div>
                <Icon size={14} className={type.textColor} />
                <span className="text-sm">{type.label}</span>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </AppLayout>
  );
}