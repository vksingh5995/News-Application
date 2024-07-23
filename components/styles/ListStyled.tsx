import styled from "styled-components";

const List = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`;

const ListItem = styled.div`
  background-color: white;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #000;
`;

const ArticleTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const Source = styled.p`
  font-size: 0.9em;
  color: #000;
`;

const PublishedAt = styled.p`
  font-size: 0.8em;
  color: #000;
`;

const Summary = styled.p`
  font-size: 1em;
  color: #000;
  margin-top: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export { List, ListItem, ArticleTitle, Source, PublishedAt, Summary, Image };
