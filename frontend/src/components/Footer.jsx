import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthToken';


const Footer = () => {
    const navigate =useNavigate();
    const {user}=useAuth();
    const role=user?.role;
    return (
        <div>
            <div className='flex flex-col sm:grid sm:grid-cols-3 gap-14 my-20 '>
                <div>
                    <h2 className='text-black text-xl w-full sm:w-2/3 mb-5'>TrendHive</h2>
                    <p className='w-full sm:w-2/3 text-gray-600'>Stay ahead of the curve with TrendHive.  We&apos;re constantly updating our inventory with the newest and most sought-after products, so you&apos;ll always be in the know.</p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPNAY</p>
                    <div className='flex flex-col gap-1 items-start text-gray-600'>
                        <button onClick={()=>navigate('/')}>Home</button>
                        <button onClick={()=>navigate('/about')}>About us</button>
                        <button onClick={()=>navigate('/')}>Delivery</button>
                        <button onClick={()=>navigate('/')}>Policy</button>
                        {role==='admin' && <button onClick={()=>navigate('/admin')}>Admin Pannel</button>}
                    </div>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+92 302 2332456</li>
                        <li>contact@trendhive.com</li>
                        
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center '>
                    Copyright 2024@  tendhive.com
                </p>
            </div>
        </div>
    )
}

export default Footer
