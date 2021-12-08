const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Roster = require("./models/roster");
const Teacher = require("./models/teacher");
const dbUrl = process.env.DB_URL

const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }))
app.use(express.json());


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://popsicle-sticks.herokuapp.com"); // update to match the domain you will make the request from
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/teacher", async (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'https://popsicle-sticks.herokuapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  
    let teacher = await Teacher.findOne({teacher: req.body.teacher})
    if(teacher === null){
      const newTeacher = new Teacher({teacher: req.body.teacher});
      await newTeacher.save();
      teacher = await Teacher.findOne({teacher: req.body.teacher});
    }
    
  
    res.status(200).json(teacher)
    
});
app.post("/roster", async (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'https://popsicle-sticks.herokuapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  
    let testTeacher = await Teacher.findOne({teacher: req.body.teacher});
    if (testTeacher){
      if(testTeacher.rosters){
        if(testTeacher.rosters[req.body.title]){
          testTeacher.rosters[req.body.title] = req.body.roster;
          await Teacher.findOneAndUpdate({teacher: req.body.teacher},testTeacher);
        }else{
          testTeacher.rosters = {...testTeacher.rosters,[req.body.title]:req.body.roster};
          await Teacher.findOneAndUpdate({teacher: req.body.teacher},testTeacher);
        };
      } else {
        testTeacher.rosters = {[req.body.title]:req.body.roster}
        await Teacher.findOneAndUpdate({teacher: req.body.teacher},testTeacher);
      }
    }else{
      testTeacher = new Teacher({teacher: req.body.teacher, rosters: { [req.body.title] : req.body.roster}})
      await testTeacher.save();
    }
    res.status(200).json("success")
    
});

app.delete("/roster", async (req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', 'https://popsicle-sticks.herokuapp.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  let testRoster = await Teacher.findOne({teacher: req.body.teacher});
  if(testRoster){
    if(testRoster.rosters[req.body.roster]){
      delete testRoster.rosters[req.body.roster];
      await Teacher.findOneAndUpdate({teacher:req.body.teacher}, testRoster);
    }
  }
  res.status(200).json("success");
})

const port = process.env.PORT || 3001;

app.listen(port, ()=>console.log("Server is up"))