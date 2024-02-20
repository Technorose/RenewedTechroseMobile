import { Provider } from "react-redux";
import AppNavigation from "./navigations/AppNavigation";
import Toast from 'react-native-toast-message';
import { store } from "./store";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreAllLogs([/Warning: .../]); // Ignore all log notifications

  return (
    <>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
      <Toast />
    </>
  );
}

