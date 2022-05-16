const express = require("express");
const User = require("../models/userModel");
const Packege = require("../models/packegeModel");

const packegeControllers = {
  createPackege: async (req, res) => {
    try {
      const {  description, price, from,destination,img } = req.body;
      if ( !description || !price || !from || !destination ) {
        return res.status(400).json({ msg: "Invalid Packege Credentials." });
      }
      // if (!img) {
      //   return res.status(400).json({ msg: "No Image is Selected." });
      // }
      const hostPerson = await User.findOne({ _id: req.user.id });
    
      const newPackege = new Packege({
        host: hostPerson._id,
        description,
        price,
        from,
        destination,
        img
      });

      await newPackege.save();
      res.json({ msg: "Created a Packege." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },


  packegeList: async (req, res) => {
    try {
      const packeges = await Packege.find().select({
        host: 0,
        createdAt:0,
        updatedAt:0
      });

      res.json({
        status: "success",
        result: packeges.length,
        packeges: packeges,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },


  packegeDetails: async (req, res) => {
    try {
      const packege = await Packege.findOne({_id:req.params.id}).select({
        host: 0,
        createdAt:0,
        updatedAt:0
      }).populate('comments');

      res.json({
        status: "success",
        packege: packege,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },


  updatePackege:async (req, res) => {
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

};

module.exports = packegeControllers;