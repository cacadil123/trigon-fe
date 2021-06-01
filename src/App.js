import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import SingleSignOn from './components/login';
import axios from 'axios';
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
  axios.get(
    "https://api.ipify.org?format=json"
  ).then((res) => JSON.stringify(localStorage.setItem('ip', res.data.ip)))
);

if (isLoading) return <span style={{color: 'white'}}>Loading...</span>;

if (error) return "An error has occurred: " + error.message;

return (
  <SingleSignOn />
);
}

