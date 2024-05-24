const { response } = require('express');

const Event = require('../models/Event');

const getEvents = async(req, res = response) => {
    try {        
        const events = await Event.find().populate('user', 'name');

        res.json({
            ok: true,
            events
        });

    } catch (error) {
        // console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'An error occurred, please try again later'
        });
    }
}

const createEvent = async(req, res = response) => {
    try {        
        const event = new Event(req.body);

        event.user = req.uid;
        await event.save();

        res.json({
            ok: true,
            event
        });

    } catch (error) {
        // console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'An error occurred, please try again later'
        });
    }
}

const updateEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {        
        const event = await Event.findById(eventId);

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No edit permissions'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        };

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.json({
            ok: true,
            updatedEvent
        });

    } catch (error) {
        // console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'An error occurred, please try again later'
        });
    }
}

const deleteEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {        
        const event = await Event.findById(eventId);

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No delete permissions'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        };

        await Event.findByIdAndDelete(eventId, newEvent, { new: true });

        res.json({
            ok: true,
        });

    } catch (error) {
        // console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'An error occurred, please try again later'
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}