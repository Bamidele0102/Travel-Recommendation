document.getElementById('search-button').addEventListener('click', function() {
    const keyword = document.getElementById('search-bar').value.toLowerCase();
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const results = data.filter(place => 
                place.type.toLowerCase().includes(keyword) ||
                place.name.toLowerCase().includes(keyword)
            );
            displayResults(results);
        });
});

document.getElementById('reset-button').addEventListener('click', function() {
    document.getElementById('search-bar').value = '';
    document.getElementById('results').innerHTML = '';
});

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        
        const img = document.createElement('img');
        img.src = result.imageUrl;
        img.alt = result.name;
        
        const name = document.createElement('h2');
        name.textContent = result.name;
        
        const description = document.createElement('p');
        description.textContent = result.description;
        
        resultDiv.appendChild(img);
        resultDiv.appendChild(name);
        resultDiv.appendChild(description);
        
        resultsDiv.appendChild(resultDiv);
    });
}

function displayTime(timeZone) {
    const options = { timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const localTime = new Date().toLocaleTimeString('en-US', options);
    console.log(`Current time in ${timeZone}: ${localTime}`);
}
