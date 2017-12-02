
export class API{
  static VM: string="http://fa17-cs411-44.cs.illinois.edu";
  static QUESTION: number=0;
  static ANSWER: number=1;
  static UNFOLLOW: number=1;
  static FOLLOW: number=0;
  static postType_all: number=2;
  static actionType_post: number=0;
  static actionType_up: number=1;
  static actionType_down: number=2;
  static actionType_all: number=3;
  static getqID: string="/utilities/getqIDfromaID/"
  static getUserTimeline: string="/utilities/userUpdateRandom/";
  static displayQuestionAnswers: string= "/utilities/displayQuestionAnswers/"
  static postQuestion: string="/utilities/post/postQuestion/";
  static postAnswer: string ="/utilities/post/postAnswer/";
  static deleteQuestionAnswer: string="/utilities/post/deletePost/"
  static getVotedStatus: string="/utilities/post/vote/checkList";
  static updateVotedStatus: string="/utilities/post/vote/";
  static checkFollowings: string="/utilities/user/followings/";
  static checkFollowers: string="/utilities/user/followers/";
  static getFollowingStatus: string="/utilities/user/following/checkList";
  static getUserStatus: string="/utilities/user/status/";
  static getActivities: string="/utilities/user/filteredTimeline/";
  static getFollowingAcitivites: string="/utilities/user/following/timeline/";
  static updateUserInfo: string="/utilities/user/updateUserInfo/";
  static updateFollowers: string="/utilities/user/updateFollowers/";
  static signUp: string="/utilities/user/signUp";
  static login: string="/utilities/user/login";
  static forgetPassword: string="utilities/user/forgetPassword";
  //static userID:string="1710730";
  static userID:string="1710728";
  //static userID:string="13";
}
