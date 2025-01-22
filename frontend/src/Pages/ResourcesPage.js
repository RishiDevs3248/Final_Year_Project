import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, List, ListItem, Button } from '@mui/material';

const ResourcesPage = () => {
    const location = useLocation();
    const { skills } = location.state || { skills: [] };

    const resources = require('../helper_json/recommandation_urls.json'); // Import your JSON file

    const renderResources = (skill) => {
        const skillResources = resources[skill];
        if (!skillResources) return null;

        return (
            <div key={skill}>
                <Typography variant="h5">{skill}</Typography>
                <List>
                    {skillResources.Platforms && (
                        <>
                            <Typography variant="h6">Platforms:</Typography>
                            {skillResources.Platforms.map((platform, index) => (
                                <ListItem key={index}>
                                    <Button href={platform} target="_blank" color="primary">
                                        {platform}
                                    </Button>
                                </ListItem>
                            ))}
                        </>
                    )}
                    {skillResources.Documentation && (
                        <>
                            <Typography variant="h6">Documentation:</Typography>
                            {skillResources.Documentation.map((doc, index) => (
                                <ListItem key={index}>
                                    <Button href={doc} target="_blank" color="primary">
                                        {doc}
                                    </Button>
                                </ListItem>
                            ))}
                        </>
                    )}
                    {skillResources.Practice && (
                        <>
                            <Typography variant="h6">Practice:</Typography>
                            {skillResources.Practice.map((practice, index) => (
                                <ListItem key={index}>
                                    <Button href={practice} target="_blank" color="primary">
                                        {practice}
                                    </Button>
                                </ListItem>
                            ))}
                        </>
                    )}
                    {skillResources.Community && (
                        <>
                            <Typography variant="h6">Community:</Typography>
                            {skillResources.Community.map((community, index) => (
                                <ListItem key={index}>
                                    <Button href={community} target="_blank" color="primary">
                                        {community}
                                    </Button>
                                </ListItem>
                            ))}
                        </>
                    )}
                </List>
            </div>
        );
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                Resources for Your Skills
            </Typography>
            {skills.map((skill) => renderResources(skill))}
        </div>
    );
};

export default ResourcesPage;
