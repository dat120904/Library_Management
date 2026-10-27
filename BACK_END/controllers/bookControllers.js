const Book = require('../models/Book');

// Thêm sách mới
module.exports.createBook = async (req, res) => {
  const { MASACH, TENSACH, DONGIA, SOQUYEN, NHAXUATBAN, MANXB, TACGIA, LINKANH } = req.body;

  // Nếu SOQUYEN không có giá trị hoặc không phải là một số hợp lệ, gán mặc định là 1
  const quantity = SOQUYEN && !isNaN(SOQUYEN) && SOQUYEN > 0 ? Number(SOQUYEN) : 1;

  try {
    // Kiểm tra xem có sách nào đã tồn tại với MASACH này không
    const existingBook = await Book.findOne({ MASACH });
    if (existingBook) {
      return res.status(400).json({ message: 'Mã sách đã tồn tại trong cơ sở dữ liệu.' });
    }

    // Tạo sách mới nếu MASACH không trùng
    const newBook = new Book({
      MASACH,
      TENSACH,
      DONGIA: Number(DONGIA) || 0,
      SOQUYEN: quantity,
      NHAXUATBAN,
      MANXB,
      TACGIA,
      LINKANH: LINKANH || ''
    });

    // Lưu sách vào MongoDB trong bộ sưu tập 'SACH'
    await newBook.save();

    // Trả về phản hồi thành công
    res.status(201).json({ message: 'Sách đã được tạo thành công!', book: newBook });
  } catch (err) {
    console.error('Lỗi khi lưu sách:', err);
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả sách
module.exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books || []);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách:', err.message);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy sách.', error: err.message });
  }
};
// Tìm sách
module.exports.findOne = async (query) => {
  return await Book.findOne(query);
}
// Kiểm tra mã sách
module.exports.checkBookCode = async (req, res) => {
  try {
    const book = await Book.findOne({ MASACH: req.params.MASACH });
    if (!book) {
      return res.status(404).json({ message: 'Sách không tồn tại!' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tìm kiếm sách!' });
  }
}
// API để lấy thông tin sách theo MASACH
module.exports.getBookID = async (req, res) => {
  const { MASACH } = req.params;  // Lấy MASACH từ params

  try {
    const book = await Book.findOne({ MASACH });

    if (!book) {
      return res.status(404).json({ message: `Không tìm thấy sách với mã ${MASACH}` });
    }

    // Trả về thông tin sách
    res.json(book);
  } catch (error) {
    console.error('Lỗi khi lấy thông tin sách:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin sách.' });
  }
};
//Cập nhật số lượng sách khi từ chối/trả
module.exports.updateBookStock = async (req, res) => {
  const { MASACH } = req.params;  // Lấy MASACH từ URL

  try {
    const updatedBook = await Book.findOneAndUpdate(
      { MASACH },
      { $inc: { SOQUYEN: 1 } },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Sách không tìm thấy' });
    }

    return res.json({ message: 'Cập nhật số lượng sách thành công', book: updatedBook });
  } catch (error) {
    console.error('Lỗi khi cập nhật số lượng sách:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật số lượng sách.', error: error.message });
  }
};

// API cập nhật số lượng sách theo ID nhập từ nhân viên
module.exports.enterQuantity = async (req, res) => {
  try {
    const { additionalQuantity } = req.body;
    const book = await Book.findOne({ MASACH: req.params.id });

    if (!book) return res.status(404).json({ message: 'Sách không tồn tại' });

    const newQuantity = book.SOQUYEN + additionalQuantity;

    // Nếu số lượng sau khi cập nhật < 0 thì báo lỗi
    if (newQuantity < 0) {
      return res.status(400).json({ message: 'Số lượng sách không thể là số âm!' });
    }

    book.SOQUYEN = newQuantity;
    await book.save();

    res.json({ message: 'Cập nhật thành công', updatedBook: book });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};
