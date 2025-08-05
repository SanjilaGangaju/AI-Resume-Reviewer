import React, { useEffect, useCallback, useState } from 'react'
import pdfToText from 'react-pdftotext';
import Groq from "groq-sdk";
import {marked} from 'marked';
import '/src/index.css';
import ResumeReview from './ResumeReview';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY,
dangerouslyAllowBrowser: true });
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const FileInputForm = () => {
     const [fileContent, setFileContent] = useState('');
     const [finalreview, setReview] = useState({});
     const navigate= useNavigate()
     const[fileName, setfileName] = useState(null);
     const [file, setFile] = useState(null)
      // const edited_review= marked.parse(review);
 
    // Drop Handler
    const onDrop = useCallback((acceptedFiles)=>{
      if(acceptedFiles.length>0){
        const droppedFile = acceptedFiles[0];
        setFile(droppedFile)

        if (droppedFile.type=='application/pdf'){
        pdfToText(droppedFile).then(text=>setFileContent(text))
       .catch(error=> setFileContent(`Text extraction failed ${error}`))

        }
        else{
          setFileContent('');
        }
      }
    },[])
   
    const { getRootProps, getInputProps, isDragActive} = useDropzone({
      onDrop,
      multiple: false,
      accept: {
        'application/pdf': [],
        'image/*': [],
      }
    });
    const previewUrl = file ?  URL.createObjectURL(file) : null

   
    
    
     const fetchDataAPI = async()=>{
        const chatCompletion =  await getGroqChatCompletion();
        const review=chatCompletion.choices[0]?.message?.content || "";
        const cleanedReview = review.trim().replace(/^```json/, '').replace(/```$/, '').trim();

        const final_review= JSON.parse(cleanedReview);
        console.log(final_review);
        setReview(final_review);

       
        

     }
     const getGroqChatCompletion = async()=>{
           return groq.chat.completions.create({
            messages:[
                
                {
                    role: "system",
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
    "toneAndStyle": {
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
    "atsCompatibility": {
      "score": number,
      "feedback": "string",
      "strengths": ["string", ...],
      "issues": ["string", ...],
      "suggestions": ["string", ...]
    }
  },
  "totalScore": number
}
\`\`\`

---

### Instructions:

- Return **only** the JSON response in the structure above.
- Make all suggestions specific, measurable, and relevant.
- Use plain, developer-friendly English for easy parsing and rendering.

---

### Resume:
"""`+ fileContent,

                }
            ],
             model: "llama-3.3-70b-versatile",
           })
     }
  
     useEffect(() => {
         if (finalreview && Object.keys(finalreview).length>0){
              navigate('/review',{ state: { finalreview } });

         }
          
        }, [finalreview])
  
    useEffect(()=>{
        if (fileContent){
            fetchDataAPI();
        }

    }, [fileContent]);
    
  return (
    <div>
        <div className='flex m-20 items-center justify-center'>
            <h1>Upload Your Resume For Screening</h1>
            <form>
              <div {...getRootProps({className:`border px-3 rounded border-black border-dashed  ${isDragActive? 'border-blue-500 bg-blue-50':'border-gray-300 bg-white hover:bg-gray-100'}`
})} >
                <input {...getInputProps()}/>
                {
                 isDragActive ?
                 <p className='text-blue-600'>Drop the files here.....</p>:
                 <>
                  <p className='text-gray-700'>Drag 'n' drop some files here, or click to select files</p>
                  <p className="text-sm text-gray-500">Supported: .jpg, .png, .pdf, .docx</p>

                 </>
                
              }

                
              </div>
              {file&& (
                <div>
                  Selected File:
                  {file.type.startsWith('image/')?(
                    <img src={previewUrl} alt="preview"></img>
                  ): file.type=='application/pdf'?(
                    <iframe src={previewUrl} title="Pdf preview" className='w-full h-96 border rounded-md'></iframe>
                  ):(<p>No preview available</p>)}
                </div>
              )}
             
                {/* <label htmlFor='file'>Choose File</label><br></br>
                <input 
                name="file" 
                
                className="border max-w-50 p-1 outline-bg-black mt-2 bg-amber-50" 
                type="file"
                onChange={handleFileChange}></input> */}
            </form>
        </div>
         <div>
            
      </div>
    </div>
  )
}

export default FileInputForm