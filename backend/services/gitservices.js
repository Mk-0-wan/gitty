import { githubApi } from "../hooks/hooks.js";


async function getRepos() {
  const response = await githubApi.get(`/user/repos?sort=pushed`);
  return response.data.map(repo => ({
    name: repo.name,
    url: repo.html_url,
    language: repo.language,
    stars: repo.stargazers_count,
    visibility: repo.visibility,
    branch: repo.default_branch,
    size: repo.size,
  }));
}

async function getIssues(repoName) {
  const response = await githubApi.get(`/repos/${repoName}/issues`);
  return response.data.map(issue => ({
    title: issue.title,
    number: issue.number,
    state: issue.state,
    created_at: issue.created_at,
  }));
}

async function getCommits(repoName) {
  const response = await githubApi.get(`/repos/${repoName}/commits`);
  return response.data.map(commit => ({
    message: commit.commit.message,
    author: commit.commit.author.name,
    date: commit.commit.author.date,
  }));
}

export { getRepos, getIssues, getCommits };
