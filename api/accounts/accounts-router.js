const router = require('express').Router()
const Account = require('./accounts-model');
const mw = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', mw.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getById(req.params.id);
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.post('/', mw.checkAccountPayload, mw.checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newAccount = await Account.create({
      name: req.body.name.trim(),
      budget: req.body.budget,
    });
    res.status(201).json(newAccount);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', mw.checkAccountId, mw.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const update = await Account.updateById(req.params.id, req.body);
    res.json(update);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await Account.deleteById(req.params.id);
    res.json(req.account);
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line
router.use((err, req, res, next) => { 
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
});

module.exports = router;
