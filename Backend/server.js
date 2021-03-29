const express = require('express');
const app = express();

const axios = require ('axios');
const { response } = require('express');
/*
const getGameData = () => {
    axios({
        method: 'post',
        url: 'https://api.igdb.com/v4/games/',
        headers:{
            'Client-ID': 'bvtuqo4e9i0uoscphs9pxqdrb2q2zn',
            'Authorization': 'Bearer ke6pc6yxno2y2qp1g5ggbfp8bq4gg3',
        },
        data:{
            fields: 'name',
            where: 'release_dates.platform = 6',
        }
    }).then(response => {
        console.log(response);
    });
}
*/



app.listen(3000, function(){
    console.log('Listening on 3000');
});
var obj = null;
app.use(() => {
    axios({
        method: 'post',
        url: 'https://api.igdb.com/v4/games/',
        headers:{
            'Client-ID': 'bvtuqo4e9i0uoscphs9pxqdrb2q2zn',
            'Authorization': 'Bearer ke6pc6yxno2y2qp1g5ggbfp8bq4gg3',
        },
        data:'fields name; where release_dates.platform = 6 & rating >= 90 & release_dates.date >= 946735200000; limit 80;',
    }).then(response => {
        console.log(response.data);
    });
    
    
} );
