"use server";
import { gql, GraphQLClient } from "graphql-request";
import { GithubUser, GithubRepo } from "@/types/github";

interface Viewer {
  viewer: {
    pinnedItems: {
      nodes: GithubRepo[];
    };
  };
}

const endpoint = "https://api.github.com/graphql";
const token = process.env.GITHUB_TOKEN;

export const fetchGithubUser = (
  username: string,
  callback: (error: Error | null, user: GithubUser | null) => void
): void => {
  fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      return response.json();
    })
    .then((user: GithubUser) => {
      callback(null, user);
    })
    .catch((error) => {
      callback(error, null);
    });
};

export const fetchPinnedRepositories = async () => {
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const query = gql`
    {
      viewer {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

  const data: Viewer = await client.request(query);
  return data.viewer.pinnedItems.nodes;
};

export const getCreatedAt = (username: string): number => {
  let createdAtYear = NaN;

  fetchGithubUser(username, (error, user) => {
    if (error) {
      console.error(error);
      return;
    }

    createdAtYear = user?.created_at
      ? new Date(user.created_at).getFullYear()
      : NaN;
  });

  return createdAtYear;
};
