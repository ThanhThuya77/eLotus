const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(
      'mongodb+srv://thuyadmin:gaucon01@cluster0.jeiip94.mongodb.net/eLotus?retryWrites=true&w=majority'
    );
    console.log('connect successfully!!');
  } catch (error) {
    console.log('connect failure!!');
  }
}

module.exports = { connect };
