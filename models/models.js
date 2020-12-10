import mongoose from 'mongoose';

const menuSchema = mongoose.Schema({
    name: String,
    image: String,
    featured: Boolean,
    ingredients: [String],
    calories: Number,
    type: String,
    likeCount: {
        type: Number,
        default: 0
    }
});

export const MenuModel = mongoose.model('MenuModel', menuSchema);



const commentSchema = mongoose.Schema({
    author: String,
    menuId: Number,
    rating: Number,
    comment: String,
    written: new Date(),
    location: String,
})

export const CommentModel = mongoose.model('CommentModel', commentSchema);