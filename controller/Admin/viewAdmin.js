import User from '../../models/usersModel.js';


export const viewAdmin = async (req, res) => {
    try {
        const id = req.body.id;
        const admin = await User.findById(id).select('-password');

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        } else {
            res.status(200).json({ admin });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 