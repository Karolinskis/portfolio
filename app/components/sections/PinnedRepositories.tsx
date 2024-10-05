"use client";
import { useEffect, useState } from "react";
import { GithubRepo } from "@/types/github";
import { fetchPinnedRepositories } from "@/app/lib/github";

export default function PinnedRepositories() {
  const [repositories, setRepositories] = useState<GithubRepo[]>([]);

  useEffect(() => {
    const getRepositories = async () => {
      const repos = await fetchPinnedRepositories();
      setRepositories(repos);
    };

    getRepositories();
  }, []);

  return (
    <section>
      <h2 className="text-3xl text-black dark:text-white font-semibold">
        Pinned repositories
      </h2>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {repositories.map((repo) => (
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            <div className="flex flex-col justify-between h-full max-w-md p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700">
              <div>
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {repo.name}
                </h3>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {repo.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p>{repo.primaryLanguage?.name}</p>
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{ backgroundColor: repo.primaryLanguage?.color }}
                ></span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
