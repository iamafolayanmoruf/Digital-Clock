const $ = (selector) => document.querySelector(selector);

const hoursElement = $(".hours");
const minutesElement = $(".min");
const secondsElement = $(".sec");
const dots = document.querySelectorAll(".dot");
const weekElement = $(".week");

let showDot = true;

function updateClock() {
  const now = new Date();

  // Get current time
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Determine AM/PM
  const isPM = hours >= 12;
  const period = isPM ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  hours = String(hours).padStart(2, "0");

  // Update time elements
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;

  // Add or update AM/PM period
  let periodElement = document.querySelector(".period");
  if (!periodElement) {
    periodElement = document.createElement("div");
    periodElement.className = "period";
    document.querySelector(".time").appendChild(periodElement);
  }
  periodElement.textContent = period;

  // Toggle the visibility of the dots
  showDot = !showDot;
  dots.forEach((dot) => {
    dot.style.visibility = showDot ? "visible" : "hidden";
  });

  // Highlight the current day
  Array.from(weekElement.children).forEach((day, index) => {
    day.classList.toggle("active", index === now.getDay());
  });
}

// Start the clock
setInterval(updateClock, 1000);
updateClock(); // Initialize immediately
