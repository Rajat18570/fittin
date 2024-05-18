const API_KEY2 = '292c72c4ecadd24fe04b010720641a90';
const APP_ID2 = 'c47dc513';

document.getElementById('calculateCaloriesButton').addEventListener('click', () => {
    const breakfast = document.getElementById('breakfastInput').value;
    const lunch = document.getElementById('lunchInput').value;
    const dinner = document.getElementById('dinnerInput').value;
    const workout = document.getElementById('workoutInput').value;
    const caloriesBurned = document.getElementById('caloriesBurnedInput').value;

    let foodQuery = `${breakfast}, ${lunch}, ${dinner}`;
    if (foodQuery.trim()) {
        analyzeFoods(foodQuery, caloriesBurned);
    } else {
        document.getElementById('calorieResultContainer').innerText = 'Please enter your meals and workout.';
    }
});

function analyzeFoods(query, caloriesBurned) {
    const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    const headers = {
        'x-app-id': APP_ID2,
        'x-app-key': API_KEY2,
        'Content-Type': 'application/json'
    };
    const data = {
        query: query,
        timezone: 'US/Eastern'
    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        let totalCalories = 0;
        result.foods.forEach(food => {
            totalCalories += food.nf_calories;
        });
        const netCalories = totalCalories - parseFloat(caloriesBurned);
        displayCalorieResult(totalCalories, caloriesBurned, netCalories);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('calorieResultContainer').innerText = 'Error: ' + error.message;
    });
}

function displayCalorieResult(totalCalories, caloriesBurned, netCalories) {
    document.getElementById('calorieResultContainer').innerHTML = `
        <h2>Today's Calorie Summary</h2>
        <table class="calorie-table">
            <thead>
                <tr>
                    <th>Total Calories Consumed</th>
                    <th>Calories Burned</th>
                    <th>Net Calories</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${totalCalories}</td>
                    <td>${caloriesBurned}</td>
                    <td>${netCalories}</td>
                </tr>
            </tbody>
        </table>
    `;
}