"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Eye, CheckCircle, XCircle, Edit, FileText } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface Case {
  id: string
  crNumber: string
  derNumber: string
  title: string
  status: "Under Review" | "Pending Review" | "Reviewed"
  submittedDate: string
  investigator: string
  department: string
  priority: "High" | "Medium" | "Low"
  summary: string
  evidence: string[]
  witnesses: string[]
}

export function ReviewCases() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [reviewAction, setReviewAction] = useState<"accept" | "reject" | "modify" | null>(null)
  const [reviewNote, setReviewNote] = useState("")

  // Mock data for cases under review
  const cases: Case[] = [
    {
      id: "1",
      crNumber: "CR-2024-001",
      derNumber: "DER-2024-001",
      title: "Drug Trafficking Investigation",
      status: "Under Review",
      submittedDate: "2024-08-20",
      investigator: "John Smith",
      department: "Major Crime Division",
      priority: "High",
      summary: "Investigation into organized drug trafficking network operating across multiple regions.",
      evidence: ["Physical evidence", "Digital records", "Financial documents"],
      witnesses: ["Witness A", "Witness B", "Informant C"],
    },
    {
      id: "2",
      crNumber: "CR-2024-005",
      derNumber: "DER-2024-005",
      title: "Financial Fraud Case",
      status: "Pending Review",
      submittedDate: "2024-08-22",
      investigator: "Jane Doe",
      department: "Financial Crime Division",
      priority: "Medium",
      summary: "Complex financial fraud involving multiple corporate entities and shell companies.",
      evidence: ["Bank statements", "Transaction records", "Corporate documents"],
      witnesses: ["Bank Manager", "Accountant", "Former Employee"],
    },
    {
      id: "3",
      crNumber: "CR-2024-008",
      derNumber: "DER-2024-008",
      title: "Corruption Investigation",
      status: "Under Review",
      submittedDate: "2024-08-25",
      investigator: "Mike Johnson",
      department: "Anti-Corruption Division",
      priority: "High",
      summary: "Government official corruption case involving bribery and abuse of power.",
      evidence: ["Audio recordings", "Financial records", "Communication logs"],
      witnesses: ["Government Employee", "Contractor", "Whistleblower"],
    },
  ]

  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.crNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter
    return matchesSearch && matchesStatus
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Pending Review":
        return "bg-orange-100 text-orange-800"
      case "Reviewed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleReviewSubmit = () => {
    if (selectedCase && reviewAction && reviewNote) {
      // In real app, this would submit the review decision
      console.log("Review submitted:", {
        caseId: selectedCase.id,
        action: reviewAction,
        note: reviewNote,
      })

      // Reset form
      setReviewAction(null)
      setReviewNote("")
      setSelectedCase(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.prosecutor.reviewCases}</h1>
          <p className="text-gray-600">{t.prosecutor.reviewCasesDescription}</p>
        </div>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t.common.filterByStatus} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.common.allStatuses}</SelectItem>
                <SelectItem value="Pending Review">{t.prosecutor.pendingReview}</SelectItem>
                <SelectItem value="Under Review">{t.prosecutor.underReview}</SelectItem>
                <SelectItem value="Reviewed">{t.prosecutor.reviewed}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <div className="grid gap-4">
        {filteredCases.map((case_) => (
          <Card key={case_.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{case_.title}</h3>
                    <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                    <p>
                      <span className="font-medium">CR Number:</span> {case_.crNumber}
                    </p>
                    <p>
                      <span className="font-medium">DER Number:</span> {case_.derNumber}
                    </p>
                    <p>
                      <span className="font-medium">Investigator:</span> {case_.investigator}
                    </p>
                    <p>
                      <span className="font-medium">Submitted:</span> {case_.submittedDate}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{case_.summary}</p>
                  <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCase(case_)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        {t.common.viewDetails}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          {t.prosecutor.caseDetails}
                        </DialogTitle>
                      </DialogHeader>

                      {selectedCase && (
                        <div className="space-y-6">
                          {/* Case Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="font-medium">{t.common.caseTitle}</Label>
                              <p className="text-sm text-gray-700">{selectedCase.title}</p>
                            </div>
                            <div>
                              <Label className="font-medium">{t.common.department}</Label>
                              <p className="text-sm text-gray-700">{selectedCase.department}</p>
                            </div>
                            <div>
                              <Label className="font-medium">CR Number</Label>
                              <p className="text-sm text-gray-700">{selectedCase.crNumber}</p>
                            </div>
                            <div>
                              <Label className="font-medium">DER Number</Label>
                              <p className="text-sm text-gray-700">{selectedCase.derNumber}</p>
                            </div>
                          </div>

                          {/* Case Summary */}
                          <div>
                            <Label className="font-medium">{t.prosecutor.caseSummary}</Label>
                            <p className="text-sm text-gray-700 mt-1">{selectedCase.summary}</p>
                          </div>

                          {/* Evidence */}
                          <div>
                            <Label className="font-medium">{t.prosecutor.evidence}</Label>
                            <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                              {selectedCase.evidence.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Witnesses */}
                          <div>
                            <Label className="font-medium">{t.prosecutor.witnesses}</Label>
                            <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                              {selectedCase.witnesses.map((witness, index) => (
                                <li key={index}>{witness}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Review Decision */}
                          <div className="border-t pt-4">
                            <Label className="font-medium">{t.prosecutor.reviewDecision}</Label>
                            <div className="flex gap-2 mt-2">
                              <Button
                                variant={reviewAction === "accept" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setReviewAction("accept")}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle className="h-4 w-4" />
                                {t.prosecutor.accept}
                              </Button>
                              <Button
                                variant={reviewAction === "reject" ? "destructive" : "outline"}
                                size="sm"
                                onClick={() => setReviewAction("reject")}
                                className="flex items-center gap-2"
                              >
                                <XCircle className="h-4 w-4" />
                                {t.prosecutor.reject}
                              </Button>
                              <Button
                                variant={reviewAction === "modify" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setReviewAction("modify")}
                                className="flex items-center gap-2"
                              >
                                <Edit className="h-4 w-4" />
                                {t.prosecutor.requestModification}
                              </Button>
                            </div>
                          </div>

                          {/* Review Note */}
                          {reviewAction && (
                            <div>
                              <Label htmlFor="reviewNote" className="font-medium">
                                {t.prosecutor.reviewNote}
                              </Label>
                              <Textarea
                                id="reviewNote"
                                value={reviewNote}
                                onChange={(e) => setReviewNote(e.target.value)}
                                placeholder={t.prosecutor.reviewNotePlaceholder}
                                rows={4}
                                className="mt-2"
                              />
                            </div>
                          )}

                          {/* Submit Button */}
                          {reviewAction && reviewNote && (
                            <div className="flex justify-end">
                              <Button onClick={handleReviewSubmit}>{t.prosecutor.submitReview}</Button>
                            </div>
                          )}
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

      {filteredCases.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">{t.common.noDataFound}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
