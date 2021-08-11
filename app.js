const express = require('express');
const path = require('path');
const app = express();

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
app.get('/contact',(req,res)=>{
    console.log("jusqu'ici tout va bien...");
    res.render('contact');
});
app.get('/lorum',(req,res)=>{
    const names = [
        { name: 'Aurel', tel: "+972543210758" },
        { name: 'Mam', tel: "+33661955150" }
    ]
    console.log("jusqu'ici tout va bien...");
    res.render('blabla', { names });
});
app.get('/kakolina',(req,res)=>{
    console.log("jusqu'ici tout va bien...");
    res.render('test1');
});

//function use without argument seems to be like 'if no path specified or no existed'
//you also cant put it before the get func call, the order here is important (try it if you dont believe me)
app.use((req,res)=>{
    console.log("jusqu'ici tout va bien...");
    res.render('404');
});

app.use('/public',express.static(path.join(__dirname,'/public')));

app.listen(3000);