import User from '../../models/usersModel.js';
import bcrypt from 'bcryptjs';

export const addAdmin = async (req, res) => {
    try {
        const { firstName, middleName, lastName, email, password, confirmPassword, department } = req.body;
        if (!firstName || !lastName || !email || !password) {

            return res.status(400).json({ message: 'All mandatory fields must be filled' });
        } else {
            let checkPassword = password == confirmPassword ? true : false
            if (password.length >= 6 && password.length <= 12 && checkPassword == true) {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ message: 'Email already exists' });
                } else {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    const admin = new User({
                        firstName,
                        middleName,
                        lastName,
                        email,
                        password: hashedPassword,
                        role: 'Admin',
                        department
                    });

                    await admin.save();
                    res.status(201).json({ message: 'Admin created successfully', admin });
                }
            } else {
                res.status(404).json({ message: 'Password should have 6 to 12 characters.' });

            }

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
