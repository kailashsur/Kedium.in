import Link from "next/link";
import style from "./styles/footer.module.css";

import React from "react";

export default function Footer() {
  return (
    <footer className={` ${style.footer}`}>
      <div>Logo</div>
      <div>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/services">Services</Link>
        <Link href="/products">Products</Link>
      </div>
      <hr />
      <div>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/services">Services</Link>
        <Link href="/products">Products</Link>
      </div>
      <hr />
      <div>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/services">Services</Link>
        <Link href="/products">Products</Link>
      </div>

      <div id={`${style.copywrite}`}>© 2024 Kailash Sur</div>
    </footer>
  );
}
