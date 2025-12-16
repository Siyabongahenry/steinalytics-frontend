import * as AmplifyModules from "aws-amplify";
import awsconfig from "../aws-exports";

AmplifyModules.Amplify.configure(awsconfig);

export const Auth = AmplifyModules.Auth;
export default AmplifyModules;
