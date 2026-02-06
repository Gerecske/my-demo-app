import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const randomId = Math.floor(Math.random() * 151) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await res.json();

    return NextResponse.json({
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
      types: data.types.map((t: any) => t.type.name),
    });
  } catch (error) {
    return NextResponse.json({ error: "Backend fetch failed" }, { status: 500 });
  }
}