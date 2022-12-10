module.exports = (template, product) => {
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
};
