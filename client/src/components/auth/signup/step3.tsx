'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { AuthFormType } from '@/pages/u/auth'

interface Step3Props extends React.HTMLAttributes<HTMLDivElement> {
    step: number
    setStep: React.Dispatch<React.SetStateAction<number>>
    form: AuthFormType
    setForm: React.Dispatch<React.SetStateAction<AuthFormType>>
}




export default function Step3({ step, setStep, form, setForm }: Step3Props) {
    const [username, setUsername] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [error, setError] = useState('')

    const validateUsername = (value: string) => {
        if (value.length < 3) {
            setError('Username must be at least 3 characters long')
            setIsValid(false)
        } else if (value.length > 20) {
            setError('Username must be no more than 20 characters long')
            setIsValid(false)
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            setError('Username can only contain letters, numbers, and underscores')
            setIsValid(false)
        } else {
            setError('')
            setIsValid(true)
        }
    }



    useEffect(() => {
        setUsername(form.username);

        if (form.username) {
            validateUsername(form.username)
        }

    }, [])


    /**
     * Handel form submit
     * @param e 
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isValid) {
            console.log('Username submitted:', username)
            
            setIsValid(false)
        }

        setStep(step + 1)
    }



    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
            <Card className="w-[350px] shadow-lg transition-all duration-300 hover:shadow-xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center text-primary">Create Username</CardTitle>
                    <CardDescription className="text-center text-muted-foreground">Choose a unique username for your account</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username" className="text-sm font-medium text-muted-foreground">Username</Label>
                                <Input
                                    disabled={true}
                                    id="username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                        validateUsername(e.target.value)
                                    }}
                                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                                />
                                {error && (
                                    <p className="text-sm text-destructive flex items-center mt-1 animate-fadeIn">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {error}
                                    </p>
                                )}
                                {isValid && (
                                    <p className="text-sm text-green-500 flex items-center mt-1 animate-fadeIn">
                                        <CheckCircle2 className="w-4 h-4 mr-1" />
                                        Username is available
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            disabled={!isValid}
                            className="w-full bg-purple-500 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105"
                        >
                            Create Username
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}