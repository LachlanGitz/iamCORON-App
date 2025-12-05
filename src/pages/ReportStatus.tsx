import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle2, Clock, FileText, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Mock data for demonstration
const MOCK_TICKETS = {
  'CRN-2024-1234': {
    id: 'CRN-2024-1234',
    type: 'Incident: Uncollected Garbage',
    date: 'Oct 26, 2024',
    status: 'Resolved',
    steps: [
      { status: 'completed', title: 'Report Submitted', date: 'Oct 26, 10:30 AM', desc: 'Report received by system.' },
      { status: 'completed', title: 'Verified', date: 'Oct 26, 01:15 PM', desc: 'Verified by MENRO Officer.' },
      { status: 'completed', title: 'Action Taken', date: 'Oct 27, 09:00 AM', desc: 'Garbage truck dispatched to location.' },
      { status: 'completed', title: 'Case Closed', date: 'Oct 27, 11:30 AM', desc: 'Issue resolved.' },
    ]
  },
  'CRN-2024-5678': {
    id: 'CRN-2024-5678',
    type: 'Abuse: Overpricing Tricycle',
    date: 'Oct 28, 2024',
    status: 'In Progress',
    steps: [
      { status: 'completed', title: 'Report Submitted', date: 'Oct 28, 08:45 AM', desc: 'Report received securely.' },
      { status: 'completed', title: 'Under Review', date: 'Oct 28, 10:00 AM', desc: 'Assigned to Traffic Management Office.' },
      { status: 'current', title: 'Investigation', date: 'In Progress', desc: 'Summoning driver for explanation.' },
      { status: 'pending', title: 'Resolution', date: '-', desc: 'Final verdict and penalty.' },
    ]
  },
  'CRN-2024-9012': {
    id: 'CRN-2024-9012',
    type: 'Incident: Broken Streetlight',
    date: 'Oct 29, 2024',
    status: 'Received',
    steps: [
      { status: 'completed', title: 'Report Submitted', date: 'Oct 29, 06:20 PM', desc: 'Report received.' },
      { status: 'current', title: 'Queued', date: 'Waiting', desc: 'Waiting for Engineering Schedule.' },
      { status: 'pending', title: 'Repair', date: '-', desc: 'Technician dispatch.' },
      { status: 'pending', title: 'Verification', date: '-', desc: 'Confirmation of fix.' },
    ]
  }
};

const StatusTimeline = ({ steps }: { steps: any[] }) => {
  return (
    <div className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-8 my-6">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          {/* Dot */}
          <div className={cn(
            "absolute -left-[21px] top-1 h-4 w-4 rounded-full border-2 bg-background flex items-center justify-center",
            step.status === 'completed' ? "border-green-500 bg-green-500 text-white" :
            step.status === 'current' ? "border-primary bg-primary text-white animate-pulse" :
            "border-gray-300 bg-gray-100"
          )}>
            {step.status === 'completed' && <CheckCircle2 className="h-3 w-3" />}
            {step.status === 'current' && <Clock className="h-3 w-3" />}
          </div>
          
          <div className="flex flex-col">
            <h4 className={cn("text-sm font-bold", step.status === 'pending' ? "text-gray-400" : "text-gray-900 dark:text-gray-100")}>
              {step.title}
            </h4>
            <span className="text-xs text-muted-foreground font-mono mb-1">{step.date}</span>
            <p className="text-xs text-gray-500 dark:text-gray-400">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ReportStatus = () => {
  const [ticketId, setTicketId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    // Simulate search delay
    setTimeout(() => {
        // @ts-ignore
      const found = MOCK_TICKETS[ticketId as keyof typeof MOCK_TICKETS];
      if (found) {
        setResult(found);
        toast.success("Ticket Found");
      } else {
        setResult(null);
        toast.error("Ticket not found. Please check the number.");
      }
    }, 500);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-secondary">Track Report</h2>
        <p className="text-muted-foreground">Check the status of your submitted complaints.</p>
      </div>

      <Card className="glass-panel border-l-4 border-l-secondary">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Enter Ticket ID (e.g., CRN-2024-1234)" 
                className="pl-9" 
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Track</Button>
          </form>
          
          <div className="mt-4 text-xs text-muted-foreground bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg flex gap-2 items-start">
             <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
             <p>Try these sample IDs: <span className="font-mono font-bold select-all cursor-pointer hover:text-primary underline" onClick={() => setTicketId('CRN-2024-1234')}>CRN-2024-1234</span>, <span className="font-mono font-bold select-all cursor-pointer hover:text-primary underline" onClick={() => setTicketId('CRN-2024-5678')}>CRN-2024-5678</span></p>
          </div>
        </CardContent>
      </Card>

      {searched && !result && (
        <div className="text-center py-10 animate-in fade-in zoom-in-95">
           <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
           <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No Record Found</h3>
           <p className="text-sm text-gray-500">We couldn't find a report with that reference number.</p>
        </div>
      )}

      {result && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <Card className="overflow-hidden">
            <CardHeader className="bg-secondary/5 border-b border-secondary/10 pb-4">
               <div className="flex justify-between items-start">
                 <div>
                   <CardTitle className="font-mono text-xl tracking-tight text-secondary">{result.id}</CardTitle>
                   <CardDescription className="mt-1 font-medium text-gray-700 dark:text-gray-300">{result.type}</CardDescription>
                 </div>
                 <Badge variant={result.status === 'Resolved' ? 'default' : 'secondary'} className={result.status === 'Resolved' ? 'bg-green-600' : ''}>
                   {result.status}
                 </Badge>
               </div>
            </CardHeader>
            <CardContent className="pt-6">
               <StatusTimeline steps={result.steps} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ReportStatus;