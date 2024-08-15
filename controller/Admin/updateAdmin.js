import User from '../../models/usersModel.js';


export const updateAdmin = async (req, res) => {
    try {
        const id = req.body.id;
        const updates = req.body;
        updates.updatedTime = new Date();

        const admin = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        } else {
            res.status(200).json({ message: 'Admin updated successfully', admin });
        }
    } catch (error) { 
        res.status(500).json({ message: error.message });
    }
};
