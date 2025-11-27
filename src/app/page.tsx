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
      <nav className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="font-bold text-2xl text-blue-600">
              ImmigrationPrep
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/browse">
                <Button variant="ghost" className="text-base font-medium">Browse Forms</Button>
              </Link>
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Trusted by 10,000+ Applicants</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
            Immigration Forms
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Made Simple</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Prepare USCIS forms yourself with guided assistance. No lawyer needed. Save thousands.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/browse">
              <Button size="lg" className="text-lg px-10 py-7 bg-blue-600 hover:bg-blue-700 shadow-lg">
                Get Started Free
              </Button>
            </Link>
            <Link href="/browse">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2">
                Browse All Forms
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 inline-block">
            ⚠️ We are not a law firm. You prepare your own forms using our software.
          </p>
        </div>
      </section>

      {/* Situation Selector */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">What's Your Situation?</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Select the option that best describes your situation to get started with the right forms.
          </p>
          <SituationSelector />
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">How It Works</h2>
          <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
            Three simple steps to prepare your immigration forms
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <CardTitle className="text-xl mb-3">Choose Your Forms</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Select from 18 USCIS forms or convenient packages tailored to your specific immigration situation.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <CardTitle className="text-xl mb-3">Answer Questions</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Fill out our plain-English questionnaire with auto-save. Resume anytime from where you left off.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <CardTitle className="text-xl mb-3">Download & File</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Get your completed, USCIS-ready forms with instructions. Print, sign, and mail to USCIS.
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
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.2))]"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join thousands who have successfully prepared their immigration forms with ImmigrationPrep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/browse">
              <Button size="lg" variant="secondary" className="text-lg px-10 py-7 bg-white text-blue-600 hover:bg-gray-100 shadow-xl font-semibold">
                Browse All Forms
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-white text-white hover:bg-white/10">
                Create Free Account
              </Button>
            </Link>
          </div>
          <p className="mt-10 text-blue-200 text-sm">
            ✓ No credit card required  ✓ Start for free  ✓ 24/7 access
          </p>
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
