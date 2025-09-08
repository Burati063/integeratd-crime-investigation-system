"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Database, Download, Calendar, FileText, Users, Building2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export function BackupExport() {
  const { t } = useLanguage()
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [backupProgress, setBackupProgress] = useState(0)
  const [selectedTables, setSelectedTables] = useState<string[]>([])
  const [exportFormat, setExportFormat] = useState("json")

  const tables = [
    { id: "users", name: "Users", icon: Users, records: 89 },
    { id: "cases", name: "Cases", icon: FileText, records: 1234 },
    { id: "departments", name: "Departments", icon: Building2, records: 5 },
    { id: "demographics", name: "Demographics", icon: Users, records: 456 },
    { id: "statements", name: "Statements", icon: FileText, records: 789 },
    { id: "exhibits", name: "Exhibits", icon: Database, records: 234 },
  ]

  const handleBackup = async () => {
    setIsBackingUp(true)
    setBackupProgress(0)

    // Simulate backup progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setBackupProgress(i)
    }

    setIsBackingUp(false)

    // Create and download backup file
    const backupData = {
      timestamp: new Date().toISOString(),
      tables: selectedTables,
      format: exportFormat,
      data: "Mock backup data would be here",
    }

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `backup-${new Date().toISOString().split("T")[0]}.${exportFormat}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleTableSelection = (tableId: string, checked: boolean) => {
    if (checked) {
      setSelectedTables([...selectedTables, tableId])
    } else {
      setSelectedTables(selectedTables.filter((id) => id !== tableId))
    }
  }

  const selectAllTables = () => {
    setSelectedTables(tables.map((table) => table.id))
  }

  const clearSelection = () => {
    setSelectedTables([])
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Backup & Export</h1>
          <p className="text-gray-600">Backup system data and export reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Database Backup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Export Format</label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                  <SelectItem value="sql">SQL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Select Tables</label>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={selectAllTables}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearSelection}>
                    Clear
                  </Button>
                </div>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {tables.map((table) => (
                  <div key={table.id} className="flex items-center space-x-3 p-2 border rounded">
                    <Checkbox
                      checked={selectedTables.includes(table.id)}
                      onCheckedChange={(checked) => handleTableSelection(table.id, checked as boolean)}
                    />
                    <table.icon className="h-4 w-4 text-gray-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{table.name}</p>
                      <p className="text-xs text-gray-500">{table.records} records</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isBackingUp && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Backing up data...</span>
                  <span>{backupProgress}%</span>
                </div>
                <Progress value={backupProgress} />
              </div>
            )}

            <Button onClick={handleBackup} disabled={selectedTables.length === 0 || isBackingUp} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              {isBackingUp ? "Creating Backup..." : "Create Backup"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Backup History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: "2024-01-20", size: "2.3 MB", tables: 6, status: "Complete" },
                { date: "2024-01-19", size: "2.1 MB", tables: 5, status: "Complete" },
                { date: "2024-01-18", size: "2.0 MB", tables: 6, status: "Complete" },
                { date: "2024-01-17", size: "1.9 MB", tables: 4, status: "Complete" },
              ].map((backup, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="text-sm font-medium">{backup.date}</p>
                    <p className="text-xs text-gray-500">
                      {backup.size} • {backup.tables} tables
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-green-600">{backup.status}</span>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
