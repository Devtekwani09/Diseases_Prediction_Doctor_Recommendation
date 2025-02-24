import User from '../models/UserSchema.js'
import Bookings from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js';

export const updateUser = async (req, res) => {
    const id = req.params.id;

    try{
        const updateUser = await User.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true}
        );

        res.status(200).json({
            success:true,
            message:"Updated Successfully",
            data: updateUser
        });
    }
    catch(err){
        res.status(500).json({status:false, message:"failed to update"})
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try{
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:"Deleted Successfully",
        });
    }
    catch(err){
        res.status(500).json({status:false, message:"failed to Delete"})
    }
}

export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try{
        const user = await User.findById(id).select("-password");

        res.status(200).json({
            success:true,
            message:"user found Successfully",
            data: user
        });
    }
    catch(err){
        res.status(500).json({status:false, message:"failed to find user"})
    }
}

export const getAllUser = async (req, res) => {

    try{
        const users = await User.find({}).select("-password");

        res.status(200).json({
            success:true,
            message:"Users found",
            data: users
        });
    }
    catch(err){
        res.status(500).json({status:false, message:"failed to found"})
    }
}

export const getUserProfile = async(req, res) => {
    const userId = req.userId

    try{
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({success:false, message:'User not found'})
        }

        const {password, ...rest} = user._doc

        return res.status(200).json({success:true, message:'User found', data:{...rest}})
    }
    catch(err){
        return res.status(404).json({success:'false', message: "server error"})
    }
};

export const getMyAppoinments = async(req, res) => {
    try{
        const bookings = await Bookings.find({user: req.userId});

        const doctorIds = bookings.map(el => el.doctor.id);

        const doctors = await Doctor.find({_id: {$in: doctorIds}}).select("-password");

        res.status(200).json({success:true, message:'fetched appointments', data: doctors})
    }
    catch(err){
        return res.status(404).json({success:'false', message: "server error"})
    }
}