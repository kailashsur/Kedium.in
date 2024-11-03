import axios from "axios"
import toast from "react-hot-toast"




export const ResentOTP = ({ email, accessToken} : { email : string, accessToken : string}) => {
    // Here you would typically call your API to resend the OTP
    
    try {
        axios.post(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/auth/resend-otp`, {
            email: email,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        
        return toast.success('OTP resent successfully')

    } catch (error) {
        toast.error('Error resending OTP, please try again')
    }
}