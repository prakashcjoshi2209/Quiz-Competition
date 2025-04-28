// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import axios for making API requests

// const Leaderboard = () => {
//   const [teams, setTeams] = useState([]); // State to store team data
//   const [loading, setLoading] = useState(true); // Loading state to show a spinner while fetching data
//   const [error, setError] = useState(null); // Error state to handle errors

//   useEffect(() => {
//     // Fetch leaderboard data from your backend
//     const fetchLeaderboard = async () => {
//       try {
//         // Assuming this is your endpoint to get the leaderboard data
//         const response = await axios.get('http://localhost:5000/api/auth/leaderboard'); // Replace with the correct endpoint
//         const leaderboardData = response.data;

//         // Sort the leaderboard data by score in descending order
//         leaderboardData.sort((a, b) => b.score - a.score);

//         setTeams(leaderboardData); // Set the fetched data to the state
//         setLoading(false); // Set loading to false after data is fetched
//       } catch (err) {
//         setError('Failed to fetch leaderboard data.'); // Handle error
//         setLoading(false);
//       }
//     };

//     fetchLeaderboard(); // Call the fetch function on component mount
//   }, []); // Empty dependency array to run the effect only once on component mount

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 p-6">
//         <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Leaderboard</h1>
//         <div className="text-center text-lg text-purple-700">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100 p-6">
//         <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Leaderboard</h1>
//         <div className="text-center text-lg text-red-500">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Leaderboard</h1>

//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl shadow-xl">
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-lg font-semibold text-gray-700">Team Name</span>
//           <span className="text-lg font-semibold text-gray-700">Score</span>
//         </div>

//         {/* Display each team in the leaderboard */}
//         <div>
//           {teams.map((team, index) => (
//             <div
//               key={index}
//               className={`flex justify-between items-center py-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} rounded-md`}
//             >
//               <span className="text-lg text-purple-700">{team.name}</span>
//               <span className="text-lg text-purple-700">{team.score}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;



import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests

const Leaderboard = () => {
  const [teams, setTeams] = useState([]); // State to store team data
  const [loading, setLoading] = useState(true); // Loading state to show a spinner while fetching data
  const [error, setError] = useState(null); // Error state to handle errors

  useEffect(() => {
    // Fetch leaderboard data from your backend
    const fetchLeaderboard = async () => {
      try {
        // Assuming this is your endpoint to get the leaderboard data
        const response = await axios.get('http://localhost:5000/api/auth/leaderboard'); // Replace with the correct endpoint
        const leaderboardData = response.data;

        // Sort the leaderboard data by score in descending order
        leaderboardData.sort((a, b) => b.score - a.score);

        setTeams(leaderboardData); // Set the fetched data to the state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError('Failed to fetch leaderboard data.'); // Handle error
        setLoading(false);
      }
    };

    fetchLeaderboard(); // Call the fetch function on component mount
  }, []); // Empty dependency array to run the effect only once on component mount

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Leaderboard</h1>
        <div className="text-center text-lg text-purple-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Leaderboard</h1>
        <div className="text-center text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Leaderboard</h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-700">Team Name</span>
          <span className="text-lg font-semibold text-gray-700">Score</span>
        </div>

        {/* Display each team in the leaderboard */}
        <div>
          {teams.map((team, index) => (
            <div
              key={index}
              className={`flex justify-between items-center py-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} rounded-md`}
            >
              <span className="text-lg text-purple-700">{team.teamName || team.name}</span> {/* Ensure you are accessing the correct field */}
              <span className="text-lg text-purple-700">{team.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
