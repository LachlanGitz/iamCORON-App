import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Building, Banknote, HeartHandshake } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const RequirementItem = ({ icon: Icon, title, items }: { icon: any, title: string, items: string[] }) => (
  <AccordionItem value={title} className="border-b-0 mb-4 bg-card border rounded-lg overflow-hidden shadow-sm">
    <AccordionTrigger className="px-4 py-3 hover:no-underline bg-background hover:bg-accent">
      <div className="flex items-center gap-3 text-left">
        <div className="p-2 bg-primary/10 rounded-full text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-semibold text-sm md:text-base text-foreground">{title}</span>
      </div>
    </AccordionTrigger>
    <AccordionContent className="px-4 pb-4 pt-2 bg-card">
      <ul className="list-disc pl-9 space-y-1 text-sm text-muted-foreground mt-2">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </AccordionContent>
  </AccordionItem>
);

const GovernmentRequirements = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Government Requirements</h2>
        <p className="text-muted-foreground">Checklist for transactions at the Municipal Hall.</p>
      </div>

      <ScrollArea className="h-full">
        <Accordion type="single" collapsible className="w-full">
          <RequirementItem 
            icon={FileText} 
            title="Civil Registry Documents" 
            items={[
              "PSA Birth Certificate / Marriage Contract / Death Certificate Request Form",
              "Valid ID of the requester",
              "Authorization Letter (if not the owner)",
              "Fee: ₱150.00 per copy (Local Civil Registry)"
            ]} 
          />
          
          <RequirementItem 
            icon={Building} 
            title="Community Tax Certificate (Cedula)" 
            items={[
              "Accomplished Information Sheet",
              "Valid ID (Voter's ID, Driver's License, etc.)",
              "Proof of Income (Payslip / ITR) for employed",
              "Payment based on income declaration"
            ]} 
          />

          <RequirementItem 
            icon={Banknote} 
            title="Business Permit & Licensing" 
            items={[
              "Barangay Business Clearance",
              "DTI / SEC Registration",
              "Contract of Lease (if renting) or Land Title",
              "Community Tax Certificate (Cedula)",
              "Occupancy Permit",
              "Fire Safety Inspection Certificate",
              "Sanitary Permit"
            ]} 
          />

          <RequirementItem 
            icon={Banknote} 
            title="Real Property Tax Payment" 
            items={[
              "Previous Year's Official Receipt (OR)",
              "Tax Declaration Number",
              "Land Title (Copy)",
              "Assessment Notice (if available)"
            ]} 
          />

          <RequirementItem 
            icon={HeartHandshake} 
            title="Social Welfare Benefits (AICS)" 
            items={[
              "Certificate of Indigency from Barangay",
              "Valid ID of Claimant",
              "Medical Abstract / Prescription (for Medical Assistance)",
              "Funeral Contract / Death Certificate (for Burial Assistance)",
              "Social Case Study Report (from MSWDO)"
            ]} 
          />

          <RequirementItem 
            icon={FileText} 
            title="Police Clearance" 
            items={[
              "Barangay Clearance for Police Clearance Purpose",
              "Community Tax Certificate (Cedula)",
              "Official Receipt of Payment (Municipal Treasurer)",
              "2x2 ID Picture"
            ]} 
          />
        </Accordion>
      </ScrollArea>
    </div>
  );
};

export default GovernmentRequirements;