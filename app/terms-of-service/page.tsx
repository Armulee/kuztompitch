import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Terms of Service | Kuztompitch",
    description: "Read the terms and conditions for using Kuztompitch custom microphone and band equipment services. Understand your rights and responsibilities.",
}

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
                        Terms of Service
                    </h1>
                    
                    <div className="text-sm text-gray-400 mb-8 text-center">
                        Last updated: {new Date().toLocaleDateString()}
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">1. Acceptance of Terms</h2>
                            <p className="text-gray-300">
                                By accessing and using the Kuztompitch website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">2. Description of Service</h2>
                            <p className="text-gray-300 mb-4">
                                Kuztompitch provides custom microphone and band equipment design and manufacturing services. Our services include:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>Custom microphone design and manufacturing</li>
                                <li>Band equipment customization</li>
                                <li>Design consultation and planning</li>
                                <li>Product delivery and setup assistance</li>
                                <li>Customer support and maintenance services</li>
                            </ul>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">3. Orders and Customization</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Order Process</h3>
                                    <p className="text-gray-300">
                                        All orders are subject to acceptance by Kuztompitch. We reserve the right to refuse any order at our sole discretion. Custom orders require detailed specifications and may require additional consultation.
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Design Approval</h3>
                                    <p className="text-gray-300">
                                        Custom designs must be approved by both parties before production begins. Any changes after approval may result in additional charges and extended delivery times.
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Production Timeline</h3>
                                    <p className="text-gray-300">
                                        Production times vary based on complexity and current order volume. We will provide estimated delivery dates, but these are not guaranteed and may be subject to change.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">4. Payment Terms</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Payment Methods</h3>
                                    <p className="text-gray-300">
                                        We accept major credit cards, PayPal, and bank transfers. Payment is required before production begins for custom orders.
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                                    <p className="text-gray-300">
                                        All prices are subject to change without notice. Custom orders will be quoted individually based on specifications and materials required.
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Refunds</h3>
                                    <p className="text-gray-300">
                                        Due to the custom nature of our products, refunds are only available for unused items in original condition within 30 days of delivery. Custom items that have been used or modified cannot be returned.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">5. Intellectual Property</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Customer Designs</h3>
                                    <p className="text-gray-300">
                                        Customers retain ownership of their original designs and concepts. By submitting designs to Kuztompitch, you grant us a license to use, modify, and reproduce the design for the purpose of fulfilling your order.
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Kuztompitch Intellectual Property</h3>
                                    <p className="text-gray-300">
                                        All Kuztompitch designs, processes, and proprietary information remain our intellectual property. Customers may not reproduce, distribute, or use our designs for commercial purposes without written permission.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">6. Warranty and Support</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Product Warranty</h3>
                                    <p className="text-gray-300">
                                        All custom microphones come with a 1-year warranty covering manufacturing defects. The warranty does not cover damage from misuse, accidents, or normal wear and tear.
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Support Services</h3>
                                    <p className="text-gray-300">
                                        We provide technical support and maintenance services for our products. Support is available during business hours and may be subject to additional charges for services outside the warranty period.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">7. Limitation of Liability</h2>
                            <p className="text-gray-300 mb-4">
                                To the maximum extent permitted by law, Kuztompitch shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>Loss of profits or revenue</li>
                                <li>Loss of data or information</li>
                                <li>Business interruption</li>
                                <li>Personal injury or property damage</li>
                                <li>Any other damages arising from the use of our products or services</li>
                            </ul>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">8. Indemnification</h2>
                            <p className="text-gray-300">
                                You agree to indemnify and hold harmless Kuztompitch, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of our products or services, violation of these terms, or infringement of any third-party rights.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">9. Privacy and Data Protection</h2>
                            <p className="text-gray-300">
                                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices regarding the collection and use of your personal information.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">10. Termination</h2>
                            <p className="text-gray-300">
                                We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will cease immediately.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">11. Governing Law</h2>
                            <p className="text-gray-300">
                                These Terms shall be interpreted and governed by the laws of the State of [Your State], without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of [Your State].
                            </p>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">12. Changes to Terms</h2>
                            <p className="text-gray-300">
                                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on this page and updating the "Last updated" date. Your continued use of our services after any changes constitutes acceptance of the updated terms.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">13. Contact Information</h2>
                            <p className="text-gray-300 mb-4">
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div className="space-y-2 text-gray-300">
                                <p><strong>Email:</strong> legal@kuztompitch.com</p>
                                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                                <p><strong>Address:</strong> 123 Music Street, Audio City, AC 12345</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}