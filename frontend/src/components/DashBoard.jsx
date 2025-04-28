import React, { useState, useEffect } from "react";
import { FaUserCircle, FaTimes, FaSignOutAlt } from "react-icons/fa"; // Added FaSignOutAlt for the logout button
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Importing toastify

const Dashboard = () => {
  const navigate = useNavigate();
  const teamName = localStorage.getItem("teamName") || "User";
  const [teamsRound1, setTeamsRound1] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [round1Submitted, setRound1Submitted] = useState(false);
  const [password, setPassword] = useState("");
  const [isEligibleForRound2, setIsEligibleForRound2] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State for logout modal

  useEffect(() => {
    const submitted = localStorage.getItem("round1Submitted");
    if (submitted === "true") {
      setRound1Submitted(true);
    }

    // Fetch leaderboard to check eligibility for Round 2
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/leaderboard"
        );
        const leaderboardData = response.data;
        leaderboardData.sort((a, b) => b.score - a.score);

        // Check if the team is in the top 10
        const top10Teams = leaderboardData.slice(0, 10);
        if (top10Teams.some((team) => team.teamName === teamName)) {
          setIsEligibleForRound2(true);
        } else {
          setIsEligibleForRound2(false);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard data:", err);
      }
    };

    fetchLeaderboard();
  }, [teamName]);

  const openModal = (content) => {
    const email = localStorage.getItem("email");

    if (content.includes("Round 1") && round1Submitted) {
      if (email) {
        alert("You have already submitted Round 1.");
      } else {
        alert("Email not found!");
      }
      return;
    }

    if (content.includes("Round 2") && !isEligibleForRound2) {
      alert("You are not eligible for Round 2.");
      return;
    }

    if (content.includes("Round 2") && isEligibleForRound2) {
      setModalContent(content);
      setIsModalOpen(true);
      setIsAgreed(false);
      setPassword(""); // Reset password input for Round 2
    } else if (content.includes("Round 3")) {
      alert(
        "This round is only for those students who are selected for Round 3."
      );
      return;
    }

    setModalContent(content);
    setIsModalOpen(true);
    setIsAgreed(false);
    setPassword(""); // Reset password input for other rounds
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
    setIsAgreed(false);
  };

  const handleOk = () => {
    if (modalContent.includes("Round 1")) {
      navigate("/round1");
    } else if (modalContent.includes("Leaderboard")) {
      // Check password for Leaderboard
      if (password === "30102209") {
        navigate("/leader");
      } else {
        alert("Incorrect Password!");
        return;
      }
    } else if (modalContent.includes("Round 2")) {
      // Check eligibility for Round 2
      if (isEligibleForRound2 && password === "30220910") {
        navigate("/round2"); // Navigate to Round 2 if eligible and password matches
      } else {
        alert("You are not eligible for Round 2!");
        return;
      }
    }
    closeModal();
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    // localStorage.clear(); // Clear all localStorage data
    toast.success("Logout Successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
    });
    navigate("/login"); // Redirect to login page
    setIsLogoutModalOpen(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false); // Close logout confirmation modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-700">Dashboard</h1>
        <div className="flex items-center space-x-3">
          <span className="text-gray-700 font-semibold">
            Welcome, {teamName}!
          </span>
          <FaUserCircle className="text-4xl text-purple-700 cursor-pointer" />
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Round 1 Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center justify-between hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Round 1</h2>
          <p className="text-gray-600 text-center mb-6">
            This is the first round where the top 10 teams will be selected.
            Only selected teams will proceed to the next round.
          </p>
          <button
            onClick={() =>
              openModal(
                "Instructions for Round 1:\n- Complete the quiz.\n- Top 10 teams will be selected.\n- Time limit: 30 minutes."
              )
            }
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            Start
          </button>
        </div>

        {/* Round 2 Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center justify-between hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">Round 2</h2>
          <p className="text-gray-600 text-center mb-6">
            In this round, the top 5 teams will be selected who will then move
            on to the final round.
          </p>
          {/* Always visible Start button for Round 2 */}
          <button
            onClick={() =>
              openModal(
                "Instructions for Round 2:\n- Solve problem statements.\n- Top 5 teams will be selected.\n- Time limit: 45 minutes."
              )
            }
            className={`bg-gradient-to-r from-pink-500 to-yellow-400 text-white py-2 px-6 rounded-full font-semibold hover:scale-105 transition-transform duration-300`}
          >
            Start
          </button>
        </div>

        {/* Round 3 Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center justify-between hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">Round 3</h2>
          <p className="text-gray-600 text-center mb-6">
            This is an offline rapid-fire round for the final selected teams.
          </p>
          <button
            onClick={() =>
              openModal(
                "Instructions for Round 3:\n- Rapid fire offline round.\n- Be quick and accurate.\n- Shortest correct answers win!"
              )
            }
            className="bg-gradient-to-r from-yellow-400 to-green-400 text-white py-2 px-6 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            Start
          </button>
        </div>

        {/* Leaderboard Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center justify-between hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Leaderboard
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Check the progress and ranking of all teams.
          </p>
          <button
            onClick={() =>
              openModal(
                "Instructions for Leaderboard:\n- View the latest rankings.\n- Keep track of your performance!"
              )
            }
            className="bg-gradient-to-r from-green-400 to-blue-400 text-white py-2 px-6 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            See Progress
          </button>
        </div>

      
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed bottom-5 right-5 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700"
      >
        <FaSignOutAlt size={24} />
      </button>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-8 w-11/12 max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={handleLogoutCancel}
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-around">
              <button
                onClick={handleLogoutConfirm}
                className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={handleLogoutCancel}
                className="bg-gray-400 text-white py-2 px-6 rounded-full hover:bg-gray-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

     
      {/* Modal for rounds */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-8 w-11/12 max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Instructions
            </h2>
            <p className="text-gray-700 whitespace-pre-line mb-6">
              {modalContent}
            </p>

            {modalContent.includes("Leaderboard") && (
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            {/* Password Input for Round 2 */}
            {modalContent.includes("Round 2") && (
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Enter Round 2 Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            {/* Checkbox */}
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="agree"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
                className="accent-purple-600 w-5 h-5"
              />
              <label htmlFor="agree" className="text-gray-700">
                I agree to the instructions
              </label>
            </div>

            {/* OK Button */}
            {isAgreed && (
              <button
                onClick={handleOk}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 w-full rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                OK
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
