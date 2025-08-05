import React from 'react'

import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <>
   <main className='bg-gray-50'>
      <section className='px-10 py-5'>
        <div className='flex flex-col bg-indigo-50 rounded-xl items-center h-90 justify-center p-8 gap-8'>
        <div className='flex flex-col  gap-2'><h1 className='text-4xl font-semibold text-indigo-500'>Land Your Dream Job with Smarter Resume Reviews</h1>
        <p className='text-lg text-gray-600'>AI-powered insights to make your resume stand out.</p>
        </div>
        <div><Link to="/upload" className='rounded bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-2'>Upload Resume</Link></div>
        {/* <div><img src="/src/assest"></img></div> */}
        </div>

      </section>
      <section className='p-10'>
        <div className='flex flex-col items-center justify-center gap-8'>
          <h2 className='text-4xl text-indigo-500 font-semibold'>Features</h2>
        <div className='w-[100%] grid grid-cols-2 gap-6'>
          <div className='bg-indigo-50 rounded-xl p-4 flex flex-col items-center justify-center text-center'>
  <h3 className='font-semibold text-lg text-indigo-400 mb-2'>Smart Feedback</h3>
  <p className='text-sm text-justify text-gray-700'>Get real-time suggestions to refine your resume and highlight your strengths instantly.</p>
</div>

<div className='bg-indigo-50 rounded-xl  p-4 flex flex-col items-center justify-center text-center'>
  <h3 className='font-semibold text-indigo-400 text-lg mb-2'>Skill Matching</h3>
  <p className='text-sm text-justify text-gray-700'>Automatically match your skills to the right roles using advanced keyword analysis.</p>
</div>

<div className='bg-indigo-50  rounded-xl p-4 flex flex-col items-center justify-center text-center'>
  <h3 className='font-semibold text-indigo-400 text-lg mb-2'>ATS Compatibility Check</h3>
  <p className='text-sm text-justify text-gray-700'>Ensure your resume passes through Applicant Tracking Systems with optimized formatting.</p>
</div>

<div className='bg-indigo-50  rounded-xl p-4 flex flex-col items-center justify-center text-center'>
  <h3 className='font-semibold text-indigo-400 text-lg mb-2'>Fast Turnaround</h3>
  <p className='text-sm text-justify text-gray-700'>Receive detailed feedback and improvements in minutes so you can apply faster.</p>
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