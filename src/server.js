require('dotenv').config({path:"../.env"});
const express=require('express');
const nunjucks=require('nunjucks');
const configureDependencyInjection=require('./db/config.js');

const userModule=require('./modules/users/userModule.js');
const carModule=require('./modules/cars/carsModule.js');


const app=express();
const port=3000;

app.use(express.urlencoded({ extended: true }));  
app.use('/public', express.static('public'));

nunjucks.configure('modules', {
    autoescape:true,
    express:app,
})

app.set('view engine', 'html');

const container=configureDependencyInjection(app);
app.use(container.get('session'));
carModule.initCars(app,container);
userModule.initUsers(app,container);

app.listen(port)