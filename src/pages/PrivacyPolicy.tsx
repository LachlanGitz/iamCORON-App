import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Shield, Lock, MapPin, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6 pb-20">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h2 className="text-2xl font-bold tracking-tight">Privacy Policy</h2>
            </div>

            <div className="space-y-4">
                <p className="text-muted-foreground">
                    Last updated: December 6, 2025
                </p>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            Data Collection & Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm leading-relaxed">
                        <p>
                            **iamCORON** ("the App") respects your privacy. We collect data only to facilitate the services provided by the App, such as Incident Reporting and Emergency Assistance.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-blue-500" />
                            Location Data
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm leading-relaxed">
                        <p>
                            The App may request access to your device's GPS location. This is strictly used for:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Pinpointing the location of incident reports.</li>
                            <li>Providing location-based emergency services (e.g., Pasundo).</li>
                        </ul>
                        <p>
                            Your location is **never** tracked in the background. Coordinates are only sent when you explicitly tap "Submit" or "Use GPS".
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Camera className="h-5 w-5 text-rose-500" />
                            Photos & Media
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm leading-relaxed">
                        <p>
                            We collect photos only when you upload them as evidence for reports. These images are stored securely and are only accessible by authorized Municipal personnel.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Lock className="h-5 w-5 text-green-500" />
                            Data Security
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm leading-relaxed">
                        <p>
                            All data transmitted between your device and our servers is encrypted using standard protocols. We do not sell or share your personal data with third-party advertisers.
                        </p>
                        <p className="font-semibold mt-4">
                            Your Consent
                        </p>
                        <p>
                            By using our features (Reporting, Pasundo), you consent to the collection and use of information in accordance with this policy.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
