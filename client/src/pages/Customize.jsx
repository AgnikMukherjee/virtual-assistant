import React, { useContext, useRef, useState } from 'react'
import Card from '../custom-components/Card'
import a1 from '../assets/assistant-images/a1.webp'
import a2 from '../assets/assistant-images/a2.png'
import a3 from '../assets/assistant-images/a3.jfif'
import a4 from '../assets/assistant-images/a4.jfif'
import a5 from '../assets/assistant-images/a5.jfif'
import a6 from '../assets/assistant-images/a6.avif'
import a7 from '../assets/assistant-images/a7.jfif'
import a8 from '../assets/assistant-images/a8.avif'
import { FiUpload } from "react-icons/fi";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { userDataContext } from '../context/UserContext'



const Customize = () => {
  const images = [a1, a2, a3, a5, a6, a7, a8]

  const {frontendImage, setFrontendImage, backendImage, setBackendImage, selectedImage, setSelectedImage} = useContext(userDataContext)

  const inputImage = useRef();

  const handleChange =(e)=>{
    const file = e.target.files[0];
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file)) 
  }

  return (
    <div className='w-full min-h-[100vh] bg-gradient-to-t from-[black] to-primary flex justify-center items-center flex-col'>
      <h1 className=' text-center text-2xl md:text-3xl font-bold text-secondary my-8'>Select your assistant image</h1>
      <div className=' max-w-6xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
        {images.map((image, index) => (
          <Card key={index} image={image} />
        ))}
        <div className='rounded-xl shadow-xl flex items-center justify-center cursor-pointer w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[240px] md:h-[240px] bg-primary/15'
        onClick={() => inputImage.current.click()}>
          {!frontendImage && <FiUpload className="size-10 text-secondary"/>}
          {frontendImage && <img src={frontendImage} className="w-full h-full object-cover"/>}
          <Input type="file" accept="image/*" ref={inputImage} hidden 
          onChange={handleChange}/>
        </div>
      </div>
      <Button variant="secondary" className={'rounded-full w-[70px] bt-2 mb-8'} >Next</Button>
    </div>
  )
}

export default Customize