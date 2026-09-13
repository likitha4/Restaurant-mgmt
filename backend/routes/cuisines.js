const pool= require('../db');
const express= require('express');
const router= express.Router();

router.get("/",async(req,res)=>{
    try{
        const result= await pool.query("select * from cuisines")
         res.json(result.rows)
    }
    catch(error){
        res.json({message:error.message});
    }

});
module.exports= router;