"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, MapPin, Home, Hotel, Mail, Lock, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('');
  const [address, setAddress] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const navigate = useNavigate();

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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Sign up the user with email and password
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (authError) {
        throw authError;
      }

      if (authData.user) {
        // 2. Insert additional profile data into public.profiles
        const { error: profileError } = await supabase.from('profiles').upsert({
          id: authData.user.id,
          first_name: firstName,
          last_name: lastName,
          user_type: userType,
          address: userType === 'resident' ? address : null,
          hotel_name: userType === 'tourist' ? hotelName : null,
        });

        if (profileError) {
          // If profile insertion fails, consider rolling back user or logging for admin
          console.error("Error inserting profile data:", profileError.message);
          toast.error("Registration successful, but failed to save profile details. Please update in settings.", { duration: 5000 });
        } else {
          toast.success("Registration successful! Please check your email to confirm your account.");
        }
        navigate('/'); // Redirect to home or a confirmation page
      } else {
        toast.info("Please check your email to complete registration.");
      }
    } catch (error: any) {
      console.error("Sign up error:", error.message);
      toast.error("Sign up failed", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="your@example.com"
            className="pl-9"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="pl-9"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="userType">I am a...</Label>
        <Select value={userType} onValueChange={setUserType} required>
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
            <Textarea
              id="address"
              placeholder="House No., Street, Barangay, Town"
              className="pl-9 min-h-[80px]"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
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
            <Input
              id="hotelName"
              placeholder="e.g., The Funny Lion"
              className="pl-9"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              required
            />
          </div>
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={loading || !userType}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing Up...
          </>
        ) : (
          "Sign Up"
        )}
      </Button>
    </form>
  );
};

export default SignUpForm;