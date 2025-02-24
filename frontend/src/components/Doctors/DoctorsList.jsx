import React from 'react';
import DoctorCard from './DoctorCard';
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';

const DoctorsList = () => {
  const { data, loading, error } = useFetchData(`${BASE_URL}/doctors`);
  
  console.log("Doctors Data:", data);

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}

      {!loading && !error && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No doctors available.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default DoctorsList;
