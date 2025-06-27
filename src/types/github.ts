export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
  forks_count: number;
  updated_at: string;
}
