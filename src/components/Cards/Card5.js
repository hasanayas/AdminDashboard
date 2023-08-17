import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import CardOverflow from '@mui/joy/CardOverflow';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';

import { useTranslation } from 'react-i18next';

const Card5 = () => {
  const { t } = useTranslation();

  return (
    <Card
      data-resizable
      sx={{
        textAlign: 'center',
        alignItems: 'center',
        width: 343,
        // to make the demo resizable
        overflow: 'auto',
        resize: 'horizontal',
        '--icon-size': '100px',
      }}
    >
      <CardOverflow variant="solid" color="warning">
        <AspectRatio
          variant="outlined"
          color="warning"
          ratio="1"
          sx={{
            m: 'auto',
            transform: 'translateY(50%)',
            borderRadius: '50%',
            width: 'var(--icon-size)',
            boxShadow: 'sm',
            bgcolor: 'background.surface',
            position: 'relative',
          }}
        >
          <div>
            <BakeryDiningIcon sx={{ fontSize: '4rem' }} />
          </div>
        </AspectRatio>
      </CardOverflow>
      <Typography level="h2" fontSize="xl" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
        {t('components.Cards.Card5.title')}
      </Typography>
      <CardContent sx={{ maxWidth: '40ch' }}>
        {t('components.Cards.Card5.content')}
      </CardContent>
      <CardActions
        orientation="vertical"
        buttonFlex={1}
        sx={{
          '--Button-radius': '40px',
          width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
        }}
      >
        <Button variant="solid" color="warning">
          {t('components.Cards.Card5.shareButton')}
        </Button>
        <Button variant="plain" color="neutral">
          {t('components.Cards.Card5.skipButton')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Card5;
