// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   User,
//   Bell,
//   Train,
//   Save,
//   RefreshCw,
//   MessageSquare,
//   Bot,
//   Database,
//   Calendar,
// } from "lucide-react";
// import Link from "next/link";

// export default function SettingsPage() {
//   const [notifications, setNotifications] = useState({
//     email: true,
//     whatsapp: true,
//     dailyDigest: true,
//     documentUpdates: true,
//     systemAlerts: false,
//   });

//   const [profile, setProfile] = useState({
//     name: "Metro Worker",
//     namemalayalam: "മെട്രോ തൊഴിലാളി",
//     email: "worker@kmrl.co.in",
//     phone: "+91 9876543210",
//     department: "Operations",
//     role: "Senior Operator",
//     employeeId: "KMRL001",
//     language: "malayalam",
//   });

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Link href="/" className="flex items-center space-x-2">
//                 <Train className="h-6 w-6 text-primary" />
//                 <span className="font-bold text-lg">KMRL Chakra</span>
//               </Link>
//             </div>
//             <nav className="hidden md:flex items-center space-x-6">
//               <Link
//                 href="/dashboard"
//                 className="text-foreground hover:text-primary transition-colors"
//               >
//                 Dashboard
//               </Link>
//               <Link
//                 href="/documents"
//                 className="text-foreground hover:text-primary transition-colors"
//               >
//                 Documents
//               </Link>
//               <Link
//                 href="/search"
//                 className="text-foreground hover:text-primary transition-colors"
//               >
//                 Search
//               </Link>
//               <Link
//                 href="/analytics"
//                 className="text-foreground hover:text-primary transition-colors"
//               >
//                 Analytics
//               </Link>
//               <Link href="/settings" className="text-primary font-medium">
//                 Settings
//               </Link>
//             </nav>
//             <Button asChild>
//               <Link href="/dashboard">Dashboard</Link>
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2">Settings</h1>
//           <p className="text-xl text-muted-foreground mb-1">ക്രമീകരണങ്ങൾ</p>
//           <p className="text-muted-foreground">
//             Customize your KMRL Chakra experience and manage your preferences.
//           </p>
//         </div>

//         <Tabs defaultValue="profile" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-5">
//             <TabsTrigger value="profile">Profile</TabsTrigger>
//             <TabsTrigger value="notifications">Notifications</TabsTrigger>
//             <TabsTrigger value="language">Language</TabsTrigger>
//             <TabsTrigger value="security">Security</TabsTrigger>
//             <TabsTrigger value="system">System</TabsTrigger>
//           </TabsList>

//           <TabsContent value="profile" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <User className="h-5 w-5 mr-2" />
//                   Profile Information
//                 </CardTitle>
//                 <CardDescription>പ്രൊഫൈൽ വിവരങ്ങൾ</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Full Name</Label>
//                     <Input
//                       id="name"
//                       value={profile.name}
//                       onChange={(e) =>
//                         setProfile({ ...profile, name: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="namemalayalam">Name in Malayalam</Label>
//                     <Input
//                       id="namemalayalam"
//                       value={profile.namemalayalam}
//                       onChange={(e) =>
//                         setProfile({
//                           ...profile,
//                           namemalayalam: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email Address</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       value={profile.email}
//                       onChange={(e) =>
//                         setProfile({ ...profile, email: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone Number</Label>
//                     <Input
//                       id="phone"
//                       value={profile.phone}
//                       onChange={(e) =>
//                         setProfile({ ...profile, phone: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="employeeid">Employee ID</Label>
//                     <Input
//                       id="employeeid"
//                       value={profile.employeeId}
//                       onChange={(e) =>
//                         setProfile({ ...profile, employeeId: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="department">Department</Label>
//                     <Select
//                       value={profile.department}
//                       onValueChange={(value) =>
//                         setProfile({ ...profile, department: value })
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="operations">Operations</SelectItem>
//                         <SelectItem value="maintenance">Maintenance</SelectItem>
//                         <SelectItem value="safety">Safety</SelectItem>
//                         <SelectItem value="hr">Human Resources</SelectItem>
//                         <SelectItem value="finance">Finance</SelectItem>
//                         <SelectItem value="management">Management</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <div className="flex justify-end space-x-4">
//                   <Button variant="outline">
//                     <RefreshCw className="h-4 w-4 mr-2" />
//                     Reset
//                   </Button>
//                   <Button>
//                     <Save className="h-4 w-4 mr-2" />
//                     Save Changes
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Profile Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <Card>
//                 <CardContent className="p-6 text-center">
//                   <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
//                   <p className="text-2xl font-bold">2.5 years</p>
//                   <p className="text-sm text-muted-foreground">With KMRL</p>
//                   <p className="text-xs text-muted-foreground">KMRL-ൽ</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardContent className="p-6 text-center">
//                   <Bot className="h-8 w-8 text-blue-600 mx-auto mb-2" />
//                   <p className="text-2xl font-bold">1,234</p>
//                   <p className="text-sm text-muted-foreground">AI Queries</p>
//                   <p className="text-xs text-muted-foreground">AI ചോദ്യങ്ങൾ</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardContent className="p-6 text-center">
//                   <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
//                   <p className="text-2xl font-bold">567</p>
//                   <p className="text-sm text-muted-foreground">
//                     Documents Accessed
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     ആക്സസ് ചെയ്ത ഡോക്യുമെന്റുകൾ
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardContent className="p-6 text-center">
//                   <MessageSquare className="h-8 w-8 text-orange-600 mx-auto mb-2" />
//                   <p className="text-2xl font-bold">89</p>
//                   <p className="text-sm text-muted-foreground">
//                     WhatsApp Chats
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     വാട്സ്ആപ്പ് ചാറ്റുകൾ
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="notifications" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <Bell className="h-5 w-5 mr-2" />
//                   Notification Preferences
//                 </CardTitle>
//                 <CardDescription>
//                   Manage how you receive notifications and alerts
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <Label className="text-base font-medium">
//                         Email Notifications
//                       </Label>
//                       <p className="text-sm text-gray-400">
//                         Receive updates via email
//                       </p>
//                     </div>
//                     <Button
//                       variant={notifications.email ? "default" : "outline"}
//                       size="sm"
//                       onClick={() =>
//                         setNotifications({
//                           ...notifications,
//                           email: !notifications.email,
//                         })
//                       }
//                     >
//                       {notifications.email ? "Enabled" : "Disabled"}
//                     </Button>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <Label className="text-base font-medium">
//                         WhatsApp Notifications
//                       </Label>
//                       <p className="text-sm text-gray-400">
//                         Get instant updates on WhatsApp
//                       </p>
//                     </div>
//                     <Button
//                       variant={notifications.whatsapp ? "default" : "outline"}
//                       size="sm"
//                       onClick={() =>
//                         setNotifications({
//                           ...notifications,
//                           whatsapp: !notifications.whatsapp,
//                         })
//                       }
//                     >
//                       {notifications.whatsapp ? "Enabled" : "Disabled"}
//                     </Button>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <Label className="text-base font-medium">
//                         Daily Digest
//                       </Label>
//                       <p className="text-sm text-gray-400">
//                         Daily summary of activities
//                       </p>
//                     </div>
//                     <Button
//                       variant={
//                         notifications.dailyDigest ? "default" : "outline"
//                       }
//                       size="sm"
//                       onClick={() =>
//                         setNotifications({
//                           ...notifications,
//                           dailyDigest: !notifications.dailyDigest,
//                         })
//                       }
//                     >
//                       {notifications.dailyDigest ? "Enabled" : "Disabled"}
//                     </Button>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <Label className="text-base font-medium">
//                         Document Updates
//                       </Label>
//                       <p className="text-sm text-gray-400">
//                         New document notifications
//                       </p>
//                     </div>
//                     <Button
//                       variant={
//                         notifications.documentUpdates ? "default" : "outline"
//                       }
//                       size="sm"
//                       onClick={() =>
//                         setNotifications({
//                           ...notifications,
//                           documentUpdates: !notifications.documentUpdates,
//                         })
//                       }
//                     >
//                       {notifications.documentUpdates ? "Enabled" : "Disabled"}
//                     </Button>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <Label className="text-base font-medium">
//                         System Alerts
//                       </Label>
//                       <p className="text-sm text-gray-400">
//                         Critical system notifications
//                       </p>
//                     </div>
//                     <Button
//                       variant={
//                         notifications.systemAlerts ? "default" : "outline"
//                       }
//                       size="sm"
//                       onClick={() =>
//                         setNotifications({
//                           ...notifications,
//                           systemAlerts: !notifications.systemAlerts,
//                         })
//                       }
//                     >
//                       {notifications.systemAlerts ? "Enabled" : "Disabled"}
//                     </Button>
//                   </div>
//                 </div>
//                 <div className="flex justify-end">
//                   <Button>
//                     <Save className="h-4 w-4 mr-2" />
//                     Save Preferences
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="language" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Language & Region</CardTitle>
//                 <CardDescription>
//                   Set your preferred language and regional settings
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="interface-language">
//                       Interface Language
//                     </Label>
//                     <Select
//                       value={profile.language}
//                       onValueChange={(value) =>
//                         setProfile({ ...profile, language: value })
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="english">English</SelectItem>
//                         <SelectItem value="malayalam">Malayalam</SelectItem>
//                         <SelectItem value="hindi">Hindi</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="date-format">Date Format</Label>
//                     <Select defaultValue="dd/mm/yyyy">
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
//                         <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
//                         <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="time-format">Time Format</Label>
//                     <Select defaultValue="24h">
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="12h">12 Hour</SelectItem>
//                         <SelectItem value="24h">24 Hour</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="timezone">Timezone</Label>
//                     <Select defaultValue="ist">
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="ist">
//                           India Standard Time (IST)
//                         </SelectItem>
//                         <SelectItem value="utc">UTC</SelectItem>
//                         <SelectItem value="gmt">GMT</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <div className="flex justify-end">
//                   <Button>
//                     <Save className="h-4 w-4 mr-2" />
//                     Save Settings
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="security" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Security Settings</CardTitle>
//                 <CardDescription>
//                   Manage your account security and privacy
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="current-password">Current Password</Label>
//                     <Input
//                       id="current-password"
//                       type="password"
//                       placeholder="Enter current password"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="new-password">New Password</Label>
//                     <Input
//                       id="new-password"
//                       type="password"
//                       placeholder="Enter new password"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="confirm-password">
//                       Confirm New Password
//                     </Label>
//                     <Input
//                       id="confirm-password"
//                       type="password"
//                       placeholder="Confirm new password"
//                     />
//                   </div>
//                 </div>
//                 <div className="border-t pt-6">
//                   <h4 className="text-lg font-medium mb-4">
//                     Two-Factor Authentication
//                   </h4>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <Label className="text-base font-medium">
//                         Enable 2FA
//                       </Label>
//                       <p className="text-sm text-gray-400">
//                         Add extra security to your account
//                       </p>
//                     </div>
//                     <Button variant="outline">Setup 2FA</Button>
//                   </div>
//                 </div>
//                 <div className="border-t pt-6">
//                   <h4 className="text-lg font-medium mb-4">Active Sessions</h4>
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between p-3 border rounded-lg">
//                       <div>
//                         <p className="font-medium">Current Session</p>
//                         <p className="text-sm text-gray-400">
//                           Chrome on Windows • Kochi, Kerala
//                         </p>
//                       </div>
//                       <span className="text-sm text-green-600">Active</span>
//                     </div>
//                     <div className="flex items-center justify-between p-3 border rounded-lg">
//                       <div>
//                         <p className="font-medium">Mobile App</p>
//                         <p className="text-sm text-gray-400">
//                           Android • Last seen 2 hours ago
//                         </p>
//                       </div>
//                       <Button variant="outline" size="sm">
//                         Revoke
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex justify-end space-x-4">
//                   <Button variant="outline">Cancel</Button>
//                   <Button>Update Password</Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="system" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>System Preferences</CardTitle>
//                 <CardDescription>
//                   Configure system-wide settings and preferences
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="theme">Theme</Label>
//                     <Select defaultValue="dark">
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="light">Light</SelectItem>
//                         <SelectItem value="dark">Dark</SelectItem>
//                         <SelectItem value="system">System</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="items-per-page">Items per Page</Label>
//                     <Select defaultValue="20">
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="10">10</SelectItem>
//                         <SelectItem value="20">20</SelectItem>
//                         <SelectItem value="50">50</SelectItem>
//                         <SelectItem value="100">100</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="auto-save">Auto-save Interval</Label>
//                     <Select defaultValue="5">
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="1">1 minute</SelectItem>
//                         <SelectItem value="5">5 minutes</SelectItem>
//                         <SelectItem value="10">10 minutes</SelectItem>
//                         <SelectItem value="30">30 minutes</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <div className="border-t pt-6">
//                   <h4 className="text-lg font-medium mb-4">Data & Storage</h4>
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <Label className="text-base font-medium">
//                           Cache Size
//                         </Label>
//                         <p className="text-sm text-gray-400">
//                           Current cache: 245 MB
//                         </p>
//                       </div>
//                       <Button variant="outline">Clear Cache</Button>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <Label className="text-base font-medium">
//                           Download Location
//                         </Label>
//                         <p className="text-sm text-gray-400">
//                           /Downloads/KMRL-Documents
//                         </p>
//                       </div>
//                       <Button variant="outline">Change</Button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="border-t pt-6">
//                   <h4 className="text-lg font-medium mb-4">
//                     System Information
//                   </h4>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <p className="text-gray-400">Version</p>
//                       <p className="font-medium">KMRL Chakra v2.1.0</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-400">Last Updated</p>
//                       <p className="font-medium">January 15, 2025</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-400">Database</p>
//                       <p className="font-medium">Connected</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-400">AI Service</p>
//                       <p className="font-medium">Online</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex justify-end space-x-4">
//                   <Button variant="outline">Reset to Defaults</Button>
//                   <Button>Save Changes</Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/signup");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-400">Redirecting to signup...</p>
      </div>
    </div>
  );
}
