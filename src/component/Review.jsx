import React from 'react'
import { useLocation } from 'react-router-dom'

const Review = () => {
  const location = useLocation();
  const {resumeReview}= location.state || {};
  console.log(resumeReview)
 const scoreLabel = (score) => {
  if (score >= 90) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
  if (score >= 80) return { label: 'Strong', color: 'text-orange-300', bg:'bg-orange-100'};
  if (score >= 60) return { label: 'Good Start', color: 'text-yellow-500', bg:'bg-yellow-50' };
  return { label: 'Needs Improvement', color: 'text-red-500', bg:'bg-red-50' };
};
  return (
    <>
    <div className='p-8 flex flex-col bg-gray-50  gap-4'>
      <h2 className='font-bold text-2xl'>Resume Review</h2>
     
      <div className='flex gap-10 justify-start items-center  px-10 '>
        
     
       <div >
        <div className='relative bg-gray-100 h-40 w-[3rem] rounded-b-full '>
            <div style={{height: `${resumeReview.totalScore}%`}} className='absolute flex items-center justify-center font-bold bg-indigo-300 w-full bottom-0 rounded-b-full text-gray-50 text-[0.6rem]'>
            {resumeReview.totalScore}/100</div>
        </div>
       </div>
        
         
          <div><p className='text-xl font-semibold text-gray-500'>Your Resume Score</p>
          <p className='text-[0.6rem] text-gray-500'>This score is calculated based on the categories listed below</p>
          </div>
      </div>
    
    <div className=' rounded-xl w-full flex flex-col gap-2 p-5'>
      
      {Object.entries(resumeReview.scores).map(([key, category])=>{
        const {label, color, bg} = scoreLabel(category.score)
        return (
        <div   key={key}>
        <div className='flex gap-2 bg-indigo-50  px-4 py-3 rounded-full items-center justify-between'><div className='flex gap-4'>
          <span className='capitalize text-[0.8rem] text-gray-600'>{key}</span>
          <span className={` flex items-center h-2 tracking-wide justify-center rounded-full p-2 text-[0.45rem] ${bg} text-gray-600 ${color}`}>{label}</span>
          </div><span className={`text-[0.6em] text-gray-500 ${color}`}>{category.score} <span className='text-black'>/ 100</span></span></div>
  
        </div>
        
      )})}
      </div>
      <div className='bg-indigo-50 flex flex-col gap-3 rounded-xl px-5 py-3'>
        <span className='font-bold text-xl text-gray-500'>ATS Score - {resumeReview["ATS Compatibility"].score}/100</span>
        <p>Great Job!</p>
        <p className='text-[0.7rem] text-gray-400'>This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers</p>
        <div className='text-blue-300 text-[0.9rem]'>⚡{resumeReview["ATS Compatibility"].feedback}</div>
        {resumeReview["ATS Compatibility"].suggestions?.length>0&&(       
                <div className='flex flex-col gap-1'>{resumeReview["ATS Compatibility"].suggestions.map(item=>(<span className="flex text-amber-300 text-[0.9rem]" key={item}>✨ {item}</span>))}</div>
              )}
         {resumeReview["ATS Compatibility"].issues?.length>0 &&(
              <div className='flex flex-col gap-1'>{resumeReview["ATS Compatibility"].issues.map(item=>(<span className="text-[0.9rem] text-red-300 flex" key={item}>⚠️ {item}</span>))}</div>

             )}
           {resumeReview["ATS Compatibility"].strengths?.length>0 &&(
              <div className='flex flex-col gap-1'>{resumeReview["ATS Compatibility"].strengths.map(item=>(<span className="text-green-600 text-[0.9rem] flex" key={item}>🔥 {item}</span>))}</div>

             )}
          
        </div>
      <div className='bg-gray-100 rounded-xl w-full flex flex-col gap-2 p-5'>
      
      {Object.entries(resumeReview.scores).map(([key, category])=>(<div   key={key}>
        <div className='flex gap-2 items-center justify-between'>
          
          <span className='capitalize text-[0.8rem] text-gray-600'>
            <p>{key}</p>
            <hr></hr>
             <span className='text-[0.7rem] text-gray-600'>{category.score} / 100</span>
             <div className='bg-green-200'>Feedback: <br></br>{category.feedback}</div>
             {category.issues?.length>0 &&(
              <div className='flex flex-col gap-1'>Issues: {category.issues.map(item=>(<span className="bg-red-100 rounded flex items-center justify-center p-1" key={item}>{item}</span>))}</div>

             )}
             {category.suggestions?.length>0&&(       
                <div className='flex flex-col gap-1'>Suggestions: {category.suggestions.map(item=>(<span className="bg-blue-100 rounded flex items-center justify-center p-1" key={item}>{item}</span>))}</div>
              )}
            


          </span>

           </div>

        </div>
        
      ))}
      </div>
      </div>
    </>
  )
}

export default Review