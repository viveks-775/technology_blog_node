const db = require("../models");
const BlogPost = db.blogPosts;

// Create and Save a new BlogPost
exports.create = (req, res) => {
  console.log('res: ', res);
  console.log('req: ', req);
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a blogPost
  const blogPost = new BlogPost({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    content: req.body.content,
    tags: req.body.tags,
    published: req.body.published ? req.body.published : false,
    postImage: req.body.postImage,
    shortDescription: req.body.shortDescription
  });


  console.log('blogPost: ', blogPost)

  // Save blogPost in the database
  blogPost
    .save(blogPost)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the blogPost."
      });
    });

};

// Retrieve all BlogPosts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  BlogPost.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving BlogPosts."
      });
    });
};

// Find a single BlogPost with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  BlogPost.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found BlogPost with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving BlogPost with id=" + id });
    });
};

// Update a BlogPost by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  BlogPost.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update BlogPost with id=${id}. Maybe BlogPost was not found!`
        });
      } else res.send({ message: "BlogPost was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating BlogPost with id=" + id
      });
    });
};

// Delete a BlogPost with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  BlogPost.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete BlogPost with id=${id}. Maybe BlogPost was not found!`
        });
      } else {
        res.send({
          message: "BlogPost was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete BlogPost with id=" + id
      });
    });
};

// Delete all BlogPosts from the database.
exports.deleteAll = (req, res) => {
  BlogPost.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} BlogPosts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all BlogPosts."
      });
    });
};

// Find all published BlogPost
exports.findAllPublished = (req, res) => {
  BlogPost.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving BlogPosts."
      });
    });
};