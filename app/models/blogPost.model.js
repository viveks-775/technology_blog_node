module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      category: String,
      author: String,
      tags: {
        type: [String]
      },
      content: String,
      shortDescription: String,
      createdAt: { type: Date, default: Date.now },
      postImage: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const blogPost = mongoose.model("blogPost", schema);
  return blogPost;
};