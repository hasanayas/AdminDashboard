import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';

import { useTranslation } from 'react-i18next';


export default function OverflowCard() {
  const { t } = useTranslation();

  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
            srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="h2" fontSize="md">
          {t('components.Cards.Card3.title')}
        </Typography>
        <Typography level="body2" sx={{ mt: 0.5 }}>
          {t('components.Cards.Card3.location')}
        </Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body3" fontWeight="md" textColor="text.secondary">
            {t('components.Cards.Card3.viewsLabel')}
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body3" fontWeight="md" textColor="text.secondary">
            {t('components.Cards.Card3.timeLabel')}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
