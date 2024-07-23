import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArticleContent,
  Container,
  Title,
} from "@/components/styles/ArticleStyled";
import { slugify } from "@/utils";

interface Article {
  title: string;
  source: { name: string };
  publishedAt: string;
  summary: string;
  urlToImage?: string;
  content?: string; // Include content if available
}

const ArticleDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the article ID from the query parameter
  const { slug } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchArticle = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/${id}`,
            {
              params: { query: slug }, // Assuming your API can handle slug as a query
            }
          );
          setArticle(response.data);
        } catch (error) {
          console.error(error);
          setError("Failed to load article. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [slug]);

  return (
    <Container>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {article && (
        <>
          <Title>{article.title}</Title>
          {article.urlToImage && (
            <img src={article.urlToImage} alt={article.title} />
          )}
          <p>Source: {article.source.name}</p>
          <p>
            Published At: {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <ArticleContent>{article.content || article.summary}</ArticleContent>
        </>
      )}
    </Container>
  );
};

export default ArticleDetail;
