'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, ShoppingCart, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { FORM_PACKAGES } from '@/lib/constants/form-packages';
import { FORM_REGISTRY } from '@/lib/constants/forms-registry';

interface PurchaseRequiredProps {
  formId: string;
  reason?: 'not_authenticated' | 'no_purchase' | 'access_revoked' | 'expired';
}

export function PurchaseRequired({ formId, reason }: PurchaseRequiredProps) {
  const form = FORM_REGISTRY[formId.toLowerCase()];

  // Find packages that include this form
  const availablePackages = FORM_PACKAGES.filter((pkg) =>
    pkg.forms.some((f) => f.toLowerCase() === formId.toLowerCase())
  );

  const getMessage = () => {
    switch (reason) {
      case 'not_authenticated':
        return 'Please sign in to access this form.';
      case 'access_revoked':
        return 'Your access to this form has been revoked. Please contact support.';
      case 'expired':
        return 'Your access to this form has expired.';
      case 'no_purchase':
      default:
        return 'You need to purchase a package that includes this form to access it.';
    }
  };

  if (reason === 'not_authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-orange-600" />
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>{getMessage()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/auth/login">
              <Button className="w-full">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" className="w-full">
                Create Account
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 px-4 py-12">
      <div className="container mx-auto max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl">Purchase Required</CardTitle>
            <CardDescription className="text-base">{getMessage()}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Form Info */}
            {form && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">You're trying to access:</h3>
                <p className="text-lg">
                  <span className="font-bold">{formId.toUpperCase()}</span>
                  {' - '}
                  {form.name}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{form.description}</p>
              </div>
            )}

            {/* Available Packages */}
            {availablePackages.length > 0 && (
              <div>
                <h3 className="font-semibold mb-4">
                  Purchase a package that includes this form:
                </h3>
                <div className="grid gap-4">
                  {availablePackages.map((pkg) => (
                    <Card key={pkg.id} className="border-primary/20">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{pkg.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {pkg.description}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Includes {pkg.forms.length} forms:{' '}
                              {pkg.forms.map((f) => f.toUpperCase()).join(', ')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">${pkg.price}</p>
                            <Link href="/dashboard">
                              <Button className="mt-2">
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Buy Now
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Back Button */}
            <div className="pt-4">
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            {/* Contact Support */}
            {(reason === 'access_revoked' || reason === 'expired') && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                <p className="font-medium mb-1">Need help?</p>
                <p>
                  If you believe this is an error, please contact our support team for assistance.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
