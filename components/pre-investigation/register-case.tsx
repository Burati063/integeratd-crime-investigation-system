"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/i18n"

export function RegisterCase() {
  const { t } = useLanguage()
  const [caseData, setCaseData] = useState({
    crNumber: `CR-${Date.now()}`,
    derNumber: `DER-${Date.now()}`,
    title: "",
    department: "",
    crime: "",
    description: "",
    location: "",
    reportedBy: "",
    reportedDate: new Date().toISOString().split("T")[0],
  })

  const departments = [
    {
      id: "major-crime",
      name: "Major Crime Division",
      crimes: ["Organized unique crimes", "Human trafficking", "Smuggling", "Drug trafficking"],
    },
    {
      id: "specialized-crime",
      name: "Specialized Crime Division",
      crimes: ["Terrorism"],
    },
    {
      id: "financial-crime",
      name: "Financial Crime Division",
      crimes: ["Finance fraud", "Tax", "Custom commission case"],
    },
    {
      id: "anti-corruption",
      name: "Anti-Corruption Division",
      crimes: ["Corruption"],
    },
    {
      id: "technology-crime",
      name: "Technology Crime Division",
      crimes: ["Technology based crimes"],
    },
  ]

  const selectedDepartment = departments.find((dept) => dept.id === caseData.department)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Case registered:", caseData)
    // Here you would typically send the data to your backend
    alert(t.caseRegistration.caseRegisteredSuccessfully)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.caseRegistration.registerCase}</h1>
        <p className="text-gray-600">{t.caseRegistration.registerNewCaseInvestigation}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.caseRegistration.caseInformation}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="crNumber">{t.caseRegistration.crNumber}</Label>
                <Input id="crNumber" value={caseData.crNumber} readOnly className="bg-gray-50" />
              </div>
              <div>
                <Label htmlFor="derNumber">{t.caseRegistration.derNumber}</Label>
                <Input id="derNumber" value={caseData.derNumber} readOnly className="bg-gray-50" />
              </div>
            </div>

            <div>
              <Label htmlFor="title">{t.caseRegistration.caseTitle}</Label>
              <Input
                id="title"
                value={caseData.title}
                onChange={(e) => setCaseData({ ...caseData, title: e.target.value })}
                placeholder={t.caseRegistration.enterCaseTitle}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">{t.cases.department}</Label>
                <Select
                  value={caseData.department}
                  onValueChange={(value) => setCaseData({ ...caseData, department: value, crime: "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.caseRegistration.selectDepartment} />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="crime">{t.caseRegistration.crimeType}</Label>
                <Select
                  value={caseData.crime}
                  onValueChange={(value) => setCaseData({ ...caseData, crime: value })}
                  disabled={!selectedDepartment}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.caseRegistration.selectCrimeType} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedDepartment?.crimes.map((crime) => (
                      <SelectItem key={crime} value={crime}>
                        {crime}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">{t.caseRegistration.caseDescription}</Label>
              <Textarea
                id="description"
                value={caseData.description}
                onChange={(e) => setCaseData({ ...caseData, description: e.target.value })}
                placeholder={t.caseRegistration.enterCaseDescription}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">{t.caseRegistration.location}</Label>
                <Input
                  id="location"
                  value={caseData.location}
                  onChange={(e) => setCaseData({ ...caseData, location: e.target.value })}
                  placeholder={t.caseRegistration.enterLocation}
                  required
                />
              </div>
              <div>
                <Label htmlFor="reportedBy">{t.caseRegistration.reportedBy}</Label>
                <Input
                  id="reportedBy"
                  value={caseData.reportedBy}
                  onChange={(e) => setCaseData({ ...caseData, reportedBy: e.target.value })}
                  placeholder={t.caseRegistration.enterReporterName}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="reportedDate">{t.caseRegistration.reportedDate}</Label>
              <Input
                id="reportedDate"
                type="date"
                value={caseData.reportedDate}
                onChange={(e) => setCaseData({ ...caseData, reportedDate: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {t.caseRegistration.registerCase}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
