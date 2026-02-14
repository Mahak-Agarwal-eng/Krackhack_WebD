// // #frontend/src/components/auth/ProtectedRoute.jsx
// import { Navigate, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import API from '../../services/api';

// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const location = useLocation();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const verifyAuth = async () => {
//       // Check if token exists
//       const token = localStorage.getItem('access_token');
      
//       if (!token) {
//         setIsLoading(false);
//         return;
//       }

//       try {
//         // Verify token with backend
//         const response = await API.get('/auth/me');
//         const { profile } = response.data;
        
//         // Store user role
//         setUserRole(profile.role.toUpperCase());
//         localStorage.setItem('user_role', profile.role);
        
//         // Check if user has required role
//         if (allowedRoles.length > 0) {
//           const hasAccess = allowedRoles.some(
//             role => role.toUpperCase() === profile.role.toUpperCase()
//           );
//           setIsAuthorized(hasAccess);
//         } else {
//           setIsAuthorized(true);
//         }
        
//       } catch (error) {
//         console.error('Auth verification failed:', error);
//         // Invalid token - clear everything
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         localStorage.removeItem('user_role');
//         localStorage.removeItem('user_id');
//         localStorage.removeItem('user_email');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     verifyAuth();
//   }, [allowedRoles]);

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
//           <p className="text-gray-600">Verifying access...</p>
//         </div>
//       </div>
//     );
//   }

//   // Not authenticated - redirect to login
//   if (!localStorage.getItem('access_token')) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // Authenticated but wrong role - redirect to correct dashboard
//   if (!isAuthorized && userRole) {
//     const roleRoutes = {
//       STUDENT: '/student/dashboard',
//       FACULTY: '/faculty/dashboard',
//       AUTHORITY: '/authority/dashboard',
//       ADMIN: '/admin/dashboard',
//     };

//     const correctRoute = roleRoutes[userRole] || '/login';
    
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
//           <div className="text-red-600 text-5xl mb-4">🚫</div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
//           <p className="text-gray-600 mb-6">
//             You don't have permission to access this page.
//           </p>
//           <p className="text-sm text-gray-500 mb-6">
//             Your role: <span className="font-semibold">{userRole}</span>
//           </p>
//           <Navigate to={correctRoute} replace />
//         </div>
//       </div>
//     );
//   }

//   // Authorized - render the protected content
//   return children;
// };

// export default ProtectedRoute;

// #frontend/src/components/auth/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('access_token');
    const storedRole = localStorage.getItem('user_role');

    console.log('🔍 Auth Check:', { token: !!token, storedRole });

    // No token = not authenticated
    if (!token) {
      console.log('❌ No token found');
      setIsAuthenticated(false);
      setIsChecking(false);
      return;
    }

    // Token exists, set as authenticated
    setIsAuthenticated(true);
    setUserRole(storedRole?.toUpperCase() || storedRole);
    setIsChecking(false);

    console.log('✅ Authenticated as:', storedRole);
  };

  // Show loading
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    console.log('🔒 Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role if specified
  if (allowedRoles.length > 0 && userRole) {
    const normalizedUserRole = userRole.toUpperCase();
    const normalizedAllowedRoles = allowedRoles.map(r => r.toUpperCase());
    
    console.log('🔐 Role Check:', { 
      userRole: normalizedUserRole, 
      allowed: normalizedAllowedRoles 
    });

    const hasAccess = normalizedAllowedRoles.includes(normalizedUserRole);

    if (!hasAccess) {
      console.log('❌ Wrong role, redirecting');
      
      // Redirect to correct dashboard
      const roleRoutes = {
        STUDENT: '/student/dashboard',
        FACULTY: '/faculty/dashboard',
        AUTHORITY: '/authority/dashboard',
        ADMIN: '/admin/dashboard',
      };

      return <Navigate to={roleRoutes[normalizedUserRole] || '/login'} replace />;
    }
  }

  console.log('✅ Access granted');
  return children;
};

export default ProtectedRoute;