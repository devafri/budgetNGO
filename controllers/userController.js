const csrf = require('csurf');
const csrfProtection = csrf();

exports.account = (req, res) => {
    res.render('account', {title: 'Edit Your Account'});
};

exports.accountRegister = (req, res) => {
    res.render('user/register', {title: 'Edit Your Account', csrfToken: req.csrfToken});
};

exports.accountRegisterSubmit = (req, res) => {
    res.render('user/register', function(req, res, next){
        res.redirect('/');
    });
};


exports.updateAccount = async (req, res) => {
    const updates = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findOneAndUpdate(
        { _id: req.body._id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query' }
    );
};

exports.validateRegister = (req, res, next) => {
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
      gmail_remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
    req.checkBody('confirm-password', 'Confirmed Password cannot be blank!').notEmpty();
    req.checkBody('confirm-password', 'Oops! Your passwords do not match').equals(req.body.password);
  
    const errors = req.validationErrors();
    if (errors) {
      req.flash('error', errors.map(err => err.msg));
      res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
      return; // stop the fn from running
    }
    next(); // there were no errors!
  };