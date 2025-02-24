import React, { useEffect, useState } from 'react'
import userImage from '../../assets/images/doctor-img01.png'
import { useContext } from 'react'
import { authContext } from '../../context/Authcontext'
import MyBookings from './MyBookings'
import ProfileSettings from './ProfileSettings'
import useFetchData from '../../hooks/useFetchData'
import { BASE_URL } from '../../config'
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'

// const MyAccount = () => {

//     const {dispatch} = useContext(authContext)
//     const [tab, setTab] = useState("bookings")

//     const{data:userData, loading, error} = useFetchData(`${BASE_URL}/users/profile/me`)
//     console.log(userData, 'userData')

//     const handleLogout = () => {
//         dispatch({type:"LOGOUT"})
//     }

//   return (
//     <section>
//         <div className='max-w-[1170px] px-5 mx-auto'>

//             {
//                 loading && !error && <Loading />
//             }

//             {
//                 error && !loading && <Error errMessage={error}/>
//             }
//             {
//                 !loading && !error &&(
//                     <div className='grid md:grid-cols-3 gap-10'>
//                         <div className='pb-[50px] px-[30px] rounded-md'>
//                             <div className='flex items-center justify-center'>
//                                 <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
//                                     <img src={userData.photo} alt="" className='w-full h-full rounded-full' />
//                                 </figure>
//                             </div>

//                             <div className='text-center mt-4'>
//                                 <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{userData.name}</h3>
//                                 <p className='text-textColor text-[15px] leading-6 font-medium'>{userData.data.email}</p>
//                                 <p className='text-textColor text-[15px] leading-6 font-medium'>
//                                     Blood type 
//                                     <span className='ml-2 text-headingColor text-[22px] leading-8'>{userData.bloodType}</span>
//                                 </p>
//                             </div>

//                             <div className='mt-[50px] md:mt-[100px]'>
//                                 <button className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white' onClick={handleLogout}>
//                                     Logout
//                                 </button>

//                                 <button className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
//                                     Delete Account
//                                 </button>
//                             </div>
//                         </div>

//                         <div className='md:col-span-2 md:px-[30px]'>
//                             <div>
//                                 <button onClick={() => setTab('bookings')} 
//                                 className={`${tab === "bookings" && "bg-primaryColor text-white font-normal"} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
//                                     My Bookings
//                                 </button>

//                                 <button onClick={() => setTab('settings')} 
//                                 className={`${tab === "settings" && "bg-primaryColor text-white font-normal"} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
//                                     Profile Settings
//                                 </button>
//                             </div>

//                             {
//                                 tab === "bookings" && <MyBookings />
//                             }
//                             {
//                                 tab === "settings" && <ProfileSettings user={userData} />
//                             }

//                         </div>
//                     </div>
//                 )
//             }

//     </div>
//     </section>
//   )
// }

const MyAccount = () => {
    const { dispatch } = useContext(authContext);
    const [tab, setTab] = useState("bookings");

    const { data: userData, loading, error } = useFetchData(`${BASE_URL}/users/profile/me`);

    // Destructure userData if it's available, otherwise, set it to default empty object
    const { _id, email, name, photo, bloodType } = userData?.data || {};

    const buttonClasses = (currentTab) => {
        return `${tab === currentTab ? "bg-primaryColor text-white font-normal" : ""} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`;
    };

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`${BASE_URL}/users/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const responseData = await response.json();
            if (response.ok) {
                toast.success(responseData.message);
                dispatch({ type: 'LOGOUT' });
                navigate('/'); // Redirect to homepage
            } else {
                toast.error(responseData.message || 'Account deletion failed');
            }
        } catch (err) {
            toast.error('Error deleting account');
        }
    };

    return (
        <section>
            <div className='max-w-[1170px] px-5 mx-auto'>
                {loading && !error && <Loading />}
                {error && !loading && <Error errMessage={error} />}
                {!loading && !error && (
                    <div className='grid md:grid-cols-3 gap-10'>
                        <div className='pb-[50px] px-[30px] rounded-md'>
                            <div className='flex items-center justify-center'>
                                <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                                    <img src={photo} alt="User photo" className='w-full h-full rounded-full' />
                                </figure>
                            </div>

                            <div className='text-center mt-4'>
                                <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{name}</h3>
                                <p className='text-textColor text-[15px] leading-6 font-medium'>{email}</p>
                                <p className='text-textColor text-[15px] leading-6 font-medium'>
                                    Blood type
                                    <span className='ml-2 text-headingColor text-[22px] leading-8'>{bloodType}</span>
                                </p>
                            </div>

                            <div className='mt-[50px] md:mt-[100px]'>
                                <button className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white' onClick={handleLogout}>
                                    Logout
                                </button>
                                <button onClick={handleDeleteAccount} className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
                                    Delete Account
                                </button>
                            </div>
                        </div>

                        <div className='md:col-span-2 md:px-[30px]'>
                            <div>
                                <button onClick={() => setTab('bookings')} className={buttonClasses('bookings')}>
                                    My Bookings
                                </button>
                                <button onClick={() => setTab('settings')} className={buttonClasses('settings')}>
                                    Profile Settings
                                </button>
                            </div>

                            {tab === "bookings" && <MyBookings />}
                            {tab === "settings" && <ProfileSettings user={userData?.data || {}} />} {/* Pass only user data */}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};



export default MyAccount