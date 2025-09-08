"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/layout/sidebar"
import { Scale, CheckCircle, XCircle, Clock, Activity } from "lucide-react"

export function ProsecutorDashboard() {
  const stats = [
    { title: "Active Cases", value: "15", icon: Scale, color: "text-blue-500" },
    { title: "Accepted Cases", value: "45", icon: CheckCircle, color: "text-green-500" },
    { title: "Rejected Cases", value: "8", icon: XCircle, color: "text-red-500" },
    { title: "Modification Requests", value: "12", icon: Clock, color: "text-yellow-500" },
  ]

  const recentCases = [
    { caseId: "CR-2024-001", title: "Drug Trafficking Case", status: "Under Review", received: "1 day ago" },
    { caseId: "CR-2024-003", title: "Financial Fraud Investigation", status: "Accepted", received: "2 days ago" },
    { caseId: "CR-2024-007", title: "Corruption Case", status: "Modification Requested", received: "3 days ago" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="prosecutor" />

      <div className="flex-1 md:ml-64">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Prosecutor Dashboard</h1>
            <p className="text-gray-600">Review cases and make prosecution decisions.</p>
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

          {/* Recent Cases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Recent Cases for Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCases.map((case_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{case_.caseId}</p>
                      <p className="text-sm text-gray-600">{case_.title}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          case_.status === "Accepted"
                            ? "bg-green-100 text-green-800"
                            : case_.status === "Under Review"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {case_.status}
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
