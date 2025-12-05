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
import { useAuth } from '@/components/auth/SessionContextProvider'; // Import useAuth

const ReportIssue = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportType, setReportType] = useState("incident"); // incident, abuse, or missing-person
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from auth context

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to submit a report.");
      navigate('/login');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Report submitted successfully!", {
        description: `Reference Ticket: #CRN-2024-${Math.floor(Math.random() * 9000 + 1000)}`
      });
      setSubmitted(true);
    }, 2000);
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
            <Button onClick={() => setSubmitted(false)} className="w-full">Submit Another Report</Button>
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
                  <Select required disabled={!user}>
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
                    <Input id="location" placeholder="Nearest Landmark / Street" className="pl-9" required disabled={!user} />
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
                  />
                </div>

                <div className="space-y-2">
                  <Label>Photo Evidence (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => !user && toast.error("Please log in to upload photos.")}>
                    <Camera className="h-8 w-8 mb-2" />
                    <span className="text-xs">Tap to take a photo or upload</span>
                  </div>
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
                  <Select required disabled={!user}>
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
                  />
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id="anonymous" disabled={!user} />
                  <Label htmlFor="anonymous" className="text-sm font-normal cursor-pointer">
                    Submit anonymously
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label>Evidence (Photo/Video/Audio)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => !user && toast.error("Please log in to upload evidence.")}>
                    <Camera className="h-8 w-8 mb-2" />
                    <span className="text-xs">Tap to upload evidence</span>
                  </div>
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
                  <Input id="missing-name" placeholder="First Name, Last Name" required disabled={!user} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-seen-location">Last Known Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="last-seen-location" placeholder="e.g., Coron Public Market" className="pl-9" required disabled={!user} />
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
                    <Input id="last-seen-datetime" type="datetime-local" className="pl-9" required disabled={!user} />
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reporter-contact">Your Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="reporter-contact" type="tel" placeholder="09XX XXX XXXX" className="pl-9" required disabled={!user} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Photo of Missing Person (Optional but Recommended)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => !user && toast.error("Please log in to upload photos.")}>
                    <Camera className="h-8 w-8 mb-2" />
                    <span className="text-xs">Tap to upload photo</span>
                  </div>
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
    </div>
  );
};

export default ReportIssue;