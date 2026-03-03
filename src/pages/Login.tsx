// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { authService } from "../main";
// import toast from "react-hot-toast";
// import { useGoogleLogin } from "@react-oauth/google";
// import { FcGoogle } from "react-icons/fc";
// import { useAppData } from "../context/AppContext";

// const Login = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const { setUser, setIsAuth } = useAppData();

//   const responseGoogle = async (authResult: any) => {
//     setLoading(true);
//     try {
//       const result = await axios.post(`${authService}/api/auth/login`, {
//         code: authResult["code"],
//       });

//       localStorage.setItem("token", result.data.token);
//       toast.success(result.data.message);
//       setLoading(false);
//       setUser(result.data.user);
//       setIsAuth(true);
//       navigate("/");
//     } catch (error) {
//       console.log(error);
//       toast.error("Problem while login");
//       setLoading(false);
//     }
//   };

//   const googleLogin = useGoogleLogin({
//     onSuccess: responseGoogle,
//     onError: responseGoogle,
//     flow: "auth-code",
//   });
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-white px-4">
//       <div className="w-full max-w-sm space-y-6">
//         <h1 className="text-center text-3xl font-bold text-[#E23774]">
//           Tomato
//         </h1>

//         <p className="text-center text-sm text-gray-500">
//           Log in or sign up to continue
//         </p>

//         <button
//           onClick={googleLogin}
//           disabled={loading}
//           className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3"
//         >
//           <FcGoogle size={20} />
//           {loading ? "Signing in ..." : "Continue with Google"}
//         </button>

//         <p className="text-center text-xs text-gray-400">
//           By continuing, you agree with our{" "}
//           <span className="text-[#E23774]">Terms of Service</span> &{" "}
//           <span className="text-[#E23774]">Privacy Policy</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../main"; // should be "http://localhost:5000" in dev
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useAppData } from "../context/AppContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsAuth } = useAppData();

  const responseGoogle = async (authResult: any) => {
    setLoading(true);
    try {
      // Ensure we actually got a code back
      if (!authResult?.code) {
        toast.error("Google login failed: no code received");
        setLoading(false);
        return;
      }

      // Send the code to backend
      const result = await axios.post(`${authService}/api/auth/login`, {
        code: authResult.code,
      });

      // Save token and user info
      localStorage.setItem("token", result.data.token);
      setUser(result.data.user);
      setIsAuth(true);

      toast.success(result.data.message || "Login successful");
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Problem while logging in"
      );
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code", // important for backend "postmessage" flow
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-3xl font-bold text-[#E23774]">
          Tomato
        </h1>

        <p className="text-center text-sm text-gray-500">
          Log in or sign up to continue
        </p>

        <button
          onClick={googleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3"
        >
          <FcGoogle size={20} />
          {loading ? "Signing in ..." : "Continue with Google"}
        </button>

        <p className="text-center text-xs text-gray-400">
          By continuing, you agree with our{" "}
          <span className="text-[#E23774]">Terms of Service</span> &{" "}
          <span className="text-[#E23774]">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

