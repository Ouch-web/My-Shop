// Default time zones
const DEFAULT_TIMEZONES = [
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
];

// Comprehensive list of all timezones
const ALL_TIMEZONES = [
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
    { name: 'Chicago', timezone: 'America/Chicago' },
    { name: 'Denver', timezone: 'America/Denver' },
    { name: 'Anchorage', timezone: 'America/Anchorage' },
    { name: 'Honolulu', timezone: 'Pacific/Honolulu' },
    { name: 'Toronto', timezone: 'America/Toronto' },
    { name: 'Mexico City', timezone: 'America/Mexico_City' },
    { name: 'São Paulo', timezone: 'America/Sao_Paulo' },
    { name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Paris', timezone: 'Europe/Paris' },
    { name: 'Berlin', timezone: 'Europe/Berlin' },
    { name: 'Moscow', timezone: 'Europe/Moscow' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'New Delhi', timezone: 'Asia/Kolkata' },
    { name: 'Bangkok', timezone: 'Asia/Bangkok' },
    { name: 'Singapore', timezone: 'Asia/Singapore' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
    { name: 'Shanghai', timezone: 'Asia/Shanghai' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Seoul', timezone: 'Asia/Seoul' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Melbourne', timezone: 'Australia/Melbourne' },
    { name: 'Brisbane', timezone: 'Australia/Brisbane' },
    { name: 'Auckland', timezone: 'Pacific/Auckland' },
    { name: 'Fiji', timezone: 'Pacific/Fiji' },
    { name: 'Istanbul', timezone: 'Europe/Istanbul' },
    { name: 'Cairo', timezone: 'Africa/Cairo' },
    { name: 'Johannesburg', timezone: 'Africa/Johannesburg' },
    { name: 'Lagos', timezone: 'Africa/Lagos' },
    { name: 'Nairobi', timezone: 'Africa/Nairobi' },
];

// State
let clocks = [];
let is24HourFormat = true;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadClocks();
    setupEventListeners();
    generateTimezoneOptions();
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('addClockBtn').addEventListener('click', showTimezoneSelector);
    document.getElementById('resetBtn').addEventListener('click', resetToDefault);
    document.getElementById('format24').addEventListener('change', (e) => {
        is24HourFormat = e.target.checked;
        updateAllClocks();
    });
}

// Generate timezone options
function generateTimezoneOptions() {
    const list = document.getElementById('timezoneList');
    list.innerHTML = '';

    ALL_TIMEZONES.forEach(tz => {
        const option = document.createElement('div');
        option.className = 'timezone-option';
        option.textContent = `${tz.name} (${tz.timezone})`;
        option.onclick = () => addClock(tz);
        list.appendChild(option);
    });
}

// Show timezone selector
function showTimezoneSelector() {
    const selector = document.getElementById('timezoneSelector');
    selector.style.display = 'flex';
}

// Close timezone selector
function closeTimezoneSelector() {
    document.getElementById('timezoneSelector').style.display = 'none';
}

// Add clock
function addClock(tzObj) {
    const exists = clocks.some(c => c.timezone === tzObj.timezone);
    if (exists) {
        alert('This timezone is already added!');
        return;
    }

    clocks.push({
        id: Date.now(),
        name: tzObj.name,
        timezone: tzObj.timezone,
    });

    saveClocks();
    renderClocks();
    closeTimezoneSelector();
    updateAllClocks();
}

// Remove clock
function removeClock(id) {
    clocks = clocks.filter(c => c.id !== id);
    saveClocks();
    renderClocks();
}

// Reset to default
function resetToDefault() {
    clocks = DEFAULT_TIMEZONES.map(tz => ({
        id: Date.now() + Math.random(),
        ...tz,
    }));
    saveClocks();
    renderClocks();
    updateAllClocks();
}

// Save clocks to localStorage
function saveClocks() {
    localStorage.setItem('clocks', JSON.stringify(clocks));
}

// Load clocks from localStorage
function loadClocks() {
    const saved = localStorage.getItem('clocks');
    if (saved) {
        try {
            clocks = JSON.parse(saved);
        } catch (e) {
            clocks = DEFAULT_TIMEZONES.map(tz => ({
                id: Date.now() + Math.random(),
                ...tz,
            }));
        }
    } else {
        clocks = DEFAULT_TIMEZONES.map(tz => ({
            id: Date.now() + Math.random(),
            ...tz,
        }));
    }
}

// Render clocks
function renderClocks() {
    const container = document.getElementById('clocksContainer');
    container.innerHTML = '';

    if (clocks.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: white; font-size: 1.2rem;">No clocks added. Click "Add Time Zone" to get started!</p>';
        return;
    }

    clocks.forEach(clock => {
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.innerHTML = `
            <button class="remove-btn" onclick="removeClock(${clock.id})">×</button>
            <div class="timezone-name">${clock.name}</div>
            <div class="timezone-info">${clock.timezone}</div>
            <div class="analog-clock" id="analog-${clock.id}">
                <div class="hand hour-hand" id="hour-${clock.id}"></div>
                <div class="hand minute-hand" id="minute-${clock.id}"></div>
                <div class="hand second-hand" id="second-${clock.id}"></div>
                <div class="clock-center"></div>
                <div class="clock-number">
                    <span style="position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: auto;">12</span>
                    <span style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); width: auto;">3</span>
                    <span style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); width: auto;">6</span>
                    <span style="position: absolute; left: 8px; top: 50%; transform: translateY(-50%); width: auto;">9</span>
                </div>
            </div>
            <div class="day-name" id="day-${clock.id}"></div>
            <div class="digital-time" id="time-${clock.id}"></div>
            <div class="date-info" id="date-${clock.id}"></div>
        `;
        container.appendChild(card);
    });
}

// Update all clocks
function updateAllClocks() {
    clocks.forEach(clock => {
        updateClock(clock);
    });
}

// Update individual clock
function updateClock(clock) {
    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: clock.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: !is24HourFormat,
        });

        const parts = formatter.formatToParts(now);
        let hours = parseInt(parts.find(p => p.type === 'hour').value);
        const minutes = parseInt(parts.find(p => p.type === 'minute').value);
        const seconds = parseInt(parts.find(p => p.type === 'second').value);
        const period = parts.find(p => p.type === 'dayPeriod')?.value || '';

        // Get date information
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: clock.timezone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const dateString = dateFormatter.format(now);
        const dayName = dateString.split(',')[0];

        // Update digital time
        let timeString;
        if (is24HourFormat) {
            timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {
            timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} <span class="am-pm">${period}</span>`;
        }

        document.getElementById(`time-${clock.id}`).innerHTML = timeString;
        document.getElementById(`date-${clock.id}`).textContent = dateString;
        document.getElementById(`day-${clock.id}`).textContent = dayName;

        // Update analog clock hands
        // Convert to 24-hour for calculation
        const hoursAnalog = new Date().toLocaleString('en-US', {
            timeZone: clock.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        const [h, m, s] = hoursAnalog.match(/\d+/g);
        const hh = parseInt(h);
        const mm = parseInt(m);
        const ss = parseInt(s);

        const secondRotation = (ss * 6);
        const minuteRotation = (mm * 6) + (ss * 0.1);
        const hourRotation = ((hh % 12) * 30) + (mm * 0.5);

        document.getElementById(`second-${clock.id}`).style.transform = `rotate(${secondRotation}deg)`;
        document.getElementById(`minute-${clock.id}`).style.transform = `rotate(${minuteRotation}deg)`;
        document.getElementById(`hour-${clock.id}`).style.transform = `rotate(${hourRotation}deg)`;

    } catch (e) {
        console.error(`Error updating clock for ${clock.timezone}:`, e);
    }
}

// Close selector when clicking outside
document.addEventListener('click', (e) => {
    const selector = document.getElementById('timezoneSelector');
    if (selector.style.display === 'flex' && !e.target.closest('.timezone-list') && e.target.id !== 'addClockBtn') {
        if (e.target.closest('.timezone-selector')) {
            closeTimezoneSelector();
        }
    }
});
