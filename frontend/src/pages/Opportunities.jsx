import AppLayout from "../components/AppLayout";
import GlassCard from "../components/GlassCard";
import GlassButton from "../components/GlassButton";
import StatusBadge from "../components/StatusBadge";
import { Briefcase, MapPin, Clock, ExternalLink } from "lucide-react";

const opportunities = [
  { title: "SWE Intern", company: "Google", location: "Bangalore", type: "Internship", deadline: "Mar 1", stipend: "₹80k/mo", tags: ["Python", "ML"] },
  { title: "Frontend Dev", company: "Razorpay", location: "Remote", type: "Internship", deadline: "Feb 28", stipend: "₹40k/mo", tags: ["React"] },
];

const typeVariant = (t) => {
  if (t === "Internship") return "info";
  if (t === "Full-time") return "success";
  if (t === "Gig") return "warning";
  return "default";
};

const Opportunities = () => (
  <AppLayout>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-blue-700">
        Opportunity Board
      </h1>
      <p className="text-sm text-gray-500">
        Internships, gigs, and career opportunities
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((o, i) => (
        <GlassCard key={i} hover className="flex flex-col">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Briefcase className="h-5 w-5 text-blue-600" />
            </div>
            <StatusBadge variant={typeVariant(o.type)}>
              {o.type}
            </StatusBadge>
          </div>

          <h3 className="font-semibold">{o.title}</h3>
          <p className="text-sm text-gray-500">{o.company}</p>

          <div className="mt-auto border-t border-blue-100 pt-3 mt-4 text-xs text-gray-500 flex justify-between">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {o.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {o.deadline}
            </span>
          </div>

          <div className="mt-3 flex justify-between items-center">
            <span className="text-sm font-semibold text-blue-600">
              {o.stipend}
            </span>
            <GlassButton size="sm" variant="secondary">
              Apply <ExternalLink className="h-3 w-3" />
            </GlassButton>
          </div>
        </GlassCard>
      ))}
    </div>
  </AppLayout>
);

export default Opportunities;