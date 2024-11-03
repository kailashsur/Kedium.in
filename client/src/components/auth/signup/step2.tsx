


'use client'

import { useEffect, useState } from "react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { AuthFormType } from "@/pages/u/auth"
import { Icons } from "@/components/icons"
import { AlertCircle } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"
import { ResentOTP } from "@/util/auth.util"












interface Step2Props extends React.HTMLAttributes<HTMLDivElement> {
    accessToken: string,
    setAccessToken: React.Dispatch<React.SetStateAction<string>>
    step: number
    setStep: React.Dispatch<React.SetStateAction<number>>
    form: AuthFormType
    setForm: React.Dispatch<React.SetStateAction<AuthFormType>>
}

export default function Step2({accessToken, setAccessToken, step, setStep, form, setForm }: Step2Props) {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [countdown, setCountdown] = useState<number>(30)
    const [canResend, setCanResend] = useState<boolean>(false)

    const [otp, setOtp] = useState("")



    useEffect(() => {
        if(!accessToken) {
            const fetchToken = async () => {
                try {
                    const {data : { accessToken}} = await axios.get('/api/getAccessToken');
                    setAccessToken(accessToken);
    
                    
                
                } catch (error) {
                    // Log the error response
                    toast.error('Error fetching access token, please try again')
                   
                }
            };
            fetchToken();
        }
    }, [accessToken])

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (countdown > 0 && !canResend) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000)
        } else if (countdown === 0 && !canResend) {
            setCanResend(true)
        }
        return () => clearTimeout(timer)
    }, [countdown, canResend])

    const handleResend = () => {
        // Here you would typically call your API to resend the OTP
        
        ResentOTP({ email: form.email, accessToken: accessToken })


        setCountdown(30)
        setCanResend(false)
        setIsLoading(false)
    }



    const handleSubmit = async () => {
        setIsLoading(true)

        if (!otp) {
            setIsLoading(false)
            setError('Please enter OTP')
            return
        }

        if (otp.length < 6) {
            setIsLoading(false)
            setError('Please enter a valid OTP')
            return
        }


        // Handle OTP submission here
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/auth/verify-otp`, {
                otp: otp,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (response) {
                toast.success('OTP verified successfully')
                setError('')
                setTimeout(() => {
                    if (error == '') {
                        setIsLoading(false)
                        setStep(step + 1)
                    }
                }, 2000);
            }

            return
        } catch (error) {

            setError('Invalid or expired OTP, please retry')
            console.error('Error verifying OTP', error)
            toast.error('Invalid or expired OTP, please retry')

            setIsLoading(false)
            
            return
        }

        
    }

    useEffect(() => {
        setTimeout(() => {
            setError('')
        }, 5000);
    }, [setOtp])

    return (
        <div className="relative min-h-screen w-full h-full flex flex-col items-center justify-center p-6">

            <Card className="w-[350px] bg-gradient-to-br from-purple-100 to-indigo-100 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-Mori text-center text-purple-600">Enter OTP</CardTitle>
                </CardHeader>
                <CardContent onClick={() => setError('')}>
                    <p className=" text-sm text-purple-400 text-center pb-4">
                        Please check your inbox at {form.email} for the OTP
                    </p>
                    <InputOTP
                        value={otp}
                        onChange={setOtp}
                        maxLength={6}

                    >
                        <InputOTPGroup className=" w-full text-center flex justify-center items-center gap-2">
                            <InputOTPSlot index={0} className=" border border-purple-300 text-purple-900 font-bold font-Mori focus:outline-none" />
                            <InputOTPSlot index={1} className=" border border-purple-300 text-purple-900 font-bold font-Mori focus:outline-none" />

                            <InputOTPSlot index={2} className=" border border-purple-300 text-purple-900 font-bold font-Mori focus:outline-none" />
                            <InputOTPSlot index={3} className=" border border-purple-300 text-purple-900 font-bold font-Mori focus:outline-none" />
                            <InputOTPSlot index={4} className=" border border-purple-300 text-purple-900 font-bold font-Mori focus:outline-none" />
                            <InputOTPSlot index={5} className=" border border-purple-300 text-purple-900 font-bold font-Mori focus:outline-none" />
                        </InputOTPGroup>
                    </InputOTP>


                    {/*  Error while apear */}
                    {error && (
                        <p className="text-sm text-destructive flex items-center mt-3 animate-fadeIn">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {error}
                        </p>
                    )}



                    {/* Resend the otp button */}
                    <div className="text-center text-sm mt-4 text-muted-foreground">
                        {!canResend ? (
                            <p>Resend OTP in {countdown} seconds</p>
                        ) : (
                            <Button
                                type="button"
                                variant="link"
                                className="p-0 h-auto font-normal text-primary hover:text-primary/80"
                                onClick={handleResend}
                            >
                                Resend OTP {isLoading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                            </Button>
                        )}
                    </div>


                </CardContent>
                <CardFooter>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                        Verify OTP {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}