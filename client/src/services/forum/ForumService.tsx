import axios from "../../utils/axios";

export default class ForumService {
  static deleteForumMemeber = async (
    forumName: string,
    studentID: string,
    userType: string
  ) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "forum/deleteMember",
        {
          forumName: forumName,
          studentID: studentID,
          userType: userType,
        }
      );
      const data = res.data;
      if (data.status === 1) {
        return "Member successfully deleted";
      } else {
        return data.response;
      }
    } catch (error) {
      return "Unable to delete the member!";
    }
  };
}
