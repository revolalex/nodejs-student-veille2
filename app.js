const http = require('http');
const { parse } = require('querystring');
const fs = require("fs");
const ejs = require('ejs');

let nomArray = []

/**
 * @summary upadate the frond end (GET)
 * @param {*} res 
 */
function updateUI(res) {
    fs.readFile("home.ejs", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        let htmlContent = fs.readFileSync(__dirname + '/home.ejs', 'utf8');

        // allow me use ejs template code
        let htmlRenderized = ejs.render(htmlContent, { nomArray: nomArray})
        res.write(htmlRenderized);
        return res.end();
      });
}

/**
 * @summary add a student to the list
 * @param {*} result 
 * @param {*} res 
 */
function addPerson(result, res) {
    //clear file
    fs.unlink('data.json', ()=> {})

    var person = {name: result.name, techno: null}
    nomArray.push(person)
    // transforme la saisie en json
    let data = JSON.stringify(nomArray);
    console.log(data)
    // ecrire le fichier json en ajoutant
    fs.appendFileSync('data.json', data);

    updateUI(res);
}

function addTechno(result, res) {
    //clear file
    fs.unlink('data.json', ()=> {})
    // find the person with no techno
    let person = nomArray.find( person => person.techno == null)
    // assign the techno to available person
    if(person == null) {
        //TODO: show beautiful modal
        console.log('Oops,  no students left, come later!');
    } else {
        person.techno = result.techno
        //TODO: change style for person.name
        console.log(nomArray);
    
    // transforme la saisie en json
    let data = JSON.stringify(nomArray);
    console.log(data)
    // ecrire le fichier json en ajoutant
    fs.appendFileSync('data.json', data);
    // update 
    updateUI(res);
    }
}

const server = http.createServer((req, res) => {
    //POST
    
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            if (result.name != null) {
                addPerson(result, res)
            } 

            if (result.techno != null) {
                addTechno(result, res)
            }
        });
        
    } else {
        //GET, PUT, DELETE (NOT POST!!!)
        fs.readFile("home.ejs", function (err, data) {
            res.writeHead(200, { "Content-Type": "text/html" });

            var htmlContent = fs.readFileSync(__dirname + '/home.ejs', 'utf8');

            var htmlRenderized = ejs.render(htmlContent, {nomArray: nomArray})
            
            res.write(htmlRenderized);
            return res.end();
          });

    }
});
server.listen(3000);
console.log("http://localhost:3000/");



function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    } else {
        callback(null);
    }
}
