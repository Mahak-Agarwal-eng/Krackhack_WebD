const StatusBadge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    info: "bg-blue-100 text-blue-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-md px-2 py-1 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

export default StatusBadge;