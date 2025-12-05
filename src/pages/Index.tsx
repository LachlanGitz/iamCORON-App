import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone, FileText, CloudSun, Map, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Hero / Weather Widget */}
      <Card className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground border-none overflow-hidden relative">
        <div className="absolute right-0 top-0 p-8 opacity-10">
          <CloudSun className="h-32 w-32" />
        </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-primary-foreground/80 text-sm font-medium">Monday, Oct 24</p>
              <h1 className="text-3xl font-bold mt-1">Good Morning!</h1>
              <p className="mt-2 text-sm opacity-90">Coron, Palawan</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-bold">29°C</span>
              <p className="text-xs mt-1">Partly Cloudy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/report">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-red-500 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2 h-full">
              <div className="p-3 bg-red-100 rounded-full text-red-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <span className="font-semibold text-sm">Report Incident</span>
            </CardContent>
          </Card>
        </Link>
        <Link to="/emergency">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-blue-500 h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2 h-full">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <Phone className="h-6 w-6" />
              </div>
              <span className="font-semibold text-sm">Emergency</span>
            </CardContent>
          </Card>
        </Link>
        <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2 h-full">
            <div className="p-3 bg-green-100 rounded-full text-green-600">
              <Map className="h-6 w-6" />
            </div>
            <span className="font-semibold text-sm">Tourism Map</span>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2 h-full">
            <div className="p-3 bg-orange-100 rounded-full text-orange-600">
              <Info className="h-6 w-6" />
            </div>
            <span className="font-semibold text-sm">Guide</span>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Announcements</h3>
          <Button variant="link" className="text-xs h-auto p-0">View all</Button>
        </div>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Scheduled Power Interruption</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  BISELCO Advisory: There will be a scheduled power interruption on Brgy. Poblacion 1 this coming Saturday from 8:00 AM to 5:00 PM for line maintenance.
                </p>
                <p className="text-[10px] text-muted-foreground mt-2">Posted 2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Medical Mission</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  Free medical check-up and dental services will be held at the Municipal Plaza on Oct 30.
                </p>
                <p className="text-[10px] text-muted-foreground mt-2">Posted 1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;