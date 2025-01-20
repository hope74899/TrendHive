import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useAuth } from '../../auth/AuthToken';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../baseurl';

const NewsLetterBox = () => {
    const [email, setEmail] = useState('');
    const { user,token } = useAuth();
    const navigate = useNavigate();

    const handleOnSubmit = async (event) => {
        event.preventDefault();
    
        const isLoggin = user?.isLoggin;
        if (!isLoggin) {
            navigate('/login');
            return;
        }
    
        try {
            const response = await axios.post(
                `${baseURL}/api/subscribe`,
                { email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.status === 201) {
                // Successfully subscribed
                toast.success(response.data.message);
                setEmail(''); // Clear the input field
            }
        } catch (error) {
            // Handle specific server errors
            if (error.response) {
                // Server returned a response
                const { status, data } = error.response;
                if (status) {
                    toast.error(data.message);
                }
            } else if (error.request) {
                // No response received
                toast.error('No response from the server. Please try again later.');
            } else {
                // Other errors (e.g., request setup issues)
                toast.error('An unexpected error occurred. Please try again.');
            }
    
            console.error('Error during subscription:', error);
        }
    };
    

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
            <p className='text-gray-400 pt-3'>Stay ahead of the trends and get exclusive access to new arrivals, sales, and special offers by joining our TrendHive newsletter. Be the first to know about the latest drops and score insider deals!</p>
            <form onSubmit={handleOnSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6'>
                <input
                    type="email"
                    name="email"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full sm:flex-1 outline-none px-8 py-2'
                    required
                />
                <button type='submit' className='bg-black text-white text-xs px-10 py-[13px]'>SUBSCRIBE</button>
            </form>
        </div>
    );
};

export default NewsLetterBox;
