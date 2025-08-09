import React from 'react'

import { Link } from 'react-router-dom'
const Home = ({loggedIn}) => {
   const testimonials = [
    {
      name: "Ayesha K.",
      role: "Junior Web Developer",
      avatar: "https://i.pravatar.cc/100?img=5",
      quote:
        "ResumeAI gave me insights I didn’t even know I needed. The suggestions helped me tailor my resume perfectly for developer roles — I landed 3 interviews in 2 weeks!",
    },
    {
      name: "Mark T.",
      role: "Aspiring Data Analyst",
      avatar: "https://i.pravatar.cc/100?img=12",
      quote:
        "As someone switching from teaching to tech, I was overwhelmed. This tool not only scored my resume but told me why it needed changes. Super intuitive and helpful!",
    },
    {
      name: "Samantha L.",
      role: "Product Manager",
      avatar: "https://i.pravatar.cc/100?img=25",
      quote:
        "I’ve been in the industry for 10+ years, but ResumeAI still caught weak points in my wording and formatting. The AI feedback felt like having a recruiter at my side.",
    },
  ];
  return (
    <>
   <main className='bg-blue-50'>
      <section className='px-1 md:px-6 bg-blue-50 pb-4'>
        <div className='bg-blue-50 rounded-xl grid grid-cols-1 md:grid-cols-2 justify-center items-center bg-gray-50 md:px-8 py-5'>
          <div className='flex bg-gray-50 h-full w-1/1 flex-col order-2 md:order-1 rounded-xl items-center justify-center  p-8 gap-6 '>
        <div className='flex flex-col items-center md:text-center gap-4'><h1 className='text-3xl font-semibold text-indigo-500'>Land Your Dream Job with Smarter Resume Reviews</h1>
        <p className='text-lg text-gray-500'>AI-powered insights to make your resume stand out.</p>
        </div>
        <div><Link  to={loggedIn?"/upload":"/login"} className='rounded bg-indigo-400 hover:bg-indigo-600 text-white px-2 py-2'>Upload Resume</Link></div>
        {/* <div><img src="/src/assest"></img></div> */}
        </div>
        <div className='overflow-hidden w-[100%] bg-transparent md:h-full h-40 order-1 md:order-2 flex items-center justify-center'><img src="./src/assets/hero-image.png" className='w-50 md:w-70 object-contain '></img></div>
        </div>
        

      </section>
      <section className='px-1 bg-blue-50 py-2 mb-6'>
        <div className='flex flex-col items-center justify-center gap-5'>
          <h2 className='text-3xl text-indigo-500 font-semibold'>Features</h2>
        <div className='w-[90%] grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center'>
  <h3 className='font-semibold text-lg text-indigo-400 mb-2'>Smart Feedback</h3>
  <p className='text-sm text-justify text-gray-500'>Get real-time suggestions to refine your resume and highlight your strengths instantly.</p>
</div>

<div className='bg-white rounded-xl  p-4 flex flex-col items-center justify-center text-center'>
  <h3 className='font-semibold text-indigo-400 text-lg mb-2'>Skill Matching</h3>
  <p className='text-sm text-justify text-gray-500'>Automatically match your skills to the right roles using advanced keyword analysis.</p>
</div>

<div className='bg-white  rounded-xl p-4 flex flex-col items-center justify-center text-center'>
  <h3 className='font-semibold text-indigo-400 text-lg mb-2'>ATS Compatibility Check</h3>
  <p className='text-sm text-justify text-gray-500'>Ensure your resume passes through Applicant Tracking Systems with optimized formatting.</p>
</div>

<div className='bg-white  rounded-xl p-4 flex flex-col items-center justify-center text-center'>
  <h3 className='font-semibold text-indigo-400 text-lg mb-2'>Fast Turnaround</h3>
  <p className='text-sm text-justify text-gray-500'>Receive detailed feedback and improvements in minutes so you can apply faster.</p>
</div>

        </div>
        </div>
        
      </section>
      <section className='px-1 py-2 bg-blue-50 pb-10 '>
        <div className='flex flex-col items-center justify-center gap-6'>
          <h2 className='text-3xl font-semibold text-center text-indigo-500'>Testimonial Section</h2>
        <div>
           <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-bold text-center text-gray-500 mb-10">
          💬 What Users Are Saying
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-indigo-100 p-3"
            >
              <p className="text-[0.7rem] text-gray-500  mb-4">"{t.quote}"</p>
              <div className="flex items-center space-x-4 mt-auto">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
        </div>
        
      </section>
    </main>

    
    
    </>
   
  )
}

export default Home