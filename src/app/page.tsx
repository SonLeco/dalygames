import InputSearch from "@/components/InputSearch";
import { Container } from "../components/Container";
import type { GameProps } from '@/utils/types/game';
import Image from "next/image";
import Link from "next/link";

import { BsArrowRightSquare } from 'react-icons/bs';
import GameCard from "@/components/GameCard";

async function getDalyGames() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 320 } }
    );
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  } catch(err) {
    throw new Error('Failed to fetch DalyGames' + err);
  }
}

async function getGamesData() {
    try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`,
      { next: { revalidate: 320 } }
    );
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  } catch(err) {
    throw new Error('Failed to fetch DalyGames' + err);
  }

}

export default async function Home() {
  const dalyGame: GameProps = await getDalyGames();
  const gamesData: GameProps[] = await getGamesData();

  return (
      <main className="w-full">
        <Container>
          <h1 className="text-4xl font-bold mt-8 mb-4">Bem vindo ao DalyGames!</h1>
          <Link href={`/game/${dalyGame.id}`}>
            <section className="w-full bg-black rounded-xl">
              <div className="w-full max-h-96 h-96 relative">
                <div className="absolute z-20 bottom-0 p-3 flex justify-center items-center gap-4">
                  <p className="font-bold text-white text-xl">{dalyGame.title}</p>
                  <BsArrowRightSquare className="text-white text-2xl" size={24}/>
                </div>
                <Image
                  src={dalyGame.image_url}
                  alt={dalyGame.title}
                  quality={100}
                  priority
                  fill
                  className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 4vw" 
                />
              </div>
            </section>
          </Link>
          <InputSearch />
          <h2 className="text-4xl font-bold mt-8 mb-4">Lista de jogos</h2>
          <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {gamesData.map((game) => (
              <GameCard key={game.id} data={game} />
            ))}
          </section>
        </Container>
      </main>
  );
}
