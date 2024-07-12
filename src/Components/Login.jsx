import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };
  const handleGoogleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 max-w-sm bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <form onSubmit={handleSignin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={handleGoogleSignin}
            className="w-full px-3 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Sign In with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
