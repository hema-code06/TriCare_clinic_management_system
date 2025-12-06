import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
    assetName: {
        type: String,
        required: true,
    },
    technician: {
        type: String,
        required: true,
    },
    maintenanceType: {
        type: String,
        enum: ['routine', 'emergency', 'repair'],
        required: true,
    },
    scheduledDate: {
        type: Date,
        required: true,
    },
    maintenanceFrequency: {
        type: String,
        enum: ['weekly', 'monthly', 'quarterly'],
        required: true,
    },
    status: {
        type: String,
        enum: ['scheduled', 'in-progress', 'completed'],
        default: 'scheduled',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

export default Maintenance;
