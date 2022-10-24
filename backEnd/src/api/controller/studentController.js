import { forumData as Forums } from "../../models/forums.js";

export const addCommnet = async (req, res, next) => {
  const id = req.params.id;
  const comment = req.body.comments;
  if (!id) return res.status(422).send({ message: "Invalid ForumId" });

  const forum = await Forums.findById(id);
  const verifyUpdate = await forum.updateOne({ $push: { "comments" : comment} });
  await forum.save();

  if (verifyUpdate.nModified !== 0) {
    return res.status(200).send({
      message: "Comment Updated",
    });
  } else {
    res.status(404).send({
      message: "Comment update failed ",
    });
  }
};
