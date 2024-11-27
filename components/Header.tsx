'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';

export default function Header() {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">E-Commerce Store</h1>
        </Link>
        <Link href="/cart">
          <Button variant="outline" className="relative">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
}