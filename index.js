import express from 'express'

const app = express();

app.get('/',(req,res)=>{
    res.send('Hello World 1337!');
})

app.listen(9999,(err)=>{
    if(err) {
        console.log(err)
    }
    console.log('its alive')
})

