/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-03-15 18:18:35
 * @version $Id$
 */
//连接数据库
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/adminsys");

const Schema = mongoose.Schema;


//声明Schema
const userSchema = new Schema({
        username: String,
        password: String
    }, {
    versionKey: false,
    timestamps: { createdAt: 'registerTime', updatedAt: 'lastModifyTime' }
});

const categorySchema = new Schema({
        category: String,
        count:{
            type:Number,
            default:0
        } 
    }, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

const goodsSchema = new Schema({
    category:String,
    name:String,
    desc:String,
    standard:String,
    price:Number,
    place:String,
    detailAddress:String
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

const articleSchema = new Schema({
    author:String,
    title:String,
    content:String,
    source:String
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});


//创建模型
const userModel = mongoose.model('User', userSchema);
const categoryModel = mongoose.model('Category', categorySchema);
const goodModel = mongoose.model('good', goodsSchema);
const articleModel = mongoose.model('Article', articleSchema);





module.exports = {
    user:userModel,
    category:categoryModel,
    good:goodModel,
    article:articleModel
}
