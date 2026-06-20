import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router= express.Router()


router.post('/register',(req,res)=>{
    const {username,password}= req.body
    const hashedPassword=bcrypt.hashSync(password,8)
    try{
        // check for existing user
        const getUser = db.prepare(`SELECT id FROM users WHERE username = ?`)
        const existing = getUser.get(username)
        if(existing){
            return res.status(409).json({error: 'Username already exists'})
        }

        const insertUser = db.prepare(`INSERT INTO users (username,password) VALUES (?,?)`)
        insertUser.run(username,hashedPassword)

        // retrieve the inserted user's id reliably
        const user = getUser.get(username)
        const userId = user && user.id

        // adding first default todo
        const defaultTodo = `hello ${username}, this is your first todo! :)`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id,title) VALUES (?,?)`)
        insertTodo.run(userId,defaultTodo)

        // ensure JWT secret is available
        if(!process.env.JWT_SECRET){
            console.error('JWT_SECRET is not set')
            return res.status(500).json({error: 'Server configuration error'})
        }

        const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '24h'})
        return res.status(201).json({token})
    }catch(err ){
        console.log(err)
        res.sendStatus(503)
    }

})
router.post('/login',(req,res)=>{

})
















export default router;