import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button }
from '@material-ui/core/';

import { TarefasToolbar, TarefasTable } from './components';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefaList = () => {
  const classes = useStyles();
  const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';
  const headers = {'x-tenant-id' : localStorage.getItem('email_usuario_logado')};
  const [tarefas, setTarefas] = useState([]);
  const [openDialog,setopenDialog] = useState(false);
  const [dialogMessage,setDialogMessage] = useState('');

  const salvar = (tarefa) =>{
      axios.post(API_URL, tarefa, {
        headers:headers
      }).then(response =>{
        const novaTarefa = response.data;
        setTarefas([...tarefas,novaTarefa]);
        setopenDialog(true);
        setDialogMessage(`Item adicionado com sucesso !`);
      }).catch(erro =>{
        setopenDialog(true);
        setDialogMessage(`Ocorreu um erro ${erro}`);
      })
  }

  const listarTarefas = () => {
    axios.get(API_URL,{
        headers:headers
    }).then(response =>{
        const listaDeTarefas = response.data;
        setTarefas(listaDeTarefas);
    }).catch(erro =>{
      setopenDialog(true);
      setDialogMessage(`Ocorreu um erro ${erro}`);
    });
  }

  const alterarStatus = (id) => {
      axios.patch(`${API_URL}/${id}`, null,{
          headers:headers
      }).then(response => {
        const lista = [...tarefas]
        lista.map(tarefa =>{
            if(tarefa.id === id){       
              tarefa.done = false;                   
            }
        })
        setTarefas(lista);
        setopenDialog(true);
        setDialogMessage(`Item adicionado`);      
      }).catch( erro => {
        setopenDialog(true);
        setDialogMessage(`Ocorreu um erro ${erro}`);
      });
  }

  const deletar = (id) => {
    axios.delete(`${API_URL}/${id}`,{
      headers:headers
  }).then(response => {
        const lista = tarefas.filter(tarefa => tarefa.id!== id);
        setTarefas(lista);
        setopenDialog(true);
        setDialogMessage(`Item excluído`); 
    }).catch(erro => {
      setopenDialog(true);
      setDialogMessage(`Ocorreu um erro ${erro}`);      
    })
  }

  useEffect(() => {
      listarTarefas();
  }, []);

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable deleteAction={deletar} alterarStatus={alterarStatus} tarefas={tarefas} />
      </div>
      <Dialog open={openDialog} onClose={e => setopenDialog(false)}>
          <DialogTitle>Atenção</DialogTitle>
          <DialogContent>
              {dialogMessage}
          </DialogContent>
          <DialogActions>
            <Button onClick={e => setopenDialog(false)}>
              fechar
            </Button>
          </DialogActions>
      </Dialog>
    </div>
  );
};

export default TarefaList;
