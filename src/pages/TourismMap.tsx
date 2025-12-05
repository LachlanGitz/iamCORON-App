import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Phone, Star, Navigation, Coffee, Utensils, Bed, Mountain, Waves } from 'lucide-react';
import { Input } from '@/components/ui/input';

type PlaceCategory = 'hotel' | 'restaurant' | 'fastfood' | 'coffee' | 'spot' | 'resort';

interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  address: string;
  contact: string;
  rating: number;
  fee?: string; // Entrance fee for spots
  coordinates?: string; // Optional for precise mapping
  image?: string;
}

const PLACES: Place[] = [
  // Spots
  {
    id: '1',
    name: 'Kayangan Lake',
    category: 'spot',
    address: 'Coron Island',
    contact: 'Tourism Office: (048) 550-1234',
    rating: 4.9,
    fee: '₱300 / person',
    image: 'https://images.unsplash.com/photo-1595661668383-207d79b90875?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Twin Lagoon',
    category: 'spot',
    address: 'Coron Island',
    contact: 'Tourism Office: (048) 550-1234',
    rating: 4.8,
    fee: '₱200 / person',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Maquinit Hot Spring',
    category: 'spot',
    address: 'Sitio Maquinit, Brgy. Tagumpay',
    contact: '0917-123-4567',
    rating: 4.5,
    fee: '₱250 / person',
    image: 'https://images.unsplash.com/photo-1584445584488-7561845eb5c9?q=80&w=800&auto=format&fit=crop'
  },
  // Hotels
  {
    id: '4',
    name: 'The Funny Lion',
    category: 'hotel',
    address: 'Sitio Jolo, Poblacion 5',
    contact: '(02) 8550 9999',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'Two Seasons Coron Bayside',
    category: 'hotel',
    address: 'National Road, Brgy. Tagumpay',
    contact: '(02) 8403 6715',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop'
  },
  // Food
  {
    id: '6',
    name: "Sharky's Restobar",
    category: 'restaurant',
    address: 'Coron - Busuanga Rd',
    contact: '0917 500 1234',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '7',
    name: 'McDonalds Coron',
    category: 'fastfood',
    address: 'National Highway, Poblacion',
    contact: '(048) 716 1234',
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '8',
    name: 'Jollibee Coron',
    category: 'fastfood',
    address: 'Real Street',
    contact: '87000',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1615937651143-a58925c940c6?q=80&w=800&auto=format&fit=crop'
  },
  // Coffee
  {
    id: '9',
    name: 'Coffee Kong',
    category: 'coffee',
    address: 'Poblacion 1',
    contact: '0917 888 2222',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '10',
    name: 'Club Paradise Palawan',
    category: 'resort',
    address: 'Dimakya Island',
    contact: '(02) 7719 6971',
    rating: 4.7,
    fee: 'Check Rates',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop'
  }
];

const TourismMap = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filteredPlaces = PLACES.filter(place => {
    const matchesCategory = activeTab === "all" ? true : 
                            activeTab === "stay" ? (place.category === 'hotel' || place.category === 'resort') :
                            activeTab === "eat" ? (place.category === 'restaurant' || place.category === 'fastfood' || place.category === 'coffee') :
                            activeTab === "visit" ? (place.category === 'spot') : true;
    
    const matchesSearch = place.name.toLowerCase().includes(search.toLowerCase()) || 
                          place.address.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const openGoogleMaps = (name: string, address: string) => {
    const query = encodeURIComponent(`${name} ${address} Coron Palawan`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Tourism Map</h2>
        <p className="text-muted-foreground">Discover the best of Coron.</p>
      </div>

      <div className="sticky top-[4.5rem] z-30 bg-gray-50/95 backdrop-blur py-2 -mx-4 px-4 space-y-2">
        <Input 
          placeholder="Search places..." 
          className="bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="visit" className="flex gap-1 items-center"><Mountain className="h-3 w-3" /> Spots</TabsTrigger>
            <TabsTrigger value="stay" className="flex gap-1 items-center"><Bed className="h-3 w-3" /> Stay</TabsTrigger>
            <TabsTrigger value="eat" className="flex gap-1 items-center"><Utensils className="h-3 w-3" /> Eat & Drink</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4">
        {filteredPlaces.map((place) => (
          <Card key={place.id} className="overflow-hidden border-none shadow-md">
            <div className="relative h-48 w-full">
              <img 
                src={place.image} 
                alt={place.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-orange-500 shadow-sm">
                <Star className="h-3 w-3 fill-current" />
                {place.rating}
              </div>
              <Badge className="absolute top-2 left-2 capitalize shadow-sm" variant="secondary">
                {place.category}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg leading-tight">{place.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" /> {place.address}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm mt-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${place.contact}`} className="hover:text-primary hover:underline">{place.contact}</a>
                </div>
                {place.fee && (
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <Waves className="h-4 w-4" />
                    <span>Entrance: {place.fee}</span>
                  </div>
                )}
              </div>

              <Button 
                className="w-full mt-4 gap-2" 
                onClick={() => openGoogleMaps(place.name, place.address)}
              >
                <Navigation className="h-4 w-4" />
                Get Direction
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TourismMap;