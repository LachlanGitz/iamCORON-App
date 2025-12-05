import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Bike, Coins, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const ZONES = [
  { id: '1', name: 'Zone 1: Poblacion (Town Proper)' },
  { id: '2', name: 'Zone 2: Reclamation / Tagumpay' },
  { id: '3', name: 'Zone 3: Hospital / Foothills' },
  { id: '4', name: 'Zone 4: Airport (Special)' },
];

const FARE_MATRIX: Record<string, number> = {
  '1-1': 15, '1-2': 20, '1-3': 25, '1-4': 150,
  '2-1': 20, '2-2': 15, '2-3': 30, '2-4': 160,
  '3-1': 25, '3-2': 30, '3-3': 15, '3-4': 170,
  '4-1': 150, '4-2': 160, '4-3': 170, '4-4': 0,
};

const FareGuide = () => {
  const [origin, setOrigin] = useState<string>('');
  const [dest, setDest] = useState<string>('');
  const [fare, setFare] = useState<number | null>(null);

  const calculateFare = () => {
    if (origin && dest) {
      const key = `${origin}-${dest}`;
      const reverseKey = `${dest}-${origin}`;
      setFare(FARE_MATRIX[key] || FARE_MATRIX[reverseKey] || 0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-secondary">Tricycle Fare Guide</h2>
        <p className="text-muted-foreground">Check the official municipal rates.</p>
      </div>

      <div className="glass-panel rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-center p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4">
          <Bike className="h-8 w-8 text-primary" />
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Origin</Label>
            <Select onValueChange={setOrigin}>
              <SelectTrigger className="bg-white/50 border-white/40">
                <SelectValue placeholder="Select pick-up point" />
              </SelectTrigger>
              <SelectContent>
                {ZONES.map((z) => <SelectItem key={z.id} value={z.id}>{z.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Destination</Label>
            <Select onValueChange={setDest}>
              <SelectTrigger className="bg-white/50 border-white/40">
                <SelectValue placeholder="Select drop-off point" />
              </SelectTrigger>
              <SelectContent>
                {ZONES.map((z) => <SelectItem key={z.id} value={z.id}>{z.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full mt-2 gold-gradient text-white font-bold shadow-md hover:shadow-lg transition-all" 
            size="lg"
            onClick={calculateFare}
            disabled={!origin || !dest}
          >
            Calculate Fare
          </Button>
        </div>

        {fare !== null && (
          <div className="mt-6 p-4 bg-green-50/80 rounded-xl border border-green-100 text-center animate-in zoom-in-90 duration-300">
            <p className="text-sm text-green-600 font-medium mb-1">Regular Fare per Person</p>
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Coins className="h-6 w-6" />
              <span className="text-4xl font-black">₱{fare}</span>
            </div>
            <p className="text-xs text-green-600/70 mt-2">
              * Rates may vary for special trips or night differential (10 PM - 5 AM).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FareGuide;