import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { BASE_URL, token } from '../../config'
import HashLoader from 'react-spinners/HashLoader'
import { toast } from 'react-toastify'
import axios from "axios";

const FeedbackForm = () => {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [reviewText, setReviewText] = useState('');
    const { id } = useParams();
    const [loading, setLoading] = useState(false)

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            if (!rating || !reviewText.trim()) {
                setLoading(false);
                toast.error("Rating & Review fields are required");
                return;
            }

            console.log("feedback token", token)

            const url = `${BASE_URL}/doctors/${id}/reviews`
            console.log(url)

            const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ rating, reviewText })
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            setLoading(false);
            toast.success(result.message);
        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmitReview}>
            <div>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4'>
                    How would you rate your experience?
                </h3>
                <div>
                    {[...Array(5)].map((_, index) => {
                        const starIndex = index + 1;
                        return (
                            <button 
                                key={starIndex} 
                                type='button'
                                className={`${
                                    starIndex <= (hover || rating)
                                        ? "text-yellowColor"
                                        : "text-gray-400"
                                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                                onClick={() => setRating(starIndex)}
                                onMouseEnter={() => setHover(starIndex)}
                                onMouseLeave={() => setHover(0)}
                                onDoubleClick={() => {
                                    setHover(0);
                                    setRating(0);
                                }}
                            >
                                <AiFillStar />
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className='mt-[30px]'>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4'>
                    Share your Feedback or Suggestion
                </h3>
                <textarea 
                    className='border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full p-4 py-3 rounded-md'
                    rows="5"
                    placeholder='Write your message'
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
            </div>

            <button type='submit' className='btn'>
                {loading ? <HashLoader size={25} color='#fff' /> : 'Submit Feedback'}
            </button>
        </form>
    )
}

export default FeedbackForm;
