"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthFormType } from "@/pages/u/auth"
import { AlertCircle, Route } from "lucide-react"
import { extractNameFromEmail, getUsernameByEmail } from "@/util/Methods.util"
import { emailRegex, passwordRegex } from "@/lib/regX"
import axios, { AxiosError } from "axios"

import toast from "react-hot-toast"
import {  useRouter } from "next/router"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onboarding: boolean
  setOnboarding: React.Dispatch<React.SetStateAction<boolean>>
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  form: AuthFormType
  setForm: React.Dispatch<React.SetStateAction<AuthFormType>>
}


export function UserAuthForm({ onboarding, setOnboarding, step, setStep, form, setForm }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isPasswordVisible, setPasswordVisible] = React.useState<boolean>(false)
  const [error, setError] = React.useState('')
  const router = useRouter()



  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()

    // checks

    setIsLoading(true)

    const target = event.target as HTMLFormElement;
    if (!(target instanceof HTMLFormElement)) {
      setError("Event target is not an HTMLFormElement")
      setIsLoading(false);
      return;
    }

    const formData = new FormData(target);

    // check validation
    if (error) {
      setIsLoading(false)
      return
    }

    if (!formData.get("email")) {
      setError('Please enter email')
      setIsLoading(false)
      return
    }

    if (!formData.get("password")) {
      setError('Please enter password')
      setIsLoading(false)
      return
    }


    setForm({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      username: getUsernameByEmail(formData.get("email") as string),
      fullname: extractNameFromEmail(formData.get("email") as string),
    })
    // Account Creation 
    if (onboarding) {
      // Submit the form over the api
      try {
        // Submit the form over the API
        const response = await axios.post(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/auth/register`, {
          email: formData.get("email"),
          password: formData.get("password"),
          username: getUsernameByEmail(formData.get("email") as string),
          fullname: extractNameFromEmail(formData.get("email") as string),
        }, {
          withCredentials: true,

        });

        if (response.status !== 200) {
          setError('Something went wrong')
          setIsLoading(false)
          return
        }

        toast.success('Account Info saved')

        setTimeout(() => {
          setIsLoading(false)
          setStep(step + 1)
        }, 3000)
      } catch (error) {
        // Log the error response

        setError('Something went wrong')
        setIsLoading(false)
      }
    }


    /**
     * Login
     */
    if (!onboarding) {
      try {
        // Submit the form over the API
        const response = await axios.post(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/auth/login`, {
          email: formData.get("email"),
          password: formData.get("password"),

        }, {
          withCredentials: true,

        });

        if (response.status !== 200) {
          setError('Something went wrong')
          setIsLoading(false)
          return
        }

        const { data : { user} } = await axios.get(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/decode-token`, {
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`
          },
          withCredentials : true,
        });

        

        toast.success('You are logged in successfully')

        setTimeout(() => {
          setIsLoading(false)
          router.push(`/u/@${user.username}/dashboard`)
        }, 3000)
      } catch (error: unknown) {
        // Log the error response

        if (axios.isAxiosError(error)) {
          setError(error.message)
        } else {
          setError('An unknown error occurred')
        }
        setIsLoading(false)
      } 
    }



    setTimeout(() => {
      setIsLoading(false)
      if (onboarding) {
        setStep(step + 1)
      }
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6",)} >
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              className="w-full backdrop-blur-md bg-white/30 border border-primary-text/30 rounded-md p-1 focus:outline-none focus:border focus:border-sky-600  px-2 py-1 "
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => {
                setError('')
                emailRegex.test(e.target.value) ? setError('') : setError('Invalid Email')
              }}
            />

            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <div>
              <label className=" sr-only ">Password</label>
              <div className=" relative flex items-center">
                <input
                  className=" w-full backdrop-blur-md bg-white/30 border border-primary-text/30 rounded-md p-1 focus:outline-none focus:border focus:border-sky-600  px-2 py-1 "
                  placeholder="Password@123"
                  name="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isLoading}
                  type={isPasswordVisible ? "text" : "password"}
                  onChange={(e) => {
                    setError('')
                    passwordRegex.test(e.target.value) ? setError('') : setError('Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character')
                  }}
                />
                <svg
                  onClick={(e) => {
                    e.preventDefault();
                    setPasswordVisible(!isPasswordVisible);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 absolute  right-2  font-bold text-primary-text cursor-pointer rounded-sm "
                >
                  {isPasswordVisible ? (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </>
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  )}
                </svg>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive flex items-center mt-1 animate-fadeIn">
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </p>
          )}


          <Button
            className="w-full bg-purple-500 hover:bg-purple-700/90 text-white font-semibold py-2 px-4 rounded-md transition-colors"

            type="submit"

            disabled={isLoading || error !== ''}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {onboarding ? "Create Account" : "Sign In"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  )
}