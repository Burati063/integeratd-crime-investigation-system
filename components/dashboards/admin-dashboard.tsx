"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/layout/sidebar"
import { Users, Building2, Clock, CheckCircle, Activity } from "lucide-react"

export function AdminDashboard() {
  const stats = [
    { title: "Total Cases", value: "1,234", icon: Building2, color: "text-blue-500" },
    { title: "Active Users", value: "89", icon: Users, color: "text-green-500" },
    { title: "Pending Reviews", value: "23", icon: Clock, color: "text-yellow-500" },
    { title: "Completed Cases", value: "456", icon: CheckCircle, color: "text-purple-500" },
  ]

  const recentActivities = [
    { action: "New case registered", user: "Pre-Investigation Unit", time: "2 hours ago" },
    { action: "Case assigned to investigator", user: "Department Head", time: "4 hours ago" },
    { action: "Investigation completed", user: "Investigator John", time: "6 hours ago" },
    { action: "Case reviewed by prosecutor", user: "Prosecutor Mary", time: "8 hours ago" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="admin" />

      <div className="flex-1 md:ml-64">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening in your system.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">by {activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
