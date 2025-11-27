'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2, Package, TrendingUp } from 'lucide-react';
import { FormPackage } from '@/lib/constants/form-packages';
import { FORM_REGISTRY } from '@/lib/constants/forms-registry';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface FormPackageCardProps {
  package: FormPackage;
}

export function FormPackageCard({ package: pkg }: FormPackageCardProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handlePurchase = async () => {
    setIsPurchasing(true);

    try {
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packageId: pkg.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: 'Error',
        description: 'Failed to start checkout. Please try again.',
        variant: 'destructive',
      });
      setIsPurchasing(false);
    }
  };

  const calculateSavings = () => {
    const individualTotal = pkg.formIds.reduce((total, formId) => {
      const form = FORM_REGISTRY[formId];
      return total + (form?.filingFee || 0);
    }, 0);
    return individualTotal - pkg.price;
  };

  const savings = calculateSavings();

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all hover:shadow-lg',
        pkg.popular && 'border-primary border-2'
      )}
    >
      {pkg.popular && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-primary">
            <TrendingUp className="mr-1 h-3 w-3" />
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl">{pkg.name}</CardTitle>
            <CardDescription className="mt-1">{pkg.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pricing */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">${pkg.price}</span>
          {savings > 0 && (
            <Badge variant="secondary" className="text-xs">
              Save ${savings}
            </Badge>
          )}
        </div>

        {/* Included Forms */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Includes:</p>
          <ul className="space-y-2">
            {pkg.formIds.map((formId) => {
              const form = FORM_REGISTRY[formId.toLowerCase()];
              return (
                <li key={formId} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">{formId}</span>
                    {form && ` - ${form.name}`}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Benefits */}
        <div className="pt-2 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-primary" />
            <span>Auto-save & resume anytime</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-primary" />
            <span>PDF generation included</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-primary" />
            <span>Expert guidance for each form</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handlePurchase}
          disabled={isPurchasing}
          className="w-full"
          size="lg"
        >
          {isPurchasing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Buy Now'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
