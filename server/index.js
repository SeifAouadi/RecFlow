const express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var Consultant = require('./models/Consultant');
var ConsultantModel = mongoose.model('consultant', Consultant);
var multer  = require('multer');
var jwt = require('jsonwebtoken');
const port = process.env.port || 3000;
var Candidat = require('./models/Candidat');
var CandidatModel = mongoose.model('candidat', Candidat);
var Company = require('./models/Company');
var Companymodel = mongoose.model('company', Company);
const bcrypt = require('bcrypt');
var cors = require('cors');
const IncomingForm = require('formidable').IncomingForm;
var form = new IncomingForm();
const app = express();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './../src/assets/imageUser/')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
});
mongoose.connect('mongodb://localhost:27017/rfDB', {
  useNewUrlParser: true,
  useCreateIndex: true,
}, (err) => {
  if (!err) {
    console.log('connected to database successfully');
  } else {
    console.log('Error while connection:' + err);
  }
});
app.use(cors());
app.use(bodyParser.json());

 app.post('/upload', upload.single('file'), function (req, res, next) {
res.send(req.file)
  });

app.post('/consultant/:id' , async (req,res) => {
 const consultant = await ConsultantModel.findOne({user: req.params.id})
 if (consultant) {
    const cand =  await ConsultantModel.findByIdAndUpdate(consultant._id,{$set:req.body})
} else {
    const consu = await ConsultantModel.create(req.body)
    const cand = await CandidatModel.findByIdAndUpdate(req.params.id, {$set: {cansul: consu._id}})
    const candnew = await CandidatModel.findOne({_id:req.params.id})

    res.send({Token : jwt.sign({ data: candnew}, 'my_secreeeet')})
    // jwt.verify()
}
});
 // const consul =  await ConsultantModel.findById({_id:consultant._id});
 // await CandidatModel.$set({consul : consul});

  //consultant.save();
  // (error) => {
  //   res.sendStatus(500)
  //   console.log(error)
  // }
  // res.send(consultant)


  app.post('/register', async (req, res) => {
    var candidat = new CandidatModel();
    candidat.firstname = req.body.firstnameValue;
    candidat.lastname = req.body.lastnameValue;
    resultRegister = await CandidatModel.findOne({email: req.body.email});
    if (!resultRegister) {
      candidat.email = req.body.emailValue;
      req.body.password = bcrypt.hashSync(req.body.passwordValue, 10);
      candidat.password = req.body.password;
      candidat.save((err, doc) => {
        if (!err) {
          res.send({message: "a new user is successfully added", status: 200});
        } else {
          /*if (err.name === 'ValidationError') {
            handleValidationError(err, req.body);
          }*/
          res.send({message: "email already exists !!!", status: 500})

        }
      })
    }
  });
  function handleValidationError(err, body) {
    for (field in err.errors) {
      switch (err.errors[field].path) {
        case 'firstname':
          body['firstnameError'] = err.errors[field].message;
          break;
        default:
          break;
      }
    }
  }
  app.post('/login', async (req, res) => {
    resultLogin = await CandidatModel.findOne({ email: req.body.email });
    if (!resultLogin) {
      res.send({ message: 'user not found' });
    }
    if (!bcrypt.compareSync(req.body.password, resultLogin.password)) {
      res.send({ message: 'bad password' })
    }
    else { res.send({ message: 'ok', Token : jwt.sign({data:resultLogin},'my_secreeeet')})
    jwt.verify() }
    /*const token = jwt.sign({ data: resultLogin }, 'secret_code')};*/
  });
app.post('/company/:id', async (req, res) => {
  const company = await Companymodel.findOne({user : req.params.id});
  if (company) {
    const cand = await Companymodel.findByIdAndUpdate(company._id, {$set: req.body});
    res.send(cand);
  } else {
    const camp = await Companymodel.create(req.body);
    const cand = await CandidatModel.findByIdAndUpdate(req.params.id, {$set: {comp : camp._id}})
    res.send(cand);
  }

  });
  app.get('/company/:id', async (req,res) => {
    Companymodel.find({user : req.params.id}).populate('condidats').then(result => {
      res.send(result);
    })
  });
  app.get('/consultant/:id', async (req,res) => {
    ConsultantModel.find({user : req.params.id}).populate('condidats').then(result => {
      res.send(result);
    })
  });
  app.get('/condidat/:id', async (req, res)=> {
const candidat = await CandidatModel.findById({_id : req.params.id})
res.send(candidat);
  })
  /*app.get('/consultant/:id', async (req,res)=> {
    const consultant = await ConsultantModel.findById({_id : req.params.id});
    res.send(consultant);
  })*/
  app.get('/consultant', async (req, res) => {
    const consultant = await ConsultantModel.find(req.body)
    res.send(consultant)
  });


app.listen(port, function (err, response) {
  console.log('started at port number : ', port);
});
