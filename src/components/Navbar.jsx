import React from "react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import logo from "../assets/fl.svg"

const Navbar = () => {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-[#1b1b1c] text-white pt-4 pb-3 px-10 h-13 flex items-center justify-between fixed top-0 w-full z-10">
      <div>
        <Link to="/" className="flex justify-center items-center gap-1 bg-gradient-to-r from-blue-200 to-purple-300 text-transparent bg-clip-text">
          <img src={logo} alt="logo" className="h-8.5" />
          <h1 className="text-3xl font-semibold">NBH</h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-4 text-xl">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        {/* <span> | </span> */}
        <Link to="/news" className="hover:text-gray-400">News</Link>
        {/* <span> | </span> */}
        <Link to="/blogs" className="hover:text-gray-400">Blogs</Link>
        <Link to="/" className="hover:text-gray-400">Contact</Link>
      </div>

      {/* Authentication Buttons / User Info */}
      {isSignedIn ? (
        <div className="flex items-center gap-4">
          <span className="text-lg">Hi, {user?.firstName || "User"} 👋</span>
          <UserButton />
        </div>
      ) : (
        <div className="flex gap-4">
          {/* Styled SignUpButton */}
          <SignUpButton>
            <button className="text-white cursor-pointer px-3 py-1.5 rounded-lg">
              Sign Up
            </button>
          </SignUpButton>

          {/* Styled SignInButton */}
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
