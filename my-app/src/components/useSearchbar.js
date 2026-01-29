// import fetchPictures from "../pic-api";
// import { useState, useCallback } from "react";

// export default function useSearchbar() {
//   const [gallery, setGallery] = useState([]);
//   const [query, setQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const loadGallery = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const newGallery = await fetchPictures({ query, currentPage });
//       setGallery((prev) => [...prev, ...newGallery]);
//       setCurrentPage((prev) => prev + 1);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [currentPage, query]);

//   const handleChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleSubmit = useCallback(
//     (event) => {
//       event.preventDefault();
//       if (query.trim() === "") return;

//       setGallery([]);
//       setCurrentPage(1);
//       loadGallery();
//     },
//     [query, loadGallery],
//   );

//   const handleLoadMore = () => {
//     loadGallery();
//   };

//   return {
//     gallery,
//     query,
//     isLoading,
//     error,
//     currentPage,
//     handleLoadMore,
//     handleSubmit,
//     handleChange,
//   };
// }

import fetchPictures from "../pic-api";
import { useState, useCallback, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        isLoading: true
      }
    }
    case "FINALLY_LOADING": {
      return {
        ...state,
        isLoading: false
      }
    }
    case "FETCH": {
      return {
        ...state,
        gallery: [...state.gallery, ...action.new],
        currentPage: state.currentPage + 1
      }
    }
    case "CATCH": {
      return {
        ...state,
        error: action.error
      }
    }
    case "SUBMIT": {
      return {
        ...state,
        gallery: [],
        currentPage: 1
      }
    }
    default: return state
  }
}

export default function useSearchbar() {
  const initialState = {
    gallery: [],
    currentPage: 1,
    isLoading: false,
    error: null,
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const [query, setQuery] = useState("");

  const loadGallery = useCallback(async () => {
    dispatch({ type: "LOADING" })
    try {
      const newGallery = await fetchPictures({ query });
      dispatch({ type: "FETCH", new: newGallery })
    } catch (err) {
      dispatch({ type: "CATCH", error: err })
    } finally {
      dispatch({ type: "FINALLY_LOADING" })
    }
  }, [query]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (query.trim() === "") return;

      dispatch({ type: "SUBMIT" })
      loadGallery();
    },
    [query, loadGallery],
  );

  const handleLoadMore = () => {
    loadGallery();
  };

  const {gallery, isLoading, error, currentPage} = state;

  return {
    gallery,
    query,
    isLoading,
    error,
    currentPage,
    handleLoadMore,
    handleSubmit,
    handleChange,
  };
}
