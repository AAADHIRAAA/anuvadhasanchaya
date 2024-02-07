const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./connection');
const PORT=8000;

const app = express();
connectDB().then(()=>{
  const bookRouter = require('./bookRouter');
  app.use(cors());
app.options('*',cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use('/translation',bookRouter);

// app.get('/', (req, res) => {
//     res.send('App is running on port 6000..');
//   });

app.listen(PORT,()=>{
    console.log(`Server is connected on port ${PORT}`);
})
})
.catch((error) => {
  console.error('Error:', error);
});

module.exports=app;
