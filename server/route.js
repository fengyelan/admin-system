/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-03-15 18:20:32
 * @version $Id$
 */
const express = require('express');
const app = express();

const model = require('./db.js');
const util = require('./util.js');

const api = require("./api.js");


app.get('/saveUserInfo',api.saveUserInfo);

app.get('/queryUserList', api.queryUserList);

app.get('/delUser', api.delUser);

app.get('/delMutiUsers', api.delMutiUsers);

app.get('/updateUser', api.updateUser);

app.get('/getAllCount', api.getAllCount);

app.get('/findCategory', api.findCategory);

app.get('/saveCategory', api.saveCategory);

app.get('/delCategory', api.delCategory);

app.get('/saveGood', api.saveGood);

app.get('/queryGood', api.queryGood);

app.get('/delGood', api.delGood);

app.get('/saveArticle', api.saveArticle);

app.get('/updateGood', api.updateGood);

app.listen(3000, function() {
    console.log('app is listening at port 3000');
});