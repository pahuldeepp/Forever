import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext); 

  const imageUrl = Array.isArray(image) && image.length > 0
    ? image[0]
    : '/placeholder.jpg'; // fallback placeholder image

  return (
    <Link to={id ? `/product/${id}` : '#'} className='text-gray-700 cursor-pointer'>
      <div className='overflow-hidden'>
        <img
          src={imageUrl}
          alt={name || 'Product'}
          className='hover:scale-110 transition ease-in-out w-full h-48 object-cover'
        />
      </div>
      <p className='pt-3 pb-1 text-sm truncate'>{name || 'No Name Available'}</p>
      <p className='text-sm font-medium'>
        {currency ? `${currency}${price}` : 'Price Not Available'}
      </p>
    </Link>
  );
};

export default ProductItem;
