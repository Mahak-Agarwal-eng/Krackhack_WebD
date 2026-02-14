import { useState } from "react";
import AppLayout from "../components/AppLayout";
import GlassCard from "../components/GlassCard";
import GlassButton from "../components/GlassButton";
import GlassInput from "../components/GlassInput";
import StatusBadge from "../components/StatusBadge";
import { AlertTriangle, MapPin, Clock, Siren } from "lucide-react";

const alerts = [
  { title: "Water outage — Block C", location: "Hostel Block C", time: "2 hours ago", severity: "High", status: "Active", reporter: "Maintenance" },
  { title: "Suspicious activity near parking", location: "Parking Lot A", time: "5 hours ago", severity: "Critical", status: "Active", reporter: "Security" },
];

const severityVariant = (s) => {
  if (s === "Critical") return "danger";
  if (s === "High") return "warning";
  return "default";
};

const SOS = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <AppLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">
            SOS Flare
          </h1>
          <p className="text-sm text-gray-500">
            Emergency alerts and safety notifications
          </p>
        </div>

        <GlassButton variant="danger" onClick={() => setShowForm(!showForm)}>
          <Siren className="h-4 w-4" /> Raise SOS
        </GlassButton>
      </div>

      {showForm && (
        <GlassCard className="mb-6">
          <h3 className="mb-4 text-sm font-semibold text-red-500">
            Emergency Alert
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassInput placeholder="Brief description" label="What happened?" id="sos-title" />
            <GlassInput placeholder="Your location" label="Location" id="sos-loc" />
          </div>
          <div className="mt-4 flex gap-2">
            <GlassButton size="sm" variant="danger">
              Send Alert
            </GlassButton>
            <GlassButton size="sm" variant="ghost" onClick={() => setShowForm(false)}>
              Cancel
            </GlassButton>
          </div>
        </GlassCard>
      )}

      <div className="space-y-3">
        {alerts.map((a, i) => (
          <GlassCard key={i} hover className="flex items-center gap-4">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{a.title}</h3>
                <StatusBadge variant={severityVariant(a.severity)}>
                  {a.severity}
                </StatusBadge>
                <StatusBadge variant={a.status === "Active" ? "danger" : "success"}>
                  {a.status}
                </StatusBadge>
              </div>
              <div className="mt-1 flex gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {a.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {a.time}
                </span>
                <span>by {a.reporter}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </AppLayout>
  );
};

export default SOS;