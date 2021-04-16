const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .get("/hello")
        .end(function (err, res) {
          // change assert parameter from fail to equal
          assert.equal(res.status, 200);
          // change assert parameter from fail to equal
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .get("/hello?name=Winston_Churchill")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Winston_Churchill");
          done();
        });
    });
    // #3
    test('send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        // Send the following JSON response as a payload:
        .send({surname: "Colombo"})
    
        .end(function (err, res) {
        // Check status, type, name, surname using assert tests

          assert.equal(res.status, 200),
          assert.equal(res.type, 'application/json'),assert.equal(res.body.name, 'Cristoforo'),
          assert.equal(res.body.surname, 'Colombo');

          done();
        });
    });
    // #4
    test('send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({surname: "da Verrazzano"})
        .end(function (err, res) {
        // Check status, type, name, surname using assert tests

      assert.equal(res.status, 200),
      assert.equal(res.type, 'application/json'),assert.equal(res.body.name, 'Giovanni'),
      assert.equal(res.body.surname, 'da Verrazzano');

      done();
        });
    });
  });
});

const Browser = require("zombie");
Browser.site = 'https://boilerplate-mochachai.grayman1.repl.co'; // Your URL here 'https://sincere-cone.gomix.me';

suite("Functional Tests with Zombie.js", function () {
  // Create new browser object
  const browser = new Browser();
  // Add function to set up asynchronous interactions with website
  suiteSetup(function(done) {
    return browser.visit('/', done)
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('submit "surname" : "Colombo" write your e2e test...', function (done) {
      browser.fill("surname", "Colombo").pressButton("submit", function () {

        browser.assert.success();
        browser.assert.text('span#name', 'Cristoforo');
        browser.assert.text('span#surname', 'Colombo');
        browser.assert.element('span#dates', 1);

        done();
      });
    });
    // #6
    test('submit "surname" : "Vespucci" - write your e2e test...', function (done) {
      
      browser
        .fill("surname", "Vespucci")
        .pressButton("submit", function () {
          browser.assert.success();
          browser.assert.text('span#name', 'Amerigo');
          browser.assert.text('span#surname', 'Vespucci');
          browser.assert.element('span#dates', 1);
          done();
        });
    });
  });
});
