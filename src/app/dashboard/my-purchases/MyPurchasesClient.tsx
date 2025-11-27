'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Package, FileText, Calendar } from 'lucide-react';
import Link from 'next/link';
import { AuthButton } from '@/components/auth/AuthButton';

interface Purchase {
  id: string;
  package_id: string;
  package_name: string;
  forms_included: string[];
  amount_paid: number;
  status: string;
  created_at: string;
  completed_at: string;
}

interface FormAccess {
  id: string;
  form_id: string;
  granted_via: string;
  created_at: string;
}

interface MyPurchasesClientProps {
  purchases: Purchase[];
  formAccess: FormAccess[];
}

export function MyPurchasesClient({ purchases, formAccess }: MyPurchasesClientProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'refunded':
        return <Badge className="bg-gray-100 text-gray-800">Refunded</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="font-bold text-xl">
              ImmigrationPrep
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/browse">
                <Button variant="ghost">Browse Forms</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">My Purchases</h1>
          <p className="text-xl text-muted-foreground">
            View your purchase history and access your forms
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {purchases.length === 0 ? (
          <Card>
            <CardHeader className="text-center">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <CardTitle>No Purchases Yet</CardTitle>
              <CardDescription>
                You haven't purchased any form packages yet. Browse our packages to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/dashboard">
                <Button>Browse Packages</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Purchases</CardDescription>
                  <CardTitle className="text-3xl">{purchases.length}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Forms Unlocked</CardDescription>
                  <CardTitle className="text-3xl">{formAccess.length}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Spent</CardDescription>
                  <CardTitle className="text-3xl">
                    {formatPrice(
                      purchases
                        .filter((p) => p.status === 'completed')
                        .reduce((sum, p) => sum + p.amount_paid, 0)
                    )}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Purchases List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Purchase History</h2>
              {purchases.map((purchase) => (
                <Card key={purchase.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle>{purchase.package_name}</CardTitle>
                          {getStatusBadge(purchase.status)}
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Purchased on {formatDate(purchase.created_at)}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{formatPrice(purchase.amount_paid)}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Forms Included */}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Forms Included ({purchase.forms_included.length}):
                        </p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {purchase.forms_included.map((formId) => (
                            <div
                              key={formId}
                              className="flex items-center justify-between p-2 border rounded bg-muted/30"
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-primary" />
                                <span className="font-medium text-sm">{formId.toUpperCase()}</span>
                              </div>
                              <Link href={`/dashboard/forms/${formId}`}>
                                <Button size="sm" variant="ghost">
                                  Open
                                </Button>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Status Info */}
                      {purchase.status === 'completed' && (
                        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-3 rounded">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>All forms are ready to use</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
