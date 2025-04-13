import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, List, ListItem, Button, Card } from '@mui/material';
import Masonry from 'react-masonry-css'
const ResourcesPage = () => {
    const location = useLocation();
    const { skills } = location.state || { skills: [] };



    const resources = require('../helper_json/recommandation_urls.json'); // Import your JSON file

    const renderResources = (skill) => {
        const skillsLower = skill.toLowerCase();
        const skillResources = resources[skillsLower];
        if (!skillResources) return null;

        return (
            <div key={skill} style={{}}>
                <Card style={{
                    marginBottom: '15px',
                    boxShadow: "none",
                    border: "1px solid #808080",
                    borderRadius: "12px",
                    padding: "12px"
                }}>

                    <Typography variant="h5">{skill}</Typography>

                    <List>
                        {/* <Card style={{
                            marginBottom: '15px',
                            boxShadow: "none",
                            border: "1px solid black",
                            borderRadius: "12px",
                            padding: "12px"
                        }}> */}
                            {skillResources.Platforms && (
                                <>
                                    <Typography variant="h6">Platforms:</Typography>
                                    {skillResources.Platforms.map((platform, index) => (
                                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', listStylePosition: 'inside', pl: 1 }} >
                                            <Button href={platform} target="_blank" color="primary">
                                                {platform}
                                            </Button>
                                        </ListItem>
                                    ))}

                                </>
                            )}
                        {/* </Card> */}
{/* 
                        <Card style={{
                            marginBottom: '15px',
                            boxShadow: "none",
                            border: "1px solid black",
                            borderRadius: "12px",
                            padding: "12px"
                        }}> */}
                            {(skillResources.Documentation && (
                                <>
                                    <Typography variant="h6">Documentation:</Typography>
                                    {skillResources.Documentation.map((doc, index) => (
                                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', listStylePosition: 'inside', pl: 1 }} >
                                            <Button href={doc} target="_blank" color="primary">
                                                {doc}
                                            </Button>
                                        </ListItem>
                                    ))}
                                </>
                            )) || (skillResources.Frameworks && (
                                <>
                                    <Typography variant="h6">Frameworks:</Typography>
                                    {skillResources.Frameworks.map((doc, index) => (
                                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', listStylePosition: 'inside', pl: 1 }} >
                                            <Button href={doc} target="_blank" color="primary">
                                                {doc}
                                            </Button>
                                        </ListItem>
                                    ))}
                                </>
                            )) || (skillResources.Tools && (
                                <>
                                    <Typography variant="h6">Tools:</Typography>
                                    {skillResources.Tools.map((doc, index) => (
                                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', listStylePosition: 'inside', pl: 1 }} >
                                            <Button href={doc} target="_blank" color="primary">
                                                {doc}
                                            </Button>
                                        </ListItem>
                                    ))}
                                </>
                            )) || (skillResources.Services && (
                                <>
                                    <Typography variant="h6">Services:</Typography>
                                    {skillResources.Services.map((doc, index) => (
                                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', listStylePosition: 'inside', pl: 1 }} >
                                            <Button href={doc} target="_blank" color="primary">
                                                {doc}
                                            </Button>
                                        </ListItem>
                                    ))}
                                </>
                            ))}

                        {/* </Card> */}

                        {/* <Card style={{
                            marginBottom: '15px',
                            boxShadow: "none",
                            border: "1px solid black",
                            borderRadius: "12px",
                            padding: "12px"
                        }}> */}
                            {skillResources.Practice && (
                                <>
                                    <Typography variant="h6">Practice:</Typography>
                                    {skillResources.Practice.map((practice, index) => (
                                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', listStylePosition: 'inside', pl: 1 }} >
                                            <Button href={practice} target="_blank" color="primary">
                                                {practice}
                                            </Button>
                                        </ListItem>
                                    ))}
                                </>
                            )}
                        {/* </Card> */}

                        {/* <Card style={{
                            marginBottom: '15px',
                            boxShadow: "none",
                            border: "1px solid black",
                            borderRadius: "12px",
                            padding: "12px"
                        }}> */}
                            {skillResources.Community && (
                                <>
                                    <Typography variant="h6">Community:</Typography>
                                    {skillResources.Community.map((community, index) => (
                                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', listStylePosition: 'inside', pl: 1 }} >
                                            <Button href={community} target="_blank" color="primary">
                                                {community}
                                            </Button>
                                        </ListItem>
                                    ))}
                                </>
                            )}
                        {/* </Card> */}

                    </List>
                </Card>
            </div>
        );
    };

    return (
        <div style={{
            backgroundColor: "#fff", // 1st white 
            minHeight: "100vh",
            minWidth: "100vw",
            padding: "15px",
            boxSizing: "border-box"
        }}>
            <div style={{
                backgroundColor: "#BD94F0",  //2nd purple 
                minHeight: "calc(100vh - 30px)",
                minWidth: "calc(100vw - 30px)",
                padding: "75px",
                borderRadius: "20px",
                boxSizing: "border-box"
            }}>
                <div style={{
                    backgroundColor: "#fff", // 3rd white 
                    width: "100%",
                    minHeight: "calc(100vh - 185px)",
                    borderRadius: "20px",
                    position: "relative",
                    overflow: "auto",
                    boxSizing: "border-box"
                }}>
                    <div style={{ padding: '52px', margin: '0 auto' }}>
                        <Typography variant="h4" gutterBottom sx={{marginBottom:"40px"}}>
                            Resources for Your Skills
                        </Typography>
                        <Masonry
                            breakpointCols={2}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">
                            {skills.map((skill) => renderResources(skill))}
                        </Masonry>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
