import React from 'react'
import Footer from '../component/Footer'

const Home = () => {
  return (
    <>
   <main>
      <section className='bg-red-300 p-10'>
        <div className='flex flex-col items-center gap-8'>
        <div className='flex flex-col gap-2'><h1 className='text-4xl font-bold'>Land Your Dream Job with Smarter Resume Reviews</h1>
        <p className='text-xl'>AI-powered insights to make your resume stand out.</p>
        </div>
        <div><button className='rounded bg-blue-200 px-2 py-1'>Upload Resume</button></div>
        {/* <div><img src="/src/assest"></img></div> */}
        </div>

      </section>
      <section className='p-10 bg-indigo-200 '>
        <div>
          <h2 className='text-2xl font-semibold'>Features</h2>
        <div className='grid grid-cols-3 gap-3'>
          <div className='bg-lime-200 rounded  flex items-center justify-center text-center'>Smart Feedback</div>
          <div className='bg-lime-200 rounded  flex items-center justify-center text-center'>Skill Matching</div>
          <div className='bg-lime-200 rounded  flex items-center justify-center text-center'>ATS Compatibilty Check</div>
          <div className='bg-lime-200 rounded  flex items-center justify-center text-center'>Fast Turnaround</div>
        </div>
        </div>
        
      </section>
      <section className='p-10 bg-amber-300'>

        <h2>Testimonial Section</h2>
        <div><p>put carousel here </p></div>
      </section>
    </main>

    <Footer></Footer>
    
    </>
   
  )
}

export default Home