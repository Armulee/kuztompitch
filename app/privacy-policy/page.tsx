import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Privacy Policy | Kuztompitch",
    description: "Learn how Kuztompitch collects, uses, and protects your personal information when you use our custom microphone and band equipment services.",
}

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
                        Privacy Policy
                    </h1>
                    
                    <div className="text-sm text-gray-400 mb-8 text-center">
                        Last updated: {new Date().toLocaleDateString()}
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">1. Information We Collect</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                                    <p className="text-gray-300">
                                        When you create an account, place an order, or contact us, we may collect:
                                    </p>
                                    <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
                                        <li>Name and contact information (email, phone number, address)</li>
                                        <li>Payment information (processed securely through our payment partners)</li>
                                        <li>Custom design preferences and specifications</li>
                                        <li>Communication history with our support team</li>
                                    </ul>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
                                    <p className="text-gray-300">
                                        We automatically collect certain information when you use our website:
                                    </p>
                                    <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
                                        <li>IP address and device information</li>
                                        <li>Browser type and version</li>
                                        <li>Pages visited and time spent on our site</li>
                                        <li>Referring website information</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">2. How We Use Your Information</h2>
                            <p className="text-gray-300 mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>Process and fulfill your custom microphone orders</li>
                                <li>Provide customer support and respond to your inquiries</li>
                                <li>Send you order updates and shipping notifications</li>
                                <li>Improve our website and services</li>
                                <li>Send marketing communications (with your consent)</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">3. Information Sharing</h2>
                            <p className="text-gray-300 mb-4">
                                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>With service providers who assist us in operating our business (e.g., payment processors, shipping companies)</li>
                                <li>When required by law or to protect our rights</li>
                                <li>In connection with a business transfer or acquisition</li>
                                <li>With your explicit consent</li>
                            </ul>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">4. Data Security</h2>
                            <p className="text-gray-300 mb-4">
                                We implement appropriate security measures to protect your personal information:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>SSL encryption for data transmission</li>
                                <li>Secure servers and databases</li>
                                <li>Regular security audits and updates</li>
                                <li>Limited access to personal information on a need-to-know basis</li>
                                <li>Secure payment processing through trusted partners</li>
                            </ul>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">5. Cookies and Tracking</h2>
                            <p className="text-gray-300 mb-4">
                                We use cookies and similar technologies to enhance your experience on our website:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>Essential cookies for website functionality</li>
                                <li>Analytics cookies to understand website usage</li>
                                <li>Marketing cookies to provide relevant content (with consent)</li>
                            </ul>
                            <p className="text-gray-300 mt-4">
                                You can control cookie settings through your browser preferences.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">6. Your Rights</h2>
                            <p className="text-gray-300 mb-4">
                                Depending on your location, you may have the following rights regarding your personal information:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>Access to your personal information</li>
                                <li>Correction of inaccurate information</li>
                                <li>Deletion of your personal information</li>
                                <li>Portability of your data</li>
                                <li>Objection to processing of your information</li>
                                <li>Withdrawal of consent</li>
                            </ul>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">7. Data Retention</h2>
                            <p className="text-gray-300">
                                We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law. Order information is typically retained for 7 years for accounting and legal purposes.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">8. Children&apos;s Privacy</h2>
                            <p className="text-gray-300">
                                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">9. Changes to This Policy</h2>
                            <p className="text-gray-300">
                                We may update this privacy policy from time to time. We will notify you of any material changes by posting the new privacy policy on this page and updating the &quot;Last updated&quot; date. Your continued use of our services after any changes constitutes acceptance of the updated policy.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">10. Contact Us</h2>
                            <p className="text-gray-300 mb-4">
                                If you have any questions about this privacy policy or our data practices, please contact us:
                            </p>
                            <div className="space-y-2 text-gray-300">
                                <p><strong>Email:</strong> privacy@kuztompitch.com</p>
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