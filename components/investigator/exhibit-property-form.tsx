"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, Package } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface ExhibitProperty {
  id: string
  personType: "Accuser" | "Accused" | "Witness"
  personName: string
  propertyName: string
  description: string
  quantity: string
}

interface ExhibitPropertyFormProps {
  crNumber: string
  derNumber: string
  caseTitle: string
  onClose: () => void
  onSave: (data: ExhibitProperty[]) => void
}

export function ExhibitPropertyForm({ crNumber, derNumber, caseTitle, onClose, onSave }: ExhibitPropertyFormProps) {
  const { t } = useLanguage()
  const [exhibitPropertyId, setExhibitPropertyId] = useState(`EP-${Date.now()}`)
  const [selectedPersonType, setSelectedPersonType] = useState<"Accuser" | "Accused" | "Witness">("Accuser")
  const [exhibits, setExhibits] = useState<ExhibitProperty[]>([])
  const [currentExhibit, setCurrentExhibit] = useState({
    personType: "Accuser" as "Accuser" | "Accused" | "Witness",
    personName: "",
    propertyName: "",
    description: "",
    quantity: "",
  })

  // Mock persons data - in real app, this would come from the demographic data
  const mockPersons = {
    Accuser: ["John Doe", "Jane Smith"],
    Accused: ["Mike Johnson", "Sarah Wilson"],
    Witness: ["David Brown", "Lisa Davis", "Tom Anderson"],
  }

  const handleInputChange = (field: string, value: string) => {
    setCurrentExhibit((prev) => ({ ...prev, [field]: value }))
  }

  const addExhibit = () => {
    if (
      currentExhibit.personName &&
      currentExhibit.propertyName &&
      currentExhibit.description &&
      currentExhibit.quantity
    ) {
      const newExhibit: ExhibitProperty = {
        ...currentExhibit,
        id: `${currentExhibit.personType}-${Date.now()}`,
      }

      setExhibits((prev) => [...prev, newExhibit])
      setCurrentExhibit({
        personType: selectedPersonType,
        personName: "",
        propertyName: "",
        description: "",
        quantity: "",
      })
    }
  }

  const removeExhibit = (id: string) => {
    setExhibits((prev) => prev.filter((exhibit) => exhibit.id !== id))
  }

  const handleSave = () => {
    onSave(exhibits)
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
                <Package className="h-5 w-5" />
                {t.investigator.addExhibitProperty}
              </CardTitle>
              <div className="text-sm text-gray-600 mt-1">
                <p>
                  CR Number: {crNumber} | DER Number: {derNumber}
                </p>
                <p>Case: {caseTitle}</p>
                <p>Exhibit Property ID: {exhibitPropertyId}</p>
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
                  setCurrentExhibit((prev) => ({ ...prev, personType: value, personName: "" }))
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

            {/* Added Exhibits List */}
            {exhibits.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">{t.exhibitProperty.addedExhibits}</h3>
                <div className="space-y-3">
                  {exhibits.map((exhibit) => (
                    <div key={exhibit.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Badge className={getPersonTypeColor(exhibit.personType)}>{exhibit.personType}</Badge>
                          <span className="font-medium">{exhibit.personName}</span>
                          <span className="text-sm text-gray-600">• {exhibit.propertyName}</span>
                          <span className="text-sm text-gray-500">Qty: {exhibit.quantity}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExhibit(exhibit.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-700 bg-white p-3 rounded border">{exhibit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exhibit Property Form */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium">
                {t.exhibitProperty.addNewExhibit} ({selectedPersonType})
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="personName">{t.exhibitProperty.selectPerson} *</Label>
                  <Select
                    value={currentExhibit.personName}
                    onValueChange={(value) => handleInputChange("personName", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={t.exhibitProperty.selectPersonPlaceholder} />
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertyName">{t.exhibitProperty.propertyName} *</Label>
                    <Input
                      id="propertyName"
                      value={currentExhibit.propertyName}
                      onChange={(e) => handleInputChange("propertyName", e.target.value)}
                      placeholder={t.exhibitProperty.propertyNamePlaceholder}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="quantity">{t.exhibitProperty.quantity} *</Label>
                    <Input
                      id="quantity"
                      value={currentExhibit.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      placeholder={t.exhibitProperty.quantityPlaceholder}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">{t.exhibitProperty.description} *</Label>
                  <Textarea
                    id="description"
                    value={currentExhibit.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder={t.exhibitProperty.descriptionPlaceholder}
                    rows={4}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">{t.exhibitProperty.descriptionHint}</p>
                </div>
              </div>

              <Button
                onClick={addExhibit}
                className="w-full"
                disabled={
                  !currentExhibit.personName ||
                  !currentExhibit.propertyName ||
                  !currentExhibit.description ||
                  !currentExhibit.quantity
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                {t.exhibitProperty.addExhibit}
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <Button variant="outline" onClick={onClose}>
                {t.common.cancel}
              </Button>
              <Button onClick={handleSave} disabled={exhibits.length === 0}>
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
