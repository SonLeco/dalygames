import Link from "next/link";
import Image from "next/image";
import { BiRightArrowCircle } from "react-icons/bi";
import type { GameProps } from '@/utils/types/game';

interface GameCardProps {
    data: GameProps;
}


export default function GameCard({ data }: GameCardProps) {
    return (
        <Link href={`/game/${data.id}`}>
            <section className="w-full bg-slate-200 rounded-lg p-4 mb-5">
                <div className="relative w-full h-56">
                    <Image
                        className="rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                        src={data.image_url}
                        alt={data.title}
                        fill
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 4vw"
                    />
                </div>
                <div className="flex items-center mt-4 justify-between">
                    <p className="text-sm font-bold px-2 text-black text-ellipsis truncate whitespace-nowrap overflow-hidden">{data.title}</p>
                    <BiRightArrowCircle size={24} className="mt-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"/>
                </div>
            </section>
        </Link>
    )
}