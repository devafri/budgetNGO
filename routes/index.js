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

// EMPLOYEE ROUTES
router.get('/addEmployee_', (req,res) => {
  res.render('addEmployee_',{title: "Test Add"});
});

router.get('/addEmployee', employeeController.getAddEmployee);
router.post('/addEmployee', employeeController.createEmployee);

router.get('/employees', employeeController.getEmployees);
router.get('/employee/:id', employeeController.readEmployeeDetail);
router.put('/employee/:id/update', employeeController.updateEmployee);

// BUDGET ROUTES
router.get('/createBudget', budgetController.createBudget);
// router.post('/createBudget', budgetController.createBudget);
router.get('/budgets', budgetController.getBudgetList);
// router.get('/reviewBudget', budgetController.reviewBudget);

// USER ROUTES
router.get('/register', userController.registerForm);
router.post('/register', 
  // userController.validateRegisterForm, 
  userController.register,
  authController.login);
router.get('/login', userController.loginForm);

module.exports = router;
