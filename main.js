// --- STATE MANAGEMENT & LOCAL STORAGE ---

// week 3 learning 


const LS_KEY = 'appPreferences';

const appState = {
    currentCharacterIndex: 0,
    isDarkMode: false,
    activeTheme: null,
};

const allBodyThemes = ["dark-mode", "blue-theme", "green-theme", "purple-theme"];

function saveState() {
    localStorage.setItem(LS_KEY, JSON.stringify(appState));
}

function loadState() {
    const savedState = localStorage.getItem(LS_KEY);
    if (savedState) {
        Object.assign(appState, JSON.parse(savedState));
    }
}

// --- INITIALIZATION ---
loadState();

// --- DOM ELEMENT SELECTIONS ---
// Character Profile Elements
const profile = document.getElementById("profile");
const nameEl = document.getElementById("name");
const ageEl = document.getElementById("age");
const roleEl = document.getElementById("role");
const weaponEl = document.getElementById("weapon");
const switchCharacterEl = document.getElementById("switchCharacter");

// UI Control Elements
const togglebutton = document.getElementById("toggleMode");
const themeButtons = document.querySelectorAll(".theme-b");

// --- CHARACTER DATA ---
const character = [{
    name: "Buzz Lightyear",
    age: "22",
    role: "assassin",
    weapon: "Swords"
},
{
    name: "Light",
    age: "30",
    role: "mage",
    weapon: "Guns",
},
{
    name: "Kai",
    age: "27",
    role: "slayer",
    weapon: "Spoons"
}];

// --- FUNCTIONS TO RENDER UI ---
function clearAllBodyThemes() {
    allBodyThemes.forEach(themeClass => {
        document.body.classList.remove(themeClass);
    });
}

function renderCharacterProfile() {
    const c = character[appState.currentCharacterIndex];
    nameEl.textContent = `Name: ${c.name}`;
    ageEl.textContent = `Age: ${c.age}`;
    roleEl.textContent = `Role: ${c.role}`;
    weaponEl.textContent = `Weapon: ${c.weapon}`;
}

function applyThemeFromState() {
    clearAllBodyThemes();

    if (appState.isDarkMode) {
        document.body.classList.add('dark-mode');
    } else if (appState.activeTheme) {
        document.body.classList.add(`${appState.activeTheme}-theme`);
    }
}

// --- INITIAL RENDERING ---
renderCharacterProfile();
applyThemeFromState();

// --- EVENT LISTENERS ---
switchCharacterEl.addEventListener('click', () => {
    appState.currentCharacterIndex = (appState.currentCharacterIndex + 1) % character.length;
    renderCharacterProfile();
    saveState();
});

togglebutton.addEventListener('click', () => {
    appState.isDarkMode = !appState.isDarkMode;
    appState.activeTheme = null;
    applyThemeFromState();
    saveState();
});

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        appState.activeTheme = theme;
        appState.isDarkMode = false;
        applyThemeFromState();
        saveState();
    });
});