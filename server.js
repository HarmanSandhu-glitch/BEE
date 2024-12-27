const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === "POST" && url === "/register") {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            let students = [];
            const studentData = qs.parse(body);
            try {
                const fileContent = fs.readFileSync('./Data.json', "utf-8");
                students = JSON.parse(fileContent);
            } catch (err) {
                return res.end('Error');

            }

            students.push(studentData);

            try {
                fs.writeFileSync('./Data.json', JSON.stringify(students));
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end("Student Registered Successfully <h1> <a href='/register'>Register Again</a> </h1>");
            } catch (err) {
                console.error("Error writing to Data.json:", err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
        });
    } else if (method === "GET") {
        if (url === "/") {
            try {
                const students = fs.readFileSync('./Data.json', "utf-8");
                res.setHeader('Content-Type', 'application/json');
                res.end(students);
            } catch (err) {
                console.error("Error reading Data.json:", err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
        } else if (url === "/allstudents") {
            try {
                const allStudentsWebPage = fs.readFileSync('./allStudents.html');
                res.setHeader('Content-Type', 'text/html');
                res.end(allStudentsWebPage);
            } catch (err) {
                console.error("Error reading allStudents.html:", err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
        } else if (url === "/register") {
            try {
                const registerWebPage = fs.readFileSync('./register.html');
                res.setHeader('Content-Type', 'text/html');
                res.end(registerWebPage);
            } catch (err) {
                console.error("Error reading register.html:", err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Page Not Found');
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});