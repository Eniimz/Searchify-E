//@ts-nocheck

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoginForm } from "@/components/auth/login-form"
import { SignUpForm } from "@/components/auth/signup-form"
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState(null)

  const handleError = (errorMessage) => {

    setError(errorMessage)

  }

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-900/40 backdrop-blur-xl rounded-xl border border-gray-800/50 ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </CardTitle>
          <CardDescription className="text-center text-white">
            {isLogin ? "Sign in to your account" : "Sign up for a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>{isLogin ? <LoginForm setError = { handleError } /> : <SignUpForm setError = { handleError } />}</CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              {/* <span className="px-2 text-muted-foreground">Or continue with</span> */}
            </div>
          </div>
          
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="w-full text-blue-400">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </Button>

          {error && <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>}
        </CardFooter>
      </Card>
    </div>
  )
}





