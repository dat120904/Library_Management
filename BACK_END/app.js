const cors = require("cors");
const connectDB = require("./config/database"); // Kết nối MongoDB
const express = require("express");
const http = require("http"); // Import http để tạo server
const { Server } = require("socket.io"); // Import socket.io
const bodyParser = require("body-parser");
const gtts = require("gtts");
const multer = require("multer");


// Import các route
const bookRoutes = require("./routes/bookRoutes");
const readerRoutes = require("./routes/readerRoutes");
const staffRoutes = require("./routes/staffRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const publisherRoutes = require("./routes/publisherRoutes");
const borrowerDetailsRoutes = require("./routes/Borrower_details");

// Kết nối database
connectDB();

const app = express();
const server = http.createServer(app); // Tạo server HTTP từ Express app

// Middleware xử lý body request
app.use(express.json()); // Dành cho JSON
app.use(express.urlencoded({ extended: true })); // Dành cho form data

// Cấu hình CORS để kết nối với frontend Vue.js
app.use(
  cors({
    origin: "http://localhost:8080", // Chỉ định cổng Vue.js
    credentials: true,
  })
);

// Khai báo các API routes
app.use("/api/books", bookRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/reader", readerRoutes);
app.use("/api/publisher", publisherRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api", borrowerDetailsRoutes);
app.use('/api/readers', readerRoutes);


// Chạy server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
