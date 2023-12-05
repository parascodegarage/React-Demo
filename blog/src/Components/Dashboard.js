import React, { useState } from "react";
import data from "../Data.json";
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const Dashboard = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    if (inputValue.length > 0) {
      const searchQuery = inputValue.toLowerCase();
      const filtered = data.filter((d) =>
        d.title.toLowerCase().includes(searchQuery)
      );
      setFilteredData(filtered);

      setSearchHistory((prevHistory) => [...new Set([inputValue, ...prevHistory])]);
    } else {
      setFilteredData([]);
    }
  };

  const handleHistoryItemHover = (index) => {
    setSelectedHistory(index);
  };

  const handleHistoryItemClick = (historyItem) => {
    setSearchInput(historyItem);
    setSelectedHistory(null);
  };

  return (
    <>
      <div
        className="bg-cover bg-center p-40"
        style={{ backgroundImage: 'url("https://blog.logrocket.com/wp-content/themes/logrocket/assets/blog-header.png")' }}
      >
        <h1 className="text-center text-white font-sans-serif text-5xl font-bold">LogRocket Blog</h1>
        <span className="text-white font-sans-serif text-base font-bold items-center flex justify-center">The latest industry news, interviews, technologies, and resources</span>
      </div>
      <div className="flex justify-center gap-4">
        <div className="flex flex-col">
          <div className="sticky top-20  bg-white p-4">
            <div className="flex justify-center items-center p-2">
              <input
                className="block w-full rounded-lg border border-[#E5E7EB] p-2 pl-10 md:w-[300px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 text-base h-10"
                type="search"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput}
              />
              <div className="absolute top-9 bottom-0 m-auto left-8">
                <FaSearch />
              </div>
            </div>
            <div className="absolute top-12 left-5 w-72 bg-white z-10 mt-4">
        <div className="mb-4 max-h-40 overflow-y-scroll">
          {searchHistory.map((historyItem, index) => (
            <div
              key={index}
              className={`${
                selectedHistory === index ? "bg-gray-200 " : "bg-white"
              } p-3 cursor-pointer `}
              onMouseEnter={() => handleHistoryItemHover(index)}
              onMouseLeave={() => handleHistoryItemHover(null)}
              onClick={() => handleHistoryItemClick(historyItem)}
            >
              {historyItem}
            </div>
          ))}
        </div>
      </div>
            <div>
              {filteredData.map((blog) => (
                <div key={blog.id}>
                  <p>{blog.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-12 text-black">
          {filteredData.length > 0
            ? filteredData.map((blog) => (
                <div key={blog.id} className="mb-8 p-4">
                  <Link to={`/blog/${blog.id}`}>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-[420px] h-[280px] object-cover mb-4 rounded-lg"
                    />
                  </Link>
                  <h2 className="text-4xl font-bold mb-2 text-black w-[420px]">
                    {blog.title}
                  </h2>
                  <p className="text-lg text-black mb-4 w-[420px]">
                    {blog.content}
                  </p>
                  <p className="text-sm text-black w-[420px]">
                    By {blog.user} on {blog.date}
                  </p>
                </div>
              ))
            : data.map((blog) => (
                <div key={blog.id} className="mb-8 p-4">
                  <Link to={`/blog/${blog.id}`}>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-[420px] h-[280px] object-cover mb-4 rounded-lg"
                    />
                  </Link>
                  <h2 className="text-4xl font-bold mb-2 text-black w-[420px]">
                    {blog.title}
                  </h2>
                  <p className="text-lg text-black mb-4 w-[420px]">
                    {blog.content}
                  </p>
                  <p className="text-sm text-black w-[420px]">
                    By {blog.user} on {blog.date}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
