'use client';
import { useState, useTransition } from 'react';

export default function AddToCartButton({ productId }: { productId: number }) {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  async function add() {
    setMsg(null);
    start(async () => {
      const r = await fetch('/api/cart/add-item', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: productId, quantity: 1 }),
      });
      if (!r.ok) {
        setMsg('Failed to add to cart');
        return;
      }
      setMsg('Added to cart');
    });
  }

  return (
    <div style={{display:'flex', gap:12, alignItems:'center'}}>
      <button className="btn" onClick={add} disabled={pending}>
        {pending ? 'Adding…' : 'Add to cart'}
      </button>
      {msg && <small>{msg}</small>}
    </div>
  );
}
