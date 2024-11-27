'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useCart();

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product._id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <p className="mt-2 text-gray-600">{product.description}</p>
            <p className="mt-2 text-xl font-bold">${product.price}</p>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Link href={`/products/${product._id}`} className="flex-1">
              <Button variant="outline" className="w-full">View Details</Button>
            </Link>
            <Button 
              className="flex-1"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}