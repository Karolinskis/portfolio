export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-24">
      <span className="text-sm">
        Made with <span className="text-red-500">❤</span> by Karolis
      </span>
      <span className="text-sm">&copy; {new Date().getFullYear()}</span>
    </footer>
  );
}
