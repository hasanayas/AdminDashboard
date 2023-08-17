import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";

import { useTranslation } from 'react-i18next';


const Card2 = () => {
  const { t } = useTranslation();

  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardContent>
        <Typography level="h2" fontSize="md">
          <Link href="#multiple-actions" overlay underline="none">
            {t("components.Cards.Card2.title")}
          </Link>
        </Typography>
        <Typography level="body2" sx={{ mt: 0.5 }}>
          <Link href="#multiple-actions">{t('components.Cards.Card2.location')}</Link>
        </Typography>
      </CardContent>
      <AspectRatio ratio="2">
        <img
          src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
          srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <IconButton
        aria-label={t("components.Cards.Card2.likeLabel")}
        size="md"
        variant="solid"
        color="danger"
        sx={{
          position: "absolute",
          zIndex: 2,
          borderRadius: "50%",
          right: "1rem",
          bottom: 0,
          transform: "translateY(50%)",
        }}
      >
        <Favorite />
      </IconButton>
    </Card>
  );
};

export default Card2;
