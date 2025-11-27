'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FORM_REGISTRY } from '@/lib/constants/forms-registry';
import { FileText, DollarSign, Clock, Package, Check, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface BrowseClientProps {
  highlightCategory?: string;
  highlightForm?: string;
  isAuthenticated?: boolean;
}

export function BrowseClient({
  highlightCategory,
  highlightForm,
  isAuthenticated = false,
}: BrowseClientProps) {
  const t = useTranslations();
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
    if (!status || status === 'active') return t('forms.status.active');
    return t('forms.status.beta');
  };

  const getCategoryLabel = (category: string) => {
    return t(`forms.category.${category}`) || category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              {t('browse.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('browse.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Pricing Banner */}
        <section className="mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">{t('pricing.title')}</CardTitle>
              <CardDescription className="text-lg mt-2">
                {t('pricing.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">$70</div>
                  <div className="text-sm text-gray-600 mt-1">{t('pricing.oneForm')}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">$120</div>
                  <div className="text-sm text-gray-600 mt-1">{t('pricing.twoForms')}</div>
                  <div className="text-xs text-green-600 font-medium mt-1">{t('pricing.save')} $20</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">$170</div>
                  <div className="text-sm text-gray-600 mt-1">{t('pricing.threeForms')}</div>
                  <div className="text-xs text-green-600 font-medium mt-1">{t('pricing.save')} $40</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">$240</div>
                  <div className="text-sm text-gray-600 mt-1">{t('pricing.fourPlusForms')}</div>
                  <div className="text-xs text-green-600 font-medium mt-1">{t('pricing.save')} $40+</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>


        {/* Individual Forms */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              {t('browse.individualForms')}
            </h2>
            <p className="text-muted-foreground">
              {t('browse.individualFormsSubtitle')}
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
                  {category === 'all' ? t('browse.allForms') : getCategoryLabel(category)}
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
                          <span>{t('forms.estimatedTime')}: {form.estimatedTime}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardContent className="pt-0 space-y-2">
                    {isAuthenticated ? (
                      <Button asChild variant="default" className="w-full">
                        <Link href="/dashboard">{t('browse.goToDashboard')}</Link>
                      </Button>
                    ) : (
                      <>
                        <Button asChild variant="default" className="w-full">
                          <Link href="/signup">{t('browse.signUpToStart')}</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full" size="sm">
                          <Link href={`/preview/${form.id}`}>{t('browse.tryPreview')}</Link>
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {filteredForms.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                {t('browse.noFormsFound')}
              </p>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
