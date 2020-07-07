const http = require('http');
const { parse } = require('querystring');
var fs = require("fs");


const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(result);
            // transforme la saisie en json
            let data = JSON.stringify(result)
            // ecrire le fichier json 
            fs.writeFileSync('data.json', data);
            // const newData= fs.readFile(data)
  
        });
        
    } 
    else {
        fs.readFile("home.ejs", function (err, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
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
    }
    else {
        callback(null);
    }
}
