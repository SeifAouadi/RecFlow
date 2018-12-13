const express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var Consultant = require('./models/Consultant');
var ConsultantModel = mongoose.model('consultant', Consultant);
var Company = require('./models/Company');
var Companymodel = mongoose.model('company', Company);

const port = process.env.port || 3000;
var Candidat = require('./models/Candidat');

const bcrypt = require('bcrypt');
var cors = require('cors');
const app = express();


var db = mongoose.connect('mongodb://localhost:27017/rfDB', {
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

app.post('/consultant', async (req, res) => {
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
  var candidat = new Candidat();
  candidat.firstname = req.body.firstnameValue;
  candidat.lastname = req.body.lastnameValue;
  resultRegister = await Candidat.findOne({ email: req.body.email });
  if (!resultRegister) {
    candidat.email = req.body.emailValue;
    req.body.password = bcrypt.hashSync(req.body.passwordValue, 10);
    candidat.password = req.body.password;
    candidat.save((err, doc) => {
      if (!err) {
        res.send({ success: "a new user is successfully added", status: 200 });
      } else {
        if (err.name === 'ValidationError') {
          handleValidationError(err, req.body);
        }
        console.log("there is an error while adding user in DB:" + err);
        throw new Error(err);

      }
    })
  } else {
    res.send({ error: "email already exists !!!", status: 500 })
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
  resultLogin = await Candidat.findOne({ email: req.body.email });
  if (!resultLogin) {
    res.send({ message: 'user not found' });
  }
  if (!bcrypt.compareSync(req.body.password, resultLogin.password)) {
    res.send({ message: 'bad password' })
  }
  const token = jwt.sign({ data: resultLogin }, 'secret_code');
else { res.send({ message: 'ok' }) }
});

app.post('/company', async (req, res) => {
  var company = new Companymodel(req.body);
  company.save((err, doc) => {
    if (!err) {
      res.send({ success: "Your company is successfully added", status: 200 });
    } else {
      console.log("there is an error while adding company in DB:" + err);
      res.send(err);

    }

  })
});
app.get('/company/:id', async (req, res) => {
  Companymodel.find({ comp: req.params.id }).populate('condidats').then(result => {
    res.send(result);
  })
});
app.get('/consultant/:id', async (req, res) => {
  ConsultantModel.find({ UserId: req.params.id }).populate('condidats').then(result => {
    res.send(result);
  })
});


app.listen(port, function (err, response) {
  console.log('started at port number : ', port);
});
