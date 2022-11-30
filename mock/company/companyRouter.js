const express = require('express');

const router = express.Router();
router.get("/", (req, res) => {
    res.json([{"id": "xid", name: "company", abbreviation: "xid_c"}])
})

router.get("/consonant/:id", (req, res) => {
    const {id} = req.params;
    console.log(req.params);

    if (id === "ㄱ") {
        res.status(200).json([
            {companyId: "gg", companyName: "가나다"},
            {companyId: "ggg", companyName: "가가가"}
        ])
    }
    return res.json([]);
})

module.exports = router;
