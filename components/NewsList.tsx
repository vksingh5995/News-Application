import { useRouter } from "next/router";
import Link from "next/link";
import {
  ArticleTitle,
  List,
  ListItem,
  PublishedAt,
  Source,
  Summary,
  Image,
} from "../components/styles/ListStyled";
import { slugify } from "@/utils";

interface Article {
  id: string; // Ensure each article has a unique identifier
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  summary: string;
  urlToImage?: string;
}

interface NewsListProps {
  articles: Article[];
}

const NewsList: React.FC<NewsListProps> = ({ articles }) => {
  return (
    <List>
      {articles?.map((article, index) => (
        <ListItem key={index}>
          {article.urlToImage && (
            <Image src={article.urlToImage} alt={article.title} />
          )}
          <Link href={`/articles/${slugify(article.title)}`} passHref>
            <ArticleTitle>{article.title}</ArticleTitle>
          </Link>
          <Source>{article.source.name}</Source>
          <PublishedAt>
            {new Date(article.publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </PublishedAt>
          <Summary>{article.description}</Summary>
        </ListItem>
      ))}
    </List>
  );
};

export default NewsList;
