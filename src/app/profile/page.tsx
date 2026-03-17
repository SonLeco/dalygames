import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";

import FavoriteCard from "@/app/profile/_components/Favorite"

export default function Profile() {
    return (
        <main className="w-full text-black">
            <Container>
                <section className="mt-8 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row">
                    <div className="w-full flex items-center gap-4 text-lg sm:flex-row flex-col sm:justify-normal justify-center">
                        <Image
                            src={"/user.png"}
                            alt={"Imagem de perfil do usuário"}
                            width={150}
                            height={150}
                            className="rounded-full object-cover aspect-square"
                        />
                        <h1 className="font-bold text-2xl">Esdras Carvalho</h1>
                    </div>
                    <div className="sm:absolute top-0 right-0 gap-3 flex items-center justify-center mt-4 sm:mt-0">
                        <Button variant="outline">Editar Perfil</Button>
                        <Button variant="outline"><FaShareAlt /></Button>
                    </div>
                </section>

                <section className="flex flex-wrap gap-5 flex-col md:flex-row">
                    <div className="flex-grow flex-wrap">
                        <FavoriteCard />
                    </div>
                    <div className="flex-grow flex-wrap">
                        <FavoriteCard />
                    </div>
                    <div className="flex-grow flex-wrap">
                        <FavoriteCard />
                    </div>

                </section>
            </Container>
        </main>
    )
}