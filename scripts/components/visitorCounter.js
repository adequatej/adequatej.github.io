// Visitor Counter 
// uses local storage w/ a json file to store data and keep it persistent rather than reset after page reload
class VisitorCounter {
    constructor() {
        this.uniqueCountElement = document.getElementById('unique-count');
        this.totalCountElement = document.getElementById('total-count');
        this.visitorId = this.getOrCreateVisitorId();
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

    initializeCounter() {
        const storedTotal = localStorage.getItem('totalVisits') || 0;
        const storedUnique = localStorage.getItem('uniqueVisitors') || 0;
        
        this.updateDisplay(parseInt(storedUnique), parseInt(storedTotal));
        this.recordVisit();
    }

    recordVisit() {
        let totalVisits = parseInt(localStorage.getItem('totalVisits') || 0);
        let uniqueVisitors = parseInt(localStorage.getItem('uniqueVisitors') || 0);

        totalVisits++;
        
        if (!localStorage.getItem('hasVisited')) {
            uniqueVisitors++; 
            localStorage.setItem('hasVisited', 'true');
        }

        localStorage.setItem('totalVisits', totalVisits);
        localStorage.setItem('uniqueVisitors', uniqueVisitors);

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

document.addEventListener('DOMContentLoaded', () => {
    new VisitorCounter();
});