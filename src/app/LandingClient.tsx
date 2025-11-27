'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MessageCircle, FileText, Shield } from 'lucide-react';
import { SituationSelector } from '@/components/SituationSelector';
import { useTranslations } from 'next-intl';

export function LandingClient() {
  const t = useTranslations('landing');

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>{t('trustBadge')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
            {t('heroTitle')}
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t('heroTitleHighlight')}
            </span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/browse">
              <Button size="lg" className="text-lg px-10 py-7 bg-blue-600 hover:bg-blue-700 shadow-lg">
                {t('getStarted')}
              </Button>
            </Link>
            <Link href="/browse">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2">
                {t('browseAllForms')}
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 inline-block">
            {t('disclaimer')}
          </p>
        </div>
      </section>

      {/* Situation Selector */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">{t('situationTitle')}</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            {t('situationSubtitle')}
          </p>
          <SituationSelector />
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">{t('howItWorksTitle')}</h2>
          <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
            {t('howItWorksSubtitle')}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <CardTitle className="text-xl mb-3">{t('step1Title')}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t('step1Description')}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <CardTitle className="text-xl mb-3">{t('step2Title')}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t('step2Description')}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <CardTitle className="text-xl mb-3">{t('step3Title')}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t('step3Description')}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('featuresTitle')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <FileText className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">{t('feature1Title')}</h3>
                <p className="text-gray-600">{t('feature1Description')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">{t('feature2Title')}</h3>
                <p className="text-gray-600">{t('feature2Description')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MessageCircle className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">{t('feature3Title')}</h3>
                <p className="text-gray-600">{t('feature3Description')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">{t('feature4Title')}</h3>
                <p className="text-gray-600">{t('feature4Description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.2))]"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/browse">
              <Button size="lg" variant="secondary" className="text-lg px-10 py-7 bg-white text-blue-600 hover:bg-gray-100 shadow-xl font-semibold">
                {t('browseAllForms')}
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-white text-white hover:bg-white/10">
                {t('createAccount')}
              </Button>
            </Link>
          </div>
          <p className="mt-10 text-blue-200 text-sm">
            {t('ctaBenefits')}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-4">
              <strong>{t('footerDisclaimerTitle')}</strong> {t('footerDisclaimerText')}
            </p>
            <div className="flex justify-center gap-6 mt-6">
              <Link href="/privacy" className="hover:underline">{t('privacyPolicy')}</Link>
              <Link href="/terms" className="hover:underline">{t('termsOfService')}</Link>
              <Link href="/disclaimer" className="hover:underline">{t('disclaimer')}</Link>
            </div>
            <p className="mt-6">{t('copyright')}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
