const Facility = require('../models').Facility;
const { Op } = require('sequelize');
var moment = require('moment');

module.exports = {
  create(req, res) {
    return Facility
      .create({
        sportType: req.body.sportType,
        locationId: req.params.locationId,
      })
      .then(Facility => res.status(201).send(Facility))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
  return Facility
    .find({
        where: {
          id: req.params.facilityId,
          locationId: req.params.locationId,
        },
      })
    .then(facility => {
      if (!facility) {
        return res.status(404).send({
          message: 'Facility Not Found',
        });
      }

      return facility
        // .update(req.body, {fields: Objects.keys(req.body)}
       .update({
          sportType: req.body.sportType || facility.sportType,
        }
        )
        .then(updatedFacility => res.status(200).send(updatedFacility))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
retrieve(req,res) {
  Facility
  .findAndCountAll({
    where: {
      locationId: req.params.locationId,
      createdAt: {
        [Op.gte]: moment().subtract(1.5, 'hours').toDate()
      }
    },
    limit: 0
  })
  .then(facility => {
      if (!facility) {
        return res.status(404).send({
          message: 'Facility Not Found',
        });
      }
      console.log(facility.count);
      return res.status(200).send(facility);
    })
    .catch(error => res.status(400).send(error));
},

destroy(req, res) {
  return Facility
    .find({
        where: {
          id: req.params.facilityId,
          locationId: req.params.locationId,
        },
      })
    .then(Facility => {
      if (!Facility) {
        return res.status(404).send({
          message: 'Facility Not Found',
        });
      }

      return Facility
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};