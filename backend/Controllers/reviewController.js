import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";
import mongoose from "mongoose";

import { json } from "express";

export const getAllReviews = async (req, res) => {
    try{
        const reviews = await Review.find({});
        res.status(200).json({success: true, message:"successful", data: reviews});
    }
    catch(err){
        res.status(404).json({success: false, message: "not found"});
    }
};

// export const createReview = async (req, res) => {
//     if(!req.body.doctor) req.body.doctor = req.params.doctorId;
//     if (!req.body.user) req.body.user = req.userId;

//     const newReview = new Review(req.body);

//     try{
//         const savedReview = await newReview.save();

//         await Doctor.findByIdAndUpdate(req.body.doctor,{
//             $push: {reviews: savedReview._id},
//         });

//         res.status(200).json({success:true, message: "Review submitted", data: savedReview});
//     }
//     catch(err){
//         res.status(500).json({success:false, message: err.message});
//     }
// };


export const createReview = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        if (!doctorId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required." });
        }

        if (!req.userId) {
            return res.status(401).json({ success: false, message: "User must be logged in to submit a review." });
        }

        req.body.doctor = doctorId;
        req.body.user = req.userId;

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found." });
        }

        const newReview = new Review(req.body);
        await newReview.save();

        await Doctor.findByIdAndUpdate(doctorId, { $push: { reviews: newReview._id } });

        res.status(200).json({ success: true, message: "Review submitted successfully" });
    } catch (err) {
        console.error("Error in createReview:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};
