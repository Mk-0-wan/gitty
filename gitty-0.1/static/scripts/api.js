async function fetchGitHubData(endpoint, options = {}) {
    const { method = 'GET', data = null } = options;

    try {
        const response = await axios({
            url: `https://api.github.com/${endpoint}`,
            method: method,
            headers: {
                'Authorization': `Bearer ${await fetchGitHubToken()}`,
                'Content-Type': 'application/json'
            },
            data: data
        });

        return response.data;
    } catch (error) {
        console.error("Error with GitHub API call:", error);
        throw error;
    }
}

// Function to fetch the GitHub token from the backend
async function fetchGitHubToken() {
    const response = await axios.get('/api/get-token');
    console.log(response);
    return response.data.token;
}

window.fetchGitHubData = fetchGitHubData;
