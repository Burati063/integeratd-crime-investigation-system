"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, User } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface DemographicData {
  id: string
  personType: "Accuser" | "Accused" | "Witness"
  fullName: string
  dateOfBirth: string
  nationality: string
  age: string
  gender: string
  houseNumber: string
  address: string
  region: string
  nation: string
  woreda: string
  kebele: string
  residentIdNumber: string
  marriageStatus: string
  educationStatus: string
  workStatus: string
  phoneNumber1: string
  phoneNumber2: string
  locationName: string
  latitude: string
  longitude: string
}

interface DemographicDataFormProps {
  crNumber: string
  derNumber: string
  caseTitle: string
  onClose: () => void
  onSave: (data: DemographicData[]) => void
}

export function DemographicDataForm({ crNumber, derNumber, caseTitle, onClose, onSave }: DemographicDataFormProps) {
  const { t } = useLanguage()
  const [demographicDataId, setDemographicDataId] = useState(`DD-${Date.now()}`)
  const [selectedPersonType, setSelectedPersonType] = useState<"Accuser" | "Accused" | "Witness">("Accuser")
  const [persons, setPersons] = useState<DemographicData[]>([])
  const [currentPerson, setCurrentPerson] = useState<Partial<DemographicData>>({
    personType: "Accuser",
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    age: "",
    gender: "",
    houseNumber: "",
    address: "",
    region: "",
    nation: "",
    woreda: "",
    kebele: "",
    residentIdNumber: "",
    marriageStatus: "",
    educationStatus: "",
    workStatus: "",
    phoneNumber1: "",
    phoneNumber2: "",
    locationName: "",
    latitude: "",
    longitude: "",
  })

  const handleInputChange = (field: keyof DemographicData, value: string) => {
    setCurrentPerson((prev) => ({ ...prev, [field]: value }))
  }

  const addPerson = () => {
    if (currentPerson.fullName && currentPerson.personType) {
      const newPerson: DemographicData = {
        ...currentPerson,
        id: `${currentPerson.personType}-${Date.now()}`,
      } as DemographicData

      setPersons((prev) => [...prev, newPerson])
      setCurrentPerson({
        personType: selectedPersonType,
        fullName: "",
        dateOfBirth: "",
        nationality: "",
        age: "",
        gender: "",
        houseNumber: "",
        address: "",
        region: "",
        nation: "",
        woreda: "",
        kebele: "",
        residentIdNumber: "",
        marriageStatus: "",
        educationStatus: "",
        workStatus: "",
        phoneNumber1: "",
        phoneNumber2: "",
        locationName: "",
        latitude: "",
        longitude: "",
      })
    }
  }

  const removePerson = (id: string) => {
    setPersons((prev) => prev.filter((person) => person.id !== id))
  }

  const handleSave = () => {
    onSave(persons)
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
                <User className="h-5 w-5" />
                {t.investigator.addDemographicData}
              </CardTitle>
              <div className="text-sm text-gray-600 mt-1">
                <p>
                  CR Number: {crNumber} | DER Number: {derNumber}
                </p>
                <p>Case: {caseTitle}</p>
                <p>Demographic Data ID: {demographicDataId}</p>
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
                  setCurrentPerson((prev) => ({ ...prev, personType: value }))
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

            {/* Added Persons List */}
            {persons.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">{t.demographic.addedPersons}</h3>
                <div className="space-y-2">
                  {persons.map((person) => (
                    <div key={person.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge className={getPersonTypeColor(person.personType)}>{person.personType}</Badge>
                        <span className="font-medium">{person.fullName}</span>
                        <span className="text-sm text-gray-600">{person.nationality}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePerson(person.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Demographic Form */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium">
                {t.demographic.addNewPerson} ({selectedPersonType})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">{t.demographic.fullName} *</Label>
                  <Input
                    id="fullName"
                    value={currentPerson.fullName || ""}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder={t.demographic.fullName}
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">{t.demographic.dateOfBirth}</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={currentPerson.dateOfBirth || ""}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="nationality">{t.demographic.nationality}</Label>
                  <Input
                    id="nationality"
                    value={currentPerson.nationality || ""}
                    onChange={(e) => handleInputChange("nationality", e.target.value)}
                    placeholder={t.demographic.nationality}
                  />
                </div>

                <div>
                  <Label htmlFor="age">{t.demographic.age}</Label>
                  <Input
                    id="age"
                    type="number"
                    value={currentPerson.age || ""}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder={t.demographic.age}
                  />
                </div>

                <div>
                  <Label htmlFor="gender">{t.demographic.gender}</Label>
                  <Select
                    value={currentPerson.gender || ""}
                    onValueChange={(value) => handleInputChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.demographic.selectGender} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">{t.demographic.male}</SelectItem>
                      <SelectItem value="Female">{t.demographic.female}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="houseNumber">{t.demographic.houseNumber}</Label>
                  <Input
                    id="houseNumber"
                    value={currentPerson.houseNumber || ""}
                    onChange={(e) => handleInputChange("houseNumber", e.target.value)}
                    placeholder={t.demographic.houseNumber}
                  />
                </div>

                <div>
                  <Label htmlFor="address">{t.demographic.address}</Label>
                  <Input
                    id="address"
                    value={currentPerson.address || ""}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder={t.demographic.address}
                  />
                </div>

                <div>
                  <Label htmlFor="region">{t.demographic.region}</Label>
                  <Input
                    id="region"
                    value={currentPerson.region || ""}
                    onChange={(e) => handleInputChange("region", e.target.value)}
                    placeholder={t.demographic.region}
                  />
                </div>

                <div>
                  <Label htmlFor="nation">{t.demographic.nation}</Label>
                  <Input
                    id="nation"
                    value={currentPerson.nation || ""}
                    onChange={(e) => handleInputChange("nation", e.target.value)}
                    placeholder={t.demographic.nation}
                  />
                </div>

                <div>
                  <Label htmlFor="woreda">{t.demographic.woreda}</Label>
                  <Input
                    id="woreda"
                    value={currentPerson.woreda || ""}
                    onChange={(e) => handleInputChange("woreda", e.target.value)}
                    placeholder={t.demographic.woreda}
                  />
                </div>

                <div>
                  <Label htmlFor="kebele">{t.demographic.kebele}</Label>
                  <Input
                    id="kebele"
                    value={currentPerson.kebele || ""}
                    onChange={(e) => handleInputChange("kebele", e.target.value)}
                    placeholder={t.demographic.kebele}
                  />
                </div>

                <div>
                  <Label htmlFor="residentIdNumber">{t.demographic.residentIdNumber}</Label>
                  <Input
                    id="residentIdNumber"
                    value={currentPerson.residentIdNumber || ""}
                    onChange={(e) => handleInputChange("residentIdNumber", e.target.value)}
                    placeholder={t.demographic.residentIdNumber}
                  />
                </div>

                <div>
                  <Label htmlFor="marriageStatus">{t.demographic.marriageStatus}</Label>
                  <Select
                    value={currentPerson.marriageStatus || ""}
                    onValueChange={(value) => handleInputChange("marriageStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.demographic.selectMarriageStatus} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">{t.demographic.single}</SelectItem>
                      <SelectItem value="Married">{t.demographic.married}</SelectItem>
                      <SelectItem value="Divorced">{t.demographic.divorced}</SelectItem>
                      <SelectItem value="Widowed">{t.demographic.widowed}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="educationStatus">{t.demographic.educationStatus}</Label>
                  <Input
                    id="educationStatus"
                    value={currentPerson.educationStatus || ""}
                    onChange={(e) => handleInputChange("educationStatus", e.target.value)}
                    placeholder={t.demographic.educationStatus}
                  />
                </div>

                <div>
                  <Label htmlFor="workStatus">{t.demographic.workStatus}</Label>
                  <Input
                    id="workStatus"
                    value={currentPerson.workStatus || ""}
                    onChange={(e) => handleInputChange("workStatus", e.target.value)}
                    placeholder={t.demographic.workStatus}
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber1">{t.demographic.phoneNumber1}</Label>
                  <Input
                    id="phoneNumber1"
                    value={currentPerson.phoneNumber1 || ""}
                    onChange={(e) => handleInputChange("phoneNumber1", e.target.value)}
                    placeholder={t.demographic.phoneNumber1}
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber2">{t.demographic.phoneNumber2}</Label>
                  <Input
                    id="phoneNumber2"
                    value={currentPerson.phoneNumber2 || ""}
                    onChange={(e) => handleInputChange("phoneNumber2", e.target.value)}
                    placeholder={t.demographic.phoneNumber2}
                  />
                </div>

                <div>
                  <Label htmlFor="locationName">{t.demographic.locationName}</Label>
                  <Input
                    id="locationName"
                    value={currentPerson.locationName || ""}
                    onChange={(e) => handleInputChange("locationName", e.target.value)}
                    placeholder={t.demographic.locationName}
                  />
                </div>

                <div>
                  <Label htmlFor="latitude">{t.demographic.latitude}</Label>
                  <Input
                    id="latitude"
                    value={currentPerson.latitude || ""}
                    onChange={(e) => handleInputChange("latitude", e.target.value)}
                    placeholder={t.demographic.latitude}
                  />
                </div>

                <div>
                  <Label htmlFor="longitude">{t.demographic.longitude}</Label>
                  <Input
                    id="longitude"
                    value={currentPerson.longitude || ""}
                    onChange={(e) => handleInputChange("longitude", e.target.value)}
                    placeholder={t.demographic.longitude}
                  />
                </div>
              </div>

              <Button onClick={addPerson} className="w-full" disabled={!currentPerson.fullName}>
                <Plus className="h-4 w-4 mr-2" />
                {t.demographic.addPerson}
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <Button variant="outline" onClick={onClose}>
                {t.common.cancel}
              </Button>
              <Button onClick={handleSave} disabled={persons.length === 0}>
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
