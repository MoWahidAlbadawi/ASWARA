import { useState } from "react"
import { useForm } from "react-hook-form"

// MUI Components
import { TextField , Checkbox , FormControlLabel , Button , InputAdornment , IconButton , Typography , Box , Stack} from "@mui/material"

// Icons
import { FiEye , FiEyeOff , FiUser , FiMail , FiPhone , FiLock , } from "react-icons/fi";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Box className="w-full min-h-screen lg:grid lg:grid-cols-2">
        {/* form */}
        <Box className="bg-gradient-to-b from-white to-primary-color rsounded flex justify-center items-center p-6 lg:p-8">
        <p>wgfwd</p>
        </Box>
        {/* image */}
        <Box></Box>
    </Box>
  )
}

export default Register;