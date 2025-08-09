import React from 'react'
import {collection, query, where, orderBy, getDocs} from "firebase/firestore"
import {useEffect, useState} from "react";
import {db} from "../firebase";
import { CircleLoader } from "react-spinners";
import { Link } from 'react-router-dom';
const Dashboard = ( {currentUser, dbloading, setdbloading}) => {
    console.log(currentUser);
      const [feedbacks, setFeedbacks] = useState([]);
    useEffect(()=>{
        if(!currentUser) return;
        async function fetchData(){
            try{
                setdbloading(true); 
            const q= query(
                collection(db, "resumeFeedback"),
                where("userId", "==", currentUser.uid),
              
            );
            const snapshot = await getDocs(q);

            setFeedbacks(snapshot.docs.map(doc=>({id: doc.id, ...doc.data()})))
            }
            catch(error){
                console.error("Error Fetching feedbacks:", error);
            }
            finally{
                setdbloading(false);
            }
        }
        fetchData()
        
    }, [currentUser])
    console.log(feedbacks)
      const [accordin, setAccordin] = useState([]);
      const [atsaccordin, setatsaccordin] = useState([])
      const handleAccordin = (key)=>{
        setAccordin((prev)=>prev.includes(key)?prev.filter((item)=>item!==key):[...prev,key])
      }
      const handleAtsAccording=(key)=>{
        setatsaccordin((prev)=>prev.includes(key)?prev.filter((item)=>item!=key):[...prev, key])
    

      }
     const scoreLabel = (score) => {
      if (score >= 90) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
      if (score >= 80) return { label: 'Strong', color: 'text-orange-300', bg:'bg-orange-100'};
      if (score >= 60) return { label: 'Good Start', color: 'text-yellow-500', bg:'bg-yellow-50' };
      return { label: 'Needs Improvement', color: 'text-red-500', bg:'bg-red-50' };
    };
    console.log(feedbacks)
  return (
    <div className='flex items-center flex-col justify-center p-2 h-full'>
    {dbloading?(<div className='h-94 flex items-center justify-center'><CircleLoader color="blue" size={100}></CircleLoader></div>):(<div className='flex flex-col gap-6 items-center justify-center p-1'>
        <h2 className='text-center text-2xl text-indigo-400'>Feedback Dashboard</h2>
        {feedbacks.length!==0?(<><div className='grid grid-cols-1 md:grid-cols-2 gap-5 '>
            {feedbacks.map(f=>(
                
                <div key={f.id} className='rounded ' >
                    
                    <p className='text-center text-[0.65rem] bg-gray-100  rounded-full py-2'>Resume: {f.resumeFileName}</p>
                    
                    <div>
                         <div className='px-2 py-2 flex flex-col rounded-xl bg-gray-100 gap-4'>
      <h2 className='font-bold text-gray-500 text-xl'>Resume Review</h2>
     
     <div className="flex flex-col gap-5"> 
       <div className='flex gap-4 justify-start items-center  px-2 '>
        
     
       <div >
        <div className='relative bg-gray-100 h-20 w-[4rem] rounded-b-full '>
            <div style={{height: `${f.feedbackText.totalScore}%`}} className='absolute flex items-center justify-center font-bold bg-indigo-300 w-full bottom-0 rounded-b-full text-gray-50 text-[0.6rem]'>
            {f.feedbackText.totalScore}/100</div>
        </div>
       </div>
        
         
          <div><p className='text-s font-semibold text-gray-500'>Your Resume Score</p>
          <p className='text-[0.6rem] text-gray-500'>This score is calculated based on the categories listed below</p>
          </div>
      </div>
    
    <div className=' rounded-xl w-full flex flex-col gap-1 '>
      
      {Object.entries(f.feedbackText.scores).map(([key, category])=>{
        const {label, color, bg} = scoreLabel(category.score)
        return (
        <div   key={key}>
        <div className='flex md:flex-col gap-2 bg-indigo-50  px-4 py-3 rounded-full items-center justify-between'><div className='flex gap-4'>
          <span className='capitalize text-[0.8rem] text-gray-600'>{key}</span>
          <span className={` flex items-center h-2 tracking-wide justify-center rounded-full p-2 text-[0.45rem] ${bg} text-gray-600 ${color}`}>{label}</span>
          </div><span className={`text-[0.6em] text-gray-500 ${color}`}>{category.score} <span className='text-black'>/ 100</span></span></div>
  
        </div>
        
      )})}
      </div>
     </div>
     
      <div className='bg-indigo-50 flex flex-col gap-2 rounded-xl px-5 py-3'>
        <div className='flex justify-between items-center'>
             <span className='font-bold text-xl text-gray-500'>ATS Score - {f.feedbackText["ATS Compatibility"].score}/100</span>
             <span><button onClick={()=>{handleAtsAccording(f.id)}}>+</button></span>
        </div>
        {atsaccordin.includes(f.id)&&(<>
         <p>Great Job!</p>
        <p className='text-[0.7rem] text-gray-400'>This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers</p>
        <div className='text-blue-300 text-[0.7rem]'>⚡{f.feedbackText["ATS Compatibility"].feedback}</div>
        {f.feedbackText["ATS Compatibility"].suggestions?.length>0&&(       
                <div className='flex flex-col gap-1'>{f.feedbackText["ATS Compatibility"].suggestions.map(item=>(<span className="flex text-amber-300 text-[0.7rem]" key={item}>✨ {item}</span>))}</div>
              )}
         {f.feedbackText["ATS Compatibility"].issues?.length>0 &&(
              <div className='flex flex-col gap-1'>{f.feedbackText["ATS Compatibility"].issues.map(item=>(<span className="text-[0.7rem] text-red-300 flex" key={item}>⚠️ {item}</span>))}</div>

             )}
           {f.feedbackText["ATS Compatibility"].strengths?.length>0 &&(
              <div className='flex flex-col gap-1'>{f.feedbackText["ATS Compatibility"].strengths.map(item=>(<span className="text-green-600 text-[0.7rem] flex" key={item}>🔥 {item}</span>))}</div>

             )}
             <p className='text-[0.6rem] text-gray-400 italic'>Keep refining your resume to improve your chances of getting post ATS filters and  into the hand of recruiters</p>
          

        </>)}
       
        </div>
      <div className='rounded-xl w-full flex flex-col gap-4 '>
      
      {Object.entries(f.feedbackText.scores).map(([key, category])=>(<div key={key}>
        <div>
          
          <div className='capitalize text-[0.9rem] bg-gray-100   flex justify-between px-5 py-2 rounded text-gray-600'>
            <div className='flex gap-4 items-center'><span>{key}</span> <span className='text-[0.7rem] text-gray-600 bg-gray-50 px-2 rounded'>{category.score} / 100</span></div>
            
            <button  onClick = {()=>{handleAccordin(key)}}>{accordin.includes(key) ? '−' : '+'}</button>
           

          </div>
           {accordin.includes(key) && (<div className='flex flex-col gap-2 px-5 justiy-center bg-indigo-50 rounded py-5'>
             
             <div className='bg-blue-100 rounded py-1  px-2 text-[0.7rem]'>{category.feedback}</div>
             {category.issues?.length>0 &&(
              <div className='flex flex-col gap-1'>{category.issues.map(item=>(<span className="bg-red-200 rounded py-1  px-2 text-[0.7rem]" key={item}>{item}</span>))}</div>

             )}
             {category.suggestions?.length>0&&(       
                <div className='flex flex-col gap-1'>{category.suggestions.map(item=>(<span className="bg-yellow-50 rounded px-2 py-1 text-[0.7rem]" key={item}>{item}</span>))}</div>
              )}
            </div>)}
            {/* <hr></hr>
             
             */}

           </div>

        </div>
        
      ))}
      </div>
      </div>
                    </div>
                </div>
            ))}
        </div></>):(<div className='flex flex-col items-center gap-7 m-12'>
            <p>🥺 No feedback found yet. Upload your resume to get started!</p>

            <button className='bg-indigo-300 text-white p-1 rounded hover:bg-indigo-500'><Link to="/upload" >Click here to Upload</Link></button>
        </div>)}
        
    </div>)}
    
   </div>
  )
}

export default Dashboard