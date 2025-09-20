"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, ImageIcon, File, CheckCircle, Train, ArrowLeft, Zap, Languages, Shield } from "lucide-react"
import NextLink from "next/link"

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [category, setCategory] = useState("")
  const [department, setDepartment] = useState("")
  const [description, setDescription] = useState("")
  const [language, setLanguage] = useState("english")

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleUpload = async () => {
    setUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-6 w-6 text-blue-500" />
    if (file.type.includes("pdf")) return <FileText className="h-6 w-6 text-red-500" />
    return <File className="h-6 w-6 text-gray-500" />
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
                <Train className="h-6 w-6 text-primary float-animation" />
                <div>
                  <h1 className="text-xl font-bold">Upload Documents</h1>
                  <p className="text-sm text-muted-foreground">ഡോക്യുമെന്റുകൾ അപ്‌ലോഡ് ചെയ്യുക</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="kerala-wave">
              <Zap className="mr-1 h-3 w-3" />
              AI Processing
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="document-scan">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Document Upload
                </CardTitle>
                <CardDescription>
                  Upload documents for AI processing and intelligent categorization
                  <br />
                  <span className="text-primary">AI പ്രോസസ്സിംഗിനും ബുദ്ധിമാനായ വർഗ്ഗീകരണത്തിനുമായി ഡോക്യുമെന്റുകൾ അപ്‌ലോഡ് ചെയ്യുക</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <Upload className="h-12 w-12 text-primary mx-auto mb-4 ai-thinking" />
                  <h3 className="text-lg font-semibold mb-2">Drag & Drop Files Here</h3>
                  <p className="text-muted-foreground mb-4">
                    Or click to browse files
                    <br />
                    <span className="text-sm">അല്ലെങ്കിൽ ഫയലുകൾ ബ്രൗസ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക</span>
                  </p>
                  <Input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  />
                  <Label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer bg-transparent">
                      Select Files
                    </Button>
                  </Label>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB each)
                  </p>
                </div>

                {files.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="font-semibold">Selected Files:</h4>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file)}
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    ))}
                  </div>
                )}

                {uploading && (
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Uploading...</span>
                      <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Document Details */}
            <Card>
              <CardHeader>
                <CardTitle>Document Details</CardTitle>
                <CardDescription>ഡോക്യുമെന്റ് വിശദാംശങ്ങൾ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category / വിഭാഗം</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operations">Operations / പ്രവർത്തനങ്ങൾ</SelectItem>
                        <SelectItem value="maintenance">Maintenance / അറ്റകുറ്റപ്പണി</SelectItem>
                        <SelectItem value="safety">Safety / സുരക്ഷ</SelectItem>
                        <SelectItem value="hr">HR / മാനവ വിഭവശേഷി</SelectItem>
                        <SelectItem value="finance">Finance / ധനകാര്യം</SelectItem>
                        <SelectItem value="technical">Technical / സാങ്കേതികം</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department / വകുപ്പ്</Label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="safety">Safety & Security</SelectItem>
                        <SelectItem value="admin">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Primary Language / പ്രാഥമിക ഭാഷ</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="malayalam">Malayalam / മലയാളം</SelectItem>
                      <SelectItem value="mixed">Mixed / മിശ്രിതം</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description / വിവരണം</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the document content..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={files.length === 0 || uploading}
                  className="w-full gradient-kerala text-white"
                >
                  {uploading ? (
                    <>
                      <div className="ai-thinking mr-2">
                        <Zap className="h-4 w-4" />
                      </div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload & Process Documents
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  End-to-end encryption
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Role-based access control
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Audit trail logging
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Automatic backup
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-primary" />
                  AI Processing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-primary ai-thinking" />
                  Automatic text extraction
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-primary ai-thinking" />
                  Malayalam OCR support
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-primary ai-thinking" />
                  Smart categorization
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-primary ai-thinking" />
                  Content summarization
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Uploads</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  <p>Safety Manual v2.1</p>
                  <p className="text-xs">2 hours ago</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Maintenance Report</p>
                  <p className="text-xs">5 hours ago</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Training Materials</p>
                  <p className="text-xs">1 day ago</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
