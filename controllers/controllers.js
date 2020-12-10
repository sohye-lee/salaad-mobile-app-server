import mongoose from 'mongoose';
import MenuModel  from '../models/MenuModel.js';
import CommentModel from '../models/CommentModel.js';

export const getMenus = async (req, res) => {
    try {
        const menus = await MenuModel.find();
        res.status(200).json(menus)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getMenu = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await MenuModel.findById(id);
        res.status(202).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMenu = async (req, res) => {
    const menu = req.body;
    const newMenu = new MenuModel(menu);

    try {
        await newMenu.save()
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateMenu = async (req, res) => {
    const id = req.params.id;
    const { name, image, featured, ingredients, calories, type } = req.body;

    if (! mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Can\'t find the post you requested');
    };

    const updatedMenu = { name, image, featured, ingredients, calories, type, _id:id };

    await MenuModel.findByIdAndUpdate(id, updatedMenu, { new: true });
    res.json(updatedMenu);
}

export const deleteMenu = async (req, res) => {
    const id = req.params.id;

    if (! mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Can\'t find the menu you requested to delete');
    };

    await MenuModel.findByIdAndRemove(id);
    res.json({ message: 'Post successfully deleted'});
}

export const getComments = async (req, res) => {
    const id = req.params.id;

    try {
        const comments = await (await MenuModel.find()).filter(comment => comment.menuId === id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(404).json(error);
    }
}

export const createComment = async (req, res) => {
    const post = req.body;
    const newComment = new CommentModel(post);
    
    try {
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(409).json(error);
    }
}

export const updateComment = async (req, res) => {
    const id = req.params.post_id;
    const { name, image, featured, ingredients, calories, type } = req.body;

    if (! mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Can\'t find the post you requested');
    };

    const updatedComment = { name, image, featured, ingredients, calories, type, _id:id };

    await MenuModel.findByIdAndUpdate(id, updatedComment, { new: true });
    res.json(updatedComment);
}

export const deleteComment = async (req, res) => {
    const id = req.params.post_id;
    
    if (! mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Can\'t find the menu you requested to delete');
    };

    await MenuModel.findByIdAndRemove(id);
    res.json({ message: 'Post successfully deleted'});
}

export const likeMenu = async (req, res) => {
    const id = req.params.id;

    if (! mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`Can\'t find the menu you requested to like`);
    }

    const menu = await MenuModel.findById(id);
    const updatedMenu = await MenuModel.findByIdAndUpdate(id, { likeCount: menu.likeCount + 1 }, { new: true });

    res.json(updatedMenu);
}