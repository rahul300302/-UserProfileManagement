import User from '../../models/usersModel.js';


export const updateUser = async (req, res) => {
    try {
        const id = req.body.id;
        const updates = req.body;
        updates.updatedTime = new Date();
        const value = await User.findById(id).select('role');
        if (value.role == 'admin') {
            res.status(404).json({ message: 'Access Denied, A User can edit users and himself' });
        } else {
            const admin = await User.findByIdAndUpdate(id, updates, { new: true });

            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            } else {
                res.status(200).json({ message: 'Admin updated successfully', admin });
            }
        }
    } catch (error) {
        console.log(error); 
        res.status(500).json({ message: error.message });
    }
};
