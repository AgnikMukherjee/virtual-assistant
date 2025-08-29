import { useForm } from "react-hook-form"
import signing from '../assets/images/signing.avif'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { toast, Toaster } from "sonner"

const SignIn = () => {

  const { serverUrl } = useContext(userDataContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const [showPassword, setShowPassword] = useState(false)


  const handleSignIn = async (data) => {
    console.log("Form submitting with:", data); // debug
    console.log("Server URL:", serverUrl);

    try {
      const result = await axios.post(`${serverUrl}/api/auth/login`, data, { withCredentials: true })

      navigate("/")
      console.log(result)
      toast.success("Signed in successfully")
      // return result.data;
    } catch (error) {
      console.log(error)
      toast.error(error.response.data)
    }
  }



  return (
    <div className='w-full h-screen bg-cover flex justify-center items-center '
      style={{
        backgroundImage: `url(${signing})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>

      <form onSubmit={handleSubmit(handleSignIn)}
        className='rounded-lg w-[90%] min-h-[400px] max-w-[600px] bg-[#00000030] backdrop-blur shadow-lg drop-shadow-black flex flex-col items-center justify-center gap-3'>

        <h1 className="text-2xl text-center text-secondary mb-4">Welcome to your
        <span className="hidden md:inline"> </span>
          <br className="md:hidden" />
          <span className="text-primary">virtual assistant</span>
        </h1>


        <Input placeholder="Email" type={"email"} {...register("email", { required: true })} className={"max-w-4/5 text-secondary/90"} />
        {errors.email && <p className="text-destructive">Please enter a valid email</p>}

        <div className="relative w-full max-w-4/5">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: true })}
            className="text-secondary/90"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-secondary hover:text-primary-foreground"
          >
            {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
          </span>
        </div>
        {errors.password && <p className="text-destructive">Please enter a valid password</p>}


        <Button disabled={isSubmitting} type="submit" variant={"default"} className={"cursor-pointer my-2"} >{isSubmitting ? "Signing In..." : "Sign In"}</Button>

        <p className="text-secondary cursor-pointer" onClick={() => navigate("/signup")}>Don't have an account? <span className="text-primary">Sign Up</span></p>

      </form>
    </div>
  )
}

export default SignIn


