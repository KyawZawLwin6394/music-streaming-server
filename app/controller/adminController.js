"use strict";
const Admin = require("../models/admin");
const Util = require("../lib/util");

exports.getAdmin = async (req, res) => {
  const result = Admin.findById(req.body.id);
  return res.status(200).send({ success: true, data: result });
};

exports.getAdmins = async (req, res, next) => {
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
    const result = await Admin.find(query);
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
    next(error);
  }
};

exports.createAdmin = async (req, res, next) => {
  let hashedPassword = await Util.bcryptHash(req.body.password);
  let body = { ...req.body, password: hashedPassword };
  const newAdmin = new Admin(body);
  newAdmin
    .save()
    .then((doc) => {
      res.status(200).send({ success: true, data: doc });
    })
    .catch(next);
};

exports.updateAdmin = async (req, res, next) => {
  try {
    const result = await Admin.updateOne({ _id: req.body.id }, req.body);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

exports.deleteAdmin = async (req, res, next) => {
  try {
    const result = await Admin.deleteOne({ _id: req.body.id });
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

exports.errorHandling = async (req, res, next) => {
  try {
    throw new Error("stupid error");
  } catch (error) {
    next(error);
  }
};
