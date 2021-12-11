import React, { useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

function AllQuotes() {
    const { sendRequest, status, data: loadedQuote, error } = useHttp(getAllQuotes, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if (status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (status === 'error') {
        return <p className="centered forcused">{error}</p>;
    }

    if (status === 'completed' && (!loadedQuote || loadedQuote.length === 0)) {
        return <NoQuotesFound />;
    }

    return <QuoteList quotes={loadedQuote} />;
}

export default AllQuotes;
