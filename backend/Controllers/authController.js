import User from  '../models/UserSchema.js'
import Doctor  from '../models/DoctorSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = user =>{
    return jwt.sign({id:user.id, role:user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn:'15d',
    })
}

export const register = async(req, res) => {
    const{email, password, name, role, photo, gender} = req.body
    try{
        let user = null;

        if(role === 'patient'){
            user = await User.findOne({email})
        }
        else if(role === 'doctor'){
            user = await Doctor.findOne({email})
        }

        //check if user exist 
        if(user){
            return res.status(400).json({message: 'User already exits'})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        if(role === 'patient'){
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            })
        }

        if(role === 'doctor'){
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            })
        }

        await user.save()

        res.status(200).json({Success: true, message:'User successfully created'})

    }
    catch (err) {
        console.error(`Error in register: ${err.message}`);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
}
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in either the User or Doctor collection
        let user = await User.findOne({ email });
        if (!user) {
            user = await Doctor.findOne({ email });
        }

        // If user does not exist, return an error
        if (!user) {
            return res.status(400).json({ status: false, message: "User does not exist with the provided email." });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid password. Please try again." });
        }

        // Generate a JWT token
        const token = generateToken(user);

        // Exclude sensitive fields (rename or remove `password` safely)
        const { password: hashedPassword, ...rest } = user._doc;

        res.status(200).json({
            status: true,
            message: "Login successful",
            token,
            data: rest,
            role: user.role,
        });
    } catch (err) {
        console.error(`Error in login: ${err.message}`);
        res.status(500).json({
            status: false,
            message: "Failed to login",
        });
    }
};
