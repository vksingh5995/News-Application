"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import NewsList from "@/components/NewsList";
import SearchBar from "@/components/SearchBar";
import { Container, Title } from "@/components/styles/HomeStyled";

interface Article {
  id: any;
  title: string;
  source: { name: string };
  publishedAt: string;
  summary: string;
  description: string;
}

const HomeIndex = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to sort articles by title
  const sortArticlesByTitle = (articles: Article[]) => {
    if (!articles) return []; // Return an empty array if articles is undefined or null
    return articles.sort((a, b) => a?.title.localeCompare(b.title));
  };

  const fetchAllNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news`
      );
      const sortedArticles = sortArticlesByTitle(response.data);
      console.log(sortedArticles);
      setArticles(sortedArticles);
      setFilteredArticles(sortedArticles); // Initialize filtered articles with all articles
    } catch (error) {
      console.error(error);
      setError("Failed to load articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (keyword: string) => {
    if (!keyword.trim()) {
      // If the search bar is cleared, show all articles
      setFilteredArticles(articles);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news`,
        {
          params: { query: keyword },
        }
      );
      const sortedArticles = sortArticlesByTitle(response.data || []);
      setFilteredArticles(sortedArticles);
    } catch (error) {
      console.error(error);
      setError("Failed to load articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  return (
    <Container>
      <Title>News Search</Title>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="text-black">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <NewsList articles={filteredArticles} />
    </Container>
  );
};

export default HomeIndex;
