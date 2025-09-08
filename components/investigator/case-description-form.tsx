"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, FileText } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface CaseDescription {
  id: string
  personType: "Accuser" | "Accused" | "Witness"
  personName: string
  description: string
}

interface CaseDescriptionFormProps {
  crNumber: string
  derNumber: string
  caseTitle: string
  onClose: () => void
  onSave: (data: CaseDescription[]) => void
}

export function CaseDescriptionForm({ crNumber, derNumber, caseTitle, onClose, onSave }: CaseDescriptionFormProps) {
  const { t } = useLanguage()
  const [caseDescriptionId, setCaseDescriptionId] = useState(`CD-${Date.now()}`)
  const [selectedPersonType, setSelectedPersonType] = useState<"Accuser" | "Accused" | "Witness">("Accuser")
  const [descriptions, setDescriptions] = useState<CaseDescription[]>([])
  const [currentDescription, setCurrentDescription] = useState({
    personType: "Accuser" as "Accuser" | "Accused" | "Witness",
    personName: "",
    description: "",
  })

  // Mock persons data - in real app, this would come from the demographic data
  const mockPersons = {
    Accuser: ["John Doe", "Jane Smith"],
    Accused: ["Mike Johnson", "Sarah Wilson"],
    Witness: ["David Brown", "Lisa Davis", "Tom Anderson"],
  }

  const handleInputChange = (field: string, value: string) => {
    setCurrentDescription((prev) => ({ ...prev, [field]: value }))
  }

  const addDescription = () => {
    if (currentDescription.personName && currentDescription.description && currentDescription.personType) {
      const newDescription: CaseDescription = {
        ...currentDescription,
        id: `${currentDescription.personType}-${Date.now()}`,
      }

      setDescriptions((prev) => [...prev, newDescription])
      setCurrentDescription({
        personType: selectedPersonType,
        personName: "",
        description: "",
      })
    }
  }

  const removeDescription = (id: string) => {
    setDescriptions((prev) => prev.filter((desc) => desc.id !== id))
  }

  const handleSave = () => {
    onSave(descriptions)
    onClose()
  }

  const getPersonTypeColor = (type: string) => {
    switch (type) {
      case "Accuser":
        return "bg-blue-100 text-blue-800"
      case "Accused":
        return "bg-red-100 text-red-800"
      case "Witness":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t.investigator.addCaseDescription}
              </CardTitle>
              <div className="text-sm text-gray-600 mt-1">
                <p>
                  CR Number: {crNumber} | DER Number: {derNumber}
                </p>
                <p>Case: {caseTitle}</p>
                <p>Case Description ID: {caseDescriptionId}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="p-6">
            {/* Person Type Selection */}
            <div className="mb-6">
              <Label className="text-base font-medium">{t.demographic.selectPersonType}</Label>
              <Select
                value={selectedPersonType}
                onValueChange={(value: "Accuser" | "Accused" | "Witness") => {
                  setSelectedPersonType(value)
                  setCurrentDescription((prev) => ({ ...prev, personType: value, personName: "" }))
                }}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Accuser">{t.personTypes.accuser}</SelectItem>
                  <SelectItem value="Accused">{t.personTypes.accused}</SelectItem>
                  <SelectItem value="Witness">{t.personTypes.witness}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Added Descriptions List */}
            {descriptions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">{t.caseDescription.addedDescriptions}</h3>
                <div className="space-y-3">
                  {descriptions.map((desc) => (
                    <div key={desc.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Badge className={getPersonTypeColor(desc.personType)}>{desc.personType}</Badge>
                          <span className="font-medium">{desc.personName}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDescription(desc.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-700 bg-white p-3 rounded border">{desc.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Case Description Form */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium">
                {t.caseDescription.addNewDescription} ({selectedPersonType})
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="personName">{t.caseDescription.selectPerson} *</Label>
                  <Select
                    value={currentDescription.personName}
                    onValueChange={(value) => handleInputChange("personName", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={t.caseDescription.selectPersonPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPersons[selectedPersonType].map((person) => (
                        <SelectItem key={person} value={person}>
                          {person}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">{t.caseDescription.description} *</Label>
                  <Textarea
                    id="description"
                    value={currentDescription.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder={t.caseDescription.descriptionPlaceholder}
                    rows={6}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">{t.caseDescription.descriptionHint}</p>
                </div>
              </div>

              <Button
                onClick={addDescription}
                className="w-full"
                disabled={!currentDescription.personName || !currentDescription.description}
              >
                <Plus className="h-4 w-4 mr-2" />
                {t.caseDescription.addDescription}
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <Button variant="outline" onClick={onClose}>
                {t.common.cancel}
              </Button>
              <Button onClick={handleSave} disabled={descriptions.length === 0}>
                <Save className="h-4 w-4 mr-2" />
                {t.common.save}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
