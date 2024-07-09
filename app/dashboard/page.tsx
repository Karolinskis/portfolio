import DiscordProfileCard from "../components/DiscordProfileCard";

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen h-full p-8 flex flex-col items-center">
      <h1 className="dark:text-zinc-200 text-zinc-900 leading-none mb-3">
        Dashboard
      </h1>
      <DiscordProfileCard userID={process.env.NEXT_PUBLIC_DISCORD_USER_ID} />
    </div>
  );
}
