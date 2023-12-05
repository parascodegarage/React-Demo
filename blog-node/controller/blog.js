const { Blog } = require("../model/Blog");
const path = require("path");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

userAddBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imagePath = req.file.path;
    const auther = req.user;
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const newBlog = new Blog({
      title,
      content,
      imagePath,
      auther,
    });

    await newBlog.save();
    res.status(200).json({ message: "Blog added successfully",newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

blogList = async (req, res) => {
  try {
    const Blogs = await Blog.find({});
    if (!Blogs) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "List of All Users", Blogs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

deleteBlog = async (req, res) => {
  try {
    const user = req.user;
   

    const userIds = user;


    const blog = await Blog.findOne({ auther: userIds });
   

    if (!blog.auther.toString()) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }


    if (blog.auther.toString() !== user) {
      return res
        .status(403)
        .json({ message: "You are not authorized to get this Blog" });
    }

    await blog.deleteOne();
    res.status(202).json({ message: "Blog deleted", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imagePath = req.file.path;
    const auther = req.user;

    const blogs = await Blog.findOne({ auther });

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    blogs.title = title;
    blogs.content = content;
    blogs.imagePath = imagePath;

    await blogs.save();

    res.status(200).send("Blog data updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { userAddBlog, blogList, deleteBlog, updateBlog };
