// src/Leaderboard.jsx
import React from 'react';
import { Box, Paper, Typography, Button, List, ListItem, ListItemText, ListItemIcon, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const fakeLeaderboardData = [
    { name: 'Gabriel Terry', points: 30000 },
    { name: 'John Doe', points: 1500 },
    { name: 'Jane Smith', points: 1400 },
    { name: 'Sam Wilson', points: 1300 },
    { name: 'Alice Brown', points: 1250 },
    { name: 'Charlie Green', points: 1200 },
    { name: 'Olivia Johnson', points: 1180 },
    { name: 'Liam Martinez', points: 1150 },
    { name: 'Emma Rodriguez', points: 1125 },
    { name: 'Noah Davis', points: 1100 },
    { name: 'Ava Wilson', points: 1080 },
    { name: 'Sophia Clark', points: 1060 },
    { name: 'James Walker', points: 1050 },
    { name: 'Mia Lee', points: 1040 },
    { name: 'Amelia Harris', points: 1025 },
    { name: 'Isabella Lewis', points: 1010 },
    { name: 'Lucas Young', points: 1000 },
    { name: 'Mason King', points: 980 },
    { name: 'Ethan Wright', points: 960 },
    { name: 'Harper Scott', points: 940 },
    { name: 'Benjamin Torres', points: 920 },
    { name: 'Elijah Perez', points: 900 },
    { name: 'Ella Hall', points: 880 },
    { name: 'Avery Adams', points: 860 },
    { name: 'Kanye West', points: 250 },
];

const Leaderboard = () => {
    const theme = useTheme();
    const navigate = useNavigate();

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
                <List
                    sx={{
                        maxHeight: '350px',  // Adjust this height as needed
                        overflowY: 'auto',
                    }}
                >
                    {fakeLeaderboardData.map((entry, index) => (
                        <ListItem key={index}>
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
                                primary={`${index + 1}. ${entry.name}`}
                                secondary={`Points: ${entry.points}`}
                                sx={{
                                    color: theme.palette.text.primary,
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
                <Button variant="outlined" color="primary" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
                    Back to Dashboard
                </Button>
            </Paper>
        </Box>
    );
};

export default Leaderboard;
