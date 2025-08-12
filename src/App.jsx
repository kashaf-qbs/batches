import "./App.css";
import AppNavigation from "./navigation/AppNavigation";
import { LoadingBarContainer } from "react-top-loading-bar";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <LoadingBarContainer>
        <AppNavigation />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
        />
      </LoadingBarContainer>
    </>
  );
}

export default App;
