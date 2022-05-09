const express = require("express");
const bcrypt = require('bcrypt');
const User = require("../models/userModel")
const jwt = require("jsonwebtoken");


const userControllers = {

    register: async (req, res) => {

        try {
            const { fullName, userName, password, rePassword, role } =
                req.body;

            if (!fullName || !userName || !password || !rePassword) {
                return res.status(400).json({ message: "Invalid Creadentials." });
            }
            const userExit = await User.findOne({ userName });
            if (userExit) {
                return res.status(400).json({ message: "User Already Exists." });
            }
            if (password !== rePassword) {
                return res.status(400).json({ message: "Password Doesn't Match." });
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                fullName,
                userName,
                password: hashPassword,
                role,
            });
            await newUser.save()
            console.log(newUser);

            const accessToken = createAccessToken({ id: newUser._id, username: newUser.userName });
            const refreshToken = createRefreshToken({ id: newUser._id });
            console.log(accessToken, refreshToken);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
            });

            res.json({ accessToken });


        } catch (error) {
            console.log(error);
            return res.status(500).json({ mesasge: error.message });

        }
    },


    login: async (req, res) => {
        try {
            const { userName, password } =
                req.body;
            if (!userName || !password) {
                return res.status(400).json({ message: "Invalid Creadentials." });
            }
            const user = await User.findOne({ userName });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Password Doesn't Match." });
            }
            const accessToken = createAccessToken({ id: user._id });
            const refreshToken = createRefreshToken({ id: user._id });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,

            });

            res.json({ accessToken });
        } catch (err) {
            return res.status(500).json({ msg: error.message });

        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(400).json({ msg: "User Not Found." });
            }

            await User.findByIdAndDelete(req.params.id);
            res.json({ msg: "User Deleted." });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { fullName, role } = req.body;
            if (!fullName || !role) {
                return res.status(400).json({ msg: "Invalid User Credentials." });
            }

            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(400).json({ msg: "User Not Found." });
            }

            await User.findOneAndUpdate(
                { _id: req.params.id },
                { fullName, role }
            );
            res.json({ msg: "User is Updated." });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    refreshToken: (req, res) => {
        const rf_token = req.cookies.refreshToken;
        if (!rf_token) {
            return res.status(400).json({ msg: "Please Login or Register." });
        }
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json({ msg: "Please Login or Register." });
            }
            const accessToken = createAccessToken({ id: user.id });

            res.json({ accessToken });
        });
    }

}



const createAccessToken = (user) => {
    console.log(user);
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
    console.log(user);
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};


module.exports = userControllers;