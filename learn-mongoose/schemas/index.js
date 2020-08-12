const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose
      .connect(process.env.MONGO_URL, { dbName: "nodejs" })
      .then(() => {
        console.log("연결 성공");
      })
      .catch((e) => {
        console.log("연결 에러", e);
      });
  };
  connect();

  const db = mongoose.connection;

  db.on("disconnected", () => {
    console.log("연결이 끊겼습니다. 연결을 재시도 합니다.");
    connect();
  });
  db.on("error", (e) => {
    console.error("연결 에러", e);
  });

  require("./user");
  require("./comment");
};
