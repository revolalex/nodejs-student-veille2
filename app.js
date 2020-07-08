// modules
const http = require("http");
const { parse } = require("querystring");
const fs = require("fs");
const ejs = require("ejs");
const alerte = require("alert-node");

/**
 * @summary this array we be use to push the input
 */
let nomArray = [];

/**
 * @summary upadate the frond end (GET)
 * @param {*} res
 */
function updateUI(res) {
  fs.readFile("home.ejs", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    let htmlContent = fs.readFileSync(__dirname + "/home.ejs", "utf8");

    // allow me use ejs template code
    let htmlRenderized = ejs.render(htmlContent, { nomArray: nomArray });
    res.write(htmlRenderized);
    return res.end();
  });
}

/**
 * @summary add a student to the list
 * @param {*} result it's the input
 * @param {*} res
 */
function addPerson(result, res) {
  // //clear file
  // fs.unlink('data.json', ()=> {})

  var person = { name: result.name, techno: null };
  nomArray.push(person);
  // transforme la saisie en json
  let data = JSON.stringify(nomArray);
  console.log(data);
  // ecrire le fichier json en ajoutant
  fs.appendFileSync("data.json", data);

  updateUI(res);
}

/**
 *
 * @param {*} result it's the input
 * @param {*} res
 */
function addTechno(result, res) {
  //clear file
  fs.unlink("data.json", () => {});
  // find the person with no techno
  let person = nomArray.find((person) => person.techno == null);
  // if we don' have available student
  if (person == null) {
    alerte("Oops,  no students left, come later!");
    console.log("Oops,  no students left, come later!");
    updateUI(res);
  } else {
    // asign a techno to an available student
    person.techno = result.techno;
    console.log(nomArray);
    // change the input into JSON format
    let data = JSON.stringify(nomArray);
    console.log(data);
    // write JSON file
    fs.appendFileSync("data.json", data);
    // update
    updateUI(res);
  }
}

/**
 * @summary server
 */
const server = http.createServer((req, res) => {
  //POST
  if (req.method === "POST") {
    collectRequestData(req, (result) => {
      if (result.name != null) {
        addPerson(result, res);
      }

      if (result.techno != null) {
        addTechno(result, res);
      }
    });
  } else {
    //GET, PUT, DELETE (NOT POST!!!)
    fs.readFile("home.ejs", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      var htmlContent = fs.readFileSync(__dirname + "/home.ejs", "utf8");
      // allow us to use ejs <% %> in home.ejs
      var htmlRenderized = ejs.render(htmlContent, { nomArray: nomArray });
      res.write(htmlRenderized);
      return res.end();
    });
  }
});
server.listen(3000);
console.log("http://localhost:3000/");

/**
 * @summary use to listen the form post
 * @param {*} request
 * @param {*} callback
 */
function collectRequestData(request, callback) {
  const FORM_URLENCODED = "application/x-www-form-urlencoded";
  if (request.headers["content-type"] === FORM_URLENCODED) {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }
}
