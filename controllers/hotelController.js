const express = require("express");
const User = require("../models/userModels");
const Packege = require("../models/packegeModel");
const jwt = require("jsonwebtoken");

const hotelControllers = {
  createRoom: async (req, res) => {
    try {
      const { host, description, price, from,destination,img } = req.body;
      if (!host || !description || !price || !from || !destination || !img) {
        return res.status(400).json({ msg: "Invalid Room Credentials." });
      }
      const hostPerson = await User.findOne({ _id: host });
    
      const newPackege = new Packege({
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