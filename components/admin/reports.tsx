"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { FileText, Download, Calendar, TrendingUp } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export function Reports() {
  const { t } = useLanguage()
  const [selectedReport, setSelectedReport] = useState("cases-by-department")
  const [dateRange, setDateRange] = useState<any>(null)

  const casesByDepartment = [
    { name: "Major Crime", cases: 45, color: "#8884d8" },
    { name: "Specialized Crime", cases: 23, color: "#82ca9d" },
    { name: "Financial Crime", cases: 67, color: "#ffc658" },
    { name: "Anti-Corruption", cases: 34, color: "#ff7300" },
    { name: "Technology Crime", cases: 28, color: "#00ff00" },
  ]

  const monthlyTrends = [
    { month: "Jan", cases: 45, resolved: 38 },
    { month: "Feb", cases: 52, resolved: 45 },
    { month: "Mar", cases: 48, resolved: 42 },
    { month: "Apr", cases: 61, resolved: 55 },
    { month: "May", cases: 55, resolved: 48 },
    { month: "Jun", cases: 67, resolved: 58 },
  ]

  const handleExportReport = () => {
    // Mock export functionality
    const data = selectedReport === "cases-by-department" ? casesByDepartment : monthlyTrends
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(data[0]).join(",") +
      "\n" +
      data.map((row) => Object.values(row).join(",")).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${selectedReport}-report.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and view system reports</p>
        </div>
        <Button onClick={handleExportReport}>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cases</p>
                <p className="text-2xl font-bold">197</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Cases</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Cases</p>
                <p className="text-2xl font-bold">41</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                <p className="text-2xl font-bold">79%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <Select value={selectedReport} onValueChange={setSelectedReport}>
          <SelectTrigger className="w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cases-by-department">Cases by Department</SelectItem>
            <SelectItem value="monthly-trends">Monthly Trends</SelectItem>
            <SelectItem value="user-activity">User Activity</SelectItem>
            <SelectItem value="case-status">Case Status Overview</SelectItem>
          </SelectContent>
        </Select>
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cases by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={casesByDepartment}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="cases"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {casesByDepartment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Case Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cases" fill="#8884d8" name="Total Cases" />
                <Bar dataKey="resolved" fill="#82ca9d" name="Resolved Cases" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
