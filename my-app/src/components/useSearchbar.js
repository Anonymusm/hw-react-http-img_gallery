import fetchPictures from "../pic-api";
import { useState, useCallback } from "react";

export default function useSearchbar() {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadGallery = useCallback(async () => {
    setIsLoading(true);
    try {
      const newGallery = await fetchPictures({ query, currentPage });
      setGallery((prev) => [...prev, ...newGallery]);
      setCurrentPage((prev) => prev + 1);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, query]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (query.trim() === "") return;

      setGallery([]);
      setCurrentPage(1);
      loadGallery();
    },
    [query, loadGallery],
  );

  const handleLoadMore = () => {
    loadGallery();
  };

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
