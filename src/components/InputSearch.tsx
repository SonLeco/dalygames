"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function InputSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if(searchTerm.trim() === "") return;

        router.push(`/game/search/${encodeURIComponent(searchTerm)}`);
        // Implement search logic here
    };

    return (
        <form
            onSubmit={handleSearch}
            className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2"
        >
            <input
                className="bg-slate-200 outline-none w-11/12" 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Procurando algum jogo?" />

                <Button type="submit" className="ml-2 text-orange-500" variant={'outline'}>
                    <FiSearch size={20} />
                </Button>
        </form>
    )
}