import React from 'react'
import { useLoaderData } from 'react-router'

const UserDetails = () => {

    const userDetailsData = useLoaderData();
    console.log(userDetailsData);
    

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <h3 className='text-3xl'>User Details</h3>
    </div>
  )
}

export default UserDetails