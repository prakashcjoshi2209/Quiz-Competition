// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';


// const SignupPage = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     teamName: '',
//     firstMember: '',
//     secondMember: '',
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Signup Successful!');
//         navigate('/login');
//       } else {
//         alert(data.message || 'Signup Failed');
//       }
//     } catch (error) {
//       console.error('Signup Error:', error);
//       alert('Something went wrong!');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-pink-200 to-yellow-200 p-6">
//       <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">

//         <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
//           Create Your Team
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Team Name */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Team Name</label>
//             <input 
//               type="text"
//               name="teamName"
//               value={formData.teamName}
//               onChange={handleChange}
//               placeholder="Enter your team name" 
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//               required
//             />
//           </div>

//           {/* First Member Name */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">First Member Name</label>
//             <input 
//               type="text"
//               name="firstMember"
//               value={formData.firstMember}
//               onChange={handleChange}
//               placeholder="Enter first member's name" 
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//               required
//             />
//           </div>

//           {/* Second Member Name */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Second Member Name</label>
//             <input 
//               type="text"
//               name="secondMember"
//               value={formData.secondMember}
//               onChange={handleChange}
//               placeholder="Enter second member's name" 
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
//             <input 
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter email address" 
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Password</label>
//             <input 
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter password" 
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button 
//             type="submit"
//             className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:scale-105 transition-transform duration-300 mt-4"
//           >
//             Create Team
//           </button>
//         </form>

//         {/* OR Divider */}
       

//         {/* Already have an account */}
//         <p className="text-center text-gray-600 mt-6">
//           Already have an account? 
//           <Link to="/login" className="text-purple-600 font-semibold hover:underline ml-1">
//             Login
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';  // <-- Import Toast
import 'react-toastify/dist/ReactToastify.css';           // <-- Import Toast CSS

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    teamName: '',
    firstMember: '',
    secondMember: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Signup Successful! 🎉', {
          position: 'top-center'
        });
        setTimeout(() => navigate('/login'), 2000); // 2 sec baad login page
      } else {
        toast.error(data.message || 'Signup Failed 🚫', {
          position: 'top-center'
        });
      }
    } catch (error) {
      console.error('Signup Error:', error);
      toast.error('Something went wrong! 😢', {
        position: 'top-center'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-pink-200 to-yellow-200 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Create Your Team
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Team Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Team Name</label>
            <input 
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              placeholder="Enter your team name" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* First Member Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">First Member Name</label>
            <input 
              type="text"
              name="firstMember"
              value={formData.firstMember}
              onChange={handleChange}
              placeholder="Enter first member's name" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Second Member Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Second Member Name</label>
            <input 
              type="text"
              name="secondMember"
              value={formData.secondMember}
              onChange={handleChange}
              placeholder="Enter second member's name" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:scale-105 transition-transform duration-300 mt-4"
          >
            Create Team
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account? 
          <Link to="/login" className="text-purple-600 font-semibold hover:underline ml-1">
            Login
          </Link>
        </p>

      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
