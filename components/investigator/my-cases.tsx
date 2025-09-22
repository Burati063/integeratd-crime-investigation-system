"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  User,
  FileText,
  Eye,
  UserPlus,
  Users,
  UserCheck,
  UserX,
  Box,
  Edit,
  Trash2,
  Save,
  X,
  Send,
  CheckCircle,
} from "lucide-react";

interface Person {
  id: string;
  type: "witness" | "accuser" | "accused";
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  nationality: string;
  houseNumber: string;
  address: string;
  region: string;
  nation: string;
  woreda: string;
  kebele: string;
  residentId: string;
  maritalStatus: string;
  educationStatus: string;
  workStatus: string;
  phoneNumber: string;
  description?: string;
}

interface Exhibit {
  id: string;
  name: string;
  description: string;
  quantity: number;
  registeredDate: string;
  relatedPersonId: string;
  relatedPersonName: string;
}

interface Case {
  id: string;
  crNumber: string;
  derNumber: string;
  title: string;
  status: string;
  assignedDate: string;
  deadline: string;
  department: string;
  priority: "High" | "Medium" | "Low";
  description?: string;
  assignedBy: string;
  progress: number;
  persons?: Person[];
  exhibits?: Exhibit[];
}

export default function MyCases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submittedCase, setSubmittedCase] = useState<Case | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("person");

  // Person form state
  const [personForm, setPersonForm] = useState({
    type: "",
    fullName: "",
    dateOfBirth: "",

    age: 0,
    gender: "",
    nationality: "",
    houseNumber: "",
    address: "",
    region: "",
    nation: "",
    woreda: "",
    kebele: "",
    residentId: "",
    maritalStatus: "",
    educationStatus: "",
    workStatus: "",
    phoneNumber: "",
    description: "",
  });

  // Exhibit form state
  const [exhibitForm, setExhibitForm] = useState({
    personId: "",
    name: "",
    description: "",
    quantity: 1,
    registeredDate: "",
  });

  const [cases, setCases] = useState<Case[]>([
    {
      id: "1",
      crNumber: "CR-2024-001",
      derNumber: "DER-2024-001",
      title: "Drug Trafficking Investigation",
      status: "In Progress",
      assignedDate: "2024-08-15",
      deadline: "2024-09-15",
      department: "Major Crime Division",
      priority: "High",
      description:
        "Investigation into organized drug trafficking network operating across multiple regions.",
      assignedBy: "Department Head - Major Crime",
      progress: 65,
      persons: [],
      exhibits: [],
    },
    {
      id: "2",
      crNumber: "CR-2024-005",
      derNumber: "DER-2024-005",
      title: "Financial Fraud Case",
      status: "Evidence Collection",
      assignedDate: "2024-08-20",
      deadline: "2024-09-20",
      department: "Financial Crime Division",
      priority: "Medium",
      description:
        "Corporate embezzlement case involving multiple financial institutions.",
      assignedBy: "Department Head - Financial Crime",
      progress: 40,
      persons: [],
      exhibits: [],
    },
    {
      id: "3",
      crNumber: "CR-2024-008",
      derNumber: "DER-2024-008",
      title: "Corruption Investigation",
      status: "Interview Phase",
      assignedDate: "2024-08-25",
      deadline: "2024-09-25",
      department: "Anti-Corruption Division",
      priority: "High",
      description:
        "Government official corruption case with multiple witnesses.",
      assignedBy: "Department Head - Anti-Corruption",
      progress: 75,
      persons: [],
      exhibits: [],
    },
  ]);

  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.crNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.derNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || case_.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || case_.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Evidence Collection":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Interview Phase":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Initial Review":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Submitted":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handlePersonFormChange = (field: string, value: string) => {
    setPersonForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "dateOfBirth") {
        updated.age = calculateAge(value);
      }
      return updated;
    });
  };

  const handleAddPerson = () => {
    if (!selectedCase) return;

    const newPerson: Person = {
      id: Date.now().toString(),
      ...personForm,
      type: personForm.type as "witness" | "accuser" | "accused",
    };

    setCases((prev) =>
      prev.map((case_) =>
        case_.id === selectedCase.id
          ? { ...case_, persons: [...(case_.persons || []), newPerson] }
          : case_
      )
    );

    // Reset form
    setPersonForm({
      type: "",
      fullName: "",
      dateOfBirth: "",
      age: 0,
      gender: "",
      nationality: "",
      houseNumber: "",
      address: "",
      region: "",
      nation: "",
      woreda: "",
      kebele: "",
      residentId: "",
      maritalStatus: "",
      educationStatus: "",
      workStatus: "",
      phoneNumber: "",
      description: "",
    });

    // Update selected case
    const updatedCase = cases.find((c) => c.id === selectedCase.id);
    if (updatedCase) {
      setSelectedCase({
        ...updatedCase,
        persons: [...(updatedCase.persons || []), newPerson],
      });
    }
  };

  const handleAddExhibit = () => {
    if (!selectedCase) return;

    const relatedPerson = selectedCase.persons?.find(
      (p) => p.id === exhibitForm.personId
    );
    if (!relatedPerson) return;

    const newExhibit: Exhibit = {
      id: Date.now().toString(),
      name: exhibitForm.name,
      description: exhibitForm.description,
      quantity: exhibitForm.quantity,
      registeredDate: exhibitForm.registeredDate,
      relatedPersonId: exhibitForm.personId,
      relatedPersonName: relatedPerson.fullName,
    };

    setCases((prev) =>
      prev.map((case_) =>
        case_.id === selectedCase.id
          ? { ...case_, exhibits: [...(case_.exhibits || []), newExhibit] }
          : case_
      )
    );

    // Reset form
    setExhibitForm({
      personId: "",
      name: "",
      description: "",
      quantity: 1,
      registeredDate: "",
    });

    // Update selected case
    const updatedCase = cases.find((c) => c.id === selectedCase.id);
    if (updatedCase) {
      setSelectedCase({
        ...updatedCase,
        exhibits: [...(updatedCase.exhibits || []), newExhibit],
      });
    }
  };

  const handleRejectCase = (caseId: string) => {
    setCases((prev) =>
      prev.map((case_) =>
        case_.id === caseId ? { ...case_, status: "Rejected" } : case_
      )
    );
  };
  const handleSubmitCase = (case_: Case) => {
    // Update the case status to submitted
    setCases((prev) =>
      prev.map((c) => (c.id === case_.id ? { ...c, status: "Submitted" } : c))
    );

    setSubmittedCase(case_);
    setIsSubmitModalOpen(true);
  };

  const getPersonTypeColor = (type: string) => {
    switch (type) {
      case "witness":
        return "bg-blue-100 text-blue-800";
      case "accuser":
        return "bg-yellow-100 text-yellow-800";
      case "accused":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Cases</h1>
          <p className="text-gray-600">
            Manage your assigned cases and investigations
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search cases by title, CR number, or DER number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Evidence Collection">
                  Evidence Collection
                </SelectItem>
                <SelectItem value="Interview Phase">Interview Phase</SelectItem>
                <SelectItem value="Initial Review">Initial Review</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <div className="grid gap-6">
        {filteredCases.map((case_) => (
          <Card key={case_.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {case_.title}
                    </h3>
                    <Badge className={getPriorityColor(case_.priority)}>
                      {case_.priority}
                    </Badge>
                    <Badge className={getStatusColor(case_.status)}>
                      {case_.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex flex-wrap gap-4">
                      <span>
                        <strong>CR Number:</strong> {case_.crNumber}
                      </span>
                      <span>
                        <strong>DER Number:</strong> {case_.derNumber}
                      </span>
                    </div>
                    <div>
                      <strong>Description:</strong> {case_.description}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <span>
                        <strong>Department:</strong> {case_.department}
                      </span>
                      <span>
                        <strong>Assigned:</strong>{" "}
                        {new Date(case_.assignedDate).toLocaleDateString()}
                      </span>
                      <span>
                        <strong>Deadline:</strong>{" "}
                        {new Date(case_.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    {case_.persons && case_.persons.length > 0 && (
                      <div>
                        <strong>Registered Persons:</strong>{" "}
                        {case_.persons.length}(
                        {
                          case_.persons.filter((p) => p.type === "witness")
                            .length
                        }{" "}
                        witnesses,
                        {
                          case_.persons.filter((p) => p.type === "accuser")
                            .length
                        }{" "}
                        accusers,
                        {
                          case_.persons.filter((p) => p.type === "accused")
                            .length
                        }{" "}
                        accused)
                      </div>
                    )}
                    {case_.exhibits && case_.exhibits.length > 0 && (
                      <div>
                        <strong>Registered Exhibits:</strong>{" "}
                        {case_.exhibits.length}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      setSelectedCase(case_);
                      setIsDetailOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Go Detail
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleRejectCase(case_.id)}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleSubmitCase(case_)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Custom Modal Overlay - Replace your Dialog component with this */}
      {isDetailOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={() => setIsDetailOpen(false)}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b bg-gradient-to-r from-slate-800 to-slate-700 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6" />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-xl font-semibold">
                      Case Registration System
                    </span>
                    <span className="text-slate-200 text-sm font-normal">
                      {selectedCase?.title}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="overflow-y-auto max-h-[calc(95vh-80px)]">
                {selectedCase && (
                  <div className="px-6 py-4 space-y-6">
                    {/* Case Numbers - Enhanced Mobile Layout */}
                    <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white p-4 sm:p-6 rounded-lg shadow-lg">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Case Information
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-200">
                            CR Number
                          </label>
                          <Input
                            value={selectedCase.crNumber}
                            readOnly
                            className="bg-white/15 border-white/20 text-white placeholder-white/70 focus:bg-white/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-200">
                            DER Number
                          </label>
                          <Input
                            value={selectedCase.derNumber}
                            readOnly
                            className="bg-white/15 border-white/20 text-white placeholder-white/70 focus:bg-white/20 transition-all"
                          />
                        </div>
                      </div>

                      {/* Case Status and Priority */}
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                          Status: {selectedCase.status}
                        </Badge>
                        <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                          Priority: {selectedCase.priority}
                        </Badge>
                        <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                          Progress: {selectedCase.progress}%
                        </Badge>
                      </div>
                    </div>

                    {/* Enhanced Tabs with Better Mobile Support */}
                    <Tabs
                      value={currentTab}
                      onValueChange={setCurrentTab}
                      className="w-full"
                    >
                      <div className="sticky top-0 z-10 bg-white border-b pb-2">
                        <TabsList className="grid w-full grid-cols-2 h-12 bg-slate-100">
                          <TabsTrigger
                            value="person"
                            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
                          >
                            <Users className="h-4 w-4" />
                            <span className="hidden sm:inline">
                              Person Registration
                            </span>
                            <span className="sm:hidden">Persons</span>
                            {selectedCase.persons &&
                              selectedCase.persons.length > 0 && (
                                <Badge
                                  variant="secondary"
                                  className="ml-1 text-xs"
                                >
                                  {selectedCase.persons.length}
                                </Badge>
                              )}
                          </TabsTrigger>
                          <TabsTrigger
                            value="exhibit"
                            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
                          >
                            <Box className="h-4 w-4" />
                            <span className="hidden sm:inline">
                              Exhibit Registration
                            </span>
                            <span className="sm:hidden">Exhibits</span>
                            {selectedCase.exhibits &&
                              selectedCase.exhibits.length > 0 && (
                                <Badge
                                  variant="secondary"
                                  className="ml-1 text-xs"
                                >
                                  {selectedCase.exhibits.length}
                                </Badge>
                              )}
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      {/* Person Registration Tab */}
                      <TabsContent value="person" className="space-y-6 mt-6">
                        <Card className="shadow-lg border-t-4 border-t-slate-600">
                          <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-t-lg">
                            <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <span className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Register New Person
                              </span>
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-white border-white/50 hover:bg-white hover:text-slate-700 transition-all"
                                  onClick={() =>
                                    handlePersonFormChange("type", "witness")
                                  }
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  <span className="hidden xs:inline">
                                    Add
                                  </span>{" "}
                                  Witness
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-white border-white/50 hover:bg-white hover:text-slate-700 transition-all"
                                  onClick={() =>
                                    handlePersonFormChange("type", "accuser")
                                  }
                                >
                                  <UserCheck className="h-4 w-4 mr-1" />
                                  <span className="hidden xs:inline">
                                    Add
                                  </span>{" "}
                                  Accuser
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-white border-white/50 hover:bg-white hover:text-slate-700 transition-all"
                                  onClick={() =>
                                    handlePersonFormChange("type", "accused")
                                  }
                                >
                                  <UserX className="h-4 w-4 mr-1" />
                                  <span className="hidden xs:inline">
                                    Add
                                  </span>{" "}
                                  Accused
                                </Button>
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-6 space-y-8">
                            {/* Demographic Information */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 mb-4">
                                <div className="h-1 w-8 bg-slate-600 rounded"></div>
                                <h4 className="font-semibold text-slate-700 text-lg">
                                  Demographic Information
                                </h4>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Select
                                  value={personForm.type}
                                  onValueChange={(value) =>
                                    handlePersonFormChange("type", value)
                                  }
                                >
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select Person Type *" />
                                  </SelectTrigger>
                                  <SelectContent className="z-[10000]">
                                    <SelectItem value="witness">
                                      👁️ Witness
                                    </SelectItem>
                                    <SelectItem value="accuser">
                                      ✓ Accuser
                                    </SelectItem>
                                    <SelectItem value="accused">
                                      ⚠️ Accused
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <div className="sm:col-span-1 lg:col-span-3">
                                  <Input
                                    className="h-12"
                                    placeholder="Enter full name *"
                                    value={personForm.fullName}
                                    onChange={(e) =>
                                      handlePersonFormChange(
                                        "fullName",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Input
                                  className="h-12"
                                  type="date"
                                  value={personForm.dateOfBirth}
                                  onChange={(e) =>
                                    handlePersonFormChange(
                                      "dateOfBirth",
                                      e.target.value
                                    )
                                  }
                                />
                                <Input
                                  className="h-12 bg-gray-50"
                                  placeholder="Age (auto-calculated)"
                                  value={personForm.age || ""}
                                  readOnly
                                />
                                <Select
                                  value={personForm.gender}
                                  onValueChange={(value) =>
                                    handlePersonFormChange("gender", value)
                                  }
                                >
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select Gender *" />
                                  </SelectTrigger>
                                  <SelectContent className="z-[10000]">
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">
                                      Female
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input
                                  className="h-12"
                                  placeholder="Enter nationality *"
                                  value={personForm.nationality}
                                  onChange={(e) =>
                                    handlePersonFormChange(
                                      "nationality",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>

                            {/* Address Information */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 mb-4">
                                <div className="h-1 w-8 bg-slate-600 rounded"></div>
                                <h4 className="font-semibold text-slate-700 text-lg">
                                  Address Information
                                </h4>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Input
                                  className="h-12"
                                  placeholder="House Number"
                                  value={personForm.houseNumber}
                                  onChange={(e) =>
                                    handlePersonFormChange(
                                      "houseNumber",
                                      e.target.value
                                    )
                                  }
                                />
                                <div className="sm:col-span-1 lg:col-span-3">
                                  <Input
                                    className="h-12"
                                    placeholder="Enter address *"
                                    value={personForm.address}
                                    onChange={(e) =>
                                      handlePersonFormChange(
                                        "address",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Input
                                  className="h-12"
                                  placeholder="Enter region *"
                                  value={personForm.region}
                                  onChange={(e) =>
                                    handlePersonFormChange(
                                      "region",
                                      e.target.value
                                    )
                                  }
                                />
                                <Input
                                  className="h-12"
                                  placeholder="Enter nation *"
                                  value={personForm.nation}
                                  onChange={(e) =>
                                    handlePersonFormChange(
                                      "nation",
                                      e.target.value
                                    )
                                  }
                                />
                                <Input
                                  className="h-12"
                                  placeholder="Enter woreda *"
                                  value={personForm.woreda}
                                  onChange={(e) =>
                                    handlePersonFormChange(
                                      "woreda",
                                      e.target.value
                                    )
                                  }
                                />
                                <Input
                                  className="h-12"
                                  placeholder="Enter kebele *"
                                  value={personForm.kebele}
                                  onChange={(e) =>
                                    handlePersonFormChange(
                                      "kebele",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>

                            {/* Additional Information */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 mb-4">
                                <div className="h-1 w-8 bg-slate-600 rounded"></div>
                                <h4 className="font-semibold text-slate-700 text-lg">
                                  Additional Information
                                </h4>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Input
                                  className="h-12"
                                  placeholder="Resident ID Number *"
                                  value={personForm.residentId}
                                  onChange={(e) =>
                                    handlePersonFormChange(
                                      "residentId",
                                      e.target.value
                                    )
                                  }
                                />
                                <Select
                                  value={personForm.maritalStatus}
                                  onValueChange={(value) =>
                                    handlePersonFormChange(
                                      "maritalStatus",
                                      value
                                    )
                                  }
                                >
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select Marital Status *" />
                                  </SelectTrigger>
                                  <SelectContent className="z-[10000]">
                                    <SelectItem value="Single">
                                      Single
                                    </SelectItem>
                                    <SelectItem value="Married">
                                      Married
                                    </SelectItem>
                                    <SelectItem value="Divorced">
                                      Divorced
                                    </SelectItem>
                                    <SelectItem value="Widowed">
                                      Widowed
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <Select
                                  value={personForm.educationStatus}
                                  onValueChange={(value) =>
                                    handlePersonFormChange(
                                      "educationStatus",
                                      value
                                    )
                                  }
                                >
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select Education Status *" />
                                  </SelectTrigger>
                                  <SelectContent className="z-[10000]">
                                    <SelectItem value="No Formal Education">
                                      No Formal Education
                                    </SelectItem>
                                    <SelectItem value="Primary School">
                                      Primary School
                                    </SelectItem>
                                    <SelectItem value="Secondary School">
                                      Secondary School
                                    </SelectItem>
                                    <SelectItem value="Diploma">
                                      Diploma
                                    </SelectItem>
                                    <SelectItem value="Bachelor's Degree">
                                      Bachelor's Degree
                                    </SelectItem>
                                    <SelectItem value="Master's Degree">
                                      Master's Degree
                                    </SelectItem>
                                    <SelectItem value="Doctorate">
                                      Doctorate
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                                <Select
                                  value={personForm.workStatus}
                                  onValueChange={(value) =>
                                    handlePersonFormChange("workStatus", value)
                                  }
                                >
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select Work Status *" />
                                  </SelectTrigger>
                                  <SelectContent className="z-[10000]">
                                    <SelectItem value="Employed">
                                      Employed
                                    </SelectItem>
                                    <SelectItem value="Unemployed">
                                      Unemployed
                                    </SelectItem>
                                    <SelectItem value="Student">
                                      Student
                                    </SelectItem>
                                    <SelectItem value="Retired">
                                      Retired
                                    </SelectItem>
                                    <SelectItem value="Self-Employed">
                                      Self-Employed
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input
                                  className="h-12"
                                  placeholder="Phone Number *"
                                  value={personForm.phoneNumber}
                                  onChange={(e) =>
                                    handlePersonFormChange(
                                      "phoneNumber",
                                      e.target.value
                                    )
                                  }
                                />

                                <div className="sm:col-span-2 lg:col-span-3">
                                  <Textarea
                                    rows={3}
                                    placeholder="Enter detailed description *"
                                    value={personForm.description}
                                    onChange={(e) =>
                                      setExhibitForm((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="resize-none"
                                  />
                                </div>
                                <div className="sm:col-span-2 lg:col-span-2">
                                  <Button
                                    onClick={handleAddPerson}
                                    className="w-full h-12 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg transition-all duration-200"
                                    disabled={
                                      !personForm.type || !personForm.fullName
                                    }
                                  >
                                    <UserPlus className="h-5 w-5 mr-2" />
                                    Add Person
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Registered Persons - Enhanced Mobile View */}
                            {selectedCase.persons &&
                              selectedCase.persons.length > 0 && (
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2 mb-4">
                                    <div className="h-1 w-8 bg-teal-600 rounded"></div>
                                    <h4 className="font-semibold text-slate-700 text-lg">
                                      Registered Persons (
                                      {selectedCase.persons.length})
                                    </h4>
                                  </div>

                                  {/* Desktop Table View */}
                                  <div className="hidden lg:block overflow-x-auto">
                                    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                                      <thead>
                                        <tr className="bg-slate-50">
                                          <th className="border-r border-gray-200 p-4 text-left font-semibold text-slate-700">
                                            Type
                                          </th>
                                          <th className="border-r border-gray-200 p-4 text-left font-semibold text-slate-700">
                                            Name
                                          </th>
                                          <th className="border-r border-gray-200 p-4 text-left font-semibold text-slate-700">
                                            ID Number
                                          </th>
                                          <th className="border-r border-gray-200 p-4 text-left font-semibold text-slate-700">
                                            Phone
                                          </th>
                                          <th className="p-4 text-center font-semibold text-slate-700">
                                            Actions
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {selectedCase.persons.map(
                                          (person, index) => (
                                            <tr
                                              key={person.id}
                                              className={
                                                index % 2 === 0
                                                  ? "bg-white"
                                                  : "bg-slate-25"
                                              }
                                            >
                                              <td className="border-r border-gray-200 p-4">
                                                <Badge
                                                  className={`${getPersonTypeColor(
                                                    person.type
                                                  )} font-medium`}
                                                >
                                                  {person.type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    person.type.slice(1)}
                                                </Badge>
                                              </td>
                                              <td className="border-r border-gray-200 p-4 font-medium">
                                                {person.fullName}
                                              </td>
                                              <td className="border-r border-gray-200 p-4 text-gray-600">
                                                {person.residentId}
                                              </td>
                                              <td className="border-r border-gray-200 p-4 text-gray-600">
                                                {person.phoneNumber}
                                              </td>
                                              <td className="p-4">
                                                <div className="flex justify-center gap-2">
                                                  <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="hover:bg-blue-50"
                                                  >
                                                    <Edit className="h-4 w-4" />
                                                  </Button>
                                                  <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="text-red-600 hover:bg-red-50"
                                                  >
                                                    <Trash2 className="h-4 w-4" />
                                                  </Button>
                                                </div>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>

                                  {/* Mobile Card View */}
                                  <div className="lg:hidden space-y-4">
                                    {selectedCase.persons.map((person) => (
                                      <Card
                                        key={person.id}
                                        className="shadow-sm border-l-4 border-l-teal-500"
                                      >
                                        <CardContent className="p-4">
                                          <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                              <Badge
                                                className={`${getPersonTypeColor(
                                                  person.type
                                                )} font-medium`}
                                              >
                                                {person.type
                                                  .charAt(0)
                                                  .toUpperCase() +
                                                  person.type.slice(1)}
                                              </Badge>
                                            </div>
                                            <div className="flex gap-2">
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 w-8 p-0"
                                              >
                                                <Edit className="h-3 w-3" />
                                              </Button>
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-red-600 h-8 w-8 p-0"
                                              >
                                                <Trash2 className="h-3 w-3" />
                                              </Button>
                                            </div>
                                          </div>
                                          <h5 className="font-semibold text-lg mb-2">
                                            {person.fullName}
                                          </h5>
                                          <div className="space-y-1 text-sm text-gray-600">
                                            <p>
                                              <span className="font-medium">
                                                ID:
                                              </span>{" "}
                                              {person.residentId}
                                            </p>
                                            <p>
                                              <span className="font-medium">
                                                Phone:
                                              </span>{" "}
                                              {person.phoneNumber}
                                            </p>
                                            <p>
                                              <span className="font-medium">
                                                Address:
                                              </span>{" "}
                                              {person.address}
                                            </p>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {/* Exhibit Registration Tab */}
                      <TabsContent value="exhibit" className="space-y-6 mt-6">
                        <Card className="shadow-lg border-t-4 border-t-slate-600">
                          <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-t-lg">
                            <CardTitle className="flex items-center gap-2">
                              <Box className="h-5 w-5" />
                              Exhibit Registration
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-6 space-y-8">
                            {/* Case Description */}
                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Case Description *
                              </label>
                              <Textarea
                                rows={4}
                                placeholder="Enter detailed case description"
                                value={selectedCase.description || ""}
                                readOnly
                                className="bg-gray-50 border-gray-300 resize-none"
                              />
                            </div>

                            {/* Exhibit Form */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 mb-4">
                                <div className="h-1 w-8 bg-slate-600 rounded"></div>
                                <h4 className="font-semibold text-slate-700 text-lg">
                                  Exhibit Information
                                </h4>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Select
                                  value={exhibitForm.personId}
                                  onValueChange={(value) =>
                                    setExhibitForm((prev) => ({
                                      ...prev,
                                      personId: value,
                                    }))
                                  }
                                >
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select related person *" />
                                  </SelectTrigger>
                                  <SelectContent className="z-[10000]">
                                    {selectedCase.persons?.map((person) => (
                                      <SelectItem
                                        key={person.id}
                                        value={person.id}
                                      >
                                        <div className="flex items-center gap-2">
                                          <Badge
                                            className={`${getPersonTypeColor(
                                              person.type
                                            )} text-xs`}
                                          >
                                            {person.type
                                              .charAt(0)
                                              .toUpperCase() +
                                              person.type.slice(1)}
                                          </Badge>
                                          {person.fullName}
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Input
                                  className="h-12"
                                  placeholder="Enter exhibit name *"
                                  value={exhibitForm.name}
                                  onChange={(e) =>
                                    setExhibitForm((prev) => ({
                                      ...prev,
                                      name: e.target.value,
                                    }))
                                  }
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                                <div className="sm:col-span-2 lg:col-span-3">
                                  <Textarea
                                    rows={3}
                                    placeholder="Enter detailed exhibit description *"
                                    value={exhibitForm.description}
                                    onChange={(e) =>
                                      setExhibitForm((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="resize-none"
                                  />
                                </div>
                                <Input
                                  className="h-12"
                                  type="number"
                                  placeholder="Quantity *"
                                  min="1"
                                  value={exhibitForm.quantity}
                                  onChange={(e) =>
                                    setExhibitForm((prev) => ({
                                      ...prev,
                                      quantity: parseInt(e.target.value) || 1,
                                    }))
                                  }
                                />
                                <Input
                                  className="h-12"
                                  type="date"
                                  value={exhibitForm.registeredDate}
                                  onChange={(e) =>
                                    setExhibitForm((prev) => ({
                                      ...prev,
                                      registeredDate: e.target.value,
                                    }))
                                  }
                                />
                                <Button
                                  onClick={handleAddExhibit}
                                  className="h-12 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg transition-all duration-200"
                                  disabled={
                                    !exhibitForm.personId ||
                                    !exhibitForm.name ||
                                    !exhibitForm.description
                                  }
                                >
                                  <Box className="h-4 w-4 mr-2" />
                                  <span className="hidden sm:inline">
                                    Add Exhibit
                                  </span>
                                  <span className="sm:hidden">Add</span>
                                </Button>
                              </div>
                            </div>

                            {/* Registered Exhibits */}
                            {selectedCase.exhibits &&
                              selectedCase.exhibits.length > 0 && (
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2 mb-4">
                                    <div className="h-1 w-8 bg-teal-600 rounded"></div>
                                    <h4 className="font-semibold text-slate-700 text-lg">
                                      Registered Exhibits (
                                      {selectedCase.exhibits.length})
                                    </h4>
                                  </div>

                                  <div className="grid gap-4">
                                    {selectedCase.exhibits.map((exhibit) => (
                                      <Card
                                        key={exhibit.id}
                                        className="border-l-4 border-l-teal-500 shadow-sm hover:shadow-md transition-shadow"
                                      >
                                        <CardContent className="p-4 sm:p-6">
                                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                            <div className="flex-1 space-y-3">
                                              <div className="flex flex-wrap items-center gap-2">
                                                <h5 className="font-semibold text-lg text-slate-800">
                                                  {exhibit.name}
                                                </h5>
                                                <Badge
                                                  variant="secondary"
                                                  className="px-2 py-1"
                                                >
                                                  Qty: {exhibit.quantity}
                                                </Badge>
                                              </div>

                                              <div className="space-y-2 text-sm">
                                                <p className="text-gray-700">
                                                  <span className="font-medium text-slate-700">
                                                    Description:
                                                  </span>
                                                  <span className="ml-1">
                                                    {exhibit.description}
                                                  </span>
                                                </p>
                                                <p className="text-gray-700">
                                                  <span className="font-medium text-slate-700">
                                                    Related to:
                                                  </span>
                                                  <span className="ml-1">
                                                    {exhibit.relatedPersonName}
                                                  </span>
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                  <span className="font-medium">
                                                    Registered:
                                                  </span>
                                                  <span className="ml-1">
                                                    {new Date(
                                                      exhibit.registeredDate
                                                    ).toLocaleDateString()}
                                                  </span>
                                                </p>
                                              </div>
                                            </div>

                                            <div className="flex gap-2 self-start">
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                className="hover:bg-blue-50"
                                              >
                                                <Edit className="h-4 w-4" />
                                              </Button>
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-red-600 hover:bg-red-50"
                                              >
                                                <Trash2 className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>

                    {/* Enhanced Save Button */}
                    <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t pt-4 mt-8">
                      <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-lg transition-all duration-200 px-8 py-3"
                        >
                          <Save className="h-5 w-5 mr-2" />
                          Save All Information
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          onClick={() => setIsDetailOpen(false)}
                          className="border-slate-300 hover:bg-slate-50 px-8 py-3"
                        >
                          <X className="h-5 w-5 mr-2" />
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Submission Success Modal */}
      {isSubmitModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
            onClick={() => setIsSubmitModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-white rounded-xl shadow-2xl w-full max-w-md pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6" />
                    <span className="text-xl font-semibold">
                      Case Submitted
                    </span>
                  </div>
                  <button
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Successfully Submitted!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your case has been submitted successfully and is now under
                    review.
                  </p>
                </div>

                {submittedCase && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">
                        Case Title:
                      </span>
                      <span className="ml-2 text-gray-900">
                        {submittedCase.title}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">
                        CR Number:
                      </span>
                      <span className="ml-2 text-gray-900">
                        {submittedCase.crNumber}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Status:</span>
                      <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                        Submitted
                      </Badge>
                    </div>
                  </div>
                )}

                <div className="flex justify-center pt-4">
                  <Button
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="bg-green-600 hover:bg-green-700 px-6"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
