const User = require('../models').User;
const UserInput = require('../models').UserInput;
const FitnessSubgym = require('../models').FitnessSubgym;
const BasketballSubgym = require('../models').BasketballSubgym;
const PoolSubgym = require('../models').PoolSubgym;
const TrackSubgym = require('../models').TrackSubgym;

module.exports = {
  create(req, res) {
    return User
      .create({
        title: req.body.title,
      })
      .then(user => res.status(201).send(user))
      .catch(err => {
    console.error("Post request error", err);
  });
  },
  list(req, res) {
  return User
    .findAll({
      include: [{
        model: UserInput,
        as: 'userInputs'
      }, {
        model: FitnessSubgym,
        as: 'fitnessSubgyms',
      },{
        model: BasketballSubgym,
        as: 'basketballSubgyms',
      },{
        model: PoolSubgym,
        as: 'poolSubgyms',
      },{
        model: TrackSubgym,
        as: 'trackSubgyms',
      }]
    })
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
},
retrieve(req, res) {
  return User
    .findById(req.params.userId, {
      include: [{
        model: UserInput,
        as: 'userInputs',
      },{
        model: FitnessSubgym,
        as: 'fitnessSubgyms',
      },{
        model: BasketballSubgym,
        as: 'basketballSubgyms',
      },{
        model: PoolSubgym,
        as: 'poolSubgyms',
      },{
        model: TrackSubgym,
        as: 'trackSubgyms',
      }]
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return res.status(200).send(user);
    })
    .catch(error => res.status(400).send(error));
},
update(req, res) {
  return User
    .findById(req.params.userId, {
      include: [{
        model: UserInput,
        as: 'userInputs',
      }],
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return user
        .update({
          title: req.body.title || user.title,
        })
        .then(() => res.status(200).send(user))  // Send back the updated user.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
},
destroy(req, res) {
  return User
    .findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(400).send({
          message: 'User Not Found',
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};
// const User = require('../models').User;
// const UserInput = require('../models').UserInput;
// // const FitnessSubgym = require('../models').FitnessSubgym;
// // const BasketballSubgym = require('../models').BasketballSubgym;
// // const PoolSubgym = require('../models').PoolSubgym;
// // const TrackSubgym = require('../models').TrackSubgym;

// module.exports = {
//   create(req, res) {
//     return User
//       .create({
//         title: req.body.title,
//       })
//       .then(user => res.status(201).send(user))
//       .catch(err => {
//     console.error("Post request error", err);
//   });
//   },
//   list(req, res) {
//   return User
//     .findAll({
//     	include: [{
//     		model: UserInput,
//     		as: 'userInputs'
//     	}]
//     })
//     .then(users => res.status(200).send(users))
//     .catch(error => res.status(400).send(error));
// },
// retrieve(req, res) {
//   return User
//     .findById(req.params.userId, {
//       include: [{
//         model: UserInput,
//         as: 'userInputs',
//       }]
//     })
//     .then(user => {
//       if (!user) {
//         return res.status(404).send({
//           message: 'User Not Found',
//         });
//       }
//       return res.status(200).send(user);
//     })
//     .catch(error => res.status(400).send(error));
// },
// update(req, res) {
//   return User
//     .findById(req.params.userId, {
//       include: [{
//         model: UserInput,
//         as: 'userInputs',
//       }],
//     })
//     .then(user => {
//       if (!user) {
//         return res.status(404).send({
//           message: 'User Not Found',
//         });
//       }
//       return user
//         .update({
//           title: req.body.title || user.title,
//         })
//         .then(() => res.status(200).send(user))  // Send back the updated user.
//         .catch((error) => res.status(400).send(error));
//     })
//     .catch((error) => res.status(400).send(error));
// },
// destroy(req, res) {
//   return User
//     .findById(req.params.userId)
//     .then(user => {
//       if (!user) {
//         return res.status(400).send({
//           message: 'User Not Found',
//         });
//       }
//       return user
//         .destroy()
//         .then(() => res.status(204).send())
//         .catch(error => res.status(400).send(error));
//     })
//     .catch(error => res.status(400).send(error));
// },
// };