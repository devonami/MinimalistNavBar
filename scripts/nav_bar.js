import { fetchDataFromFile } from './inject.js';
import { getTimeForCity } from './world_time.js';

/**
 * Creates a nav menu based on the provided data.
 *
 * @param {Object} navData - The navigation data containing cities information.
 * @return {void}
 */
function createNavigationMenu(navData) {
    const navbar = document.getElementById('nav-list');

    for (const navDatum of navData['cities']) {
        const navItem = document.createElement('a');
        navItem.href = '#';
        navItem.textContent = navDatum.label;
        navItem.classList.add('nav-link');

        const navListWrapper = document.createElement('li');
        navListWrapper.classList.add('nav-item');

        navListWrapper.appendChild(navItem);
        navbar.appendChild(navListWrapper);
    }
}

/**
 * Animates the slider based on the nav item click and window resize events.
 *
 * @return {void}
 */
function animateSlider() {
    const navItems = document.querySelector('#nav-list');

    const navBar = document.querySelector('#navbar');

    navItems.addEventListener('click', function(event) {
       if (event.target.classList.contains('nav-link')) {
           void setTimeForLocation(event.target.textContent);
           const isActive = document.querySelector('.active');
           if (isActive) isActive.classList.remove('active');

           event.target.classList.add('active');
           navBar.style.setProperty('--underline-width', `${event.target.offsetWidth}px`);
           navBar.style.setProperty('--underline-offset-x', `${event.target.offsetLeft}px`);
       }
    });

    addEventListener('resize', function(event) {
        const isActive = document.querySelector('.active');
        if (!isActive) return;

        navBar.style.setProperty('--underline-width', `${isActive.offsetWidth}px`);
        navBar.style.setProperty('--underline-offset-x', `${isActive.offsetLeft}px`);
    });
}

/**
 * Sets the current time for the given city name in the DOM element with the ID 'time'.
 *
 * @param {string} cityName - The name of the city for which to set the current time.
 * @return {Promise<void>} Resolves once the time is set.
 */
async function setTimeForLocation(cityName) {
    const datetime = await getTimeForCity(cityName);
    const time = document.getElementById('time');
    time.textContent = datetime;
}

fetchDataFromFile('data/navigation.json')
    .then(navData => {
        createNavigationMenu(navData);
        animateSlider();
    })
    .catch(error => console.error('Error fetching data:', error));
