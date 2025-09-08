"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Plus, Edit, Trash2, Search, Eye } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface User {
  id: string
  fullName: string
  username: string
  email: string
  role: string
  department: string
  isActive: boolean
  createdAt: string
}

export function UserManagement() {
  const { t } = useLanguage()
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      fullName: "John Doe",
      username: "admin",
      email: "admin@police.gov.et",
      role: "Admin",
      department: "Administration",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      fullName: "Jane Smith",
      username: "investigator",
      email: "jane@police.gov.et",
      role: "Investigator",
      department: "Major Crime Division",
      isActive: true,
      createdAt: "2024-01-20",
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newUser, setNewUser] = useState({
    fullName: "",
    username: "",
    email: "",
    role: "",
    department: "",
    password: "",
  })
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [editUser, setEditUser] = useState({
    fullName: "",
    username: "",
    email: "",
    role: "",
    department: "",
  })

  const roles = ["Admin", "Pre-Investigation Unit", "Department Head", "Investigator", "Prosecutor"]

  const departments = [
    "Administration",
    "Major Crime Division",
    "Specialized Crime Division",
    "Financial Crime Division",
    "Anti-Corruption Division",
    "Technology Crime Division",
  ]

  const handleCreateUser = () => {
    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setUsers([...users, user])
    setNewUser({ fullName: "", username: "", email: "", role: "", department: "", password: "" })
    setIsCreateDialogOpen(false)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setEditUser({
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      role: user.role,
      department: user.department,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateUser = () => {
    if (selectedUser) {
      setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, ...editUser } : user)))
      setIsEditDialogOpen(false)
      setSelectedUser(null)
    }
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setIsViewDialogOpen(true)
  }

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, isActive: !user.isActive } : user)))
  }

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t.userManagement.title}</h1>
          <p className="text-gray-600">{t.userManagement.manageSystemUsers}</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t.userManagement.createUser}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{t.userManagement.createNewUser}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">{t.userManagement.fullName}</Label>
                <Input
                  id="fullName"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="username">{t.userManagement.username}</Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">{t.userManagement.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="role">{t.userManagement.role}</Label>
                <Select onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.userManagement.selectRole} />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">{t.userManagement.department}</Label>
                <Select onValueChange={(value) => setNewUser({ ...newUser, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.userManagement.selectDepartment} />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="password">{t.userManagement.password}</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>
              <Button onClick={handleCreateUser} className="w-full">
                {t.userManagement.createUser}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{t.userManagement.users}</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={t.userManagement.searchUsers}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.userManagement.fullName}</TableHead>
                <TableHead>{t.userManagement.username}</TableHead>
                <TableHead>{t.userManagement.email}</TableHead>
                <TableHead>{t.userManagement.role}</TableHead>
                <TableHead>{t.userManagement.department}</TableHead>
                <TableHead>{t.userManagement.status}</TableHead>
                <TableHead>{t.userManagement.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.fullName}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.isActive ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => handleToggleUserStatus(user.id)}
                    >
                      {user.isActive ? t.userManagement.active : t.userManagement.inactive}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewUser(user)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
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
                            <AlertDialogTitle>{t.userManagement.deleteUser}</AlertDialogTitle>
                            <AlertDialogDescription>{t.userManagement.confirmDeleteUser}</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t.userManagement.cancel}</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
                              {t.userManagement.delete}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.userManagement.editUser}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editFullName">{t.userManagement.fullName}</Label>
              <Input
                id="editFullName"
                value={editUser.fullName}
                onChange={(e) => setEditUser({ ...editUser, fullName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editUsername">{t.userManagement.username}</Label>
              <Input
                id="editUsername"
                value={editUser.username}
                onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editEmail">{t.userManagement.email}</Label>
              <Input
                id="editEmail"
                type="email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="editRole">{t.userManagement.role}</Label>
              <Select value={editUser.role} onValueChange={(value) => setEditUser({ ...editUser, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="editDepartment">{t.userManagement.department}</Label>
              <Select
                value={editUser.department}
                onValueChange={(value) => setEditUser({ ...editUser, department: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleUpdateUser} className="flex-1">
                {t.userManagement.updateUser}
              </Button>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
                {t.userManagement.cancel}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.userManagement.viewUserDetails}</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">{t.userManagement.fullName}</Label>
                  <p className="text-sm">{selectedUser.fullName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">{t.userManagement.username}</Label>
                  <p className="text-sm">{selectedUser.username}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">{t.userManagement.email}</Label>
                  <p className="text-sm">{selectedUser.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">{t.userManagement.role}</Label>
                  <p className="text-sm">{selectedUser.role}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">{t.userManagement.department}</Label>
                  <p className="text-sm">{selectedUser.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">{t.userManagement.status}</Label>
                  <Badge variant={selectedUser.isActive ? "default" : "secondary"}>
                    {selectedUser.isActive ? t.userManagement.active : t.userManagement.inactive}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">{t.userManagement.createdAt}</Label>
                  <p className="text-sm">{selectedUser.createdAt}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
