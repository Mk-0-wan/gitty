document.addEventListener('DOMContentLoaded', function() {
    // Function to create a chart
    function createGradientChart(ctx, color1, color2, lineColor) {
        // Create the gradient
        var gradient = ctx.createLinearGradient(0, 0, 0, 300); // Vertical gradient
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);

        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Sales',
                    data: data,
                    fill: true,
                    //borderColor: lineColor, // Line color
                    backgroundColor: gradient,
                    pointBackgroundColor: lineColor, // Point color
                    pointBorderColor: lineColor, // Point border color
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: lineColor, // Hover point border color
                    tension: 0.1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'New data',
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '$' + context.parsed.y + '_dollars';
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        border: {
                            dashOffset: 0
                        },
                        ticks: {
                            display: true,
                            maxRotation: 0,
                            minRotation: 0,
                            font: {
                                size: 18,
                                family: 'monospace'
                            }
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        easing: 'easeInOutElastic',
                        ticks: {
                            display: false,
                            font: {
                                size: 30,
                                family: 'Robot'
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 1, // change the point radius
                        hoverRadius: 5
                    }
                },
                maintainAspectRatio: false,
                responsive: true,
               
            }
        });
    }
    function createChart(canvasId, data, color) {
        var ctx = document.getElementById(canvasId).getContext('2d');
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    data: data,
                    borderColor: color,
                    tension: 0.4,
                    pointRadius: 0,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 5,
                        bottom: 5
                    }
                }
            }
        });
    }

    // Create charts for each stat card
    createChart('commitsChart', [1200, 1900, 3000, 5000, 2000, 3000], 'rgb(75, 192, 192)');
    createChart('pullRequestsChart', [56, 40, 60, 70, 50, 90], 'rgb(255, 99, 132)');
    createChart('issuesChart', [89, 70, 60, 50, 80, 90], 'rgb(255, 205, 86)');
    createChart('contributionsChart', [4000, 3000, 5000, 4500, 4800, 6000], 'rgb(54, 162, 235)');

    // Function to format stat numbers
    function formatStatNumber(number) {
        if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'k';
        }
        return number.toString();
    }

    // Format stat numbers
    document.querySelectorAll('.stat-number').forEach(element => {
        const number = parseInt(element.textContent.replace(/,/g, ''), 10);
        element.textContent = formatStatNumber(number);
    });

    // Function to fetch GitHub data with fallback
    async function fetchGitHubData(username) {
        const baseUrl = 'https://api.github.com/users/';
        const userUrl = `${baseUrl}${username}`;
        const reposUrl = `${userUrl}/repos`;
        const eventsUrl = `${userUrl}/events/public`;

        try {
            const [userResponse, reposResponse, eventsResponse] = await Promise.all([
                fetch(userUrl),
                fetch(reposUrl),
                fetch(eventsUrl)
            ]);

            if (!userResponse.ok || !reposResponse.ok || !eventsResponse.ok) {
                throw new Error(`HTTP error! status: ${userResponse.status}`);
            }

            const userData = await userResponse.json();
            const reposData = await reposResponse.json();
            const eventsData = await eventsResponse.json();

            return { userData, reposData, eventsData };
        } catch (error) {
            console.error('Error fetching GitHub data for', username, ':', error);
            // Return fallback data
            return {
                userData: { name: username, avatar_url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png', public_repos: 'N/A' },
                reposData: [{ language: 'Unknown' }],
                eventsData: []
            };
        }
    }

    // Function to get the most used language
    function getMostUsedLanguage(repos) {
        const languageCounts = repos.reduce((acc, repo) => {
            if (repo.language) {
                acc[repo.language] = (acc[repo.language] || 0) + 1;
            }
            return acc;
        }, {});

        return Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0][0];
    }

    // Function to get the latest activity
    function getLatestActivity(events) {
        if (events.length > 0) {
            const latestEvent = events[0];
            return `${latestEvent.type} on ${new Date(latestEvent.created_at).toLocaleDateString()}`;
        }
        return 'No recent activity';
    }

    // Function to update the contributors table
    async function updateContributorsTable() {
        const tableBody = document.getElementById('contributors-table-body');
        if (!tableBody) {
            console.error('Table body element not found');
            return;
        }
        tableBody.innerHTML = ''; // Clear existing textContent
        // Make this to match the following repo
        const contributors = ['octocat', 'defunkt', 'mojombo', 'pjhyett', 'wycats', 'fl0wstate']; // Example usernames

        for (const username of contributors) {
            const data = await fetchGitHubData(username);
            const { userData, reposData, eventsData } = data;
            const row = `
                <tr>
                    <td>
                        <div class="user-info">
                            <img src="${userData.avatar_url}" alt="${username}">
                            <span>${userData.name || username}</span>
                        </div>
                    </td>
                    <td>${userData.public_repos}</td>
                    <td>
                        <span class="language-tag ${getMostUsedLanguage(reposData).toLowerCase()}">${getMostUsedLanguage(reposData)}</span>
                    </td>
                    <td>${getLatestActivity(eventsData)}</td>
                    <td>${userData.public_repos}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        }
    }

    // Call the function to update the table
    updateContributorsTable().catch(error => console.error('Failed to update contributors table:', error));
});
