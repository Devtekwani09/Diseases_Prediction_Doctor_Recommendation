import React from 'react';
import heroImg01 from '../assets/images/hero-img01.png';
import heroImg02 from '../assets/images/hero-img02.png';
import heroImg03 from '../assets/images/hero-img03.png';
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import About from '../components/About/About';
import ServiceList from '../components/Service/ServiceList';
import featureImg from '../assets/images/feature-img.png'
import videoIcon from '../assets/images/video-icon.png'
import avatarIcon from '../assets/images/avatar-icon.png'
import DoctorsList from '../components/Doctors/DoctorsList';
import faqImage from '../assets/images/faq-img.png'
import FaqList from '../components/Faq/FaqList';
import Testimonial from '../components/Testimonial/Testimonial';

import DoctorCard from '../components/Doctors/DoctorCard';
import { BASE_URL } from '../config';
import useFetchData from '../hooks/useFetchData';
// import Loader from '../../components/Loader/Loading';
// import Error from '../../components/Error/Error';

const Home = () => {
  const { data, loading, error } = useFetchData(`${BASE_URL}/doctors`);
  const doctors = data?.data

  console.log(doctors)
  
  return (
    <>
      {/* ======================= Hero Section ===================== */}
      <section className="hero_section pt-[60px] 2xl:h-[900px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* ==================== Hero Content ==================== */}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  We help patients live a healthy, longer life
                </h1>

                <p className="text_para text-justify">
                At Medicare, we are dedicated to providing exceptional healthcare services to ensure our patients live healthier, longer lives. Our team of highly skilled doctors and healthcare professionals is committed to offering personalized medical care, innovative treatments, and preventive health solutions. Whether you're looking for routine check-ups, expert medical advice, or advanced treatments, we are here to support you at every step of your health journey. Experience compassionate care and a commitment to excellence with us. Your health and well-being are our top priorities!
                </p>

                <button className="btn" aria-label="Request an Appointment">
                  Request an Appointment
                </button>
              </div>

              {/* ================== Hero Counter ====================== */}
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-2"></span>
                  <p className="text_para">Years of Experience</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    15+
                  </h2>
                  <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-2"></span>
                  <p className="text_para">Clinic Locations</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    100+
                  </h2>
                  <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-2"></span>
                  <p className="text_para">Patient Satisfaction</p>
                </div>
              </div>
            </div>

            {/* ==================== Hero Image ====================== */}
            <div className="flex gap-[30px] justify-end">
              <div>
                <img className='w-full'
                  src={heroImg01}
                  alt="Doctor helping patients live healthier lives"
                />
              </div>

              <div className='mt-[30px]'>
                <img src={heroImg02} className='w-full mb-[30px]' alt="" />
                <img src={heroImg03} className='w-full' alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======================= Hero Section ends ================ */}


      <section>
        <div className="container">
          <div className='lg:w-[470px] mx-auto'>
            <h2 className='heading text-center'>
              Providing the best medical service
            </h2>

            <p className='text-para text-center'>
              World-class care for everyone. Our health care offers unmatched, expert health care.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
            
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon01} alt="" />
              </div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Find Doctor
                </h2>

                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                  World-class care for everyone. Our health care system offers unmatched, experts health care. From the lab to the clinic
                </p>

                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none:'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div>

            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon02} alt="" />
              </div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Find a Location
                </h2>

                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                  World-class care for everyone. Our health care system offers unmatched, experts health care. From the lab to the clinic
                </p>

                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none:'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div>

            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon03} alt="" />
              </div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Book Appointment
                </h2>

                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                  World-class care for everyone. Our health care system offers unmatched, experts health care. From the lab to the clinic
                </p>

                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none:'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div>


            
          </div>

        </div>
      </section>


      {/* ============================ About section starts =========== */}
      <About />

      {/* ============================ About section ends =========== */}
      
      {/* ============================ Service section starts =========== */}
        <section>
          <div className="container">
            <div className='xl:w-[470px] mx-auto'>
              <h2 className='heading text-center'>Our medical services</h2>
              <p className='text_para text-center'>
                World class care for everyone. Our health system offers unmatched, experts health care.
              </p>
            </div>
            <ServiceList />
          </div>
        </section>

      {/* ============================ Service section ends =========== */}

      {/* ============================ Feature Section ================ */}

      <section>
        <div className="container">
          <div className='flex items-center justify-between flex-col lg:flex-row'>

            {/* ===========================feature content ======================== */}

            <div className='xl:w-[670px]'>
              <h2 className='heading'>
                Get virtual treatment <br /> anytime
              </h2>

              <ul className='pl-4'>
                <li className="text_para">
                  1. Schedule for the appointment directly
                </li>
                <li className="text_para">
                  2. Search for your physician here, and contact their office
                </li>
                <li className="text_para">
                3. View our physicians who are accepting new patients, use the online Scheduling tool to select an appointment time
                </li>
              </ul>

              <Link to='/'>
                <button className='btn'>Learn More</button>
              </Link>
            </div>

            {/* ===================feature img ===================== */}

            <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
              <img src={featureImg} alt="" className='w-3/4' />

              <div className='w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-[6px] lg:gap-3'>
                    <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[600]'>
                      Tue, 24
                    </p>
                    <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[600]'>
                      10:00AM
                    </p>
                  </div>
                  <span className='w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]'>
                    <img src={videoIcon} alt="" />
                  </span>
                </div>

                <div className='w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full'>
                  Consultation
                </div>

                <div className='flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]'>
                  <img src={avatarIcon} alt="" />
                  <h4 className='text-[10px] leading-3 lg:text[16px] lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor '>Wayne Collins</h4>
                </div>

              </div>

            </div>

            {/* ===================feature img end ===================== */}


          </div>
        </div>
      </section>

      {/* ============================ Feature Section ends  ================ */}

      {/* ============================ doctors section ==================== */}
      <section>
          <div className="container">
            <div className='xl:w-[470px] mx-auto'>
              <h2 className='heading text-center'>Our Great doctors</h2>
              <p className='text_para text-center'>
                World class care for everyone. Our health system offers unmatched, experts health care.
              </p>
            </div>
            {/* <DoctorCard /> */}
            {!loading && !error && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
        {Array.isArray(doctors) && doctors.length > 0 ? (
          doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No doctors available.
          </p>
        )}
      </div>
      )}
          </div>
        </section>
      {/* ============================ doctors section ends ==================== */}

      {/* ============================ faq Section ======================= */}
      <section>
        <div className="container">
          <div className='flex justify-between gap-[50px] lg:gap-0'>
            <div className='w-1/2 hidden md:block'>
              <img src={faqImage} alt="img" />
            </div>

            <div className='w-fullmd:w-1/2'>
              <h2>Most questions by our beloved patients</h2>

              <FaqList />
            </div>

          </div>
        </div>
      </section>
      {/* ============================ faq Section ends ======================= */}

      {/* ============================ Testimonial ========================== */}
      <section>
          <div className="container">
            <div className='xl:w-[470px] mx-auto'>
              <h2 className='heading text-center'>What our Patients say </h2>
              <p className='text_para text-center'>
                World class care for everyone. Our health system offers unmatched, experts health care.
              </p>
            </div>
            <Testimonial />
          </div>
        </section>
      {/* ============================ Testimonial ========================== */}
    </>
  );
};

export default Home;
