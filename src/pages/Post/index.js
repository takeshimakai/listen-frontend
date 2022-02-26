import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import UserContext from "../../contexts/UserContext";

import getData from '../../utils/getData';

import Sort from '../../components/Sort';
import Comments from './Comments';
import PostForm from "../PostForm";
import CommentForm from "./CommentForm";
import PostContainer from "./PostContainer";

const Post = ({ posts, setPosts }) => {
  const { postId } = useParams();
  const { token } = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [commentToEditId, setCommentToEditId] = useState('');
  const [sortCommentsBy, setSortCommentsBy] = useState('newest');

  useEffect(() => {
    const savedSort = JSON.parse(sessionStorage.getItem('sortCommentsBy'));

    if (savedSort) {
      setSortCommentsBy(savedSort);
    }
  }, [])

  useEffect(() => {
    setCommentToEditId('');
  }, [comments]);

  useEffect(() => {
    if (posts) {
      setPost(posts.find(post => post._id === postId));
    }
  }, [posts, postId]);

  useEffect(() => {
    if (post) {
      (async () => {
        try {
          const res = await getData(`/comments/${post._id}`, token);
    
          setComments(await res.json());
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [post, token]);

  return (
    <>
      {editMode
        ? <PostForm post={post} setPosts={setPosts} setComments={setComments} setEditMode={setEditMode} />
        : <div className='pt-16 sm:pt-20 pb-12 px-4 sm:px-0 sm:w-3/5 sm:mx-auto'>
            {post
              ? <>
                  <PostContainer post={post} setPosts={setPosts} setEditMode={setEditMode} />
                  <div className='mt-8 space-y-4 border rounded-xl px-6 sm:px-10 pb-6 sm:pb-10 pt-2 sm:pt-6 shadow-md'>
                    <CommentForm setComments={setComments} parentId={post._id} />
                    <Sort sortBy={sortCommentsBy} setSortBy={setSortCommentsBy} name='comments' />
                    {comments.length > 0
                      ? <Comments
                          parentId={post._id}
                          comments={comments}
                          setComments={setComments}
                          sortCommentsBy={sortCommentsBy}
                          commentToEditId={commentToEditId}
                          setCommentToEditId={setCommentToEditId}
                        />
                      : <p className='font-light sm:text-sm'>There are no comments.</p>
                    }
                  </div>
                </>
              : <p className='font-light sm:text-sm'>Unable to find post.</p>
            }
          </div>
      }
    </>
  )
}

export default Post;