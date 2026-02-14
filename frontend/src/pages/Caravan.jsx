import AppLayout from "../components/AppLayout";
import GlassCard from "../components/GlassCard";
import GlassButton from "../components/GlassButton";
import StatusBadge from "../components/StatusBadge";
import { Car, MapPin, Clock, Users, Plus } from "lucide-react";

const rides = [
  { from: "Campus Gate", to: "Railway Station", time: "5:30 PM", seats: 2, driver: "Arjun", date: "Today" },
  { from: "Hostel Block A", to: "City Mall", time: "6:00 PM", seats: 3, driver: "Priya", date: "Tomorrow" },
];

const Caravan = () => (
  <AppLayout>
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-blue-700">
          Caravan Ride-Share
        </h1>
        <p className="text-sm text-gray-500">
          Share rides with fellow campus commuters
        </p>
      </div>
      <GlassButton>
        <Plus className="h-4 w-4" /> Offer Ride
      </GlassButton>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
      {rides.map((r, i) => (
        <GlassCard key={i} hover>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">{r.driver}</span>
            </div>
            <StatusBadge variant="info">{r.date}</StatusBadge>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-3.5 w-3.5 text-blue-600" />
            <span>{r.from}</span>
            <span className="text-gray-400">→</span>
            <span>{r.to}</span>
          </div>

          <div className="mt-3 flex justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {r.time}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" /> {r.seats} seats left
            </span>
          </div>

          <GlassButton size="sm" variant="secondary" className="mt-4 w-full">
            Request Seat
          </GlassButton>
        </GlassCard>
      ))}
    </div>
  </AppLayout>
);

export default Caravan;