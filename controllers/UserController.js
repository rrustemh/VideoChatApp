exports.getVideo = (req, res, next) => {
  res.render("video", {
    title: "Video Sesioni",
    fullName: req.query.fullName || "Demo",
  });
};
