'use client';

import LoadingSpinner from "@/components/LoadingSpinner";
import SearchForm from "@/components/SearchForm";
import UserCard from "@/components/UserCard";
import useGitHub from "@/hooks/useGitHub";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function Home() {
  const {
    searchTerm,
    users,
    repositories,
    selectedUser,
    loading,
    loadingRepos,
    error,
    searchUsers,
    fetchRepositories,
    resetSearch,
  } = useGitHub();

  const [openCard, setOpenCard] = useState<string | null>(null);

  const handleUserSelect = async (username: string) => {
    if (selectedUser !== username) {
      await fetchRepositories(username);
    }
    setOpenCard(openCard === username ? null : username);
  };

  const handleToggle = (username: string) => {
    setOpenCard(openCard === username ? null : username);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="lg:container mx-auto px-3 py-6 md:px-4 md:py-8 min-h-[calc(100vh-69px)] flex flex-col">
        <div className="m-auto">
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 md:text-3xl">
            GitHub Repositories Explorer
          </h1>
          <div className="max-w-[325px] md:max-w-2xl lg:max-w-3xl mx-auto">
            <div className="flex justify-center mb-4 md:mb-8">
              <SearchForm
                onSearch={searchUsers}
                onReset={resetSearch}
                disabled={loading}
                initialValue={searchTerm}
              />
            </div>

            {/* Error Message Section */}
            {error && (
              <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {/* Loading State */}
            {loading && users.length === 0 && <LoadingSpinner />}

            {/* No Users Found Message */}
            {!loading && searchTerm && users.length === 0 && !error && (
              <div className="p-4 mb-6 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 flex items-start">
                <ExclamationTriangleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  No users found matching {`"${searchTerm}"`}
                  <p className="mt-1 text-sm">Try a different username or check your spelling</p>
                </div>
              </div>
            )}

            {/* Users List */}
            {!loading && users.length > 0 && (
              <div className="mb-6 md:mb-8">
                <h2 className="mb-3 text-lg font-semibold text-gray-700 md:mb-4 md:text-xl">
                  Showing users for {`"${searchTerm}"`}
                </h2>
                <div className="space-y-2 md:space-y-4">
                  {users.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      repositories={selectedUser === user.login ? repositories : []}
                      loadingRepos={loadingRepos && selectedUser === user.login}
                      onSelect={handleUserSelect}
                      onToggle={handleToggle}
                      isSelected={user.login === selectedUser}
                      isOpen={openCard === user.login}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="border-t border-gray-200 py-4 text-center text-xs text-gray-500 md:py-6 md:text-sm">
        <p>GitHub Repositories Explorer</p>
      </footer>
    </div>
  );
};
