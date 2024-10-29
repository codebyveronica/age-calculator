// Variables
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const calculateBtn = document.querySelector('#calculateBtn')

let isValidDay = false;
let isValidMonth = false;
let isValidYear = false;

const yearsTxt = document.querySelector('#yearsTxt');
const monthsTxt = document.querySelector('#monthsTxt');
const daysTxt = document.querySelector('#daysTxt');

// Functions
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

const displayFeedbackError = (element, feedbackElement, message, label) => {
  element.classList.add('error');
  label.classList.add('error');
  feedbackElement.innerHTML = message;
}

const removeFeedbackError = (element, feedbackElement, label) => {
  element.classList.remove('error');
  label.classList.remove('error');
  feedbackElement.innerHTML = '';
}

const checkDate = (day, month, year) => {
  const dayLabel = document.querySelector('#dayLabel')
  const dayFeedbackElement = document.querySelector('#dayFeedbackElement');
  const monthLabel = document.querySelector('#monthLabel');
  const monthFeedbackElement = document.querySelector('#monthFeedbackElement');
  const yearLabel = document.querySelector('#yearLabel');
  const yearFeedbackElement = document.querySelector('#yearFeedbackElement');

  if(dayInput.value === '') {
    displayFeedbackError(dayInput, dayFeedbackElement, 'This field is required', dayLabel);
    isValidDay = false;
  }else if(dayInput.value > 31) {
    displayFeedbackError(dayInput, dayFeedbackElement, 'Must be a valid day', dayLabel);
    isValidDay = false;
  }else if(dayInput.value > daysInMonth(year.value, month.value)) {
    displayFeedbackError(dayInput, dayFeedbackElement, 'Must be a valid date', dayLabel);
    isValidDay = false;
  } else {
    removeFeedbackError(dayInput, dayFeedbackElement, dayLabel);
    isValidDay = true;
  }

  if(monthInput.value === '') {
    displayFeedbackError(monthInput, monthFeedbackElement, 'This field is required', monthLabel);
    isValidMonth = false;
  }else if(monthInput.value > 12 || monthInput.value <= 0) {
    displayFeedbackError(monthInput, monthFeedbackElement, 'Must be a valid month', monthLabel);
    isValidMonth = false;
  }else {
    removeFeedbackError(monthInput, monthFeedbackElement, monthLabel);
    isValidMonth = true;
  }

  if(yearInput.value === '') {
    displayFeedbackError(yearInput, yearFeedbackElement, 'This field is required', yearLabel);
    isValidYear = false;
  }else if(yearInput.value <= 0){
    displayFeedbackError(yearInput, yearFeedbackElement, 'Must be a valid year', yearLabel);
    isValidYear = false;
  }else if(yearInput.value > new Date().getFullYear()) {
    displayFeedbackError(yearInput, yearFeedbackElement, 'Must be in the past', yearLabel);
    isValidYear = false;
  }else {
    removeFeedbackError(yearInput, yearFeedbackElement, yearLabel);
    isValidYear = true;
  }
}

const calculateAge = (day, month, year) => {
  const birthDate = new Date(year.value, month.value - 1, day.value);
  const today = new Date();

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += daysInMonth(today.getFullYear(), today.getMonth());
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  yearsTxt.innerHTML = ageYears;
  monthsTxt.innerHTML = ageMonths;
  daysTxt.innerHTML = ageDays;

  const currentDateTxt = document.querySelector('#current-date');
  currentDateTxt.innerHTML = `for current ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`

  let totalMonths = (ageYears * 12) + ageMonths;
  let totalWeeks = totalMonths * 4;
  let totalDays = totalWeeks * 365;
  let totalHours = totalDays * 24;
  let totalMinutes = totalDays * 60;
  let totalSeconds = totalMinutes * 60;

  const totalYearsTxt = document.querySelector('#total-years');
  const totalMonthsTxt = document.querySelector('#total-months');
  const totalWeeksTxt = document.querySelector('#total-weeks');
  const totalDaysTxt = document.querySelector('#total-days');
  const totalHoursTxt = document.querySelector('#total-hours');
  const totalMinutesTxt = document.querySelector('#total-minutes');
  const totalSecondsTxt = document.querySelector('#total-seconds');

  totalYearsTxt.innerHTML = ageYears;
  totalMonthsTxt.innerHTML = totalMonths;
  totalWeeksTxt.innerHTML = totalWeeks;
  totalDaysTxt.innerHTML = totalDays;
  totalHoursTxt.innerHTML = totalHours;
  totalMinutesTxt.innerHTML = totalMinutes;
  totalSecondsTxt.innerHTML = totalSeconds;
}

const timeUntilBirthday = (day, month) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  let nextBirthday = new Date(currentYear, month.value - 1, day.value);

  if (nextBirthday < today) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  const differenceInTime = nextBirthday - today;

  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
  const differenceInHours = Math.floor((differenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const dayOfTheWeek = nextBirthday.getDay();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const daysUntilTxt = document.querySelector('#days-until');
  const hoursUntilTxt = document.querySelector('#hours-until');
  const weekDayTxt = document.querySelector('#week-day');

  daysUntilTxt.innerHTML = differenceInDays;
  hoursUntilTxt.innerHTML = differenceInHours;
  weekDayTxt.innerHTML = daysOfWeek[dayOfTheWeek];
}

// Event Listerners
calculateBtn.addEventListener('click', (e) => {
  checkDate(day, month, year);

  if(isValidDay == true && isValidMonth == true && isValidYear == true) {
    calculateAge(day, month, year);
    timeUntilBirthday(month, day);
  } else {
    yearsTxt.innerHTML = '--';
    monthsTxt.innerHTML = '--';
    daysTxt.innerHTML = '--';
  }
})