import { Link } from "react-router";

export default function Logo() {
  return (
    <Link
      to="/"
      className="tracking-[-1px] w-fit items-end justify-center font-medium text-2xl md:text-3xl text-accent flex  flex-row gap-0  "
    >
      <img
        src="/logo.svg"
        alt="Vesqa Logo"
        fetchPriority="high"
        className="w-[35px] h-auto md:w-[50px]"
      />
      <span className="-mb-1 md:mb-0 text-3xl md:text-4xl italic font-bold tracking-tighter">
        Mail
      </span>
    </Link>
  );
}

export function LogoDashboard() {
  return (
    <Link
      to="/dashboard"
      className="tracking-[-1px] w-fit font-medium text-2xl md:text-3xl text-accent flex items-center flex-row gap-3 mx-0 md:mx-0"
    >
      <img
        src="/logo.svg"
        alt="Vesqa Logo"
        fetchPriority="high"
        className="w-[50px] h-auto md:w-[60px]"
      />
    </Link>
  );
}

export function LogoFooter() {
  return (
    <Link
      to="/"
      className="tracking-[-1px]  font-medium text-base md:text-xl text-black flex items-end flex-row gap-0"
    >
      <img
        src="/logo.svg"
        alt="Vesqa Logo"
        fetchPriority="high"
        className="w-[30px] h-auto md:w-[50px]"
      />
      <span className="text-4xl italic font-bold tracking-tighter">Vault</span>
    </Link>
  );
}
