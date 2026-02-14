import AppLayout from "../components/AppLayout";
import GlassCard from "../components/GlassCard";
import GlassButton from "../components/GlassButton";
import StatusBadge from "../components/StatusBadge";
import { MapPin, Calendar, Plus } from "lucide-react";

const items = [
  { title: "AirPods Pro", location: "Library 2nd Floor", date: "Feb 12", type: "Lost", status: "Unclaimed", desc: "White case, left near charging station" },
  { title: "Blue Backpack", location: "Canteen", date: "Feb 11", type: "Found", status: "Claimed", desc: "JanSport bag with CS textbooks inside" },
];

const LostFound = () => (
  <AppLayout>
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-blue-700">
          Lost & Found
        </h1>
        <p className="text-sm text-gray-500">
          Report or reclaim lost items on campus
        </p>
      </div>
      <GlassButton>
        <Plus className="h-4 w-4" /> Report Item
      </GlassButton>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <GlassCard key={i} hover>
          <div className="mb-3 flex items-center justify-between">
            <StatusBadge variant={item.type === "Lost" ? "danger" : "success"}>
              {item.type}
            </StatusBadge>
            <StatusBadge variant={item.status === "Claimed" ? "default" : "warning"}>
              {item.status}
            </StatusBadge>
          </div>

          <h3 className="font-semibold">{item.title}</h3>
          <p className="mt-1 text-xs text-gray-500">{item.desc}</p>

          <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {item.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {item.date}
            </span>
          </div>

          {item.status === "Unclaimed" && (
            <GlassButton size="sm" variant="secondary" className="mt-4 w-full">
              Claim Item
            </GlassButton>
          )}
        </GlassCard>
      ))}
    </div>
  </AppLayout>
);

export default LostFound;