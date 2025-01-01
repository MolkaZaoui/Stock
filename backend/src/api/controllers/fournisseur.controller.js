const slugify = require('slugify');
const db = require('../../database/db.config');
const Fournisseur = db.fournisseur;
//create a new post
exports.create=(req, res)=> {
    //recuperation des données
    const {name, address, email, phone} = req.body;
    if(!name || !address){
        return res.status(400).send({
            message : 'content can not be empty '
        })
    }
const newFournisseur= new Fournisseur({
    name: name,
    address: address,
    email: email,
    phone: phone
});
newFournisseur.save(newFournisseur).then((data)=>{

    res.status(200).send({
        message: 'successfully created Fournisseur'
    })
}).catch(err =>{
    console.log(err);
});
};

exports.findAll = (req, res) => {
    Fournisseur.find({

    }).then((data)=> {
        res.send(data);
    }).catch((err)=> {
        console.log(err);
    });
};

exports.delete = (req, res)=> {
    const id = req.params.id;
    if(!id) {
        res.status(400).send({message:"content is required"});
    }
    Fournisseur.findByIdAndDelete(id).then((data)=>{
        if(!data){
            res.status(404).send({message:"Fournisseur not found"});
        }
        res.status(200).send({message: "Fournisseur was successfull deleted"});
    })
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    if(!id) {
        res.status(400).send({message: "content is required"});
    }
    Fournisseur.findById(id).then((data) => {
        res.send(data);
    }).catch((err)=> {
        console.log(err);
    })
};
