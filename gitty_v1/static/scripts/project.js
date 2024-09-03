document.addEventListener('DOMContentLoaded', function() {
    const projectsList = document.getElementById('projects-list');
    const newRepoNameInput = document.getElementById('new-repo-name');
    const createRepoBtn = document.getElementById('create-repo-btn');

    // Mock function to simulate API call for fetching repositories
    async function fetchRepositories() {
        // In a real application, this would be an API call to GitHub
        return [
            { id: 1, name: 'project-alpha', description: 'A sample project' },
            { id: 2, name: 'project-beta', description: 'Another sample project' },
        ];
    }

    // Mock function to simulate API call for creating a repository
    async function createRepository(name) {
        // In a real application, this would be an API call to GitHub
        return { id: Date.now(), name, description: 'Newly created project' };
    }

    // Mock function to simulate API call for deleting a repository
    async function deleteRepository(id) {
        // In a real application, this would be an API call to GitHub
        console.log(`Repository ${id} deleted`);
    }

    // Function to render repositories
    function renderRepositories(repos) {
        projectsList.innerHTML = '';
        repos.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.className = 'project-item';
            repoElement.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description}</p>
                <button class="delete-repo-btn" data-id="${repo.id}">Delete</button>
            `;
            projectsList.appendChild(repoElement);
        });
    }

    // Load repositories
    async function loadRepositories() {
        const repos = await fetchRepositories();
        renderRepositories(repos);
    }

    // Create new repository
    createRepoBtn.addEventListener('click', async () => {
        const name = newRepoNameInput.value.trim();
        if (name) {
            const newRepo = await createRepository(name);
            const repos = await fetchRepositories();
            repos.push(newRepo);
            renderRepositories(repos);
            newRepoNameInput.value = '';
        }
    });

    // Delete repository
    projectsList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-repo-btn')) {
            const id = e.target.getAttribute('data-id');
            await deleteRepository(id);
            const repos = await fetchRepositories();
            renderRepositories(repos.filter(repo => repo.id != id));
        }
    });

    // Initial load
    loadRepositories();
});
