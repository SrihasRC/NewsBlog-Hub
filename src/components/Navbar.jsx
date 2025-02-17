import React from "react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import logo from "../assets/fl.svg"

const Navbar = () => {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-[#111111]/20 text-white py-7 px-12 h-13 flex items-center justify-between fixed top-0 w-full z-10 border-b border-[#2a2a2a] backdrop-blur-lg">
      <div>
        <div className="flex justify-center items-center gap-1 bg-gradient-to-r from-blue-200 to-purple-300 text-transparent bg-clip-text">
          <img src={logo} alt="logo" className="h-8.5" />
          <h1 className="text-3xl font-semibold">NBH</h1>
        </div>
      </div>

      {/* Navigation NavLinks */}
      <div className="flex gap-4 text-lg">
        <NavLink to="/" className={({isActive})=>`hover:text-gray-400 ${isActive ? 'text-blue-600' : ''}`}>Home</NavLink>
        <NavLink to="/news" className={({isActive})=>`hover:text-gray-400 ${isActive ? 'text-blue-600' : ''}`}>News</NavLink>
        <NavLink to="/blogs" className={({isActive})=>`hover:text-gray-400 ${isActive ? 'text-blue-600' : ''}`}>Blogs</NavLink>
        <NavLink to="/contact" className={({isActive})=>`hover:text-gray-400 ${isActive ? 'text-blue-600' : ''}`}>Contact</NavLink>
      </div>

      {/* Authentication Buttons / User Info */}
      {isSignedIn ? (
        <div className="flex items-center gap-4">
          <span className="text-lg">Hi, {user?.firstName || "User"} 👋</span>
          <UserButton />
        </div>
      ) : (
        <div className="flex gap-4 text-md">
          <SignUpButton>
            <button className="text-white cursor-pointer px-3 py-1.5 rounded-lg">
              Sign Up
            </button>
          </SignUpButton>

          <SignInButton>
            <button className="cursor-pointer px-3 py-1.5 rounded-md bg-white text-black hover:bg-white/60 font-semibold">
              Log In
            </button>
          </SignInButton>
        </div>
      )} 
    </nav>
  );
};

export default Navbar;
