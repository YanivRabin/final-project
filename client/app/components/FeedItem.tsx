import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface FeedItemProps {
  title: string;
  description: string;
  date: string;
}

const FeedItem: React.FC<FeedItemProps> = ({ title, description, date }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeedItem;
