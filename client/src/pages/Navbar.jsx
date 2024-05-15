import React, { useEffect, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaExternalLinkAlt,
  FaSearch,
  FaUser,
} from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword } from "../redux/songSlice.js";
import { signOut } from "../redux/userSlice";

export default function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.account);
  const [query, setQuery] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const dispatch = useDispatch();

  const handleSearchChange = async (e) => {
    setQuery(e.target.value);
    dispatch(setKeyword(e.target.value));
  };

  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    background: "rgb(249,250,228)",
    background:
      "linear-gradient(90deg, rgba(14, 3, 47, 1) 0%, rgba(57, 80, 107, 1) 50%, rgba(24, 72, 129, 1) 100%)",
    display: "fixed",
  };

  return (
    <div style={style}>
      <header className="flex top-0 z-50 justify-between items-center rounded-[6px] px-8 ml-2 mt-2 secondary_bg">
        <div className="flex items-center w-1/2">
          <FaAngleLeft className="bg-white/10 text-3xl p-1 rounded-[50%]" />
          <FaAngleRight className="bg-white/10 text-3xl p-1 rounded-[50%]" />
          <div className="w-full text-left py-4 relative">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search"
              autoComplete="off"
              value={query}
              onChange={(e) => handleSearchChange(e)}
              className={`block  w-full rounded-full pl-12 border-0  text-gray-300 shadow-sm ring ring-transparent placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-white p-3 hover:ring-white/20 bg-[#1a1919]`}
            />
            <FaSearch className="absolute left-4 top-8" />
          </div>
        </div>
        <div>
          {!isAuthenticated ? (
            <div>
              <Link
                to={"/signup"}
                className="rounded-full text-base text-white font-semibold py-2 px-8 mt-4">
                Sign Up
              </Link>
              <Link
                to={"/login"}
                className="rounded-full text-base text-white font-semibold py-2 px-8 mt-4">
                Log in
              </Link>
            </div>
          ) : (
            <div className="relative ">
              <button onClick={() => setShowDropDown(!showDropDown)}>
                <FaUser />
              </button>
              {showDropDown && (
                <div className="absolute dropdown bg-[#282828] top-8 text-sm right-0 w-[12rem]">
                  <ul className="p-1">
                    <li className="">
                      <Link
                        className="flex p-2 justify-between hover:bg-white/10"
                        to={"/account"}>
                        <span>Profile</span>{" "}
                      </Link>{" "}
                    </li>
                    <li className="">
                      <button
                        onClick={logoutUser}
                        className="p-2 w-full text-left border-t border-white/10  hover:bg-white/10">
                        <span>Log out</span>
                      </button>{" "}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
