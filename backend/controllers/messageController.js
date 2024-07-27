const Message = require('../models/Message.js');

exports.saveMessage = async (sender, receiver, message) => {
    const newMessage = new Message({ sender, receiver, message });
    await newMessage.save();
};
