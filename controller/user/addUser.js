import User from '../../models/usersModel.js';
import bcrypt from 'bcryptjs';

export const addUser = async (req, res) => {
    try {
        const { firstName, middleName, lastName, email, password, role, confirmPassword, department } = req.body;
        if (!firstName || !lastName || !email || !password) {

            return res.status(400).json({ message: 'All mandatory fields must be filled' });
        } else {
            let checkRole = role != 'Admin' ? true : `Access Denied.User can add user only`
            let checkPassword = password == confirmPassword ? true : `Password should have 6 to 12 characters`
            if (password.length >= 6 && password.length <= 12 && checkPassword == true && checkRole == true) {
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
                        role,
                        department
                    });

                    await admin.save();
                    res.status(201).json({ message: 'Admin created successfully', admin });
                }
            } else {
                res.status(404).json({ message: `${checkPassword == true ? checkRole : checkPassword}` });

            }

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
