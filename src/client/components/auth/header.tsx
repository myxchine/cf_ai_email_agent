import Logo from "@/client/components/logo";
export default function AuthHeader({ name }: { name: string }) {
  return (
    <div className="flex flex-row  w-full gap-8 bg-transparent border-b border-black/10 p-6 py-4">
      <div className="w-full flex flex-row items-center justify-start text-sm md:text-lg gap-3 md:gap-4 ">
        <Logo />
        <div className="flex flex-row items-center justify-start gap-2 -mb-1 md:mb-0">
          <span className="text-black/40">{" / "}</span>
          {name}
          <div className="w-fit border border-black/10 rounded-full px-2 py-1 bg-black/5 text-black/40 text-xs md:text-sm">
            Free
          </div>
        </div>
      </div>
    </div>
  );
}
