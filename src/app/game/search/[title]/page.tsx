import { Container } from "@/components/Container";
import GameCard from "@/components/GameCard";
import InputSearch from "@/components/InputSearch";
import type { GameProps } from "@/utils/types/game";

async function getData(title: string) {
    try {
        const decodeTitle = decodeURIComponent(title);
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`)
        return res.json();
    }catch(err){
        console.error('Failed to fetch games data for search page' + err);
        return null
    }
}

export default async function Search({ params }: { params: { title: string } }) {
    const { title } = await params;
    const games: GameProps[] = await getData(title);

    return (
        <main className="w-full text-black">
            <Container>
                <InputSearch />

                <h1 className="font-bold text-xl mt-8 mb-5">Veja o que encontramos</h1>
                {!games && (
                    <p>Esse jogo não foi encontrado..</p>
                )}

                <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {games && games.map((game) => (
                        <GameCard key={game.id} data={game} />
                    ))}
                </section>

            </Container>
        </main>
    )
}