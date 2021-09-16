const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
};

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where("id", id).first();
};

const create = account => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert({ account })
  const newAccount = await getById(id)
  return newAccount
};

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).update({ id, account })
    .then(() => {
      return getById(id)
    })
};

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).del()
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
