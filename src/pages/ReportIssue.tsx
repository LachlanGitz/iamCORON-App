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
import { MapPin, Camera, Loader2, AlertTriangle, UserX, FileSearch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReportIssue = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportType, setReportType] = useState("incident"); // incident or abuse
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Report submitted successfully!", {
        description: "Reference Ticket: #CRN-2024-" + Math.floor(Math.random() * 9000 + 1000)
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
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="incident" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Incident
          </TabsTrigger>
          <TabsTrigger value="abuse" className="flex items-center gap-2">
            <UserX className="h-4 w-4" />
            Abuse
          </TabsTrigger>
        </TabsList>

        {/* General Incident Form */}
        <TabsContent value="incident">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="incident-type">Incident Type</Label>
                  <Select required>
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
                    <Input id="location" placeholder="Nearest Landmark / Street" className="pl-9" required />
                  </div>
                  <Button type="button" variant="outline" size="sm" className="w-full text-xs" onClick={() => toast.info("Getting GPS location...")}>
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
                  />
                </div>

                <div className="space-y-2">
                  <Label>Photo Evidence (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                    <Camera className="h-8 w-8 mb-2" />
                    <span className="text-xs">Tap to take a photo or upload</span>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
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
                  <Select required>
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
                  />
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id="anonymous" />
                  <Label htmlFor="anonymous" className="text-sm font-normal cursor-pointer">
                    Submit anonymously
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label>Evidence (Photo/Video/Audio)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                    <Camera className="h-8 w-8 mb-2" />
                    <span className="text-xs">Tap to upload evidence</span>
                  </div>
                </div>

                <Button type="submit" variant="destructive" className="w-full" size="lg" disabled={loading}>
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
      </Tabs>
    </div>
  );
};

export default ReportIssue;