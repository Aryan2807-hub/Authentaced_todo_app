import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router= express.Router()


router.post('/register',(req,res)=>{
    const body= req.body
    const {username,password}= body
    console.log(username,password)
      
})
router.post('/login',(req,res)=>{

})
















export default router;