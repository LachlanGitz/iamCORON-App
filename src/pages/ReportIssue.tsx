import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { MapPin, Camera, Loader2 } from 'lucide-react';

const ReportIssue = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Report submitted successfully!", {
        description: "Reference Ticket: #CRN-2024-8823"
      });
      setStep(3); // Success state
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Report Received</h2>
        <p className="text-muted-foreground max-w-xs">
          Thank you for being a vigilant citizen. Your report has been forwarded to the relevant department.
        </p>
        <Button onClick={() => setStep(1)} className="mt-4">Submit Another Report</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Report an Incident</h2>
        <p className="text-muted-foreground">Help us keep Coron safe and functional.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Incident Type</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accident">Traffic Accident</SelectItem>
                  <SelectItem value="fire">Fire Hazard</SelectItem>
                  <SelectItem value="medical">Medical Emergency</SelectItem>
                  <SelectItem value="electricity">No Electricity / Broken Post</SelectItem>
                  <SelectItem value="water">Water Leak / No Supply</SelectItem>
                  <SelectItem value="garbage">Uncollected Garbage</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
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
                placeholder="Please describe the incident or issue in detail..." 
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
                "Submit Report"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportIssue;