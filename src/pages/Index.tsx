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
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
      case 'clear': return <Sun className="h-32 w-32 text-yellow-300" />;
      case 'clouds': return <Cloud className="h-32 w-32 text-gray-200" />;
      case 'rain': 
      case 'drizzle': return <CloudRain className="h-32 w-32 text-blue-300" />;
      case 'thunderstorm': return <CloudLightning className="h-32 w-32 text-purple-300" />;
      default: return <CloudSun className="h-32 w-32 text-orange-200" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero / Weather Widget */}
      <Card className="bg-gradient-to-br from-primary to-yellow-500 text-primary-foreground border-none overflow-hidden relative shadow-md">
        <div className="absolute right-[-20px] top-[-20px] p-8 opacity-30 animate-in fade-in zoom-in duration-1000">
          {loading ? (
            <Loader2 className="h-32 w-32 animate-spin" />
          ) : (
            getWeatherIcon(weather?.weather?.[0]?.main)
          )}
        </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start h-24">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-primary-foreground/90 text-sm font-bold uppercase tracking-wider">Welcome to</p>
                <h1 className="text-3xl font-black mt-0 text-white drop-shadow-md">iamCORON</h1>
              </div>
              <p className="text-sm font-medium opacity-90 flex items-center gap-1">
                {dateStr}
              </p>
            </div>
            
            <div className="text-right text-white drop-shadow-md z-20">
              {loading ? (
                <div className="animate-pulse flex flex-col items-end">
                  <div className="h-10 w-20 bg-white/20 rounded mb-1"></div>
                  <div className="h-4 w-16 bg-white/20 rounded"></div>
                </div>
              ) : weather ? (
                <>
                  <span className="text-5xl font-bold tracking-tighter">{Math.round(weather.main.temp)}°</span>
                  <p className="text-sm mt-1 font-medium capitalize">{weather.weather[0].description}</p>
                  <p className="text-xs opacity-80">Humidity: {weather.main.humidity}%</p>
                </>
              ) : (
                <span className="text-sm">Weather Unavailable</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/report">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-red-500 h-full group">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2 h-full">
              <div className="p-3 bg-red-100 rounded-full text-red-600 group-hover:scale-110 transition-transform duration-200">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <span className="font-semibold text-sm">Report Incident</span>
            </CardContent>
          </Card>
        </Link>
        <Link to="/emergency">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-blue-600 h-full group">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2 h-full">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600 group-hover:scale-110 transition-transform duration-200">
                <Phone className="h-6 w-6" />
              </div>
              <span className="font-semibold text-sm">Emergency</span>
            </CardContent>
          </Card>
        </Link>
        <Link to="/map">
          <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-primary h-full group">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2 h-full">
              <div className="p-3 bg-yellow-100 rounded-full text-primary-foreground group-hover:scale-110 transition-transform duration-200">
                <Map className="h-6 w-6 text-yellow-700" />
              </div>
              <span className="font-semibold text-sm">Tourism Map</span>
            </CardContent>
          </Card>
        </Link>
        <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-orange-500 h-full group">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2 h-full">
            <div className="p-3 bg-orange-100 rounded-full text-orange-600 group-hover:scale-110 transition-transform duration-200">
              <Info className="h-6 w-6" />
            </div>
            <span className="font-semibold text-sm">Guide</span>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-secondary">Announcements</h3>
          <Button variant="link" className="text-xs h-auto p-0 text-secondary">View all</Button>
        </div>
        
        <Card className="border-l-4 border-l-secondary">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Scheduled Power Interruption</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  BISELCO Advisory: There will be a scheduled power interruption on Brgy. Poblacion 1 this coming Saturday from 8:00 AM to 5:00 PM for line maintenance.
                </p>
                <p className="text-[10px] text-muted-foreground mt-2">Posted 2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Medical Mission</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  Free medical check-up and dental services will be held at the Municipal Plaza on Oct 30.
                </p>
                <p className="text-[10px] text-muted-foreground mt-2">Posted 1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;