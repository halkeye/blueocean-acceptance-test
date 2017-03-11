// Using Gulp to run Nightwatch test suites from inside JUnit tests.
// Using Gulp because frontend (see maven deps) provides an easy way
// of running it.
// See NightwatchTest and it's impls.

const gulp  = require('gulp');
const shell = require('gulp-shell');
const jsdoc = require('gulp-jsdoc3');
const config = require('./jsdocConfig.json');
const parseArgs = require('minimist')
const exec = require('child_process').exec;

console.log('argv', process.argv);
gulp.task('default', function(done) {
    const args = parseArgs(process.argv.slice(2));
    const cmd = [
        'nightwatch',
        '--retries', '5',
        '--suiteRetries', '2'
    ];
    if (args.env) {
        cmd.push('--env', args.env)
    }
    if (args.test) {
        cmd.push(args.test);
    }
    shell.task(cmd.join(' '))(done);
});

gulp.task('doc', function (cb) {
    console.log('***************Generate documentation+++++++++++++++++++++++++++++++++++');
    gulp.src(['README.md', './src/**/*.js'], {read: false})
        .pipe(jsdoc(config, cb));
});
