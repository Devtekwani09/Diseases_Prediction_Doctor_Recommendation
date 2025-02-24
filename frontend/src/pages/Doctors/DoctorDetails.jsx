import React, { useEffect, useState } from 'react'
import doctorImg from '../../assets/images/doctor-img02.png'
import starIcon from '../../assets/images/Star.png'
import DoctorAbout from './DoctorAbout'
import Feedback from './Feedback'
import axios from "axios";
import SidePanel from './SidePanel'

import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData'
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { useParams } from 'react-router-dom'

const DoctorDetails = () => {
  const [tab, setTab] = useState('about')
  // const {id} = useParams()
  // console.log(id)
  // const url = `http://localhost:5000/api/v1/doctors/${id}`
  // console.log("url", url)
  // const { data, loading, error } = useFetchData(url);

  // console.log(data)
  // const doctors = data?.data || null

  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/doctors/${id}`);
      setDoctor(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, [id]);

  console.log(doctor)

  return <section>
    <div className='max-w-[1170px] px-5 mx-auto'>

      {loading && <Loader />}
      {error && <Error />}

      { !loading && !error &&
        <div className='grid md:grid-cols-3 gap-[50px]'>
        <div className='md:col-span-2'>
          <div className='flex items-center gap-5'>
            <figure className='max-w-[200px] max-h-[200px]'>
              <img src={doctor.photo} alt="" />
            </figure>

            <div>
              <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                {doctor.specialization}
              </span>

              <h3 className='text-headingColor text-[22px] leading-9 mt-3 font-bold'>
                {doctor.name}
              </h3>

              <div className='flex items-centergap-[6px]'>
                <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
                  <img src={starIcon} alt="" /> {doctor.averageRating}
                </span>
                <span className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>
                  ({doctor.totalRating})
                </span>
              </div>

              <p className='text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]'>
                {doctor.bio}
              </p>
            </div>
          </div>

          <div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
            <button 
            onClick={() => setTab('about')}
            className={`${tab==='about' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
              About
            </button>
            <button 
            onClick={() => setTab('feedback')}
            className={`${tab==='feedback' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
              Feedback
            </button>
          </div>

          <div className='mt-[50px]'>
            {
              tab==='about' && <DoctorAbout name={doctor.name} about={doctor.about} qualifications={doctor.qualifications} experiences={doctor.experiences}/>
            }
            {
              tab==='feedback' && <Feedback reviews={doctor.reviews} totalRating={doctor.totalRating}/>
            }
          </div>
        </div>

        <div>
          <SidePanel doctorId={doctor._id} ticketPrice={doctor.ticketPrice} timeSlots={doctor.timeSlots} totalRating={doctor.totalRating}/>
        </div>
      </div>
      }
    </div>
  </section>
}

export default DoctorDetails