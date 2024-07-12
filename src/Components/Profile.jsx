import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUser(user);
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 max-w-sm bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {user && (
          <>
            <p className="mb-4">
              <strong>Email:</strong> {user.email}
            </p>
            {userData && (
              <>
                <p className="mb-4">
                  <strong>Gender:</strong> {userData.gender}
                </p>
                <p className="mb-4">
                  <strong>Age:</strong> {userData.age}
                </p>
                <p className="mb-4">
                  <strong>Height:</strong> {userData.height} cm
                </p>
                <p className="mb-4">
                  <strong>Weight:</strong> {userData.weight} kg
                </p>
                {/* Ajoutez d'autres champs comme nécessaire */}
              </>
            )}
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Profile;
