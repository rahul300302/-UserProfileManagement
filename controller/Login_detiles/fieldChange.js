import { FieldChange } from '../../models/usersModel.js';

export const logFieldChanges = async (req) => {
    const { fieldOldValue, fieldNewValue } = req;
    const userId = req.id;
    const username = req.username;
    try {
        const fieldChange = new FieldChange({
            userId,
            username,
            fieldOldValue,
            fieldNewValue,
        });
        await fieldChange.save();
        console.log('Field change logged successfully.');
        req.socket.emit('response', { message: 'Field change logged successfully.' });
    } catch (error) {
        req.socket.emit('response', { message: 'Failed to log field change.', error });
    }
};
