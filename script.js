const chn = document.querySelector('.sho')
console.log(chn)

function calculateBMR() {
  const age = parseFloat(document.getElementById('age').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const gender = document.getElementById('gender').value;

  if (!isNaN(age) && !isNaN(weight) && !isNaN(height) && gender) {
      let bmr;
      if (gender === "male") {
          bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else if (gender === "female") {
          bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      
      const resultDiv = document.getElementById('bmrResult');
      resultDiv.textContent = `Your BMR is ${bmr.toFixed(2)} calories/day`;
      resultDiv.classList.add('show');

      // Calculate BMR for different activity levels
      const sedentaryBMR = bmr * 1.2;
      const lightlyActiveBMR = bmr * 1.375;
      const moderatelyActiveBMR = bmr * 1.55;
      const veryActiveBMR = bmr * 1.725;
      const extraActiveBMR = bmr * 1.9;

      // Update table with calculated values
      document.getElementById('sedentary').textContent = sedentaryBMR.toFixed(2);
      document.getElementById('lightlyActive').textContent = lightlyActiveBMR.toFixed(2);
      document.getElementById('moderatelyActive').textContent = moderatelyActiveBMR.toFixed(2);
      document.getElementById('veryActive').textContent = veryActiveBMR.toFixed(2);
      document.getElementById('extraActive').textContent = extraActiveBMR.toFixed(2);

      // Display the table
      document.getElementById('activityTable').style.display = 'table';

      chn.classList.remove('sho');
      chn.classList.add('hid');
  } else {
      alert('Please enter valid age, weight, height, and gender!');
  }
}

// document.getElementById('analyzeFood').addEventListener('click', () => {
//   const foodQuery = document.getElementById('foodQuery').value;
//   console.log('hello')

//   if (foodQuery) {
//       analyzeFood(foodQuery);
//   } else {
//       document.getElementById('caloriesResult').innerText = 'Please enter a food query.';
//   }
// });

// Function to calculate BMI
function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM ** 2);
  return Math.round(bmi * 100) / 100;
}

  // Replace with your actual Nutritionix API credentials
  const API_KEY = '1c56a5dc784d6518e12b8286aacf3948	';
  const APP_ID = 'e2277c57';

  document.getElementById('analyzeFood').addEventListener('click', () => {
      const foodQuery = document.getElementById('foodQuery').value;

      if (foodQuery) {
          analyzeFood(foodQuery);
          // console.log('hello')
      } else {
          document.getElementById('nutritionResult').innerText = 'Please enter a food query.';
      }
  });

  // Function to analyze food items using Nutritionix API
  function analyzeFood(query) {
      const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
      const headers = {
          'x-app-id': APP_ID,
          'x-app-key': API_KEY,
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
          console.log('Nutrition Data:', result);
          displayNutritionData(result);
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById('nutritionResult').innerText = 'Error: ' + error.message;
      });
  }

  // Function to display detailed nutritional information
  function displayNutritionData(result) {
      let output = '';
      result.foods.forEach(food => {
          output += `<div class="food-item">`;
          output += `<h3>${food.food_name}</h3>`;
          output += `<p class="summary">Serving Size: ${food.serving_qty} ${food.serving_unit} (${food.serving_weight_grams} grams)</p>`;
          output += `<p>Calories: ${food.nf_calories}</p>`;
          output += `<p>Total Fat: ${food.nf_total_fat} g</p>`;
          output += `<p>Saturated Fat: ${food.nf_saturated_fat} g</p>`;
          output += `<p>Cholesterol: ${food.nf_cholesterol} mg</p>`;
          output += `<p>Sodium: ${food.nf_sodium} mg</p>`;
          output += `<p>Total Carbohydrates: ${food.nf_total_carbohydrate} g</p>`;
          output += `<p>Dietary Fiber: ${food.nf_dietary_fiber} g</p>`;
          output += `<p>Sugars: ${food.nf_sugars} g</p>`;
          output += `<p>Protein: ${food.nf_protein} g</p>`;
          output += `<p>Vitamin A: ${food.nf_vitamin_a_dv} %DV</p>`;
          output += `<p>Vitamin C: ${food.nf_vitamin_c_dv} %DV</p>`;
          output += `<p>Calcium: ${food.nf_calcium_dv} %DV</p>`;
          output += `<p>Iron: ${food.nf_iron_dv} %DV</p>`;
          output += `<span class="read-more">Read More</span>`;
          output += `</div>`;
      });
      document.getElementById('nutritionResult').innerHTML = output;
      addReadMoreEventListeners();
  }

  // Function to add event listeners to "Read More" buttons
  function addReadMoreEventListeners() {
      const readMoreButtons = document.querySelectorAll('.read-more');
      readMoreButtons.forEach(button => {
          button.addEventListener('click', (event) => {
              const foodItem = event.target.closest('.food-item');
              foodItem.classList.toggle('expanded');
              event.target.innerText = foodItem.classList.contains('expanded') ? 'Read Less' : 'Read More';
          });
      });
  }

  