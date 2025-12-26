import {
  List,
  ListItem,
  ListItemText,
  Link,
  Paper,
  Typography,
  Container,
  Box
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "axios";
import React, { useEffect, useState } from "react";
import links from "./blogs.json"

const Blogs = () => {

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" gutterBottom>
        BloggerSpace blogs
      </Typography>

      <List>
        {links &&
          links.slice(10).map((link, index) => (
            <ListItem
              key={index}
              sx={{
                py: 0.5,
                borderBottom: "1px solid #eee",
              }}
            >
              <Box sx={{ mr: 2, color: "gray", minWidth: 24 }}>
                {index + 1}.
              </Box>
              <ListItemText
                primary={
                  <Link
                    href={`https://bloggerspace.singhteekam.in/`+link.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    
                  >
                    {link.title}
                    <OpenInNewIcon sx={{ fontSize: 16 }} />
                  </Link>
                }
              />
            </ListItem>
          ))}
      </List>
    </Container>
  );
};

export default Blogs;
