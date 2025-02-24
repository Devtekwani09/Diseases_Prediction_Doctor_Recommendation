import {React } from 'react'
import starIcon from '../../assets/images/star.png'
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const DoctorCard = ({doctor}) => {

    const {_id, name, averageRating, totalRating, photo, specialization, totalPatients, hospital} = doctor;
    console.log(_id)

  return (
    <div className="p-3 lg:p-5 border rounded-lg shadow-sm bg-white">
      {/* Doctor's Photo */}
      <div className="w-full overflow-hidden rounded-lg">
        <img
          src={photo}
          alt={`${name}'s photo`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Doctor's Name */}
      <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-bold mt-3 lg:mt-5">
        {name}
      </h2>

      {/* Specialization and Ratings */}
      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] lg:text-[16px] font-semibold rounded">
          {specialization}
        </span>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[14px] lg:text-[16px] font-semibold text-headingColor">
            <img src={starIcon} alt="Star Icon" className="w-4 h-4" /> {averageRating}
          </span>
          <span className="text-[14px] lg:text-[16px] font-normal text-textColor">
            ({totalRating})
          </span>
        </div>
      </div>

      {/* Patients and Hospital Info */}
      <div className="mt-4 lg:mt-5 flex justify-between items-center">
        <div>
          <h3 className="text-[16px] lg:text-[18px] font-semibold text-headingColor">
            {totalPatients} patients
          </h3>
          <p className="text-[14px] font-normal text-textColor">
            At {hospital}
          </p>
        </div>

        <Link to={`/doctors/${_id}`} className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none:'>
           <BsArrowRight className='group-hover:text-white w-6 h-5' />
        </Link>
      </div>
    </div>
  )
}

export default DoctorCard