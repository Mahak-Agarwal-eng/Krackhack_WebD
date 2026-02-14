const GlassCard = ({ children, className = "", hover }) => {
  return (
    <div
      className={`rounded-2xl border border-blue-100 bg-white/80 backdrop-blur-md p-5 shadow-sm transition ${
        hover ? "hover:shadow-md hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;