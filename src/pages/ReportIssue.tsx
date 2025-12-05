import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { MapPin, Camera, Loader2, AlertTriangle, UserX, FileSearch, LogIn, UserPlus, CalendarDays, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/SessionContextProvider';
import { supabase } from '@/integrations/supabase/client';
import { uploadFile } from '@/lib/supabaseStorage';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ReportIssue = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportType, setReportType] = useState("incident");

  // Form states for Incident
  const [incidentType, setIncidentType] = useState('');
  const [incidentLocation, setIncidentLocation] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [incidentPhoto, setIncidentPhoto] = useState<File | null>(null);

  // Form states for Abuse
  const [abuseTargetType, setAbuseTargetType] = useState('');
  const [abuseIdentifier, setAbuseIdentifier] = useState('');
  const [abuseDetails, setAbuseDetails] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [abuseEvidence, setAbuseEvidence] = useState<File | null>(null);

  // Form states for Missing Person
  const [missingName, setMissingName] = useState('');
  const [lastSeenLocation, setLastSeenLocation] = useState('');
  const [lastSeenDatetime, setLastSeenDatetime] = useState('');
  const [missingDescription, setMissingDescription] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [missingPhoto, setMissingPhoto] = useState<File | null>(null);

  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const [duplicateReports, setDuplicateReports] = useState<any[]>([]);

  const navigate = useNavigate();
  const { user } = useAuth();

  const resetForm = () => {
    setIncidentType('');
    setIncidentLocation('');
    setIncidentDescription('');
    setIncidentPhoto(null);
    setAbuseTargetType('');
    setAbuseIdentifier('');
    setAbuseDetails('');
    setIsAnonymous(false);
    setAbuseEvidence(null);
    setMissingName('');
    setLastSeenLocation('');
    setLastSeenDatetime('');
    setMissingDescription('');
    setReporterContact('');
    setMissingPhoto(null);
    setSubmitted(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    } else {
      setter(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent, forceSubmit: boolean = false) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to submit a report.");
      navigate('/login');
      return;
    }

    setLoading(true);
    let photoUrl: string | null = null;
    let photoUrls: string[] = [];

    try {
      // Handle photo upload first if a file is selected
      if (reportType === 'incident' && incidentPhoto) {
        photoUrl = await uploadFile(incidentPhoto, user.id, 'reports');
        photoUrls.push(photoUrl);
      } else if (reportType === 'abuse' && abuseEvidence) {
        photoUrl = await uploadFile(abuseEvidence, user.id, 'reports');
        photoUrls.push(photoUrl);
      } else if (reportType === 'missing-person' && missingPhoto) {
        photoUrl = await uploadFile(missingPhoto, user.id, 'reports');
        photoUrls.push(photoUrl);
      }

      let reportData: any = {
        user_id: user.id,
        report_type: reportType,
        location: '',
        description: '',
        photo_urls: photoUrls,
        details: {},
      };

      if (reportType === 'incident') {
        reportData.location = incidentLocation;
        reportData.description = incidentDescription;
        reportData.details = { incident_type: incidentType };
      } else if (reportType === 'abuse') {
        reportData.location = 'N/A'; // Abuse might not have a specific location
        reportData.description = abuseDetails;
        reportData.details = {
          abuse_target_type: abuseTargetType,
          abuse_identifier: abuseIdentifier,
          is_anonymous: isAnonymous,
        };
      } else if (reportType === 'missing-person') {
        reportData.location = lastSeenLocation;
        reportData.description = missingDescription;
        reportData.details = {
          missing_person_name: missingName,
          last_seen_location: lastSeenLocation,
          last_seen_datetime: lastSeenDatetime,
          reporter_contact: reporterContact,
        };

        // Duplicate check for missing persons
        if (!forceSubmit) {
          const { data: existingReports, error: fetchError } = await supabase
            .from('reports')
            .select('*')
            .eq('report_type', 'missing-person')
            .ilike('details->>missing_person_name', `%${missingName}%`);

          if (fetchError) throw fetchError;

          if (existingReports && existingReports.length > 0) {
            setDuplicateReports(existingReports);
            setShowDuplicateDialog(true);
            setLoading(false);
            return; // Stop submission, wait for user decision
          }
        }
      }

      const { error } = await supabase.from('reports').insert([reportData]);

      if (error) {
        throw error;
      }

      toast.success("Report submitted successfully!", {
        description: `Reference Ticket: #CRN-2024-${Math.floor(Math.random() * 9000 + 1000)}`
      });
      setSubmitted(true);
      resetForm();
    } catch (error: any) {
      console.error("Report submission error:", error.message);
      toast.error("Report submission failed", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 animate-in zoom-in-50 duration-500">
        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Report Received</h2>
        <p className="text-muted-foreground max-w-xs">
          Thank you. Your report has been securely transmitted to the proper authorities for action.
        </p>
        <div className="flex flex-col gap-2 w-full max-w-xs mt-4">
            <Button onClick={() => navigate('/report/status')} variant="outline" className="w-full">Track Status</Button>
            <Button onClick={() => resetForm()} className="w-full">Submit Another Report</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Submit a Report</h2>
            <p className="text-muted-foreground">Choose the type of report you wish to file.</p>
        </div>
        <Button size="icon" variant="outline" onClick={() => navigate('/report/status')} title="Track Report Status">
            <FileSearch className="h-5 w-5" />
        </Button>
      </div>

      <Tabs defaultValue="incident" className="w-full" onValueChange={setReportType}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="incident" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Incident
          </TabsTrigger>
          <TabsTrigger value="abuse" className="flex items-center gap-2">
            <UserX className="h-4 w-4" />
            Abuse
          </TabsTrigger>
          <TabsTrigger value="missing-person" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Missing
          </TabsTrigger>
        </TabsList>

        {/* General Incident Form */}
        <TabsContent value="incident">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="incident-type">Incident Type</Label>
                  <Select required disabled={!user} value={incidentType} onValueChange={setIncidentType}>
                    <SelectTrigger id="incident-type">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accident">Traffic Accident</SelectItem>
                      <SelectItem value="fire">Fire Hazard</SelectItem>
                      <SelectItem value="medical">Medical Emergency</SelectItem>
                      <SelectItem value="electricity">No Electricity / Broken Post</SelectItem>
                      <SelectItem value="water">Water Leak / No Supply</SelectItem>
                      <SelectItem value="garbage">Uncollected Garbage</SelectItem>
                      <SelectItem value="other">Other Infrastructure Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="location" placeholder="Nearest Landmark / Street" className="pl-9" required disabled={!user} value={incidentLocation} onChange={(e) => setIncidentLocation(e.target.value)} />
                  </div>
                  <Button type="button" variant="outline" size="sm" className="w-full text-xs" onClick={() => toast.info("Getting GPS location...")} disabled={!user}>
                    <MapPin className="mr-2 h-3 w-3" />
                    Use Current GPS Location
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the incident details..."
                    className="min-h-[100px]"
                    required
                    disabled={!user}
                    value={incidentDescription}
                    onChange={(e) => setIncidentDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Photo Evidence (Optional)</Label>
                  <Input
                    id="incident-photo"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                    disabled={!user}
                    onChange={(e) => handleFileChange(e, setIncidentPhoto)}
                  />
                  {incidentPhoto && <p className="text-xs text-muted-foreground">Selected: {incidentPhoto.name}</p>}
                </div>

                {!user && (
                  <div className="text-center text-sm text-red-500 flex items-center justify-center gap-2 mb-4">
                    <LogIn className="h-4 w-4" /> Please log in to submit a report.
                  </div>
                )}
                <Button type="submit" className="w-full" size="lg" disabled={loading || !user}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Incident Report"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Abuse Report Form */}
        <TabsContent value="abuse">
          <Card className="border-red-100 dark:border-red-900/20">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-md text-xs text-red-600 dark:text-red-400 mb-4 flex gap-2">
                  <UserX className="h-4 w-4 flex-shrink-0" />
                  <p>Abuse reports are taken seriously. False reporting may lead to account suspension.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="abuse-type">Report Against</Label>
                  <Select required disabled={!user} value={abuseTargetType} onValueChange={setAbuseTargetType}>
                    <SelectTrigger id="abuse-type">
                      <SelectValue placeholder="Select offender type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tricycle">Tricycle Driver</SelectItem>
                      <SelectItem value="official">Government Official</SelectItem>
                      <SelectItem value="private">Private Person</SelectItem>
                      <SelectItem value="employer">Employer / Business Owner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="identity">Name / Body Number / Identifier</Label>
                  <Input
                    id="identity"
                    placeholder="e.g., Body #1234 or Name of Person"
                    required
                    disabled={!user}
                    value={abuseIdentifier}
                    onChange={(e) => setAbuseIdentifier(e.target.value)}
                  />
                  <p className="text-[10px] text-muted-foreground">For tricycles, please include Body Number or Plate Number.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="abuse-details">Details of Abuse</Label>
                  <Textarea
                    id="abuse-details"
                    placeholder="Please describe what happened, when, and where..."
                    className="min-h-[100px]"
                    required
                    disabled={!user}
                    value={abuseDetails}
                    onChange={(e) => setAbuseDetails(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id="anonymous" disabled={!user} checked={isAnonymous} onCheckedChange={(checked) => setIsAnonymous(checked as boolean)} />
                  <Label htmlFor="anonymous" className="text-sm font-normal cursor-pointer">
                    Submit anonymously
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label>Evidence (Photo/Video/Audio)</Label>
                  <Input
                    id="abuse-evidence"
                    type="file"
                    accept="image/*,video/*,audio/*"
                    className="cursor-pointer"
                    disabled={!user}
                    onChange={(e) => handleFileChange(e, setAbuseEvidence)}
                  />
                  {abuseEvidence && <p className="text-xs text-muted-foreground">Selected: {abuseEvidence.name}</p>}
                </div>

                {!user && (
                  <div className="text-center text-sm text-red-500 flex items-center justify-center gap-2 mb-4">
                    <LogIn className="h-4 w-4" /> Please log in to submit a report.
                  </div>
                )}
                <Button type="submit" variant="destructive" className="w-full" size="lg" disabled={loading || !user}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Abuse Report"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Missing Person Report Form */}
        <TabsContent value="missing-person">
          <Card className="border-blue-100 dark:border-blue-900/20">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-md text-xs text-blue-600 dark:text-blue-400 mb-4 flex gap-2">
                  <UserPlus className="h-4 w-4 flex-shrink-0" />
                  <p>Provide as much detail as possible to assist in the search.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="missing-name">Full Name of Missing Person</Label>
                  <Input id="missing-name" placeholder="First Name, Last Name" required disabled={!user} value={missingName} onChange={(e) => setMissingName(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-seen-location">Last Known Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="last-seen-location" placeholder="e.g., Coron Public Market" className="pl-9" required disabled={!user} value={lastSeenLocation} onChange={(e) => setLastSeenLocation(e.target.value)} />
                  </div>
                  <Button type="button" variant="outline" size="sm" className="w-full text-xs" onClick={() => toast.info("Getting GPS location...")} disabled={!user}>
                    <MapPin className="mr-2 h-3 w-3" />
                    Use Current GPS Location
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-seen-datetime">Last Seen Date & Time</Label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="last-seen-datetime" type="datetime-local" className="pl-9" required disabled={!user} value={lastSeenDatetime} onChange={(e) => setLastSeenDatetime(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description-missing">Description (Appearance, Clothing, etc.)</Label>
                  <Textarea
                    id="description-missing"
                    placeholder="Height, build, hair color, last worn clothes, distinguishing marks..."
                    className="min-h-[100px]"
                    required
                    disabled={!user}
                    value={missingDescription}
                    onChange={(e) => setMissingDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reporter-contact">Your Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="reporter-contact" type="tel" placeholder="09XX XXX XXXX" className="pl-9" required disabled={!user} value={reporterContact} onChange={(e) => setReporterContact(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Photo of Missing Person (Optional but Recommended)</Label>
                  <Input
                    id="missing-photo"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                    disabled={!user}
                    onChange={(e) => handleFileChange(e, setMissingPhoto)}
                  />
                  {missingPhoto && <p className="text-xs text-muted-foreground">Selected: {missingPhoto.name}</p>}
                </div>

                {!user && (
                  <div className="text-center text-sm text-red-500 flex items-center justify-center gap-2 mb-4">
                    <LogIn className="h-4 w-4" /> Please log in to submit a report.
                  </div>
                )}
                <Button type="submit" className="w-full" size="lg" disabled={loading || !user}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Missing Person Report"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Duplicate Report Confirmation Dialog */}
      <AlertDialog open={showDuplicateDialog} onOpenChange={setShowDuplicateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Potential Duplicate Report</AlertDialogTitle>
            <AlertDialogDescription>
              A report for "{missingName}" might already exist.
              <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                {duplicateReports.map((report) => (
                  <Card key={report.id} className="p-3 text-xs">
                    <p className="font-semibold">{report.details?.missing_person_name}</p>
                    <p className="text-muted-foreground">Last seen: {report.location} on {new Date(report.details?.last_seen_datetime).toLocaleDateString()}</p>
                    <p className="text-muted-foreground">Status: {report.status}</p>
                    <Button variant="link" size="sm" className="h-auto px-0 text-xs" onClick={() => navigate(`/report/status?ticketId=${report.id}`)}>View Existing Report</Button>
                  </Card>
                ))}
              </div>
              <p className="mt-4">Do you still want to submit this as a new report?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setLoading(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => handleSubmit(e as any, true)}>Submit as New</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReportIssue;