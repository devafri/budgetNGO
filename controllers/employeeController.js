const Employee = require('../models/Employee');
const {promisify} = require('util');

exports.getEmployees = async (req, res) => {
    const page = req.params.page || 1;
    const limit = 40;
    const skip = ( page * limit ) - limit;
    // Query all employees
    const employeePromise = await Employee
        .find({})
        .skip(skip)
        .limit(limit);
    
    //2 Count all records
    const countPromise = Employee.countDocuments();

    const [employee, count] = await Promise.all([employeePromise, countPromise]);
    console.log(employee);
    let employees = JSON.stringify(employee);
    employees = JSON.parse(employees);

    // Calculate pagination 
    const pages = Math.ceil(count / limit);
    if(!employees.length && skip){
        // req.flash('info', `Alert! You asked for page ${page}, but that doesn't exist. We redirected you to page ${pages}`);
        res.redirect(`/employees/page/${pages}`);
        return;
    }

    res.render('listEmployees', {title: `Staff Count: ${count}`, employees, pages, page});
    // console.log(vehicles);
}   


// Get Add New Employee Page
exports.getAddEmployee = (req, res) => {
    res.render('addEmployee', {title: 'Add a new employee'})
}

// Create new Employee
exports.createEmployee = async (req, res, next) => {
    const employee = new Employee({
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
        console.log('Employee created');
        // res.send('Employee created successfully');
        res.redirect('/employees');
      })
};

// Find existing Employee
exports.readEmployeeDetail = function (req, res, next) {
    Employee.findById(req.params.id, function (err, employee) {
        if (err) return next (err);
        res.send(employee);
    })
};

// Update existing employee details
exports.updateEmployee = function (req, res, next) {
    Employee.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, employee) {
            if (err) return next (err);
            res.send('Employee detail updated');
        });
};

