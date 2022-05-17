const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Hotel = require("../models/hotelModel")
const Room = require("../models/roomModel")
const RoomBooking = require("../models/roomBooking")
const hotelControllers = {
  createPackege: async (req, res) => {
    try {
      const { host, description, price, from,destination,img } = req.body;
      if (!host || !description || !price || !from || !destination || !img) {
        return res.status(400).json({ msg: "Invalid Room Credentials." });
      }
      const hostPerson = await User.findOne({ _id: host });
    
      const newPackege = new Hotel({
        host: hostPerson._id,
        description,
        price,
        from,
        destination,
        img
      });

      await newPackege.save();
      res.json({ msg: "Created a Room." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },




  createRoom: async (req, res) => {
    try {
      const { title,price,category,description,hotelName} = req.body;
      if (  !description || !price || !category ||  !title) {
        return res.status(400).json({ msg: "Invalid Room Credentials." });
      }
      const hotelManager = await Hotel.findOne({ manager: req.user.id });
      console.log(hotelManager);

      if(!hotelManager.isHotel){
        return res.status(400).json({ msg: "Hotel Manager Can not Permission to add any Room" });
      }
      const newRoom = new Room({
        hotel: req.params.id,
        description,
        title,
        category,
        price,
     
      });
      await newRoom.save();

      await  Hotel.updateOne({
        _id:hotelManager._id
      },{
        $push:{
          rooms:newRoom._id
        }
      })
  

     
      res.json({ msg: "Room was Successfully Created",result: newRoom });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },



  roomBooking:async (req, res) => {
    try {
        const { price,category,phoneNumber,address,checkout} = req.body;
        if (!price || !category || !phoneNumber || !address  || !checkout) {
            return res.status(400).json({ msg: "Invalid Room Booking Credentials." });
        }
        const user = req.user.id;
        const author = await User.findOne({ _id: user });
        const newBooking = new RoomBooking({
          user,
          room:req.params.id,
          price,
          category,
          phoneNumber,
          address,
          checkout
        })

        await newBooking.save()
        res.json({ msg: "Your Room Booked Successfully done" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
},


roomBookingPayment:async (req, res) => {
  try {
      const { isPaid } = req.body;
      
      const user = req.user.id;
      const author = await User.findOne({ _id: user });
      const roomBooking = await RoomBooking.findById(req.params.id);
      if (!roomBooking) {
        return res.status(400).json({ msg: "Room Booking Not Found" });
      }

      await RoomBooking.findOneAndUpdate(
        { _id: req.params.id },
        { isPaid:true }
      );
      await Room.findOneAndUpdate(
        { _id: roomBooking.room },
        { booked:true}
      );
      res.json({ msg: "Your Payment Successfully done" });
  } catch (error) {
      return res.status(500).json({ msg: error.message });
  }
},

  addHotel: async (req, res) => {
    try {
      const { hotelName,email, description, category } = req.body;
      console.log(hotelName,email, description, category,);
      if (!hotelName || !description || !email || !category ) {
        return res.status(400).json({ msg: "Invalid Hotel Credentials." });
      }
      const exitHotel = await Hotel.findOne({ email: email });
      if (exitHotel) {
        return res.status(400).json({ msg: "Manager already hotel added." });
      }
      const newHotel = new Hotel({
        manager: req.user.id,
        description,
        hotelName,
        email,
        category,
      });

      await newHotel.save();
      res.json({ msg: "Request for Hotel Add" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },







  hotelList: async (req, res) => {
    try {
      const hotels = await Hotel.find().select({
        manager: 0,
        isHotel:0,
        rooms:0,
        createdAt:0,
        updatedAt:0
      });

      res.json({
        status: "success",
        result: hotel.length,
        hotels: hotels,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },





  hotelDetails: async (req, res) => {
    try {
      const hotel = await Hotel.find({_id:req.params.id}).select({
        manager: 0,
        isHotel:0,
        createdAt:0,
        updatedAt:0
      }).populate('rooms');

      res.json({
        status: "success",
        result: hotel.length,
        hotel: hotel,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },


  roomDetails: async (req, res) => {
    try {
      const room = await Room.find({_id:req.params.id}).select({
        hotel: 0,
        createdAt:0,
        updatedAt:0
      });

      res.json({
        status: "success",
        result: room.length,
        room: room,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },


  addRating:async(req,res)=>{
    try {
      const { rating, comment } = req.body;
      if (!rating || !comment) {
        return res.status(400).json({ msg: "Invalid Comment." });
      }
      const hotel = await Hotel.findById(req.params.id);

      if (!hotel) {
        return res.status(400).json({ msg: "Hotel Not Found." });
      }
      const user = req.user.id;
      const author = await User.findOne({ _id: user });
      console.log(hotel);

      hotel.rating.push({
        user:user,
        rating,
        comment,
        author: author.fullName,
      });
      hotel.save();

      res.json({
        status: "Successfully Commented",
        
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },







  getMentorAssesments: async (req, res) => {
    try {
      // console.log(req.user);
      const assesments = await Assesment.find({ mentor: req.user.id });
      console.log(assesments.length);

      res.json({
        status: "success",
        result: assesments.length,
        assesments: assesments,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },





};

module.exports = hotelControllers;