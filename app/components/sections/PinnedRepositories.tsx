"use client";
import { useEffect, useState } from "react";
import { GithubRepo } from "@/types/github";
import { fetchPinnedRepositories } from "@/app/lib/github";
import { IoMdStarOutline } from "react-icons/io";
import { RiGitForkLine } from "react-icons/ri";
import Skeleton from "../ui/skeleton";

export default function PinnedRepositories() {
  const [repositories, setRepositories] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRepositories = async () => {
      setLoading(true);
      const repos = await fetchPinnedRepositories();
      setRepositories(repos);
      setLoading(false);
    };

    getRepositories();
  }, []);

  return (
    <section>
      <h2 className="text-3xl text-black dark:text-white font-semibold">
        Pinned repositories
      </h2>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index}>
                <div className="flex flex-col justify-between h-full max-w-md p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors duration-300">
                  <div>
                    <Skeleton>
                      <div className="w-32 h-6 mb-2 bg-gray-300 dark:bg-gray-600"></div>
                    </Skeleton>
                    <Skeleton>
                      <div className="w-48 h-4 bg-gray-300 dark:bg-gray-600"></div>
                    </Skeleton>
                  </div>
                  <div className="flex justify-start items-center mt-4">
                    <Skeleton>
                      <div className="inline-block w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 mr-2"></div>
                    </Skeleton>
                    <Skeleton>
                      <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600"></div>
                    </Skeleton>
                  </div>
                </div>
              </Skeleton>
            ))
          : repositories.map((repo, index) => (
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <div className="flex flex-col justify-between h-full max-w-md p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors duration-300">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {repo.name}
                    </h3>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {repo.description}
                    </p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex justify-start items-center mt-4">
                      <span
                        className="inline-block w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: repo.primaryLanguage?.color }}
                      ></span>
                      <p>{repo.primaryLanguage?.name}</p>
                    </div>
                    <div className="flex justify-start items-center mt-4">
                      <IoMdStarOutline className="text-2xl mr-1" />
                      <p>{repo.stargazerCount} stars</p>
                    </div>
                    <div className="flex justify-start items-center mt-4">
                      <RiGitForkLine className="text-2xl mr-1" />
                      <p>{repo.forkCount} forks</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
      </div>
    </section>
  );
}
