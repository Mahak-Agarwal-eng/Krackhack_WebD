import { useState } from "react";
import AppLayout from "../components/AppLayout";
import GlassCard from "../components/GlassCard";
import GlassInput from "../components/GlassInput";
import GlassButton from "../components/GlassButton";
import StatusBadge from "../components/StatusBadge";
import { Plus, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const mockGrievances = [
  { id: "GRV-101", title: "Library AC not working", category: "Infrastructure", status: "In Progress", date: "Feb 10", priority: "High" },
  { id: "GRV-102", title: "Hostel WiFi downtime", category: "IT", status: "Open", date: "Feb 9", priority: "Critical" },
  { id: "GRV-103", title: "Canteen hygiene complaint", category: "Facilities", status: "Resolved", date: "Feb 7", priority: "Medium" },
];

const statusVariant = (s) => {
  if (s === "Resolved") return "success";
  if (s === "In Progress") return "warning";
  return "info";
};

const priorityVariant = (p) => {
  if (p === "Critical") return "danger";
  if (p === "High") return "warning";
  return "default";
};

const Grievances = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <AppLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Grievance Tracker</h1>
          <p className="text-sm text-gray-500">
            Submit and track issues from submission to resolution
          </p>
        </div>
        <GlassButton onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" /> New Grievance
        </GlassButton>
      </div>

      {showForm && (
        <GlassCard className="mb-6">
          <h3 className="mb-4 text-sm font-semibold text-blue-600">
            Submit a Grievance
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassInput placeholder="Title" label="Title" id="g-title" />
            <GlassInput placeholder="Category" label="Category" id="g-cat" />
          </div>
          <div className="mt-4 flex gap-2">
            <GlassButton size="sm">Submit</GlassButton>
            <GlassButton size="sm" variant="ghost" onClick={() => setShowForm(false)}>Cancel</GlassButton>
          </div>
        </GlassCard>
      )}

      <div className="space-y-3">
        {mockGrievances.map((g) => (
          <GlassCard key={g.id} hover>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{g.title}</p>
                <p className="text-xs text-gray-500">{g.category}</p>
              </div>
              <StatusBadge variant={statusVariant(g.status)}>
                {g.status}
              </StatusBadge>
            </div>
          </GlassCard>
        ))}
      </div>
    </AppLayout>
  );
};

export default Grievances;