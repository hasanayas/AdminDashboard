import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { useTranslation } from 'react-i18next';

const Card9 = () => {
  const { t } = useTranslation();

  return (
    <Card
      size="lg"
      variant="solid"
      color="neutral"
      invertedColors
      sx={{ bgcolor: 'neutral.900' }}
    >
      <Chip size="sm" variant="outlined">
        {t('components.Cards.Card9.mostPopular')}
      </Chip>
      <Typography level="h2" fontSize="xl3">
        {t('components.Cards.Card9.unlimited')}
      </Typography>
      <Divider inset="none" />
      <List
        size="sm"
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          mx: 'calc(-1 * var(--ListItem-paddingX))',
        }}
      >
        <ListItem>
          <ListItemDecorator>
            <Check />
          </ListItemDecorator>
          {t('components.Cards.Card9.virtualCreditCards')}
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <Check />
          </ListItemDecorator>
          {t('components.Cards.Card9.financialAnalytics')}
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <Check />
          </ListItemDecorator>
          {t('components.Cards.Card9.checkingAccount')}
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <Check />
          </ListItemDecorator>
          {t('components.Cards.Card9.apiIntegration')}
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <Check />
          </ListItemDecorator>
          {t('components.Cards.Card9.cancelAnytime')}
        </ListItem>
      </List>
      <Divider inset="none" />
      <CardActions>
        <Typography level="h5" sx={{ mr: 'auto' }}>
          5.990€{' '}
          <Typography fontSize="sm" textColor="text.tertiary">
            / {t('components.Cards.Card9.month')}
          </Typography>
        </Typography>
        <Button endDecorator={<KeyboardArrowRight />}>
          {t('components.Cards.Card9.startNow')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Card9;