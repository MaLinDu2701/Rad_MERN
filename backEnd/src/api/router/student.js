import express from "express";

const router = express();

import {addCommnet} from '../controller/studentController.js'


router.post('/student/comment');
router.put('/forum/comment/:id', addCommnet);
router.put('/student/forum/id');
router.delete('/student/comment/id');


export {router}

