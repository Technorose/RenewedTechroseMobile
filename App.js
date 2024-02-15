import { Provider } from "react-redux";
import AppNavigation from "./navigations/AppNavigation";
import Toast from 'react-native-toast-message';
import { store } from "./store";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
      <Toast />
    </>
  );
}

