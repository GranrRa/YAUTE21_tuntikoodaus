const axios = require('axios');
const express = require('express');
const PORT = process.env.PORT || 8081;
let app = express(); //luodaan express objekti





app.get("/robot/joint_values", (req, res, next) => {
    axios.get('https://fanuc-robot-http-server.herokuapp.com').then(
        (arvot_res)=>{
       
        const regexp1 = 'Joint   [1-6]: *(-?.*)';
        let joint_values = [];
        let matches = arvot_res.data.matchAll(regexp1);
        let count = 0;
        for (const match of matches){
            count++;
            if (count > 6) break;
            const value = parseFloat(match[1]);
            joint_values.push(value);
        }
            
            res.send(joint_values);
            console.log(joint_values); //Kirjoitetaan arvot myös komentoikkunaan
        });
    });

app.listen(PORT); //käynnistetään ohjelma, ottaa porttinumeron 8081 käyttöön
