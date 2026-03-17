import Image from "next/image";
import Link from "next/link";
import { LiaGamepadSolid } from "react-icons/lia";

export default function Header() {
    return (
        <header className="w-full h-28 bg-slate-100 text-black px-2">
            <div className="max-w-screen-xl mx-auto flex justify-center items-center h-full">
                <nav className="flex justify-center items-center gap-4">
                    <Link href={'/'}>
                        <Image
                            src={'/logo.svg'}
                            alt="Logo"
                            width={150}
                            height={50}
                            quality={100}
                        />
                    </Link>
                    <Link href={"/games"}>
                        Games
                    </Link>
                    <Link href={"/profile"}>
                        Profile
                    </Link>
                </nav>
                <div className="hidden sm:flex justify-center items-center ml-auto">
                    <Link href={"/profile"}>
                        <LiaGamepadSolid size={32} color="#475569" />
                    </Link>
                </div>
            </div>
        </header>
    );
}