import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimmilarPost from "./simmilarPost";

const Biblioteca = () => {
  
  const [categories, setCategories] = useState([]);
  const [introductionPosts, setIntroductionPosts] = useState([]);
  const [blockchainPosts, setBlockchainPosts] = useState([]);
  const [hivePosts, setHivePosts] = useState([]);
  const [transactionPosts, setTransactionPosts] = useState([]);
  const [buildingPosts, setBuildingPosts] = useState([]);


  useEffect(() => {
    fetchCategories();
    getPostas();
  }, []);


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

    const fefes = await fetchRankedPosts(
      "created",
      `hive-104341`,
      localStorage.getItem('username') || ""
    ); 

    const filteredIntroductionPosts = fefes.result.filter(obj => {
      const tags = obj.json_metadata.tags;
      if (tags && Array.isArray(tags)) {
        return tags.some(tag => tag.includes("introduction"));
      }
      return false;
    }).slice(0, 2);

    const filteredBlockchainPosts = fefes.result.filter(obj => {
      const tags = obj.json_metadata.tags;
      if (tags && Array.isArray(tags)) {
        return tags.some(tag => tag.includes("blockchain"));
      }
      return false;
    }).slice(0, 2);
    
    const filteredHivePosts = fefes.result.filter(obj => {
      const tags = obj.json_metadata.tags;
      if (tags && Array.isArray(tags)) {
        return tags.some(tag => tag.includes("hive"));
      }
      return false;
    }).slice(0, 2);
    
    const filteredTransactionPosts = fefes.result.filter(obj => {
      const tags = obj.json_metadata.tags;
      if (tags && Array.isArray(tags)) {
        return tags.some(tag => tag.includes("transaction"));
      }
      return false;
    }).slice(0, 2);

    const filteredBuildingPosts =fefes.result.filter(obj => {
      const tags = obj.json_metadata.tags;
      if (tags && Array.isArray(tags)) {
        return tags.some(tag => tag.includes("building"));
      }
      return false;
    }).slice(0, 2);

    setIntroductionPosts(filteredIntroductionPosts );
    setBlockchainPosts(filteredBlockchainPosts);
    setHivePosts(filteredHivePosts);
    setTransactionPosts(filteredTransactionPosts);
    setBuildingPosts(filteredBuildingPosts );
  };
  

  const fetchCategories = async () => {
    const result = await fetch('/api/');

    const categories = await result.json();

    setCategories(categories);
  };

  return (
    <main className="maina">
      <h1 className="main__header" style={{color:"white"}}>Library</h1>
      <section className="resources__section">
      <ul className="resources__list">
        {categories.map((category) => (
          <div>
          <Link to={category.title}><li className="section__header" key={category.id}>{category.title}</li></Link>
          {category==="Introduction" && <SimmilarPost key={introductionPosts[0]._id} post={introductionPosts[0]}/>}
          {category==="Introduction" && <SimmilarPost key={introductionPosts[1]._id} post={introductionPosts[1]}/>} 
          {category==="Introduction to Blockchain Technology" && <SimmilarPost key={blockchainPosts[0]._id} post={blockchainPosts[0]}/>} 
          {category==="Introduction to Blockchain Technology" && <SimmilarPost key={blockchainPosts[1]._id} post={blockchainPosts[1]}/>} 
          {category==="Introduction to HIVE" && <SimmilarPost key={hivePosts[0]._id} post={hivePosts[0]}/>} 
          {category==="Introduction to HIVE" && <SimmilarPost key={hivePosts[1]._id} post={hivePosts[1]}/>} 
          {category==="Reading HIVE Transactions" && <SimmilarPost key={transactionPosts[0]._id} post={introductionPosts[0]}/>} 
          {category==="Reading HIVE Transactions" && <SimmilarPost key={transactionPosts[1]._id} post={transactionPosts[1]}/>} 
          {category==="Building in the Blockchain" && <SimmilarPost key={buildingPosts[0]._id} post={buildingPosts[0]}/>} 
          {category==="Building in the Blockchain" && <SimmilarPost key={buildingPosts[1]._id} post={buildingPosts[1]}/>} 

          </div>
        ))}
      </ul>
      </section>
    </main>
  );
};

export default Biblioteca;
