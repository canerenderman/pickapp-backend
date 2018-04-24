const Location = require('../models').Location;
const Facility = require('../models').Facility;

module.exports = {
  create(req, res) {
    return Location
      .create({
        title: req.body.title,
      })
      .then(location => res.status(201).send(location))
      .catch(err => {
    console.error("Post request error", err);
  });
  },
  list(req, res) {
  return Location
    .findAll({
      include: [{
        model: Facility,
        as: 'facilities',
      }]
    })
    .then(locations => res.status(200).send(locations))
    .catch(error => res.status(400).send(error));
},
retrieve(req, res) {
  return Location
    .findById(req.params.locationId, {
      include: [{
        model: Facility,
        as: 'facilities',
      }]
    })
    .then(location => {
      if (!location) {
        return res.status(404).send({
          message: 'Location Not Found',
        });
      }
      return res.status(200).send(location);
    })
    .catch(error => res.status(400).send(error));
},
update(req, res) {
  return Location
    .findById(req.params.locationId, {
      include: [{
        model: Facility,
        as: 'facilities',
      }],
    })
    .then(location => {
      if (!location) {
        return res.status(404).send({
          message: 'Location Not Found',
        });
      }
      return location
        .update({
          title: req.body.title || location.title,
        })
        .then(() => res.status(200).send(location))  // Send back the updated location.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
},
destroy(req, res) {
  return Location
    .findById(req.params.locationId)
    .then(location => {
      if (!location) {
        return res.status(400).send({
          message: 'Location Not Found',
        });
      }
      return location
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};
