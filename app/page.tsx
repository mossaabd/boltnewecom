import { Suspense } from 'react';
import ProductGrid from '@/components/ProductGrid';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductGrid />
        </Suspense>
      </main>
    </div>
  );
}