import mongoose from 'mongoose';


const commentSchema = mongoose.Schema({
    author: String,
    menuId: Number,
    rating: Number,
    comment: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    location: String,
})

const CommentModel = mongoose.model('CommentModel', commentSchema);

export default CommentModel;