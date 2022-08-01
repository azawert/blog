import express from 'express'
import  jwt  from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt'

import {registerValidator} from './validations/auth.js'

import UserModal from './models/User.js'

mongoose.connect('mongodb+srv://admin:admin@cluster0.qkyum.mongodb.net/blogs/?retryWrites=true&w=majority').then(()=>{
    console.log('DB ok')
})


const app = express();

app.use(express.json());



app.post('/auth/login', async (req,res)=>{
    console.log(req.body)
    const token  = jwt.sign({
        email: req.body.email,
        fullName: 'Васёк'
    }, 'secret123')
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModal({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash,
    })
    const user = await doc.save();
    res.json(user)
})

app.post('/auth/register',registerValidator, (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    res.json({
        success:true,
    })
})

app.listen(9999,(err)=>{
    if(err) {
        console.log(err)
    }
    console.log('its alive')
})

