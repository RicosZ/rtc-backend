const { meeting } = require('../models/meeting.model');
const { meetingUser } = require('../models/meeting-user.model');

async function getAllMeetingUser(meetId, callback) {
    meetingUser.find({ meetingId: meetId }).then((response) => {
        return callback(null, response);
    }).catch((error) => callback(error));
}

async function startMeeting(params, callback) {
    const meetingSchema = new meeting(params);

    meetingSchema.save().then(async (response) => {
        return callback(null, response);
    }).catch((error) => callback(error));
}

async function joinMeeting(params, callback) {
    const meetingUserModel = new meetingUser(params);

    meetingUserModel.save(), then(async (response) => {
        await meeting.findOneAndUpdate({ id: params.meetingId }, { $addToSet: { "meetingUsers": meetingUserModel } })
        return callback(null, response);
    }).catch((error) => callback(error));
}

async function isMeetingPresent(meetingId, callback) {
    meeting.findById(meetingId)
        .populate("meetingUser", "MeetingUser").then((response) => {
            if (!response) callback('Invalid Meeting Id');
            else callback(null, true);
        }).catch((error) => callback(error, false));
}

async function checkMeetingExisits(meetingId, callback) {
    meeting.findById(meetingId)
        .populate("meetingUser", "MeetingUser").then((response) => {
            if (!response) callback('Invalid Meeting Id');
            else callback(null, response);
        }).catch((error) => callback(error, false));
}

async function getMeetingUser(params, callback) {
    const { meetingId, userId } = params;

    meetingUser.find({ meetingId, userId })
        .then((response) => {
            return callback(null, response[0])
        }).catch((error) => callback(error));
}

async function updateMeetingUser(params, callback) {
    meetingUser.updateOne({ userId: params.userId }, { $set: params }, { new: true })
        .then((response) => {
            return callback(null, response);
        }).catch((error) => callback(error));
}

async function getUserBySocketId(params, callback) {
    const { meetingId, socketId } = params;

    meetindUser.find({ meetingId, socketId })
        .limit(1)
        .then((response) => {
            return callback(null, response);
        }).catch((error) => callback(error));
}

module.exports = {
    startMeeting,
    joinMeeting,
    getAllMeetingUser,
    isMeetingPresent,
    checkMeetingExisits,
    getMeetingUser,
    updateMeetingUser,
    getUserBySocketId
}