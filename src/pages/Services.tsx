import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bus, FileText, ChevronRight, Bike, Briefcase, Zap, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ServiceItem = ({ icon: Icon, title, desc, link, colorClass, bgClass, textClass }: any) => (
  <Link to={link}>
    <div className={cn(
      "glass-panel p-4 rounded-xl flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-l-4",
      colorClass
    )}>
      <div className={cn("p-3 rounded-full flex-shrink-0", bgClass)}>
        <Icon className={cn("h-6 w-6", textClass)} />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-base text-gray-800 dark:text-gray-100">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {desc}
        </p>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  </Link>
);

const Services = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-secondary">Services</h2>
        <p className="text-muted-foreground">Access municipal and private services.</p>
      </div>

      <div className="grid gap-4">
        <ServiceItem 
          icon={Bike}
          title="Tricycle Fare Guide"
          desc="Calculate official fare rates between zones."
          link="/services/fare"
          colorClass="border-l-primary"
          bgClass="bg-primary/10"
          textClass="text-primary"
        />

        <ServiceItem 
          icon={Zap}
          title="Utility Watch"
          desc="Monitor BISELCO power and water interruptions."
          link="/services/utilities"
          colorClass="border-l-yellow-500"
          bgClass="bg-yellow-100 dark:bg-yellow-900/30"
          textClass="text-yellow-600 dark:text-yellow-400"
        />

        <ServiceItem 
          icon={Stethoscope}
          title="Private Services"
          desc="Directory of clinics, dentists, and lawyers."
          link="/services/private"
          colorClass="border-l-rose-500"
          bgClass="bg-rose-100 dark:bg-rose-900/30"
          textClass="text-rose-600 dark:text-rose-400"
        />

        <ServiceItem 
          icon={Briefcase}
          title="Trabaho Center"
          desc="Find local job opportunities in Coron."
          link="/services/jobs"
          colorClass="border-l-blue-500"
          bgClass="bg-blue-100 dark:bg-blue-900/30"
          textClass="text-blue-600 dark:text-blue-400"
        />

        <ServiceItem 
          icon={Bus}
          title="Emergency Pasundo"
          desc="Free ride service for stranded students."
          link="/services/pasundo"
          colorClass="border-l-green-500"
          bgClass="bg-green-100 dark:bg-green-900/30"
          textClass="text-green-600 dark:text-green-400"
        />

        <ServiceItem 
          icon={FileText}
          title="Government Requirements"
          desc="Checklist for permits, IDs, and certificates."
          link="/services/requirements"
          colorClass="border-l-secondary"
          bgClass="bg-secondary/10 dark:bg-secondary/20"
          textClass="text-secondary dark:text-secondary-foreground"
        />
      </div>
    </div>
  );
};

export default Services;