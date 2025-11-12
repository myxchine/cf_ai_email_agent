"use client";

import { useLocation } from "react-router";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Use Cases", href: "/#use-cases" },
  { name: "Features", href: "/#features" },
  { name: "Why AI?", href: "/#why" }
];

export default function Nav({ className }: { className?: string }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className={className}>
      {navigation.map((item) => (
        <a
          key={`nav-${item.href}`}
          href={item.href}
          className={`  text-base uppercase hover:text-accent hover:border-b-accent  w-fit items-center text-center transition-all duration-300 ease-in-out ${
            pathname === item.href
              ? "text-accent border-b-accent"
              : "text-black/40 border-b-transparent"
          }
          `}
        >
          {item.name}
        </a>
      ))}
    </nav>
  );
}
