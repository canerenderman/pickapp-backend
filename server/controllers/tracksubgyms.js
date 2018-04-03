const TrackSubgym = require('../models').TrackSubgym;
const { Op } = require('sequelize');
var moment = require('moment');

module.exports = {
  create(req, res) {
    return TrackSubgym
      .create({
        time: req.body.time,
        timeDifference: req.body.timeDifference,
        userId: req.params.userId,
      })
      .then(TrackSubgym => res.status(201).send(TrackSubgym))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
  return TrackSubgym
    .find({
        where: {
          id: req.params.trackId,
          userId: req.params.userId,
        },
      })
    .then(trackSubgym => {
      if (!trackSubgym) {
        return res.status(404).send({
          message: 'TrackSubgym Not Found',
        });
      }

      return trackSubgym
        // .update(req.body, {fields: Objects.keys(req.body)}
       .update({
          time: req.body.time || trackSubgym.time,
          timeDifference: req.body.timeDifference || trackSubgym.timeDifference,
        }
        )
        .then(updatedTrackSubgym => res.status(200).send(updatedTrackSubgym))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
retrieve(req,res) {
  TrackSubgym
  .findAndCountAll({
    where: {
      userId: req.params.userId,
      createdAt: {
        [Op.gte]: moment().subtract(1.5, 'hours').toDate()
      }
    },
    limit: 0
  })
  .then(trackSubgym => {
      if (!trackSubgym) {
        return res.status(404).send({
          message: 'TrackSubgym Not Found',
        });
      }
      console.log(trackSubgym.count);
      return res.status(200).send(trackSubgym);
    })
    .catch(error => res.status(400).send(error));
},

destroy(req, res) {
  return TrackSubgym
    .find({
        where: {
          id: req.params.trackId,
          userId: req.params.userId,
        },
      })
    .then(TrackSubgym => {
      if (!TrackSubgym) {
        return res.status(404).send({
          message: 'TrackSubgym Not Found',
        });
      }

      return TrackSubgym
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};