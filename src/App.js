import { Provider } from "react-redux";
import Body from "./components/layout/Body";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/pages/MainContainer";
import WatchPage from "./components/pages/WatchPage";
import FeedPage from "./components/pages/FeedPage";
import ResultsPage from "./components/pages/ResultsPage";
import ShortsPage from "./components/shorts/ShortsPage";
import SettingsPage from "./components/pages/SettingsPage";
import ChannelPage from "./components/pages/ChannelPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <MainContainer /> },
      { path: "watch", element: <WatchPage /> },
      { path: "feed/shorts", element: <ShortsPage /> },
      { path: "shorts", element: <ShortsPage /> },
      { path: "feed/settings", element: <SettingsPage /> },
      { path: "channel/:channelId", element: <ChannelPage /> },
      { path: "feed/:slug", element: <FeedPage /> },
      { path: "results", element: <ResultsPage /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
        <RouterProvider router={appRouter} />
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
