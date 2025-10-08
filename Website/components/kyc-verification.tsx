"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadIcon as FileUpload, CheckCircle } from "lucide-react"

export function KYCVerification() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep(step + 1)
    }, 2000)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>KYC Verification</CardTitle>
        <CardDescription>Complete your verification to start trading</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={`step-${step}`} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="step-1" disabled={step !== 1}>
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="step-2" disabled={step !== 2}>
              Documents
            </TabsTrigger>
            <TabsTrigger value="step-3" disabled={step !== 3}>
              Verification
            </TabsTrigger>
          </TabsList>
          <TabsContent value="step-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : "Continue"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="step-2">
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Government ID</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <FileUpload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Drag and drop or click to upload your ID</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Proof of Address</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <FileUpload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Upload a recent utility bill or bank statement</p>
                  </div>
                </div>
              </div>
              <Button onClick={() => setStep(3)} className="w-full">
                Submit Documents
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="step-3">
            <div className="text-center space-y-4">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Verification in Progress</h3>
                <p className="text-sm text-muted-foreground">
                  We are reviewing your documents. This usually takes 1-2 business days.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
          Back
        </Button>
        <div className="text-sm text-muted-foreground">Step {step} of 3</div>
      </CardFooter>
    </Card>
  )
}

