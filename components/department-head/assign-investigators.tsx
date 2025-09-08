"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useLanguage } from "@/lib/i18n"
import { Search, UserPlus, Eye } from "lucide-react"

interface CaseRecord {
  id: string
  crNumber: string
  derNumber: string
  title: string
  department: string
  crime: string
  status: string
  registeredDate: string
  priority: string
}

interface Investigator {
  id: string
  name: string
  badge: string
  department: string
  specialization: string
  currentCases: number
  maxCases: number
  status: string
}

export function AssignInvestigators() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null)
  const [selectedInvestigator, setSelectedInvestigator] = useState("")
  const [assignmentNote, setAssignmentNote] = useState("")
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)

  // Mock data for unassigned cases
  const [cases] = useState<CaseRecord[]>([
    {
      id: "1",
      crNumber: "CR-2024-001",
      derNumber: "DER-2024-001",
      title: "Human Trafficking Investigation",
      department: "Major Crime Division",
      crime: "Human trafficking",
      status: "Pending Assignment",
      registeredDate: "2024-01-15",
      priority: "High",
    },
    {
      id: "2",
      crNumber: "CR-2024-002",
      derNumber: "DER-2024-002",
      title: "Drug Trafficking Case",
      department: "Major Crime Division",
      crime: "Drug trafficking",
      status: "Pending Assignment",
      registeredDate: "2024-01-16",
      priority: "Medium",
    },
    {
      id: "3",
      crNumber: "CR-2024-003",
      derNumber: "DER-2024-003",
      title: "Terrorism Investigation",
      department: "Specialized Crime Division",
      crime: "Terrorism",
      status: "Pending Assignment",
      registeredDate: "2024-01-17",
      priority: "Critical",
    },
  ])

  // Mock data for investigators
  const [investigators] = useState<Investigator[]>([
    {
      id: "1",
      name: "Detective Ahmed Hassan",
      badge: "DET-001",
      department: "Major Crime Division",
      specialization: "Human Trafficking",
      currentCases: 3,
      maxCases: 5,
      status: "Available",
    },
    {
      id: "2",
      name: "Detective Meron Tadesse",
      badge: "DET-002",
      department: "Major Crime Division",
      specialization: "Drug Crimes",
      currentCases: 2,
      maxCases: 5,
      status: "Available",
    },
    {
      id: "3",
      name: "Detective Dawit Bekele",
      badge: "DET-003",
      department: "Specialized Crime Division",
      specialization: "Terrorism",
      currentCases: 1,
      maxCases: 4,
      status: "Available",
    },
    {
      id: "4",
      name: "Detective Sara Mohammed",
      badge: "DET-004",
      department: "Financial Crime Division",
      specialization: "Financial Fraud",
      currentCases: 4,
      maxCases: 5,
      status: "Busy",
    },
  ])

  const filteredCases = cases.filter(
    (caseItem) =>
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.crNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.derNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getAvailableInvestigators = (caseItem: CaseRecord) => {
    return investigators.filter((inv) => inv.department === caseItem.department && inv.currentCases < inv.maxCases)
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

  const handleAssignCase = () => {
    if (selectedCase && selectedInvestigator && assignmentNote) {
      // Assignment logic here
      console.log("Assigning case:", {
        caseId: selectedCase.id,
        investigatorId: selectedInvestigator,
        note: assignmentNote,
      })
      setIsAssignDialogOpen(false)
      setSelectedCase(null)
      setSelectedInvestigator("")
      setAssignmentNote("")
    }
  }

  const openAssignDialog = (caseItem: CaseRecord) => {
    setSelectedCase(caseItem)
    setIsAssignDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <UserPlus className="h-6 w-6" />
        <h1 className="text-2xl font-bold">{t.departmentHead.assignInvestigators}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.departmentHead.pendingAssignment}</CardTitle>
          <CardDescription>{t.departmentHead.pendingAssignmentDesc}</CardDescription>
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
                  <TableHead>{t.common.priority}</TableHead>
                  <TableHead>{t.common.registeredDate}</TableHead>
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
                      <Badge className={getPriorityBadge(caseItem.priority)}>{caseItem.priority}</Badge>
                    </TableCell>
                    <TableCell>{caseItem.registeredDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                          <Eye className="h-4 w-4" />
                          {t.common.view}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => openAssignDialog(caseItem)}
                          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
                        >
                          <UserPlus className="h-4 w-4" />
                          {t.common.assign}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCases.length === 0 && <div className="text-center py-8 text-gray-500">{t.common.noDataFound}</div>}
        </CardContent>
      </Card>

      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.departmentHead.assignInvestigator}</DialogTitle>
            <DialogDescription>{t.departmentHead.assignInvestigatorDesc}</DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.common.caseDetails}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">{t.common.crNumber}</Label>
                      <p className="text-sm text-gray-600">{selectedCase.crNumber}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">{t.common.derNumber}</Label>
                      <p className="text-sm text-gray-600">{selectedCase.derNumber}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm font-medium">{t.common.title}</Label>
                      <p className="text-sm text-gray-600">{selectedCase.title}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">{t.common.department}</Label>
                      <p className="text-sm text-gray-600">{selectedCase.department}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">{t.common.crime}</Label>
                      <p className="text-sm text-gray-600">{selectedCase.crime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="investigator">{t.departmentHead.selectInvestigator}</Label>
                <Select value={selectedInvestigator} onValueChange={setSelectedInvestigator}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.departmentHead.selectInvestigatorPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableInvestigators(selectedCase).map((investigator) => (
                      <SelectItem key={investigator.id} value={investigator.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>
                            {investigator.name} ({investigator.badge})
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            {investigator.currentCases}/{investigator.maxCases} cases
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">{t.departmentHead.assignmentNote}</Label>
                <Textarea
                  id="note"
                  placeholder={t.departmentHead.assignmentNotePlaceholder}
                  value={assignmentNote}
                  onChange={(e) => setAssignmentNote(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              {t.common.cancel}
            </Button>
            <Button
              onClick={handleAssignCase}
              disabled={!selectedInvestigator || !assignmentNote}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {t.common.assign}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
