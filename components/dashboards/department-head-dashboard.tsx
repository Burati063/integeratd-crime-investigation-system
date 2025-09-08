"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/layout/sidebar"
import { Clock, Users, CheckCircle, Activity } from "lucide-react"

export function DepartmentHeadDashboard() {
  const stats = [
    { title: "Pending Cases", value: "8", icon: Clock, color: "text-yellow-500" },
    { title: "Available Investigators", value: "12", icon: Users, color: "text-green-500" },
    { title: "Cases Assigned Today", value: "5", icon: CheckCircle, color: "text-blue-500" },
  ]

  const pendingCases = [
    { caseId: "CR-2024-001", title: "Drug Trafficking Case", priority: "High", received: "2 hours ago" },
    { caseId: "CR-2024-002", title: "Financial Fraud", priority: "Medium", received: "4 hours ago" },
    { caseId: "CR-2024-003", title: "Corruption Investigation", priority: "High", received: "6 hours ago" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="department-head" />

      <div className="flex-1 md:ml-64">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Department Head Dashboard</h1>
            <p className="text-gray-600">Review cases and assign investigators.</p>
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

          {/* Pending Cases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Pending Cases for Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingCases.map((case_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{case_.caseId}</p>
                      <p className="text-sm text-gray-600">{case_.title}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          case_.priority === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {case_.priority}
                      </span>
                      <span className="text-xs text-gray-400">{case_.received}</span>
                    </div>
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
