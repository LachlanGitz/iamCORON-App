import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Droplets, AlertCircle, CalendarClock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const AlertItem = ({ type, title, area, time, status }: any) => (
  <div className="glass-panel p-4 rounded-xl border-l-4 border-l-orange-500 mb-4">
    <div className="flex justify-between items-start">
      <div className="flex gap-3">
        <div className={cn("p-2 rounded-full h-fit", type === 'power' ? "bg-yellow-100 text-yellow-600" : "bg-blue-100 text-blue-600")}>
          {type === 'power' ? <Zap className="h-5 w-5" /> : <Droplets className="h-5 w-5" />}
        </div>
        <div>
          <h4 className="font-bold text-sm text-gray-800">{title}</h4>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Affected: {area}
          </p>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <CalendarClock className="h-3 w-3" />
            {time}
          </p>
        </div>
      </div>
      <div className={cn(
        "text-[10px] px-2 py-1 rounded-full font-bold uppercase",
        status === 'scheduled' ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"
      )}>
        {status}
      </div>
    </div>
  </div>
);

const PowerWaterWatch = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-secondary">Utility Watch</h2>
        <p className="text-muted-foreground">Monitor scheduled power and water interruptions.</p>
      </div>

      <Tabs defaultValue="power" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/50 p-1 mb-6">
          <TabsTrigger value="power" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-white">
            <Zap className="mr-2 h-4 w-4" /> BISELCO
          </TabsTrigger>
          <TabsTrigger value="water" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            <Droplets className="mr-2 h-4 w-4" /> Water District
          </TabsTrigger>
        </TabsList>

        <TabsContent value="power" className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3 text-sm text-green-800">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-bold">System Normal</p>
              <p className="text-xs">No unplanned outages reported at this time.</p>
            </div>
          </div>

          <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider ml-1 mt-6 mb-2">Upcoming Schedule</h3>
          
          <AlertItem 
            type="power"
            title="Line Maintenance"
            area="Brgy. Poblacion 1, 3, 5"
            time="Oct 28 (Sat), 8:00 AM - 5:00 PM"
            status="scheduled"
          />
          <AlertItem 
            type="power"
            title="Post Replacement"
            area="Brgy. Guadalupe (Partial)"
            time="Oct 30 (Mon), 9:00 AM - 12:00 NN"
            status="scheduled"
          />
        </TabsContent>

        <TabsContent value="water" className="space-y-4">
           <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3 text-sm text-green-800">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-bold">Normal Water Pressure</p>
              <p className="text-xs">All pumping stations are operational.</p>
            </div>
          </div>
          
           <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider ml-1 mt-6 mb-2">Rationing Schedule</h3>

           <AlertItem 
            type="water"
            title="Valve Maintenance"
            area="Sitio Maquinit"
            time="Oct 29 (Sun), 1:00 PM - 5:00 PM"
            status="scheduled"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PowerWaterWatch;