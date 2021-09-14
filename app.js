const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const mongodb = 'mongodb+srv://<username>:<password>@cluster0.5zl9v.mongodb.net/<database-name>?retryWrites=true&w=majority';    //connect your app to your mongoDB
const mongoose = require('mongoose');
const Contact = require('./models/contact.js');

mongoose.connect(mongodb,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=> {
    console.log('connected')
    app.listen(port);
}).catch(err => console.log(err));

app.use(express.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

//func get makes a route from the path in the url to the file , in the tag a we will specify the path url and not those of the file
//with the use of ejs, we're using the func render and our files have the extension ejs

/*without ejs:
app.get('/',(req,res)=>{
    console.log(req.url);
    res.sendFile('./views/index.html',{root:__dirname});
 });*/

app.get('/',(req,res)=>{
    console.log(req.url);
    res.render('index');
});

//the argument req is needed even if we don't use it
app.get('/contactus',(req,res)=>{
    console.log("jusqu'ici tout va bien...");
    res.render('contactus');
});
app.get('/lorum',(req,res)=>{
    console.log("jusqu'ici tout va bien...");
    res.render('add-contact');
});

app.get('/get-contacts',(req,res)=>{
    Contact.find().then(result=>{
        res.render('test1',{contacts:result});      //contacts is the name of our database
    }).catch(err=> console.log(err))
});

app.post('/contact', (req,res)=>{
    console.log(req.body);
    const contact = Contact(req.body);
    contact.save().then(()=>{
        res.redirect('get-contacts')
    }).catch(err=>console.log(err))
});



//function use without argument seems to be like 'if no path specified or no existed'
//you also cant put it before the get func call, the order here is important (try it if you dont believe me)
app.use((req,res)=>{
    console.log("jusqu'ici tout va bien...");
    res.render('404');
});

app.use('/public',express.static(path.join(__dirname,'/public')));

