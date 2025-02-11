// Visitor Counter 
// uses local storage w/ a json file to store data and keep it persistent rather than reset after page reload
class VisitorCounter {
    constructor() {
        this.uniqueCountElement = document.getElementById('unique-count');
        this.totalCountElement = document.getElementById('total-count');
        this.visitorId = this.getOrCreateVisitorId();
        this.lastVisitTime = localStorage.getItem('lastVisitTime');
        this.initializeCounter();
    }

    getOrCreateVisitorId() {
        let visitorId = localStorage.getItem('visitorId');
        if (!visitorId) {
            visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('visitorId', visitorId);
        }
        return visitorId;
    }

    // Added a visit timeout (30 minutes) to prevent counting page reloads as new visits
    // This is to prevent spamming the counter
    initializeCounter() {
        const currentTime = Date.now();
        const visitTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds

        // Get stored values
        let totalVisits = parseInt(localStorage.getItem('totalVisits') || '0');
        let uniqueVisitors = parseInt(localStorage.getItem('uniqueVisitors') || '0');

        // Check if this is a new visit
        if (!this.lastVisitTime || (currentTime - parseInt(this.lastVisitTime)) > visitTimeout) {
            // Increment total visits only for new visits
            totalVisits++;
            localStorage.setItem('totalVisits', totalVisits);
            localStorage.setItem('lastVisitTime', currentTime.toString());

            // Check for unique visitor
            if (!localStorage.getItem('hasVisited')) {
                uniqueVisitors++;
                localStorage.setItem('uniqueVisitors', uniqueVisitors);
                localStorage.setItem('hasVisited', 'true');
            }
        }

        this.updateDisplay(uniqueVisitors, totalVisits);
    }

    updateDisplay(uniqueCount, totalCount) {
        if (this.uniqueCountElement) {
            this.uniqueCountElement.textContent = uniqueCount;
        }
        if (this.totalCountElement) {
            this.totalCountElement.textContent = totalCount;
        }
    }
}

// Initialize counter when page loads
document.addEventListener('DOMContentLoaded', () => {
    new VisitorCounter();
});