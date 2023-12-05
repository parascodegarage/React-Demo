const express=require('express');
const app=express();
const mongoose=require("mongoose");

const conn=mongoose.connect('mongodb://127.0.0.1:27017/Blog');

if (!conn) {
	console.log("Not connected");
} else {
	console.log("Database Connected succussfully!");
}
module.exports=conn
