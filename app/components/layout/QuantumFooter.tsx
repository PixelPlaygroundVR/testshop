'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

export default function QuantumFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
      
      {/* Animated scan line */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"
        animate={{ 
          top: ['-100%', '100%'],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Top border with animation */}
      <div className="relative h-1 w-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
        <motion.div 
          className="absolute top-0 left-0 h-full w-20 bg-white/30"
          animate={{ 
            left: ['-5%', '105%'],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mr-3">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Pixel Playgrounds</h3>
            </div>
            
            <p className="text-gray-400 mb-4">
              The future of technology, available today. Experience quantum computing, neural interfaces, and holographic displays.
            </p>
            
            <div className="flex space-x-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-400" />
              Quick Links
            </h3>
            
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Products
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
              Categories
            </h3>
            
            <ul className="space-y-2">
              <li>
                <Link href="/category/quantum-computing" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Quantum Computing
                </Link>
              </li>
              <li>
                <Link href="/category/neural-interfaces" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Neural Interfaces
                </Link>
              </li>
              <li>
                <Link href="/category/holographic-displays" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Holographic Displays
                </Link>
              </li>
              <li>
                <Link href="/category/quantum-security" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Quantum Security
                </Link>
              </li>
              <li>
                <Link href="/category/ai-systems" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  AI Systems
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-green-400" />
              Stay Updated
            </h3>
            
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest quantum technology updates and exclusive deals.
            </p>
            
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-r-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} Pixel Playgrounds. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-500 hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-gray-300 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
        
        {/* Quantum certification */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 text-gray-400 text-sm">
            <Cpu className="h-4 w-4 mr-2 text-blue-400" />
            <span>Powered by Quantum Technology</span>
            <div className="ml-2 h-2 w-2 rounded-full bg-blue-500 animate-pulse-glow"></div>
          </div>
        </div>
      </div>
    </footer>
  );
} 