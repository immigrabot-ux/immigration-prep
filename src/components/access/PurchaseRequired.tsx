'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, ShoppingCart, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { FORM_PACKAGES } from '@/lib/constants/form-packages';
import { FORM_REGISTRY } from '@/lib/constants/forms-registry';
import { useTranslations } from 'next-intl';
import { useToast } from '@/hooks/use-toast';

interface PurchaseRequiredProps {
  formId: string;
  reason?: 'not_authenticated' | 'no_purchase' | 'access_revoked' | 'expired';
}

export function PurchaseRequired({ formId, reason }: PurchaseRequiredProps) {
  const t = useTranslations('purchaseRequired');
  const form = FORM_REGISTRY[formId.toLowerCase()];
  const [isPurchasing, setIsPurchasing] = useState<string | null>(null);
  const { toast } = useToast();

  // Find packages that include this form
  const availablePackages = FORM_PACKAGES.filter((pkg) =>
    pkg.formIds.some((f) => f.toLowerCase() === formId.toLowerCase())
  );

  const handlePurchase = async (packageId: string) => {
    setIsPurchasing(packageId);

    try {
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packageId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || 'Failed to create checkout session');
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to start checkout. Please try again.',
        variant: 'destructive',
      });
      setIsPurchasing(null);
    }
  };

  const getMessage = () => {
    switch (reason) {
      case 'not_authenticated':
        return t('messages.notAuthenticated');
      case 'access_revoked':
        return t('messages.accessRevoked');
      case 'expired':
        return t('messages.expired');
      case 'no_purchase':
      default:
        return t('messages.noPurchase');
    }
  };

  if (reason === 'not_authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-orange-600" />
            <CardTitle>{t('authenticationRequired')}</CardTitle>
            <CardDescription>{getMessage()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/auth/login">
              <Button className="w-full">{t('signIn')}</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" className="w-full">
                {t('createAccount')}
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
            <CardTitle className="text-2xl">{t('title')}</CardTitle>
            <CardDescription className="text-base">{getMessage()}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Form Info */}
            {form && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">{t('messages.tryingToAccess')}</h3>
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
                  {t('messages.purchasePackage')}
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
                              {t('includes')} {pkg.formIds.length} forms:{' '}
                              {pkg.formIds.map((f) => f.toUpperCase()).join(', ')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">${pkg.price}</p>
                            <Button
                              className="mt-2"
                              onClick={() => handlePurchase(pkg.id)}
                              disabled={isPurchasing === pkg.id}
                            >
                              {isPurchasing === pkg.id ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <ShoppingCart className="mr-2 h-4 w-4" />
                              )}
                              {isPurchasing === pkg.id ? t('processing') : t('buyNow')}
                            </Button>
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
                  {t('backToDashboard')}
                </Button>
              </Link>
            </div>

            {/* Contact Support */}
            {(reason === 'access_revoked' || reason === 'expired') && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                <p className="font-medium mb-1">{t('messages.needHelp')}</p>
                <p>
                  {t('messages.contactSupport')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
