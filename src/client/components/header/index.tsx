import Mobile from "./mobile";
import Desktop from "./desktop";
export default function Header() {
  return (
    <header className="w-full  flex flex-col sticky top-0 z-1000000   backdrop-blur-sm">
      <div className="flex flex-col w-full bg-linear-to-b from-white border-b border-black/20 to-white/20 overflow-hidden text-foreground">
        <div className="max-w-(--header-width) mx-auto w-full">
          <Mobile />
          <Desktop />
        </div>
      </div>
    </header>
  );
}
