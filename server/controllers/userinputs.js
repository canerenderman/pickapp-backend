const UserInput = require('../models').UserInput;

module.exports = {
  create(req, res) {
    return UserInput
      .create({
        gym: req.body.gym,
        sportType: req.body.sportType,
        availability: req.body.availability,
        userId: req.params.userId,
      })
      .then(UserInput => res.status(201).send(UserInput))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
  return UserInput
    .find({
        where: {
          id: req.params.userInputId,
          userId: req.params.userId,
        },
      })
    .then(userInput => {
      if (!userInput) {
        return res.status(404).send({
          message: 'userInput Not Found',
        });
      }

      return userInput
        .update(req.body, {fields: Objects.keys(req.body)}
        // {
        //   gym: req.body.gym || userInput.gym,
        //   sportType: req.body.sportType || userInput.sportType,
        //   availability: req.body.availability || userInput.availability,
        //   processed: req.body.processed || userInput.processed,
        // }
        )
        .then(updatedUserInput => res.status(200).send(updatedUserInput))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},

destroy(req, res) {
  return userInput
    .find({
        where: {
          id: req.params.userInputId,
          userId: req.params.userId,
        },
      })
    .then(userInput => {
      if (!userInput) {
        return res.status(404).send({
          message: 'UserInput Not Found',
        });
      }

      return userInput
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};