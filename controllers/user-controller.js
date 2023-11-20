import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Bookings from "../models/Bookings.js";

export const getAllUsers = async (req,res,next) => {
    let users;
    try{
        users= await User.find()
    } catch (err) {
      return console.log(err);
    }

    if(!users) {
      return res.status(500).json({ message:"Unexpected Error Occured"});
    }

    return res.status(200).json({ users });
};

export const signup = async(req, res, next) => {
  const {name,phone,email,password } = req.body;
  if(
    !name &&
    name.trim()==="" && 
    !phone && 
    phone.trim()==="" && 
    !email && 
    email.trim()==="" && 
    !password && 
    password.trim()===""
    ){
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  let user;
  try {

    user=new User({name,phone,email,password:hashedPassword });
    user = await user.save();

   } catch (err){
    return console.log(err);
  }
  if(!user){
    return res.status(500).json({message:"Unexpected Error Occured"});
  }
  return res.status(201).json({ user })
};
export const updateUser = async(req,res,next) =>{
  const id = req.params.id;
  const {name,phone,email,password } = req.body;
  if(
    !name &&
    name.trim()==="" && 
    !phone && 
    phone.trim()==="" && 
    !email && 
    email.trim()==="" && 
    !password && 
    password.trim()===""
    ){
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  let user;
  try { 
    user= await User.findByIdAndUpdate(id,{name,phone,email,password })
  }catch(err){
    return console.log(err);
  }
  if(!user) {
    return res.status(500).json({ message:"Something went wrong" });
  }

  return res.status(200).json({ message:"Updated Successfully" });

};

export const deleteUser = async(req,res,next) =>{
  const id = req.params.id;
  let user;
  try{
    user = await User.findByIdAndDelete(id);
   }catch(err){
    return console.log(err);
  }
  if(!user) {
    return res.status(500).json({ message:"Something went wrong" });
  }

  return res.status(200).json({ message:"Deleted Successfully" });
};

export const login = async(req,res,next) => {
  const { email,password } = req.body;
  if(!email && email.trim()==="" && !password && password.trim()===""){
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try{
    existingUser = await User.findOne({ email });
   }catch(err){
    return console.log(err);
  }

  if(!existingUser){
    return res.status(404).json({message:"Unable to find user from this ID"});
  }
  const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
  
  if(!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

    return res.status(200).json({ message: "Login Successfully" });
};

export const getBookingsofUser= async(req,res,next)=>{
  const id =  req.params.id;
  let bookings;
  try{
    bookings = await bookings.find({user: id})
    .populate("movie")
    .populate("user");
  }catch (err){
    return console.log(err);
  }

};

export const getUserById = async (req,res,next) => {
  const id= req.params.id;
  let user;
  try{
      user= await User.findById(id)
  } catch (err) {
    return console.log(err);
  }

  if(!user) {
    return res.status(500).json({ message:"Unexpected Error Occured"});
  }

  return res.status(200).json({ user });
};
