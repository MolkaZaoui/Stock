const slugify = require('slugify');
const db = require('../../database/db.config');
const Stock = db.stock.Stock;

// Create a new stock entry
exports.create = (req, res) => {
    // Retrieve data from request body
    const { produit,date_operation,quantite_entree, quantite_sortie, prix_achat, fournisseur, article } = req.body;
    
    if (!produit||!date_operation || !quantite_entree || !quantite_sortie || !prix_achat || !fournisseur || !article) {
        return res.status(400).send({
            message: 'Content can not be empty'
        });
    }
    lo
    const newStock = new Stock({
        produit: produit,
        date_operation: date_operation,
        quantite_entree: quantite_entree,
        quantite_sortie: quantite_sortie,
        prix_achat: prix_achat,
        fournisseur: fournisseur,
        article: article
    });

    newStock.save().then((data) => {
        res.status(200).send({
            message: 'Successfully created stock'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: 'An error occurred while creating stock'
        });
    });
};


// Find all stock entries
exports.findAll = (req, res) => {
    Stock.find().then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            message: 'An error occurred while retrieving stocks'
        });
    });
};


// Find a stock entry by ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({ message: "Content is required" });
    }
    Stock.findById(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            message: 'An error occurred while retrieving stock'
        });
    });
};
