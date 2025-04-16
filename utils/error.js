 function error(msg='something went wrong', status=500){
    const e = new Error(msg);
    console.log('i am error', e.message);
    e.status = status;
    console.log('i am error status', e.status);
    return e;
}



module.exports = error;
