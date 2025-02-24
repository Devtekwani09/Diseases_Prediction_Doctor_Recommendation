import Doctor from '../models/DoctorSchema.js'
import Bookings from '../models/BookingSchema.js'

export const updateDoctorr = async (req, res) => {
    const id = req.params.id;

    try{
        const updateDoctor = await Doctor.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true}
        );

        res.status(200).json({
            success:true,
            message:"Updated Successfully",
            data: updateDoctor
        });
    }
    catch(err){
        res.status(500).json({status:false, message:"failed to update"})
    }
}

export const deleteDoctor = async (req, res) => {
    const id = req.params.id;

    try{
        await Doctor.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:"Deleted Successfully",
        });
    }
    catch(err){
        res.status(500).json({status:false, message:"failed to Delete"})
    }
}

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;

    try{
        const doctor = await Doctor.findById(id).populate('reviews').select("-password");

        res.status(200).json({
            success:true,
            message:"Doctor found Successfully",
            data: doctor
        });
    }
    catch(err){
        res.status(500).json({status:false, message:"failed to find user"})
    }
}

// export const getAllDoctor = async (req, res) => {

//     try{

//         const {query} = req.query
//         let doctor;

//         if(query){
//             doctor = await Doctor.find({isApproved:'approved',
//             $or:[{name:{$regex: query, $optional:'i'}},
//                 {specialization:{$regex: query, $optional:'i'}}
//             ]}).select("-password");
//         }
//         else{
//             doctor = await Doctor.find({isApproved: "approved"}).select("-password");
//         }

        

//         res.status(200).json({
//             success:true,
//             message:"doctors found",
//             data: doctor
//         });
//     }
//     catch(err){
//         res.status(500).json({status:false, message:"failed to found"})
//     }
// }

export const getAllDoctor = async (req, res) => {
    try {
      const { query } = req.query;
      let doctors;
  
      if (query) {
        doctors = await Doctor.find({
          isApproved: "approved",
          $or: [
            { name: { $regex: query, $options: "i" } },
            { specialization: { $regex: query, $options: "i" } }
          ]
        }).select("-password");
      } else {
        doctors = await Doctor.find({ isApproved: "approved" }).select("-password");
      }
  
      res.status(200).json({
        success: true,
        message: "Doctors found",
        data: doctors
      });
    } catch (err) {
      console.error("Error fetching doctors:", err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch doctors"
      });
    }
  };
  

export const getDoctorProfile = async(req, res) => {
    const doctorId = req.userId

    try{
        const doctor = await Doctor.findById(doctorId)

        if(!doctor){
            return res.status(404).json({success:false, message:'Doctor not found'})
        }

        const appointments = await Bookings.find({doctor: doctorId})

        const {password, ...rest} = doctor._doc

        return res.status(200).json({success:true, message:'User found', data:{...rest, appointments}})
    }
    catch(err){
        return res.status(404).json({success:'false', message: "server error"})
    }
};

export const getDoctorsBySpecialty = async (req, res) => {
  try {
    let { specialty } = req.params;

    if (!specialty) {
      return res.status(400).json({ message: "Specialty is required" });
    }

    specialty = specialty.trim().toLowerCase();
    console.log("Requested specialty:", specialty);

    const doctors = await Doctor.find({
      specialization: { $regex: new RegExp(`^${specialty}$`, "i") }, // Match specialization
    })
      .sort({ rating: -1 }) // Sorting by rating (highest first)
      .limit(3) // Limit to top 3 doctors
      .exec();

    console.log("Top 3 doctors found:", doctors);

    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found for this specialty" });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


