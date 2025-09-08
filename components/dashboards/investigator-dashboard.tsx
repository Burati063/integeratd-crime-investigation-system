"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/layout/sidebar"
import { ClipboardList, CheckCircle, Clock, Activity, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n"

export function InvestigatorDashboard() {
  const router = useRouter()
  const { t } = useLanguage()

  const stats = [
    { title: t.investigator.assignedCases, value: "6", icon: ClipboardList, color: "text-blue-500" },
    { title: t.investigator.completedCases, value: "24", icon: CheckCircle, color: "text-green-500" },
    { title: t.investigator.pendingReports, value: "3", icon: Clock, color: "text-yellow-500" },
  ]

  const recentCases = [
    { caseId: "CR-2024-001", title: "Drug Trafficking Investigation", status: "In Progress", deadline: "2024-09-15" },
    { caseId: "CR-2024-005", title: "Financial Fraud Case", status: "Evidence Collection", deadline: "2024-09-20" },
    { caseId: "CR-2024-008", title: "Corruption Investigation", status: "Interview Phase", deadline: "2024-09-25" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="investigator" />

      <div className="flex-1 md:ml-64">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.investigator.dashboard}</h1>
            <p className="text-gray-600">{t.investigator.dashboardDescription}</p>
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

          {/* Recent Cases */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                {t.investigator.recentCases}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/investigator/my-cases")}
                className="flex items-center gap-2"
              >
                {t.common.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Button>
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
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{case_.status}</span>
                      <span className="text-xs text-gray-400">Due: {case_.deadline}</span>
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
