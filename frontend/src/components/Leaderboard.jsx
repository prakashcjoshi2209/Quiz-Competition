import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  // Sample data: 10 teams with random scores
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Generate 10 random teams and their scores
    const generatedTeams = Array.from({ length: 10 }, (_, index) => ({
      name: `Team ${index + 1}`,
      score: Math.floor(Math.random() * 100) + 1,  // Random score between 1 and 100
    }));

    // Sort teams by score in descending order
    generatedTeams.sort((a, b) => b.score - a.score);

    setTeams(generatedTeams);
  }, []);

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
              <span className="text-lg text-purple-700">{team.name}</span>
              <span className="text-lg text-purple-700">{team.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
