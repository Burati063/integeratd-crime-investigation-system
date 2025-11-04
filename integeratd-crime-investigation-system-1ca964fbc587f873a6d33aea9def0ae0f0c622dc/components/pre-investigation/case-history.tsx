"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/i18n"
import { Search, Eye, FileText } from "lucide-react"

interface CaseRecord {
  id: string
  crNumber: string
  derNumber: string
  title: string
  department: string
  crime: string
  status: string
  registeredDate: string
  registeredBy: string
}

export function CaseHistory() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  // Mock data for case history
  const [cases] = useState<CaseRecord[]>([
    {
      id: "1",
      crNumber: "CR-2024-001",
      derNumber: "DER-2024-001",
      title: "Human Trafficking Investigation",
      department: "Major Crime Division",
      crime: "Human trafficking",
      status: "Assigned",
      registeredDate: "2024-01-15",
      registeredBy: "Officer Ahmed",
    },
    {
      id: "2",
      crNumber: "CR-2024-002",
      derNumber: "DER-2024-002",
      title: "Drug Trafficking Case",
      department: "Major Crime Division",
      crime: "Drug trafficking",
      status: "Under Investigation",
      registeredDate: "2024-01-16",
      registeredBy: "Officer Meron",
    },
    {
      id: "3",
      crNumber: "CR-2024-003",
      derNumber: "DER-2024-003",
      title: "Terrorism Investigation",
      department: "Specialized Crime Division",
      crime: "Terrorism",
      status: "Pending",
      registeredDate: "2024-01-17",
      registeredBy: "Officer Dawit",
    },
    {
      id: "4",
      crNumber: "CR-2024-004",
      derNumber: "DER-2024-004",
      title: "Financial Fraud Case",
      department: "Financial Crime Division",
      crime: "Finance fraud",
      status: "Completed",
      registeredDate: "2024-01-18",
      registeredBy: "Officer Sara",
    },
  ])

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.crNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.derNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter
    const matchesDepartment = departmentFilter === "all" || caseItem.department === departmentFilter

    return matchesSearch && matchesStatus && matchesDepartment
  })

  const getStatusBadge = (status: string) => {
    const statusColors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Assigned: "bg-blue-100 text-blue-800",
      "Under Investigation": "bg-orange-100 text-orange-800",
      Completed: "bg-green-100 text-green-800",
    }
    return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6" />
        <h1 className="text-2xl font-bold">{t.preInvestigation.caseHistory}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.preInvestigation.caseHistoryTitle}</CardTitle>
          <CardDescription>{t.preInvestigation.caseHistoryDesc}</CardDescription>
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
                <SelectItem value="Pending">{t.common.pending}</SelectItem>
                <SelectItem value="Assigned">{t.common.assigned}</SelectItem>
                <SelectItem value="Under Investigation">{t.common.underInvestigation}</SelectItem>
                <SelectItem value="Completed">{t.common.completed}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t.common.filterByDepartment} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.common.allDepartments}</SelectItem>
                <SelectItem value="Major Crime Division">{t.departments.majorCrime}</SelectItem>
                <SelectItem value="Specialized Crime Division">{t.departments.specializedCrime}</SelectItem>
                <SelectItem value="Financial Crime Division">{t.departments.financialCrime}</SelectItem>
                <SelectItem value="Anti-Corruption Division">{t.departments.antiCorruption}</SelectItem>
                <SelectItem value="Technology Crime Division">{t.departments.technologyCrime}</SelectItem>
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
                  <TableHead>{t.common.department}</TableHead>
                  <TableHead>{t.common.crime}</TableHead>
                  <TableHead>{t.common.status}</TableHead>
                  <TableHead>{t.common.registeredDate}</TableHead>
                  <TableHead>{t.common.registeredBy}</TableHead>
                  <TableHead>{t.common.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">{caseItem.crNumber}</TableCell>
                    <TableCell>{caseItem.derNumber}</TableCell>
                    <TableCell>{caseItem.title}</TableCell>
                    <TableCell>{caseItem.department}</TableCell>
                    <TableCell>{caseItem.crime}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(caseItem.status)}>{caseItem.status}</Badge>
                    </TableCell>
                    <TableCell>{caseItem.registeredDate}</TableCell>
                    <TableCell>{caseItem.registeredBy}</TableCell>
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
