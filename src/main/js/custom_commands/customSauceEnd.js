exports.command = function(cb) {
    var sessionid = this.capabilities['webdriver.remote.sessionid'];
    var jobName = this.currentTest.name;
    console.log("SauceOnDemandSessionID=" + sessionid + " job-name=" + jobName);
};
