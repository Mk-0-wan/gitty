document.addEventListener('DOMContentLoaded', function() {
    const projectsList = document.getElementById('projects-list');
    const newRepoNameInput = document.getElementById('new-repo-name');
    const createRepoBtn = document.getElementById('create-repo-btn');

    let cachedRepos = [];
    let lastFetchTime = 0;
    const FETCH_COOLDOWN = 60000; // 1 minute cooldown
    let remainingRequests = 60; // GitHub's default rate limit
    const RATE_LIMIT_THRESHOLD = 10; // Threshold to start slowing down requests

    async function fetchRepositories(page = 1, perPage = 30) {
        if (remainingRequests <= RATE_LIMIT_THRESHOLD) {
            showNotification('Approaching rate limit. Please wait.', 'warning');
            await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 1 minute
        }

        const now = Date.now();
        if (now - lastFetchTime < FETCH_COOLDOWN) {
            return cachedRepos;
        }

        try {
            const response = await fetchGitHubData(`user/repos?page=${page}&per_page=${perPage}`);
            cachedRepos = response.data;
            lastFetchTime = now;
            updateRateLimitInfo(response.headers);
            return cachedRepos;
        } catch (err) {
            console.error("Error fetching repositories:", err);
            return cachedRepos;
        }
    }

    function updateRateLimitInfo(headers) {
        remainingRequests = parseInt(headers['x-ratelimit-remaining'], 10);
        const resetTime = parseInt(headers['x-ratelimit-reset'], 10) * 1000;
        const timeUntilReset = resetTime - Date.now();
        console.log(`Remaining requests: ${remainingRequests}. Reset in ${timeUntilReset / 1000} seconds.`);
    }

    async function createRepository(name) {
        try {
            const response = await fetchGitHubData("user/repos", {
                method: 'POST',
                data: {
                    name: name,
                    description: 'Newly created project',
                    private: false
                }
            });
            updateRateLimitInfo(response.headers);
            showNotification('Repository created successfully', 'success');
            return response.data;
        } catch (error) {
            console.error("Error creating repository:", error);
            showNotification('Failed to create repository', 'error');
            return null;
        }
    }

    async function deleteRepository(name) {
        try {
            const userInfo = await fetchGitHubData("/user");
            const username = userInfo.data.login;

            const response = await fetchGitHubData(`repos/${username}/${name}`, {
                method: 'DELETE'
            });
            updateRateLimitInfo(response.headers);
            showNotification('Repository deleted successfully', 'success');
        } catch (error) {
            console.error(`Error deleting repository ${name}:`, error);
            showNotification('Failed to delete repository', 'error');
        }
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    function renderRepositories(repos) {
        projectsList.innerHTML = '';
        repos.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.className = 'project-item';
            repoElement.innerHTML = `
                <h3>${escapeHtml(repo.name)}</h3>
                <p>${escapeHtml(repo.description || '')}</p>
                <button class="delete-repo-btn" data-name="${repo.name}">Delete</button>
            `;
            projectsList.appendChild(repoElement);
        });
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    async function loadRepositories() {
        const repos = await fetchRepositories();
        renderRepositories(repos);
    }

    function debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    }

    const debouncedCreateRepo = debounce(async (name) => {
        const newRepo = await createRepository(name);
        if (newRepo) {
            cachedRepos.push(newRepo);
            renderRepositories(cachedRepos);
        }
    }, 300);

    createRepoBtn.addEventListener('click', () => {
        const name = newRepoNameInput.value.trim();
        if (name) {
            debouncedCreateRepo(name);
            newRepoNameInput.value = '';
        }
    });

    projectsList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-repo-btn')) {
            const name = e.target.getAttribute('data-name');
            await deleteRepository(name);
            cachedRepos = cachedRepos.filter(repo => repo.name !== name);
            renderRepositories(cachedRepos);
        }
    });

    loadRepositories();
});
