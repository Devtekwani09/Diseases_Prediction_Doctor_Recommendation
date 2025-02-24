import React from 'react'
import ServiceCard from '../components/Service/ServiceCard'
import { services } from '../assets/data/service'

const Service = () => {
  return (
    <div className="container">
      <div className='px-4 mx-auto max-w-screen-md'>
        <h2 className='heading text-center '>Services</h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]'>
        {
            services.map((item, index) => 
            <ServiceCard item={item} index={index} key={index} />
            )
        }
    </div>
    </div>
  )
}

export default Service