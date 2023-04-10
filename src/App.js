import Router from "./shared/Router";
import GlobalStyle from "./utils/styles/GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import store from "./redux/config/ConfigStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GlobalStyle />
        <Router />
      </Provider>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  );
}

export default App;
