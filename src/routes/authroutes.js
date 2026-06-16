import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router= express.Router()


router.post('/register',(req,res)=>{
   res.send('<h1>Register</h1>')     
})
router.post('/login',(req,res)=>{

})
















export default router;