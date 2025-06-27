'use client';

import { GitHubRepository, GitHubUser } from '@/types/github';
import { useState } from 'react';

const useGitHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = async (username: string) => {
    if (!username.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${username}+in:login&per_page=5`
      );
      
      if (!response.ok) {
        throw new Error('API rate limit exceeded or user not found');
      }
      
      const data = await response.json();
      setUsers(data.items);
      setSearchTerm(username);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepositories = async (username: string) => {
    setLoadingRepos(true);
    setError(null);
    setSelectedUser(username);
    
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated`
      );
      
      if (!response.ok) throw new Error('Failed to fetch repositories');
      
      const data = await response.json();
      setRepositories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setRepositories([]);
    } finally {
      setLoadingRepos(false);
    }
  };

  const resetSearch = () => {
    setSearchTerm('');
    setUsers([]);
    setRepositories([]);
    setSelectedUser(null);
    setError(null);
  };

  return {
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
  };
};

export default useGitHub;
