// model/streetlight.mjs

export default class Streetlight {
    constructor(id, street, latitude, longitude) {
        this.id = id;                   // Unique ID for the streetlight
        this.street = street;           // Street where the streetlight is located
        this.latitude = latitude;       // GPS latitude
        this.longitude = longitude;     // GPS longitude
        this.status = 'working';        // Initial status is "working"
        this.lastReported = null;       // Last reported timestamp (null until reported)
        this.isFixed = true;            // Whether the streetlight is currently fixed or not
        this.reportCount = 0;           // Number of times reported as broken
    }

    // Function to report the streetlight as broken
    reportBroken() {
        if (this.status === 'broken') {
            return 'Streetlight is already reported as broken.';
        }
        this.status = 'broken';
        this.lastReported = new Date();
        this.isFixed = false;
        this.reportCount += 1;
        return 'Streetlight has been reported as broken.';
    }

    // Function to mark the streetlight as fixed
    markFixed() {
        this.status = 'working';
        this.isFixed = true;
    }
}
