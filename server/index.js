const express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
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
      cb(null, './imageUser/')
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

app.post('/consultant' , async (req,res) => {
 var consultant = new ConsultantModel(req.body);
 console.log(consultant);

  consultant.save();
  (error) => {
    res.sendStatus(500)
    console.log(error)
  }
  res.send(consultant)
  });

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
          res.send({success: "a new user is successfully added", status: 200});
        } else {
          if (err.name === 'ValidationError') {
            handleValidationError(err, req.body);
          }
          console.log("there is an error while adding user in DB:" + err);
          throw new Error(err);

        }
      })
    } else {
      res.send({error: "email already exists !!!", status: 500})
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
app.post('/company', async (req, res) => {
  var company = new Companymodel(req.body);
    company.save((err, doc) => {
      if (!err) {
        res.send({success: "Your company is successfully added", status: 200});
      } else {
        console.log("there is an error while adding company in DB:" + err);
       res.send(err);

      }

    })
  });
  app.get('/company/:id', async (req,res) => {
    Companymodel.find({comp : req.params.id}).populate('condidats').then(result => {
      res.send(result);
    })
  });
  app.get('/consultant/:id', async (req,res) => {
    ConsultantModel.find({UserId : req.params.id}).populate('condidats').then(result => {
      res.send(result);
    })
  });
  app.get('/condidat/:id', async (req, res)=> {
const candidat = await CandidatModel.findById({_id : req.params.id})
res.send(candidat);
  })
  app.get('/consultant', async (req, res) => {
    const consultant = await ConsultantModel.find(req.body)
    res.send(consultant)
  });


app.listen(port, function (err, response) {
  console.log('started at port number : ', port);
});
