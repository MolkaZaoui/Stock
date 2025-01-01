const { fournisseur } = require('../../database/db.config');

module.exports = mongoose => {
    const Schema = mongoose.Schema;

    // Assuming you have Client and Article schemas defined elsewhere
    const Post = require('./fournisseur.model');
    const Article = require('./article.model');

    // Define FactSchema
    let StockSchema = new Schema({
        produit:{type:String, required:true},
        date_operation: { type: Date, required: true },
        quantite_entree: { type: Number, required: true },
        quantite_sortie: { type: Number, required: true },
        prix_achat: { type: Number, required: true },
        fournisseur: { type: Schema.Types.ObjectId, ref: 'Fournisseur', required: true },  
        article: [{ type: Schema.Types.ObjectId, ref: 'Article' }] 
    },{
        timestamps: true 
    });

    // Define toJSON method for serialization
    StockSchema.method('toJSON', function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    // Create and export Fact model
    const Stock = mongoose.model('stock', StockSchema);

    // Function to retrieve Facturations with client name and article reference populated
    const getStocksWithPopulate = async () => {
        try {
            const stocks = await Fact.find({})
                .populate('fournisseur', 'name') // Populate the 'client' field with the 'name' field from the Client collection
                .populate('article', 'reference'); // Populate the 'article' field with the 'reference' field from the Article collection
            return stocks;
        } catch (error) {
            console.error('Error while retrieving stocks:', error);
            throw error;
        }
    };

    return { Stock, getStocksWithPopulate };
}
