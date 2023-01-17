"use strict";
const PlayList = require("../models/playlist");
const Util = require("../lib/util");

exports.getPlayList = async (req, res) => {
  const result = PlayList.findById(req.body.id);
  return res.status(200).send({success:true, data:result})
}

exports.getPlayLists = async (req, res, next) => {
 try {
   //pagination
   let count = 0;
   let page = 0;
   let { keyword, role, limit, skip } = req.query;
   limit = +limit <= 100 ? +limit : 20;
   skip = +skip || 0;
   let query = {},
     regexKeyword;
   role ? (query["role"] = role.toUpperCase()) : "";
   keyword && /\w/.test(keyword)
     ? (regexKeyword = new RegExp(keyword, "i"))
     : "";
   regexKeyword ? (query["name"] = regexKeyword) : "";
   //executing query
   const result = await PlayList.find(query);
   return res.status(200).send({
     success: true,
     count: result.length,
     _metadata: {
       current_page: skip / limit + 1,
       per_page: limit,
       page_count: page,
       total_count: count,
     },
     data: result,
   });
 } catch (error) {
  next(error)
 }
};

exports.createPlayList = async (req, res, next) => {
  try {
    if (!req.body.password)
      return res
        .status(404)
        .send({ success: null, data: null, error: "Password Required!" });
  
    let hashedPassword = await Util.bcryptHash(req.body.password);
    let body = { ...req.body, password: hashedPassword };
    const newPlayList = new PlayList(body);
    newPlayList.save().then((doc) => {
      res.status(200).send({ success: true, data: doc });
    }).catch(next)
  } catch (error) {
    next(error)
  }
};

exports.updatePlayList = async ( req, res,next) => {
  try {
    const result = await PlayList.updateOne({_id:req.body.id},req.body)
    return res.status(200).send({success:true, data: result})
  } catch (error) {
    next (error)
  }
}

exports.deletePlayList = async (req, res, next) => {
  try {
    const result = await PlayList.deleteOne({_id:req.body.id})
    return res.status(200).send({success:true, data:result})
  } catch (error) {
    next (error)
  }
}