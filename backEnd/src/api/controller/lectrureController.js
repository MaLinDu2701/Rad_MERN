import { forumData as Forums } from "../../models/forums.js";

export const createForum = async (req, res, next) => {
  const forumData = req.body;

  if (forumData.forumName) {
    const forum = new Forums();
    forum.set(forumData);
    const verifySave = await forum.save();

    if (verifySave.forumName === forumData.forumName) {
      res.status(200).send({
        message: "Forum Created",
      });
    } else {
      res.satus(422).send({
        message: "Forum Not Created! lz try again",
      });
    }
  } else {
    res.status(422).send({
      message: "Invalid input Forum data!",
    });
  }
};

export const viewForums = async (req, res, next) => {
    const forum = await Forums.find();
    if (forum) {
      res.status(200).send(forum);
    } else {
      res.status(404).send({
        message: "Not Found",
      });
    }
  };
  
  export const viewForum = async (req, res, next) => {
    const id = req.params.id;
    if (!id) return res.status(422).send({ message: "Forum is missing" });
  
    const forum = await Forums.findById(id);
    if (forum) {
      res.status(200).send(forum);
    } else {
      res.status(404).send({
        message: "Forum not found",
      });
    }
  };
  
  export const editUser = async (req, res, next) => {
    const id = req.params.id;
    const forumData = req.body;
    if (!id) return res.status(422).send({ message: "forum is missing" });
  
    const forum = await Forums.findById(id);
    if (forum) {
      const verifyUpdate = await forum.updateOne(forumData);
      if (verifyUpdate.nModified !== 0) {
        return res.status(200).send({
          message: "Forum Details Updated",
        });
      }
    } else {
      res.status(404).send({
        message: "Forum not found",
      });
    }
  };
  
  export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    if (!id) return res.status(422).send({ message: "Forum ID is missing" });
  
    const forum = await Forums.deleteOne({ _id: id });
    if (forum.deletedCount !== 0) {
      res.status(200).send({
        message: "forum Deleted",
      });
    } else {
      res.status(500).send({
        message: "forum not deleted! Plz try again later",
      });
    }
  };
