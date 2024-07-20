require('dotenv').config({path:"../.env"});
const express=require('express');
const nunjucks=require('nunjucks');
const configureDependencyInjection=require('./db/config.js');

const userModule=require('./modules/users/userModule.js');
const carModule=require('./modules/cars/carsModule.js');
const rentsModule=require('./modules/rents/rentsModule.js')


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

console.log('Session:', container.get('session'));
console.log('userService:', container.get('userService'));
console.log('carsService:', container.get('carsService'));
console.log('rentsService:', container.get('rentsService'));

carModule.initCars(app,container);
userModule.initUsers(app,container);
rentsModule.initRent(app,container);

app.listen(port)