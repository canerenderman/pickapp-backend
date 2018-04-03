const PoolSubgym = require('../models').PoolSubgym;
const { Op } = require('sequelize');
var moment = require('moment');

module.exports = {
  create(req, res) {
    return PoolSubgym
      .create({
        time: req.body.time,
        timeDifference: req.body.timeDifference,
        userId: req.params.userId,
      })
      .then(PoolSubgym => res.status(201).send(PoolSubgym))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
  return PoolSubgym
    .find({
        where: {
          id: req.params.poolId,
          userId: req.params.userId,
        },
      })
    .then(poolSubgym => {
      if (!poolSubgym) {
        return res.status(404).send({
          message: 'PoolSubgym Not Found',
        });
      }

      return poolSubgym
        // .update(req.body, {fields: Objects.keys(req.body)}
       .update({
          time: req.body.time || poolSubgym.time,
          timeDifference: req.body.timeDifference || poolSubgym.timeDifference,
        }
        )
        .then(updatedPoolSubgym => res.status(200).send(updatedPoolSubgym))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
retrieve(req,res) {
  PoolSubgym
  .findAndCountAll({
    where: {
      userId: req.params.userId,
      createdAt: {
        [Op.gte]: moment().subtract(1.5, 'hours').toDate()
      }
    },
    limit: 0
  })
  .then(poolSubgym => {
      if (!poolSubgym) {
        return res.status(404).send({
          message: 'PoolSubgym Not Found',
        });
      }
      console.log(poolSubgym.count);
      return res.status(200).send(poolSubgym);
    })
    .catch(error => res.status(400).send(error));
},

destroy(req, res) {
  return PoolSubgym
    .find({
        where: {
          id: req.params.poolId,
          userId: req.params.userId,
        },
      })
    .then(PoolSubgym => {
      if (!PoolSubgym) {
        return res.status(404).send({
          message: 'PoolSubgym Not Found',
        });
      }

      return PoolSubgym
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};