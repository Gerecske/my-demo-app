"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/pokemon");
    const data = await res.json();
    setPokemon(data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm border-zinc-800 bg-zinc-900 text-white shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl capitalize font-bold">
            {loading ? "Loading..." : pokemon?.name}
          </CardTitle>
          <div className="flex justify-center gap-2 mt-2">
            {!loading && pokemon?.types.map((t: string) => (
              <Badge key={t} variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                {t}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <div className="w-40 h-40 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
            {loading ? <div className="animate-pulse w-20 h-20 bg-zinc-700 rounded-full" /> : 
              <img src={pokemon?.image} alt="pokemon" className="w-32 h-32 object-contain" />
            }
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={fetchData} className="w-full bg-white text-black hover:bg-zinc-200 font-bold">
            Fetch New Data
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}