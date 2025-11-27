'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { IndividualFormCard } from '@/components/dashboard/IndividualFormCard';
import { FORM_REGISTRY } from '@/lib/constants/forms-registry';
import { FileText, ArrowRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { AuthButton } from '@/components/auth/AuthButton';

interface DashboardClientProps {
  applications: any[];
  user: User;
  highlightCategory?: string;
  highlightForm?: string;
}

export function DashboardClient({
  applications,
  user,
  highlightCategory,
  highlightForm,
}: DashboardClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const highlightRef = useRef<HTMLDivElement>(null);

  // Handle URL params for highlighting
  useEffect(() => {
    if (highlightCategory) {
      setSelectedCategory(highlightCategory);
    }

    // Scroll to highlighted element after a short delay
    if (highlightCategory || highlightForm) {
      setTimeout(() => {
        highlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [highlightCategory, highlightForm]);

  // Category display mapping
  const categoryLabels: Record<string, string> = {
    all: 'All Forms',
    family: 'Family Immigration',
    employment: 'Employment',
    work_authorization: 'Work Authorization',
    citizenship: 'Citizenship',
    travel: 'Travel',
    humanitarian: 'Humanitarian',
    status_change: 'Status Change',
    other: 'Other',
  };

  // Get unique categories from forms
  const categories = ['all', ...new Set(Object.values(FORM_REGISTRY).map((f) => f.category))];

  // Filter forms by category
  const filteredForms = Object.values(FORM_REGISTRY).filter(
    (form) => selectedCategory === 'all' || form.category === selectedCategory
  );

  // Count forms in each category
  const getCategoryCount = (category: string) => {
    if (category === 'all') return Object.values(FORM_REGISTRY).length;
    return Object.values(FORM_REGISTRY).filter((f) => f.category === category).length;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'in_review':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'draft':
        return <FileText className="h-4 w-4 text-orange-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_review':
        return 'In Review';
      case 'draft':
        return 'Draft';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              Prepare Your Immigration Forms
            </h1>
            <p className="text-xl text-muted-foreground">
              Access all 18 USCIS forms with guided assistance and auto-save. Start your application today.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* In-Progress Applications */}
        {applications.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Your Applications</h2>
                <p className="text-muted-foreground">Continue where you left off</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/dashboard/forms">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {applications.slice(0, 6).map((app) => {
                const form = FORM_REGISTRY[app.form_id];
                if (!form) return null;

                return (
                  <Card key={app.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{form.id}</CardTitle>
                          <CardDescription className="line-clamp-1">
                            {form.name}
                          </CardDescription>
                        </div>
                        {getStatusIcon(app.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Badge
                          variant="outline"
                          className={getStatusColor(app.status)}
                        >
                          {getStatusLabel(app.status)}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          Last updated:{' '}
                          {new Date(app.updated_at).toLocaleDateString()}
                        </div>
                        <Button asChild className="w-full" size="sm">
                          <Link
                            href={
                              app.status === 'completed'
                                ? `/dashboard/forms/${form.id}/review?applicationId=${app.id}`
                                : `/dashboard/forms/${form.id}?applicationId=${app.id}`
                            }
                          >
                            {app.status === 'completed' ? 'Review' : 'Continue'}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Pricing Info */}
        <section className="mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl">Simple Pricing</CardTitle>
              <CardDescription className="text-base">
                All forms are $60 each. Buy multiple forms and save automatically!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">$60</div>
                  <div className="text-sm text-gray-600 mt-1">1 Form</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">$100</div>
                  <div className="text-sm text-gray-600 mt-1">2 Forms</div>
                  <div className="text-xs text-green-600 font-medium mt-1">Save $20</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">$140</div>
                  <div className="text-sm text-gray-600 mt-1">3 Forms</div>
                  <div className="text-xs text-green-600 font-medium mt-1">Save $40</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">$200</div>
                  <div className="text-sm text-gray-600 mt-1">4+ Forms</div>
                  <div className="text-xs text-green-600 font-medium mt-1">Save $40+</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Individual Forms */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Individual Forms
            </h2>
            <p className="text-muted-foreground">
              Or start with a single form application
            </p>
          </div>

          {/* Category Tabs */}
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="mb-6"
          >
            <TabsList className="w-full justify-start flex-wrap h-auto gap-2 p-2">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {categoryLabels[category] || category}
                  <Badge variant="secondary" className="ml-2">
                    {getCategoryCount(category)}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredForms.map((form) => (
              <div
                key={form.id}
                ref={highlightForm === form.id ? highlightRef : null}
                className={highlightForm === form.id ? 'animate-pulse' : ''}
              >
                <IndividualFormCard form={form} />
              </div>
            ))}
          </div>

          {filteredForms.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                No forms found in this category
              </p>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
