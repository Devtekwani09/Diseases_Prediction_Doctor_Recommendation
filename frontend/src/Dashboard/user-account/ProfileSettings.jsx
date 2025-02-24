import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL, token } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import { authContext } from '../../context/Authcontext';


const ProfileSettings = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: '',
    gender: 'male', // Default gender
    bloodType: '',
  });

  // Populate form data when `user` is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        photo: user.photo || '',
        gender: user.gender || 'male',
        bloodType: user.bloodType || '',
      });
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file selection and upload
  // const handleFileInputChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   const allowedTypes = ['image/jpeg', 'image/png'];
  //   if (!allowedTypes.includes(file.type)) {
  //     toast.error('Only JPG and PNG formats are allowed!');
  //     return;
  //   }

  //   try {
  //     const data = await uploadImageToCloudinary(file);
  //     setFormData((prev) => ({ ...prev, photo: data.url }));
  //     dispatch({ type: 'UPDATE_PROFILE_PICTURE', payload: { profileImage: newImageUrl } });
  //   } catch (error) {
  //     toast.error('Image upload failed!');
  //   }
  // };
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG and PNG formats are allowed!');
      return;
    }
  
    try {
      const data = await uploadImageToCloudinary(file);
      setFormData((prev) => {
        const updatedData = { ...prev, photo: data.url };
        dispatch({ type: 'UPDATE_PROFILE_PICTURE', payload: { profileImage: data.url } });
        return updatedData;
      });
    } catch (error) {
      toast.error('Image upload failed!');
    }
  };

  // Handle form submission
  // const submitHandler = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   try {
  //     // Filter out unchanged fields
  //     const updatedData = Object.fromEntries(
  //       Object.entries(formData).filter(([_, value]) => value !== '')
  //     );

  //     const res = await fetch(`${BASE_URL}/users/${user.data._id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(updatedData),
  //     });

  //     const responseData = await res.json();

  //     if (!res.ok) {
  //       throw new Error(responseData.message || 'Update failed!');
  //     }

  //     toast.success(responseData.message);
  //     navigate('/users/profile/me');
  //   } catch (err) {
  //     toast.error(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      // Filter out unchanged fields (avoid sending empty fields)
      const updatedData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== '')
      );
  
      // Use user._id directly
      const res = await fetch(`${BASE_URL}/users/${user._id}`, { // Use user._id instead of user.data._id
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      const responseData = await res.json();
  
      if (!res.ok) {
        throw new Error(responseData.message || 'Update failed!');
      }
  
      toast.success(responseData.message);
      navigate('/users/profile/me'); // Redirect to the updated profile page
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className='mt-10'>
      <form onSubmit={submitHandler}>
        {/* Name Input */}
        <div className='mb-5'>
          <input
            type='text'
            placeholder='Full Name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            className='w-full py-3 border-b focus:border-b-primaryColor text-[16px]'
            required
          />
        </div>

        {/* Email Input */}
        <div className='mb-5'>
          <input
            type='email'
            placeholder='Enter Your Email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            className='w-full py-3 border-b focus:border-b-primaryColor text-[16px]'
            required
          />
        </div>

        {/* Password Input (Optional) */}
        <div className='mb-5'>
          <input
            type='password'
            placeholder='Password (Leave blank to keep the same)'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            className='w-full py-3 border-b focus:border-b-primaryColor text-[16px]'
          />
        </div>

        {/* Blood Type Input */}
        <div className='mb-5'>
          <input
            type='text'
            placeholder='Blood Type'
            name='bloodType'
            value={formData.bloodType}
            onChange={handleInputChange}
            className='w-full py-3 border-b focus:border-b-primaryColor text-[16px]'
            required
          />
        </div>

        {/* Gender Selection */}
        <div className='mb-5 flex items-center justify-between'>
          <label className='text-headingColor font-bold text-[16px]'>
            Gender:
            <select
              name='gender'
              value={formData.gender}
              onChange={handleInputChange}
              className='ml-2 px-4 py-2 text-[15px]'
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </label>
        </div>

        {/* Image Upload */}
        <div className='mb-5 flex items-center gap-3'>
          {formData.photo && (
            <figure className='w-[60px] h-[60px] rounded-full border-2 border-primaryColor flex items-center justify-center'>
              <img src={formData.photo} alt='Preview' className='w-full rounded-full' />
            </figure>
          )}

          <div className='relative w-[130px] h-[50px]'>
            <input
              type='file'
              name='photo'
              id='customFile'
              onChange={handleFileInputChange}
              accept='.jpg, .png'
              className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
            />
            <label
              htmlFor='customFile'
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
            {loading ? <HashLoader size={30} color='#ffffff' /> : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
