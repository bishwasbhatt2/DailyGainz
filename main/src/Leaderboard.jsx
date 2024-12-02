import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, List, ListItem, ListItemText, ListItemIcon, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Import Firebase services

const Leaderboard = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch leaderboard data from Firestore
    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const pointsCollection = collection(db, "points");
                const snapshot = await getDocs(pointsCollection);
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Sort the leaderboard data by points in descending order
                const sortedData = data.sort((a, b) => b.points - a.points);
                setLeaderboardData(sortedData);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.background.default,
                padding: '1rem',
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: '100%',
                    maxWidth: '600px',
                    padding: '2rem',
                    borderRadius: '10px',
                    backgroundColor: theme.palette.background.paper,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" color="primary" gutterBottom>
                    Leaderboard
                </Typography>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <List
                        sx={{
                            maxHeight: '350px', // Adjust this height as needed
                            overflowY: 'auto',
                        }}
                    >
                        {leaderboardData.map((entry, index) => (
                            <ListItem key={entry.id}>
                                <ListItemIcon>
                                    {index === 0 ? (
                                        <EmojiEventsIcon sx={{ color: 'gold' }} />
                                    ) : index === 1 ? (
                                        <EmojiEventsIcon sx={{ color: 'silver' }} />
                                    ) : index === 2 ? (
                                        <EmojiEventsIcon sx={{ color: '#cd7f32' }} />
                                    ) : null}
                                </ListItemIcon>
                                <ListItemText
                                    primary={`${index + 1}. ${entry.name || "Anonymous"}`}
                                    secondary={`Points: ${entry.points}`}
                                    sx={{
                                        color: theme.palette.text.primary,
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
                <Button variant="outlined" color="primary" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
                    Back to Dashboard
                </Button>
            </Paper>
        </Box>
    );
};

export default Leaderboard;