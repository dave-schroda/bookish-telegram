import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <nav style={{display:'flex', gap:16}}>
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/cart">Cart</Link>
      </nav>
    </header>
  );
}
