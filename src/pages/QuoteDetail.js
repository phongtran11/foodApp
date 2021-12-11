import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import React, { useEffect } from 'react';

import Comment from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

function QuoteDetail() {
    const match = useRouteMatch();

    const params = useParams();
    const { quoteId } = params;
    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (status === 'error') {
        return <p className="centered">{error}</p>;
    }

    if (!loadedQuote.text) {
        return <p>No quote</p>;
    }

    return (
        <div>
            <HighlightedQuote
                text={loadedQuote.text}
                author={loadedQuote.author}
                id={loadedQuote.id}
            />
            <Route exact path={`${match.path}`}>
                <div className="centered">
                    <Link className="btn--flat" to={match.url + '/comment'}>
                        Comment
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comment`}>
                <Comment />
            </Route>
        </div>
    );
}

export default QuoteDetail;
