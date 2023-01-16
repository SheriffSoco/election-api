const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error.js");
let { initiativeData } = require("../util/data.js");

const getNotesForInitiative = (req, res, next) => {
  const initiativeId = req.params.iid;
  const initiative = initiativeData.find((i) => i.id === initiativeId);
  if (!initiative) {
    throw new HttpError("Could not find initiative for the provided id.", 404);
  }
  const notes = initiative.status;

  res.json({ notes });
};

const getNote = (req, res, next) => {
  const initiativeId = req.params.iid;
  const initiative = initiativeData.find((i) => i.id === initiativeId);
  if (!initiative) {
    throw new HttpError("Could not find initiative for the provided id.", 404);
  }
  const noteId = req.params.nid;
  const note = initiative.status.find((s) => s.id === noteId);
  if (!note) {
    throw new HttpError("Could not find note for the provided id.", 404);
  }

  res.json({ note });
};

const addNoteToInitiative = (req, res, next) => {
  const initiativeId = req.params.iid;
  const initiative = initiativeData.find((i) => i.id === initiativeId);
  if (!initiative) {
    throw new HttpError("Could not find initiative for the provided id.", 404);
  }

  let { date, type, text, total } = req.body;
  if (!total) total = "";
  const createdNote = {
    id: uuid(),
    date,
    type,
    text,
    total,
  };

  initiative.status.push(createdNote);
  res.status(201).json({ createdNote });
};

const deleteNoteFromInitiative = (req, res, next) => {
  const initiativeId = req.params.iid;
  const initiative = initiativeData.find((i) => i.id === initiativeId);
  if (!initiative) {
    throw new HttpError("Could not find initiative for the provided id.", 404);
  }
  const noteId = req.params.nid;
  const note = initiative.status.find((s) => s.id === noteId);
  if (!note) {
    throw new HttpError("Could not find note for the provided id.", 404);
  }

  initiative.status = initiative.status.filter((n) => n.id !== noteId);
  res.status(200).json({ message: "Deleted " + noteId });
};

const getInitiative = (req, res, next) => {
  const initiativeId = req.params.iid;
  const initiative = initiativeData.find((i) => i.id === initiativeId);
  if (!initiative) {
    throw new HttpError("Could not find initiative for the provided id.", 404);
  }

  res.json({ initiative });
};

const getInitiativeList = (req, res, next) => {
  const initiativeList = [];
  for (const { id, type, statutory, subject, ballotTitle } of initiativeData) {
    const briefInfo = {
      id,
      type,
      statutory,
      subject,
      ballotTitle,
    };
    initiativeList.push(briefInfo);
  }

  res.json({ initiativeList });
};

const createInitiative = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  
  let {
    type="Initiative",
    statutory="Constitutional",
    signatures=0,
    circulationDate="",
    stage="",
    measureNo="",
    petitionerOneName="",
    petitionerOneAddress="",
    petitionerOneCity="",
    petitionerOnePhone="",
    petitionerTwoName="",
    petitionerTwoAddress="",
    petitionerTwoCity="",
    petitionerTwoPhone="",
    petitionerThreeName="",
    petitionerThreeAddress="",
    petitionerThreeCity="",
    petitionerThreePhone="",
    subject,
    ballotTitle,
    finalNoteText="",
    finalNoteDate="",
    image="",
    status=[]
  } = req.body;

  const obj = {
    id: uuid(),
    type,
    statutory,
    signatures,
    circulationDate,
    stage,
    measureNo,
    petitionerOneName,
    petitionerOneAddress,
    petitionerOneCity,
    petitionerOnePhone,
    petitionerTwoName,
    petitionerTwoAddress,
    petitionerTwoCity,
    petitionerTwoPhone,
    petitionerThreeName,
    petitionerThreeAddress,
    petitionerThreeCity,
    petitionerThreePhone,
    subject,
    ballotTitle,
    finalNoteText,
    finalNoteDate,
    image,
    status
  }

  initiativeData.push(obj);

  res.status(201).json(obj);
};

const updateInitiative = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const initiativeId = req.params.iid;
  const initiative = initiativeData.find((i) => i.id === initiativeId);
  const initiativeIndex = initiativeData.findIndex((i) => i.id === initiativeId);
  if (!initiative) {
    throw new HttpError("Could not find initiative for the provided id.", 404);
  }

  let {
    type=initiative.type,
    statutory=initiative.statutory,
    signatures=initiative.signatures,
    circulationDate=initiative.circulationDate,
    stage=initiative.stage,
    measureNo=initiative.measureNo,
    petitionerOneName=initiative.petitionerOneName,
    petitionerOneAddress=initiative.petitionerOneAddress,
    petitionerOneCity=initiative.petitionerOneCity,
    petitionerOnePhone=initiative.petitionerOnePhone,
    petitionerTwoName=initiative.petitionerTwoName,
    petitionerTwoAddress=initiative.petitionerTwoAddress,
    petitionerTwoCity=initiative.petitionerTwoCity,
    petitionerTwoPhone=initiative.petitionerTwoPhone,
    petitionerThreeName=initiative.petitionerThreeName,
    petitionerThreeAddress=initiative.petitionerThreeAddress,
    petitionerThreeCity=initiative.petitionerThreeCity,
    petitionerThreePhone=initiative.petitionerThreePhone,
    subject=initiative.subject,
    ballotTitle=initiative.ballotTitle,
    finalNoteText=initiative.finalNoteText,
    finalNoteDate=initiative.finalNoteDate,
    image=initiative.image,
  } = req.body;

  const obj = {
    id: initiative.id,
    type,
    statutory,
    signatures,
    circulationDate,
    stage,
    measureNo,
    petitionerOneName,
    petitionerOneAddress,
    petitionerOneCity,
    petitionerOnePhone,
    petitionerTwoName,
    petitionerTwoAddress,
    petitionerTwoCity,
    petitionerTwoPhone,
    petitionerThreeName,
    petitionerThreeAddress,
    petitionerThreeCity,
    petitionerThreePhone,
    subject,
    ballotTitle,
    finalNoteText,
    finalNoteDate,
    image,
    status: initiative.status,
  }

  initiativeData[initiativeIndex] = obj;

  res.status(201).json(obj);
};

const deleteInitiative = (req, res, next) => {
  const initiativeId = req.params.iid;
  const initiative = initiativeData.find((i) => i.id === initiativeId);
  if (!initiative) {
    throw new HttpError("Could not find initiative for the provided id.", 404);
  }

  initiativeData = initiativeData.filter((i) => i.id !== initiativeId);
  res.status(200).json({ message: "Deleted " + initiativeId });
};

exports.getNotesForInitiative = getNotesForInitiative;
exports.getNote = getNote;
exports.addNoteToInitiative = addNoteToInitiative;
exports.deleteNoteFromInitiative = deleteNoteFromInitiative;
exports.getInitiative = getInitiative;
exports.getInitiativeList = getInitiativeList;
exports.createInitiative = createInitiative;
exports.updateInitiative = updateInitiative;
exports.deleteInitiative = deleteInitiative;
