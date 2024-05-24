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
        })
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
        })
    }
}

const updateEvent = async(req, res = response) => {
    try {        

        res.json({
            ok: true,
            msg: 'updateEvent'
        });

    } catch (error) {
        // console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'An error occurred, please try again later'
        })
    }
}

const deleteEvent = async(req, res = response) => {
    try {        

        res.json({
            ok: true,
            msg: 'deleteEvent'
        });

    } catch (error) {
        // console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'An error occurred, please try again later'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}