'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FORM_PACKAGES } from '@/lib/constants/form-packages';
import { FORM_REGISTRY } from '@/lib/constants/forms-registry';
import { FileText, DollarSign, Clock, Package, Check, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BrowseClientProps {
  highlightPackage?: string;
  highlightCategory?: string;
  highlightForm?: string;
}

export function BrowseClient({
  highlightPackage,
  highlightCategory,
  highlightForm,
}: BrowseClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const highlightRef = useRef<HTMLDivElement>(null);

  // Handle URL params for highlighting
  useEffect(() => {
    if (highlightCategory) {
      setSelectedCategory(highlightCategory);
    }

    // Scroll to highlighted element after a short delay
    if (highlightPackage || highlightCategory || highlightForm) {
      setTimeout(() => {
        highlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [highlightPackage, highlightCategory, highlightForm]);

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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      family: 'bg-blue-100 text-blue-800 border-blue-200',
      citizenship: 'bg-purple-100 text-purple-800 border-purple-200',
      work_authorization: 'bg-green-100 text-green-800 border-green-200',
      employment: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      travel: 'bg-orange-100 text-orange-800 border-orange-200',
      humanitarian: 'bg-rose-100 text-rose-800 border-rose-200',
      status_change: 'bg-amber-100 text-amber-800 border-amber-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusColor = (status?: string) => {
    if (!status || status === 'active') {
      return 'bg-green-100 text-green-700 border-green-200';
    }
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  };

  const getStatusLabel = (status?: string) => {
    if (!status || status === 'active') return 'Active';
    return 'Beta';
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      family: 'Family',
      citizenship: 'Citizenship',
      work_authorization: 'Work Auth',
      employment: 'Employment',
      travel: 'Travel',
      humanitarian: 'Humanitarian',
      status_change: 'Status Change',
      other: 'Other',
    };
    return labels[category] || category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              Browse All Immigration Forms
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our complete collection of 18 USCIS forms and convenient packages. Sign up to get started.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Popular Packages */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Popular Packages
            </h2>
            <p className="text-muted-foreground">
              Save time and money with our bundled form packages
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FORM_PACKAGES.filter((pkg) => pkg.popular).map((pkg) => (
              <div
                key={pkg.id}
                ref={highlightPackage === pkg.id ? highlightRef : null}
                className={highlightPackage === pkg.id ? 'animate-pulse' : ''}
              >
                <Card
                  className={cn(
                    'relative overflow-hidden transition-all hover:shadow-lg h-full',
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

                    <div className="space-y-2">
                      <Button asChild className="w-full" size="lg">
                        <Link href="/signup">Sign Up to Start</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full" size="sm">
                        <Link href={`/preview/${pkg.formIds[0].toLowerCase()}`}>Try Preview</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* All Packages */}
        {FORM_PACKAGES.filter((pkg) => !pkg.popular).length > 0 && (
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight mb-2">
                All Packages
              </h2>
              <p className="text-muted-foreground">
                Additional form packages for specific needs
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {FORM_PACKAGES.filter((pkg) => !pkg.popular).map((pkg) => (
                <div
                  key={pkg.id}
                  ref={highlightPackage === pkg.id ? highlightRef : null}
                  className={highlightPackage === pkg.id ? 'animate-pulse' : ''}
                >
                  <Card className="transition-all hover:shadow-lg h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{pkg.name}</CardTitle>
                          <CardDescription className="mt-1 text-sm">
                            {pkg.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-3">
                      <div className="text-2xl font-bold">${pkg.price}</div>
                      <p className="text-sm text-muted-foreground">
                        {pkg.formIds.length} form{pkg.formIds.length > 1 ? 's' : ''} included
                      </p>
                    </CardContent>

                    <CardContent className="pt-0 space-y-2">
                      <Button asChild className="w-full">
                        <Link href="/signup">Sign Up to Start</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full" size="sm">
                        <Link href={`/preview/${pkg.formIds[0].toLowerCase()}`}>Try Preview</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>
        )}

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
                <Card className="transition-all hover:shadow-md h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <CardTitle className="text-lg">{form.code}</CardTitle>
                          <Badge variant="outline" className={getStatusColor(form.status)}>
                            {getStatusLabel(form.status)}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2 mb-2">
                          {form.name}
                        </CardDescription>
                        <Badge variant="outline" className={getCategoryColor(form.category)}>
                          {getCategoryLabel(form.category)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 pb-3">
                    <div className="space-y-2">
                      {form.price !== undefined && (
                        <div className="flex items-center gap-1.5 text-lg font-bold text-primary">
                          <DollarSign className="h-5 w-5" />
                          <span>${form.price}</span>
                        </div>
                      )}
                      {form.estimatedTime && (
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{form.estimatedTime}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardContent className="pt-0 space-y-2">
                    <Button asChild variant="default" className="w-full">
                      <Link href="/signup">Sign Up to Start</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="sm">
                      <Link href={`/preview/${form.id}`}>Try Preview</Link>
                    </Button>
                  </CardContent>
                </Card>
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
