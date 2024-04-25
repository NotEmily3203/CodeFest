import React, { useEffect, useState } from 'react';
import { db, auth, storage } from '../firebaseConfig';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function Saved() {
    const [itineraries, setItineraries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            console.log("No user is signed in.");
            navigate("/login");  // Redirect to login page or appropriate handling
            return;
        }

        const fetchItineraries = async () => {
            try {
                const allItineraries = collection(db, `${currentUser.uid}_itineraries`);
                const querySnapshot = await getDocs(allItineraries);
                const itinerariesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    pdfUrl: doc.data().pdfUrl,
                    displayName: doc.data().displayName
                }));
                setItineraries(itinerariesData);
            } catch (error) {
                console.error("Error fetching itineraries: ", error);
                alert("Failed to load itineraries. Please try again later.");
            }
        };

        fetchItineraries();
    }, [navigate]);

    const deleteItinerary = async (itineraryId, pdfUrl) => {
        try {
            const itineraryDocRef = doc(db, `${auth.currentUser.uid}_itineraries`, itineraryId);
            await deleteDoc(itineraryDocRef);

            const fileRef = ref(storage, pdfUrl);
            await deleteObject(fileRef);

            setItineraries(prev => prev.filter(item => item.id !== itineraryId));
        } catch (error) {
            console.error("Error deleting itinerary: ", error);
            alert("Failed to delete the itinerary. Please try again.");
        }
    };

    return (
        <div>
            <br />
            {itineraries.length > 0 ? (
                <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', listStyleType: 'none', padding: 0 }}>
                    {itineraries.map((item) => (
                        <li key={item.id} style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '10px', backgroundColor: '#36454f' }}>
                            <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">{item.displayName}</a>
                            <iframe
                                src={item.pdfUrl}
                                style={{ width: '100%', height: '400px' }}
                                title={item.displayName}
                            ></iframe>
                            <button onClick={() => deleteItinerary(item.id, item.pdfUrl)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>
                    <h1>No saved itineraries</h1>
                    <button onClick={() => navigate("/travel")}>To Travel Generator</button>
                </div>
            )}
        </div>
    );
}

export default Saved;
