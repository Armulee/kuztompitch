import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Customer Support | Kuztompitch",
    description: "Get help with your custom microphone and band equipment orders. Contact our support team for assistance with customization, shipping, and technical questions.",
}

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
                        Customer Support
                    </h1>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-gray-900 p-8 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">Contact Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg">Email Support</h3>
                                    <p className="text-gray-300">support@kuztompitch.com</p>
                                    <p className="text-sm text-gray-400">Response within 24 hours</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Phone Support</h3>
                                    <p className="text-gray-300">+1 (555) 123-4567</p>
                                    <p className="text-sm text-gray-400">Mon-Fri 9AM-6PM EST</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Live Chat</h3>
                                    <p className="text-gray-300">Available on our website</p>
                                    <p className="text-sm text-gray-400">Mon-Fri 9AM-6PM EST</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">Quick Help</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg">Order Status</h3>
                                    <p className="text-gray-300">Track your custom order progress</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Customization Help</h3>
                                    <p className="text-gray-300">Guidance on design options</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Technical Support</h3>
                                    <p className="text-gray-300">Microphone setup and maintenance</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <div className="bg-gray-900 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3 text-blue-400">How long does it take to complete a custom microphone?</h3>
                                <p className="text-gray-300">
                                    Custom microphones typically take 2-4 weeks to complete, depending on the complexity of the design and current order volume. We'll provide you with a detailed timeline when you place your order.
                                </p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3 text-blue-400">What customization options are available?</h3>
                                <p className="text-gray-300">
                                    We offer a wide range of customization options including color schemes, materials, engravings, LED lighting, and unique design elements. Our design team will work with you to bring your vision to life.
                                </p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3 text-blue-400">Do you offer international shipping?</h3>
                                <p className="text-gray-300">
                                    Yes, we ship worldwide. Shipping costs and delivery times vary by location. International orders may be subject to customs duties and taxes in your country.
                                </p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3 text-blue-400">What is your return policy?</h3>
                                <p className="text-gray-300">
                                    Due to the custom nature of our products, we offer a 30-day return policy for unused items in original condition. Custom items that have been used or modified cannot be returned.
                                </p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3 text-blue-400">How do I track my order?</h3>
                                <p className="text-gray-300">
                                    Once your order is processed, you'll receive a tracking number via email. You can also check your order status by logging into your account on our website.
                                </p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3 text-blue-400">Do you offer warranty on custom microphones?</h3>
                                <p className="text-gray-300">
                                    Yes, all our custom microphones come with a 1-year warranty covering manufacturing defects. The warranty covers the microphone itself but not cosmetic damage from normal wear and tear.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
                        <p className="text-lg mb-6">
                            Our support team is here to help you with any questions or concerns about your custom microphone or band equipment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a 
                                href="mailto:support@kuztompitch.com"
                                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                            >
                                Email Us
                            </a>
                            <a 
                                href="tel:+15551234567"
                                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
                            >
                                Call Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}