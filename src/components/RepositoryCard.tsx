import { GitHubRepository } from "@/types/github";

const RepositoryCard = ({ repo }: { repo: GitHubRepository }) => {
  return (
    <div className="w-full rounded border border-gray-200 bg-white p-2 hover:bg-gray-50 md:rounded-lg md:p-3">
      <div className="flex justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="truncate text-sm font-medium text-gray-900 md:text-base">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              title={repo.name}
            >
              {repo.name}
            </a>
          </h3>
          {repo.description && (
            <p className="mt-0.5 truncate text-xs text-gray-600 md:mt-1 md:text-sm" title={repo.description}>
              {repo.description}
            </p>
          )}
        </div>
        <div className="ml-2 flex items-center text-xs text-gray-700 md:ml-4 md:text-sm">
          <span className="mr-0.5 md:mr-1">★</span>
          <span>{repo.stargazers_count}</span>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
