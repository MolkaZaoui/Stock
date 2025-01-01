const slugify = require('slugify');
const db = require('../../database/db.config');
const Article = db.articles;

// Create a new article
exports.create = (req, res) => {
    // Retrieving data from the request body
    const { reference, prix, quantite, nom, description } = req.body;
    if (!reference || !prix || !quantite || !nom || !description) {
        return res.status(400).send({
            message: 'Content cannot be empty'
        });
    }
    const newArticle = new Article({
        reference: reference,
        prix: prix,
        quantite: quantite,
        nom: nom,
        description: description,
    });
    newArticle.save().then((data) => {
        res.status(200).send({
            message: 'Successfully created Article'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: 'Error while creating the article'
        });
    });
};
// Find all articles
exports.findAll = (req, res) => {
    Article.find({}).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            message: 'Error while retrieving articles'
        });
    });
};

// Find article by ID
exports.findById = (req, res) => {
    const id = req.params.id;
    Article.findById(id)
        .then(article => {
            if (!article) {
                return res.status(404).send({
                    message: `Article not found with id ${id}`
                });
            }
            res.send(article);
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                message: `Error retrieving article with id ${id}`
            });
        });
};

//Update article by ID
// Update article by ID
exports.updateById = (req, res) => {
    const id = req.params.id;
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update cannot be empty'
        });
    }
    // Extract the fields you want to update from req.body
    const { reference, prix, quantite, nom, description } = req.body;
    // Create an object with the fields to update
    const updatedArticle = {
        reference: reference,
        prix: prix,
        quantite: quantite,
        nom: nom,
        description: description
    };
    // Use findByIdAndUpdate with the updated object
    Article.findByIdAndUpdate(id, updatedArticle, { new: true })
        .then(article => {
            if (!article) {
                return res.status(404).send({
                    message: `Article not found with id ${id}`
                });
            }
            res.send(article);
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                message: `Error updating article with id ${id}`
            });
        });
};


//Delete article by ID
exports.deleteById = (req, res) => {
    const id = req.params.id;
    Article.findByIdAndDelete(id)
        .then(article => {
            if (!article) {
                return res.status(404).send({
                    message: `Article not found with id ${id}`
                });
            }
            res.send({ message: 'Article deleted successfully' });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                message: `Error deleting article with id ${id}`
            });
        });
};
