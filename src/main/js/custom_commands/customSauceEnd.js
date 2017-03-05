exports.command = function(cb) {
    var sessionid = this.capabilities['webdriver.remote.sessionid'];
    console.log(this.currentTest);
    var jobName = this.currentTest.name;
    console.log("SauceOnDemandSessionID=" + sessionid + " job-name=" + jobName);

    if (process.env.SAUCE_USERNAME) {
      var SauceLabs = require("saucelabs");
      var saucelabs = new SauceLabs({
          username: process.env.SAUCE_USERNAME,
          password: process.env.SAUCE_ACCESS_KEY
      });

      saucelabs.updateJob(sessionid, {
          passed: this.currentTest.results.failed === 0,
          name: jobName
      }, cb);
    }

};
