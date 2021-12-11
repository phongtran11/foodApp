import { useState, useEffect, useCallBack } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentList from './CommentsList';

const Comments = () => {
    const [isAddingComment, setIsAddingComment] = useState(false);

    const params = useParams();

    const { quoteId } = params;

    const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    const onAddedComment = useCallBack(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    let comments;

    if (status === 'pending') {
        comments = (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (status === 'completed' && (loadedComments || loadedComments.length > 0)) {
        comments = <CommentList comments={loadedComments} />;
    }

    if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
        comments = <p className="centered"> No comments</p>;
    }
    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className="btn" onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && (
                <NewCommentForm quoteId={quoteId} onAddedComment={onAddedComment} />
            )}
            {comments}
        </section>
    );
};

export default Comments;