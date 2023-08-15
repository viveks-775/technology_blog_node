module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        createdAt:{type:Date, default:Date.now}
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const category = mongoose.model("category", schema);
    return category;
  };