import mongoose from 'mongoose';

const menuSchema = mongoose.Schema({
    title: String,
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

const MenuModel = mongoose.model('MenuModel', menuSchema);

export default MenuModel;