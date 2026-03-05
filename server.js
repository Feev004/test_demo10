const express = require("express");
const app = express();
const multer = require("multer");
const pool = require("./DB");
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static("images")); 

app.get("/api/student", async (req, res) => {
  try {
    const sql =
      `SELECT student.image_url, student.id, student.firstname, student.lastname , student.age, class.name as year_ FROM student JOIN class ON student.class_id = class.id;`
    const [products] = await pool.query(sql);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// const storage = multer.diskStorage({
//   destination: "./images/",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

function render(request, response) {
  let url = request.url;
  url = url.endsWith("/") ? url : url + "/";
  let fileName = "/";
  switch (url) {
    case "/":
      fileName += "index.html";
      break;
  }
  response.sendFile(__dirname + "/" + fileName);
}

app.get("/", render);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
