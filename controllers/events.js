const { response } = require('express');

const getEvents = async(req, res = response) => {
    try {        

        res.json({
            ok: true,
            msg: 'getEvents'
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

        res.json({
            ok: true,
            msg: 'createEvent'
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