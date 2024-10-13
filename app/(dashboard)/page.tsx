import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Database, PieChart } from 'lucide-react';
import { Terminal } from './terminal';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                Manage Your Finances
                <span className="block text-green-500">Smarter with FinnAI</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Take control of your personal finances with our AI-powered budgeting app. 
                Track expenses, set goals, and receive intelligent insights to improve your financial health.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <a href="#" target="_blank">
                  <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full text-lg px-8 py-4 inline-flex items-center justify-center">
                    Start Budgeting Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <PieChart className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Smart Expense Tracking
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Automatically categorize your expenses and visualize your spending patterns with intuitive charts and graphs.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <Database className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Secure Data Storage
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Your financial data is encrypted and stored securely, giving you peace of mind while managing your budget.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Bank Integration
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Connect your bank accounts for real-time transaction updates and comprehensive financial overview.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Ready to take control of your finances?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                FinnAI provides you with powerful tools and insights to help you budget smarter, 
                save more, and achieve your financial goals. Start your journey to financial freedom today.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <a href="#" target="_blank">
                <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full text-xl px-12 py-6 inline-flex items-center justify-center">
                  Sign Up for Free
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">FinnAI</h3>
              <p className="text-sm text-gray-400">
                Empowering your financial journey with AI-driven insights.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="/pricing" className="text-sm text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/finnAI" className="text-sm text-gray-400 hover:text-white">FinnAI</Link></li>
                <li><Link href="/dashboard" className="text-sm text-gray-400 hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm text-gray-400">
                support@finnai.com<br />
                1234 Finance St.<br />
                Money City, MC 12345
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} FinnAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
