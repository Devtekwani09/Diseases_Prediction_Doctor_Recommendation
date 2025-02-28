import React, { useEffect, useState } from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import uploadImageToCloudinary from '../../utils/uploadCloudinary'
import { BASE_URL , token} from '../../config'
import { toast } from 'react-toastify'

const Profile = ({doctorData}) => {

    const [formData, setFormData] = useState({
        name:'',
        email: '',
        phone: '',
        password:'',
        bio:'',
        gender:'',
        specialization: '',
        ticketPrice: 0,
        qualifications:[],
        experiences:[],
        timeSlots:[],
        about:'',
        photo:null
    })

    useEffect(()=>{
        setFormData({
            name:doctorData?.data.name,
            email: doctorData?.data.email,
            phone: doctorData?.data.phone,
            bio: doctorData?.data.bio,
            gender: doctorData?.data.gender,
            specialization: doctorData?.data.specialization,
            ticketPrice: doctorData?.data.ticketPrice,
            qualifications:doctorData?.data.qualifications,
            experiences:doctorData?.data.experiences,
            timeSlots:doctorData?.data.timeSlots,
            about:doctorData?.data.about,
            photo:doctorData?.data.photo
        })
    }, [doctorData])

    const handleInputChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleFileInputChange = async event => {
        const file = event.target.files[0]
        const data = await uploadImageToCloudinary(file);

        console.log(data)
        setFormData({...formData, photo:data?.url})
    }

    const updateProfileHandler = async e => {
        e.preventDefault();
    
        try {
            console.log("form data \n", formData)
            const res = await fetch(`${BASE_URL}/doctors/${doctorData.data._id}`, {  // Add await here
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
    
            const result = await res.json();
    
            if (!res.ok) {
                throw new Error(result.message);
            }
    
            toast.success(result.message);
        } catch (err) {
            toast.error(err.message);
        }   
    } 

    const addItem = (key, item) => {
        setFormData(prevFormData => ({
            ...prevFormData, 
            [key]: [...prevFormData[key], item]  // Append new item to the array
        }));
    };

    const handleReuseableInputChangeFunction = (key, index, event) => {
        const{name, value} = event.target

        setFormData(prevFormData => {
            const updateItems = [...prevFormData[key]]

            updateItems[index][name] = value

            return {
                ...prevFormData,
                [key]:updateItems,
            }
        })
    }

    const deleteItem = (key, index) => {
        setFormData(prevFormData => ({
            ...prevFormData, [key]:[...prevFormData[key].filter((_,i)=> i!==index)]
        }))
    }

    const addQualification = e => {
        e.preventDefault();

        addItem('qualifications', {
            startingDate:'', endingDate:'', degree:'', university:''
        })
    }

    const handleExperienceChange = (event, index) => {
        handleReuseableInputChangeFunction('experiences', index, event)
    }

    const deleteExperience = (e, index)=>{
        e.preventDefault()

        deleteItem('experiences',index )
    }

    const addExperience = e => {
        e.preventDefault();

        addItem('experiences', {
            startingDate:'', endingDate:'', position:'', hospital:''
        })
    }

    const handleQualificationChange = (event, index) => {
        handleReuseableInputChangeFunction('qualifications', index, event);
    };
    

    const deleteQualification = (e, index) => {
        e.preventDefault();
        deleteItem('qualifications', index);
    };

    const addTimeSlot = e => {
        e.preventDefault();

        addItem('timeSlots', {
            day:'', startingTime:'', endingTime:''
        })
    }

    const handleTimeSlotChange = (event, index) => {
        handleReuseableInputChangeFunction('timeSlots', index, event);
    };

    const deleteTimeSlot = (e, index)=>{
        e.preventDefault()

        deleteItem('timeSlots',index )
    }

  return (
    <div>
        <h2 className='text-headingColor font-bold text-[24px] leading-9 mb-10'>
            Profile Information
        </h2>

        <form className=" w-full bg-white p-6 rounded-lg shadow-md">
            <div className="mb-5">
                <p className="text-gray-700 font-semibold mb-2">Name*</p>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <div className="mb-5">
                <p className="text-gray-700 font-semibold mb-2">Email*</p>
                <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <div className="mb-5">
                <p className="text-gray-700 font-semibold mb-2">Phone*</p>
                <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <div className="mb-5">
                <p className="text-gray-700 font-semibold mb-2">Bio*</p>
                <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Bio"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                maxLength={100}
                />
            </div>

            <div className="mb-5">
                <div className='grid grid-cols-3 gap-5 mb-[30px]'>
                    <div>
                        <p className='text-gray-700 font-semibold mb-2'>Gender*</p>
                        <select name="gender" value={formData.gender} onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <p className='text-gray-700 font-semibold mb-2'>Specialization*</p>
                        <select name="specialization" value={formData.specialization} onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'
                        >
                            <option value="">Select</option>
                            <option value="surgeon">Surgeon</option>
                            <option value="neurologist">Neurologist</option>
                            <option value="dermatologist">Dermatologist</option>
                        </select>
                    </div>

                    <div>
                    <p className='text-gray-700 font-semibold mb-2'>Ticket Price*</p>
                        <input
                            type="number"
                            name="ticketPrice"
                            value={formData.ticketPrice}
                            onChange={handleInputChange}
                            placeholder=""
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className='mb-5'>
                <p className='text-gray-700 font-semibold mb-2'>Qualifications*</p>
                {formData.qualifications?.map((item, index) => (<div key={index}>
                    <div>
                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <p className='text-gray-700 font-semibold mb-2'>Starting Date*</p>
                                <input 
                                    type="date" 
                                    name='startingDate' 
                                    value={item.startingDate}
                                    onChange={e => handleQualificationChange(e, index)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <p className='text-gray-700 font-semibold mb-2'>Ending Date*</p>
                                <input 
                                    type="date" 
                                    name='endingDate' 
                                    value={item.endingDate}
                                    onChange={e => handleQualificationChange(e, index)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <p className='text-gray-700 font-semibold mb-2'>Degree*</p>
                                <input 
                                    type="text" 
                                    name='degree' 
                                    value={item.degree}
                                    onChange={e => handleQualificationChange(e, index)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <p className='text-gray-700 font-semibold mb-2'>University*</p>
                                <input 
                                    type="text" 
                                    name='university' 
                                    value={item.university}
                                    onChange={e => handleQualificationChange(e, index)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <button onClick={e => deleteQualification(e,index)} className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'>
                            <AiOutlineDelete/>
                        </button>
                    </div>
                </div>))}

                <button onClick={addQualification} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>Add Qualification</button>
            </div>


            <div className='mb-5'>
                <p className='text-gray-700 font-semibold mb-2'>Experiences*</p>
                {formData.experiences?.map((item, index) => (<div key={index}>
                    <div>
                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <p className='text-gray-700 font-semibold mb-2'>Starting Date*</p>
                                <input 
                                    type="date" 
                                    name='startingDate' 
                                    value={item.startingDate}
                                    onChange={e => handleExperienceChange(e, index)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <p className='text-gray-700 font-semibold mb-2'>Ending Date*</p>
                                <input 
                                    type="date" 
                                    name='endingdate' 
                                    value={item.endingDate}
                                    onChange={e => handleExperienceChange(e, index)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <p className='text-gray-700 font-semibold mb-2'>Positon*</p>
                                <input 
                                    type="text" 
                                    name='position' 
                                    value={item.position}
                                    onChange={e => handleExperienceChange(e, index)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <p className='text-gray-700 font-semibold mb-2'>Hospital*</p>
                                <input 
                                    type="text" 
                                    name='hospital' 
                                    value={item.hospital}
                                    onChange={e => handleExperienceChange(e, index)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <button onClick={e => deleteExperience(e, index)} className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'>
                            <AiOutlineDelete/>
                        </button>
                    </div>
                </div>))}

                <button onClick={addExperience} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>Add Expirience</button>
            </div>


            <div className='mb-5'>
                <p className='text-gray-700 font-semibold mb-2'>Time Slot*</p>
                {formData.timeSlots?.map((item, index) => (<div key={index}>
                    <div>
                        <div className='grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5'>
                            <div>
                                <p className='text-gray-700 font-semibold mb-2'>Day*</p>
                                <select name="day" value={item.day} onChange={e => handleTimeSlotChange(e, index)} className='w-full px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" py-3.5'>
                                    <option value="">Select</option>
                                    <option value="saturday">Saturday</option>
                                    <option value="sunday">Sunday</option>
                                    <option value="monday">Monday</option>
                                    <option value="tuesday">Tuesday</option>
                                    <option value="wednesday">Wednesday</option>
                                    <option value="thursday">Thursday</option>
                                    <option value="friday">Friday</option>
                                </select>
                            </div>
                            <div>
                                <p className='text-gray-700 font-semibold mb-2'>Starting Time*</p>
                                <input 
                                    type="time" 
                                    name='startingTime' 
                                    value={item.startingTime}
                                    onChange={e => handleTimeSlotChange(e, index)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <p className='text-gray-700 font-semibold mb-2'>Ending Time*</p>
                                <input 
                                    type="time" 
                                    name='endingTime' 
                                    value={item.endingTime}
                                    onChange={e => handleTimeSlotChange(e, index)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className='flex items-center'>
                                <button onClick={e => deleteTimeSlot(e, index)} className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-6 mb-[30px] cursor-pointer'>
                                    <AiOutlineDelete/>
                                </button>
                            </div>
                        </div>

                        
                    </div>
                </div>))}

                <button onClick={addTimeSlot} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>Add Time Slot</button>
            </div>

            <div className="mb-5">
                <p className='text-gray-700 font-semibold mb-2'>About</p>
                <textarea name="about" rows={5} value={formData.about} placeholder='Write about you'
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={handleInputChange}
                ></textarea>
            </div>

            <div className="mb-5 flex items-center gap-3">
            <div className='mb-5 flex items-center '>
                {formData.photo && (
                  <figure className='w-[60px] h-[60px] rounded-full border-2 border-primaryColor flex items-center justify-center'>
                    <img src={formData.photo} alt="Preview" className='w-full rounded-full' />
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
            </div>

            <div className='mt-7'>
                <button type='submit' onClick={updateProfileHandler} className='bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg'>
                    Update Profile
                </button>
            </div>
        </form>

    </div>
  )
}

export default Profile