import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MessageCircle, FileText, Shield } from 'lucide-react';
import { SituationSelector } from '@/components/SituationSelector';
import { AuthButton } from '@/components/auth/AuthButton';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Prepare Your Immigration Forms
            <span className="block text-blue-600">Without Expensive Lawyers</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Self-service platform to prepare USCIS forms. Access all 18 forms with guided assistance. Save thousands on legal fees.
          </p>
          <p className="mt-6 text-sm text-gray-500">
            ⚠️ We are not a law firm. You prepare your own forms using our software.
          </p>
        </div>
      </section>

      {/* Situation Selector */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What's Your Situation?</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Select the option that best describes your situation to get started with the right forms.
          </p>
          <SituationSelector />
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle>Choose Your Forms</CardTitle>
                <CardDescription>
                  Select from 18 USCIS forms or convenient packages tailored to your situation.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <CardTitle>Fill Out Questions</CardTitle>
                <CardDescription>
                  Answer our plain-English questionnaire with auto-save. Resume anytime.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <CardTitle>Download & File</CardTitle>
                <CardDescription>
                  Get your completed forms, checklists, and instructions. Print, sign, and mail.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <FileText className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">18 USCIS Forms</h3>
                <p className="text-gray-600">
                  Access all major USCIS forms with guided questionnaires and step-by-step assistance.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Auto-Save Progress</h3>
                <p className="text-gray-600">
                  Your answers are automatically saved as you type. Resume anytime from where you left off.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <MessageCircle className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Package Deals</h3>
                <p className="text-gray-600">
                  Save time with bundled form packages designed for common immigration situations.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Secure & Private</h3>
                <p className="text-gray-600">
                  Your information is encrypted and never shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Access all 18 USCIS forms with guided assistance and auto-save.
          </p>
          <Link href="/browse">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Browse All Forms
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-4">
              <strong>Disclaimer:</strong> ImmigrationPrep is a self-help software tool. We are NOT a law firm and do NOT provide legal advice. By using this service, you agree that you are preparing your own immigration forms. For legal advice specific to your situation, consult with a licensed immigration attorney.
            </p>
            <div className="flex justify-center gap-6 mt-6">
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="hover:underline">Terms of Service</Link>
              <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
            </div>
            <p className="mt-6">© 2024 ImmigrationPrep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
