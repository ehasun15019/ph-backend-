import React from 'react'
import User from './Components/User'

  const userPromise = fetch("http://localhost:3000/users").then((res) =>  {
    return res.json()
  })

const App = () => {
  return (
    <div className='flex justify-center flex-col items-center h-screen'>
      <h1 className='text-2xl'>Simple Crud</h1>
      <User userPromise={userPromise}></User>
    </div>
  )
}

export default App