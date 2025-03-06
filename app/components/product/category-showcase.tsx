"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Mock data for categories
const categories = [
  {
    id: "gaming",
    name: "Gaming",
    description: "High-performance gaming gear for the ultimate experience",
    image: "/images/categories/gaming.jpg",
    subcategories: ["Consoles", "Peripherals", "Audio", "Accessories"],
  },
  {
    id: "computers",
    name: "Computers",
    description: "Powerful computers and components for work and play",
    image: "/images/categories/computers.jpg",
    subcategories: ["Laptops", "Desktops", "Components", "Monitors"],
  },
  {
    id: "networking",
    name: "Networking",
    description: "Reliable networking equipment for seamless connectivity",
    image: "/images/categories/networking.jpg",
    subcategories: ["Routers", "Switches", "Access Points", "Adapters"],
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Essential accessories to enhance your tech experience",
    image: "/images/categories/accessories.jpg",
    subcategories: ["Cables", "Adapters", "Cases", "Power"],
  },
];

export function CategoryShowcase() {
  return (
    <section className="container py-12 md:py-24">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter">Shop by Category</h2>
          <p className="text-muted-foreground">
            Browse our extensive collection of tech products by category.
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={`/shop/${category.id}`}>
              <div className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-lg">
                <div className="aspect-video overflow-hidden bg-muted">
                  <div className="h-full w-full object-cover transition-all group-hover:scale-105 bg-gradient-to-br from-primary/10 to-background flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary/20">{category.name.charAt(0)}</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {category.subcategories.slice(0, 3).map((subcategory) => (
                      <span
                        key={subcategory}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-secondary"
                      >
                        {subcategory}
                      </span>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-secondary">
                        +{category.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">Shop Now</span>
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
                      className="h-4 w-4 text-primary"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 