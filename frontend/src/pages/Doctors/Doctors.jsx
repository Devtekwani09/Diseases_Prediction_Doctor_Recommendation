import React, { useEffect, useState } from 'react'
import DoctorCard from '../../components/Doctors/DoctorCard'
// import {doctors} from '../../assets/data/doctor'
import Testimonial from '../../components/Testimonial/Testimonial'

import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';

const Doctors = () => {
  const [query, setQuery] = useState('')
  const [debounceQuery, setDebounceQuery] = useState('');
  const handleSearch = () => {
    setQuery(query.trim())
    console.log("Handle search") 
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query)
    }, 700)

    return () => clearTimeout(timeout)
  },[query])

  const { data, loading, error } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);
  const doctors = data?.data || [];

  console.log("API Response:", data);

  


  return (
    <>
      <section className='bg-[#fff9ea]'>
        <div className="container text-center">
          <h2 className='heading'>Find a Doctor</h2>
          <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
            <input 
              type="search" 
              placeholder='Type Name or Specification'
              value={query}
              onChange={e => setQuery(e.target.value)}
              className='py-4 pl-4 pr-3 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor' 
            />
            <button className='btn mt-0 rounded-[0px] rounded-r-md' onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {doctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>}
        </div>
      </section>

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
    </>
  )
}

export default Doctors