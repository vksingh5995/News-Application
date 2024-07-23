const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
const OpenAI = require("openai");
const slugifyA = require("./utils/index").slugifyA;

dotenv.config();

const openai = new OpenAI();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.get("/api/news", async (req, res) => {
  const { query } = req.query;

  //   if (!query) {
  //     return res.status(400).json({ error: "Query parameter is required" });
  //   }

  try {
    const newsResponse = await axios.get(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&apiKey=${process.env.NEWS_API_KEY}`
    );
    const articles = newsResponse.data.articles;

    // const summarizedArticles = await Promise.all(
    //   articles?.map(async (article) => {
    //     try {
    //       const summaryResponse = await axios.post(
    //         "https://api.openai.com/v1/chat/completions",
    //         {
    //           model: "gpt-3.5-turbo",
    //           messages: [
    //             {
    //               role: "system",
    //               content:
    //                 "You are a helpful assistant that summarizes articles.",
    //             },
    //             {
    //               role: "user",
    //               content: `Summarize this article: ${
    //                 article?.description || article?.content
    //               }`,
    //             },
    //           ],
    //           max_tokens: 60,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       );

    //       return {
    //         ...article,
    //         summary: summaryResponse.data.choices[0].message.content.trim(),
    //         imageUrl: article.urlToImage,
    //       };
    //     } catch (summaryError) {
    //       console.error("OpenAI API Error:", summaryError);
    //       return {
    //         ...article,
    //         summary: "Summary not available",
    //         imageUrl: article.urlToImage,
    //       };
    //     }
    //   })
    // );
    console.log("articles", JSON.stringify(articles, null, 2));
    return res.json(articles);
  } catch (error) {
    console.error("News API Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/news/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const newsResponse = await axios.get(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(id)}&apiKey=${
        process.env.NEWS_API_KEY
      }`
    );

    console.log("newsResponse", JSON.stringify(newsResponse.data, null, 2));
    const articles = newsResponse.data.articles;
    const article = articles.find((article) => slugifyA(article.title) === id); // Adjust this line if needed
    console.log("article", JSON.stringify(article));
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Optionally summarize the article
    // const summaryResponse = await axios.post(
    //   "https://api.openai.com/v1/chat/completions",
    //   {
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "system",
    //         content: "You are a helpful assistant that summarizes articles.",
    //       },
    //       {
    //         role: "user",
    //         content: `Summarize this article: ${
    //           article.description || article.content
    //         }`,
    //       },
    //     ],
    //     max_tokens: 60,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    return res.json({
      ...article,
      //   summary: summaryResponse.data.choices[0].message.content.trim(),
    });
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
