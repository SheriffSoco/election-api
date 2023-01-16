const express = require("express");
const { check, body } = require("express-validator");

const initiativeControllers = require("../controllers/initiative-controllers");

const router = express.Router();

router.get("/notes/:iid", initiativeControllers.getNotesForInitiative);

router.get("/notes/:iid/:nid", initiativeControllers.getNote);

router.post("/notes/:iid", initiativeControllers.addNoteToInitiative);

router.delete(
  "/notes/:iid/:nid",
  initiativeControllers.deleteNoteFromInitiative
);

router.get("/:iid", initiativeControllers.getInitiative);

router.get("/", initiativeControllers.getInitiativeList);

router.post(
  "/",
  [check("subject").not().isEmpty(), check("ballotTitle").not().isEmpty()],
  initiativeControllers.createInitiative
);

router.patch(
  "/:iid",
  [
    check("subject").optional().notEmpty(),
    check("ballotTitle").optional().notEmpty(),
  ],
  initiativeControllers.updateInitiative
);

router.delete("/:iid", initiativeControllers.deleteInitiative);

module.exports = router;
