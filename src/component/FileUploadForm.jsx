import React, {useCallback} from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDropzone } from 'react-dropzone';

const FileUploadForm = () => {
    
  const onDrop=useCallback(acceptedFiles =>{
       console.log(acceptedFiles);
  },[])
  const {getRootProps, getInputProps, open, isDragActive} = useDropzone({onDrop,
    noClick:true,
    noKeyboard:true,
  });
  return (
    <div 
    className='flex flex-col items-center p-10 justify-center bg-gray-50 gap-5' >
        <input {...getInputProps()}></input> 
        <h2 className='font-semibold text-2xl font-[poppins]'>Upload Your Resume</h2>
        
       <div {...getRootProps()} className ={`flex flex-col items-center  justify-center gap-5 border border-dashed border-gray-300 h-64 border-2 rounded-xl w-96 max-w-md p-7 ${isDragActive?'bg-gray-50 border border-dashed border-2 border-indigo-100 shadow-xl shadow-indigo-200':'bg-gray-50'}`}>
       {isDragActive ? <p className='font-semibold text-gray-500 text-[0.7rem]'>Drag here</p>:
       <>
        <AiOutlineCloudUpload className='text-5xl text-indigo-400' />
        <p className='text-gray-500 text-xs'>Drag & drop to upload</p>
        <div className='flex items-center justify-center gap-2'>
            <hr className='w-10'></hr>
            <span className='text-[0.7rem] text-gray-600'>OR</span>
            <hr className='w-10'></hr>
        </div>
        <button onClick={open} className='bg-indigo-400 hover:bg-indigo-500 px-2 py-1 text-center rounded font-semibold text-white text-[0.8rem]'>Browse Files</button>
       </>}
       
        </div>
    </div>
  )
}

export default FileUploadForm