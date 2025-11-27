'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function PurchaseSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [isVerifying, setIsVerifying] = useState(true);
  const [purchase, setPurchase] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided');
      setIsVerifying(false);
      return;
    }

    const verifyPurchase = async () => {
      try {
        const response = await fetch(`/api/payments/verify?session_id=${sessionId}`);
        const data = await response.json();

        if (data.verified && data.purchase) {
          setPurchase(data.purchase);
        } else {
          setError('Purchase verification failed. Please contact support.');
        }
      } catch (err) {
        console.error('Error verifying purchase:', err);
        setError('Failed to verify purchase. Please contact support.');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPurchase();
  }, [sessionId]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg font-medium">Verifying your purchase...</p>
            <p className="text-sm text-muted-foreground mt-2">This will only take a moment.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Verification Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard">
              <Button className="w-full">Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl">Purchase Successful!</CardTitle>
          <CardDescription className="text-base">
            Thank you for your purchase. Your forms are now ready to use.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Purchase Details */}
          <div className="bg-muted/50 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-lg">Purchase Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Package:</span>
                <span className="font-medium">{purchase?.packageName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Forms Included:</span>
                <span className="font-medium">{purchase?.formsIncluded?.length || 0}</span>
              </div>
            </div>
          </div>

          {/* Forms List */}
          <div>
            <h3 className="font-semibold mb-3">Your Forms</h3>
            <div className="grid gap-2">
              {purchase?.formsIncluded?.map((formId: string) => (
                <div
                  key={formId}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <span className="font-medium">{formId.toUpperCase()}</span>
                  <Link href={`/dashboard/forms/${formId}`}>
                    <Button size="sm" variant="outline">
                      Start Form
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
            <ul className="space-y-1 text-sm text-blue-900">
              <li>• Fill out your forms at your own pace</li>
              <li>• Your progress is automatically saved</li>
              <li>• Download completed PDFs when ready</li>
              <li>• Access your forms anytime from "My Purchases"</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/my-purchases" className="flex-1">
              <Button className="w-full">View My Purchases</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
