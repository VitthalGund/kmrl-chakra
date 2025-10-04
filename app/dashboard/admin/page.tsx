"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, FileText, Bot, Zap, Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { toast } from "sonner";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Train } from "lucide-react";

// Define a type for our analytics data for better type-safety
interface AnalyticsData {
  total_documents: number;
  total_queries: number;
  active_users: number;
  total_users: number; // FIXED: Added this property
  department_distribution: { [key: string]: number };
  monthly_trends: Array<{
    month: string;
    queries: number;
    users: number;
    documents: number;
  }>;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function AdminAnalyticsPage() {
  const {
    user: currentUser,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth();
  const router = useRouter();

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const data = await apiClient.getAnalytics();
        setAnalyticsData(data);
      } catch (error) {
        toast.error("Failed to fetch analytics data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchAnalytics();
    }
  }, [isAuthenticated]);

  // Security check
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || currentUser?.role !== "Admin") {
        toast.error("Access Denied", {
          description: "You must be an admin to view this page.",
        });
        router.push("/dashboard");
      }
    }
  }, [authLoading, isAuthenticated, currentUser, router]);

  if (authLoading || isLoading || !analyticsData) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const departmentChartData = Object.entries(
    analyticsData.department_distribution
  ).map(([name, value]) => ({
    name,
    value: Math.round(value * 100), // Convert to percentage
  }));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Train className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
              KMRL Chakra
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard/admin" className="text-primary font-medium">
              Analytics
            </Link>
            <Link
              href="/dashboard/documents"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Document Management
            </Link>
            <Link
              href="/dashboard/admin/users"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              User Management
            </Link>
          </nav>

          <Button variant="outline" asChild>
            <Link href="/dashboard">Exit Admin</Link>
          </Button>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Live insights into system performance and user engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Documents
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.total_documents}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">AI Queries</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.total_queries}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.active_users}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.total_users}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Monthly Trends</CardTitle>
              <CardDescription>
                User and query activity over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.monthly_trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="queries" fill="#8884d8" name="AI Queries" />
                  <Bar dataKey="users" fill="#82ca9d" name="Active Users" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">
                Department Usage
              </CardTitle>
              <CardDescription>
                Document distribution by department.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({
                      name,
                      percent,
                    }: {
                      name: string;
                      percent: number;
                    }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
