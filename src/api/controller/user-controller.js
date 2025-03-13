import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    try {
      await user.save();

    } catch (err) {
      console.log(err);
    }
    const payload = {
      user: {
        id: user?._id,
      },
    };  

    const secret = process.env.JWT_SECRET || "e8d4a6f1c3b27e89fa54d10b67c2e35f9a1b4c8d2e7f3a69b5c0d8f2a4e6b7d1";

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    const secret = process.env.JWT_SECRET || "e8d4a6f1c3b27e89fa54d10b67c2e35f9a1b4c8d2e7f3a69b5c0d8f2a4e6b7d1";
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};