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

const SimmilarPost = ({ post }) => {
  console.log(post);
  return (
    <article className="similar-post">
      <main>
        {post.json_metadata && post.json_metadata.image[0] && (
          <img
            className="similar-post__image"
            src={post.json_metadata.image[0]}
          ></img>
        )}
        <div className="magic-div">
        <h4 className="similar-post__title"><b>{post.title}</b></h4>
        <a className="similar-post__author" href={"/profile/" + post.author}>
          <span>{"By"}</span> <b>{post.author}</b>
        </a>
        <p className="similar-post__description">{post.description}</p>
        </div>
      </main>
      <footer className="similar-post__footer">
        <span className="similar-post__views">
          +100 <b>Views</b>
        </span>
        <div className="d-flex flex-row">
        <div id="heart" className="comment__heart">
          <img src={heart}></img>
         { post.active_votes && <span>{post.active_votes.length}</span>}
        </div>
        {post.pending_payout_value && <span className="comment__payout similar-post__pending">$ {removeHBDAndLastDecimal(post.pending_payout_value)}</span>}
        </div>
      </footer>
    </article>
  );
};

export default SimmilarPost;
