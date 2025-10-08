import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserAuthForm } from "@/components/auth-form"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Authentication - Insighter Trading",
  description: "Authentication for Insighter Trading platform",
}

export default function AuthenticationPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-800" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo className="mr-2 h-6 w-6" />
          Insighter Trading
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This platform has transformed how I approach trading. The AI insights and social features make it
              an invaluable tool for both beginners and professionals.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis - Professional Trader</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome to Insighter Trading</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
          </div>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <UserAuthForm type="login" />
            </TabsContent>
            <TabsContent value="register">
              <UserAuthForm type="register" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

