import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

import i18n from '../../i18n'; 


export default function BasicCard() {


  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <div>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          {i18n.t('components.Cards.Card1.title')}
        </Typography>
        <Typography level="body2">{i18n.t('components.Cards.Card1.date')}</Typography>
        <IconButton
          aria-label={i18n.t('components.Cards.Card1.bookmarkLabel')}
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
          srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
          loading="lazy"
          alt={i18n.t('components.Cards.Card1.imgAlt')}
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body3">{i18n.t('components.Cards.Card1.totalPrice')}</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {i18n.t('components.Cards.Card1.price')}
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label={i18n.t('components.Cards.Card1.explore')}
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          {i18n.t('components.Cards.Card1.explore')}
        </Button>
      </CardContent>
    </Card>
  );
}
