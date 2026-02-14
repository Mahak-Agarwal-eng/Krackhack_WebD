
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import supabase from "../../services/supabase";

// export default function Login(){

//   const navigate = useNavigate();

//   const [email,setEmail]=useState("");
//   const [password,setPassword]=useState("");
//   const [error,setError]=useState("");

//   const handleLogin = async (e)=>{
//     e.preventDefault();
//     setError("");

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if(error){
//       setError(error.message);
//       return;
//     }

//     // SAVE TOKEN FOR FASTAPI
//     localStorage.setItem("access_token", data.session.access_token);

//     // FETCH PROFILE ROLE
//     const { data: profile } = await supabase
//       .from("profiles")
//       .select("role")
//       .eq("id", data.user.id)
//       .single();

//     if(!profile){
//       setError("Profile missing");
//       return;
//     }

//     localStorage.setItem("user_role", profile.role.toUpperCase());

//     console.log("ROLE SAVED:", profile.role);

//     const routes={
//       STUDENT:"/student/dashboard",
//       FACULTY:"/faculty/dashboard",
//       AUTHORITY:"/authority/dashboard",
//       ADMIN:"/admin/dashboard"
//     };

//     navigate(routes[profile.role?.toUpperCase()] || "/student/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white shadow-lg rounded-xl p-8 w-96 space-y-4"
//       >

//         <h1 className="text-2xl font-bold text-blue-700 text-center">
//           AEGIS Login
//         </h1>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
//             {error}
//           </div>
//         )}

//         <input
//           type="email"
//           placeholder="Institute Email"
//           className="w-full border p-3 rounded"
//           value={email}
//           onChange={e=>setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-3 rounded"
//           value={password}
//           onChange={e=>setPassword(e.target.value)}
//           required
//         />

//         <button className="w-full bg-blue-700 text-white py-3 rounded">
//           Login
//         </button>

//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../services/supabase";

export default function Login(){

  const navigate = useNavigate();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  const handleLogin = async (e)=>{
    e.preventDefault();
    setError("");

    // LOGIN WITH SUPABASE
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if(error){
      setError(error.message);
      return;
    }

    // SAVE TOKEN
    localStorage.setItem("access_token", data.session.access_token);

    // GET PROFILE ROLE
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if(profileError){
      setError("Profile not found");
      return;
    }

    localStorage.setItem("user_role", profile.role);

    console.log("LOGIN SUCCESS →", profile.role);

    // REDIRECT
    const routes={
      STUDENT:"/student/dashboard",
      FACULTY:"/faculty/dashboard",
      AUTHORITY:"/authority/dashboard",
      ADMIN:"/admin/dashboard"
    };

    navigate(routes[profile.role?.toUpperCase()] || "/student/dashboard");

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-blue-50">

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl p-8 w-96 space-y-4"
      >

        <h1 className="text-2xl font-bold text-blue-700 text-center">
          AEGIS Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Institute Email"
          className="w-full border p-3 rounded"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-700 text-white py-3 rounded">
          Login
        </button>

      </form>

    </div>
  );
}