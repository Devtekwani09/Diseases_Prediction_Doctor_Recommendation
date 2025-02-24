import React, { useState } from 'react';
import signupImg from '../assets/images/signup.gif';
import { Link, useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from '../utils/uploadCloudinary';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Signup = () => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "male",  // Set default gender
    role: "patient",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file selection and upload
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png"];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG and PNG formats are allowed!");
      return;
    }

    try {
      const data = await uploadImageToCloudinary(file);
      setPreviewUrl(data.url);
      setFormData((prev) => ({ ...prev, photo: data.url }));
    } catch (error) {
      toast.error("Image upload failed!");
    }
  };

  // Handle form submission
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Registration failed!");
      }

      toast.success(responseData.message);
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='px-5 xl:px-0'>
      <div className='max-w-[1170px] mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          
          {/* Image Section */}
          <div className='hidden lg:block bg-primaryColor rounded-l-lg'>
            <figure className='rounded-l-lg'>
              <img src={signupImg} className='w-full rounded-l-lg' alt="Signup" />
            </figure>
          </div>

          {/* Signup Form */}
          <div className='rounded-l-lg lg:pl-16 py-10'>
            <h3 className='text-headingColor text-[22px] font-bold mb-10'>
              Create an <span className='text-primaryColor'>account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className='mb-5'>
                <input 
                  type="text"
                  placeholder='Full Name'
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className='w-full py-3 border-b focus:border-b-primaryColor text-[16px]'
                  required
                />
              </div>

              <div className='mb-5'>
                <input 
                  type="email"
                  placeholder='Enter Your Email'
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full py-3 border-b focus:border-b-primaryColor text-[16px]'
                  required
                />
              </div>

              <div className='mb-5'>
                <input 
                  type="password"
                  placeholder='Password'
                  name="password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  className='w-full py-3 border-b focus:border-b-primaryColor text-[16px]'
                  required
                />
              </div>

              {/* Role & Gender Selection */}
              <div className='mb-5 flex items-center justify-between'>
                <label className='text-headingColor font-bold text-[16px]'>
                  Role:
                  <select 
                    name="role" 
                    value={formData.role} 
                    onChange={handleInputChange} 
                    className='ml-2 px-4 py-2 text-[15px]'>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>

                <label className='text-headingColor font-bold text-[16px]'>
                  Gender:
                  <select 
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleInputChange} 
                    className='ml-2 px-4 py-2 text-[15px]'>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              {/* Image Upload */}
              <div className='mb-5 flex items-center '>
                {previewUrl && (
                  <figure className='w-[60px] h-[60px] rounded-full border-2 border-primaryColor flex items-center justify-center'>
                    <img src={previewUrl} alt="Preview" className='w-full rounded-full' />
                  </figure>
                )}

                <div className='relative w-[130px] h-[50px]'>
                  <input 
                    type="file"
                    name='photo'
                    id='customFile'
                    onChange={handleFileInputChange}
                    accept='.jpg, .png'
                    className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                  />
                  <label 
                    htmlFor="customFile" 
                    className='absolute top-0 left-0 w-full h-full flex items-center px-3 py-2 text-[15px] bg-[#0066ff46] text-headingColor font-semibold rounded-lg cursor-pointer'
                  >
                    Upload Photo
                  </label>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className='mt-7'>
                <button 
                  disabled={loading} 
                  type='submit' 
                  className='w-full bg-primaryColor text-white text-[18px] rounded-lg px-4 py-3 flex justify-center'
                >
                  {loading ? <HashLoader size={30} color="#ffffff" /> : "Sign Up"}
                </button>
              </div>

              <p className='mt-5 text-textColor text-center'>
                Have an account 
                <Link to='/login' className='text-primaryColor font-medium ml-1'>
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
