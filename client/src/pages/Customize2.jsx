import { Input } from '@/components/ui/input'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { IoArrowBack } from "react-icons/io5";

const Customize2 = () => {
    const navigate = useNavigate()
    const {serverUrl, userData,setUserData, backendImage, selectedImage} = useContext(userDataContext)

    const [assistantName, setassistantName] = useState(userData?.assistantName || "")
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()

    const handleUpdateAssitant= async() =>{
        try {
            let formData = new FormData()
            formData.append('assistantName', assistantName)
            if(backendImage){
                formData.append('assistantImage', backendImage)
            }else{
                formData.append('imageUrl', selectedImage)
            }

            const result = await axios.put(`${serverUrl}/api/user/update`, formData, { withCredentials: true })

            console.log(result.data)
            setUserData(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='relative w-full min-h-[100vh] bg-gradient-to-t from-[black] to-primary flex justify-center items-center flex-col'>
            <IoArrowBack className='absolute top-6 left-6 text-secondary text-4xl cursor-pointer' onClick={() => navigate("/")}/>

            <h1 className=' text-center text-2xl md:text-3xl font-bold text-secondary my-8'>Enter your assistant name</h1>

            <Input placeholder="eg. Jarvis" type={"text"} {...register("assistantName", { required: true })} className={"max-w-[80%] md:max-w-[30%] text-secondary/90"} 
                onChange={(e) => setassistantName(e.target.value)}/>
            {errors.assistantName && <p className="text-destructive">Please enter a name for your assistant</p>}

            <div className='my-4'>
            {assistantName && <Button disabled={isSubmitting} variant="secondary" className={'rounded-full w-[70px] cursor-pointer'}
                onClick={() => {
                    navigate("/")
                    handleUpdateAssitant()
                    }} >
                {isSubmitting ? "Creating..." : "Create"} </Button>}
            </div>

        </div>
    )
}

export default Customize2