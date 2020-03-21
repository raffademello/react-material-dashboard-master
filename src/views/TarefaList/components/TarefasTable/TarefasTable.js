import React, { useState } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const TarefasTable = props => {
  const { className, tarefas, ...rest } = props;
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tarefas.map(tarefa=>{
                      return(
                        <TableRow key={tarefa.id}>
                            <TableCell>{tarefa.id}</TableCell>
                            <TableCell>{tarefa.descricao}</TableCell>
                            <TableCell>{tarefa.categoria}</TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                              <IconButton onClick={e => props.alterarStatus(tarefa.id)}>
                                {tarefa.done ? <DoneAllIcon/> : <AccessTimeIcon color="secondary"/>}
                              </IconButton>
                              <IconButton onClick={e => props.deleteAction(tarefa.id)}>
                                <DeleteIcon/>
                              </IconButton>
                            </TableCell>
                        </TableRow>
                      )
                  })}
                </TableBody>
              </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

TarefasTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default TarefasTable;
