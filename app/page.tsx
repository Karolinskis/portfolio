import Image from "next/image";
import Card from "./components/Card/Card";

let projects = [
  {
    imageLink: "/IT-sponsor.png",
    title: "IT sponsor",
    description:
      "IT Sponsor is a web application that allows users to create and manage IT projects. Users can create projects, assign tasks to team members, and track progress. The application also includes a chat feature for team communication.",
    technologies: ["React", "Node.js", "TypeScript", "TailwindCSS"],
    link: "https://github.com/IT-sponsor/IT-sponsor",
  },
  {
    imageLink: "/COTR-image.png",
    title: "Champions of the realm",
    description:
      "In this epic adventure, players are transported to a mystical land filled with magic, dragons, and treacherous enemies. As one of three classes - mage, warrior, or archer - you'll need to battle your way through hordes of foes, dodging deadly projectiles and summoning powerful spells to turn the tide of battle.",
    technologies: ["Godot", "CSharp"],
    link: "https://github.com/Karolinskis/Champions-of-the-Realm",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mt-2">Projects</h1>
      <p className="text-lg mb-8">
        Here are some of the projects I've worked on recently.
      </p>

      <hr className="w-1/2 mb-8" />

      {projects.map((project, index) => (
        <Card
          key={index}
          imageLink={project.imageLink}
          title={project.title}
          description={project.description}
          technologies={project.technologies}
          link={project.link}
        />
      ))}
    </main>
  );
}
