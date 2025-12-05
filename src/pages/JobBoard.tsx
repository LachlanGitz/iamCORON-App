import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Clock, Building2 } from 'lucide-react';

const JOBS = [
  {
    id: 1,
    title: "Front Desk Officer",
    company: "The Funny Lion",
    location: "Sitio Jolo",
    type: "Full-time",
    salary: "₱18k - ₱22k",
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "Tour Guide (Licensed)",
    company: "Calamian Tours",
    location: "Poblacion",
    type: "Contract",
    salary: "Commission Based",
    posted: "3 days ago"
  },
  {
    id: 3,
    title: "Kitchen Staff",
    company: "McDonalds Coron",
    location: "National Highway",
    type: "Part-time",
    salary: "Minimum Wage",
    posted: "1 week ago"
  },
  {
    id: 4,
    title: "Housekeeping Supervisor",
    company: "Two Seasons Resort",
    location: "Coron Town",
    type: "Full-time",
    salary: "Negotiable",
    posted: "1 week ago"
  }
];

const JobBoard = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-secondary">Trabaho Center</h2>
        <p className="text-muted-foreground">Find local opportunities in Coron.</p>
      </div>

      <div className="grid gap-4">
        {JOBS.map((job) => (
          <div key={job.id} className="glass-panel p-5 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg group">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors">{job.title}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 font-medium">
                  <Building2 className="h-3 w-3" />
                  {job.company}
                </div>
              </div>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                {job.type}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 my-3">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {job.posted}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <span className="font-semibold text-sm text-gray-700">{job.salary}</span>
              <Button size="sm" className="rounded-full px-6">Apply Now</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;