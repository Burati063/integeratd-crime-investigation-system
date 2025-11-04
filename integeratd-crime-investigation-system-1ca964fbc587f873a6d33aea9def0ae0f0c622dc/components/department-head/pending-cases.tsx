"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/i18n"
import { Search, Eye, Clock, User } from "lucide-react"

interface AssignedCase {
  id: string
  crNumber: string
  derNumber: string
  title: string
  department: string
  crime: string
  investigator: string
  investigatorBadge: string
  assignedDate: string
  status: string
  priority: string
  dueDate: string
}

export function PendingCases() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [investigatorFilter, setInvestigatorFilter] = useState("all")

  // Mock data for assigned cases
  const [assignedCases] = useState<AssignedCase[]>([
    {
      id: "1",
      crNumber: "CR-2024-001",
      derNumber: "DER-2024-001",
      title: "Human Trafficking Investigation",
      department: "Major Crime Division",
      crime: "Human trafficking",
      investigator: "Detective Ahmed Hassan",
      investigatorBadge: "DET-001",
      assignedDate: "2024-01-15",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-02-15",
    },
    {
      id: "2",
      crNumber: "CR-2024-002",
      derNumber: "DER-2024-002",
      title: "Drug Trafficking Case",
      department: "Major Crime Division",
      crime: "Drug trafficking",
      investigator: "Detective Meron Tadesse",
      investigatorBadge: "DET-002",
      assignedDate: "2024-01-16",
      status: "Evidence Collection",
      priority: "Medium",
      dueDate: "2024-02-16",
    },
    {
      id: "3",
      crNumber: "CR-2024-003",
      derNumber: "DER-2024-003",
      title: "Terrorism Investigation",
      department: "Specialized Crime Division",
      crime: "Terrorism",
      investigator: "Detective Dawit Bekele",
      investigatorBadge: "DET-003",
      assignedDate: "2024-01-17",
      status: "Initial Investigation",
      priority: "Critical",
      dueDate: "2024-02-17",
    },
    {
      id: "4",
      crNumber: "CR-2024-004",
      derNumber: "DER-2024-004",
      title: "Financial Fraud Case",
      department: "Financial Crime Division",
      crime: "Finance fraud",
      investigator: "Detective Sara Mohammed",
      investigatorBadge: "DET-004",
      assignedDate: "2024-01-18",
      status: "Report Pending",
      priority: "Medium",
      dueDate: "2024-02-18",
    },
  ])

  const filteredCases = assignedCases.filter((caseItem) => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.crNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.derNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.investigator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter
    const matchesInvestigator = investigatorFilter === "all" || caseItem.investigator === investigatorFilter

    return matchesSearch && matchesStatus && matchesInvestigator
  })

  const getStatusBadge = (status: string) => {
    const statusColors = {
      "Initial Investigation": "bg-blue-100 text-blue-800",
      "In Progress": "bg-orange-100 text-orange-800",
      "Evidence Collection": "bg-purple-100 text-purple-800",
      "Report Pending": "bg-yellow-100 text-yellow-800",
      Completed: "bg-green-100 text-green-800",
    }
    return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"
  }

  const getPriorityBadge = (priority: string) => {
    const priorityColors = {
      Critical: "bg-red-100 text-red-800",
      High: "bg-orange-100 text-orange-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    }
    return priorityColors[priority as keyof typeof priorityColors] || "bg-gray-100 text-gray-800"
  }

  const uniqueInvestigators = Array.from(new Set(assignedCases.map((c) => c.investigator)))

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Clock className="h-6 w-6" />
        <h1 className="text-2xl font-bold">{t.departmentHead.pendingCases}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.departmentHead.assignedCases}</CardTitle>
          <CardDescription>{t.departmentHead.assignedCasesDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t.common.searchPlaceholder}
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
                <SelectItem value="Initial Investigation">{t.common.initialInvestigation}</SelectItem>
                <SelectItem value="In Progress">{t.common.inProgress}</SelectItem>
                <SelectItem value="Evidence Collection">{t.common.evidenceCollection}</SelectItem>
                <SelectItem value="Report Pending">{t.common.reportPending}</SelectItem>
                <SelectItem value="Completed">{t.common.completed}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={investigatorFilter} onValueChange={setInvestigatorFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t.common.filterByInvestigator} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.common.allInvestigators}</SelectItem>
                {uniqueInvestigators.map((investigator) => (
                  <SelectItem key={investigator} value={investigator}>
                    {investigator}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.common.crNumber}</TableHead>
                  <TableHead>{t.common.derNumber}</TableHead>
                  <TableHead>{t.common.title}</TableHead>
                  <TableHead>{t.common.investigator}</TableHead>
                  <TableHead>{t.common.status}</TableHead>
                  <TableHead>{t.common.priority}</TableHead>
                  <TableHead>{t.common.assignedDate}</TableHead>
                  <TableHead>{t.common.dueDate}</TableHead>
                  <TableHead>{t.common.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">{caseItem.crNumber}</TableCell>
                    <TableCell>{caseItem.derNumber}</TableCell>
                    <TableCell>{caseItem.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">{caseItem.investigator}</p>
                          <p className="text-sm text-gray-500">{caseItem.investigatorBadge}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(caseItem.status)}>{caseItem.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityBadge(caseItem.priority)}>{caseItem.priority}</Badge>
                    </TableCell>
                    <TableCell>{caseItem.assignedDate}</TableCell>
                    <TableCell>{caseItem.dueDate}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                        <Eye className="h-4 w-4" />
                        {t.common.view}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCases.length === 0 && <div className="text-center py-8 text-gray-500">{t.common.noDataFound}</div>}
        </CardContent>
      </Card>
    </div>
  )
}
