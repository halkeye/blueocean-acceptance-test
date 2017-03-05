exports.command = function(cb) {
    var sessionid = this.capabilities['webdriver.remote.sessionid'];
    console.log(this);
    var jobName = this.currentTest.name;
    if (jobName) {
        console.log("SauceOnDemandSessionID=" + sessionid + " job-name=" + jobName);
    } else {
        console.log("SauceOnDemandSessionID=" + sessionid);
    }

    if (process.env.SAUCE_USERNAME) {
        var SauceLabs = require("saucelabs");
        var saucelabs = new SauceLabs({
            username: process.env.SAUCE_USERNAME,
            password: process.env.SAUCE_ACCESS_KEY
        });
        var params = { passed: this.currentTest.results.failed === 0 };
        if (jobName) { params.name = jobName; }

        saucelabs.updateJob(sessionid, params, cb);
    }

};
