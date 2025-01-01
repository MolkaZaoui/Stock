module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let ArticleSchema = new Schema({
        reference: {type: String, required: true },
        prix: { type: Number, required: true },  
        quantite: { type: Number, required: true },
        nom: { type: String, required: true },
        description: { type: String, required: true },
    },{
       timestamps: true 
    });
    ArticleSchema.method('toJSON', function(){
        const{__v,_id, ...object}= this.toObject();
        object.id = _id;
        return object;
    })
    const Article= mongoose.model('Article', ArticleSchema);
    return Article;
}