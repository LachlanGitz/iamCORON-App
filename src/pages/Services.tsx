import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bus, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Services</h2>
        <p className="text-muted-foreground">Access municipal services and information.</p>
      </div>

      <div className="grid gap-4">
        <Link to="/services/pasundo">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-primary">
            <CardContent className="p-0">
              <div className="flex items-center p-4 gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Bus className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base">Emergency Pasundo</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Free ride for stranded students.
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/services/requirements">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-secondary">
            <CardContent className="p-0">
              <div className="flex items-center p-4 gap-4">
                <div className="bg-secondary/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base">Government Requirements</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Checklist for permits, IDs, and certificates.
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Services;