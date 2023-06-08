const Paragraph = require("../model/paragraph.model");

module.exports.getAll = getAll;
module.exports.save = save;
module.exports.update = update;
module.exports.get = get;
module.exports.deleteOne = deleteOne;
module.exports.getByModel = getByModel;

function getAll() {
  let prommise = new Promise((resolve, reject) => {
    try {
      Paragraph.find().then((data) => {
        resolve(data);
      });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}


function get(id) {
  let prommise = new Promise((resolve, reject) => {
    try {
      Paragraph.findById(id).then((data) => {
        resolve(data);
      });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}

function getByModel(_model) {
  let prommise = new Promise((resolve, reject) => {
    try {

      
      Paragraph.find({model: _model}).exec().then((data) => {
        console.log('parrafos = ' + data.length);
        resolve(data);
      });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}

function save(params) {
  let prommise = new Promise((resolve, reject) => {
    try {
      let paragraph = new Paragraph();
      paragraph.name = params.name;
      paragraph.state = params.state;
      paragraph.version = params.version;
      paragraph
        .save()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}

function update(params) {
  let prommise = new Promise((resolve, reject) => {
    try {
      Paragraph.findOneAndUpdate(params._id, params)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}

function deleteOne(id) {
  let prommise = new Promise((resolve, reject) => {
    try {
      Paragraph.findOneAndDelete(id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}
