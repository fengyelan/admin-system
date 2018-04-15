/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-03-20 14:48:24
 * @version $Id$
 */
const model = require('./db.js');
const util = require('./util.js');

const setHeader = (res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/html;charset=UTF-8");
}

const saveUserInfo = (req, res) => {
    setHeader(res);
    util.save(model.user, req.query, () => {
        res.json({
            code: 0,
            msg: 'ok'
        });
    })
}

const handlerQueryUserListparams = req => {
    let start = parseInt(req.query.start || 0),
        limit = parseInt(req.query.limit),
        username = req.query.username,
        //开始时间和结束时间传的是时间戳
        startTs = Number(req.query.startTs),
        endTs = Number(req.query.endTs) + 24 * 60 * 60 * 1000;


    let query_condition = {};
    if (!!username) {
        query_condition['username'] = username;
    }

    if (startTs && endTs) {
        query_condition['registerTime'] = util.queryRange(startTs, endTs, 1);
    }
    return query_condition;
}

const queryUserList = (req, res) => {
    setHeader(res);

    let query_condition = handlerQueryUserListparams(req);

    util.find(model.user, query_condition, parseInt(req.query.start || 0), parseInt(req.query.limit || 0), (re1, res2) => {
        let list = [];
        res2.forEach(function(item, index) {
            list.push({
                id: item['_id'],
                username: item.username,
                lastModifyTime: util.localDate(item.lastModifyTime),
                registerTime: util.localDate(item.registerTime)
            });
        });
        res.json({
            code: 0,
            msg: 'ok',
            data: {
                list: list,
                count: re1
            }
        });
    });

}

const delUser = (req, res) => {
    setHeader(res);

    let id = req.query.id;


    util.del(model.user, id, () => {
        res.json({
            code: 0,
            msg: 'ok'
        });
    });
}

const delMutiUsers = (req, res) => {
    setHeader(res);
    let q = req.query.ids,
        ids = q.split(',');

    util.delMuti(model.user, ids, () => {
        res.json({
            code: 0,
            msg: 'ok'
        });
    });
}

const updateUser = (req, res) => {
    setHeader(res);
    let username = req.query.username,
        id = req.query.id;

    util.update(model.user, id, { username: username }, (result) => {
        res.json({
            code: 0,
            msg: 'ok',
            data: {
                lastModifyTime: util.localDate(result.lastModifyTime)
            }
        });
    })
}

const getAllCount = (req, res) => {
    setHeader(res);
    let type = req.query.type;
    util.getAllCount(model[type], (result) => {
        res.json({
            code: 0,
            msg: 'ok',
            data: {
                count: result
            }
        })
    });
}

const findCategory = (req, res) => {
    setHeader(res);
    util.find(model.category, {}, 0, 0, (res1, res2) => {
        res.json({
            code: 0,
            msg: 'ok',
            data: {
                list: res2,
                count: res1
            }
        })
    })
}

const saveCategory = (req, res) => {
    setHeader(res);

    util.find(model.category, { category: req.query.category }, 0, 0, (res1, res2) => {
        console.log(res1, res2);
        if (res1 !== 0) {
            res.json({
                code: 1, //表示已有这个商品种类
                msg: '已有这个商品种类'
            });

        } else {
            util.save(model.category, req.query, () => {
                res.json({
                    code: 0,
                    msg: 'ok'
                });
            })
        }

    })
}

const delCategory = (req, res) => {
    setHeader(res);

    let id = req.query.id;

    util.del(model.category, id, () => {
        res.json({
            code: 0,
            msg: 'ok'
        });
    });
}

/*
 *@desc type=1增加商品 对应的种类数量加1，反之type=2减1
 */
const handlerCategory = (category, type, callback) => {
    util.find(model.category, { category: category }, 0, 0, (res1, res2) => {
        let count = 0;
        if (type === 1) {
            count = res2[0].count + 1;
        } else {
            count = res2[0].count - 1;
        }
        util.updateSpec(model.category, { category: category }, { count: count }, (res3) => {
            callback(res3);
        })
    });
}

const saveGood = (req, res) => {
    setHeader(res);
    req.query.price = parseInt(req.query.price);

    let count = 0,
        category = req.query.category;

    util.save(model.good, req.query, (r) => {

        handlerCategory(category, 1, (result) => {
            res.json({
                code: 0,
                msg: 'ok',
                data: {
                    categoryInfo: result
                }
            });
        });

    })
}

const handlerQueryGoodReqParams = req => {
    let start = parseInt(req.query.start || 0),
        limit = parseInt(req.query.limit),
        name = req.query.name,
        category = req.query.category,
        priceStart = req.query.priceStart && Number(req.query.priceStart),
        priceEnd = req.query.priceEnd && Number(req.query.priceEnd),
        createTimeStart = req.query.createTimeStart && Number(req.query.createTimeStart),
        createTimeEnd = req.query.createTimeEnd && (Number(req.query.createTimeEnd) + 24 * 60 * 60 * 1000),
        place = req.query.place,
        query_condition = {};

    if (!!name) {
        query_condition['name'] = name;
    }

    if (!!place) {
        query_condition['place'] = eval("/" + place + "/i"); //1. eval("/" + place +"/i")2. {$regex:place,$Option:'$i'}

    }

    if (!!category) {
        query_condition['category'] = category;
    }


    if (createTimeStart && createTimeEnd) {
        query_condition['createTime'] = util.queryRange(createTimeStart, createTimeEnd, 1);
    }

    if (priceStart && priceEnd) {
        query_condition['price'] = util.queryRange(priceStart, priceEnd);
    }

    return query_condition;
}

const queryGood = (req, res) => {
    setHeader(res);

    let query_condition = handlerQueryGoodReqParams(req);

    console.log(query_condition);

    util.find(model.good, query_condition, parseInt(req.query.start || 0), parseInt(req.query.limit || 0), (res1, res2) => {


        res.json({
            code: 0,
            msg: "ok",
            data: {
                list: res2,
                count: res1
            }
        });
    });
}

const delGood = (req, res) => {
    setHeader(res);

    let id = req.query.id;

    util.find(model.good, { _id: id }, 0, 0, (re1, res2) => {
        let category = res2[0].category;
        util.del(model.good, id, () => {
            handlerCategory(category, 2, () => {
                res.json({
                    code: 0,
                    msg: 'ok'
                });
            });
        });
    })

}

const updateGood = (req, res) => {
    setHeader(res);
    let query = req.query,
        id = query && query.id;
    util.update(model.good, id, { 
        name: query && query.name,
        category: query && query.category,
        place: query && query.place,
        price: parseInt(query && query.price),
        desc:query && query.desc
    }, (result) => {
        res.json({
            code: 0,
            msg: 'ok'
        });
    })

}

const saveArticle = (req,res) => {
    setHeader(res);
    util.save(model.article, req.query, () => {
        res.json({
            code: 0,
            msg: 'ok'
        });
    });
}

const api = {
    saveUserInfo: saveUserInfo,
    queryUserList: queryUserList,
    delUser: delUser,
    delMutiUsers: delMutiUsers,
    updateUser: updateUser,
    getAllCount: getAllCount,
    findCategory: findCategory,
    saveCategory: saveCategory,
    delCategory: delCategory,
    saveGood: saveGood,
    queryGood: queryGood,
    delGood: delGood,
    saveArticle:saveArticle,
    updateGood: updateGood
}

module.exports = api;