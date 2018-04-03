const FitnessSubgym = require('../models').FitnessSubgym;

module.exports = {
  create(req, res) {
    return FitnessSubgym
      .create({
        hour: req.body.hour,
        availability: req.body.availability,
        userId: req.params.userId,
      })
      .then(FitnessSubgym => res.status(201).send(FitnessSubgym))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
  return FitnessSubgym
    .find({
        where: {
          id: req.params.fitnessId,
          userId: req.params.userId,
        },
      })
    .then(fitnessSubgym => {
      if (!fitnessSubgym) {
        return res.status(404).send({
          message: 'FitnessSubgym Not Found',
        });
      }

      return fitnessSubgym
        // .update(req.body, {fields: Objects.keys(req.body)}
       .update({
          hour: req.body.hour || fitnessSubgym.hour,
          availability: req.body.availability || fitnessSubgym.availability,
        }
        )
        .then(updatedFitnessSubgym => res.status(200).send(updatedFitnessSubgym))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
retrieve(req,res) {
  return FitnessSubgym
  .findAll({
    limit: 1,
    where: {
      userId: req.params.userId,
    //your where conditions, or without them if you need ANY entry
    },
    order: [ [ 'createdAt', 'DESC' ]]
  }).then(function(entries){
  //only difference is that you get users list limited to 1
  return entries[0]
  })
  .then(fitnessSubgym => {
      if (!fitnessSubgym) {
        return res.status(404).send({
          message: 'FitnessSubgym Not Found',
        });
      }
      return res.status(200).send(fitnessSubgym);
    })
    .catch(error => res.status(400).send(error));
},

destroy(req, res) {
  return FitnessSubgym
    .find({
        where: {
          id: req.params.fitnessId,
          userId: req.params.userId,
        },
      })
    .then(FitnessSubgym => {
      if (!FitnessSubgym) {
        return res.status(404).send({
          message: 'FitnessSubgym Not Found',
        });
      }

      return FitnessSubgym
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};