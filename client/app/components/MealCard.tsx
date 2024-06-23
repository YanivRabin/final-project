import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

interface MealCardProps {
  mealType: string;
  options: {
    option: string;
    items: Array<{ name: string; carbs: number; fats: number; proteins: number; amount: string }>;
  };
}

const styles = {
  details: {
    padding: '1rem',
    borderTop: '1px solid #e1e1e1',
  },
  value: {
    padding: '1rem 2rem',
    borderTop: '1px solid #e1e1e1',
    color: '#899499',
  },
  mealType: {
    padding: '1.5rem 0rem',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#3D2D69',
  },
  optionTitle: {
    padding: '1rem 0rem',
    fontWeight: 'bold',
    color: '#3D2D69',
  },
  item: {
    padding: '0.5rem 0rem',
    color: '#3D2D69',
  },
  card: {
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  cardContent: {
    padding: '20px',
  },
};

const MealCard: React.FC<MealCardProps> = ({ mealType, options }) => {
  return (
    <Card variant="outlined" sx={styles.card}>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Typography variant="h5" sx={styles.mealType}>
          {mealType}
        </Typography>
      </Grid>
      <CardContent sx={styles.cardContent}>
        <Typography variant="h6" sx={styles.optionTitle}>
          {options.option}
        </Typography>
        {options.items.map((item, idx) => (
          <Box key={idx} sx={styles.item}>
            <Typography>
              {item.name}: Carbs {item.carbs}g, Fats {item.fats}g, Proteins {item.proteins}g, Amount {item.amount}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default MealCard;
