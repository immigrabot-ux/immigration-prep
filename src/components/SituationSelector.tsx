'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, Heart, Award, Briefcase, FileCheck, Clock, Grid3x3 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Situation {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const situations: Situation[] = [
  {
    id: 'marriage',
    title: "I'm married to a US citizen",
    description: 'Apply for a green card based on marriage to a U.S. citizen',
    icon: <Heart className="h-6 w-6" />,
    href: '/browse?package=marriage_greencard',
    color: 'text-rose-600 bg-rose-50 border-rose-200',
  },
  {
    id: 'citizenship',
    title: 'I want to become a US citizen',
    description: 'Apply for U.S. citizenship through naturalization',
    icon: <Award className="h-6 w-6" />,
    href: '/browse?package=citizenship',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    id: 'employment',
    title: 'Employer is sponsoring me',
    description: 'Employment-based visa or green card sponsorship',
    icon: <Briefcase className="h-6 w-6" />,
    href: '/browse?category=work_authorization',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    id: 'work_permit',
    title: 'I need a work permit',
    description: 'Apply for employment authorization (EAD)',
    icon: <FileCheck className="h-6 w-6" />,
    href: '/browse?form=i-765',
    color: 'text-green-600 bg-green-50 border-green-200',
  },
  {
    id: 'extend_change',
    title: 'Extend/change my visa',
    description: 'Extend stay or change to a different nonimmigrant status',
    icon: <Clock className="h-6 w-6" />,
    href: '/browse?form=i-539',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    id: 'view_all',
    title: 'View all forms',
    description: 'Browse all available USCIS forms and packages',
    icon: <Grid3x3 className="h-6 w-6" />,
    href: '/browse',
    color: 'text-purple-600 bg-purple-50 border-purple-200',
  },
];

export function SituationSelector() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Disclaimer */}
      <Alert className="border-muted-foreground/20">
        <AlertDescription className="text-sm text-muted-foreground">
          <strong>Note:</strong> Select your situation for navigation only. We do not assess eligibility.
          Please consult with an immigration attorney or USCIS to determine your eligibility for any immigration benefit.
        </AlertDescription>
      </Alert>

      {/* Situation Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {situations.map((situation) => (
          <Link key={situation.id} href={situation.href}>
            <Card
              className={cn(
                'h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer border-2',
                'hover:border-primary'
              )}
            >
              <CardHeader className="pb-3">
                <div
                  className={cn(
                    'h-12 w-12 rounded-lg flex items-center justify-center mb-3 border',
                    situation.color
                  )}
                >
                  {situation.icon}
                </div>
                <CardTitle className="text-lg leading-tight">
                  {situation.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {situation.description}
                </CardDescription>
                <div className="flex items-center text-sm font-medium text-primary">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
