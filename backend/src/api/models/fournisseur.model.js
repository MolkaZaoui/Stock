module.exports = mongoose => {
    const FournisseurSchema = new mongoose.Schema(
        {
            name: { type: String, required: true },
            address: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String },
        },
        {
            timestamps: true
        }
    );

    FournisseurSchema.method('toJSON', function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Fournisseur = mongoose.model('Fournisseur', FournisseurSchema);
    return Fournisseur;
};
