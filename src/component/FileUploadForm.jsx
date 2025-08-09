import React, {useCallback, useEffect, useState, CSSProperties} from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDropzone } from 'react-dropzone';
import Groq from 'groq-sdk';
import pdfToText from 'react-pdftotext';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from "react-spinners";
import {collection, addDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase";


const FileUploadForm = ({currentUser, setdbloading}) => {
   const [loading, setLoading] = useState(false);
   
const navigate = useNavigate();
const [filename, setfilename] = useState("")
const [resumeReview, setresumeReview] = useState(null);
const [resumeContent, setresumeContent] = useState("")
  const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true 
  });
  const saveFeedback = async({userId, resumeFileName, feedbackText})=>{
    try{
      await addDoc(collection(db, "resumeFeedback"),{
        userId,
        resumeFileName,
        feedbackText,
        createdAt: serverTimestamp()
      });
      console.log("Feedback saved")
    }
    catch(error){
      console.error("Error saving feedback",error)
    }
  }
   
  const fetchDataAPI=async()=>{
    const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
    const aiFeedback=(chatCompletion.choices[0]?.message?.content || "");
    const feedback = JSON.parse(aiFeedback.trim().replace(/^```json/, '').replace(/```$/, '').trim());
    setresumeReview(feedback)
    setLoading(false);
  
    if (currentUser){
     await saveFeedback({
  userId: currentUser.uid,
  resumeFileName: filename,
  feedbackText: (feedback)
});
    }
    
    


  }
  const getGroqChatCompletion=async()=>{
     return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
  
You are a resume evaluation assistant.

Analyze the resume provided and return your evaluation in **structured JSON format**, with scores and detailed feedback for each of the following five categories:

1. toneAndStyle  
2. content  
3. structure  
4. skills  
5. atsCompatibility

---

### Format Requirements:

For each category **except** atsCompatibility, return:

- \`score\` (number between 0–100): Your evaluation of this category.
- \`feedback\` (string): A short summary of what contributed to this score.
- \`issues\` (string[]): A list of problems or weaknesses in this area.
- \`suggestions\` (string[]): Actionable tips to improve the issues.

For the **atsCompatibility** category, return:

- \`score\` (number between 0–100)
- \`feedback\` (string): Summary of how well the resume meets ATS requirements.
- \`strengths\` (string[]): Positive elements that help with ATS parsing/ranking.
- \`issues\` (string[]): Weaknesses that reduce ATS compatibility.
- \`suggestions\` (string[]): Fixes for the issues above.

Also include:

- \`totalScore\` (number): The average of all five category scores.

---

### JSON Format:

\`\`\`json
{
  "scores": {
    "Tone & Style": {
      "score": number,
      "feedback": "string",
      "issues": ["string", ...],
      "suggestions": ["string", ...]
    },
    "content": {
      "score": number,
      "feedback": "string",
      "issues": ["string", ...],
      "suggestions": ["string", ...]
    },
    "structure": {
      "score": number,
      "feedback": "string",
      "issues": ["string", ...],
      "suggestions": ["string", ...]
    },
    "skills": {
      "score": number,
      "feedback": "string",
      "issues": ["string", ...],
      "suggestions": ["string", ...]
    },
   
  },
  "totalScore": number,
   "ATS Compatibility": {
      "score": number,
      "feedback": "string",
      "strengths": ["string", ...],
      "issues": ["string", ...],
      "suggestions": ["string", ...]
    }
}
\`\`\`

---

### Instructions:

- Return **only** the JSON response in the structure above.
- Make all suggestions specific, measurable, and relevant.
- Use plain, developer-friendly English for easy parsing and rendering.

---

### Resume:
"""`+resumeContent,
      },
    ],
    model: "llama-3.3-70b-versatile",
    });
      
   }







  //drop handler
  const onDrop=useCallback(acceptedFiles =>{
       const uploadedFile=(acceptedFiles[0]);
       setfilename(uploadedFile.name)
       if(uploadedFile.type=='application/pdf'){
        const extractText= async()=>{
            try{
                const extractedText= await pdfToText(uploadedFile);
                setresumeContent(extractedText);

            }
            catch (error) {
                console.log('Failed to extract text', error);

            }
        }
        extractText();
        
       }
       else{
        setresumeContent("");
       }
      

  },[])
 
  
  
  const {getRootProps, getInputProps, open, isDragActive} = useDropzone({onDrop,
    noClick:true,
    noKeyboard:true,
    multiple:false,
    accept: {
        'application/pdf':[],
        'image/*': [],
    }
  });
  useEffect(()=>{
    
    if(resumeReview){
        navigate('/review', {state: {resumeReview}});
    }
  },[resumeReview])
  useEffect(() => {
    
   if(resumeContent){
    setLoading(true)
     fetchDataAPI();
   }
  }, [resumeContent])
  
 
  return (
    <div 
    className='flex flex-col items-center p-3 justify-center bg-indigo-100 gap-5' >
      {loading? (<div className='h-56 md:h-45 flex items-center justify-center'>
        <CircleLoader loading={loading} color="#6366f1" size={100}></CircleLoader>
      </div>):(<>
            <input {...getInputProps()}></input> 
        <h2 className='font-semibold text-3xl text-indigo-500 text-center font-[poppins]'>Upload Your Resume</h2>
        
       <div {...getRootProps()} className ={`flex flex-col items-center  justify-center gap-5 border border-gray-300 border-dashed  h-64 border-2 rounded-xl w-[100%] ${isDragActive?'bg-gray-50 border border-dashed border-2 border-indigo-100 shadow-xl shadow-indigo-200':'bg-gray-50'}`}>
       {isDragActive ? <p className='font-semibold text-gray-500 text-[0.7rem]'>Drag here</p>:
       <>
        <AiOutlineCloudUpload className='text-5xl text-indigo-400' />
        <p className='text-gray-500 text-xs'>Drag & drop to upload</p>
        <p className='text-gray-500 text-xs'>Supported format (.pdf)</p>
        <div className='flex items-center justify-center gap-2'>
            <hr className='w-10'></hr>
            <span className='text-[0.7rem] text-gray-600'>OR</span>
            <hr className='w-10'></hr>
        </div>
        <button onClick={open} className='bg-indigo-400 hover:bg-indigo-500 px-2 py-1 text-center rounded font-semibold text-white text-[0.8rem]'>Browse Files</button>
       </>}
       
        </div>
      </>)}
       
       
    </div>
  )
}

export default FileUploadForm