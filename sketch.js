let airData = {
  aqi: 0,
  pm25: 0,
  pm10: 0,
  no2: 0,
  o3: 0,
  co: 0
};

let particles = [];
let lat, lon;
let dataLoaded = false;
let pills = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Arial');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(gotPos, geoFail);
  } else {
    console.log("Geolocation not supported.");
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
}

function geoFail() {
  console.log("Could not get location.");
}

function setupPills() {
  pills = [
    {
      short: "AQI",
      long: "Air Quality Index",
      value: getAQIDescription(airData.aqi),
      color: color(50)
    },
    {
      short: "PM2.5",
      long: "Particle Matter ≤ 2.5 µm",
      value: `${nf(airData.pm25, 1, 1)} µg/m³`,
      color: getColor("pm25")
    },
    {
      short: "PM10",
      long: "Particle Matter ≤ 10 µm",
      value: `${nf(airData.pm10, 1, 1)} µg/m³`,
      color: getColor("pm10")
    },
    {
      short: "NO₂",
      long: "Nitrogen Dioxide",
      value: `${nf(airData.no2, 1, 1)} µg/m³`,
      color: getColor("no2")
    },
    {
      short: "O₃",
      long: "Ozone",
      value: `${nf(airData.o3, 1, 1)} µg/m³`,
      color: getColor("o3")
    },
    {
      short: "CO",
      long: "Carbon Monoxide",
      // FIXED: Convert μg/m³ to ppm using 0.000873 factor
      value: `${nf(airData.co * 0.000873, 1, 3)} ppm`,  // ✅ Corrected conversion
      // Or if you prefer μg/m³, use:
      // value: `${nf(airData.co, 1, 1)} µg/m³`,
      color: getColor("co")
    }
  ];

  for (let pill of pills) {
    pill.hover = false;
    pill.currentWidth = 0;
    pill.targetWidth = 0;
  }
}

function draw() {
  // Background gradient
  let topColor = color('#bee2f8');
  let bottomColor = color('#fff176');
  for (let y = 0; y < height; y++) {
    let t = map(y, 0, height, 0, 1);
    let eased = pow(t, 1.8);
    let c = lerpColor(topColor, bottomColor, eased);
    stroke(c);
    line(0, y, width, y);
  }

  if (dataLoaded) {
    textSize(14);
    textAlign(LEFT, CENTER);

    let padding = 10;
    let h = 30;
    let xOffset = 20;
    let y = 30;

    for (let pill of pills) {
      let label = pill.hover ? pill.long : pill.short;
      let textLabel = `${label}: ${pill.value}`;
      pill.targetWidth = textWidth(textLabel) + padding * 2;
      pill.currentWidth = lerp(pill.currentWidth, pill.targetWidth, 0.1);
    }

    for (let pill of pills) {
      pill.x = xOffset;
      pill.y = y;

      if (
        mouseX > pill.x &&
        mouseX < pill.x + pill.currentWidth &&
        mouseY > pill.y - h / 2 &&
        mouseY < pill.y + h / 2
      ) {
        pill.hover = true;
      } else {
        pill.hover = false;
      }

      xOffset += pill.currentWidth + 10;
    }

    for (let pill of pills) {
      let label = pill.hover ? pill.long : pill.short;
      let textLabel = `${label}: ${pill.value}`;
      fill(pill.color);
      noStroke();
      rect(pill.x, pill.y - h / 2, pill.currentWidth, h, h / 2);
      fill(255);
      text(textLabel, pill.x + padding, pill.y);
    }

  } else {
    fill(120);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Loading air quality data...", width / 2, height / 2);
  }

  let targetParticles = map(airData.pm25, 0, 100, 50, 300);
  while (particles.length < targetParticles) {
    particles.push(new Particle(random(width), random(height), "pm25"));
    particles.push(new Particle(random(width), random(height), "pm10"));
    particles.push(new Particle(random(width), random(height), "co"));
    particles.push(new Particle(random(width), random(height), "no2"));
    particles.push(new Particle(random(width), random(height), "o3"));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isOffScreen()) {
      particles.splice(i, 1);
    }
  }
}

function getAQIDescription(aqi) {
  if (aqi <= 50) return "Good";
  else if (aqi <= 100) return "Medium";
  else if (aqi <= 150) return "Bad";
  else return "Very Bad";
}

function getColor(pollutant) {
  if (pollutant === 'pm25') return color('#EE4266');
  else if (pollutant === 'pm10') return color('#1374CF');
  else if (pollutant === 'co') return color('#FF7700');
  else if (pollutant === 'no2') return color('#50BF4A');
  else if (pollutant === 'o3') return color('#FFE74C');
  else return color(0);
}

class Particle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.size = random(6, 14);
    this.speedX = random(-0.5, 0.5);
    this.speedY = random(-0.5, 0.5);
    this.type = type;
  }

  update() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < 100) {
      let angle = atan2(this.y - mouseY, this.x - mouseX);
      let force = map(d, 0, 100, 4, 0);
      this.x += cos(angle) * force;
      this.y += sin(angle) * force;
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }

  display() {
    noStroke();
    fill(getColor(this.type));
    ellipse(this.x, this.y, this.size);
  }

  isOffScreen() {
    return (
      this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50
    );
  }
}
