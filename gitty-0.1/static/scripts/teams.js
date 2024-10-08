document.addEventListener('DOMContentLoaded', function() {
    const repoList = document.getElementById('repo-list');

    // Function to fetch user's contributed repositories
    async function fetchContributedRepos(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const repos = await response.json();
            return repos.filter(repo => repo.fork === false); // Only show repos the user owns or has contributed to
        } catch (error) {
            console.error('Error fetching repositories:', error);
            return [];
        }
    }

    // Function to render repositories
    function renderRepos(repos) {
        repoList.innerHTML = '';
        repos.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.className = 'repo-item';
            repoElement.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <p>Language: ${repo.language || 'Not specified'}</p>
                <p>Stars: ${repo.stargazers_count}</p>
                <a href="${repo.html_url}" target="_blank" class="repo-link">View on GitHub</a>
            `;
            repoList.appendChild(repoElement);
        });
    }

    // Load repositories
    async function loadRepos() {
        const username = 'fl0wstate'; // Replace with the actual username or fetch it dynamically
        const repos = await fetchContributedRepos(username);
        renderRepos(repos);
    }

    // Initial load
    loadRepos();
});
