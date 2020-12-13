exports.createBudget = (req, res, next) => {
    res.render('createBudget', {title: 'Create a budget'})
};

exports.getBudgetList = (req, res, next) => {
    res.render('budgets', {title: 'This is the budgets list'})
};

// TODO adapt shopping cart model for budget model
exports.addPersonnel = (req, res, next) => {
    router.post("/budget", async (req, res) => {
        const { productId, quantity, jobTitle, salary } = req.body;
      
        const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id
      
        try {
          let budget = await Budget.findOne({ userId });
      
          if (budget) {
            //budget exists for user
            let itemIndex = vudget.products.findIndex(p => p.productId == productId);
      
            if (itemIndex > -1) {
              //product exists in the budget, update the quantity
              let productItem = budget.products[itemIndex];
              productItem.quantity = quantity;
              budget.products[itemIndex] = productItem;
            } else {
              //product does not exists in budget, add new item
              budget.products.push({ productId, quantity, name, price });
            }
            budget = await budget.save();
            return res.status(201).send(budget);
          } else {
            //no budget for user, create new budget
            const newCart = await Cart.create({
              userId,
              products: [{ productId, quantity, name, price }]
            });
      
            return res.status(201).send(newCart);
          }
        } catch (err) {
          console.log(err);
          res.status(500).send("Something went wrong");
        }
      });
};