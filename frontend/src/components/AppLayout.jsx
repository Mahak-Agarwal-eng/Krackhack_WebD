import { Link } from "react-router-dom";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      
      {/* Top Navbar */}
      <nav className="bg-white border-b border-blue-100 shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          AEGIS
        </h1>

        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link to="/dashboard" className="hover:text-blue-600 transition">
            Dashboard
          </Link>
          <Link to="/academics" className="hover:text-blue-600 transition">
            Academics
          </Link>
          <Link to="/grievances" className="hover:text-blue-600 transition">
            Grievances
          </Link>
          <Link to="/opportunities" className="hover:text-blue-600 transition">
            Opportunities
          </Link>
          <Link to="/caravan" className="hover:text-blue-600 transition">
            Caravan
          </Link>
          <Link to="/lost-found" className="hover:text-blue-600 transition">
            Lost & Found
          </Link>
          <Link to="/sos" className="hover:text-blue-600 transition">
            SOS
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
};

export default AppLayout;