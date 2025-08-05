import React from 'react'
import { useLocation } from 'react-router-dom'
const Review = () => {
  const location = useLocation();
  const {resumeReview}= location.state || {};
  console.log(resumeReview)
  return (
    <>
    <div className='p-8 flex flex-col items-center gap-4'>
      <h2>Resume Review</h2>
      <div>Total Score: {resumeReview.totalScore}</div>
    <div className='bg-gray-100 rounded-xl w-full flex flex-col gap-2 p-5'>
      
      {Object.entries(resumeReview.scores).map(([key, category])=>(<div   key={key}>
        <div className='flex gap-2 items-center justify-between'><span className='capitalize text-[0.8rem] text-gray-600'>{key}</span> <span className='text-[0.7rem] text-gray-600'>{category.score} / 100</span></div>
  
        </div>
        
      ))}
      </div>
      <div>
        <p>ATS Score: {resumeReview["ATS Compatibility"].score}/100</p>
        <p>Great Job!</p>
        <div className='bg-green-200'>Feedback:<br></br>{resumeReview["ATS Compatibility"].feedback}</div>
        {resumeReview["ATS Compatibility"].suggestions?.length>0&&(       
                <div className='flex flex-col gap-1'>Suggestions: {resumeReview["ATS Compatibility"].suggestions.map(item=>(<span className="bg-blue-100 rounded flex items-center justify-center p-1" key={item}>{item}</span>))}</div>
              )}
         {resumeReview["ATS Compatibility"].issues?.length>0 &&(
              <div className='flex flex-col gap-1'>Issues: {resumeReview["ATS Compatibility"].issues.map(item=>(<span className="bg-red-100 rounded flex items-center justify-center p-1" key={item}>{item}</span>))}</div>

             )}
           {resumeReview["ATS Compatibility"].strengths?.length>0 &&(
              <div className='flex flex-col gap-1'>Strengths: {resumeReview["ATS Compatibility"].strengths.map(item=>(<span className="bg-red-100 rounded flex items-center justify-center p-1" key={item}>{item}</span>))}</div>

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