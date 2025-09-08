"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface Department {
  id: string
  name: string
  description: string
  crimes: string[]
  isActive: boolean
}

export function DepartmentManagement() {
  const { t } = useLanguage()
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      name: "Major Crime Division",
      description: "Handles organized crimes and major criminal activities",
      crimes: ["Organized unique crimes", "Human trafficking", "Smuggling", "Drug trafficking"],
      isActive: true,
    },
    {
      id: "2",
      name: "Specialized Crime Division",
      description: "Focuses on terrorism-related cases",
      crimes: ["Terrorism"],
      isActive: true,
    },
    {
      id: "3",
      name: "Financial Crime Division",
      description: "Investigates financial crimes and fraud",
      crimes: ["Finance fraud", "Tax", "Custom commission case"],
      isActive: true,
    },
    {
      id: "4",
      name: "Anti-Corruption Division",
      description: "Handles all types of corruption cases",
      crimes: ["All type of corruption"],
      isActive: true,
    },
    {
      id: "5",
      name: "Technology Crime Division",
      description: "Investigates technology-based crimes",
      crimes: ["Technology based crimes"],
      isActive: true,
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    description: "",
    crimes: "",
  })
  const [editDepartment, setEditDepartment] = useState({
    name: "",
    description: "",
    crimes: "",
  })

  const handleCreateDepartment = () => {
    const department: Department = {
      id: Date.now().toString(),
      name: newDepartment.name,
      description: newDepartment.description,
      crimes: newDepartment.crimes.split(",").map((crime) => crime.trim()),
      isActive: true,
    }
    setDepartments([...departments, department])
    setNewDepartment({ name: "", description: "", crimes: "" })
    setIsCreateDialogOpen(false)
  }

  const handleEditDepartment = (department: Department) => {
    setSelectedDepartment(department)
    setEditDepartment({
      name: department.name,
      description: department.description,
      crimes: department.crimes.join(", "),
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateDepartment = () => {
    if (selectedDepartment) {
      setDepartments(
        departments.map((dept) =>
          dept.id === selectedDepartment.id
            ? {
                ...dept,
                name: editDepartment.name,
                description: editDepartment.description,
                crimes: editDepartment.crimes.split(",").map((crime) => crime.trim()),
              }
            : dept,
        ),
      )
      setIsEditDialogOpen(false)
      setSelectedDepartment(null)
    }
  }

  const handleDeleteDepartment = (departmentId: string) => {
    setDepartments(departments.filter((dept) => dept.id !== departmentId))
  }

  const handleViewDepartment = (department: Department) => {
    setSelectedDepartment(department)
    setIsViewDialogOpen(true)
  }

  const handleToggleDepartmentStatus = (departmentId: string) => {
    setDepartments(departments.map((dept) => (dept.id === departmentId ? { ...dept, isActive: !dept.isActive } : dept)))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t.departmentManagement.title}</h1>
          <p className="text-gray-600">{t.departmentManagement.manageDepartmentsAndCrimes}</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t.departmentManagement.createDepartment}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.departmentManagement.createNewDepartment}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">{t.departmentManagement.departmentName}</Label>
                <Input
                  id="name"
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">{t.departmentManagement.description}</Label>
                <Textarea
                  id="description"
                  value={newDepartment.description}
                  onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="crimes">
                  {t.departmentManagement.crimes} ({t.departmentManagement.separateWithCommas})
                </Label>
                <Textarea
                  id="crimes"
                  value={newDepartment.crimes}
                  onChange={(e) => setNewDepartment({ ...newDepartment, crimes: e.target.value })}
                  placeholder="Crime 1, Crime 2, Crime 3"
                />
              </div>
              <Button onClick={handleCreateDepartment} className="w-full">
                {t.departmentManagement.createDepartment}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {departments.map((department) => (
          <Card key={department.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {department.name}
                    <Badge
                      variant={department.isActive ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => handleToggleDepartmentStatus(department.id)}
                    >
                      {department.isActive ? t.departmentManagement.active : t.departmentManagement.inactive}
                    </Badge>
                  </CardTitle>
                  <p className="text-gray-600 mt-1">{department.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewDepartment(department)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditDepartment(department)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Department</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this department? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteDepartment(department.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-medium mb-2">{t.departmentManagement.crimes}:</h4>
                <div className="flex flex-wrap gap-2">
                  {department.crimes.map((crime, index) => (
                    <Badge key={index} variant="outline">
                      {crime}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editName">Department Name</Label>
              <Input
                id="editName"
                value={editDepartment.name}
                onChange={(e) => setEditDepartment({ ...editDepartment, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editDescription">Description</Label>
              <Textarea
                id="editDescription"
                value={editDepartment.description}
                onChange={(e) => setEditDepartment({ ...editDepartment, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editCrimes">Crimes (separate with commas)</Label>
              <Textarea
                id="editCrimes"
                value={editDepartment.crimes}
                onChange={(e) => setEditDepartment({ ...editDepartment, crimes: e.target.value })}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleUpdateDepartment} className="flex-1">
                Update Department
              </Button>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Department Details</DialogTitle>
          </DialogHeader>
          {selectedDepartment && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Department Name</Label>
                <p className="text-lg font-semibold">{selectedDepartment.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Description</Label>
                <p className="text-sm">{selectedDepartment.description}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <Badge variant={selectedDepartment.isActive ? "default" : "secondary"}>
                  {selectedDepartment.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Associated Crimes</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedDepartment.crimes.map((crime, index) => (
                    <Badge key={index} variant="outline">
                      {crime}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
