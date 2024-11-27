'use client';

import { useCart } from '@/lib/CartContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { state, dispatch } = useCart();

  const updateQuantity = (_id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { _id, quantity } });
  };

  const removeItem = (_id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: _id });
  };

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          <div className="text-center py-8">
            <p className="text-lg mb-4">Your cart is empty</p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {state.items.map((item) => (
              <Card key={item._id} className="p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-lg">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeItem(item._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div>
            <Card className="p-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}