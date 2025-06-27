import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { memo } from 'react';
import RepositoryCard from './RepositoryCard';
import { GitHubRepository, GitHubUser } from '@/types/github';
import Image from 'next/image';

interface UserCardProps {
  user: GitHubUser;
  repositories: GitHubRepository[];
  loadingRepos: boolean;
  onSelect: (username: string) => void;
  isSelected: boolean;
  onToggle: (username: string) => void;
  isOpen: boolean;
}

const UserCard = ({
  user,
  repositories,
  loadingRepos,
  onSelect,
  isSelected,
  onToggle,
  isOpen,
}: UserCardProps) => {
  const handleClick = () => {
    if (!isSelected) {
      onSelect(user.login);
    }
    onToggle(user.login);
  };

  return (
    <div className="mb-3 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md md:mb-4">
      <button
        className={`flex w-full items-center justify-between p-3 text-left transition-colors md:p-4 ${
          isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
        }`}
        onClick={handleClick}
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-2 md:space-x-3">
          <Image
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="rounded-full md:h-10 md:w-10"
            width={32}
            height={32}
          />
          <div>
            <h3 className="ftext-sm font-medium text-gray-900 md:text-base">{user.login}</h3>
            <a
              href={user.html_url}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-blue-600 hover:underline md:text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              View profile
            </a>
          </div>
        </div>
        <ChevronDownIcon
          className={`h-4 w-4 text-gray-500 transition-transform duration-300 md:h-5 md:w-5 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-3 pb-3 pt-1 md:px-4 md:pb-4 md:pt-2">
          {loadingRepos ? (
            <div className="flex justify-center py-3 md:py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-b-2 border-blue-500 md:h-8 md:w-8"></div>
            </div>
          ) : repositories.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto pr-1 md:max-h-[400px]">
              <div className="space-y-2 md:space-y-3">
                {repositories.map((repo) => (
                  <RepositoryCard key={repo.id} repo={repo} />
                ))}
              </div>
            </div>
          ) : (
            <p className="py-1 text-center text-xs text-gray-500 md:py-2 md:text-sm">
              No repositories found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(UserCard);
