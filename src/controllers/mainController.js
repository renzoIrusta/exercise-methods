// const fs              = require('fs');
const path            = require('path');
const customFunctions = require('../customF/customFunctions') 

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		// Do the magic
		const products = customFunctions.leoJson(productsFilePath)
		
		let visited = products.filter( product => product.category == 'visited' ) 
		let inSale = products.filter( product => product.category == 'in-sale' ) 


		return res.render( 'index', {visited, inSale, toThousand} )

	},
	search: (req, res) => {
		// Do the magic

		let query = req.query.keywords

		let products = customFunctions.leoJson( productsFilePath );

		let product =  products.find( (x) => {
		   return x.name.toLowerCase().includes( query.toLowerCase() )
		} )
		
		 return res.render( 'results', { product, toThousand} )


	},
};

module.exports = controller;
