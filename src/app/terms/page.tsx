import React from 'react';

export default function TermsOfService() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="mb-4">Last updated: November 27, 2025</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                <p className="mb-4">
                    By accessing or using the ImmigrationPrep website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Disclaimer: Not Legal Advice</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <p className="font-bold text-yellow-800">IMPORTANT NOTICE</p>
                    <p className="text-yellow-700">
                        ImmigrationPrep is a self-help software tool. We are NOT a law firm and do NOT provide legal advice. We are not a substitute for an attorney or law firm.
                    </p>
                </div>
                <p className="mb-4">
                    Your use of this site and any forms or information provided does not create an attorney-client relationship between you and ImmigrationPrep. You are representing yourself in any legal matter you undertake through our service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Use License</h2>
                <p className="mb-4">
                    Permission is granted to temporarily download one copy of the materials (information or software) on ImmigrationPrep's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>modify or copy the materials;</li>
                    <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                    <li>attempt to decompile or reverse engineer any software contained on ImmigrationPrep's website;</li>
                    <li>remove any copyright or other proprietary notations from the materials; or</li>
                    <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Refund Policy</h2>
                <p className="mb-4">
                    We offer a satisfaction guarantee. If you are not satisfied with our service, please contact us within 30 days of purchase for a refund. Note that government filing fees paid directly to USCIS are non-refundable by us.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Limitations</h2>
                <p className="mb-4">
                    In no event shall ImmigrationPrep or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ImmigrationPrep's website.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
                <p className="mb-4">
                    These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </p>
            </section>
        </div>
    );
}
