import React, { useEffect, useState } from 'react'
import pdfToText from 'react-pdftotext';
import Groq from "groq-sdk";
import {marked} from 'marked';
import '/src/index.css';
import ResumeReview from './ResumeReview';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY,
dangerouslyAllowBrowser: true });


const FileInputForm = () => {
     const [fileContent, setFileContent] = useState('');
     const [finalreview, setReview] = useState({});
     const navigate= useNavigate()
  
      // const edited_review= marked.parse(review);
 
    
    
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
    const handleFileChange = (e)=>{
       const file = e.target.files[0];
       pdfToText(file).then(text=>setFileContent(text))
       .catch(error=> setFileContent(`Text extraction failed ${error}`))
       
        

       
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
        <div className='flex items-center justify-center'>
            <form>
                <label htmlFor='file'>Choose File</label><br></br>
                <input 
                name="file" 
                
                className="border max-w-50 p-1 outline-bg-black mt-2 bg-amber-50" 
                type="file"
                onChange={handleFileChange}></input>
            </form>
        </div>
         <div>
            
      </div>
    </div>
  )
}

export default FileInputForm