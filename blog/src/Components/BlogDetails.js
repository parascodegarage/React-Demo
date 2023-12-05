import React from "react";
import data from "../Data.json";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();

  const blogId = id;
  const selectedBlog = data.find((blog) => blog.id === blogId);
  if (!selectedBlog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="mt-24 ">
      <div className=" w-[70vw] mx-auto  text-white bg-[#7045b5] text-center p-[9rem] rounded-xl" >
      <div>
      <h2 className="text-8xl font-bold mb-2 ">
          {selectedBlog.title}
        </h2> 
      <div className="font-bold">
        By {selectedBlog.user} on {selectedBlog.date}
        </div>
        </div>
      </div>
      <div className="flex">
        
        <div className="px-44"></div>
        <div className="px-72 w-full ">
            <h4 className="mt-10 mb-6"> 
            {selectedBlog.content}
            </h4>
          <img
            src={selectedBlog.image}
            alt={selectedBlog.title}
            className="object-cover mb-4 rounded-lg w-full"
          />
          <div className="">
            <p className="text-lg text-black mb-4 mt-10">{selectedBlog.fullDetail}</p>
            <p className="text-sm text-black">
              By {selectedBlog.user} on {selectedBlog.date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
