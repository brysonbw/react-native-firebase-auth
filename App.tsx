import { AuthProvider } from './context/AuthContext';
import { RootSiblingParent } from 'react-native-root-siblings';
import AppNavContainer from './navigation';
import { LogBox } from 'react-native';

/**
 * 
 * Warning: AsyncStorage has been extracted from react-native core and will be removed in a future release
 * 
 * I've come across this warning recently with firebase versions > 9^
 * To my understanding the warning is nothing significant and ignoring it with LogBox should be fine but I could be wrong and if I am correct me by reaching out and lmk so I can understand
 * You can read more about the warning on this stack overflow post: https://stackoverflow.com/questions/55311228/how-to-remove-warning-async-storage-has-been-extracted-from-react-native-core
 * 
 * Even when I install the dependency I still get the warning
 * So, if you know more about this or experienced this with certain firebase versions with expo and know a solution lmk lol
 * You can reach me on discord which I'll attach in the README
 */

// this will remove the warning from the LOGS
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);


export default function App() {
  return (
    <AuthProvider>
    {/** React-Native-Toast > popup alerts */}
    <RootSiblingParent>
      {/** App */}
    <AppNavContainer />
    </RootSiblingParent>
</AuthProvider>
  );
}
