const mongoose = require('mongoose');
const Estate = require('../models/estate.js');

exports.getEstate = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 5;
        const start = (Number(page) - 1) * LIMIT;
        const total = await Estate.countDocuments();

        const data = await Estate.find()
            .sort({ _id: -1 })
            .limit(LIMIT)
            .skip(start);

        res.status(200).json({
            data: data,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT),
        });
    } catch (error) {
        res.send({ message: error });
    }
};

exports.getEstateBySearch = async (req, res) => {
    const { t: type } = req.query;

    try {
        const estates = await Estate.find({ type });
        res.status(200).json(estates);
    } catch (error) {}
};

exports.createEstate = async (req, res) => {
    const estate = req.body;
    const newEstate = new Estate(estate);

    try {
        await newEstate.save();
        res.status(201).json(newEstate);
    } catch (error) {
        res.send({ message: error });
    }
};

exports.updateEstate = async (req, res) => {
    const { id } = req.params;
    const estate = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.send({ message: 'Unvalid Id' });
        const updatedEstate = await Estate.findByIdAndUpdate(id, estate, {
            new: true,
        });
        res.status(200).json(updatedEstate);
    } catch (error) {
        res.send({ message: 'Server error' });
    }
};

exports.deleteEstate = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.send({ message: 'Unvalid Id' });
        await Estate.findByIdAndRemove(id);
        res.status(200).send({ message: 'Estate successfully removed' });
    } catch (error) {
        res.send({ message: 'Server error' });
    }
};
