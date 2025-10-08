"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { User, Palette, CreditCard, Bell, Shield, FileText, LogOut, Check, Sparkles } from "lucide-react"
import { GradientText } from "@/components/ui/gradient-text"
import { MainNav } from "@/components/main-nav"
import { SimpleNav } from "@/components/simple-nav"

const colorThemes = [
  { name: "Blue", value: "blue", emoji: "🔵" },
  { name: "Green", value: "green", emoji: "🟢" },
  { name: "Purple", value: "purple", emoji: "🟣" },
  { name: "Orange", value: "orange", emoji: "🟠" },
]

export function ClientSettingsPage() {
  const { theme, setTheme } = useTheme()
  const [colorTheme, setColorTheme] = useState("blue")
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("settings")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainNav />

      <main className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <GradientText>Settings</GradientText>
            </h1>
            <p className="text-muted-foreground">Customize your trading experience and account preferences</p>
          </div>

          <SimpleNav activeTab={activeTab} />

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Subscription
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Reports
              </TabsTrigger>
              <TabsTrigger value="logout" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your profile information and trading preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="john@example.com" type="email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" placeholder="Tell us about yourself" />
                    </div>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance">
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize the look and feel of your trading interface</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Theme Mode</Label>
                      <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">☀️ Light</SelectItem>
                          <SelectItem value="dark">🌙 Dark</SelectItem>
                          <SelectItem value="system">💻 System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-4">
                      <Label>Color Theme</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {colorThemes.map((theme) => (
                          <Button
                            key={theme.value}
                            variant={colorTheme === theme.value ? "default" : "outline"}
                            className="h-20 w-full transition-all"
                            onClick={() => {
                              setColorTheme(theme.value)
                              document.documentElement.setAttribute("data-theme", theme.value)
                            }}
                          >
                            <div className="space-y-2">
                              <div className="text-2xl">{theme.emoji}</div>
                              <span>{theme.name}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscription">
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>Subscription Plans</CardTitle>
                  <CardDescription>Choose the plan that best fits your trading needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-md transition-all">
                      <CardHeader>
                        <CardTitle>Basic</CardTitle>
                        <CardDescription>For casual traders</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-3xl font-bold">$0/mo</div>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            Basic market data
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            Limited trades per month
                          </li>
                        </ul>
                        <Button className="w-full">Current Plan</Button>
                      </CardContent>
                    </Card>
                    <Card className="border-primary hover:shadow-md transition-all">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Pro</CardTitle>
                          <Badge>Popular</Badge>
                        </div>
                        <CardDescription>For active traders</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-3xl font-bold">$29/mo</div>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            Real-time market data
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            Unlimited trades
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            Advanced analytics
                          </li>
                        </ul>
                        <Button className="w-full">Upgrade</Button>
                      </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-all">
                      <CardHeader>
                        <CardTitle>Enterprise</CardTitle>
                        <CardDescription>For institutions</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-3xl font-bold">Custom</div>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            Custom solutions
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            Dedicated support
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            API access
                          </li>
                        </ul>
                        <Button className="w-full">Contact Sales</Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to receive updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Price Alerts 📈</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when prices hit your targets
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Trade Confirmations ✅</Label>
                        <p className="text-sm text-muted-foreground">Get notified when your trades are executed</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Market Updates 📊</Label>
                        <p className="text-sm text-muted-foreground">Daily market summaries and news</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication 🔒</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>API Keys 🔑</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="API Key" type="password" />
                        <Button>Generate New Key</Button>
                      </div>
                    </div>
                    <Button variant="destructive">Reset Password</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>Trading Reports</CardTitle>
                  <CardDescription>View and download your trading history and analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="hover:shadow-md transition-all">
                        <CardHeader>
                          <CardTitle className="text-lg">Performance Report 📊</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full">Download PDF</Button>
                        </CardContent>
                      </Card>
                      <Card className="hover:shadow-md transition-all">
                        <CardHeader>
                          <CardTitle className="text-lg">Tax Statement 📑</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full">Download PDF</Button>
                        </CardContent>
                      </Card>
                    </div>
                    <Card className="hover:shadow-md transition-all">
                      <CardHeader>
                        <CardTitle className="text-lg">Transaction History 📝</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label>Date Range</Label>
                            <Select defaultValue="1m">
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Select period" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1m">Last Month</SelectItem>
                                <SelectItem value="3m">Last 3 Months</SelectItem>
                                <SelectItem value="6m">Last 6 Months</SelectItem>
                                <SelectItem value="1y">Last Year</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full">Generate Report</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logout">
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>Logout</CardTitle>
                  <CardDescription>Are you sure you want to logout?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <p className="text-sm text-muted-foreground">You will be logged out of all active sessions.</p>
                    <div className="flex space-x-4">
                      <Button variant="destructive">Logout</Button>
                      <Button variant="outline">Cancel</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

