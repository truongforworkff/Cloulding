const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Đăng ký người dùng
exports.register = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, address, phone } = req.body;

        // Kiểm tra người dùng đã tồn tại
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã được đăng ký.' });
        }

        const user = new User({ username, email, password, firstName, lastName, address, phone });
        await user.save();

        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Đã xảy ra lỗi.' });
    }
};

// Đăng nhập
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác.' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token, message: 'Đăng nhập thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Đã xảy ra lỗi.' });
    }
};

// Logout (cơ bản là xóa token từ client)
exports.logout = (req, res) => {
    res.json({ token: null, message: 'Đã logout thành công!' });
};
