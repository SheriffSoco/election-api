const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
let { initiativeData, signatureData } = require("../util/data");

const getSignatureCount = (req, res, next) => {
  let count = 0;
  const initiativeId = req.params.iid;
  for (const { petition } of signatureData) {
    if (petition === initiativeId) count++;
  }

  res.json({ signatureCount: count });
};

const addSignature = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const initiativeId = req.params.iid;
  const initiative = initiativeData.find((i) => i.id === initiativeId);
  if (!initiative) {
    throw new HttpError("Could not find initiative for the provided id.", 404);
  }

  const { firstName, lastName, address, infoType, infoNo } = req.body;

  const obj = {
    id: uuid(),
    petition: initiativeId,
    firstName,
    lastName,
    address,
    infoType,
    infoNo,
  };

  signatureData.push(obj);
  res.status(201).json({ obj });
};

const removeSignature = (req, res, next) => {
  const signatureId = req.params.sid;
  const signature = signatureData.find((s) => s.id === signatureId);
  if (!signature) {
    throw new HttpError("Could not find signature for the provided id.", 404);
  }

  signatureData = signatureData.filter((s) => s.id !== signatureId);
  res.status(200).json({ message: "Deleted " + signatureId});
};

exports.getSignatureCount = getSignatureCount;
exports.addSignature = addSignature;
exports.removeSignature = removeSignature;
