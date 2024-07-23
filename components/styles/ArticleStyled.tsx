import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const ArticleContent = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  padding: 0 10px;

  p {
    margin-bottom: 1.5em;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 20px 0;
  }
`;
export { Container, Title, ArticleContent };
