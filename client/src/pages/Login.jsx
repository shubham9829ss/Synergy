// import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  signInFailure,
  signInSuccess,
  signInStart,
} from "../redux/userSlice.js";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.account);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { username, password } = userDetails;
      dispatch(signInStart());
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        toast.error(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data.user));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
      return;
    }
  };

  return (
    <div className="max-h-screen">
      <header className="px-12 pb-4 mt-0">
        <div>
          <Link to="/">
            <img src="/assets/white_logo.png" width={120} alt="" />
          </Link>
        </div>
      </header>
      <div className="bg-[#1a1919] py-10 w-full">
        <div className="bg-black py-5 text-center w-1/2 mx-auto">
          <h1 className="text-5xl my-5 font-semibold">Log in to Spotify</h1>
          <div>
            <form onSubmit={loginUser} className="text-center mx-auto w-1/2 ">
              <div className="w-full text-left py-4 relative">
                <label
                  htmlFor="username"
                  className="font-semibold mb-2 inline-block">
                  Email or username
                </label>
                <input
                  type="text"
                  id="username"
                  value={userDetails.username}
                  onChange={onChange}
                  name="username"
                  placeholder="Email or username"
                  autoComplete="off"
                  className="block w-full rounded-[4px] border-0  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-white bg-[#1a1919]"
                />
              </div>
              <div className="w-full text-left py-4 relative">
                <label
                  htmlFor="password"
                  className="font-semibold mb-2 inline-block">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={userDetails.password}
                  onChange={onChange}
                  name="password"
                  placeholder="Password"
                  className="block w-full rounded-[4px] border-0  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-white bg-[#1a1919]"
                />
              </div>
              <div className="w-full text-left py-4">
                <button
                  type="submit"
                  className="block cursor-pointer w-full outline-none bg-green-400 text-black p-3 hover:scale-105 translate-all duration-200 font-medium hover:font-semibold text-center rounded-full ">
                  Login
                </button>
              </div>
              <div className="w-full text-center py-4">
                <Link
                  to="/password/forgot"
                  className="text-white font-semibold underline mx-auto">
                  Forget Password?
                </Link>
              </div>
            </form>
            <div className="border-b border-gray-400 w-3/4 my-4 mx-auto">
              <p className="pt-4">
                <span className="text-gray-300 font-semibold">
                  Don&apos;t have an account?{"   "}
                </span>

                <Link
                  to="/signup"
                  className="text-white hover:text-green-500 font-semibold underline mx-auto">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
