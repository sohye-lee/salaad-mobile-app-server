import express from 'express';
import { getMenus, getMenu, createMenu, updateMenu, deleteMenu, likeMenu,
         getComments, createComment, updateComment, deleteComment  } from '../controllers/controllers.js';

const router = express.Router();

router.get('/', getMenus);
router.post('/', createMenu);
router.post('/:id', getMenu);
router.patch('/:id', updateMenu);
router.delete('/:id', deleteMenu);
router.patch('/:id/like', likeMenu);
router.post('/:id', getComments);
router.post('/:id/post_id', createComment);
router.patch('/:id/post_id', updateComment)
router.delete('/:id/post_id', deleteComment)


export default router;