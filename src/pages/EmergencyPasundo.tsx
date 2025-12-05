import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Bus, MapPin, Users, Loader2, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmergencyPasundo = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      toast.success("Pasundo Request Sent!", {
        description: "Please stay in a safe, well-lit area. A municipal vehicle is being dispatched.",
        duration: 5000,
      });
      navigate('/services');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Bus className="h-6 w-6 text-primary" />
          Emergency Pasundo
        </h2>
        <p className="text-muted-foreground">
          Free transport service for students stranded due to lack of public utility vehicles.
        </p>
      </div>

      <Card className="border-primary/20 shadow-md">
        <CardHeader className="bg-primary/5 pb-4">
          <CardTitle className="text-lg">Request Pickup</CardTitle>
          <CardDescription>Operating Hours: 6:00 PM - 10:00 PM</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Current Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="location" placeholder="e.g., Near Public Market Entrance" className="pl-9" required />
              </div>
              <Button type="button" variant="outline" size="sm" className="w-full text-xs" onClick={() => toast.info("Getting GPS location...")}>
                <MapPin className="mr-2 h-3 w-3" />
                Use Current GPS Location
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="students">No. of Students</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="students" type="number" min="1" max="10" placeholder="1" className="pl-9" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="school">School</Label>
                <Select required>
                  <SelectTrigger id="school">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csu">CSU</SelectItem>
                    <SelectItem value="sti">STI</SelectItem>
                    <SelectItem value="nhs">Coron NHS</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="contact" type="tel" placeholder="09XX XXX XXXX" className="pl-9" required />
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md text-xs text-yellow-800 flex gap-2">
              <span className="font-bold">Note:</span>
              Please present your School ID to the driver upon pickup.
            </div>

            <Button type="submit" className="w-full font-bold" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Requesting Vehicle...
                </>
              ) : (
                "Request Pasundo Now"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyPasundo;