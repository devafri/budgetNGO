exports.createBudget = (req, res, next) => {
    res.render('createBudget', {title: 'Create a budget'})
};

exports.getBudgetList = (req, res, next) => {
    res.render('budgets', {title: 'This is the budgets list'})
};