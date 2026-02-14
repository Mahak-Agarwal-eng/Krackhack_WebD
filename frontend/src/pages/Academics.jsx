import AppLayout from "../components/AppLayout";
import GlassCard from "../components/GlassCard";
import StatusBadge from "../components/StatusBadge";
import { BookOpen, Clock, Award } from "lucide-react";

const courses = [
  { code: "CS301", name: "Data Structures & Algorithms", credits: 4, grade: "A", status: "Ongoing", instructor: "Dr. Sharma" },
  { code: "CS302", name: "Operating Systems", credits: 3, grade: "B+", status: "Ongoing", instructor: "Prof. Gupta" },
  { code: "MA201", name: "Linear Algebra", credits: 3, grade: "A-", status: "Completed", instructor: "Dr. Iyer" },
];

const totalCredits = courses.reduce((a, c) => a + c.credits, 0);
const completedCredits = courses
  .filter((c) => c.status === "Completed")
  .reduce((a, c) => a + c.credits, 0);

const Academics = () => (
  <AppLayout>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-blue-700">
        Academic Management
      </h1>
      <p className="text-sm text-gray-500">
        Courses, credits, and academic progress
      </p>
    </div>

    {/* Summary */}
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <GlassCard hover className="flex items-center gap-4">
        <BookOpen className="h-8 w-8 text-blue-600 opacity-70" />
        <div>
          <p className="text-2xl font-bold">{courses.length}</p>
          <p className="text-xs text-gray-500">Total Courses</p>
        </div>
      </GlassCard>

      <GlassCard hover className="flex items-center gap-4">
        <Clock className="h-8 w-8 text-amber-500 opacity-70" />
        <div>
          <p className="text-2xl font-bold">
            {completedCredits}/{totalCredits}
          </p>
          <p className="text-xs text-gray-500">Credits Earned</p>
        </div>
      </GlassCard>

      <GlassCard hover className="flex items-center gap-4">
        <Award className="h-8 w-8 text-emerald-500 opacity-70" />
        <div>
          <p className="text-2xl font-bold">3.72</p>
          <p className="text-xs text-gray-500">Current GPA</p>
        </div>
      </GlassCard>
    </div>

    {/* Course Grid */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((c) => (
        <GlassCard key={c.code} hover>
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs text-blue-600">
              {c.code}
            </span>
            <StatusBadge
              variant={c.status === "Ongoing" ? "info" : "success"}
            >
              {c.status}
            </StatusBadge>
          </div>

          <h3 className="mb-1 font-semibold">{c.name}</h3>
          <p className="text-xs text-gray-500">{c.instructor}</p>

          <div className="mt-4 flex items-center justify-between border-t border-blue-100 pt-3">
            <span className="text-xs text-gray-500">
              {c.credits} Credits
            </span>
            <span className="text-sm font-bold">{c.grade}</span>
          </div>
        </GlassCard>
      ))}
    </div>
  </AppLayout>
);

export default Academics;