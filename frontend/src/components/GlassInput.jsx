const GlassInput = ({ label, id, ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-600">
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className="mt-2 w-full rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default GlassInput;