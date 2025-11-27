'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AuthButton } from '@/components/auth/AuthButton';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslations } from 'next-intl';

export function Navigation() {
  const t = useTranslations('nav');

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="font-bold text-2xl text-blue-600">
            ImmigrationPrep
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/browse">
              <Button variant="ghost" className="text-base font-medium">
                {t('browseForms')}
              </Button>
            </Link>
            <LanguageSwitcher />
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
