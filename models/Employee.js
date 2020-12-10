const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');


const EmployeeSchema = new Schema({
    name:{
      type: String,
      required: 'Please supply a name',
      trim: true
    },
    employeeID:{
        type: String,
        trim: true
      },
    jobTitle:{
        type: String,
        required: 'Please enter job title',
        trim: true
      },
    startDate:{
        type: Date,
        required: 'Please enter job title',
        trim: true
      },
    salary:{
        type: Number,
        required: 'Please enter salary',
        trim: true
      },
    payPeriod:{
        type: String,
        required: 'Please select Annual, Monthly, Hourly',
        trim: true
      },
    fringeRate:{
        type: Number,
        required: 'Please enter fringe title',
        trim: true
      },
    team:{
        type: String,
        required: 'Please enter budget team',
        trim: true
      },

  },{strict: false});

EmployeeSchema.plugin(passportLocalMongoose, { usernameField: 'employeeID' });
EmployeeSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Employee', EmployeeSchema);