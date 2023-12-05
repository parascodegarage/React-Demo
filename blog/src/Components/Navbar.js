import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex  justify-center">
      <nav className=" bg-gray-300 fixed w-[1280px]  rounded-xl p-4">
      <div className="flex items-center justify-between">
      <Link to="/">
        <img
          src="/blog.png"
          alt="LogRocket blog logo"
          className="w-36 h-9 object-cover"
        />
        </Link>
        <div className="flex order-2">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-red-800  rounded-lg  px-4 py-2 text-center "
          >
            <Link to="/monitoring">Start Monitoring For Free</Link>
          </button>
        </div>
        <div className="flex md:order-2">
          <Link
            to="/signin"
            className="block py-2 px-3 text-white bg-gray-700 rounded md:bg-transparent md:text-blue-700"
          >
            Sign In
          </Link>
        </div>

        <div className="items-center">
          <ul className="flex">
            <li>
              <Link
                to="/blog"
                className="block py-2 px-3 text-white  rounded md:bg-transparent md:text-blue-700"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="block py-2 px-3 text-white  rounded md:bg-transparent md:text-blue-700"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/solutions"
                className="block py-2 px-3 text-white  rounded md:bg-transparent md:text-blue-700"
              >
                Solutions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
