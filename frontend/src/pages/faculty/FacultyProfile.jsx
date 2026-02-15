import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  BookOpen,
  Award,
  FileText,
  Edit2,
  Save,
  X,
  Camera,
  Lock,
  Eye,
  EyeOff,
  Building,
  GraduationCap,
  Users,
  CheckCircle
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


// Mock faculty profile data
const initialProfileData = {
  id: "FAC001",
  name: "Dr. Rajesh Kumar Sharma",
  email: "rajesh.sharma@university.edu",
  phone: "+91 98765 43210",
  employeeId: "EMP2019001",
  designation: "Associate Professor",
  department: "Computer Science & Engineering",
  officeLocation: "Block A, Room 301",
  joiningDate: "2019-08-15",
  profilePhoto: null,
  
  officeHours: [
    { day: "Monday", time: "2:00 PM - 4:00 PM" },
    { day: "Wednesday", time: "3:00 PM - 5:00 PM" },
    { day: "Friday", time: "11:00 AM - 1:00 PM" },
  ],

  qualifications: [
    { degree: "Ph.D. in Computer Science", institution: "IIT Delhi", year: "2018" },
    { degree: "M.Tech in Computer Science", institution: "NIT Trichy", year: "2013" },
    { degree: "B.Tech in Computer Engineering", institution: "Delhi University", year: "2011" },
  ],

  researchInterests: [
    "Machine Learning",
    "Natural Language Processing",
    "Data Mining",
    "Artificial Intelligence",
    "Deep Learning",
  ],

  publications: [
    {
      title: "Advanced Machine Learning Techniques for Big Data Analytics",
      journal: "IEEE Transactions on Knowledge and Data Engineering",
      year: "2023",
      citation: "Sharma, R.K. et al. (2023)"
    },
    {
      title: "Natural Language Processing in Educational Systems",
      journal: "ACM Computing Surveys",
      year: "2022",
      citation: "Sharma, R.K., Patel, A. (2022)"
    },
    {
      title: "Deep Learning Approaches for Text Classification",
      journal: "Journal of Machine Learning Research",
      year: "2021",
      citation: "Sharma, R.K., Kumar, V. (2021)"
    },
  ],

  currentCourses: [
    { code: "CS301", name: "Database Management Systems", students: 45 },
    { code: "CS302", name: "Operating Systems", students: 38 },
    { code: "CS303", name: "Computer Networks", students: 42 },
  ],

  stats: {
    totalCourses: 3,
    totalStudents: 125,
    yearsOfService: 5,
    totalPublications: 15,
  },

  contactAvailability: {
    email: true,
    phone: true,
    officeHours: true,
    appointmentRequired: false,
  },
};

const tabs = [
  { id: "overview", label: "Overview", icon: User },
  { id: "academic", label: "Academic Info", icon: BookOpen },
  { id: "research", label: "Research & Publications", icon: FileText },
  { id: "settings", label: "Settings", icon: Lock },
];

export default function FacultyProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [profileData, setProfileData] = useState(initialProfileData);
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  const [editForm, setEditForm] = useState({
    name: profileData.name,
    email: profileData.email,
    phone: profileData.phone,
    officeLocation: profileData.officeLocation,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showCurrent: false,
    showNew: false,
    showConfirm: false,
  });

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSaveBasicInfo = () => {
    setProfileData({
      ...profileData,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      officeLocation: editForm.officeLocation,
    });
    setIsEditingBasic(false);
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      officeLocation: profileData.officeLocation,
    });
    setIsEditingBasic(false);
    setIsEditingContact(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    // In a real app, this would make an API call
    alert("Password changed successfully!");
    setShowPasswordModal(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      showCurrent: false,
      showNew: false,
      showConfirm: false,
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateYearsOfService = () => {
    const joiningDate = new Date(profileData.joiningDate);
    const currentDate = new Date();
    const years = currentDate.getFullYear() - joiningDate.getFullYear();
    return years;
  };

  const renderOverviewTab = () => (
    <>
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Profile Card */}
        <GlassCard className="p-6 col-span-1">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                {profileData.profilePhoto ? (
                  <img 
                    src={profileData.profilePhoto} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={64} className="text-white" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
                <Camera size={20} className="text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>

            <h2 className="text-xl font-bold mb-1">{profileData.name}</h2>
            <StatusBadge variant="default" className="mb-2">
              {profileData.designation}
            </StatusBadge>
            <p className="text-sm text-gray-600 mb-4">{profileData.department}</p>

            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-sm">
                <Briefcase size={16} className="text-gray-500" />
                <span className="text-gray-600">Employee ID:</span>
                <span className="font-medium">{profileData.employeeId}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-gray-600">Joined:</span>
                <span className="font-medium">
                  {new Date(profileData.joiningDate).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Stats Cards */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Courses</p>
                <p className="text-3xl font-bold">{profileData.stats.totalCourses}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-3xl font-bold">{profileData.stats.totalStudents}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Years of Service</p>
                <p className="text-3xl font-bold">{calculateYearsOfService()}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <FileText size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Publications</p>
                <p className="text-3xl font-bold">{profileData.stats.totalPublications}</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Contact Information */}
      <GlassCard className="p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Mail size={20} />
            Contact Information
          </h3>
          {!isEditingBasic && (
            <button
              onClick={() => setIsEditingBasic(true)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Edit2 size={16} />
              Edit
            </button>
          )}
        </div>

        {isEditingBasic ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Office Location</label>
                <input
                  type="text"
                  name="officeLocation"
                  value={editForm.officeLocation}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveBasicInfo}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Save size={16} />
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-medium">{profileData.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={20} className="text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="font-medium">{profileData.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Office Location</p>
                  <p className="font-medium">{profileData.officeLocation}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building size={20} className="text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium">{profileData.department}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Office Hours */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock size={20} />
          Office Hours
        </h3>

        <div className="space-y-3">
          {profileData.officeHours.map((schedule, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">{schedule.day}</span>
              <span className="text-gray-600">{schedule.time}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            📧 Students can contact via email anytime. Office visits are welcome during office hours. 
            {!profileData.contactAvailability.appointmentRequired 
              ? " No appointment required." 
              : " Please schedule an appointment."}
          </p>
        </div>
      </GlassCard>
    </>
  );

  const renderAcademicTab = () => (
    <>
      {/* Current Courses */}
      <GlassCard className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen size={20} />
          Current Courses (Spring 2024)
        </h3>

        <div className="space-y-3">
          {profileData.currentCourses.map((course) => (
            <div key={course.code} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">{course.code}</p>
                <p className="text-sm text-gray-600">{course.name}</p>
              </div>
              <div className="text-right">
                <StatusBadge variant="default">
                  <Users size={12} className="inline mr-1" />
                  {course.students} Students
                </StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Qualifications */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <GraduationCap size={20} />
          Academic Qualifications
        </h3>

        <div className="space-y-4">
          {profileData.qualifications.map((qual, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Award size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{qual.degree}</p>
                <p className="text-sm text-gray-600">{qual.institution}</p>
                <p className="text-xs text-gray-500 mt-1">Year: {qual.year}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </>
  );

  const renderResearchTab = () => (
    <>
      {/* Research Interests */}
      <GlassCard className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen size={20} />
          Research Interests
        </h3>

        <div className="flex flex-wrap gap-2">
          {profileData.researchInterests.map((interest, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </GlassCard>

      {/* Publications */}
      <GlassCard className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText size={20} />
            Selected Publications
          </h3>
          <StatusBadge variant="success">
            {profileData.stats.totalPublications} Total Publications
          </StatusBadge>
        </div>

        <div className="space-y-4">
          {profileData.publications.map((pub, index) => (
            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition">
              <p className="font-semibold mb-2">{pub.title}</p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Journal:</span> {pub.journal}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">{pub.citation}</p>
                <StatusBadge variant="default">{pub.year}</StatusBadge>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
          View All Publications →
        </button>
      </GlassCard>
    </>
  );

  const renderSettingsTab = () => (
    <>
      {/* Security Settings */}
      <GlassCard className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock size={20} />
          Security Settings
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-gray-600">Last changed 45 days ago</p>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Lock size={16} />
              Change Password
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition">
              Enable
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Contact Availability */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle size={20} />
          Contact Availability Preferences
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
            <span>Accept email queries from students</span>
            <input
              type="checkbox"
              checked={profileData.contactAvailability.email}
              onChange={() => setProfileData({
                ...profileData,
                contactAvailability: {
                  ...profileData.contactAvailability,
                  email: !profileData.contactAvailability.email
                }
              })}
              className="w-5 h-5 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
            <span>Accept phone calls from students</span>
            <input
              type="checkbox"
              checked={profileData.contactAvailability.phone}
              onChange={() => setProfileData({
                ...profileData,
                contactAvailability: {
                  ...profileData.contactAvailability,
                  phone: !profileData.contactAvailability.phone
                }
              })}
              className="w-5 h-5 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
            <span>Display office hours to students</span>
            <input
              type="checkbox"
              checked={profileData.contactAvailability.officeHours}
              onChange={() => setProfileData({
                ...profileData,
                contactAvailability: {
                  ...profileData.contactAvailability,
                  officeHours: !profileData.contactAvailability.officeHours
                }
              })}
              className="w-5 h-5 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
            <span>Require appointment for office visits</span>
            <input
              type="checkbox"
              checked={profileData.contactAvailability.appointmentRequired}
              onChange={() => setProfileData({
                ...profileData,
                contactAvailability: {
                  ...profileData.contactAvailability,
                  appointmentRequired: !profileData.contactAvailability.appointmentRequired
                }
              })}
              className="w-5 h-5 rounded"
            />
          </label>
        </div>
      </GlassCard>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <GlassCard className="p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Lock size={20} />
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={passwordForm.showCurrent ? "text" : "password"}
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordForm({ 
                      ...passwordForm, 
                      showCurrent: !passwordForm.showCurrent 
                    })}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {passwordForm.showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={passwordForm.showNew ? "text" : "password"}
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength="8"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordForm({ 
                      ...passwordForm, 
                      showNew: !passwordForm.showNew 
                    })}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {passwordForm.showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={passwordForm.showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordForm({ 
                      ...passwordForm, 
                      showConfirm: !passwordForm.showConfirm 
                    })}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {passwordForm.showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex-1"
                >
                  <CheckCircle size={16} />
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return renderOverviewTab();
      case "academic": return renderAcademicTab();
      case "research": return renderResearchTab();
      case "settings": return renderSettingsTab();
      default: return null;
    }
  };

  return (
    <AppLayout navigation={<FacultyNav />}>
      <h1 className="text-3xl font-serif mb-6">Faculty Profile</h1>

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