import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Toggle Category Checkbox
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  // Toggle Subcategory Checkbox
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  // Apply Filters
  useEffect(() => {
    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter(product =>
        category.includes(product.category)
      );
    }

    if (subcategory.length > 0) {
      filtered = filtered.filter(product =>
        subcategory.includes(product.subcategory)
      );
    }

    setFilteredProducts(filtered);
  }, [products, category, subcategory, search, showSearch]);

  // Apply Sorting
  useEffect(() => {
    let sorted = [...filteredProducts];

    switch (sortType) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Sidebar */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
        </p>
        <img
          className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
          src={assets.dropdown_icon}
          alt=''
        />

        {/* Category Filter */}
        <div className={`border border-gray-300 p-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Men', 'Women', 'Kids'].map(cat => (
              <label key={cat} className='flex gap-2'>
                <input
                  className='w-3'
                  type='checkbox'
                  onChange={toggleCategory}
                  value={cat}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className={`border border-gray-300 p-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map(type => (
              <label key={type} className='flex gap-2'>
                <input
                  className='w-3'
                  type='checkbox'
                  onChange={toggleSubCategory}
                  value={type}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border-2 border-gray-300 text-sm px-2'
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filteredProducts.map((item) => (
            <ProductItem
              key={item._id}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.images[0]} // Use first image from array
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
