import { NativeStackScreenProps } from "@react-navigation/native-stack";

/** -----------------------NAVIGATOR TYPES--------------------
 * - Navigator Types
 *  - <ROUTE_NAME>: <PARAM>
 * > Docs: https://reactnavigation.org/docs/typescript/
 */

//--------------BOTTOM TAB-------------------

// Bottom Tab Navigator 
export type BottomTabNavigatorParamList = {
    Home: undefined
    Profile: undefined
   }

//--------------------AUTH-----------------

// Auth Navigator
export type AuthStackNavigatorParamList = {
  Login: undefined
  Signup: undefined
  ResetPassword: undefined
  VerifyEmail: undefined
};


/** ------------------SCREEN_ROUTE_PROP TYPES-----------------------
 * Screen Route Types
 * Docs: https://reactnavigation.org/docs/typescript/#type-checking-screens
 */

// Login Screen
export type LoginScreenRouteProp = NativeStackScreenProps<AuthStackNavigatorParamList, 'Login'>;

// Signup Screen
export type SignupScreenRouteProp = NativeStackScreenProps<AuthStackNavigatorParamList, 'Signup'>;

// Reset Password Screen
export type ResetPasswordScreenRouteProp = NativeStackScreenProps<AuthStackNavigatorParamList, 'ResetPassword'>;

