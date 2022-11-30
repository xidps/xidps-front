const express = require('express');

const router = express.Router();

router.post("/:id",(req,res,next)=>{
    const {id,password} = req.body;

    if(id === "not"){
        res.status(202).json({token:null});
        return;
    }
    res.status(200).json({token:"token"})

})



module.exports =router;
