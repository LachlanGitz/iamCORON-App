import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Shield, Flame, HeartPulse, Zap, Droplets } from 'lucide-react';

const ContactItem = ({ icon: Icon, title, number, color }: any) => (
  <div className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-full ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground">{number}</p>
      </div>
    </div>
    <Button size="icon" variant="ghost" className="h-8 w-8 text-primary" onClick={() => window.open(`tel:${number}`)}>
      <Phone className="h-4 w-4" />
    </Button>
  </div>
);

const EmergencyContacts = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Emergency Hotlines</h2>
        <p className="text-muted-foreground">Tap the phone icon to call immediately.</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Safety & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <ContactItem icon={Shield} title="Coron Municipal Police" number="0998-598-5846" color="bg-blue-600" />
            <ContactItem icon={Shield} title="Tourist Police Assistance" number="0912-345-6789" color="bg-blue-500" />
            <ContactItem icon={Flame} title="Bureau of Fire Protection" number="(048) 550-9281" color="bg-red-600" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-rose-600" />
              Medical
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <ContactItem icon={HeartPulse} title="Coron District Hospital" number="0917-123-4567" color="bg-rose-600" />
            <ContactItem icon={HeartPulse} title="Rural Health Unit" number="0918-987-6543" color="bg-rose-500" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Utilities
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <ContactItem icon={Zap} title="BISELCO (Electricity)" number="0919-123-4567" color="bg-yellow-600" />
            <ContactItem icon={Droplets} title="Coron Water District" number="(048) 550-1234" color="bg-cyan-600" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyContacts;