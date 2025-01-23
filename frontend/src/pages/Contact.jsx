import React from 'react'
import Title from '../components/Title';

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-4 mb-'></div>
    </div>
  )
}

export default Contact;
