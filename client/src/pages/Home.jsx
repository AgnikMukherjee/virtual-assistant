import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { Button } from '@/components/ui/button'
import { MdClose } from "react-icons/md";
import { LuAlignJustify } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const Home = () => {

  const navigate = useNavigate()

  const {userData, setUserData, serverUrl } = useContext(userDataContext)
  const [open, setOpen] = useState(false);

  const logout = async () =>{
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      setUserData(null)
      toast.success("Logged out successfully")
      navigate("/signin")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='relative w-full min-h-[100vh] bg-gradient-to-t from-[black] to-purple-950 flex justify-center items-center flex-col'>
      <Button variant={"secondary"} className={"absolute top-10 right-7 md:top-6 md:right-6 cursor-pointer my-2"} onClick={() => setOpen(!open)} >
          {open ? <MdClose />: <LuAlignJustify />}
      </Button>

      <div
        className={` ${
          open ? "absolute top-24 right-7 md:top-20 md:right-6 flex flex-col gap-2" : "hidden"
        }`}
      >
        <div><Button onClick={() => navigate("/customize-img")}>Customize</Button></div>
        <div><Button onClick={logout}>Log out</Button></div>
      </div>

      <div className='w-[300px] h-[500px] flex justify-center items-center overflow-hidden '>
        <img src={userData?.assistantImage} alt="" className='h-full w-full object-cover rounded-2xl'/>
      </div>

      <h1 className='max-w-md text-center text-xl md:text-2xl font-bold text-secondary my-8'>{userData?.assistantName}: Greetings, Boss. System's online. How can I assist you?”</h1>

    </div>

  )
}

export default Home