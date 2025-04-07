import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function Header({ children, className }) {
  return (
    <header className={cn("header", className)}>
      <Link href="/">
        <Image
          src="/assets/icons/logo.svg"
          alt="logo"
          width={120}
          height={32}
          priority
          className="hidden md:block"
        />
        <Image
          src="/assets/icons/logo-icon.svg"
          alt="logo"
          width={32}
          height={32}
          priority
          className="mr-2 md:hidden"
        />
      </Link>
      {children}
    </header>
  );
}

export default Header;
