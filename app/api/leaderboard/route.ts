import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { username, score } = await req.json();

  if (!username || typeof score !== "number") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const existingEntry = await prisma.leaderboard.findUnique({
      where: { username },
    });

    if (existingEntry) {
      if (score > existingEntry.score) {
        const updatedEntry = await prisma.leaderboard.update({
          where: { username },
          data: { score },
        });
        return NextResponse.json(updatedEntry, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "New score is not greater than the existing score" },
          { status: 400 }
        );
      }
    } else {
      const newEntry = await prisma.leaderboard.create({
        data: { username, score },
      });
      return NextResponse.json(newEntry, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create or update leaderboard entry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leaderboard = await prisma.leaderboard.findMany({
      orderBy: { score: "desc" },
      take: 10,
    });
    return NextResponse.json(leaderboard, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
