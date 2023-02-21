const Post = require("./posts-model");
exports.getPost = (req, res, next) => {
  console.log(2);
  Post.find()
    .then((r) => res.status(200).json(r))
    .catch((err) => res.status(500).json({ message: "Gönderiler alınamadı" }));
};
exports.findPost = (req, res, next) => {
  const { id } = req.params;
  Post.findById(id)
    .then((r) => {
      if (r) {
        return res.status(200).json(r);
      }
      return res.status(404).json({ message: "Gönderiler alınamadı" });
    })
    .catch((err) => res.status(500).json({ message: "Gönderiler alınamadı" }));
};

exports.addPost = (req, res, next) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(400).json({
      message: "Lütfen gönderi için bir title ve contents sağlayın",
    });
  }
  return Post.insert({ title, contents })
    .then((r) => res.status(201).json(r))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Veritabanına kaydedilirken bir hata oluştu" })
    );
};
exports.changePost = (req, res, next) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  Post.update(id, { title, contents }).then((re) =>
    Post.findById(id)
      .then((r) => {
        if (!r) {
          return res
            .status(404)
            .json({ message: "Belirtilen ID'li gönderi bulunamadı" });
        }
        if (!title || !contents) {
          return res.status(400).json({
            message: "Lütfen gönderi için title ve contents sağlayın",
          });
        }
        return res.status(200).json(re);
      })
      .catch((err) =>
        res.status(500).json({ message: "Gönderi bilgileri güncellenemedi" })
      )
  );
};
exports.deletePost = (req, res, next) => {
  const { id } = req.params;

  Post.remove(id).then((r) => {
    if (!r) {
      return res
        .status(404)
        .json({ message: "Belirtilen ID li gönderi bulunamadı" });
    }
    return res.status(200).json({ message: "success" });
  });
};
exports.getComment = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then((r) => {
      if (r) {
        return res.status(200).json(r.contents);
      }
      return res
        .status(404)
        .json({ message: "Girilen ID'li gönderi bulunamadı." });
    })
    .catch((err) =>
      res.status(500).json({ message: "Yorumlar bilgisi getirilemedi" })
    );
};
