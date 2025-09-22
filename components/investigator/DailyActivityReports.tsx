"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Search } from "lucide-react"

export default function DailyActivityReport() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    dern: "",
    investigator: "",
    activityDesc: ""
  })
  
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const dernNumbers = [
    "DERN-2023-001",
    "DERN-2023-002", 
    "DERN-2023-003",
    "DERN-2023-004",
    "DERN-2023-005",
    "DERN-2023-006",
    "DERN-2023-007",
    "DERN-2023-008"
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    
    // Basic validation
    if (!formData.date || !formData.dern || !formData.investigator || !formData.activityDesc) {
      alert("Please fill in all required fields")
      return
    }

    setShowSuccessDialog(true)
    
    // In a real application, you would handle form submission to a server here
    console.log("Form submitted:", formData)
  }

  const handleCloseDialog = () => {
    setShowSuccessDialog(false)
    // Reset form after successful submission
    setFormData({
      date: new Date().toISOString().split('T')[0],
      dern: "",
      investigator: "",
      activityDesc: ""
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-sm mb-4">
            <Search className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-slate-700">DERN Reporting System</span>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-slate-800 text-white rounded-t-lg">
            <CardTitle className="text-center">
              <h1 className="text-3xl font-bold mb-2">Daily Activity Report</h1>
              <p className="text-slate-300">Complete all sections for accurate reporting</p>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Report Information Section */}
              <div className="space-y-6 pb-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-700 border-b-2 border-blue-500 pb-2 inline-block">
                  Report Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-slate-600 font-medium">
                      Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      required
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dern" className="text-slate-600 font-medium">
                      DERN Number <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.dern} onValueChange={(value) => handleInputChange("dern", value)}>
                      <SelectTrigger className="border-slate-300 focus:border-blue-500">
                        <SelectValue placeholder="Select DERN Number" />
                      </SelectTrigger>
                      <SelectContent>
                        {dernNumbers.map((dern) => (
                          <SelectItem key={dern} value={dern}>
                            {dern}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="investigator" className="text-slate-600 font-medium">
                    Investigator Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="investigator"
                    value={formData.investigator}
                    onChange={(e) => handleInputChange("investigator", e.target.value)}
                    placeholder="Enter investigator name"
                    required
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Activity Details Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-700 border-b-2 border-blue-500 pb-2 inline-block">
                  Activity Details
                </h2>
                
                <div className="space-y-2">
                  <Label htmlFor="activity-desc" className="text-slate-600 font-medium">
                    Activity Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="activity-desc"
                    value={formData.activityDesc}
                    onChange={(e) => handleInputChange("activityDesc", e.target.value)}
                    placeholder="Provide a detailed description of today's activities..."
                    required
                    className="min-h-[150px] border-slate-300 focus:border-blue-500 focus:ring-blue-500 resize-y"
                  />
                  <p className="text-sm text-slate-500 mt-1">
                    Include methods used, locations visited, persons interviewed, evidence collected, etc.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                onClick={handleSubmit} 
                className="w-full bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white font-semibold py-4 text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Submit Daily Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Success Dialog */}
        <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Report Submitted Successfully!</AlertDialogTitle>
              <AlertDialogDescription>
                Your daily activity report has been submitted and recorded in the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogAction onClick={handleCloseDialog}>
              Continue
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
