// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import axios for making API requests

// const Leaderboard = () => {
//   const [teamsRound1, setTeamsRound1] = useState([]); // Round 1 teams (fetched from backend)
//   const [teamsRound2, setTeamsRound2] = useState([    // Static Dummy Data for Round 2
//     { teamName: "Alpha Warriors", score: 95 },
//     { teamName: "Beta Squad", score: 89 },
//     { teamName: "Gamma Fighters", score: 80 },
//     { teamName: "Delta Force", score: 70 },
//     { teamName: "Epsilon Eagles", score: 68 },
//     { teamName: "Zeta Smashers", score: 65 },
//     { teamName: "Theta Hunters", score: 62 },
//     { teamName: "Sigma Runners", score: 60 },
//     { teamName: "Omega Legends", score: 58 },
//     { teamName: "Lambda Warriors", score: 55 }
//   ]);
//   const [currentRound, setCurrentRound] = useState(1); // To track selected round
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   useEffect(() => {
//     // Fetch leaderboard data for Round 1
//     const fetchLeaderboard = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/auth/leaderboard');
//         const leaderboardData = response.data;

//         leaderboardData.sort((a, b) => b.score - a.score);

//         setTeamsRound1(leaderboardData);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch leaderboard data.');
//         setLoading(false);
//       }
//     };

//     fetchLeaderboard();
//   }, []);

//   // Decide which data to show
//   const teamsToDisplay = currentRound === 1 ? teamsRound1 : teamsRound2;

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
//       <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Leaderboard - Round {currentRound}</h1>

//       {/* Buttons to switch round */}
//       <div className="flex justify-center mb-6 gap-4">
//         <button 
//           onClick={() => setCurrentRound(1)} 
//           className={`px-4 py-2 rounded-full font-semibold ${currentRound === 1 ? 'bg-purple-700 text-white' : 'bg-gray-300 text-gray-700'}`}
//         >
//           Round 1
//         </button>
//         <button 
//           onClick={() => setCurrentRound(2)} 
//           className={`px-4 py-2 rounded-full font-semibold ${currentRound === 2 ? 'bg-purple-700 text-white' : 'bg-gray-300 text-gray-700'}`}
//         >
//           Round 2
//         </button>
//       </div>

//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl shadow-xl">
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-lg font-semibold text-gray-700">Team Name</span>
//           <span className="text-lg font-semibold text-gray-700">Score</span>
//         </div>

//         {/* Display each team in the leaderboard */}
//         <div>
//           {teamsToDisplay.map((team, index) => {
//             let bgColor = '';

//             if (currentRound === 1) {
//               // Round 1 Logic: Top 10 -> Green, Others -> Red
//               bgColor = index < 10 ? 'bg-green-200' : 'bg-red-200';
//             } else {
//               // Round 2 Logic: Top 5 -> Green, Others -> Red
//               bgColor = index < 5 ? 'bg-green-200' : 'bg-red-200';
//             }

//             return (
//               <div
//                 key={index}
//                 className={`flex justify-between items-center py-3 px-4 my-2 rounded-md ${bgColor}`}
//               >
//                 <span className="text-lg font-semibold text-purple-700">{team.teamName || team.name}</span>
//                 <span className="text-lg font-semibold text-purple-700">{team.score}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [teamsRound1, setTeamsRound1] = useState([]);
  const [teamsRound2, setTeamsRound2] = useState([
    { teamName: "Alpha Warriors", score: 95 },
    { teamName: "Beta Squad", score: 89 },
    { teamName: "Gamma Fighters", score: 80 },
    { teamName: "Delta Force", score: 70 },
    { teamName: "Epsilon Eagles", score: 68 },
    { teamName: "Zeta Smashers", score: 65 },
    { teamName: "Theta Hunters", score: 62 },
    { teamName: "Sigma Runners", score: 60 },
    { teamName: "Omega Legends", score: 58 },
    { teamName: "Lambda Warriors", score: 55 }
  ]);
  const [currentRound, setCurrentRound] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [round2AccessGranted, setRound2AccessGranted] = useState(false); // <-- New State

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/leaderboard');
        const leaderboardData = response.data;

        leaderboardData.sort((a, b) => b.score - a.score);

        setTeamsRound1(leaderboardData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch leaderboard data.');
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const teamsToDisplay = currentRound === 1 ? teamsRound1 : teamsRound2;

  // New: Handle Round 2 button click
  const handleRound2Click = () => {
    if (round2AccessGranted) {
      setCurrentRound(2);
    } else {
      const password = prompt('Enter Password for Round 2');
      if (password === '22093010') {
        setRound2AccessGranted(true);
        setCurrentRound(2);
      } else {
        alert('Incorrect Password!');
      }
    }
  };

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
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Leaderboard - Round {currentRound}</h1>

      {/* Buttons to switch round */}
      <div className="flex justify-center mb-6 gap-4">
        <button 
          onClick={() => setCurrentRound(1)} 
          className={`px-4 py-2 rounded-full font-semibold ${currentRound === 1 ? 'bg-purple-700 text-white' : 'bg-gray-300 text-gray-700'}`}
        >
          Round 1
        </button>
        <button 
          onClick={handleRound2Click} 
          className={`px-4 py-2 rounded-full font-semibold ${currentRound === 2 ? 'bg-purple-700 text-white' : 'bg-gray-300 text-gray-700'}`}
        >
          Round 2
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-700">Team Name</span>
          <span className="text-lg font-semibold text-gray-700">Score</span>
        </div>

        {/* Display each team in the leaderboard */}
        <div>
          {teamsToDisplay.map((team, index) => {
            let bgColor = '';

            if (currentRound === 1) {
              bgColor = index < 10 ? 'bg-green-200' : 'bg-red-200';
            } else {
              bgColor = index < 5 ? 'bg-green-200' : 'bg-red-200';
            }

            return (
              <div
                key={index}
                className={`flex justify-between items-center py-3 px-4 my-2 rounded-md ${bgColor}`}
              >
                <span className="text-lg font-semibold text-purple-700">{team.teamName || team.name}</span>
                <span className="text-lg font-semibold text-purple-700">{team.score}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
