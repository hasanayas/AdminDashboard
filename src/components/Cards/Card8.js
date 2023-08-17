import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

import { useTranslation } from 'react-i18next';

const Card8 = () => {
  const { t } = useTranslation();

  return (
    <Card
      variant="solid"
      color="primary"
      invertedColors
      sx={{
        width: 343,
        maxWidth: '100%',
        // to make the demo resizable
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <Typography level="body3">{t('components.Cards.Card8.license')}</Typography>
      <Typography level="h2">
        $58{' '}
        <Typography fontSize="sm" textColor="text.tertiary">
          {t('components.Cards.Card8.perMonth')}
        </Typography>
      </Typography>
      <Typography level="body2">
        {t('components.Cards.Card8.description')}
      </Typography>
      <CardActions>
        <Button variant="solid">{t('components.Cards.Card8.purchaseNow')}</Button>
      </CardActions>
      <Typography level="body2" textAlign="center">
        {t('components.Cards.Card8.compatibleWith')}
      </Typography>
    </Card>
  );
};

export default Card8;
