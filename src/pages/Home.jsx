import React from 'react'

import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <>
   <main className='bg-gray-50'>
      <section className='px-10 py-6'>
        <div className='bg-gray-100 rounded-xl grid overflow-hidden grid-cols-2'>
          <div className='flex flex-col rounded-xl items-center  justify-center p-8 gap-5'>
        <div className='flex flex-col text-center gap-2'><h1 className='text-4xl font-semibold text-indigo-500'>Land Your Dream Job with Smarter Resume Reviews</h1>
        <p className='text-lg text-gray-600'>AI-powered insights to make your resume stand out.</p>
        </div>
        <div><Link to="/upload" className='rounded bg-indigo-400 hover:bg-indigo-500 text-white px-2 py-2'>Upload Resume</Link></div>
        {/* <div><img src="/src/assest"></img></div> */}
        </div>
        <div className='overflow-hidden w-[100%] flex items-center justify-center'><img src="./src/assets/hero-image.png" className='w-80 object-contain'></img></div>
        </div>
        

      </section>
      <section className='p-10'>
        <div className='flex flex-col items-center justify-center gap-8'>
          <h2 className='text-3xl text-indigo-500 font-semibold'>Features</h2>
        <div className='w-[100%] grid grid-cols-3 gap-6'>
          <div className='bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-center text-center'>
  <h3 className='font-semibold text-lg text-indigo-500 mb-2'>Smart Feedback</h3>
  <p className='text-sm text-justify text-gray-500'>Get real-time suggestions to refine your resume and highlight your strengths instantly.</p>
</div>

<div className='bg-gray-100 rounded-xl  p-4 flex flex-col items-center justify-center text-center'>
  <h3 className='font-semibold text-indigo-500 text-lg mb-2'>Skill Matching</h3>
  <p className='text-sm text-justify text-gray-500'>Automatically match your skills to the right roles using advanced keyword analysis.</p>
</div>

<div className='bg-gray-100  rounded-xl p-4 flex flex-col items-center justify-center text-center'>
  <h3 className='font-semibold text-indigo-500 text-lg mb-2'>ATS Compatibility Check</h3>
  <p className='text-sm text-justify text-gray-500'>Ensure your resume passes through Applicant Tracking Systems with optimized formatting.</p>
</div>

<div className='bg-gray-100  rounded-xl p-4 flex flex-col items-center justify-center text-center'>
  <h3 className='font-semibold text-indigo-500 text-lg mb-2'>Fast Turnaround</h3>
  <p className='text-sm text-justify text-gray-500'>Receive detailed feedback and improvements in minutes so you can apply faster.</p>
</div>

        </div>
        </div>
        
      </section>
      <section className='p-10 '>
        <div className='flex flex-col items-center justify-center gap-6'>
          <h2 className='text-3xl font-semibold text-indigo-500'>Testimonial Section</h2>
        <div><p>put carousel here </p></div>
        </div>
        
      </section>
    </main>

    
    
    </>
   
  )
}

export default Home