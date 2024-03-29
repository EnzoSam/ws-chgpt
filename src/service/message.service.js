const Message = require("../model/message.model");
const MessageContants = require("../constants/message.constants");
const ContactService = require("../service/contact.service");
const WhatsappService = require("../service/wsService.service");

module.exports.getAll = getAll;
module.exports.save = save;
module.exports.update = update;
module.exports.get = get;
module.exports.deleteOne = deleteOne;
module.exports.saveMessage = saveMessage;
module.exports.getContactMessages = getContactMessages;
module.exports.send = send;

function getAll() {
  let prommise = new Promise((resolve, reject) => {
    try {
      Message.find().then((data) => {
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
      Message.findById(id).then((data) => {
        resolve(data);
      });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}

function getContactMessages(contactId) {
  let prommise = new Promise((resolve, reject) => {
    try {      
      ContactService.get(contactId)
        .then((_contact) => {

          let query =Message.find();
          query = query.or([{from:_contact}, {to:_contact}]);
          query = query.sort({date:'desc'});
          query = query.limit(10);
          query = query.populate('from');
          query = query.populate('to');
          query.exec().then((data) => {
            data.sort((a, b) => a.date - b.date);
            resolve(data);
          });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
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
      let message = new Message();
      message.text = params.text;
      message.date = params.date;
      message.from = params.from;
      message.to = params.to;
      message.role = params.role;
      message.type = params.type;
      message.referenceId = params.referenceId;
      message
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
      Message.findOneAndUpdate(params._id, params)
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
      Message.findOneAndDelete(id)
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

function saveMessage(text, contactFrom, contactTo, role, referenceId) {
  let prommise = new Promise((resolve, reject) => {
    try {
      let message = new Message();
      message.text = text;
      message.date = Date.now();
      message.from = contactFrom;
      message.to = contactTo;
      message.role = role;
      message.type = MessageContants.types.Whatsapp;
      message.referenceId = referenceId;
      save(message)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}

function send(params) {
  let prommise = new Promise((resolve, reject) => {
    try {
      WhatsappService.sendTextMessage(params.text, 
        params.to.reference, params.to.name)
        .then(data => {
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
          
        });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}
