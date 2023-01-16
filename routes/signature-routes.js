const express = require("express");
const { check } = require("express-validator");

const signatureControllers = require("../controllers/signature-controllers");

const router = express.Router();

router.get("/:iid", signatureControllers.getSignatureCount);

router.post(
  "/:iid",
  [
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("address").notEmpty(),
    check("infoType").custom((value, { req }) => {
      infoNo = req.body.infoNo;
      return (
        (value === "D" && infoNo.length == 6) ||
        (value === "P" && infoNo.length == 7) ||
        (value === "S" && infoNo.length == 9)
      );
    }),
    check("infoNo").isInt(),
  ],
  signatureControllers.addSignature
);

router.delete("/:sid", signatureControllers.removeSignature);

module.exports = router;
