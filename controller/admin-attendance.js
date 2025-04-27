const AdminAttendance = require('../models/adminAttendance');
const error = require('../utils/error');
const {addMinutes, isAfter} = require('date-fns');




const getEnable = async (req, res, next) => {

    try{

        const running = await AdminAttendance.findOne({status: 'RUNNING'});

        if(running) throw error('already running', 400);
        

        const attendance = new AdminAttendance({});
        await attendance.save();

       

        return res.status(201).json({message: 'success', attendance});


    } catch(e){

        console.log('which is the right admin');

        next(e);
    }

};


const getRunning = async (req, res, next) => {

    try{

        
        const running = await AdminAttendance.findOne({status: 'RUNNING'});

        if(!running) throw error('Not running', 400);


        const started = addMinutes(new Date(running.createdAt), running.timeLimit);

        if(isAfter(new Date(), started)){

            running.status = 'COMPLETED';

            await running.save();

        }

        return res.status(200).json(running);


    } catch(e){

        next(e);
    }

};




const getDisable = async (req, res, next) => {


    try{

        const running = await AdminAttendance.findOne({status: 'RUNNING'});

       if(!running) throw error('Not running', 400);

       running.status = 'COMPLETED';
       await running.save();

    
         return res.status(200).json(running);

    } catch(e){

        next(e);
    }



};





module.exports = {

    getEnable,
    getDisable,
    getRunning,

};
