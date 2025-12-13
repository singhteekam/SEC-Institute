import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
  Link,
  Button,
  CircularProgress
} from "@mui/material";
import VisitorBadge from "./VisitorBadge";
import { useState } from "react";
import DeveloperInfo from "./modals/DeveloperModal";

export default function Footer() {
  const theme = useTheme();

    const [open, setOpen] = useState(false);

  const handleClick = (text) => {
    if (text === 'Developer Info') {
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        mt: 6,
        pt: 6,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Footer with Columns */}
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3} sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Help & Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: somnatheducationinstitute@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Call: +91 6395267390
            </Typography>
            <Typography variant="body2">
              Somnath Marriage Home, NH-19, Mathura, UP - 281001
            </Typography>
          </Grid>

          {/* Important Links */}
          <Grid item xs={12} sm={6} md={3} sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Important Links
            </Typography>
            {[
              { text: "Home", href: "/" },
              // { text: "About", href: "#" },
              // { text: "Courses", href: "/courses" },
              // { text: "Branches", href: "/branches" },
              { text: "Privacy Policy", href: "/privacypolicy" },
              { text: "Terms & Conditions", href: "/termsandconditions" },
              { text: "Developer Info", href: "#" },
            ].map((link) => (
              <Typography key={link.text} variant="body2" sx={{ color: '#EED6D3', mb: 1 }}>
          <Link
            component={link.text === 'Developer Info' ? 'button' : RouterLink}
            to={link.text !== 'Developer Info' ? link.href : undefined}
            onClick={() => handleClick(link.text)}
            underline="none"
            sx={{
              color: '#EED6D3',
              cursor: 'pointer',
              '&:hover': {
                color: '#fff',
                textDecoration: 'underline',
              },
            }}
          >
            {link.text}
          </Link>
        </Typography>
            ))}
            <DeveloperInfo open={open} onClose={() => setOpen(false)} />
          </Grid>

          {/* Map Column */}
          <Grid item xs={12} sm={12} md={5} sx={{ flexGrow: 2 }}>
            <Typography variant="h6" gutterBottom>
              Our Location
            </Typography>
            <Box sx={{ borderRadius: 1, overflow: "hidden", mt: 1 }}>
              <iframe
                title="SEC Institute Location"
                src="https://www.google.com/maps?q=27.454789, 77.682027&z=18&output=embed" // Replace with real link
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Box>
            {/* <Button
              variant="contained"
              color="primary"
              href="https://www.google.com/maps/search/?api=1&query=27.454789, 77.682027"
              target="_blank"
              rel="noopener noreferrer"
            >
              📍 Open in Google Maps
            </Button> */}
          </Grid>
        </Grid>

        {/* Bottom Footer */}
        <Box
          mt={6}
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          // alignItems={{ xs: "flex-start", md: "center" }}
          // textAlign={{ xs: "left", md: "center" }}
          gap={2}
        >
          <Typography
            variant="body2"
            sx={{ fontSize: "0.85rem", color: "#ccc" }}
          >
            © 2025 SEC Institute. All Rights Reserved.
          </Typography>

          <VisitorBadge />

          {/* <Box textAlign="right">
            <Typography variant="body2" sx={{ color: "#ccc" }}>
              Developed by: TEEKAM SINGH
            </Typography>
            <Typography variant="body2">
              <Link
                href="https://www.singhteekam.in"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{
                  color: "#EED6D3",
                  "&:hover": { color: "#fff", textDecoration: "underline" },
                }}
              >
                www.singhteekam.in
              </Link>
            </Typography>
          </Box> */}
        </Box>
      </Container>
    </Box>
  );
}
