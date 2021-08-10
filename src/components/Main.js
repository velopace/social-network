import { useRef } from 'react';
import Identicon from 'identicon.js';

function Main({ posts, createPost, tipPost }) {
  const postContentInput = useRef(null);

  const handleSubmitContent = (e) => {
    e.preventDefault();
    createPost(postContentInput.current.value);
  }

  const handleClickTipPost = (postId) => {
    const tipAmount = window.web3.utils.toWei('0.1', 'ether');
    tipPost(postId, tipAmount);
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '500px' }}>
          <div className="content ms-auto me-auto">
            <p>&nbsp;</p>
            <form className="d-grid" onSubmit={handleSubmitContent}>
              <div className="form-group mr-sm-2">
                <input
                  id="postContent"
                  type="text"
                  ref={postContentInput}
                  className="form-control"
                  placeholder="What's on your mind?"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-2">Share</button>
            </form>
            <p>&nbsp;</p>
            { posts.map((post, key) => {
              return (
                <div className="card mb-4" key={key} >
                  <div className="card-header">
                    <img
                      className="me-2"
                      width="30"
                      height="30"
                      src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                    />
                    <small className="text-muted">{post.author}</small>
                  </div>
                  <ul id="postList" className="list-group list-group-flush">
                    <li className="list-group-item">
                      <p>{post.content}</p>
                    </li>
                    <li key={key} className="list-group-item py-2">
                      <small className="float-start mt-1 text-muted">
                        TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'ether')} ETH
                      </small>
                      <button
                        className="btn btn-link btn-sm float-end pt-0"
                        onClick={(e) => handleClickTipPost(post.id)}
                      >
                        TIP 0.1 ETH
                      </button>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Main;
