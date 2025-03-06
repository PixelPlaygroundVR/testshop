"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice: number | null;
  category: string;
  subcategory: string;
  brand: string;
  images: string[];
  stock: number;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/shop/product/${product.id}`}>
      <div className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-lg">
        <div className="aspect-square overflow-hidden bg-muted">
          <div className="h-full w-full object-cover transition-all group-hover:scale-105 bg-gradient-to-br from-primary/5 to-background flex items-center justify-center">
            {/* Placeholder for product image */}
            <div className="text-4xl font-bold text-primary/20">{product.name.charAt(0)}</div>
          </div>
          {product.salePrice && (
            <div className="absolute top-2 right-2 rounded-full bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground">
              Sale
            </div>
          )}
          {product.stock < 10 && (
            <div className="absolute top-2 left-2 rounded-full bg-amber-500 px-2 py-1 text-xs font-medium text-white">
              Low Stock
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </div>
            <div className="text-sm font-medium">
              {product.salePrice ? (
                <div className="flex flex-col items-end">
                  <span className="text-destructive">${product.salePrice.toFixed(2)}</span>
                  <span className="text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span>${product.price.toFixed(2)}</span>
              )}
            </div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
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
                className="h-4 w-4 text-yellow-500 fill-yellow-500"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart functionality would go here
                console.log(`Added ${product.name} to cart`);
              }}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </Link>
  );
} 