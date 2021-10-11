import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SyncIcon from '@material-ui/icons/Sync';
import { ButtonFloating } from './styled';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtons() {
  const classes = useStyles();

  return (
      <ButtonFloating>
    <div className={classes.root}>
      <Fab color="primary" aria-label="add">
        
        <SyncIcon />
      </Fab>
      
      
    </div>
    </ButtonFloating>
  );
}
