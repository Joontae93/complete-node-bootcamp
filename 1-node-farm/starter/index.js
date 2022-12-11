const fs = require('fs');
const http = require('http');
const { URL, URLSearchParams } = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

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

const tempOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	'utf-8',
);
const tempCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	'utf-8',
);
const tempProduct = fs.readFileSync(
	`${__dirname}/templates/template-product.html`,
	'utf-8',
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);
const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
	const baseURL = new URL(`https://localhost:8000`);
	const path = new URL(req.url, baseURL);
	const { pathname } = path;
	const query = path.searchParams.get('id');

	if (pathname === '/' || pathname === '/overview') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		const cardsHtml = dataObject
			.map((el) => replaceTemplate(tempCard, el))
			.join('');
		const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

		res.end(output);
	} else if (pathname === '/product') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		const product = dataObject[query];
		const output = replaceTemplate(tempProduct, product);

		res.end(output);
	} else if (pathname === '/api') {
		res.writeHead(200, { 'Content-Type': 'application/json' });

		res.end(data);
	} else {
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
