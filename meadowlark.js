'use strict'
const express = require('express'),
    logger = require('morgan'),
    handlebars = require('express3-handlebars').create({ defaultLayout: 'main' }),
    app = express();

app.set('port', process.env.PORT || 3000);

//设置模板引擎
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//log
app.use(logger('dev'));

//static静态目录
//static 中间件相当于给你想要发送的所有静态文件创建了一个路由，渲染文件并发送给客户端
app.use(express.static(__dirname + '/public'));

//原始的路由处理
/*app.get('/',function(req,res) {
    res.type('text/plain');
    res.send('Meadowlark Travel');
});

app.get('/about',function(req,res) {
    res.type('text/plain');
    res.send('About Meadowlark Travel!');
});



//404
app.use(function(req,res) {
    res.type('text/plain');
    res.status(404);
    res.send('404-Not Found!');
});

//500
app.use(function(err,req,res,next) {
    console.log(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500-Server Error!');
});*/

let fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];




app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about',{fortune: randomFortune});
});

//404 catch-all处理器（通过中间件处理）
app.use(function(req, res, next) {
    //在这里将status变为404，因为404并不是出错，所以如果不变为404，status仍为200，这样手动变为404，以便区分状态！
    res.status(404);
    res.render('404');
});

//500 错误处理器（中间件）
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + ';press Ctrl-C to terminate.');
})
