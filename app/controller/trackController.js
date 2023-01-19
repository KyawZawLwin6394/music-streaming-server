"use strict";
const Track = require("../models/track");
const { Readable } = require("stream");
const ObjectID = require("mongodb").ObjectID;
const mongodb = require("mongodb");
const { default: mongoose } = require("mongoose");

exports.getTrack = async (req, res) => {
  const result = Track.findById(req.body.id);
  return res.status(200).send({ success: true, data: result });
};

exports.getTracks = async (req, res, next) => {
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
    const result = await Track.find(query);
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

exports.uploadTrack = async (req, res, next) => {
  try {
    let request = req.body.name;
    console.log(req.file.buffer);
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    let bucket = new mongodb.GridFSBucket(mongoose.connection.db, {
      bucketName: "track",
    });

    let uploadStream = bucket.openUploadStream(request);
    let id = uploadStream.id;
    readableTrackStream.pipe(uploadStream);

    uploadStream.on("error", () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on("finish", () => {
      return res.status(201).json({
        message:
          "File uploaded successfully, stored under Mongo ObjectID: " + id,
      });
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getTrack = async (req, res, next) => {
  res.set("content-type", "audio/mp3");
  res.set("accept-ranges", "bytes");
  let bucket = new mongodb.GridFSBucket(mongoose.connection.db, {
    bucketName: "track",
  });
  let downloadStream = bucket.openDownloadStream(req.params.trackID);
  console.log(downloadStream)
  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });
  
  downloadStream.on("error", () => {
    res.sendStatus(404);
  });
  downloadStream.on("end", () => {
    res.end();
  });
  console.log("here");
};

exports.updateTrack = async (req, res, next) => {
  try {
    const result = await Track.updateOne({ _id: req.body.id }, req.body);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

exports.deleteTrack = async (req, res, next) => {
  try {
    const result = await Track.deleteOne({ _id: req.body.id });
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
