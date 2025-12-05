import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Stethoscope, Scale, Phone, MapPin, Search, Clock, Syringe, Gavel } from 'lucide-react';

type ServiceCategory = 'medical' | 'dental' | 'legal';

interface ServiceProvider {
  id: string;
  category: ServiceCategory;
  name: string;
  type: string;
  address: string;
  contact: string;
  hours: string;
  status: 'Open' | 'Closed' | 'By Appointment';
}

const PROVIDERS: ServiceProvider[] = [
  // Medical
  {
    id: '1',
    category: 'medical',
    name: 'Coron Medical Clinic',
    type: 'General Medicine & Pedia',
    address: 'National Highway, Brgy. Poblacion 1',
    contact: '0917-111-2222',
    hours: '8:00 AM - 5:00 PM',
    status: 'Open'
  },
  {
    id: '2',
    category: 'medical',
    name: 'St. Raphael Diagnostic Center',
    type: 'Laboratory & X-Ray',
    address: 'Real Street, Brgy. Poblacion 3',
    contact: '0918-333-4444',
    hours: '7:00 AM - 4:00 PM',
    status: 'Open'
  },
  {
    id: '3',
    category: 'medical',
    name: 'Skin Care & Wellness',
    type: 'Dermatology',
    address: 'Don Pedro St., Brgy. Poblacion 2',
    contact: '0919-555-6666',
    hours: '10:00 AM - 6:00 PM',
    status: 'By Appointment'
  },
  // Dental
  {
    id: '4',
    category: 'dental',
    name: 'Coron Dental Care',
    type: 'General Dentistry',
    address: 'Market Road, Brgy. Poblacion 5',
    contact: '0920-777-8888',
    hours: '9:00 AM - 5:00 PM',
    status: 'Open'
  },
  {
    id: '5',
    category: 'dental',
    name: 'Bright Smile Clinic',
    type: 'Orthodontics',
    address: 'San Agustin St., Brgy. Poblacion 4',
    contact: '0921-999-0000',
    hours: '9:00 AM - 4:00 PM',
    status: 'By Appointment'
  },
  // Legal
  {
    id: '6',
    category: 'legal',
    name: 'Atty. Cruz Law Office',
    type: 'Notary Public & Litigation',
    address: '2nd Floor, ABC Bldg., National Highway',
    contact: '0922-123-4567',
    hours: '8:00 AM - 5:00 PM',
    status: 'Open'
  },
  {
    id: '7',
    category: 'legal',
    name: 'Calamian Legal Aid',
    type: 'Legal Consultancy',
    address: 'Brgy. Tagumpay',
    contact: '0923-234-5678',
    hours: '1:00 PM - 5:00 PM',
    status: 'Closed'
  }
];

const PrivateServices = () => {
  const [activeTab, setActiveTab] = useState("medical");
  const [search, setSearch] = useState("");

  const filteredProviders = PROVIDERS.filter(provider => {
    const matchesCategory = provider.category === activeTab;
    const matchesSearch = provider.name.toLowerCase().includes(search.toLowerCase()) || 
                          provider.type.toLowerCase().includes(search.toLowerCase()) ||
                          provider.address.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-secondary">Private Services</h2>
        <p className="text-muted-foreground">Directory of clinics, dentists, and legal offices.</p>
      </div>

      <div className="sticky top-[4.5rem] z-30 bg-background/95 backdrop-blur py-2 -mx-4 px-4 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search service..." 
            className="pl-9 bg-card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Tabs defaultValue="medical" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="medical" className="flex gap-1 items-center justify-center">
              <Stethoscope className="h-4 w-4 hidden sm:block" /> Medical
            </TabsTrigger>
            <TabsTrigger value="dental" className="flex gap-1 items-center justify-center">
              <Syringe className="h-4 w-4 hidden sm:block" /> Dental
            </TabsTrigger>
            <TabsTrigger value="legal" className="flex gap-1 items-center justify-center">
              <Gavel className="h-4 w-4 hidden sm:block" /> Legal
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4">
        {filteredProviders.map((provider) => (
          <Card key={provider.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-primary">{provider.name}</h3>
                  <Badge variant="outline" className="mt-1 font-normal text-muted-foreground">
                    {provider.type}
                  </Badge>
                </div>
                <Badge variant={provider.status === 'Open' ? 'default' : 'secondary'} className={provider.status === 'Open' ? 'bg-green-600 hover:bg-green-700' : ''}>
                  {provider.status}
                </Badge>
              </div>

              <div className="space-y-2 text-sm mt-4 text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{provider.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>{provider.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <a href={`tel:${provider.contact}`} className="text-blue-600 hover:underline font-medium">
                    {provider.contact}
                  </a>
                </div>
              </div>

              <Button variant="secondary" className="w-full mt-4 h-8 text-xs" onClick={() => window.open(`tel:${provider.contact}`)}>
                Call Now
              </Button>
            </CardContent>
          </Card>
        ))}
        
        {filteredProviders.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <p>No results found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateServices;