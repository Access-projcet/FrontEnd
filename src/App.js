import Router from "./shared/Router";
import GlobalStyle from "./utils/styles/GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./redux/config/ConfigStore";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GlobalStyle />
        <Router />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
