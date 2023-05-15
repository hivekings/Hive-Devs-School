//Necessary From React
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

//React Bootstrap
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";

//Markdown
import Markdown from "markdown-to-jsx";

// Time Ago
import moment from "moment";

import "./image.css";

//Components
import ReplyMarkdown from "./ReplyMarkdown";
import SimmilarPost from "./simmilarPost";

//Images
import heart from "../images/heart.svg";

function removeHBDAndLastDecimal(str) {
  // Remove "HBD" from the string
  str = str.replace(" HBD", "");

  // Remove the last decimal from the string
  let lastIndex = str.lastIndexOf(".");
  if (lastIndex !== -1) {
    str = str.substring(0, lastIndex);
  }

  return str;
}

const PostSite = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [body, setBody] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [active_votes, setActive_votes] = useState([]);
  const [mainPost, setMainPost] = useState({});
  const [tags, setTags] = useState([]);
  const [pendingpayout, setPendingPayout] = useState("");

  useEffect(() => {
    getPost();
    getDiscussion();
  }, []);

  function VideoRenderer(props) {

    const { children } = props;
    if (!children || !children[1]) return <center {...props} />; // if there are no children return the default link
    const videoUrl = children[1].props.href;
    // const videoUrl = children[1].props.href.children[0].props.src;

    if (!videoUrl.match(/3speak\.tv\/watch/)) return <center {...props} />; // if it's not a video return the default link
    var oldUrl = videoUrl;
    var newUrl = oldUrl.replace(
      /^https:\/\/3speak.tv\/watch\?v=/g,
      "https://3speak.tv/embed?v="
    );


    return (
      <center>
        <iframe
          src={newUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          controls={true}
        />
      </center>
    );
  }

  async function getPost() {
    try {
      const response = await fetch("https://api.hive.blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "bridge.get_post",
          params: {
            author: params.author,
            permlink: params.permlink,
            observer: localStorage.getItem("username") || "",
          },
          id: 1,
        }),
      });
      const data = await response.json();

      setBody(data.result.body);
      setPost(data.result);
      setTags(data.result.json_metadata.tags);
      setPendingPayout(
        removeHBDAndLastDecimal(data.result.pending_payout_value)
      );
      setActive_votes(data.result.active_votes);
    } catch (error) {
      console.error(error);
    }
  }

  //Replies :D

  const RenderReplies = ({ replies }) => {
    const [openReplyId, setOpenReplyId] = useState(null);

    return (
      <div>
        {replies.map((reply) => (
          <div className="comment" key={reply.key}>
            <Image
              className="comment__image"
              height="50px"
              roundedCircle
              src={"https://images.hive.blog/u/" + reply.author + "/avatar"}
            />
            <div style={{minWidth:"100%"}}>
              <Markdown
                className="comment__body"
                options={{
                  overrides: {
                    img: {
                      component: "img",
                      props: {
                        className: "img-markdown mt-3 mb-3",
                      },
                    },
                    span: {
                      	component: "p"
                    }
                  },
                }}
              >
                {reply.body}
              </Markdown>
              <div className="comment__footer d-flex mt-2">
                <div className="d-flex">
                <img
                  height="20px"
                  className="comment__symbol"
                  src="https://i.imgur.com/8c3yfCH.png"
                ></img>

                <p
                  onClick={() => {
                    setOpenReplyId(reply.permlink);
                  }}
                  className="comment__reply"
                >
                  <span className="comment__replies-length">
                    {reply.replies.length}
                  </span>
                  Reply
                </p>
                </div>
                <div className="d-flex">
                <div id="heart" className="comment__heart">
                  <img src={heart}></img>
                  <b><span className="ms-1">{reply.active_votes.length}</span></b>
                </div>
                <div className="comment__payout">
                  <p>
                    <span className=""> $ </span>
                    {removeHBDAndLastDecimal(reply.pending_payout_value)}
                  </p>
                </div>
                </div>
              </div>
              {openReplyId === reply.permlink && <ReplyMarkdown />}
              {reply.replies && <RenderReplies replies={reply.replies} />}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getDiscussion = async () => {
    try {
      const response = await fetch("https://api.hive.blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "bridge.get_discussion",
          params: {
            author: params.author,
            permlink: params.permlink,
            observer: localStorage.getItem("username") || "",
          },
          id: 1,
        }),
      });
      const data = await response.json();
      let result = data.result;

      let discussion = convertData(result);

      function convertData(data) {
        let output = {};
        output[`${params.author}/${params.permlink}`] = convertPost(
          data[`${params.author}/${params.permlink}`],
          data
        );
        return output;
      }

      function convertPost(post, data) {
        let replies = post.replies;
        if (replies) {
          post.replies = replies.map((reply) =>
            data[reply] ? convertPost(Object.assign({}, data[reply]), data) : {}
          );
        } else {
          post.replies = [];
        }
        return post;
      }

      setMainPost(discussion[`${params.author}/${params.permlink}`]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="maina">
      <article className="d-flex justify-content-center">
        <div style={{ width: "80%" }}>
          <h1 className="read-post__header">{post.title}</h1>
          <a className="read-post__author" href={"/profile/" + post.author}>
            <span style={{ color: "red" }}>{"Written by"}</span> {post.author}
          </a>
          <Image
            className="read-post__avatar"
            height="45px"
            roundedCircle
            src={"https://images.hive.blog/u/" + post.author + "/avatar"}
          />

          <Badge className="ms-2" bg="danger">
            {post.author_reputation}
          </Badge>
          <span className="ms-4">{moment(post.created).fromNow()}</span>
          <br />
          <Markdown
            className="mt-3 read-post__body"
            options={{
              overrides: {
                img: {
                  component: "img",
                  props: {
                    className: "img-markdown mt-3 mb-3",
                  },
                },
                center: {
                  component: VideoRenderer,
                },
              },
            }}
          >
            {body}
          </Markdown>

          <div className="tags">
            {tags.map((tag) => (
              <Link to={"/tag/" + tag}>
                <Badge className="ms-3" bg="danger">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
          <div className="mt-2 mb-2"></div>
          <footer className="article__footer ">
            <div className="d-flex">
          <img
                  height="26px"
                  className="comment__symbol"
                  src="https://i.imgur.com/8c3yfCH.png"
                ></img>

                <p
            
                  className="comment__reply"
                >
                  <span className="comment__replies-length">
                    {post.replies && post.replies.length}
                  </span>
                  Reply
                </p>
                </div>
            <div className="d-flex flex-row">
              <div id="heart" >
                <img src={heart}></img>
                {post.active_votes && <span>{post.active_votes.length}</span>}
              </div>
       
                <p className="comment__payout">
                  <span className="ms-3"> $ </span>
                  {/* {removeHBDAndLastDecimal(post.pending_payout_value)} */}
                  {pendingpayout}
                </p>
            
            </div>
          </footer>
        </div>
      </article>

      <section className="d-flex justify-content-center">
        <div style={{ width: "80%" }}>
          <ReplyMarkdown />

          <h3 className="comments__header3">Comments Section</h3>

          {mainPost.replies && <RenderReplies replies={mainPost.replies} />}
        </div>
      </section>
      <footer className="footer--comments">
        <h3 className="comments__header3">Simmilar Post</h3>
        <SimmilarPost post={post} />
        <SimmilarPost post={post} />
      </footer>
    </main>
  );
};

export default PostSite;
