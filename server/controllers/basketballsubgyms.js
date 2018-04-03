const BasketballSubgym = require('../models').BasketballSubgym;
const { Op } = require('sequelize');
var moment = require('moment');

module.exports = {
  create(req, res) {
    return BasketballSubgym
      .create({
        time: req.body.time,
        timeDifference: req.body.timeDifference,
        userId: req.params.userId,
      })
      .then(BasketballSubgym => res.status(201).send(BasketballSubgym))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
  return BasketballSubgym
    .find({
        where: {
          id: req.params.basketballId,
          userId: req.params.userId,
        },
      })
    .then(basketballSubgym => {
      if (!basketballSubgym) {
        return res.status(404).send({
          message: 'BasketballSubgym Not Found',
        });
      }

      return basketballSubgym
        // .update(req.body, {fields: Objects.keys(req.body)}
       .update({
          time: req.body.time || basketballSubgym.time,
          timeDifference: req.body.timeDifference || basketballSubgym.timeDifference,
        }
        )
        .then(updatedBasketballSubgym => res.status(200).send(updatedBasketballSubgym))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
retrieve(req,res) {
  BasketballSubgym
  .findAndCountAll({
    where: {
      userId: req.params.userId,
      createdAt: {
        [Op.gte]: moment().subtract(1.5, 'hours').toDate()
      }
    }
  })
  .then(basketballSubgym => {
      if (!basketballSubgym) {
        return res.status(404).send({
          message: 'BasketballSubgym Not Found',
        });
      }
      console.log(basketballSubgym.count);
      return res.status(200).send(basketballSubgym);
    })
    .catch(error => res.status(400).send(error));
},

destroy(req, res) {
  return BasketballSubgym
    .find({
        where: {
          id: req.params.basketballId,
          userId: req.params.userId,
        },
      })
    .then(BasketballSubgym => {
      if (!BasketballSubgym) {
        return res.status(404).send({
          message: 'BasketballSubgym Not Found',
        });
      }

      return BasketballSubgym
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};