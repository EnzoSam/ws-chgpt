const Contact = require("../model/contact.model");
const MessageContants = require("../constants/message.constants");
const GlobalConstants = require("../constants/global.constants");

module.exports.getAll = getAll;
module.exports.save = save;
module.exports.update = update;
module.exports.get = get;
module.exports.deleteOne = deleteOne;
module.exports.verifyContact = verifyContact;
module.exports.verifyContact = verifyContact;

function getAll() {
  let prommise = new Promise((resolve, reject) => {
    try {
      Contact.find().then((data) => {
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
      Contact.findById(id).then((data) => {
        resolve(data);
      });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}

function getByRerence(_reference) {
  let prommise = new Promise((resolve, reject) => {
    try {
      Contact.find({ reference: _reference }).then((data) => {
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
      let Contact = new Contact();
      Contact.name = params.name;
      contact.reference = params.reference;
      contact.type = params.type;
      contact.business = params.business;
      contact.state = params.state;
      contact
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
      Contact.findOneAndUpdate(params._id, params)
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
      Contact.findOneAndDelete(id)
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

function verifyContact(reference, name) {
  let prommise = new Promise((resolve, reject) => {
    try {
      getByRerence(reference).then((data) => {
        if (data) {
          resolve(data);
          return;
        } else {
          let Contact = new Contact();
          Contact.name = name;
          contact.reference = reference;
          contact.type = MessageContants.types.Whatsapp;
          contact.business = undefined;
          contact.state = GlobalConstants.states.Active;
          save(contact)
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        }
      }).catch(ex=>{
        reject(ex);
      });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}
