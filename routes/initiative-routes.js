const express = require("express");

const initiativeControllers = require("../controllers/initiative-controllers");

const router = express.Router();

router.get("/notes/get-all/:iid", initiativeControllers.getNotesForInitiative);

router.get("/notes/:iid/:nid", initiativeControllers.getNote);

router.post("/notes/:iid", initiativeControllers.addNoteToInitiative);

router.delete(
  "/notes/:iid/:nid",
  initiativeControllers.deleteNoteFromInitiative
);

router.get("/:id", initiativeControllers.getInitiative);

router.get("/", initiativeControllers.getInitiativeList);

router.post("/", initiativeControllers.createInitiative);

router.patch("/:id", initiativeControllers.updateInitiative);

router.delete("/:id", initiativeControllers.deleteInitiative);

module.exports = router;
