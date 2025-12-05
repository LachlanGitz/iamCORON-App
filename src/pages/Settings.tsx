import React from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Laptop
} from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const { theme, setTheme } = useTheme();

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
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Juan Dela Cruz</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Resident • Brgy. Poblacion 1</p>
          <Button variant="link" className="px-0 h-auto text-xs text-primary">Edit Profile</Button>
        </div>
      </div>

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
        onClick={() => toast.success("Logged out successfully")}
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