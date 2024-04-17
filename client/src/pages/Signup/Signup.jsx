import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Signup.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const input_cls =
  "block w-full rounded-[4px] border-0  text-black transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-black bg-[#fff]";

function Signup() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    day: "",
    month: "January",
    year: "",
    gender: "",
  });
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.account);

  const onChange = (e) => {
    console.log(e.target.value);
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    if (e.target.name === "gender") {
      if (e.target.id === "m") {
        setUserDetails({ ...userDetails, gender: "M" });
      }
      if (e.target.id === "f") {
        setUserDetails({ ...userDetails, gender: "F" });
      }
      if (e.target.id === "o") {
        setUserDetails({ ...userDetails, gender: "O" });
      }
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const index = months.indexOf(userDetails.month) + 1;
    let DOB = `${index}-${userDetails.day}-${userDetails.year}`;
    console.log(DOB);
    const { username, email, password, gender } = userDetails;

    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        gender,
        DOB,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (data.success) {
      setUserDetails({
        username: "",
        email: "",
        password: "",
        day: "",
        month: "January",
        year: "",
        gender: "",
      });
      toast.success(data.message);
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="py-6 bg-white w-full sm:w-[50%] mx-auto h-full">
        <div className="text-center">
          <Link to="/">
            <img
              src="/assets/s_logo_black.png"
              className="mx-auto"
              width={140}
              alt=""
            />
          </Link>
        </div>
        <div className=" text-black">
          <div className="py-4 text-center mx-auto">
            <h1 className="text-2xl tracking-tighter my-4 font-semibold">
              Sign up for free to start listening.
            </h1>
            <span className="or__">or</span>
            <p className="my-4 font-bold">Sign up with your email address</p>
            <form
              onSubmit={registerUser}
              className="text-center mx-auto w-3/4 ">
              <div className="w-4/5 mx-auto text-left py-3">
                <label
                  htmlFor="email"
                  className="font-semibold mb-2 text-sm inline-block">
                  What&apos;s your email?{" "}
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  onChange={onChange}
                  placeholder="Enter your email"
                  className={input_cls}
                />
              </div>
              <div className="w-4/5 mx-auto text-left py-4">
                <label
                  htmlFor="password"
                  className="font-semibold mb-2 text-sm inline-block">
                  Create a password{" "}
                </label>
                <input
                  autoComplete="off"
                  type="password"
                  id="password"
                  value={userDetails.password}
                  onChange={onChange}
                  name="password"
                  placeholder="Create a password"
                  className={input_cls}
                />
              </div>
              <div className="w-4/5 mx-auto text-left py-4">
                <label
                  htmlFor="username"
                  className="font-semibold mb-2 text-sm inline-block">
                  What should we call you?{" "}
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  id="username"
                  value={userDetails.username}
                  onChange={onChange}
                  name="username"
                  placeholder="Create a password"
                  className={input_cls}
                />
                <small>it will appear on your profile</small>
              </div>
              <div className="text-left"></div>
              <div className="w-4/5 mx-auto text-left py-4">
                <label
                  htmlFor="password"
                  className="font-semibold mb-2 text-sm inline-block">
                  What&apos;s your date of birth?
                </label>
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="w-full sm:w-1/4">
                    <label htmlFor="day" className="ml-2 inline-block">
                      Day
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      value={userDetails.day}
                      onChange={onChange}
                      id="day"
                      name="day"
                      placeholder="DD"
                      className={input_cls}
                    />
                  </div>
                  <div className="w-full sm:w-2/4">
                    <label htmlFor="month" className="ml-2 inline-block">
                      Month
                    </label>
                    <select
                      id="month"
                      value={userDetails.month}
                      onChange={onChange}
                      name="month"
                      placeholder="MM"
                      className={input_cls}>
                      {months.map((m) => {
                        return (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="w-full sm:w-1/4">
                    <label htmlFor="year" className="ml-2 inline-block">
                      Year
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      id="year"
                      name="year"
                      value={userDetails.year}
                      onChange={onChange}
                      placeholder="YYYY"
                      className={input_cls}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="items-center">
                    <input
                      autoComplete="off"
                      type="radio"
                      id="m"
                      name="gender"
                      placeholder="gender"
                      value={userDetails.gender}
                      checked={userDetails.gender === "M"}
                      onChange={onChange}
                    />
                    <label htmlFor="gender" className="ml-2 inline-block">
                      Male
                    </label>
                  </div>
                  <div className="">
                    <input
                      autoComplete="off"
                      type="radio"
                      id="f"
                      name="gender"
                      placeholder="gender"
                      className=""
                      checked={userDetails.gender === "F"}
                      value={userDetails.gender}
                      onChange={onChange}
                    />
                    <label htmlFor="f" className="ml-2 inline-block">
                      Female
                    </label>
                  </div>
                  <div className="">
                    <input
                      autoComplete="off"
                      type="radio"
                      id="o"
                      name="gender"
                      placeholder="gender"
                      className="appearance-none text-slate-950"
                      value={userDetails.gender}
                      checked={userDetails.gender === "O"}
                      onChange={onChange}
                    />
                    <label htmlFor="o" className="ml-2 inline-block">
                      Prefer not to say
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-4/5 mx-auto text-left py-4"></div>

              <div className="w-full text-left py-4">
                <input
                  autoComplete="off"
                  type="submit"
                  value="Sign up"
                  className="block cursor-pointer w-1/2 mx-auto outline-none bg-green-400 text-black p-3 hover:scale-105 translate-all duration-200 font-medium hover:font-semibold text-center rounded-full "
                />
              </div>
            </form>
            <div className="border-b border-gray-400 w-3/4 my-4 mx-auto"></div>
            <p className="pt-8">
              <span className="text-gray-300 font-semibold">
                Don&apos;t have an account?{" "}
              </span>

              <Link
                to="/login"
                className="text-green-400 hover:text-green-400/90 font-semibold underline mx-auto">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
