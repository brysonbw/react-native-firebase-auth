import Toast from "react-native-root-toast";
import { colors } from "../constants/theme";

export function toastMessage(message: string, position?: string, duration?:string){
    Toast.show((message), {
        duration: duration === 'LONG' ? Toast.durations.LONG : Toast.durations.SHORT ,
        position: position  === 'TOP' ? Toast.positions.TOP : Toast.positions.BOTTOM, 
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: colors.white,
        textColor: "black",
        opacity: 2
      });
}

export function toastErrorMessage(error: any) {
    const errorCode = error.code;
    const errorMsg = error.message;
    Toast.show(`${errorMsg.slice(10)}`, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: colors.white,
      textColor: "black",
      opacity: 2
    });
    console.log(errorCode + errorMsg);
}