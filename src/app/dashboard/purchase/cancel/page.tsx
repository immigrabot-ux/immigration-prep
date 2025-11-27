import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PurchaseCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            <XCircle className="h-10 w-10 text-orange-600" />
          </div>
          <CardTitle className="text-2xl">Purchase Cancelled</CardTitle>
          <CardDescription>
            Your purchase was cancelled. No charges were made to your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            You can return to the dashboard to browse packages or try again when you're ready.
          </p>

          <div className="space-y-2">
            <Link href="/dashboard">
              <Button className="w-full">Return to Dashboard</Button>
            </Link>
            <Link href="/browse">
              <Button variant="outline" className="w-full">
                Browse Forms
              </Button>
            </Link>
          </div>

          <div className="bg-muted rounded-lg p-4 mt-6">
            <p className="text-xs text-muted-foreground">
              Need help choosing the right package? Check out our package recommendations or contact support.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
