// Define the list of places
const places = [
    "Ikebukuro",
    "Shinjuku",
    "Shibuya",
    "Akihabara",
    "Ueno",
    "Asakusa",
    "Ginza",
    "Roppongi"
];

// Define arrays for different categories of prompts
const prompts = [
    "Find a local food place and try a small dish you've never had before.",
    "Challenge yourself to find a hidden alleyway or pathway and explore it.",
    "Take a different route back to the transit station and see what new sites you discover.",
    "Go to a department store, look at the floor map, and pick only 2 to explore.",
    "Notice an interesting architectural detail, appreciate it, then take a photo.",
    "Find a vending machine selling a drink you've never tried before and taste it.",
    "Visit a convenience store and purchase a snack or drink that you've never seen before.",
    "Seek out a public artwork or sculpture and spend a few minutes contemplating its meaning or significance.",
    "Find a rooftop terrace or observation deck and take in the city skyline from a different perspective.",
    "Spot a storefront with a quirky or unusual name and shop there.",
    "Seek out a garden or park in the city and have a moment of tranquility.",
    "Find a local bakery and try a pastry that catches your eye.",
    "Go to a department store and make a goal of purchasing 1 new accessory.",
    "Go to a department store and browse the clothing selection.",
    "Find an izakaya in the area and have a few snacks and drinks.",
    "Open Google Maps, type “museum” and visit one in the local area (if it’s still open)",
    "Visit a museum in the local area that has an art gallery.",
    "Check out a store that specializes in Japanese craftsmanship (lacquerware, porcelain, etc.)",
    "Go to a museum that has a theme (photography, art, etc.)",
    "Go to a museum that is general and does not have a theme.",
    "Visit the closest landmark with historical and cultural significance (shrine, temple, etc.)"
];

const restaurantPrompts = [
    "Dine at a restaurant with red in its logo.",
    "Dine at a restaurant with yellow in its logo.",
    "Dine at a restaurant that has a rating that’s 3 to 4 stars on Google Maps.",
    "Dine at a restaurant that has a rating that’s 4 to 5 stars on Google Maps.",
    "Dine at a restaurant that has a mascot/character somewhere on the exterior.",
    "Dine at a restaurant that uses a ticket system for ordering.",
    "Open Google Maps, click the Restaurants button, and dine at one of the top 5 options there."
];

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to generate a random list of prompts for a given place
function generatePromptsForPlace(place) {
    const promptsCopy = [...prompts];
    const shuffledPrompts = shuffleArray(promptsCopy);
    const selectedPrompts = shuffledPrompts.slice(0, 3);

    return selectedPrompts;
}

// Function to generate a random restaurant prompt
function generateRestaurantPrompt() {
    return restaurantPrompts[Math.floor(Math.random() * restaurantPrompts.length)];
}

// Function to generate prompts for all places
function generatePromptsForAllPlaces() {
    const shuffledPlaces = shuffleArray(places);
    const selectedPlaces = shuffledPlaces.slice(0, 3);
    const allPrompts = [];

    selectedPlaces.forEach(place => {
        const promptsForPlace = generatePromptsForPlace(place);
        allPrompts.push({ place, prompts: promptsForPlace });
    });

    // Add a random restaurant prompt to one of the places
    const randomPlaceIndex = Math.floor(Math.random() * allPrompts.length);
    const randomRestaurantPrompt = generateRestaurantPrompt();
    allPrompts[randomPlaceIndex].prompts.push(randomRestaurantPrompt);

    return allPrompts;
}

// Function to display the prompts on the web page
function displayPrompts(allPrompts) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear previous prompts
    allPrompts.forEach(({ place, prompts }) => {
        const placeHeader = document.createElement('h2');
        placeHeader.textContent = place;
        outputDiv.appendChild(placeHeader);
        prompts.forEach(prompt => {
            const promptItem = document.createElement('p');
            promptItem.textContent = `- ${prompt}`;
            outputDiv.appendChild(promptItem);
        });
    });
}

// Function to generate prompts and display them when the button is clicked
function generateList() {
    const allPrompts = generatePromptsForAllPlaces();
    displayPrompts(allPrompts);
}

// Event listener for the "Plan My Night" button
document.getElementById('planButton').addEventListener('click', generateList);
