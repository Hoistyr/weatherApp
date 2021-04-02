import { format } from 'date-fns';

const buildSearchBar = () => {
  const content = document.querySelector('#content');
  const infoDiv = document.querySelector('#infoDiv');
  const searchBarHolder = document.createElement('div');
  searchBarHolder.id = "searchBarHolder";
  content.insertBefore(searchBarHolder, infoDiv);
  

  const searchBar = document.createElement('input');
  searchBar.id = 'searchBar';
  searchBar.type = 'search';
  searchBar.defaultValue = 'Search City';
  searchBarHolder.appendChild(searchBar);
  
}

const buildClock = (initialTime) => {
  const infoDiv = document.querySelector('#infoDiv');
  const clockHolder = document.createElement('div');
  clockHolder.id = 'clockHolder';
  infoDiv.appendChild(clockHolder);

  const clock = document.createElement('div');
  clock.id = 'clock';
  clockHolder.appendChild(clock);

  const clockHourHolder = document.createElement('div');
  clockHourHolder.id = 'clockHourHolder';
  clock.appendChild(clockHourHolder);

  const clockHour = document.createElement('h1');
  clockHour.id = 'clockHour';
  clockHour.classList.add('clockText');
  clockHourHolder.appendChild(clockHour);

  const clockMinuteHolder = document.createElement('div');
  clockMinuteHolder.id = 'clockMinuteHolder';
  clock.appendChild(clockMinuteHolder);

  const clockMinute = document.createElement('h1');
  clockMinute.id = 'clockHour';
  clockMinute.classList.add('clockText');
  clockMinuteHolder.appendChild(clockMinute);

  const clockSecondHolder = document.createElement('div');
  clockSecondHolder.id = 'clockSecondHolder';
  clock.appendChild(clockSecondHolder);

  const clockSecond = document.createElement('h1');
  clockSecond.id = 'clockSecond';
  clockSecond.classList.add('clockText');
  clockSecondHolder.appendChild(clockSecond);
  
  const updateTime = () => {
    clockHour.textContent = format((new Date), 'hh');
    clockMinute.textContent = format((new Date), ':mm');
    clockSecond.textContent = format((new Date), ':ss aa');
  }
  setInterval(updateTime, 10);
}

const setBackgroundColor = (hour) => {
  const content = document.querySelector('#content');
  console.log(!hour);
  let currentHour = hour;
  if (!hour) {
    currentHour = format(new Date(), 'H');
  }

  if (currentHour < 4 || currentHour > 19) {
    content.style.backgroundColor = 'rgb(36, 37, 42)';
  } 

  if (currentHour > 3 && currentHour < 9) {
    content.style.backgroundColor = 'rgb(92, 151, 191)';
  }

  if (currentHour > 8 && currentHour < 11) {
    content.style.backgroundColor = 'rgb(37, 116, 169)';
  }

  if (currentHour > 10 && currentHour < 15) {
    content.style.backgroundColor = 'rgb(30, 139, 195)';
  }

  if (currentHour > 14 && currentHour < 19) {
    content.style.backgroundColor = 'rgb(34, 49, 63)';
  }
};

const buildPageLayout = () => {
  setBackgroundColor();
  buildSearchBar();
  buildClock();
}

const onPageLoad = (() => {
  const content = document.querySelector('#content');
  buildPageLayout();

})();

export default { onPageLoad }