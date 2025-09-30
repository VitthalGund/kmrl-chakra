import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Bell, Languages, Search, Upload } from "lucide-react"

export function FeatureCards() {
  const items = [
    {
      icon: Search,
      title: "Natural Language Search",
      body: "Ask in plain English or Malayalam and get concise answers mapped to your role.",
    },
    {
      icon: Upload,
      title: "Document Ingestion",
      body: "Upload circulars and memos — the system indexes and keeps them at your fingertips.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      body: "Choose real-time, daily or weekly digests to stay on top of what matters.",
    },
    {
      icon: Languages,
      title: "Multilingual",
      body: "English and Malayalam interface and summaries for inclusive access.",
    },
  ]
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2">
      {items.map(({ icon: Icon, title, body }) => (
        <Card key={title} className="surface-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5" /> {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm opacity-90">{body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
