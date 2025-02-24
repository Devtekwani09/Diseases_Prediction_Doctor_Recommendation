import React from "react";
import { BASE_URL } from "../../config";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useFetchData from "../../hooks/useFetchData";

const MyBookings = () => {
  const { data: appointments, loading, error } = useFetchData(
    `${BASE_URL}/users/appointments/my-appointments`
  );

  return (
    <div>
      {/* Show Loading Spinner */}
      {loading && <Loading />}

      {/* Show Error Message */}
      {error && <Error errMessage={error} />}

      {/* Show Bookings if Available */}
      {!loading && !error && Array.isArray(appointments) && appointments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((appointment) => (
            <DoctorCard doctor={appointment.doctor} key={appointment._id} />
          ))}
        </div>
      ) : (
        // Show message if there are no bookings
        !loading && !error && (
          <h2 className="text-center text-gray-500 mt-5">You did not book any doctor yet.</h2>
        )
      )}
    </div>
  );
};

export default MyBookings;
