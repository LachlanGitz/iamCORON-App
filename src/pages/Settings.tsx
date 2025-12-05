import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch'; // Corrected: removed 'g'
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  LogOut, 
  Globe, 
  Smartphone,
  ChevronRight,
  Laptop,
  MapPin,
  Home,
  Hotel,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/components/auth/SessionContextProvider';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { user, profile, loading, fetchProfile } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [userType, setUserType] = useState(profile?.user_type || '');
  const [address, setAddress] = useState(profile?.address || '');
  const [hotelName, setHotelName] = useState(profile?.hotel_name || '');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || '');
      setLastName(profile.last_name || '');
      setUserType(profile.user_type || '');
      setAddress(profile.address || '');
      setHotelName(profile.hotel_name || '');
    }
  }, [profile]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Logout failed", { description: error.message });
    } else {
      toast.success("Logged out successfully");
      navigate('/login');
    }
  };

  const handleSaveProfile = async () => {
    if (!user) {
      toast.error("You must be logged in to update your profile.");
      return;
    }
    setIsSavingProfile(true);
    try {
      const updates = {
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        user_type: userType,
        address: userType === 'resident' ? address : null,
        hotel_name: userType === 'tourist' ? hotelName : null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
      await fetchProfile(); // Refresh profile data in context
      toast.success("Profile updated successfully!");
      setIsEditingProfile(false);
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
      toast.error("Failed to update profile.", { description: error.message });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleGetGPSLocation = () => {
    if (!OPENCAGE_API_KEY || OPENCAGE_API_KEY === 'YOUR_OPENCAGE_API_KEY_HERE') {
      toast.error("Geocoding API Key Missing", {
        description: "Please set VITE_OPENCAGE_API_KEY in your .env file to use this feature."
      });
      return;
    }

    setIsFetchingLocation(true);
    toast.loading("Fetching your current location...", { id: 'location-toast' });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
            );
            const data = await response.json();

            if (data.results && data.results.length > 0) {
              const formattedAddress = data.results[0].formatted;
              setAddress(formattedAddress);
              toast.success("Location fetched!", {
                description: "Your address has been updated.",
                id: 'location-toast'
              });
            } else {
              toast.error("Could not find address for your location.", { id: 'location-toast' });
            }
          } catch (error) {
            console.error("Error during reverse geocoding:", error);
            toast.error("Failed to get address from coordinates.", { id: 'location-toast' });
          } finally {
            setIsFetchingLocation(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error("Failed to get GPS location.", {
            description: error.message,
            id: 'location-toast'
          });
          setIsFetchingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.", { id: 'location-toast' });
      setIsFetchingLocation(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <LogIn className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-bold">Please Log In</h2>
        <p className="text-muted-foreground">You need to be logged in to view your settings.</p>
        <Button onClick={() => navigate('/login')}>Go to Login</Button>
      </div>
    );
  }

  const getInitials = (fName: string, lName: string) => {
    return `${fName ? fName[0] : ''}${lName ? lName[0] : ''}`.toUpperCase();
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-secondary">Settings</h2>
        <p className="text-muted-foreground">Manage your preferences and account.</p>
      </div>

      {/* Profile Card */}
      <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-yellow-600 p-1 shadow-lg">
          <Avatar className="h-full w-full border-2 border-white">
            <AvatarImage src={profile?.avatar_url || "https://github.com/shadcn.png"} />
            <AvatarFallback>{getInitials(profile?.first_name || '', profile?.last_name || '')}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {profile?.first_name || 'Guest'} {profile?.last_name || 'User'}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {profile?.user_type === 'resident' ? `Resident • ${profile?.address || 'Address not set'}` : 
             profile?.user_type === 'tourist' ? `Tourist • ${profile?.hotel_name || 'Hotel not set'}` :
             'User Type not set'}
          </p>
          <Button variant="link" className="px-0 h-auto text-xs text-primary" onClick={() => setIsEditingProfile(true)}>Edit Profile</Button>
        </div>
      </div>

      {isEditingProfile && (
        <Card className="border-none shadow-md bg-white/50 dark:bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4" /> Edit Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="userType">User Type</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resident">Resident</SelectItem>
                  <SelectItem value="tourist">Tourist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {userType === 'resident' && (
              <div className="space-y-2">
                <Label htmlFor="address">Complete Address</Label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea id="address" placeholder="House No., Street, Barangay, Town" className="pl-9 min-h-[80px]" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs" 
                  onClick={handleGetGPSLocation}
                  disabled={isFetchingLocation}
                >
                  {isFetchingLocation ? (
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  ) : (
                    <MapPin className="mr-2 h-3 w-3" />
                  )}
                  Use Current GPS Location
                </Button>
              </div>
            )}
            {userType === 'tourist' && (
              <div className="space-y-2">
                <Label htmlFor="hotelName">Hotel Name / Accommodation</Label>
                <div className="relative">
                  <Hotel className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="hotelName" placeholder="e.g., The Funny Lion" className="pl-9" value={hotelName} onChange={(e) => setHotelName(e.target.value)} />
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleSaveProfile} disabled={isSavingProfile}>
                {isSavingProfile ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Appearance */}
      <Card className="border-none shadow-md bg-white/50 dark:bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Sun className="h-4 w-4" /> Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label className="text-base">Theme</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={theme === 'light' ? "default" : "outline"} 
                className="flex gap-2"
                onClick={() => setTheme('light')}
              >
                <Sun className="h-4 w-4" /> Light
              </Button>
              <Button 
                variant={theme === 'dark' ? "default" : "outline"} 
                className="flex gap-2"
                onClick={() => setTheme('dark')}
              >
                <Moon className="h-4 w-4" /> Dark
              </Button>
              <Button 
                variant={theme === 'system' ? "default" : "outline"} 
                className="flex gap-2"
                onClick={() => setTheme('system')}
              >
                <Laptop className="h-4 w-4" /> System
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-none shadow-md bg-white/50 dark:bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Emergency Alerts</Label>
              <p className="text-xs text-muted-foreground">Push notifications for calamities.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Utility Interruptions</Label>
              <p className="text-xs text-muted-foreground">Power and water schedule updates.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>News & Announcements</Label>
              <p className="text-xs text-muted-foreground">Municipal events and programs.</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* General */}
      <Card className="border-none shadow-md bg-white/50 dark:bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4" /> General
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-1">
          <Button variant="ghost" className="w-full justify-between font-normal h-12">
            <span className="flex items-center gap-2"><Globe className="h-4 w-4" /> Language</span>
            <span className="flex items-center text-xs text-muted-foreground">English <ChevronRight className="h-4 w-4 ml-1" /></span>
          </Button>
          <Button variant="ghost" className="w-full justify-between font-normal h-12">
            <span className="flex items-center gap-2"><Smartphone className="h-4 w-4" /> Offline Data</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" className="w-full justify-between font-normal h-12">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Privacy Policy</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Button>
        </CardContent>
      </Card>

      <Button 
        variant="destructive" 
        className="w-full" 
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" /> Log Out
      </Button>

      <div className="text-center text-xs text-muted-foreground pt-4">
        <p>iamCORON v1.0.3</p>
        <p>Made with ❤️ for Palawan</p>
      </div>
    </div>
  );
};

export default Settings;