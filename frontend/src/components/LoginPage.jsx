

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     teamName: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();
//       console.log(data); 

//       if (response.ok) {
//         toast.success("Login Successful 🎉");
//         navigate("/dashboard"); // Login ke baad dashboard me jao
//         localStorage.setItem('teamName', data.teamName);

//       } else {
//         toast.error(data.message || "Login Failed ❌");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-pink-200 to-yellow-200 p-6">
//       <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">
//         <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
//           Welcome Back
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Team Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your team name"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email address"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:scale-105 transition-transform duration-300 mt-4"
//           >
//             Login
//           </button>
//         </form>

//         {/* Not registered yet */}
//         <p className="text-center text-gray-600 mt-4">
//           Not registered yet?
//           <Link
//             to="/signup"
//             className="text-purple-600 font-semibold hover:underline ml-1"
//           >
//             Signup
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teamName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success("Login Successful 🎉");

        // Save email and teamName in localStorage
        localStorage.setItem('teamName', data.teamName);
        localStorage.setItem('email', formData.email);

        navigate("/dashboard"); // Login ke baad dashboard me jao
      } else {
        toast.error(data.message || "Login Failed ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-pink-200 to-yellow-200 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Team Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Team Name
            </label>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              placeholder="Enter your team name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:scale-105 transition-transform duration-300 mt-4"
          >
            Login
          </button>
        </form>

        {/* Not registered yet */}
        <p className="text-center text-gray-600 mt-4">
          Not registered yet?
          <Link
            to="/signup"
            className="text-purple-600 font-semibold hover:underline ml-1"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
