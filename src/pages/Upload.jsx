import React from 'react'

import FileUploadForm from '../component/FileUploadForm'


const Upload = ({currentUser, dbloading , setdbloading}) => {
  return (
    <>
    
      
    <FileUploadForm currentUser={currentUser} dbloading={dbloading} setdbloading={setdbloading}></FileUploadForm>
  
    
    </>
  )
}

export default Upload