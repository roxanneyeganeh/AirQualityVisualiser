let airData = { aqi: 0, pm25: 0, pm10: 0, no2: 0, o3: 0, co: 0 };
let particles = [];
let lat, lon;
let dataLoaded = false;
let pills = [];
let bursts = [];
let city = '';
let country = '';
let textAreaLearnMore = null; // To store the div
let textAreaInfo = null; // To store the div


let burstImages = {
  co: [],
  no2: [],
  o3: [],
  pm: []
};

let slideOutVisibleInfo = false; // For "Show Info"
let slideOutVisibleLearnMore = false; // For "Learn More"
let slideOutTextInfo = `<style>
  a[target="_blank"] {
    color:#ff00d0; /* Set the color t
    text-decoration: underline; /
  }

  /* Optional: hover effect to change the color when the link is hovered */
  a[target="_blank"]:hover {
    color:#FFFDE4; /* Darker blue when hovered */
  }
</style>
<div style="font-family: 'Poppins', sans-serif;">

  <div style="font-size:22px; font-weight:bold; margin-bottom: 40px; text-align: center;">
    What Can I Do to Help?
  </div>

  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">Drive Less</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    One of the most effective ways to reduce air pollution is by minimizing the use of fossil fuel-powered vehicles. Opt for walking, biking, or using public transportation instead of driving. If possible, consider carpooling or switching to an electric vehicle. Every small choice in favor of alternative transportation reduces harmful emissions and helps protect our environment.
  </div>

  <br><br>
  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">Use Energy-Efficient Appliances</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    By choosing energy-efficient appliances and lighting, such as LED bulbs, you reduce the demand for power generated from non-renewable resources. When not in use, make it a habit to turn off lights and electronics. Even small changes in the way you use energy at home can lead to a significant reduction in air pollution.
  </div>

  <br><br>
  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">Switch to Renewable Energy</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    Transitioning to renewable energy sources, like solar or wind power, is crucial in reducing the harmful effects of burning fossil fuels. You can support this shift by advocating for renewable energy investments in your community or by switching to green energy providers when available. Every step towards cleaner energy sources helps lower overall pollution levels.
  </div>

  <br><br>
  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">Reduce, Reuse, Recycle</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    Taking action to reduce waste, reuse materials, and recycle wherever possible helps cut down on manufacturing emissions and waste-related pollution. Choose products with minimal packaging, buy second-hand goods, and ensure that recyclable materials are processed properly. Every effort, no matter how small, contributes to a cleaner, less polluted environment.
  </div>

  <br><br>
  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">Avoid Burning Wood & Trash</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    Open burning of wood, trash, and other materials releases harmful pollutants into the air. Similarly, smoking cigarettes significantly worsens both indoor and outdoor air quality. Avoid the practice of burning unnecessary materials and consider more sustainable alternatives for heating, such as electric heaters or cleaner fuels. Additionally, reducing smoking can have a profound positive impact on the air quality in your home and in your community.
  </div>

  <br><br>
  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">Support Green Spaces</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    Creating and maintaining green spaces, like parks, community gardens, or tree planting initiatives, helps improve air quality by absorbing carbon dioxide and releasing oxygen. Trees also act as natural filters, removing pollutants from the air. By supporting or participating in tree planting efforts, you help promote cleaner, fresher air for everyone.
  </div>

  <br><br>
  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">Raise Awareness</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    While taking action is crucial, raising awareness about air pollution is equally important. Educating others on the causes and consequences of pollution can help build a collective movement toward cleaner air. Share articles, infographics, and videos about air pollution and its effects on health and the environment. By starting conversations on platforms like Instagram, Facebook, or Twitter, you can inspire others to take meaningful actions in their own lives.
  </div>

  <br><br>
  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">Engage with Community</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    Engaging with your community through local events, educational workshops, or awareness campaigns can have a profound impact on public understanding of air pollution. These events encourage people to make informed decisions in their daily lives and motivate them to take action for cleaner air. Whether through school programs, local meetups, or social groups, fostering awareness at the community level creates a larger collective effort.
  </div>

  <br><br>
  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">Share Resources</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    Numerous organizations, including the <a href="https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health" target="_blank" style="text-decoration: underline; color: inherit;">World Health Organization (WHO)</a> and the <a href="https://www.unep.org/explore-topics/air-pollution" target="_blank" style="text-decoration: underline; color: inherit;">United Nations Environment Programme (UNEP)</a>, offer educational resources that explain the causes and consequences of air pollution in detail. By sharing these resources with others, you help educate the public on the importance of air quality and how it affects health and well-being.
  </div>

  <br><br>
  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">Advocate for Policies</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    Encouraging lawmakers and local government officials to adopt stronger environmental policies is essential in the fight for cleaner air. Support policies that prioritize reducing emissions, promoting clean energy, and improving urban planning to reduce pollution. Advocacy at the local, state, and national levels can lead to lasting change, ensuring better air quality for future generations.
  </div>

  <br><br>
  <div style="text-align: center; hyphens: none;">
    Designed and Developed by <a href="https://designedbyroxanne.com/" target="_blank" rel="noopener noreferrer">Roxanne Yeganeh</a>
  </div>

</div>
`;




let slideOutTextLearnMore = `<style>
  a[target="_blank"] {
    color:#ff00d0; /* Set the color to blue (or any color of your choice) */
    text-decoration: underline; /* Keeps the underline for links */
  }

  /* Optional: hover effect to change the color when the link is hovered */
  a[target="_blank"]:hover {
    color:#FFFDE4; /* Darker blue when hovered */
  }
</style>

<div style="font-family: 'Poppins', sans-serif;">

  <div style="font-size:22px; font-weight:bold; margin-bottom: 40px; text-align: center;">
    Learn More About Air Pollution
  </div>

<div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
  Air pollution refers to harmful substances in the air we breathe. These pollutants come from things like cars, factories, fires, and even products we use at home. Some pollutants stay local, while others travel long distances and affect people all around the world.<br><br>
  Air pollution contributes to <a href="https://www.who.int/health-topics/air-pollution#tab=tab_2" target="_blank" style="text-decoration: underline; color: inherit;">over 7 million deaths annually worldwide</a>.<br><br>
  Even short-term exposure can cause coughing, wheezing, and asthma attacks, while long-term exposure can lead to chronic diseases such as heart disease, lung cancer, and respiratory disorders.<br><br>
  By understanding the pollutants in the air around us, we can take actions to create a healthier and more sustainable future. If pollution continues at the current rate, experts predict that by <a href="https://www.unep.org/news-and-stories/story/global-air-quality-expected-worsen-until-2035-warns-new-report" target="_blank" style="text-decoration: underline; color: inherit;">2035, air quality could worsen significantly</a>, leading to even greater health risks and environmental damage.
</div>


  <br><br>
  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">PM2.5 (Fine Particles)</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    PM2.5 refers to very tiny particles that are less than 2.5 micrometres in diameter. These fine particles are especially harmful because they are small enough to be inhaled deep into the lungs and even enter the bloodstream. Common sources of PM2.5 include vehicle exhaust, power plants, wildfires, and industrial emissions. Due to their small size, PM2.5 particles can lead to serious health problems, such as respiratory issues, heart disease, and even lung cancer. They are particularly dangerous for vulnerable populations, such as children, the elderly, and people with pre-existing health conditions.
  </div>

  <br><br>
  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">PM10 (Coarse Particles)</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    PM10 particles are larger than PM2.5, with diameters less than 10 micrometres. Although they are still small enough to be inhaled, they are typically trapped in the nose or upper respiratory system. However, exposure to these particles can still cause breathing problems and other health issues, especially for people with asthma or chronic respiratory diseases. Common sources of PM10 include dust from construction sites, pollen, vehicle emissions, and agricultural activities.
  </div>

  <br><br>
  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">NO₂ (Nitrogen Dioxide)</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    Nitrogen dioxide (NO₂) is primarily produced by vehicle emissions and industrial processes. It irritates the lungs and can increase susceptibility to respiratory infections and diseases. Major sources of NO₂ include motor vehicles, power plants and industrial facilities, and agricultural activities. Vehicle emissions, especially from cars, trucks, and buses, release nitrogen oxides, which contribute to the formation of NO₂. Power plants and industrial facilities burning fossil fuels for energy production also release nitrogen oxides. In addition, agricultural activities, such as the use of fertilisers, release nitrogen compounds that can contribute to the formation of NO₂. NO₂ can also contribute to the formation of ground-level ozone, which has harmful effects on human health and the environment.
  </div>

  <br><br>
  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">O₃ (Ozone)</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    Ozone (O₃) is a gas that forms when sunlight reacts with pollutants like volatile organic compounds (VOCs) and nitrogen oxides (NOₓ). Ozone is a major component of smog and can cause breathing problems, particularly for children, the elderly, and people with asthma. Major sources of ozone include vehicle exhaust, industrial emissions, and biogenic sources. Vehicle exhaust from cars, trucks, and buses releases nitrogen oxides and VOCs that contribute to ozone formation. Industrial emissions from factories and power plants also release nitrogen oxides and VOCs into the atmosphere. In addition, trees and plants naturally release VOCs that can contribute to ozone formation. Ozone can irritate the airways, exacerbate asthma, and decrease lung function.
  </div>

  <br><br>
  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">CO (Carbon Monoxide)</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    Carbon monoxide (CO) is a colourless, odourless gas that can be harmful when inhaled in large amounts. It is produced by incomplete combustion of carbon-containing fuels. Major sources of CO include vehicle exhaust, residential heating, and industrial processes. Cars, trucks, and buses are significant sources of CO emissions due to incomplete combustion in the engine. Residential heating, such as the use of wood stoves, fireplaces, and gas heaters, can also release CO. Additionally, some industrial activities, such as metal production and chemical manufacturing, can release CO. In high concentrations, carbon monoxide interferes with the body's ability to carry oxygen to vital organs, leading to serious health risks, including headaches, dizziness, and even death.
  </div>

  <hr style="margin-top:40px; margin-bottom:40px;">

  <div style="font-weight: bold; font-size: 16px; margin-top: 20px;">About This Webpage</div><br>
  <div style="column-count: 2; column-gap: 20px; text-align: left; hyphens: none;">
    This interactive webpage was created to raise awareness about air quality through compelling data visualisation and design. The goal is to present complex air quality information in a way that is visually engaging, easy to understand, and impactful.<br><br>
    The webpage uses real-time air quality data. By using your current location, it gathers information specific to your area. Your coordinates are used temporarily and anonymously to provide localised data, and no personal information is stored.<br><br>
    Through carefully crafted visual elements, the webpage brings to life the invisible presence of pollutants in the air. By visualising these particles, it highlights the hidden impact of air pollution on our health and the environment. This design-led approach aims to make people more aware of the often overlooked dangers in the atmosphere and to encourage a more conscious relationship with the air we breathe.
  </div>
<br><br>
   <div style="text-align: center; hyphens: none;">
    Designed and Developed by <a href="https://designedbyroxanne.com/" target="_blank" rel="noopener noreferrer">Roxanne Yeganeh</a>

  </div>

</div>
`;







let toggleButton;
let is2036Visible = false;

// Mapping country codes to country names
const countryMap = {
  "GB": "England",  // You can map other country codes as needed
  "US": "United States",
  "CA": "Canada",
  // Add other mappings as needed
};

// Function to get the formatted location
function getLocationName(city, countryCode) {
  // If the country code is in the map, replace it with the full country name
  const countryName = countryMap[countryCode] || countryCode; // Fallback to the original code if not found
  return `${city}, ${countryName}`;
}

function preload() {
  let car = loadImage('assets/car.png');
  let car2 = loadImage('assets/car2.png');
  let cigarette = loadImage('assets/cigarette.png');
  let fire = loadImage('assets/fire.png');
  let candle = loadImage('assets/candle.png');
  let aerosol = loadImage('assets/aerosol.png');
  let plasticBag = loadImage('assets/plasticbag.png');
  let plasticBottle = loadImage('assets/plasticbottle.png');
  let factory = loadImage('assets/factory.png');
  let construction = loadImage('assets/construction.png');
  let clothes = loadImage('assets/clothes.png');

  burstImages.co.push(car, cigarette, fire, plasticBag, plasticBottle, car2);
  burstImages.no2.push(car, car2);
  burstImages.o3.push(car, aerosol, plasticBag, plasticBottle, factory, car2);
  burstImages.pm.push(car, cigarette, candle, fire, plasticBag, plasticBottle, construction, factory, clothes, car2);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Poppins');

  button = createButton("How Can I Help?");
  button.position(140, windowHeight - 50);  // Move button to bottom left
  button.size(140, 31);
  button.style ('font-family', 'Poppins')
  button.style('background-color', '#FFFDE4');
  button.style('color', 'black');
  button.style('border', 'none');
  button.style('border-radius', '70px');
  button.style('position', 'fixed');
  button.mousePressed(toggleSlideOutInfo);

  button.mouseOver(() => {
    button.style('background-color', '#ffffff'); // Change to green on hover
    button.style('color', '#000000'); // Change text color on hover
  });
  
  button.mouseOut(() => {
    button.style('background-color', '#FFFDE4'); // Reset to original background
    button.style('color', 'black'); // Reset to original text color
  });

  // Create "Learn More" button
  learnMoreButton = createButton("Learn More");

  learnMoreButton.position(20, windowHeight - 50);  // Move button to bottom left
  learnMoreButton.size(110, 31);
  learnMoreButton.style('font-family', 'Poppins')
  learnMoreButton.style('background-color', '#FFFDE4');
  learnMoreButton.style('color', 'black');
  learnMoreButton.style('border', 'none');
  learnMoreButton.style('border-radius', '70px');
  learnMoreButton.style('position', 'fixed');
  learnMoreButton.mousePressed(toggleSlideOutLearnMore);

  learnMoreButton.mouseOver(() => {
    learnMoreButton.style('background-color', '#ffffff'); // Change to green on hover
    learnMoreButton.style('color', '#000000'); // Change text color on hover
  });
  
  learnMoreButton.mouseOut(() => {
    learnMoreButton.style('background-color', '#FFFDE4'); // Reset to original background
    learnMoreButton.style('color', 'black'); // Reset to original text color
  });

// Create the toggle button aligned to the right
toggleButton = createButton("Our Planet's Future");  // Default text when 2036 is not visible
toggleButton.style('position', 'fixed');
toggleButton.style('right', '20px'); // Stick to the right side
toggleButton.style('top', '14px');   // Adjust vertical position
toggleButton.style('background-color', '#FFFDE4');
toggleButton.style('font-family', 'Poppins');
toggleButton.style('color', 'black');
toggleButton.style('border', 'none');
toggleButton.style('border-radius', '70px');
toggleButton.style('padding', '5px 12px');
toggleButton.style('font-size', '14px');
toggleButton.style('white-space', 'nowrap');
toggleButton.style('overflow', 'hidden');
toggleButton.style('transition', 'all 0.3s ease');
toggleButton.style('transform-origin', 'right center'); // Expands from right edge
toggleButton.mousePressed(toggle2036);

// Update button text based on visibility
function updateButtonText() {
  if (is2036Visible) {
    toggleButton.html("Present Day"); // Text when 2036 is visible
  } else {
    toggleButton.html("Our Planet's Future"); // Text when 2036 is not visible
  }
}

// Expand on hover (text grows leftward), only if 2036 is not visible
toggleButton.mouseOver(() => {
  if (!is2036Visible) {  // Only change to "2035 Predictions" if 2036 is NOT visible
    toggleButton.html("2035 Predictions");
  }
  toggleButton.style('background-color', '#ffffff');
  toggleButton.style('color', '#000000');
});

// Collapse back
toggleButton.mouseOut(() => {
  updateButtonText(); // Update button text based on visibility
  toggleButton.style('padding', '5px 12px');
  toggleButton.style('background-color', '#FFFDE4');
  toggleButton.style('color', 'black');
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(gotPos, geoFail);
} else {
  console.log("Geolocation not supported.");
}

// Call this function whenever `is2036Visible` changes
function toggle2036() {
  is2036Visible = !is2036Visible; // Toggle visibility
  updateButtonText(); // Update button text when visibility changes
}

}

function toggle2036() {
  is2036Visible = !is2036Visible;
  setupPills();        // <--- ADD THIS LINE to update pill values
  setupParticles();    // Reset particle system when toggled
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  positionButtons();
}

function positionButtons() {
  // Reposition buttons in the center of the window or bottom left based on your previous logic
  button.position(140, windowHeight - 50); // "How Can I Help?" button
  learnMoreButton.position(20, windowHeight - 50); // "Learn More" button
}

function toggleSlideOutInfo() {
  slideOutVisibleInfo = !slideOutVisibleInfo;

  // If closing, remove the text area
  if (!slideOutVisibleInfo && textAreaInfo) {
    textAreaInfo.remove();
    textAreaInfo = null;
  }

  // Close Learn More if Info opens
  if (slideOutVisibleInfo) {
    slideOutVisibleLearnMore = false;

    // Also clean up Learn More text area
    if (textAreaLearnMore) {
      textAreaLearnMore.remove();
      textAreaLearnMore = null;
    }
  }
}

function toggleSlideOutLearnMore() {
  slideOutVisibleLearnMore = !slideOutVisibleLearnMore;

  // If closing, remove the text area
  if (!slideOutVisibleLearnMore && textAreaLearnMore) {
    textAreaLearnMore.remove();
    textAreaLearnMore = null;
  }

  // Close Info if Learn More opens
  if (slideOutVisibleLearnMore) {
    slideOutVisibleInfo = false;

    // Also clean up Info text area
    if (textAreaInfo) {
      textAreaInfo.remove();
      textAreaInfo = null;
    }
  }
}


function gotPos(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  let apiKey = "f73ada69506831683b787c587de5b206";
  let url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let d = data.list[0];
      airData.aqi = d.main.aqi;
      airData.pm25 = d.components.pm2_5;
      airData.pm10 = d.components.pm10;
      airData.no2 = d.components.no2;
      airData.o3 = d.components.o3;
      airData.co = d.components.co;
      setupPills();
      dataLoaded = true;
    })
    .catch(err => {
      console.error("API fetch error:", err);
    });

  // Get city and country based on the coordinates
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  fetch(geoUrl)
    .then(response => response.json())
    .then(data => {
      city = data.name;
      country = data.sys.country;
    })
    .catch(err => {
      console.error("Error fetching city and country:", err);
      city = "Unknown";
      country = "Unknown";
    });
}

function geoFail() {
  console.log("Could not get location.");
}

function setupPills() {
  pills = [
    { short: "AQI", long: "Air Quality Index", value: getAQIDescription(airData.aqi), color: color(50) },
    { short: "PM2.5", long: "Particle Matter ≤ 2.5 µm", value: `${nf(airData.pm25, 1, 1)} µg/m³`, color: getColor("pm25") },
    { short: "PM10", long: "Particle Matter ≤ 10 µm", value: `${nf(airData.pm10, 1, 1)} µg/m³`, color: getColor("pm10") },
    { short: "NO₂", long: "Nitrogen Dioxide", value: `${nf(airData.no2, 1, 1)} µg/m³`, color: getColor("no2") },
    { short: "O₃", long: "Ozone", value: `${nf(airData.o3, 1, 1)} µg/m³`, color: getColor("o3") },
    { short: "CO", long: "Carbon Monoxide", value: `${nf(airData.co * 0.000873, 1, 3)} ppm`, color: getColor("co") }
  ];

  for (let pill of pills) {
    pill.hover = false;
    pill.currentWidth = 0;
    pill.targetWidth = 0;
  }
}

let targetParticles; // Keep this global, so it's easily accessible and updated.



function draw() {
  let topColor, bottomColor;
  if (is2036Visible) {
    // Darker gradient when toggle is on
    topColor = color('#1f3b4d');
    bottomColor = color('#be1600');
  } else {
    // Original gradient
    topColor = color('#bee2f8');
    bottomColor = color('#fff176');
  }

  // Create the gradient background
  for (let y = 0; y < height; y++) {
    let t = map(y, 0, height, 0, 1);
    let eased = pow(t, 1.8);
    let c = lerpColor(topColor, bottomColor, eased);
    stroke(c);
    line(0, y, width, y);
  }

 

  if (city && country) {
    let locationText = getLocationName(city, country);
  
    // Text and layout settings
    textSize(14);
    textAlign(LEFT, CENTER);
    let padding = 10;
    let textW = textWidth(locationText);
    let boxHeight = 28;
    let boxX = windowWidth - 195;
    let boxY = windowHeight - 48;
    let boxWidth = textW + padding * 3 + 10; // extra 10 for dot space
  
    // Draw rounded rectangle background
    fill(255, 255, 255, 220); // Semi-transparent white
    noStroke();
    rect(boxX, boxY, boxWidth, boxHeight, 70);
  
    // Flashing dot
    if (floor(millis() / 500) % 2 === 0) {
      fill(0, 0, 0); // Red
      noStroke();
      ellipse(boxX + padding + 5, boxY + boxHeight / 2, 10, 10);
    }
  
    // Draw location text
    fill(0);
    text(locationText, boxX + padding + 15, boxY + boxHeight / 2);
  }
  

  if (dataLoaded) {
    textSize(14);
    textAlign(LEFT, CENTER);

    let padding = 10;
    let h = 30;

    // Check if the screen width is small (for example, less than 600px)
    let stackOnLeft = windowWidth < 600; // You can adjust this value if needed

    let xOffset = 20; // Keep pills at the left for smaller screens
    let y = 30; // Vertical position for pills

    // Set pill values based on mode (2036 or live API)
    for (let pill of pills) {
      if (is2036Visible) {
        // Static values for 2036 canvas
        if (pill.short === "CO") {
          pill.value = "0.5 mg/m³";  // Static value for 2036
        } else if (pill.short === "NO₂") {
          pill.value = "29.5 µg/m³";  // Static value for 2036
        } else if (pill.short === "PM2.5") {
          pill.value = "9.1 µg/m³";  // Static value for 2036
        } else if (pill.short === "PM10") {
          pill.value = "15.6 µg/m³";  // Static value for 2036
        } else if (pill.short === "O₃") {
          pill.value = "96.8 µg/m³";  // Static value for Ozone in 2036
        }
      } else {
        // Use real API-based values for live canvas
        if (airData) {
          if (pill.short === "CO") {
            // Ensure CO is in the correct unit (mg/m³)
            pill.value = `${(airData.co / 1000).toFixed(1)} mg/m³`; // Convert µg/m³ to mg/m³
          } else if (pill.short === "NO₂") {
            // NO₂ in µg/m³, no conversion needed
            pill.value = `${airData.no2.toFixed(1)} µg/m³`;
          } else if (pill.short === "PM2.5") {
            // PM2.5 in µg/m³, no conversion needed
            pill.value = `${airData.pm25.toFixed(1)} µg/m³`;
          } else if (pill.short === "PM10") {
            // PM10 in µg/m³, no conversion needed
            pill.value = `${airData.pm10.toFixed(1)} µg/m³`;
          } else if (pill.short === "O₃") {
            // Ozone (O₃) in µg/m³, no conversion needed
            pill.value = `${airData.o3.toFixed(1)} µg/m³`;

            
          }
        }
      }
    }

// Update pills and their widths
for (let pill of pills) {
  let label = pill.hover ? pill.long : pill.short;
  let textLabel = `${label}: ${pill.value}`;
  pill.targetWidth = textWidth(textLabel) + padding * 2;
  pill.currentWidth = lerp(pill.currentWidth, pill.targetWidth, 0.1);
}

// Position pills on screen
let x = xOffset; // Start at left side for both small and large screens
for (let pill of pills) {
  pill.x = x;
  pill.y = y;
  pill.hover = mouseX > pill.x && mouseX < pill.x + pill.currentWidth && mouseY > pill.y - h / 2 && mouseY < pill.y + h / 2;

  // If screen is small, stack pills vertically on the left
  if (stackOnLeft) {
    y += h + 10; // Stack pills vertically with some space between them
  } else {
    x += pill.currentWidth + 10; // For larger screens, pills will be placed side by side
  }
}

// Draw pills with labels
for (let pill of pills) {
  let label = pill.hover ? pill.long : pill.short;
  let textLabel = `${label}: ${pill.value}`;
  fill(pill.color);
  noStroke();
  rect(pill.x, pill.y - h / 2, pill.currentWidth, h, h / 2);
  fill(255);
  text(textLabel, pill.x + padding, pill.y);
}

// Check if slide-out text boxes are visible and prevent the "Click on a particle" text from showing
if (!(slideOutVisibleInfo || slideOutVisibleLearnMore)) {

  // Determine if mouse is over any particle
  let hoveringParticle = false;
  for (let p of particles) {
    if (dist(mouseX, mouseY, p.x, p.y) < p.size / 2) {
      hoveringParticle = true;
      break;
    }
  }

  // Only show "Click on a particle" if not hovering any particle
  if (!hoveringParticle) {
    let tooltipText = "Click on a particle";
    textSize(14);
    let textW = textWidth(tooltipText) + 16;
    let textH = 26;
    let boxX = mouseX + 10;
    let boxY = mouseY - textH - 10;

    fill(255, 150); // Semi-transparent black
    noStroke();
    rect(boxX, boxY, textW, textH, 6); // Rounded rectangle box

    fill(0); // Text color
    textAlign(LEFT, CENTER);
    text(tooltipText, boxX + 8, boxY + textH / 2); // Draw the text inside the box
  }
}
  }



  // Adjust particles only when the visibility of 2036 changes
  if (is2036Visible) {
    // If 2036 is visible, increase the particle count based on airData.pm25
    targetParticles = map(airData.pm25, 10, 25, 400, 800); // More particles in 2036
  } else {
    // When 2036 is not visible, revert back to the normal range based on airData.pm25
    targetParticles = map(airData.pm25, 0, 100, 50, 300); // Normal particle count
  }

  // Add particles until we match the targetParticle count
  while (particles.length < targetParticles) {
    particles.push(new Particle(random(width), random(height), random(["pm25", "pm10", "co", "no2", "o3"])));
  }

  // Remove excess particles if we've reduced the particle count
  while (particles.length > targetParticles) {
    particles.pop();
  }

  // Update and display all the particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isOffScreen()) {
      particles.splice(i, 1);
    }
  }

  // Handle burst updates
  for (let i = bursts.length - 1; i >= 0; i--) {
    bursts[i].update();
    bursts[i].show();
    if (bursts[i].finished()) {
      bursts.splice(i, 1);
    }
  }

  // Handle slide-out box visibility
  if (slideOutVisibleInfo) {
    let boxWidth = 700;
    let boxHeight = 400;
    let x = (width - boxWidth) / 2;
    let y = (height - boxHeight) / 2;

    // Box
    fill(255, 255, 255, 100);
    stroke(255, 255);
    strokeWeight(2);
    rect(x, y, boxWidth, boxHeight, 20);

   // Draw scrollable content area
   fill(0);
   noStroke();
   textSize(14);
   textAlign(LEFT, TOP);

   // Create or update the scrollable div for content
  if (!textAreaInfo) {
  textAreaInfo = createDiv(slideOutTextInfo); // <-- Fixed variable name
  textAreaInfo.position(x + 20, y + 40);
  textAreaInfo.size(boxWidth - 40, boxHeight - 60);
  textAreaInfo.style('overflow-y', 'auto');
  textAreaInfo.style('padding-right', '20px');
  textAreaInfo.style('font-family', 'Poppins');
  textAreaInfo.style('line-height', '1.5');
} else {
  textAreaInfo.position(x + 20, y + 40);
  textAreaInfo.size(boxWidth - 40, boxHeight - 60);
}


    // "X" button to close the box
    let closeSize = 20;
    let closeX = x + boxWidth - closeSize - 10;
    let closeY = y + 10;
    noFill();
    noStroke();
    rect(closeX, closeY, closeSize, closeSize, 5);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(14);
    text("X", closeX + closeSize / 2, closeY + closeSize / 2);

    // Store position for click detection
    window._closeButtonInfo = { x: closeX, y: closeY, size: closeSize };
  }


  
  if (slideOutVisibleLearnMore) {
    let boxWidth = 700;
    let boxHeight = 400;  // Height to allow for scrollable content
    let x = (width - boxWidth) / 2;
    let y = (height - boxHeight) / 2;

    // Draw background for the box
    fill(255, 255, 255, 100);
    stroke(255);
    strokeWeight(2);
    rect(x, y, boxWidth, boxHeight, 20);

    // Draw scrollable content area
    fill(0);
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);

    // Create or update the scrollable div for content
    if (!textAreaLearnMore) {
      textAreaLearnMore = createDiv(slideOutTextLearnMore);
      
      textAreaLearnMore.position(x + 20, y + 40);  // Position inside the box
      textAreaLearnMore.size(boxWidth - 40, boxHeight - 60);  // Define width and height of the scrollable area
      textAreaLearnMore.style('overflow-y', 'auto');  // Enable vertical scrolling
      textAreaLearnMore.style('padding-right', '20px');  // Ensure space for scroll bar
      textAreaLearnMore.style('font-family', 'Arial');
      textAreaLearnMore.style('line-height', '1.5');
    } else {
      // Update position and size of the text area if it already exists
      textAreaLearnMore.position(x + 20, y + 40);
      textAreaLearnMore.size(boxWidth - 40, boxHeight - 60);
    
}


  
      // Draw the "X" button to close the box
      let closeSize = 20;
      let closeX = x + boxWidth - closeSize - 10;
      let closeY = y + 10;
      noFill();
      noStroke();
      rect(closeX, closeY, closeSize, closeSize, 5);
  
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(14);
      text("X", closeX + closeSize / 2, closeY + closeSize / 2);
  
      // Store position for click detection
      window._closeButtonLearnMore = { x: closeX, y: closeY, size: closeSize };
      


    }
}
  


function getAQIDescription(aqi) {
  if (is2036Visible) {
    return "⚠️Immediate Action Needed!⚠️";
  }

  if (aqi <= 50) return "Needs Improving";
  else if (aqi <= 100) return "Needs Improving";
  else if (aqi <= 150) return "Not Ideal, Consider Avoiding Outdoor Activities";
  else if (aqi <= 200) return "Polluted, Stay Safe";
  else return "Very Bad, Limit Exposure";
}



function getColor(pollutant) {
  if (pollutant === 'pm25') return color('#FF1493');
  else if (pollutant === 'pm10') return color('#1E90FF');
  else if (pollutant === 'co') return color('#FFD700');
  else if (pollutant === 'no2') return color('#32CD32');
  else if (pollutant === 'o3') return color('#FF0000');
  else return color(0);
}

class Particle {

  getFullName() {
    switch (this.type) {
      case "co":
        return "Carbon Monoxide";
      case "no2":
        return "Nitrogen Dioxide";
      case "o3":
        return "Ozone";
      case "pm25":
        return "PM2.5 (Fine Particles)";
      case "pm10":
        return "PM10 (Coarse Particles)";
      default:
        return this.type.toUpperCase();
    }
  }
  

  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.size = random(6, 14);
    this.speedX = random(-0.5, 0.5);
    this.speedY = random(-0.5, 0.5);
    this.type = type;
    this.hover = false;
  }

  update() {
    if (this.isMouseOver()) {
      this.hover = true;
    } else {
      this.hover = false;
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }

  display() {
    noStroke();
    fill(getColor(this.type));
    ellipse(this.x, this.y, this.size);
  
    // Check if the hover text should be displayed (only if neither slide-out is visible)
    if (this.hover && this === Particle.currentHovered && !slideOutVisibleLearnMore && !slideOutVisibleInfo) {
      let header = this.getFullName();
      let textPadding = 18; // Padding for outer box
      let headerSize = 14;
      let bodyTextSize = 14;
      let rowSpacing = 15;
  
      // Table data
      let data = [];
      if (this.type === "co") {
        data = [
          ["Car exhaust", "Reduces oxygen in bloodstream"],
          ["Cigarette smoke", "Damages cardiovascular system"],
          ["Burning plastic", "Releases toxic fumes"],
          ["Gas-powered tools", "Emits CO when fuel is not fully burned"]
        ];
      } else if (this.type === "no2") {
        data = [
          ["Vehicle emissions", "Irritates airways, triggers asthma"],
          ["Idling engines", "Increases urban air toxicity"]
        ];
      } else if (this.type === "o3") {
        data = [
          ["Petrol/diesel vehicles", "Ground-level ozone from emissions"],
          ["Gas lawn tools", "Emit ozone-forming VOCs"],
          ["Aerosol sprays", "Emit VOCs contributing to ozone"],
          ["Plastic products", "Off-gas ozone precursors"],
          ["Factories", "Release NOₓ and VOCs"]
        ];
      } else if (this.type === "pm25" || this.type === "pm10") {
        data = [
          ["Vehicle emissions", "Penetrates deep into lungs"],
          ["Cigarette smoke", "Harms lungs and heart"],
          ["Candles & cooking", "Indoor air pollution"],
          ["Burning wood", "Releases ultra-fine particles"],
          ["Construction dust", "Irritates airways"],
          ["Synthetic clothing", "Sheds microfibres"],
          ["Factories", "Emit heavy metal dust"]
        ];
      }
  
      // Column width calculation
      textSize(bodyTextSize);
      let col1Width = 0;
      let col2Width = 0;
      for (let [src, impact] of data) {
        col1Width = max(col1Width, textWidth(src));
        col2Width = max(col2Width, textWidth(impact));
      }
  
      // Space between columns
      let columnSpacing = 50; // Increase space between the two columns
  
      let boxWidth = col1Width + col2Width + columnSpacing + textPadding * 4; // Adjusted width to accommodate spacing
      let boxHeight = headerSize + data.length * (bodyTextSize + rowSpacing) + textPadding * 2 + 16;
  
      // Calculate position to make sure the box is within the screen bounds
      let boxX = this.x + this.size / 2 + 12;
      let boxY = this.y - boxHeight / 2;
  
      // Check if the box is going off the screen to the right
      if (boxX + boxWidth > width) {
        boxX = width - boxWidth - 12; // Move it left
      }
  
      // Check if the box is going off the screen to the left
      if (boxX < 0) {
        boxX = 12; // Move it right
      }
  
      // Check if the box is going off the screen at the bottom
      if (boxY + boxHeight > height) {
        boxY = height - boxHeight - 12; // Move it up
      }
  
      // Check if the box is going off the screen at the top
      if (boxY < 0) {
        boxY = 12; // Move it down
      }
  
      // Draw background box
      stroke(255, 255);
      strokeWeight(2);
      fill(255, 255, 255, 50);
      rect(boxX, boxY, boxWidth, boxHeight, 12);
      noStroke();
  
      // Draw header
      fill(0);
      textAlign(LEFT, TOP);
      textFont("Poppins");
      textSize(headerSize);
      textStyle(BOLD);
      let startX = boxX + textPadding;
      let startY = boxY + textPadding;
      text(header, startX, startY);
  
      // Header underline - Adjusted the lineY for more space
      stroke(0, 100);
      strokeWeight(1);
      let lineY = startY + headerSize + 12; // Moved the line further down
      line(startX, lineY, startX + boxWidth - textPadding * 2, lineY);
      noStroke();
  
      // Add extra spacing after the header
      let extraSpacingAfterHeader = 10; // Adjust this value as needed
      lineY += extraSpacingAfterHeader;
  
      // Draw table rows
      textStyle(NORMAL);
      textSize(bodyTextSize);
      let yOffset = lineY + 6;
      for (let i = 0; i < data.length; i++) {
        let [src, impact] = data[i];
        text(src, startX, yOffset);
        text(impact, startX + col1Width + columnSpacing, yOffset); // Increased horizontal space between columns
  
        // Draw line only if it's not the last item in the data array
        if (i < data.length - 1) {
          stroke(0, 30);
          strokeWeight(0.5);
          let dividerLineY = yOffset + bodyTextSize + 6; // Slightly adjusted to give space below each row
          line(startX, dividerLineY, startX + boxWidth - textPadding * 2, dividerLineY);
          noStroke();
        }
  
        yOffset += bodyTextSize + rowSpacing;
      }
    }
  
  }
  

  isOffScreen() {
    return (this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50);
  }

  isMouseOver() {
    return dist(mouseX, mouseY, this.x, this.y) < this.size / 2;
  }

  triggerBurst() {
    let burstList = [];

    if (this.type === "co") burstList = burstImages.co;
    else if (this.type === "no2") burstList = burstImages.no2;
    else if (this.type === "o3") burstList = burstImages.o3;
    else if (this.type === "pm25" || this.type === "pm10") burstList = burstImages.pm;

    for (let i = 0; i < 10; i++) {
      if (burstList.length > 0) {
        let img = random(burstList);
        bursts.push(new BurstImage(this.x, this.y, img));
      }
    }
  }

  getCorrelations() {
    if (this.type === "co") {
      return ["Vehicles", "Cigarette Smoke", "Burning Plastic", "Gas-powered Equipment"];
    } else if (this.type === "no2") {
      return ["Vehicle Emissions", "Idling Cars"];
    } else if (this.type === "o3") {
      return ["Vehicles", "Gas-powered Lawn Equipment", "Aerosol Sprays", "Plastic Products", "Factories"];
    } else if (this.type === "pm25" || this.type === "pm10") {
      return ["Vehicles", "Cigarette Smoke", "Burning Candles", "Frying Food", "Burning Wood", "Plastic Waste", "Construction Dust", "Factories", "Washing Synthetic Clothes"];
    }
    return [];
  }
}

Particle.currentHovered = null;

function mouseMoved() {

  Particle.currentHovered = null;
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].isMouseOver()) {
      Particle.currentHovered = particles[i];
      break;
    }
  }
}

class BurstImage {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.alpha = 255;
    this.size = 200;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 1;
  }

  show() {
    tint(255, this.alpha);
    let aspectRatio = this.img.width / this.img.height;
    let imgWidth = this.size;
    let imgHeight = this.size;

    if (this.img.width > this.img.height) {
      imgHeight = imgWidth / aspectRatio;
    } else {
      imgWidth = imgHeight * aspectRatio;
    }

    imageMode(CENTER);
    image(this.img, this.x, this.y, imgWidth, imgHeight);
  }

  finished() {
    return this.alpha <= 0;
  }
}

function mousePressed() {
  // Close "Show Info" box if clicked
  if (slideOutVisibleInfo && window._closeButtonInfo) {
    let b = window._closeButtonInfo;
    if (
      mouseX >= b.x &&
      mouseX <= b.x + b.size &&
      mouseY >= b.y &&
      mouseY <= b.y + b.size
    ) {
      slideOutVisibleInfo = false;

      if (textAreaInfo) {
        textAreaInfo.remove();
        textAreaInfo = null;
      }

      window._closeButtonInfo = null;
      return; // Prevent further interaction this click
    }
  }

  // Close "Learn More" box if clicked
  if (slideOutVisibleLearnMore && window._closeButtonLearnMore) {
    let b = window._closeButtonLearnMore;
    if (
      mouseX >= b.x &&
      mouseX <= b.x + b.size &&
      mouseY >= b.y &&
      mouseY <= b.y + b.size
    ) {
      slideOutVisibleLearnMore = false;

      if (textAreaLearnMore) {
        textAreaLearnMore.remove();
        textAreaLearnMore = null;
      }

      window._closeButtonLearnMore = null;
      return; // Prevent further interaction this click
    }
  }

  // Handle particle burst on click
  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].isMouseOver()) {
      particles[i].triggerBurst();
    }
  }
}
