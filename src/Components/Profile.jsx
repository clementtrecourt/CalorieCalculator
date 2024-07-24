import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { User, Calendar, Droplet, Target } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Avatar, Typography } from "@material-tailwind/react";
import avatarDefault from "../assets/img/avatar.jpg";
import { IconArrowNarrowRight, IconPencil } from "@tabler/icons-react";
const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [newWeight, setNewWeight] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [bmiColor, setBmiColor] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUser(user);
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            calculateBMI(data); // Calculate BMI with fetched data
          } else {
            console.log("No such document!");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (userData) {
      calculateBMI(userData);
    }
  }, [userData]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleWeightSubmit = async () => {
    const today = new Date();
    const newEntry = {
      date: today.toLocaleDateString("default"), // Full date
      weight: parseFloat(newWeight),
    };

    try {
      const user = auth.currentUser;
      if (user) {
        // Add the new weight entry to the user's weight data array
        const updatedWeightData = [...(userData.weightData || []), newEntry];
        await updateDoc(doc(db, "users", user.uid), {
          weightData: updatedWeightData,
          weight: newEntry.weight, // Update the current weight as well
        });
        setUserData((prevUserData) => ({
          ...prevUserData,
          weightData: updatedWeightData,
          weight: newEntry.weight,
        }));
        setNewWeight(""); // Clear the input field
        calculateBMI({ ...userData, weight: newEntry.weight }); // Recalculate BMI with new weight
      } else {
        console.log("No user is signed in");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const calculateBMI = (data) => {
    const heightInMeters = data.height / 100;
    const calculatedBMI = data.weight / (heightInMeters * heightInMeters);
    setBmi(calculatedBMI.toFixed(2));

    let color = "";
    if (calculatedBMI < 18.5) {
      color = "bg-blue-200";
    } else if (calculatedBMI < 24.9) {
      color = "bg-green-200";
    } else if (calculatedBMI < 29.9) {
      color = "bg-yellow-200";
    } else {
      color = "bg-red-200";
    }
    setBmiColor(color);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {user && userData && (
        <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-8 rounded-xl shadow-2xl max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <div className="flex items-center space-x-4 mb-6 relative">
              <Avatar src={avatarDefault} size="xl" />

              <div>
                <Typography variant="h6">Tania Andrew</Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  Web Developer
                </Typography>
              </div>
              <div className="flex-grow">
                <h2 className="text-3xl font-bold text-indigo-800">
                  {userData.name}
                </h2>
                <div className="flex items-center mt-2 bg-indigo-100 rounded-full px-4 py-2 text-indigo-800">
                  <Target className="w-5 h-5 mr-2 text-indigo-600" />
                  <p className="font-semibold">{userData.goal}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <User className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-blue-700 font-semibold">Weight</span>
                </div>
                <p className="text-2xl font-bold text-blue-800">
                  {userData.weight} kg
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Droplet className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-700 font-semibold">Calories</span>
                </div>
                <p className="text-2xl font-bold text-green-800">
                  {userData.totalCalories}
                </p>
              </div>

              <div className={`p-4 rounded-lg ${bmiColor}`}>
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-white mr-2" />
                  <span className="text-white font-semibold">BMI</span>
                </div>
                <p className="text-2xl font-bold text-white">{bmi}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold mb-4 text-indigo-800">
                Weight Over Time
              </h3>
              <div>
                <IconPencil className="text-indigo-800 hover:opacity-80 transition-colors duration-300 cursor-pointer" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userData.weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" stroke="#718096" />
                <YAxis stroke="#718096" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#667eea"
                  strokeWidth={2}
                  dot={{ fill: "#667eea", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-indigo-800">
              Log New Weight
            </h3>
            <div className="flex space-x-4">
              <input
                type="number"
                placeholder="Enter new weight"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                className="flex-grow border rounded-md p-2"
              />
              <button
                onClick={handleWeightSubmit}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Log Weight
              </button>
            </div>
            <div className="flex justify-center mt-5 text-blue-300 cursor-pointer">
              My weight history <IconArrowNarrowRight />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
