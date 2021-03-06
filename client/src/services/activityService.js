import axios from "axios";
import authenticationHeader from "./authenticationHeader";

const API_URL = "http://localhost:3000/activity";

class ActivityService {
     getOngoingActivities(userId = "") {
          return axios
               .get(`${API_URL}`, {
                    params: { uid: userId },
               })
               .then(
                    response => response.data.activities,
               );
     }
     
     getPastActivities() {
          return axios
               .get(`${API_URL}/past`, {
                    headers: authenticationHeader()
               });
     }

     getJoinedActivities(userId) {
          return axios
               .get(`${API_URL}/join`, {
                    params: { uid: userId }
               })
               .then(
                    response => response.data,
               );
     }

     createActivity(user, activity) {
          return axios
               .post(`${API_URL}`, {
                    name: activity.name,
                    description: activity.description,
                    activityDate: activity.activityDate,
                    maxParticipants: Number(activity.maxParticipants),
                    minParticipants: Number(activity. minParticipants),
                    type: activity.type
               }, {
                    params: { uid: user.id }
               });
     }

     joinActivity(userId, activityId) {
          return axios
               .post(`${API_URL}/join`,{
                    id: activityId
               }, {
                    params: { uid: userId }
               })
               .then(response => response)
               .catch(err => err.response);
     }

     updateActivity(userId, activityId, description) {
          return axios
               .put(`${API_URL}`, {
                    id: activityId,
                    description: description
               }, {
                    params: { uid: userId }
               })
               .then(response => response)
               .catch(err => err.response);
     }

     getPendingActivityRequest(userId, activityId) {
          return axios
               .get(`${API_URL}/pending`, {
                    params: { 
                         aid: activityId, 
                         uid: userId,
                    }
               })
               .then(response => response)
               .catch(err => err.response);
     }

     acceptActivityRequest(userId, requestUserId, requestActivityId) {
          return axios
               .post(`${API_URL}/accept`, {
                    userId: requestUserId,
                    activityId: requestActivityId
               }, {
                    params: { uid: userId }
               })
               .then(response => response)
               .catch(err => err.response);
     }

     rejectActivityRequest(userId, requestUserId, requestActivityId) {
          return axios
               .post(`${API_URL}/reject`, {
                    userId: requestUserId,
                    activityId: requestActivityId
               }, {
                    params: { uid: userId }
               })
               .then(response => response)
               .catch(err => err.response);
     }
}

export default new ActivityService();