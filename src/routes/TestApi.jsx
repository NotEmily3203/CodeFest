import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestApi = () => {
    const [response, setResponse] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace with your actual Cloud Function URL
                const result = await axios.get('https://us-central1-codefest-97b85.cloudfunctions.net/api/test');
                setResponse(JSON.stringify(result.data));
            } catch (error) {
                console.error('Error fetching data:', error);
                setResponse('Error fetching data. See console for details.');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Test API Response</h2>
            <p>{response}</p>
        </div>
    );
};

export default TestApi;
