import { Badge } from "@raralabs/components";
import Login from "./Login";
import Logo from "./Logo";
import Search from "./Search";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if the user is logged in and set the state accordingly
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (user && token) {
      setIsLoggedIn(true);
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name);
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);

  const handleLoginSuccess = (userData: { token: string; user: any }) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.user));
    setIsLoggedIn(true);
    setUserName(userData.user.name);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/")
    setIsLoggedIn(false);
    setUserName(null);

  };

  const handleMyPosts = () => {
    navigate("/my/posts");
  };

  return (
    <div className="text-black flex justify-between items-center  py-5 bg-gray-500 px-6 mb-8">
      <Logo />
      <Search />
      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            <span className="text-black">Hello, {userName}</span>
            <button
              onClick={handleMyPosts}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              My Posts
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Login  handleLogIn={handleLoginSuccess} />
        )}
      </div>
    </div>
  );
};

export default Navbar;