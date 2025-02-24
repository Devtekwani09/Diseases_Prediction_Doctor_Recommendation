import React, { useState } from "react";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Tabs from "./Tabs";
import starIcon from "../../assets/images/Star.png";
import Profile from "./Profile";
import DoctorAbout from "../../pages/Doctors/DoctorAbout";
import Appointments from "./Appointments";

const Dashboard = () => {
  const { data, loading, error } = useGetProfile(`${BASE_URL}/doctors/profile/me`);
  const [tab, setTab] = useState("overview");

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error />}

        {!loading && !error && data?.data && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            {/* Tabs in Column 1 */}
            <div className="lg:col-span-1">
              <Tabs tab={tab} setTab={setTab} />
            </div>

            {/* Content in Columns 2-3 */}
            <div className="lg:col-span-2">
              {/* Approval Info Box */}
              {data.data.isApproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg border border-red-500">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-5 h-5 text-yellow-800"
                    fill="black"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 4a1 1 0 112 0 1 1 0 01-2 0zm0 4a1 1 0 011-1h1a1 1 0 011 1v4a1 1 0 11-2 0v-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 font-semibold">Info:</span>
                  <div>
                    To get approval, please complete your profile. We’ll review manually and approve within 3-4 days.
                  </div>
                </div>
              )}

              {/* Content Section */}
              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px]">
                        <img
                          src={data.data.photo || "https://via.placeholder.com/200"}
                          alt="Doctor"
                          className="w-full rounded-md"
                        />
                      </figure>

                      <div>
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded-md text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {data.data.specialization || "Specialist"}
                        </span>

                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                          {data.data.name || "Doctor Name"}
                        </h3>

                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            <img src={starIcon} alt="Star" />
                            {data.data.rating || 0}
                          </span>
                          <span className="text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            ({data.data.reviewCount || 0})
                          </span>
                        </div>

                        <p className="text_para font-[15px] lg:max-w-[390px] leading-6">
                          {data.data.bio || "No bio available."}
                        </p>
                      </div>
                    </div>
                    <DoctorAbout 
                      name={data.data.name}
                      about={data.data.about}
                      qualifications={data.data.qualifications}
                      experiences={data.data.experiences}
                    />
                  </div>
                )}



                {tab === "appointments" && <Appointments appointments={data.data.appointments} />}
                {tab === "settings" && <Profile doctorData={data} />}
              </div> 
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
