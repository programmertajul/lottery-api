const StudentAttendance = require('../models/StudentAttendance');
const AdminAttendance = require('../models/adminAttendance');
const error = require('../utils/error');
const {addMinutes, isAfter} = require('date-fns');






const getAttendance = async (req, res, next) => {

    const {id} = req.params;


    try{

        const admiAttendance = await AdminAttendance.findById(id);

        if(!admiAttendance) throw error('Invalid Attendance Id', 400);


        if(admiAttendance.status === 'COMPLETED'){

            throw error('admin attendance already completed', 400);

        }

        
        const attendance = new StudentAttendance({

            user: req.user._id,
            admiAttendance: id,
        });

        await attendance.save();

        return res.status(201).json(attendance);


    

    } catch(e){

        next(e);
    }

    
};

const getAttendanceStatus = async (req, res, next) => {

 try{

    console.log('i am not getting get attendance ststus');

        
        const running = await AdminAttendance.findOne({status: 'RUNNING'});

        if(!running) throw error('Not running', 400);


        const started = addMinutes(new Date(running.createdAt), running.timeLimit);

        if(isAfter(new Date(), started)){

            running.status = 'COMPLETED';

            await running.save();

        };

        return res.status(200).json(running);


    } catch(e){

        next(e);
    }
    
};



module.exports = {

    getAttendance,
    getAttendanceStatus,

};




