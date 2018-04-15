/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-03-15 18:20:08
 * @version $Id$
 */
/*
 *@desc时间格式化，
 *@param date 时间戳
 */
const formatDate = (date, type) => {
    date = new Date(date);
    var year = date.getFullYear(); //年
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1; //月
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //日
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //时
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //分
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //秒
    var milliseconds = date.getMilliseconds() < 10 ? "0" + date.getMilliseconds() : date.getMilliseconds() //毫秒
    if (type == 1) {
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds + "." + milliseconds;
    } else if (type == 2) {
        return year + "" + month + "" + day + "" + hour + "" + minutes + "" + seconds;
    } else {
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    }
}

/*
 *@desc 保存数据
 *@param 
 *collection:集合名字  
 *data:保存的数据是一个对象
 *callback:保存成功的回调
 */

const save = (collection, data, callback) => {

    collection.create(data, function(err, result) {
        if (err) return console.log(err);
        callback();
    });
}

/*
 *@desc 删除用户,根据id删除
 *@param
 *collection:集合名字  
 *id:删除的id
 *callback:保存成功的回调
 */
const del = (collection, id, callback) => {
    collection.remove({
        _id: id
    }, function(err, result) {
        if (err) return console.log(err);
        callback();
    })
}

/*
 *@desc批量删除
 *@param
 *ids 是一数组，里面是一组保存id的数组
 */
const delMuti = (collection, ids, callback) => {
    let count = ids.length;
    if (count == 0) {
        return;
    }

    for (let id of ids) {
        collection.remove({
            _id: id
        }, function(err, result) {
            if (err) return console.log(err);

        })
    }

    callback();
}

/*
 *@desc更新数据 根据id更新
 */
const update = (collection, id, updateData, callback) => {
    collection.update({ _id: id }, { $set: updateData }, (err, result) => {
        if (err) return console.log(err);
        collection.find({ _id: id }).exec((err, result2) => {
            console.log(result2);
            callback(result2[0]);
        })

    });
}

/*
 *@desc更新数据 根据其他字段更新
 */
const updateSpec = (collection, needUpdateData, updateData, callback) => {
    collection.update(needUpdateData, { $set: updateData }, (err, result) => {
        if (err) return console.log(err);
        collection.find(needUpdateData).exec((err, result2) => {
            console.log(result2);
            callback(result2[0]);
        })

    });
}


/*
 *@desc 查询总的记录数
 */
const getAllCount = (collection, callback) => {
    collection.find({}).count().exec(function(err, result) {
        if (err) return console.log(err);
        callback(result);
    })
}

/*
 *@desc 查询到所有的数据
 *@param 
 *collection:集合的名字，必须传
 *callback成功的回调函数，必须传
 *q:查询条件，是一个对象，必须传，可传空，默认是{}
 *start:skip跨越的条数，必须传，可传空，默认是0
 *limit：查询的记录数  ，必须传，可传空，默认是全部的记录数
 * 
 */
const find = (collection, q, start, limit,callback) => {
    start = start || 0;
    
    q = q || {};
    collection.find(q).count().exec((err1, res1) => {

        if (err1) return console.log(err1);
         limit = limit || res1;
        collection.find(q).skip(start).limit(limit).exec((err2, res2) => {
            if (err2) return console.log(err2);
            callback(res1, res2);
        })

    })
}

/*
 *@desc 输入一个开始和结束，返回的是一个范围
 *
 *ps:输入一个开始时间戳和结束时间戳，返回的是一个查询时间范围
 *如果type:1 表示是时间  不传或者其他都表示不是一个时间
 */
const queryRange = (start,end,type) => {
    if(type===1){
        start = new Date(start);
        end = new Date(end);
    }
    return {
            "$gte": start,
            "$lte": end
        };
}

/*
 *@desc 根据格林尼治的时间返回当地的时间
 *ps：mongodb里面是格林尼治的时间，接口里面需要返回当地时间
 * 
 */

const localDate = date => {
    return new Date(date).toLocaleString();
}




const util = {
    'formatDate': formatDate,
    'save': save,
    'del': del,
    'getAllCount': getAllCount,
    'delMuti': delMuti,
    'update': update,
    'find': find,
    'updateSpec':updateSpec,
    'queryRange':queryRange,
    localDate:localDate

}

module.exports = util;