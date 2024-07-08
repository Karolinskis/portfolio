import React from "react";
import Image from "next/image";
import Link from "next/link";

function Card({
  imageLink,
  title,
  description,
  technologies,
  link,
}: {
  imageLink: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}) {
  return (
    <div className="flex justify-center p-8 w-full">
      <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-lg">
        <Image
          className="flex w-full md:w-1/3 lg:w-1/3 xl:w-1/4 mb-8 md:mb-0 md:mr-8"
          src={imageLink}
          alt={title}
          width={250}
          height={250}
        />

        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="mb-4">{description}</p>
          <div className="flex space-x-2 mb-4 justify-center md:justify-start">
            {technologies.map((technology, index) => (
              <Image
                key={index}
                className="mt-1 h-8 object-contain"
                src={`/technologies/${technology}.png`}
                width={48}
                height={48}
                alt={technology}
              />
            ))}

            <Link
              href={link}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              View project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
