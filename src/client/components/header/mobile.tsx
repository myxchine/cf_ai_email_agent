"use client";

import { useState, useEffect } from "react";
import { MenuIcon, CloseIcon } from "@/client/components/icons";
import Logo from "@/client/components/logo";
import Nav from "./nav";
import AccountButton from "./accountButton";
//import { useLocation } from "react-router-dom";
//import { Link } from "react-router-dom";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  //const pathname = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const main = document.getElementById("site-main");
    const footer = document.getElementById("site-footer");
    if (!main) {
      return;
    }

    main.style.display = isOpen ? "none" : "block";

    if (!footer) {
      return;
    }
    footer.style.display = isOpen ? "none" : "block";
  }, [isOpen]);
  return (
    <div
      className={`w-full  md:hidden p-3 px-4 flex flex-col items-center justify-start ${
        isOpen && "h-[calc(100svh-40px)]"
      }`}
    >
      <div className={`grid grid-cols-3 items-center justify-center w-full   `}>
        <Buttons open={isOpen} setIsOpen={setIsOpen} />

        <Logo />
        <div className="ml-auto">
          <AccountButton />
        </div>
      </div>

      {isOpen && <Nav className="flex flex-col items-center gap-4 p-8 pb-4" />}
    </div>
  );
}

function Buttons({ open, setIsOpen }: { open: boolean; setIsOpen: (open: boolean) => void }) {
  if (!open) {
    return (
      <button
        type="button"
        aria-label="Open Mobile Menu"
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-start w-1/3"
      >
        <MenuIcon className="size-5" stroke="currentColor" />
      </button>
    );
  }
  return (
    <button
      type="button"
      aria-label="CLose Mobile Menu"
      className="flex items-center justify-start w-1/3"
      onClick={() => setIsOpen(false)}
    >
      <CloseIcon stroke="currentColor" className="size-5" />
    </button>
  );
}
