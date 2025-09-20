"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Shield, Settings, Train, ArrowLeft, Camera, Save, Bell, Key } from "lucide-react"
import NextLink from "next/link"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    nameMalayalam: "രാജേഷ് കുമാർ",
    email: "rajesh.kumar@kmrl.co.in",
    phone: "+91 9876543210",
    department: "Operations",
    role: "Senior Engineer",
    location: "Kochi Metro Rail Limited",
    bio: "Experienced metro rail operations engineer with 8+ years in public transportation systems.",
    bioMalayalam: "പൊതു ഗതാഗത സംവിധാനങ്ങളിൽ 8+ വർഷത്തെ പരിചയമുള്ള അനുഭവസമ്പന്നനായ മെട്രോ റെയിൽ ഓപ്പറേഷൻസ് എഞ്ചിനീയർ.",
    language: "malayalam",
    notifications: {
      email: true,
      whatsapp: true,
      push: false,
    },
  })

  const handleSave = () => {
    // Save profile logic
    console.log("Profile saved:", profile)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <NextLink href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </NextLink>
              </Button>
              <div className="flex items-center space-x-3">
                <User className="h-6 w-6 text-primary kerala-wave" />
                <div>
                  <h1 className="text-xl font-bold">User Profile</h1>
                  <p className="text-sm text-muted-foreground">ഉപയോക്തൃ പ്രൊഫൈൽ</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="notification-bounce">
              <Shield className="mr-1 h-3 w-3" />
              Verified Employee
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="document-scan">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/professional-indian-engineer.jpg" />
                      <AvatarFallback className="text-lg gradient-kerala text-white">RK</AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{profile.name}</h3>
                    <p className="text-sm text-primary font-medium">{profile.nameMalayalam}</p>
                    <p className="text-sm text-muted-foreground">{profile.role}</p>
                    <p className="text-xs text-muted-foreground">{profile.department}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary">
                      <Train className="mr-1 h-3 w-3" />
                      KMRL Employee
                    </Badge>
                    <Badge variant="outline">
                      <Shield className="mr-1 h-3 w-3" />
                      Level 3 Access
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Documents Accessed</span>
                  <Badge variant="secondary">1,247</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Searches This Month</span>
                  <Badge variant="secondary">89</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Files Uploaded</span>
                  <Badge variant="secondary">23</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>WhatsApp Queries</span>
                  <Badge variant="secondary">156</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>വ്യക്തിഗത വിവരങ്ങൾ</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nameMalayalam">Name in Malayalam</Label>
                        <Input
                          id="nameMalayalam"
                          value={profile.nameMalayalam}
                          onChange={(e) => setProfile({ ...profile, nameMalayalam: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={profile.department}
                          onValueChange={(value) => setProfile({ ...profile, department: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="operations">Operations</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="safety">Safety & Security</SelectItem>
                            <SelectItem value="admin">Administration</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Job Role</Label>
                        <Input
                          id="role"
                          value={profile.role}
                          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Work Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio (English)</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bioMalayalam">Bio (Malayalam)</Label>
                      <Textarea
                        id="bioMalayalam"
                        value={profile.bioMalayalam}
                        onChange={(e) => setProfile({ ...profile, bioMalayalam: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <Button onClick={handleSave} className="gradient-kerala text-white">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      User Preferences
                    </CardTitle>
                    <CardDescription>ഉപയോക്തൃ മുൻഗണനകൾ</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Preferred Language / മുൻഗണനാ ഭാഷ</Label>
                      <Select
                        value={profile.language}
                        onValueChange={(value) => setProfile({ ...profile, language: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="malayalam">Malayalam / മലയാളം</SelectItem>
                          <SelectItem value="both">Both / രണ്ടും</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Notification Preferences
                      </Label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive updates via email</p>
                          </div>
                          <Button
                            variant={profile.notifications.email ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              setProfile({
                                ...profile,
                                notifications: { ...profile.notifications, email: !profile.notifications.email },
                              })
                            }
                          >
                            {profile.notifications.email ? "Enabled" : "Disabled"}
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">WhatsApp Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive updates via WhatsApp</p>
                          </div>
                          <Button
                            variant={profile.notifications.whatsapp ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              setProfile({
                                ...profile,
                                notifications: { ...profile.notifications, whatsapp: !profile.notifications.whatsapp },
                              })
                            }
                          >
                            {profile.notifications.whatsapp ? "Enabled" : "Disabled"}
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                          </div>
                          <Button
                            variant={profile.notifications.push ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              setProfile({
                                ...profile,
                                notifications: { ...profile.notifications, push: !profile.notifications.push },
                              })
                            }
                          >
                            {profile.notifications.push ? "Enabled" : "Disabled"}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleSave} className="gradient-kerala text-white">
                      <Save className="mr-2 h-4 w-4" />
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>സുരക്ഷാ ക്രമീകരണങ്ങൾ</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" placeholder="Enter current password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>
                    <Button className="gradient-kerala text-white">
                      <Key className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>സമീപകാല പ്രവർത്തനം</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Searched for "safety protocols"</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Uploaded maintenance report</p>
                          <p className="text-xs text-muted-foreground">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                        <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Used WhatsApp bot for document query</p>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
