import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Phone, 
  FileText, 
  CloudSun, 
  Map, 
  Info, 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Index = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    // Set current date
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    setDateStr(now.toLocaleDateString('en-US', options));

    // Fetch weather
    const fetchWeather = async () => {
      try {
        const API_KEY = '0d3009555b48368f42c033b424d9057c';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Coron,PH&units=metric&appid=${API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (main: string) => {
    switch (main?.toLowerCase()) {
      case 'clear': return <Sun className="h-28 w-28 text-yellow-100 drop-shadow-lg" />;
      case 'clouds': return <Cloud className="h-28 w-28 text-white/80 drop-shadow-lg" />;
      case 'rain': 
      case 'drizzle': return <CloudRain className="h-28 w-28 text-blue-100 drop-shadow-lg" />;
      case 'thunderstorm': return <CloudLightning className="h-28 w-28 text-purple-100 drop-shadow-lg" />;
      default: return <CloudSun className="h-28 w-28 text-orange-50 drop-shadow-lg" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero / Weather Widget - Polished Gold Slab */}
      <div className="relative overflow-hidden rounded-xl shadow-xl transition-transform hover:scale-[1.01] duration-300">
        <div className="absolute inset-0 gold-gradient opacity-90" />
        {/* Shine effect */}
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-in slide-in-from-left duration-2000" />
        
        <div className="relative p-6 text-primary-foreground z-10">
          <div className="absolute right-[-10px] top-[-10px] opacity-40 animate-in fade-in zoom-in duration-1000 rotate-12">
            {loading ? (
              <Loader2 className="h-24 w-24 animate-spin text-white/50" />
            ) : (
              getWeatherIcon(weather?.weather?.[0]?.main)
            )}
          </div>
          
          <div className="flex justify-between items-start h-24">
            <div className="flex flex-col justify-between h-full">
              <div className="space-y-1">
                <p className="text-primary-foreground/80 text-xs font-bold uppercase tracking-widest">Welcome to</p>
                <h1 className="text-3xl font-black text-white drop-shadow-md tracking-tight">iamCORON</h1>
              </div>
              <p className="text-sm font-medium bg-black/10 backdrop-blur-sm self-start px-3 py-1 rounded-full text-white/90">
                {dateStr}
              </p>
            </div>
            
            <div className="text-right text-white drop-shadow-md z-20 flex flex-col items-end">
              {loading ? (
                <div className="animate-pulse flex flex-col items-end">
                  <div className="h-10 w-20 bg-white/20 rounded mb-1"></div>
                  <div className="h-4 w-16 bg-white/20 rounded"></div>
                </div>
              ) : weather ? (
                <>
                  <span className="text-5xl font-bold tracking-tighter filter drop-shadow-sm">{Math.round(weather.main.temp)}°</span>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-semibold capitalize">{weather.weather[0].description}</p>
                    <p className="text-xs opacity-90">Humidity: {weather.main.humidity}%</p>
                  </div>
                </>
              ) : (
                <span className="text-sm">Weather Unavailable</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid - Glass/Marble Tiles */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { title: "Report Incident", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/30", link: "/report", border: "border-l-red-500" },
          { title: "Emergency", icon: Phone, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/30", link: "/emergency", border: "border-l-blue-600" },
          { title: "Tourism Map", icon: Map, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/30", link: "/map", border: "border-l-yellow-500" },
          { title: "Guide", icon: Info, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/30", link: "/services", border: "border-l-orange-500" }
        ].map((item, i) => (
          <Link key={i} to={item.link}>
            <div className={cn(
              "glass-panel h-full p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-3",
              "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95",
              "border-l-4", item.border
            )}>
              <div className={cn("p-3 rounded-full shadow-inner", item.bg, item.color)}>
                <item.icon className="h-6 w-6" />
              </div>
              <span className="font-semibold text-sm text-gray-700 dark:text-gray-200">{item.title}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Announcements */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <span className="w-1 h-6 bg-secondary rounded-full"></span>
            Announcements
          </h3>
          <Button variant="ghost" size="sm" className="text-secondary dark:text-primary hover:bg-secondary/10">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        {[
          {
            title: "Scheduled Power Interruption",
            desc: "BISELCO Advisory: There will be a scheduled power interruption on Brgy. Poblacion 1 this coming Saturday.",
            time: "2 hours ago",
            icon: FileText
          },
          {
            title: "Medical Mission",
            desc: "Free medical check-up and dental services will be held at the Municipal Plaza on Oct 30.",
            time: "1 day ago",
            icon: FileText
          }
        ].map((item, i) => (
          <div key={i} className="glass-panel p-4 rounded-xl flex gap-4 items-start group hover:bg-white/90 dark:hover:bg-black/50 transition-colors">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/10 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <item.icon className="h-6 w-6 text-secondary dark:text-secondary-foreground" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-gray-800 dark:text-gray-100">{item.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                {item.desc}
              </p>
              <p className="text-[10px] text-gray-400 mt-2 font-medium">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;