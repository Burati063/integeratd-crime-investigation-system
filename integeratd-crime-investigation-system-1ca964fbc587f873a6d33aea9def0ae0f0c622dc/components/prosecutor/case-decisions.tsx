"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Eye, CheckCircle, XCircle, Edit, Calendar, User } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface CaseDecision {
  id: string
  crNumber: string
  derNumber: string
  title: string
  decision: "Accepted" | "Rejected" | "Modification Requested"
  decisionDate: string
  reviewedBy: string
  investigator: string
  department: string
  priority: "High" | "Medium" | "Low"
  reviewNote: string
  summary: string
}

export function CaseDecisions() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [decisionFilter, setDecisionFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedCase, setSelectedCase] = useState<CaseDecision | null>(null)

  // Mock data for decided cases
  const decisions: CaseDecision[] = [
    {
      id: "1",
      crNumber: "CR-2024-001",
      derNumber: "DER-2024-001",
      title: "Drug Trafficking Investigation",
      decision: "Accepted",
      decisionDate: "2024-08-25",
      reviewedBy: "Prosecutor Smith",
      investigator: "John Smith",
      department: "Major Crime Division",
      priority: "High",
      reviewNote: "Strong evidence and witness testimonies support prosecution. Case approved for trial.",
      summary: "Investigation into organized drug trafficking network operating across multiple regions.",
    },
    {
      id: "2",
      crNumber: "CR-2024-003",
      derNumber: "DER-2024-003",
      title: "Financial Fraud Case",
      decision: "Modification Requested",
      decisionDate: "2024-08-24",
      reviewedBy: "Prosecutor Johnson",
      investigator: "Jane Doe",
      department: "Financial Crime Division",
      priority: "Medium",
      reviewNote: "Additional financial records needed. Request more documentation from banking institutions.",
      summary: "Complex financial fraud involving multiple corporate entities and shell companies.",
    },
    {
      id: "3",
      crNumber: "CR-2024-007",
      derNumber: "DER-2024-007",
      title: "Corruption Investigation",
      decision: "Accepted",
      decisionDate: "2024-08-23",
      reviewedBy: "Prosecutor Davis",
      investigator: "Mike Johnson",
      department: "Anti-Corruption Division",
      priority: "High",
      reviewNote:
        "Compelling evidence of corruption. Audio recordings and financial evidence are sufficient for prosecution.",
      summary: "Government official corruption case involving bribery and abuse of power.",
    },
    {
      id: "4",
      crNumber: "CR-2024-012",
      derNumber: "DER-2024-012",
      title: "Cybercrime Investigation",
      decision: "Rejected",
      decisionDate: "2024-08-22",
      reviewedBy: "Prosecutor Wilson",
      investigator: "Sarah Brown",
      department: "Technology Crime Division",
      priority: "Low",
      reviewNote: "Insufficient evidence to proceed with prosecution. Digital forensics inconclusive.",
      summary: "Investigation into online fraud and identity theft operations.",
    },
    {
      id: "5",
      crNumber: "CR-2024-015",
      derNumber: "DER-2024-015",
      title: "Human Trafficking Case",
      decision: "Accepted",
      decisionDate: "2024-08-21",
      reviewedBy: "Prosecutor Smith",
      investigator: "Robert Lee",
      department: "Major Crime Division",
      priority: "High",
      reviewNote:
        "Strong case with multiple victim testimonies and physical evidence. Approved for immediate prosecution.",
      summary: "International human trafficking ring investigation with multiple victims.",
    },
  ]

  const filteredDecisions = decisions.filter((decision) => {
    const matchesSearch =
      decision.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      decision.crNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDecision = decisionFilter === "all" || decision.decision === decisionFilter

    let matchesDate = true
    if (dateFilter !== "all") {
      const decisionDate = new Date(decision.decisionDate)
      const today = new Date()
      const daysDiff = Math.floor((today.getTime() - decisionDate.getTime()) / (1000 * 60 * 60 * 24))

      switch (dateFilter) {
        case "today":
          matchesDate = daysDiff === 0
          break
        case "week":
          matchesDate = daysDiff <= 7
          break
        case "month":
          matchesDate = daysDiff <= 30
          break
      }
    }

    return matchesSearch && matchesDecision && matchesDate
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case "Accepted":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Modification Requested":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case "Accepted":
        return <CheckCircle className="h-4 w-4" />
      case "Rejected":
        return <XCircle className="h-4 w-4" />
      case "Modification Requested":
        return <Edit className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.prosecutor.caseDecisions}</h1>
          <p className="text-gray-600">{t.prosecutor.caseDecisionsDescription}</p>
        </div>
        <div className="text-sm text-gray-600">Total Decisions: {decisions.length}</div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.prosecutor.accepted}</p>
                <p className="text-2xl font-bold text-green-600">
                  {decisions.filter((d) => d.decision === "Accepted").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.prosecutor.rejected}</p>
                <p className="text-2xl font-bold text-red-600">
                  {decisions.filter((d) => d.decision === "Rejected").length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.prosecutor.modifications}</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {decisions.filter((d) => d.decision === "Modification Requested").length}
                </p>
              </div>
              <Edit className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.prosecutor.thisWeek}</p>
                <p className="text-2xl font-bold text-blue-600">
                  {
                    decisions.filter((d) => {
                      const decisionDate = new Date(d.decisionDate)
                      const today = new Date()
                      const daysDiff = Math.floor((today.getTime() - decisionDate.getTime()) / (1000 * 60 * 60 * 24))
                      return daysDiff <= 7
                    }).length
                  }
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={t.common.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={decisionFilter} onValueChange={setDecisionFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t.prosecutor.filterByDecision} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.common.allDecisions}</SelectItem>
                <SelectItem value="Accepted">{t.prosecutor.accepted}</SelectItem>
                <SelectItem value="Rejected">{t.prosecutor.rejected}</SelectItem>
                <SelectItem value="Modification Requested">{t.prosecutor.modifications}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t.prosecutor.filterByDate} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.common.allTime}</SelectItem>
                <SelectItem value="today">{t.common.today}</SelectItem>
                <SelectItem value="week">{t.common.thisWeek}</SelectItem>
                <SelectItem value="month">{t.common.thisMonth}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Decisions List */}
      <div className="grid gap-4">
        {filteredDecisions.map((decision) => (
          <Card key={decision.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{decision.title}</h3>
                    <Badge className={getPriorityColor(decision.priority)}>{decision.priority}</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                    <p>
                      <span className="font-medium">CR Number:</span> {decision.crNumber}
                    </p>
                    <p>
                      <span className="font-medium">DER Number:</span> {decision.derNumber}
                    </p>
                    <p>
                      <span className="font-medium">Reviewed by:</span> {decision.reviewedBy}
                    </p>
                    <p>
                      <span className="font-medium">Decision Date:</span> {decision.decisionDate}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{decision.summary}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={getDecisionColor(decision.decision)}>
                      <div className="flex items-center gap-1">
                        {getDecisionIcon(decision.decision)}
                        {decision.decision}
                      </div>
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCase(decision)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        {t.common.viewDetails}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          {t.prosecutor.decisionDetails}
                        </DialogTitle>
                      </DialogHeader>

                      {selectedCase && (
                        <div className="space-y-6">
                          {/* Case Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-gray-700">{t.common.caseTitle}</p>
                              <p className="text-sm text-gray-600">{selectedCase.title}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">{t.common.department}</p>
                              <p className="text-sm text-gray-600">{selectedCase.department}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">CR Number</p>
                              <p className="text-sm text-gray-600">{selectedCase.crNumber}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">DER Number</p>
                              <p className="text-sm text-gray-600">{selectedCase.derNumber}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">{t.prosecutor.investigator}</p>
                              <p className="text-sm text-gray-600">{selectedCase.investigator}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">{t.prosecutor.reviewedBy}</p>
                              <p className="text-sm text-gray-600">{selectedCase.reviewedBy}</p>
                            </div>
                          </div>

                          {/* Decision Information */}
                          <div className="border-t pt-4">
                            <div className="flex items-center gap-4 mb-4">
                              <div>
                                <p className="font-medium text-gray-700">{t.prosecutor.decision}</p>
                                <Badge className={getDecisionColor(selectedCase.decision)}>
                                  <div className="flex items-center gap-1">
                                    {getDecisionIcon(selectedCase.decision)}
                                    {selectedCase.decision}
                                  </div>
                                </Badge>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700">{t.prosecutor.decisionDate}</p>
                                <p className="text-sm text-gray-600">{selectedCase.decisionDate}</p>
                              </div>
                            </div>
                          </div>

                          {/* Case Summary */}
                          <div>
                            <p className="font-medium text-gray-700 mb-2">{t.prosecutor.caseSummary}</p>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedCase.summary}</p>
                          </div>

                          {/* Review Note */}
                          <div>
                            <p className="font-medium text-gray-700 mb-2">{t.prosecutor.reviewNote}</p>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedCase.reviewNote}</p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDecisions.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">{t.common.noDataFound}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
