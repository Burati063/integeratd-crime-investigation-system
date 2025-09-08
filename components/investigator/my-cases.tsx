"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, User, FileText, Package, Eye, Calendar, Clock, AlertCircle, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { DemographicDataForm } from "./demographic-data-form"
import { CaseDescriptionForm } from "./case-description-form"
import { ExhibitPropertyForm } from "./exhibit-property-form"

interface Case {
  id: string
  crNumber: string
  derNumber: string
  title: string
  status: string
  assignedDate: string
  deadline: string
  department: string
  priority: "High" | "Medium" | "Low"
  description?: string
  assignedBy: string
  progress: number
}

export function MyCases() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [activeDialog, setActiveDialog] = useState<string | null>(null)

  const cases: Case[] = [
    {
      id: "1",
      crNumber: "CR-2024-001",
      derNumber: "DER-2024-001",
      title: "Drug Trafficking Investigation",
      status: "In Progress",
      assignedDate: "2024-08-15",
      deadline: "2024-09-15",
      department: "Major Crime Division",
      priority: "High",
      description: "Investigation into organized drug trafficking network operating across multiple regions.",
      assignedBy: "Department Head - Major Crime",
      progress: 65,
    },
    {
      id: "2",
      crNumber: "CR-2024-005",
      derNumber: "DER-2024-005",
      title: "Financial Fraud Case",
      status: "Evidence Collection",
      assignedDate: "2024-08-20",
      deadline: "2024-09-20",
      department: "Financial Crime Division",
      priority: "Medium",
      description: "Corporate embezzlement case involving multiple financial institutions.",
      assignedBy: "Department Head - Financial Crime",
      progress: 40,
    },
    {
      id: "3",
      crNumber: "CR-2024-008",
      derNumber: "DER-2024-008",
      title: "Corruption Investigation",
      status: "Interview Phase",
      assignedDate: "2024-08-25",
      deadline: "2024-09-25",
      department: "Anti-Corruption Division",
      priority: "High",
      description: "Government official corruption case with multiple witnesses.",
      assignedBy: "Department Head - Anti-Corruption",
      progress: 75,
    },
    {
      id: "4",
      crNumber: "CR-2024-012",
      derNumber: "DER-2024-012",
      title: "Cybercrime Investigation",
      status: "Initial Review",
      assignedDate: "2024-08-30",
      deadline: "2024-09-30",
      department: "Technology Crime Division",
      priority: "Medium",
      description: "Online fraud and identity theft case involving digital evidence.",
      assignedBy: "Department Head - Technology Crime",
      progress: 20,
    },
  ]

  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.crNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.derNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter
    const matchesPriority = priorityFilter === "all" || case_.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Evidence Collection":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Interview Phase":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Initial Review":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500"
    if (progress >= 50) return "bg-blue-500"
    if (progress >= 25) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6 bg-white min-h-screen p-6">
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.investigator.myCases}</h1>
          <p className="text-gray-600 mt-1">{t.investigator.myCasesDescription}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Cases</p>
                <p className="text-xl font-bold text-gray-900">{cases.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-xl font-bold text-gray-900">
                  {cases.filter((c) => c.status === "In Progress").length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-xl font-bold text-gray-900">{cases.filter((c) => c.priority === "High").length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Due Soon</p>
                <p className="text-xl font-bold text-gray-900">
                  {cases.filter((c) => getDaysUntilDeadline(c.deadline) <= 7).length}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={t.common.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t.common.filterByStatus} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.common.allStatuses}</SelectItem>
                <SelectItem value="In Progress">{t.caseStatus.inProgress}</SelectItem>
                <SelectItem value="Evidence Collection">{t.caseStatus.evidenceCollection}</SelectItem>
                <SelectItem value="Interview Phase">{t.caseStatus.interviewPhase}</SelectItem>
                <SelectItem value="Initial Review">Initial Review</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High Priority</SelectItem>
                <SelectItem value="Medium">Medium Priority</SelectItem>
                <SelectItem value="Low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredCases.map((case_) => (
          <Card key={case_.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h3 className="text-xl font-semibold text-gray-900">{case_.title}</h3>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                      <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">CR:</span> {case_.crNumber}
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">DER:</span> {case_.derNumber}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">Assigned by:</span> {case_.assignedBy}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">Assigned:</span> {case_.assignedDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">Deadline:</span> {case_.deadline}
                      <span
                        className={`ml-1 text-xs px-2 py-1 rounded-full ${
                          getDaysUntilDeadline(case_.deadline) <= 3
                            ? "bg-red-100 text-red-800"
                            : getDaysUntilDeadline(case_.deadline) <= 7
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {getDaysUntilDeadline(case_.deadline)} days left
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">Department:</span> {case_.department}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">Progress</span>
                      <span className="text-gray-600">{case_.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(case_.progress)}`}
                        style={{ width: `${case_.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {case_.description && (
                    <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">{case_.description}</p>
                  )}
                </div>

                <div className="flex flex-col gap-3 min-w-fit">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 justify-start bg-transparent"
                      >
                        <Eye className="h-4 w-4" />
                        {t.common.viewDetails}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Case Details - {case_.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>CR Number:</strong> {case_.crNumber}
                          </div>
                          <div>
                            <strong>DER Number:</strong> {case_.derNumber}
                          </div>
                          <div>
                            <strong>Status:</strong> {case_.status}
                          </div>
                          <div>
                            <strong>Priority:</strong> {case_.priority}
                          </div>
                          <div>
                            <strong>Department:</strong> {case_.department}
                          </div>
                          <div>
                            <strong>Progress:</strong> {case_.progress}%
                          </div>
                        </div>
                        <div>
                          <strong>Description:</strong>
                          <p className="mt-1 text-gray-600">{case_.description}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={activeDialog === `demographic-${case_.id}`}
                    onOpenChange={(open) => setActiveDialog(open ? `demographic-${case_.id}` : null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 justify-start bg-blue-50 hover:bg-blue-100 text-blue-700"
                      >
                        <User className="h-4 w-4" />
                        {t.investigator.addDemographic}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DemographicDataForm
                        crNumber={case_.crNumber}
                        derNumber={case_.derNumber}
                        caseTitle={case_.title}
                        onClose={() => setActiveDialog(null)}
                      />
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={activeDialog === `description-${case_.id}`}
                    onOpenChange={(open) => setActiveDialog(open ? `description-${case_.id}` : null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 justify-start bg-green-50 hover:bg-green-100 text-green-700"
                      >
                        <FileText className="h-4 w-4" />
                        {t.investigator.addDescription}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <CaseDescriptionForm
                        crNumber={case_.crNumber}
                        derNumber={case_.derNumber}
                        onClose={() => setActiveDialog(null)}
                      />
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={activeDialog === `exhibit-${case_.id}`}
                    onOpenChange={(open) => setActiveDialog(open ? `exhibit-${case_.id}` : null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 justify-start bg-purple-50 hover:bg-purple-100 text-purple-700"
                      >
                        <Package className="h-4 w-4" />
                        {t.investigator.addExhibit}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <ExhibitPropertyForm
                        crNumber={case_.crNumber}
                        derNumber={case_.derNumber}
                        onClose={() => setActiveDialog(null)}
                      />
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
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{t.common.noDataFound}</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
