import React from "react";  
import { Link } from "react-router-dom";
import { useArticleCommentsQuery } from "../hooks";
// import {ArticleComment} from "./ArticleComment";
import {useAuth} from "../hooks";
import ArticleComment from "./ArticleComment";
import ArticleCommentForm from "./ArticleCommentForm";

function ArticleComments() {
  
  const {isAuth} = useAuth();

  const {

    isArticleCommentsLoading,
    articleComments,
    articleCommentsError,

  } = useArticleCommentsQuery();

  if(!isAuth){

    return (

        <p>
            <Link to='/login'>Sign in</Link>or
            <Link to='/register'>Sign up</Link>to add comment on this article
        </p>

    )

  }
    return (
    <div>
        <ArticleCommentForm/>
        {articleComments?.comments?.map((comment) => (
            <ArticleComment key={comment.id} comment={comment} />

        ))}     
    </div>
  );
}

export default ArticleComments;

// import React from "react";

// function ArticleComment() {
//     return (
//       <h1>dsajnd</h1>
//     );
// }

// export default ArticleComment;