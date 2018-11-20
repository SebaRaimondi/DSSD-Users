const User = require('../models').User;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
  list(req, res) {
    return User.findAll()
      .then((users) => res.status(200).send(users))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },

  async add(req, res) {
    // Check if email is taken
    let user = await User.findOne({ where: { email: req.body.email } })
    if (user) return res.status(500).json({ 'message':'Email in use' })

    bcrypt.hash(req.body.pass, saltRounds, (err, hash) => {
        return User
        .create({
            email: req.body.email,
            pass: hash,
        })
        .then((user) => res.status(201).send(user))
        .catch((error) => res.status(400).send(error));
    });
  },

  update(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        bcrypt.hash(req.body.pass, saltRounds, (err, hash) => {
            return user
            .update({
                email: req.body.email || user.email,
                pass: hash || user.pass,
            })
            .then(() => res.status(200).send(user))
            .catch((error) => res.status(400).send(error));
        });
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  async login(req, res) {
    if (!req.body.email || !req.body.pass) res.status(500).json({ 'message':'Check request' })

    let user = await User.findOne({ where: { email: req.body.email } })
    if (!user) return res.status(400).json({ 'message':'Email not registered' })

    let compare = await bcrypt.compare(req.body.pass, user.pass)
    if (!compare) res.status(500).json({ 'message':'Incorrect email/password' })

    res.status(200).json({ 'message':'Logged in' })
  }
};
