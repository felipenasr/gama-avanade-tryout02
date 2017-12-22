var assert = require('assert');
var pixelmatch = require('pixelmatch');
var PNG = require('pngjs').PNG;
var fs = require('fs');
var path = require('path');
var sys = require('util');
var exec = require('child_process').exec;
exec('ng serve --port 8090');
// server.startServer(8090);
var url = 'http://localhost:8090';

describe('Tryout#1 - ', function() {

	it('Teste de fumaça: pelo menos este teste tem que rodar', function() {
		assert(true, true)
	});

	describe('Código HTML&CSS: ', function() {

		it('O layout desktop deve ser igual ao gabarito', function () {
			layoutTestRunner("assertion-desktop", 800, 600)
	    });

	    it('O layout mobile deve ser igual ao gabarito', function () {
	        layoutTestRunner("assertion-mobile", 376, 667)
	    });

	});
});

function layoutTestRunner(assertion_file, width, height) {
	browser.setViewportSize({
	    width: width,
	    height: height
	});
	browser.url(url);
	browser.waitForVisible('#appointment-input');
	var screenshotName = './screenshot-' + assertion_file + ".png"
	browser.saveScreenshot(screenshotName);
	var os = process.platform;
	var img1 = PNG.sync.read(fs.readFileSync(screenshotName));
	var img2 = PNG.sync.read(fs.readFileSync('./test/' + os + "-" + assertion_file + '.png'));
    var diff = new PNG({width: img1.width, height: img1.height});
    var pixelsDiff = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1});
    diff.pack().pipe(fs.createWriteStream('diff' + assertion_file + '.png'));
	assert.equal(pixelsDiff, 0);
}
