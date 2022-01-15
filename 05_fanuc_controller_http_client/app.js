const axios = require('axios');
const express = require('express');
const PORT = process.env.PORT || 8081;
let app = express(); //luodaan express objekti





app.get("/robot/joint_values", (req, res, next) => {
    axios.get('https://fanuc-robot-http-server.herokuapp.com').then(
        (arvot_res)=>{
       
        const regexp1 = 'Joint   [1-6]: *(-?.*)';
        const regexp2 = 'VERSION : *.* ';
        let joint_values1 = [];
        let joint_values2 = [];
        let joint_values3 = "__";
        let matches1 = arvot_res.data.matchAll(regexp1);
        let matches2 = arvot_res.data.matchAll(regexp2);

    
        let count2 = 0;
        for (const match2 of matches2){
            count2++;
            //if (count2 > 1) break;
            //const value = parseFloat(match2[1]);
            joint_values2.push(match2);
        }

        //res.send(joint_values2);
        //console.log(joint_values2); //Kirjoitetaan arvot myös komentoikkunaan


        let count1 = 0;
        for (const match1 of matches1){
            count1++;
            if (count1 > 6) break;
            const value = parseFloat(match1[1]);
            joint_values1.push(value);
        }
            
            res.send(joint_values2 + joint_values3 + joint_values1);
            console.log(joint_values2 + joint_values3 + joint_values1); //Kirjoitetaan arvot myös komentoikkunaan
        });
    });

app.listen(PORT); //käynnistetään ohjelma, ottaa porttinumeron 8081 käyttöön
