document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchButton || !searchResults) {
        console.error('Search elements not found');
        return;
    }

    const pages = [
        { name: 'Home', url: 'card.html', keywords: ['dashboard', 'overview', 'stats'] },
        { name: 'Projects', url: 'projects.html', keywords: ['repositories', 'code', 'development'] },
        { name: 'Teams', url: 'teams.html', keywords: ['collaboration', 'members', 'contributors'] },
        { name: 'Settings', url: 'settings.html', keywords: ['preferences', 'account', 'profile'] }
    ];

    const elements = [
        { name: 'Commits', keywords: ['code changes', 'updates'] },
        { name: 'Pull Requests', keywords: ['code review', 'merge'] },
        { name: 'Issues', keywords: ['bugs', 'tasks', 'todo'] },
        { name: 'Contributions', keywords: ['activity', 'involvement'] }
    ];

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        const results = [];

        // Search pages
        pages.forEach(page => {
            if (page.name.toLowerCase().includes(query) || page.keywords.some(keyword => keyword.includes(query))) {
                results.push({ type: 'page', name: page.name, url: page.url });
            }
        });

        // Search elements
        elements.forEach(element => {
            if (element.name.toLowerCase().includes(query) || element.keywords.some(keyword => keyword.includes(query))) {
                results.push({ type: 'element', name: element.name });
            }
        });

        displayResults(results);
    }

    function displayResults(results) {
        searchResults.innerHTML = '';
        if (results.length === 0) {
            searchResults.style.display = 'none';
            return;
        }

        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            if (result.type === 'page') {
                resultItem.innerHTML = `<a href="${result.url}">${result.name} (Page)</a>`;
            } else {
                resultItem.textContent = `${result.name} (Element)`;
            }
            searchResults.appendChild(resultItem);
        });

        searchResults.style.display = 'block';
    }

    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);

    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchResults.contains(event.target) && event.target !== searchInput) {
            searchResults.style.display = 'none';
        }
    });
});
