import { useAuth } from '../../auth/AuthToken'
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProductItem = ({ id, images, name, price, }) => { 
    const { currency,localBaseUrl } = useAuth();
    return (
        <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
            <div className='overflow-hidden'>
                <img src={`${localBaseUrl}${images?.[0]}`} className='hover:scale-110 transition ease-in-out' alt="" />

            </div>
            <p className='pt-3 pb-1 text-sm '>{name}</p>
            <p className='font-medium text-sm '>{currency}{price}</p>
        </Link>
    )
}

export default ProductItem
