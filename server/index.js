const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT=6000;

const app = express();

app.use(cors());
app.options('*',cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('App is running on port 6000..');
  });

app.listen(PORT,()=>{
    console.log(`Server is connected on port ${PORT}`);
})
