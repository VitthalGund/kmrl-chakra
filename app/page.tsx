"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  Train,
  Shield,
  Zap,
  Search,
  FileText,
  MessageSquare,
  Bot,
  Users,
  BarChart3,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const features = [
    {
      icon: <Bot className="h-8 w-8 text-blue-500" />,
      title: "AI-Powered Search",
      description: "Advanced AI helps you find documents instantly using natural language queries",
      badge: "AI Powered",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-green-500" />,
      title: "WhatsApp Integration",
      description: "Access documents and get AI assistance directly through WhatsApp",
      badge: "Mobile Ready",
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: "Secure Document Management",
      description: "Enterprise-grade security ensures your sensitive documents are protected",
      badge: "Secure",
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: "Real-time Analytics",
      description: "Monitor document usage and system performance with comprehensive analytics",
      badge: "Real-time",
    },
    {
      icon: <Users className="h-8 w-8 text-red-500" />,
      title: "Multi-Department Support",
      description: "Organized access for Operations, Maintenance, HR, Safety, and Finance departments",
      badge: "Multi-Dept",
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-400" />,
      title: "Smart Document Classification",
      description: "Automatically categorize and tag documents for easy retrieval",
      badge: "Smart",
    },
  ]

  const quickStats = [
    {
      title: "Total Documents",
      value: "2,847",
      change: "+12%",
      icon: <FileText className="h-6 w-6 text-primary" />,
    },
    {
      title: "AI Queries Today",
      value: "156",
      change: "+28%",
      icon: <Bot className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Active Users",
      value: "89",
      change: "+15%",
      icon: <Users className="h-6 w-6 text-green-500" />,
    },
    {
      title: "System Efficiency",
      value: "94.2%",
      change: "+2.1%",
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
    },
  ]

  const faqs = [
    {
      question: "How does the AI search work?",
      answer:
        "Our AI system understands natural language queries in both Malayalam and English. You can ask questions like 'What are the safety procedures?' and get relevant documents instantly.",
    },
    {
      question: "Can I access documents through WhatsApp?",
      answer:
        "Yes! Our WhatsApp bot integration allows you to search for documents, ask questions, and get AI assistance directly through WhatsApp. Perfect for mobile access.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use enterprise-grade security measures including encryption, secure access controls, and regular security audits to protect all documents and user data.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Train className="h-8 w-8 text-primary float-animation" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full pulse-glow"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">KMRL Chakra</h1>
                <p className="text-sm text-gray-400">Intelligent Document System</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-300 hover:text-primary transition-colors">
                Features
              </a>
              <a href="#dashboard" className="text-gray-300 hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="#about" className="text-gray-300 hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-300 hover:text-primary transition-colors">
                Contact
              </a>
            </nav>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/documents">
                Access System <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2 bg-accent/20 text-accent">
              <Train className="mr-2 h-4 w-4" />
              Kochi Metro Rail Limited
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              <span className="text-primary">KMRL Chakra</span>
              <br />
              <span className="text-gray-300">"ജ്ഞാനത്തിന്റെ ചക്രം - The Wheel of Knowledge"</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 text-balance max-w-3xl mx-auto">
              AI-powered document management system designed specifically for Kochi Metro Rail Limited workers.
              Experience intelligent document search, multilingual support, and seamless workflow automation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6" asChild>
                <Link href="/documents">
                  Access Documents <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                asChild
              >
                <Link href="/search">
                  <Search className="mr-2 h-5 w-5" />
                  Search Documents
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Bot Integration Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center text-2xl">
                  <MessageSquare className="h-8 w-8 text-green-500 mr-3" />
                  WhatsApp Bot Integration
                </CardTitle>
                <CardDescription className="text-lg">
                  Get instant access to documents and AI assistance through WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-400 mb-6">
                  Connect with our intelligent WhatsApp bot for mobile document access, quick searches, and AI-powered
                  assistance on the go.
                </p>
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Start WhatsApp Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Quick search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-32 py-4 text-base rounded-lg bg-card border-gray-600 text-gray-300"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12" asChild>
                <Link href="/search">
                  <Bot className="h-4 w-4 mr-2" />
                  AI Search
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 slide-in-up bg-card border-border"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-200">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="float-animation">{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2 bg-accent/20 text-accent">
              <Zap className="mr-2 h-4 w-4" />
              Advanced Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4 text-gray-200">Powerful Features for Metro Operations</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Comprehensive tools designed specifically for Kochi Metro Rail Limited's document management needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 slide-in-up group bg-card border-border"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="group-hover:scale-110 transition-transform">{feature.icon}</div>
                    <Badge variant="secondary" className="text-xs bg-accent/20 text-accent">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-gray-200">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="dashboard" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-8">
            <Train className="h-16 w-16 text-primary mx-auto mb-6 float-animation" />
            <h2 className="text-3xl font-bold mb-2 text-foreground">Ready to Get Started?</h2>
            <p className="text-xl text-primary font-medium mb-4">ആരംഭിക്കാൻ തയ്യാറാണോ?</p>
            <p className="text-muted-foreground mb-6">
              Access your personalized dashboard and start exploring the intelligent document management system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/documents">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Access Dashboard
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/search">
                  <Search className="mr-2 h-5 w-5" />
                  Search Documents
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-200">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader className="cursor-pointer" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-gray-200">{faq.question}</CardTitle>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </CardHeader>
                {openFaq === index && (
                  <CardContent>
                    <p className="text-gray-400">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-200">Contact Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center bg-card border-border">
              <CardHeader>
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-gray-200">Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">+91 484 2346800</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-border">
              <CardHeader>
                <Mail className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-gray-200">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">info@kochimetro.org</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-border">
              <CardHeader>
                <MapPin className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-gray-200">Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">KMRL House, Kochi, Kerala</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Train className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg text-gray-200">KMRL Chakra</span>
              </div>
              <p className="text-gray-400">Intelligent Document Management System for Kochi Metro Rail Limited</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Quick Access</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/documents" className="hover:text-primary transition-colors">
                    Documents
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="hover:text-primary transition-colors">
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="hover:text-primary transition-colors">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Departments</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Operations</li>
                <li>Maintenance</li>
                <li>Human Resources</li>
                <li>Safety</li>
                <li>Finance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>WhatsApp Bot</li>
                <li>AI Assistant</li>
                <li>Contact Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Kochi Metro Rail Limited. All rights reserved.</p>
            <p className="text-sm mt-2">Powered by KMRL Chakra - Intelligent Document Management System</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
