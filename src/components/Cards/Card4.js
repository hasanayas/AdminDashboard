import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

import { useTranslation } from 'react-i18next';

const Card4 = () => {
  const { t } = useTranslation();

  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        // to make the card resizable
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Avatar src="/static/images/avatar/1.jpg" size="lg" />
        <AvatarGroup size="sm" sx={{ '--Avatar-size': '28px' }}>
          <Avatar src="/static/images/avatar/2.jpg" />
          <Avatar src="/static/images/avatar/3.jpg" />
          <Avatar src="/static/images/avatar/4.jpg" />
          <Avatar>{t('components.Cards.Card4.avatarText')}</Avatar>
        </AvatarGroup>
      </Box>
      <CardContent>
        <Typography level="h5" fontWeight="lg">
          {t('components.Cards.Card4.title')}
        </Typography>
        <Typography level="body2">
          {t('components.Cards.Card4.description')}
        </Typography>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
        <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
          <FavoriteBorder />
        </IconButton>
        <Button variant="outlined" color="neutral">
          {t('components.Cards.Card4.viewButton')}
        </Button>
        <Button variant="solid" color="primary">
          {t('components.Cards.Card4.joinButton')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Card4;
