


'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"
import { AuthFormType } from '@/pages/u/auth'
import { Icons } from '@/components/icons'




interface Step4Props extends React.HTMLAttributes<HTMLDivElement> {
    step: number
    setStep: React.Dispatch<React.SetStateAction<number>>
    form: AuthFormType
    setForm: React.Dispatch<React.SetStateAction<AuthFormType>>
}

export default function Step4({ step, setStep, form, setForm }: Step4Props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setFirstName(form.fullname.split(' ')[0]);
    setLastName(form.fullname.split(' ')[1]);
  }, [])


  const validateName = (first: string, last: string) => {
    if (first.length < 2 || last.length < 2) {
      setError('Both first and last name must be at least 2 characters long')
      setIsValid(false)
    } else if (!/^[a-zA-Z\s-]+$/.test(first) || !/^[a-zA-Z\s-]+$/.test(last)) {
      setError('Names can only contain letters, spaces, and hyphens')
      setIsValid(false)
    } else {
      setError('')
      setIsValid(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)


    if (isValid) {
      console.log('Full name submitted:', `${firstName} ${lastName}`)
      setIsValid(false)
    }

    
    setForm({
        ...form,
        fullname: `${firstName} ${lastName}`
    })
    
    // Update the form state and make the API call

    setTimeout(() => {
        setIsLoading(false);
    if(step < 6) setStep(step + 1)
    }, 3000);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary/10 via-secondary/20 to-primary/10 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className=" shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-orange-500">
              Create Full Name
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Enter your full name to complete your profile
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Label htmlFor="firstName" className="text-sm font-medium text-muted-foreground">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                    validateName(e.target.value, lastName)
                  }}
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/50 border-primary/10"
                />
              </motion.div>
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Label htmlFor="lastName" className="text-sm font-medium text-muted-foreground">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value)
                    validateName(firstName, e.target.value)
                  }}
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/50 border-primary/10"
                />
              </motion.div>
              {error && (
                <motion.p
                  className="text-sm text-destructive"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {error}
                </motion.p>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                disabled={!isValid}
                className="w-full font-Mori font-bold bg-primary-purple hover:from-primary/90 hover:to-secondary/90 text-primary-foreground transition-all duration-300 transform hover:scale-105"
              >
                Create Full Name {
                    isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )
                }
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}