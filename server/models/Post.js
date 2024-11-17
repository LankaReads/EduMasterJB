const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
    links: { type: [String], default: [] } // Array of links
});

module.exports = mongoose.model('Post', postSchema);
