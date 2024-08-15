import User from '../../models/usersModel.js';


export const viewUser = async (req, res) => {
    try {
        const id = req.body.id;
        const admin = await User.findById(id).select('-password');
        if (admin.role == 'admin') {
            res.status(404).json({ message: 'Access Denied, A User can view Users and himself' });
        } else {
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            } else {
                res.status(200).json({ admin });
            } 
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
