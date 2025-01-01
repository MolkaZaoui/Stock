module.exports = app =>{
    const router = require('express').Router();
    const fournisseurController= require('../controllers/fournisseur.controller');
    const articleController= require('../controllers/article.controller');
    const userController= require('../controllers/User.controller');
    const stockController= require('../controllers/stock.controller');
    const userRoutes = require('../controllers/User.controller');

    router.post('/fournisseur', fournisseurController.create);
    router.get('/fournisseur', fournisseurController.findAll);
    router.get('/fournisseur/:id', fournisseurController.findOne);
    //router.put('/fournisseur/:id', fournisseurController.update);
    router.delete('/fournisseur/:id', fournisseurController.delete);


    router.post('/article/create', articleController.create);
    router.get('/article', articleController.findAll);
    router.get('/article/:id', articleController.findById);
    router.delete('/article/delete/:id', articleController.deleteById);
    router.put('/article/edit/:id', articleController.updateById );
    router.get('/user', userController.findAllUser);

    router.post('/register', userController.register);
    router.post('/login', userController.login); 

    router.post('/stock/create', stockController.create);
    router.get('/stock', stockController.findAll);
    router.get('/stock/:id', stockController.findOne);
    //router.delete('/stock/:id', stockController.delete);
   // router.put('/stock/:id', stockController.update);

//User Route
//router.post('/register',userController.registerUser)
    app.use('/api/', router);
}