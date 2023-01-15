const express = require("express");

const signatureControllers = require("../controllers/signature-controllers");

const router = express.Router();

router.get("/:iid", signatureControllers.getSignatureCount);

router.post("/:iid", signatureControllers.addSignature);

router.delete("/:iid", signatureControllers.removeSignature);

module.exports = router;
