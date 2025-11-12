import Nav from "./nav";
import Logo from "@/client/components/logo";
import AccountButton from "./accountButton";
export default function Menu() {
  return (
    <div className="md:flex hidden flex-row items-center justify-between w-full gap-8 bg-transparent p-6 py-4">
      <div className="w-2/6 flex flex-row items-center justify-start gap-8">
        <Logo />
      </div>
      <div className="w-3/6">
        <Nav className="flex flex-row gap-8 w-fit justify-center items-center mx-auto" />
      </div>
      <div className="flex flex-row gap-8 w-2/6 justify-end items-center">
        <AccountButton />
      </div>
    </div>
  );
}
