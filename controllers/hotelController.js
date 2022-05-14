const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Hotel = require("../models/hotelModel")
const Room = require("../models/roomModel")
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





  updateAssesment:async (req, res) => {
    try {
        const { title,description, deadline_at} = req.body;
        if (!title || !description) {
            return res.status(400).json({ msg: "Invalid Assesment Credentials." });
        }

        const assesment = await Assesment.findById(req.params.id);
        if (!assesment) {
            return res.status(400).json({ msg: "Assesment Not Found." });
        }

        await Assesment.findOneAndUpdate(
            { _id: req.params.id },
            { title, description,deadline_at}
        );
        res.json({ msg: "Assesment is Updated." });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
},


  getAssesments: async (req, res) => {
    try {
      const assesments = await Assesment.find().select({
        mentor: 0,
        created_at: 0,
        createdAt:0,
        updatedAt:0
      });

      res.json({
        status: "success",
        result: assesments.length,
        assesments: assesments,
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