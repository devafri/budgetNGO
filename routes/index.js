const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authController = require('../controllers/authController');
const budgetController = require('../controllers/budgetController');
const userController = require('../controllers/userController');
const Employee = require('../models/Employee');

const csrf = require('csurf');
const csrfProtection = csrf();
router.use(csrfProtection);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome back!' });
});

// Employee Routes
router.get('/addEmployee_', (req,res) => {
  res.render('addEmployee_',{title: "Test Add"});
});

router.post('/addEmployee_',(req, res) => {
  let employee = new Employee({
    name: req.body.name, 
    employeeID: req.body.employeeID,
    jobTitle: req.body.jobTitle,
    startDate: req.body.startDate,
    salary: req.body.salary, 
    payPeriod: req.body.payPeriod, 
    fringeRate: req.body.fringeRate,
    team: req.body.team 
  });
  employee.save(function (err) {
    if (err) {
      return next (err);
    }
    res.send('Employee created successfully')
  })
});
router.get('/addEmployee', employeeController.getAddEmployee);
router.post('/addEmployee', employeeController.createEmployee);

router.get('/employees', employeeController.getEmployees);
router.get('/employee/:id', employeeController.readEmployeeDetail);
router.put('/employee/:id/update', employeeController.updateEmployee);

// Budget Routes
router.get('/createBudget', budgetController.createBudget);
// router.post('/createBudget', budgetController.createBudget);
router.get('/budgets', budgetController.getBudgetList);
// router.get('/reviewBudget', budgetController.reviewBudget);

// USER ROUTES
router.get('/user/register', userController.accountRegister);
router.post('/user/register', userController.validateRegister, userController.accountRegister,
authController.login);

module.exports = router;
