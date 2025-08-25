'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Car, Wrench, BarChart3, Users, Clock, Shield } from 'lucide-react'
import { TruemoveLogo } from '@/components/ui/truemove-logo'
import { Button } from '@/components/ui/button'

export function LandingPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <TruemoveLogo size="md" />
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-[#A6192E] transition-colors">Features</button>
              <button onClick={() => scrollToSection('benefits')} className="text-gray-600 hover:text-[#A6192E] transition-colors">Benefits</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-[#A6192E] transition-colors">About</button>
              <Link href="/login">
                <Button className="bg-[#A6192E] hover:bg-[#A6192E]/90 text-white">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden" style={{ backgroundColor: '#C4D030' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mb-8">
              <TruemoveLogo size="lg" className="justify-center mb-6" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Revolutionize Your <br />
              <span className="text-[#A6192E]">Garage Management</span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Streamline vehicle service operations, track work orders, and manage your garage with the most advanced management system built for modern automotive businesses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login">
                <Button className="bg-[#A6192E] hover:bg-[#A6192E]/90 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="border-[#A6192E] text-[#A6192E] hover:bg-[#A6192E] hover:text-white px-8 py-4 text-lg font-semibold rounded-lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#A6192E] rounded-full opacity-20 transform rotate-45"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full opacity-30"></div>
      </section>

      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Garages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your automotive business efficiently and professionally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#C4D030] rounded-lg flex items-center justify-center mb-6">
                <Car className="h-6 w-6 text-[#A6192E]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Management</h3>
              <p className="text-gray-600">
                Complete vehicle tracking system with detailed history, customer information, and maintenance records.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#C4D030] rounded-lg flex items-center justify-center mb-6">
                <Wrench className="h-6 w-6 text-[#A6192E]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Work Order Tracking</h3>
              <p className="text-gray-600">
                Streamlined workflow management from initial assessment to completion with real-time status updates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#C4D030] rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-[#A6192E]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics & Reporting</h3>
              <p className="text-gray-600">
                Comprehensive dashboards and reports to track performance, revenue, and operational efficiency.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#C4D030] rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-[#A6192E]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Portal</h3>
              <p className="text-gray-600">
                Modern customer interface for booking appointments, tracking service progress, and payment processing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#C4D030] rounded-lg flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-[#A6192E]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Updates</h3>
              <p className="text-gray-600">
                Instant notifications and updates across all departments for seamless communication and coordination.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#C4D030] rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-[#A6192E]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Reliable</h3>
              <p className="text-gray-600">
                Enterprise-grade security with automated backups and 99.9% uptime guarantee for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose <span className="text-[#A6192E]">Truemove?</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Transform your garage operations with cutting-edge technology designed specifically for automotive service businesses.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-[#A6192E] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Increase Efficiency by 40%</h3>
                    <p className="text-gray-600">Streamlined workflows and automated processes reduce manual work and errors.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-[#A6192E] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Boost Customer Satisfaction</h3>
                    <p className="text-gray-600">Real-time updates and transparent communication keep customers informed and happy.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-[#A6192E] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Reduce Operational Costs</h3>
                    <p className="text-gray-600">Optimize resource allocation and minimize waste through data-driven insights.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-[#A6192E] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Scale Your Business</h3>
                    <p className="text-gray-600">Built to grow with your business from single garage to multi-location operations.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#C4D030] to-[#A6192E] p-8 rounded-2xl shadow-2xl">
                <div className="bg-white p-6 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#A6192E] mb-2">1000+</div>
                    <div className="text-gray-600 mb-4">Garages Trust Truemove</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-gray-900">99.9%</div>
                      <div className="text-sm text-gray-600">Uptime</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">24/7</div>
                      <div className="text-sm text-gray-600">Support</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">40%</div>
                      <div className="text-sm text-gray-600">Efficiency Gain</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">50+</div>
                      <div className="text-sm text-gray-600">Features</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#C4D030' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Garage?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join thousands of garage owners who have revolutionized their operations with Truemove.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button className="bg-[#A6192E] hover:bg-[#A6192E]/90 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 text-lg font-semibold rounded-lg">
              Schedule Demo
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <TruemoveLogo size="md" variant="white" className="mb-4" />
              <p className="text-gray-400">
                The most advanced garage management system for modern automotive businesses.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Truemove. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}