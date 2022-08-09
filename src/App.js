import { Fragment, useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import dataFetchReducer from "./reducers/dataFetchReducer";
import UseDataApi from "./hooks/UseDataApi";

function App() {
  // To-do: refactor using UseDataApi Hook
  // const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("MIT");
  // const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=MIT"
  );
  // const [isLoading, setIsLoading] = useState(false);

  const [{ data, isLoading, isError }, doFetch] = UseDataApi(
    "https://hn.algolia.com/api/v1/search?query=MIT",
    {
      hits: [],
    }
  );

  return (
    <Fragment>
      <Container>
        <form
          // onSubmit={(event) => {
          //   setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);

          //   event.preventDefault();
          // }}
          onSubmit={(event) => {
            doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
            event.preventDefault();
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {isError && <div>Something went wrong ...</div>}

        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <ul>
            {data.hits.map((item) => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Fragment>
  );
}

export default App;
