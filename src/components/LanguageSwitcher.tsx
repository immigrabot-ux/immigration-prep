'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const [locale, setLocale] = useState(currentLocale);

  useEffect(() => {
    // Load locale from localStorage on mount
    const savedLocale = localStorage.getItem('locale') || 'en';
    if (savedLocale !== locale) {
      setLocale(savedLocale);
      // Trigger locale change
      document.cookie = `NEXT_LOCALE=${savedLocale}; path=/; max-age=31536000`;
      window.location.reload();
    }
  }, []);

  const switchLocale = (newLocale: string) => {
    // Save to localStorage
    localStorage.setItem('locale', newLocale);
    // Set cookie for server-side
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    setLocale(newLocale);
    // Reload to apply new locale
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="font-medium">{locale === 'en' ? 'EN' : 'ES'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => switchLocale('en')}
          className={locale === 'en' ? 'bg-accent' : ''}
        >
          <span className="mr-2">🇺🇸</span> English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLocale('es')}
          className={locale === 'es' ? 'bg-accent' : ''}
        >
          <span className="mr-2">🇪🇸</span> Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
