
export default function ProtectedRoute({ children, allowedRoles=[] }) {

  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("user_role");

  if(!token){
    return <Navigate to="/login" replace />;
  }

  // ⭐ allow loading if role not yet fetched
  if(!role){
    return children;
  }

  if(allowedRoles.length){
    if(!allowedRoles.map(r=>r.toUpperCase()).includes(role.toUpperCase())){
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}