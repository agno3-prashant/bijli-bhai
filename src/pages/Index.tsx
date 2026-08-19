import { MadeWithDyad } from '@/components/made-with-dyad'
import { useEffect, useState } from 'react'
import { getServiceCategories, ServiceCategory } from '@/services/serviceCategoryService'

const Index = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true)
        const data = await getServiceCategories()
        setCategories(data)
        setError(null)
      } catch (err) {
        console.error('Failed to load categories:', err)
        setError('Failed to load service categories. Please check your connection.')
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-pulse">
            <svg className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
          </div>
          <p className="mt-4 text-gray-500">Loading BijliBhai services...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold flex items-center">
                  <span className="mr-2">⚡</span>
                  BijliBhai
                </span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className="hover:text-navy-200 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                  <a href="#" className="hover:text-navy-200 px-3 py-2 rounded-md text-sm font-medium">Services</a>
                  <a href="#" className="hover:text-navy-200 px-3 py-2 rounded-md text-sm font-medium">How It Works</a>
                  <a href="#" className="hover:text-navy-200 px-3 py-2 rounded-md text-sm font-medium">Electricians</a>
                  <a href="#" className="hover:text-navy-200 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                </div>
              </div>
            </div>
            <div className="flex items-center md:hidden">
              {/* Mobile menu button would go here */}
              <button className="p-2 rounded-md hover:bg-navy-800">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-navy-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">
            Bijli ka kaam?<br className="hidden md:inline" />Bhai ko bulao.
          </h1>
          <p className="text-xl mb-8">
            Verified local electricians, clear pricing aur fast doorstep service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="flex-1 px-6 py-3 bg-yellow-400 text-navy-900 font-semibold rounded-md hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
            >
              <span>⚡</span> Electrician Bulayein
            </button>
            <button 
              className="flex-1 px-6 py-3 border border-navy-200 text-navy-200 hover:bg-nanny-50 flex items-center justify-center gap-2"
            >
              <span>💬</span> WhatsApp Karein
            </button>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="w-full h-12 text-navy-800" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,160L48,171.2C96,182,192,203,288,208C384,213,480,203,576,181.3C672,160,768,123,864,106.7C960,90,1056,90.7,1152,90.7C1248,90.7,1344,90.7,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Service Area Messaging */}
      <section className="bg-navy-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">Serving Kanpur with Pride</h2>
            <p className="text-navy-600">
              Our verified electricians are available across all sectors of Kanpur including 
              Civil Lines, Kidwai Nagar, Barra, Rajajipuram, and more. 
              Enter your pincode to check service availability.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Service Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Popular Electrical Services
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-navy-50"
              >
                <div className="p-6">
                  <div className="flex items-center justify-center h-12 mb-4">
                    {category.icon ? (
                      <span className="text-navy-600 text-2xl">{category.icon}</span>
                    ) : (
                      <span className="text-navy-600 text-2xl">⚡</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">{category.name}</h3>
                  <p className="text-navy-500 text-sm line-clamp-2">
                    {category.description || 'Professional electrical services'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Electrical Problems */}
      <section className="bg-navy-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-10">
            Common Electrical Problems We Solve
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-navy-50">
              <div className="h-10 w-10 flex items-center justify-center bg-navy-100 text-navy-600 rounded-full mb-3">
                ⚡
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">MCB Tripping</h3>
              <p className="text-navy-500 text-sm">
                Frequent circuit breaker trips indicating overload or short circuit
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-navy-50">
              <div className="h-10 w-10 flex items-center justify-center bg-navy-100 text-navy-600 rounded-full mb-3">
                💡
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">Flickering Lights</h3>
              <p className="text-navy-500 text-sm">
                Lights dimming or flickering due to loose connections or voltage issues
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-navy-50">
              <div className="h-10 w-10 flex items-center justify-center bg-navy-100 text-navy-600 rounded-full mb-3">
                🔌
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">Dead Outlets</h3>
              <p className="text-navy-500 text-sm">
                Electrical outlets not working due to wiring issues or tripped GFCI
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-navy-50">
              <div className="h-10 w-10 flex items-center justify-center bg-navy-100 text-navy-600 rounded-full mb-3">
                🌡️
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">Overheating Switches</h3>
              <p className="text-navy-500 text-sm">
                Switches or faceplates hot to touch indicating dangerous wiring
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            How BijliBhai Works
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="h-12 w-12 flex items-center justify-center bg-navy-100 text-navy-600 rounded-full mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Describe Your Problem</h3>
              <p className="text-navy-500">
                Tell us what electrical issue you're facing - from simple repairs to complex installations
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 flex items-center justify-center bg-navy-100 text-navy-600 rounded-full mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Get Instant Quote</h3>
              <p className="text-navy-500">
                Receive transparent pricing upfront - no hidden charges, no surprises
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 flex items-center justify-center bg-navy-100 text-navy-600 rounded-full mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Expert at Your Door</h3>
              <p className="text-navy-500">
                Verified electrician arrives on time, fixes the issue, and ensures safety
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing */}
      <section className="bg-navy-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Transparent Pricing You Can Trust
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-navy-50">
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Fixed Price</h3>
              <p className="text-navy-600">
                Most common services like fan installation, light fitting, or switch replacement have fixed prices you see before booking.
              </p>
              <div className="mt-4 p-3 bg-navy-50 rounded-lg">
                <span className="font-medium">Example:</span> Ceiling Fan Installation - ₹799 (inclusive of material & visit fee)
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-navy-50">
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Starting From Price</h3>
              <p className="text-navy-600">
                For services where complexity varies (like DB upgrades or rewiring), we provide a starting price with final quote after inspection.
              </p>
              <div className="mt-4 p-3 bg-navy-50 rounded-lg">
                <span className="font-medium">Example:</span> DB Upgrade - Starting from ₹2,999 (final price after site check)
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-navy-50">
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Inspection Required</h3>
              <p className="text-navy-600">
                For complex electrical issues, we charge a nominal inspection fee that's adjusted against the final repair cost.
              </p>
              <div className="mt-4 p-3 bg-navy-50 rounded-lg">
                <span className="font-medium">Example:</span> Electrical Inspection - ₹1,499 (adjusted in final bill)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Why Choose BijliBhai?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="h-12 w-12 flex items-center justify-center bg-navy-100 text-navy-600 rounded-full mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Verified Electricians</h3>
              <p className="text-navy-500">
                All our electricians are background checked, skilled, and trained to handle electrical work safely.
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 flex items-center justify-center bg-navy-100 text-navy-600 rounded-full mb-4">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Fast Response</h3>
              <p className="text-navy-500">
                We understand electrical issues can be urgent. Most requests are served within 24 hours.
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 flex items-center justify-center bg-navy-100 text-navy-600 rounded-full mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">No Hidden Charges</h3>
              <p className="text-navy-500">
                What you see is what you pay. All prices include visit fee and standard materials unless specified otherwise.
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 flex items-center justify-center bg-navy-100 text-navy-600 rounded-full mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Quality Guaranteed</h3>
              <p className="text-navy-500">
                We stand behind our work with warranty on labor and materials used in the service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Electrician Partner CTA */}
      <section className="bg-gradient-to-r from-navy-900 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Are You a Skilled Electrician?
          </h2>
          <p className="text-navy-200 mb-8">
            Join our network of verified professionals and get consistent work in your area.
          </p>
          <button 
            className="px-8 py-3 bg-yellow-400 text-navy-900 font-semibold rounded-md hover:bg-yellow-300 transition-colors"
          >
            Register as Electrician Partner
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border border-navy-200 rounded-lg overflow-hidden">
              <div className="bg-navy-50 px-6 py-4 cursor-pointer flex justify-between items-center hover:bg-navy-100 transition-colors" onclick="this.nextElementSibling.classList.toggle('hidden'); this.classList.toggle('bg-navy-100')">
                <h3 className="font-semibold text-navy-900">How do I book an electrician through BijliBhai?</h3>
                <svg className="h-5 w-5 text-navy-500 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <div className="hidden px-6 py-4 text-navy-600">
                Simply visit our website or WhatsApp us, describe your electrical problem, get an instant quote, and schedule a visit at your convenience.
              </div>
            </div>
            <div className="border border-navy-200 rounded-lg overflow-hidden">
              <div className="bg-navy-50 px-6 py-4 cursor-pointer flex justify-between items-center hover:bg-navy-100 transition-colors" onclick="this.nextElementSibling.classList.toggle('hidden'); this.classList.toggle('bg-navy-100')">
                <h3 className="font-semibold text-navy-900">Are your electricians licensed and verified?</h3>
                <svg className="h-5 w-5 text-navy-500 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <div className="hidden px-6 py-4 text-navy-600">
                Yes, all our electricians undergo background checks, skill verification, and training before joining our network. We only partner with certified professionals.
              </div>
            </div>
            <div className="border border-navy-200 rounded-lg overflow-hidden">
              <div className="bg-navy-50 px-6 py-4 cursor-pointer flex justify-between items-center hover:bg-navy-100 transition-colors" onclick="this.nextElementSibling.classList.toggle('hidden'); this.classList.toggle('bg-navy-100')">
                <h3 className="font-semibold text-navy-900">What if I'm not satisfied with the service?</h3>
                <svg className="h-5 w-5 text-navy-500 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <div className="hidden px-6 py-4 text-navy-600">
                We have a satisfaction guarantee. If you're not happy with the work, we'll send another electrician to fix it at no additional cost, or provide a full refund.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-xl font-bold mb-4">BijliBhai</h3>
              <p className="text-navy-300">
                Bijli ka kaam? Bhai ko bulao.<br className="hidden md:inline" />
                Your trusted local electrician service in Kanpur.
              </p>
            </div>
            <div>
              <h4 className="text-navy-200 font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-navy-200 text-navy-300">Light Installation</a></li>
                <li><a href="#" className="hover:text-navy-200 text-navy-300">Fan Servicing</a></li>
                <li><a href="#" className="hover:text-navy-200 text-navy-300">Switch & Socket</a></li>
                <li><a href="#" className="hover:text-navy-200 text-navy-300">MCB & DB Work</a></li>
                <li><a href="#" className="hover:text-navy-200 text-navy-300">Wiring & New Points</a></li>
                <li><a href="#" className="hover:text-navy-200 text-navy-300">AC Electrical</a></li>
                <li><a href="#" className="hover:text-navy-200 text-navy-300">Inverter Service</a></li>
                <li><a href="#" className="hover:text-navy-200 text-navy-300">Electrical Inspection</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-navy-200 font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-navy-200 text-navy-300">About Us</a></li>
                <li><a href="#" className="hover:text-navy-200 text-navy-300">How It Works</a></li>
                <li><a href="#" className="hover:text-navy-200 text-navy-300">Pricing</a></li>
                <li><a href="#" className="hover:text-navy-200 text-navy-300">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-navy-200 text-navy-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-navy-200 text-navy-300">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-navy-200 font-semibold mb-4">Contact</h4>
              <p className="space-y-1 text-navy-300">
                <span className="flex items-center">
                  <span className="mr-2">📍</span> Kanpur, Uttar Pradesh
                </span>
                <span className="flex items-center mt-1">
                  <span className="mr-2">📧</span> info@bijlibhai.in
                </span>
                <span className="flex items-center mt-1">
                  <span className="mr-2">📱</span> WhatsApp: +91 XXXXXXXXXX
                </span>
              </p>
              <div className="mt-4 flex space-x-3">
                <a href="#" className="hover:text-navy-200 text-navy-300">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12.05l-1.454-.635a4.886 4.886 0 00-1.33-1.86l-1.954-2.414a4.886 4.886 0 00-.596-1.826l-2.258-.083A4.87 4.87 0 0012 2.5a4.87 4.87 0 00-5.75 2.18l-2.258.083a4.886 4.886 0 00-.596 1.826l-1.954 2.414a4.886 4.886 0 00-1.33 1.86l-1.454.635a11.044 11.044 0 00-1.017 6.953c0 4.221 3.239 7.764 7.624 8.565.415.075.83.114 1.252.114.637 0 1.245-.05 1.755-.142A11.045 11.045 0 0022 12.05z"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-navy-200 text-navy-300">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-navy-200 text-navy-300">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-navy-800 text-center text-navy-400 text-sm">
            &copy; {new Date().getFullYear()} BijliBhai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index