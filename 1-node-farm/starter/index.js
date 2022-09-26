const fs = require('fs');
const http = require('http');
const url = require('url');

//////////////////////////////////////
///// FILES

// Blocking, synchronous code
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// const textOut = `This is what we know about the avocadeo: ${textIn}\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Written');

// Non-blocking, asynchronous code
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
// 	if (err) return console.error(err);
// 	console.log(data1);
// 	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
// 		if (!err) {
// 			console.log(data2);
// 			fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
// 				if (!err) {
// 					console.log(data3);
// 					fs.writeFile(
// 						'./txt/final.txt',
// 						`${data2} \n${data3}`,
// 						'utf-8',
// 						(err) => {
// 							if (!err) console.log('Your file has been created.');
// 						},
// 					);
// 				}
// 			});
// 		}
// 	});
// });

//////////////////////////////////////
///// SERVER

const server = http.createServer((req, res) => {
	const pathName = req.url;
	switch (pathName) {
		case '/overview':
		case '/':
			res.end('This is the OVERVIEW');
			break;
		case '/product':
			res.end('This is a PRODUCT PAGE');
			break;
		default:
			res.writeHead(404, {
				'Content-type': 'text/html',
				'my-own-header': 'hello world',
			});
			res.end('<h1>Page not found!</h1>');
	}
});

server.listen(8000, 'localhost', 8000, () =>
	console.log('Listening to requests on port 8000'),
);

// Handle Routing
