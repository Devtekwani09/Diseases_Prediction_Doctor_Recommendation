import React from 'react'
import aboutImg from '../../assets/images/about.png'
import aboutCardImg from '../../assets/images/about-card.png'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section>
        <div className="container">
            <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
                {/* ===========About Img ======================= */}
                <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
                    <img src={aboutImg} alt="" />
                    <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]'>
                        <img src={aboutCardImg} alt="" />
                    </div>
                </div>

                {/*=================about content ==================== */}

                <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
                    <h2 className='heading'>Proud to be one of the nations best</h2>
                    <p className="text_para">
                    At Medicare, we take pride in being one of the leading healthcare providers in the nation. Our commitment to excellence, innovation, and patient-centered care sets us apart. With a team of highly skilled doctors and medical professionals, we ensure top-quality treatments, advanced medical technologies, and compassionate service. Whether it's preventive care, specialized treatments, or expert consultations, we are dedicated to improving lives and promoting overall well-being.

                    </p>

                    <p className="text_para mt-[30px]">
                        
                    📍 Your health is our priority. <br />
                    💙 Experience exceptional care with us.
                    </p>

                    <Link to = '/'>
                        <button className='btn'>Learn More</button>
                    </Link>

                    

                </div>

            </div>
        </div>
    </section>
  )
}

export default About