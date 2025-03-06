"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProductCard } from "@/app/components/product/product-card";

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    name: "Quantum Gaming Headset",
    description: "Immersive 3D audio with noise cancellation",
    price: 129.99,
    salePrice: 99.99,
    category: "Gaming",
    subcategory: "Audio",
    brand: "TechMaster",
    images: ["/images/products/headset.jpg"],
    stock: 15,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Nebula Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with custom switches",
    price: 149.99,
    salePrice: null,
    category: "Gaming",
    subcategory: "Peripherals",
    brand: "Nebula",
    images: ["/images/products/keyboard.jpg"],
    stock: 8,
    rating: 4.9,
  },
  {
    id: "3",
    name: "Horizon Ultra Monitor",
    description: "32-inch 4K curved gaming monitor with 144Hz refresh rate",
    price: 499.99,
    salePrice: 449.99,
    category: "Computers",
    subcategory: "Monitors",
    brand: "Horizon",
    images: ["/images/products/monitor.jpg"],
    stock: 5,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Pulse Gaming Mouse",
    description: "Precision gaming mouse with adjustable DPI and RGB lighting",
    price: 79.99,
    salePrice: 59.99,
    category: "Gaming",
    subcategory: "Peripherals",
    brand: "Pulse",
    images: ["/images/products/mouse.jpg"],
    stock: 20,
    rating: 4.6,
  },
];

export function FeaturedProducts() {
  return (
    <section className="container py-12 md:py-24">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter">Featured Products</h2>
          <p className="text-muted-foreground">
            Our handpicked selection of the latest and greatest tech.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          View All Products
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-4 w-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
} 