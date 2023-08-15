module.exports = app => {
    const blogPosts = require("../controllers/blogPost.controller.js");
  
    var router = require("express").Router();
  
    // Create a new blogPost
    router.post("/", blogPosts.create);
  
    // Retrieve all blogPosts
    router.get("/", blogPosts.findAll);
  
    // Retrieve all published blogPosts
    router.get("/published", blogPosts.findAllPublished);
  
    // Retrieve a single blogPost with id
    router.get("/:id", blogPosts.findOne);
  
    // Update a blogPost with id
    router.put("/:id", blogPosts.update);
  
    // Delete a blogPost with id
    router.delete("/:id", blogPosts.delete);
  
    // Delete all blogPosts
    router.delete("/", blogPosts.deleteAll);
  
    app.use('/api/blogPosts', router);
  };