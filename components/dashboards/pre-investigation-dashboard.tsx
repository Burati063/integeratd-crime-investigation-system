"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/layout/sidebar"
import { FileText, Clock, CheckCircle, Activity } from "lucide-react"

export function PreInvestigationDashboard() {
  const stats = [
    { title: "Cases Registered Today", value: "12", icon: FileText, color: "text-blue-500" },
    { title: "Total Cases This Month", value: "89", icon: CheckCircle, color: "text-green-500" },
    { title: "Pending Assignment", value: "5", icon: Clock, color: "text-yellow-500" },
  ]

  const recentActivities = [
    { action: "Case CR-2024-001 registered", department: "Major Crime Division", time: "1 hour ago" },
    { action: "Case CR-2024-002 assigned", department: "Financial Crime Division", time: "3 hours ago" },
    { action: "Case CR-2024-003 submitted", department: "Anti-Corruption Division", time: "5 hours ago" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="pre-investigation" />

      <div className="flex-1 md:ml-64">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Pre-Investigation Dashboard</h1>
            <p className="text-gray-600">Manage case registrations and assignments.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                      <p className="text-xs text-gray-500">{activity.department}</p>
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
