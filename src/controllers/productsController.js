// const fs = require('fs');
const path = require('path');
const customFunctions = require('../customF/customFunctions')

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		// Do the magic

		let products = customFunctions.leoJson( productsFilePath );

		return res.render('products', { products, toThousand });

	},

	// Detail - Detail from one product
	detail: (req, res) => {

		let products = customFunctions.leoJson( productsFilePath );

		let product = products.find( x => x.id == req.params.productId );

		return res.render('detail', { product, toThousand });

	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic

		return res.render('product-create-form')

	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

		let products = customFunctions.leoJson( productsFilePath );
		
		products.sort( (a, b) => a.id - b.id)
		
		let newId = customFunctions.createId(products);

		let newProduct = {
			id: newId,
			...req.body,
		}

		products = [...products, newProduct]

		

		customFunctions.escriboJson(products, productsFilePath);

		return res.redirect('/')

	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic

		let products = customFunctions.leoJson( productsFilePath );

		let product = products.find( x => x.id == req.params.productId );

		return res.render( 'product-edit-form', { product } );

	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		let products = customFunctions.leoJson( productsFilePath );

		products.forEach( (x) => {
			if (x.id == req.params.productId) {
				x.name        = req.body.name;
				x.price       = req.body.price;
				x.discount    = req.body.discount;
				x.category    = req.body.category;
				x.description = req.body.description;
			}
		})

		customFunctions.escriboJson(products, productsFilePath);

		return res.redirect('/')

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	
		let products = customFunctions.leoJson( productsFilePath );

		products.forEach ((elem, index) => {
			if(elem.id == req.params.productId) {
				products.splice(index, 1)
			}
		});

		customFunctions.escriboJson(products, productsFilePath);
		
		return res.redirect('/')

	},

};

module.exports = controller;