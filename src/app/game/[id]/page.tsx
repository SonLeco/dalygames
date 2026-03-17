import type { GameProps as GameType } from '@/utils/types/game';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { Label } from './_components/Label';
import GameCard from '@/components/GameCard';
import { Metadata } from 'next';

interface PropsParams {
    params: {
        id: string;
    }
}

export async function generateMetadata({ params } : PropsParams): Promise<Metadata> {
    const { id } = await params;
    try {
        const response: GameType = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
          { next: { revalidate: 60 } })
        .then((res) => res.json())
        .catch(() => {
            return {
                title: "DalyGames - Descubra jogos incriveis para jogar"
            };
        });

        return {
            title: `DalyGames - ${response.title}`,
            description: `${response.description.slice(0, 100)}...`,
            openGraph: {
                title: `DalyGames - ${response.title}`,
                description: `${response.description.slice(0, 100)}...`,
                images: [
                    {
                        url: response.image_url,
                        width: 800,
                        height: 600,
                        alt: response.title,
                    },
                ],
            },
        };
    }catch(err){
        console.error('Error fetching game metadata:', err);
        return {
            title: "DalyGames - Descubra jogos incriveis para jogar"
        };
    }
}

async function getData(id: string){
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
          { next: { revalidate: 60 } }
        );
        return res.json();
    }catch(err){
        throw new Error('Failed to fetch Game data' + err);
    }
}

async function getGameSorted(){
    try{
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`,
            { cache: 'no-store' }
        );
        return res.json();
    }catch(err){
        throw new Error('Failed to fetch sorted games data' + err);
    }
}



export default async function Game({ params } : { params: { id: string }}) {
    const { id } = await params;
    const gameData: GameType = await getData(id);
    const sortedGame: GameType = await getGameSorted();

    if(!gameData) {
        redirect('/');
    }
    
    return (
        <main className='w-full text-black'>
            <div className='bg-black h-80 sm:h-96 w-full relative'>
                <Image
                    src={gameData.image_url}
                    alt={gameData.title}
                    fill
                    className='object-cover w-full h-80 sm:h-96 opacity-60'
                    priority={true}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 4vw"
                />
            </div>
            <Container>
                <h1 className='font-bold text-xl my-4'>{gameData.title}</h1>
                <p className='text-sm'>{gameData.description}</p>

                <h2 className='font-bold text-lg mt-7 mb-2'>Plataformas</h2>
                <div className='flex gap-2 flex-wrap'>
                    {gameData.platforms.map((platform) => (
                        <Label name={platform} key={platform} />
                    ))}
                </div>

                <h2 className='font-bold text-lg mt-7 mb-2'>Categorias</h2>
                <div className='flex gap-2 flex-wrap'>
                    {gameData.categories.map((category) => (
                        <Label name={category} key={category} />
                    ))}
                </div>

                <p className='mt-4 mb-2'><strong>Data de lançamento:</strong>{gameData.release}</p>

                <h2 className='font-bold text-lg mt-7 mb-2'>Jogo recomendado:</h2>
                <div className='flex'>
                    <div className='flex-grow'>
                        <GameCard data={sortedGame} />
                    </div>
                </div>
            </Container>
        </main>
    )
}