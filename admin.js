// createAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/userModel'); // Đảm bảo đúng đường dẫn tới file model

// Kết nối MongoDB
mongoose.connect('mongodb+srv://truongtdgch210108:dPXJYQbZnI1YzPoZ@cluster0.tlk3lpk.mongodb.net/Toy_Back', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Hàm tạo người dùng admin mới
const createAdminUser = async () => {
  try {
    // Kiểm tra nếu người dùng admin đã tồn tại
    const adminExists = await User.findOne({ username: 'admin3' });
    if (adminExists) {
      console.log('Admin already exists!');
      return;
    }

    // Tạo đối tượng người dùng admin
    const newAdmin = new User({
      username: 'admin3',
      email: 'admin3@example.com',
      password: 'admin',  // Mật khẩu gốc sẽ được mã hóa
      role: 'admin'
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newAdmin.save();
    console.log('Admin user created successfully!');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Gọi hàm tạo admin
createAdminUser();
