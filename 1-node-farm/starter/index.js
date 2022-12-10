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

function replaceTemplate(template, product) {
	let output = template.replace(/{%ProductName%}/g, product.productName);
	output = output.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%ProductPrice%}/g, product.price);
	output = output.replace(/{%Origin%}/g, product.from);
	output = output.replace(/{%Nutrients%}/g, product.nutrients);
	output = output.replace(/{%Quantity%}/g, product.quantity);
	output = output.replace(/{%ID%}/g, product.id);
	output = output.replace(/{%Description%}/g, product.description);

	if (!product.organic)
		output = output.replace(/{%Not_Organic%}/g, 'not-organic');
	return output;
}
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

const server = http.createServer((req, res) => {
	// Handle Routing
	const pathName = req.url;
	if (pathName === '/' || pathName === '/overview') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		const cardsHtml = dataObject
			.map((el) => replaceTemplate(tempCard, el))
			.join('');
		const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

		res.end(output);
	} else if (pathName === '/product') {
		res.end('This is a PRODUCT PAGE');
	} else if (pathName === '/api') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		console.log(dataObject);
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
