const meetingServices = require('../services/meeting.service');

exports.startMeeting = (req, res, next) => {
    // console.log('request');
    const { hostId, hostName } = req.body;

    var model = {
        hostId: hostId,
        hostName: hostName,
        startTime: Date.now()
    };

    meetingServices.startMeeting(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Success',
            data: results.id,
        });
    })
}

exports.checkMeetingExisits = (req, res, next) => {
    const { meeting, meetingId } = req.query;
    // console.log(meeting);

    meetingServices.checkMeetingExisits(meetingId, (error, results) => {
        if (error) return next(error);
        return res.status(200).send({
            message: 'Success',
            data: results,
        });
    })
}

exports.getAllMeetingUsers = (req, res, next) => {
    const { meetingId } = req.query;
    meetingServices.getAllMeetingUsers(meetingId, (error, results) => {
        if (error) return next(error);
        return res.status(200).send({
            message: 'Success',
            data: results,
        });
    })
}
exports.updateMeetingUser = (req,res,next)=>{
    const {userId} = req.body;
    meetingServices.updateMeetingUser(userId,(error,results) =>{
        if(error) return next(error);
        return res.status(200).send({
            message: 'Success',
            data: results,
        });
    })
}