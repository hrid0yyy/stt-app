const ctx = document.getElementById('monthlySaleChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Monthly Sales',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                '#ff5733', // July
                '#33ff57', // August
                '#3357ff', // September
                '#f033ff', // October
                '#ffbf33', // November
                '#33fff5'  // December
            ],
            borderColor: '#ffffff', // White border for bars
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff', // White text for legend
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ffffff' // White text for x-axis labels
                },
                grid: {
                    color: '#444444' // Subtle grid lines
                }
            },
            y: {
                ticks: {
                    color: '#ffffff' // White text for y-axis labels
                },
                grid: {
                    color: '#444444' // Subtle grid lines
                },
                beginAtZero: true
            }
        },
        animation: {
            duration: 1000, // Smooth animation for 1 second
            easing: 'easeInOutQuad'
        }
    }
});
const weeklyCtx = document.getElementById('weeklySaleChart');

new Chart(weeklyCtx, {
    type: 'line',
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Weekly Sales',
            data: [50, 75, 150, 200],
            backgroundColor: '#33aaff',
            borderColor: '#ffffff',
            borderWidth: 2,
            pointBackgroundColor: '#ff5733',
            pointBorderColor: '#ffffff',
            pointRadius: 6,
            pointHoverRadius: 8,
            tension: 0.4 // Smooth curve
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ffffff'
                },
                grid: {
                    color: '#444444'
                }
            },
            y: {
                ticks: {
                    color: '#ffffff'
                },
                grid: {
                    color: '#444444'
                },
                beginAtZero: true
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad'
        }
    }
});
const interactionCtx = document.getElementById('advertiseInteractionChart');

new Chart(interactionCtx, {
    type: 'bar',
    data: {
        labels: ['Ad 1', 'Ad 2', 'Ad 3', 'Ad 4', 'Ad 5'],
        datasets: [{
            label: 'User Interactions (Clicks)',
            data: [50, 70, 30, 90, 40],
            backgroundColor: [
                '#f94144',
                '#f3722c',
                '#f9c74f',
                '#90be6d',
                '#577590'
            ],
            borderColor: '#ffffff',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ffffff'
                },
                grid: {
                    color: '#444444'
                }
            },
            y: {
                ticks: {
                    color: '#ffffff'
                },
                grid: {
                    color: '#444444'
                },
                beginAtZero: true
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad'
        }
    }
});
