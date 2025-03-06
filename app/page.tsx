import Link from 'next/link';
import QuantumHero from '@/app/components/QuantumHero';
import QuantumProductShowcase from '@/app/components/QuantumProductShowcase';
import DealsSection from '@/app/components/deals/DealsSection';
import { ArrowRight, Zap, ShieldCheck, Cpu, Sparkles } from 'lucide-react';
import { FeaturedProducts } from '@/app/components/product/featured-products';
import { CategoryShowcase } from '@/app/components/product/category-showcase';
import { NewsletterSignup } from '@/app/components/layout/newsletter-signup';
import { SiteHeader } from '@/app/components/layout/site-header';
import { SiteFooter } from '@/app/components/layout/site-footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <QuantumHero />
        
        <section className="py-16 bg-white dark:bg-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-circuit opacity-5"></div>
          
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Quantum Advantages
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
                Future Technology, Available Today
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl">
                Experience the benefits of quantum computing and neural interfaces with our cutting-edge products
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 relative z-10">
                  <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 relative z-10">Quantum Processing</h3>
                <p className="text-gray-600 dark:text-gray-400 relative z-10">
                  Experience computational power beyond classical limits with our quantum processors.
                </p>
                
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 relative z-10">
                  <Cpu className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 relative z-10">Neural Integration</h3>
                <p className="text-gray-600 dark:text-gray-400 relative z-10">
                  Connect your mind directly to our systems with zero latency neural interfaces.
                </p>
                
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="h-12 w-12 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-4 relative z-10">
                  <Sparkles className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 relative z-10">Holographic Displays</h3>
                <p className="text-gray-600 dark:text-gray-400 relative z-10">
                  Visualize data in true 3D space with our advanced holographic technology.
                </p>
                
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 relative z-10">
                  <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 relative z-10">Quantum Security</h3>
                <p className="text-gray-600 dark:text-gray-400 relative z-10">
                  Protect your data with unbreakable quantum encryption technology.
                </p>
                
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-green-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </section>
        
        <QuantumProductShowcase />
        
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-4">
                <Zap className="h-4 w-4 mr-2" />
                Hot Quantum Deals
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600">
                Futuristic Deals from 2080+
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl mb-6">
                Discover incredible savings on our most advanced quantum technology products
              </p>
              
              <Link 
                href="/deals" 
                className="text-blue-600 dark:text-blue-400 font-medium flex items-center hover:underline"
              >
                View all deals
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <DealsSection maxDeals={6} />
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
          
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-scan"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience the Future?
              </h2>
              
              <p className="text-xl mb-8 text-white/80">
                Join the quantum revolution and transform the way you interact with technology
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
                >
                  Explore Products
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
                
                <Link
                  href="/deals"
                  className="px-8 py-4 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center"
                >
                  View Deals
                  <Zap className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedProducts />
        <CategoryShowcase />
        <section className="container py-12 md:py-24 lg:py-32 bg-card rounded-lg my-12">
          <div className="mx-auto grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join Our Affiliate Program
              </h2>
              <p className="text-muted-foreground sm:text-lg">
                Earn commissions by promoting our products. Our affiliate program offers competitive rates and real-time tracking.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/affiliate"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Become an Affiliate
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-[300px] animate-float">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary/50 opacity-20 blur-3xl"></div>
                <div className="relative flex h-full w-full items-center justify-center rounded-full bg-card p-8 shadow-lg animate-glow">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">Up to 15%</h3>
                    <p className="text-muted-foreground">Commission Rate</p>
                    <div className="mt-4 flex justify-center">
                      <div className="h-1 w-12 rounded-full bg-primary"></div>
                    </div>
                    <p className="mt-4 text-sm">30-Day Cookie Window</p>
                    <p className="text-sm">Real-time Analytics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <NewsletterSignup />
      </main>
      <SiteFooter />
    </div>
  );
} 