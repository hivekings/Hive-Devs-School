import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import SimmilarPost from "./simmilarPost";

const Categoria = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const categoria = params.categoria;
  const [orderBy, setOrderBy] = useState("created");

  useEffect(() => {
    getPostas();
  }, [orderBy]);

  async function fetchRankedPosts(sort, tag, observer) {
    const url = `https://api.hive.blog`;
    const data = {
      jsonrpc: "2.0",
      method: "bridge.get_ranked_posts",
      params: { sort, tag, observer },
      id: 1,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  }

  const getPostas = async () => {

    const fefe = await fetchRankedPosts(orderBy, categoria, "fefe99"); 

    if (categoria === "introduction") {

      const filteredIntroductionPosts = fefe.result.filter(obj => {
        const tags = obj.json_metadata.tags;
        if (tags && Array.isArray(tags)) {
          return tags.some(tag => tag.includes("introduction"));
        }
        return false;
      }).slice(0, 10);
      setPosts(filteredIntroductionPosts);
    }
    if (categoria === "Introduction to Blockchain Technology") {
      const filteredBlockchainPosts = fefe.result.filter(obj => {
        const tags = obj.json_metadata.tags;
        if (tags && Array.isArray(tags)) {
          return tags.some(tag => tag.includes("blockchain"));
        }
        return false;
      }).slice(0, 10);
      setPosts(filteredBlockchainPosts);
    }
    if (categoria === "Introduction to HIVE") {
      const filteredHivePosts = fefe.result.filter(obj => {
        const tags = obj.json_metadata.tags;
        if (tags && Array.isArray(tags)) {
          return tags.some(tag => tag.includes("hive"));
        }
        return false;
      }).slice(0, 10);
      setPosts(filteredHivePosts);
    }
    if (categoria === "Reading HIVE Transactions") {
      const filteredHivePosts = fefe.result.filter(obj => {
        const tags = obj.json_metadata.tags;
        if (tags && Array.isArray(tags)) {
          return tags.some(tag => tag.includes("transactions"));
        }
        return false;
      })      
      setPosts(filteredHivePosts);
    }
    if (categoria === "Building in the Blockchain" ) {
      const filteredBlockchainPosts = fefe.result.filter(obj => {
        const tags = obj.json_metadata.tags;
        if (tags && Array.isArray(tags)) {
          return tags.some(tag => tag.includes("building"));
        }
        return false;
      }).slice(0, 10);
      setPosts(filteredBlockchainPosts);
    }

  };

  return (
    <main className="maina">
   
      <h1 className="section__header">{categoria}</h1>
      <NavDropdown
        title={orderBy}
        id="basic-nav-dropdown" 
      >
        <NavDropdown.Item onClick={() => setOrderBy("created")}>
          Created
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => setOrderBy("trending")}>
          Trending
        </NavDropdown.Item>
      </NavDropdown>
      {posts.map((post) => (
        <SimmilarPost key={post.id} post={post} />
      ))}
    </main>
  );
};

export default Categoria;
