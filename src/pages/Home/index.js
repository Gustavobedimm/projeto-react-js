import React, { useEffect, useState } from "react";
import { AreaHome } from "./styled";
import Api from "./../../Api";
import GraficoPizza from "../../components/GraficoPizza";
import GraficoBubble from "../../components/GraficoBubble";
import { Badge, Modal, ListGroup, Card } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Link from "@material-ui/core/Link";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Typography from '@material-ui/core/Typography';




import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  btn: {
    margin: 25,
  },
  dataPickerMargin: {
    marginLeft: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#FFF",
  },
  

  rowHorver: {
    
    "&:hover": {
      background: "#d1ccc0",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  table: {
    minWidth: 650,
  },
}));

function Page() {
    //Vendedores  
    const [data, setData] = useState([]);
    //Pedidos
    const [data2, setData2] = useState([]);
    //
    const [data3, setData3] = useState([]);

    //const [totalPedAtivo, setTotalPedAtivo] = useState();
    //const [totalMercAtivo, setTotalMercAtivo] = useState();
    //const [totalDescAtivo, setTotalDescAtivo] = useState();

    //const [totalPedFaturado, setTotalPedFaturado] = useState();
    //const [totalMercFaturado, setTotalMercFaturado] = useState();
    //const [totalDescFaturado, setTotalDescFaturado] = useState();

    //const [totalPedBloqueado, setTotalPedBloqueado] = useState();
    //const [totalMercBloqueado, setTotalMercBloqueado] = useState();
    //const [totalDescBloqueado, setTotalDescBloqueado] = useState();

    //const [totalPedCancelado, setTotalPedCancelado] = useState();
    //const [totalMercCancelado, setTotalMercCancelado] = useState();
    //const [totalDescCancelado, setTotalDescCancelado] = useState();



    const [lgShow, setLgShow] = useState(false);
    const [tempPedido, setTempPedido] = useState('teste');
    const [tempCliente, setTempCliente] = useState('teste');
    const [tempVendedor, setTempVendedor] = useState('teste');

    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedDate2, setSelectedDate2] = React.useState(new Date());
    const [loading, setLoading] = React.useState(false);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleDateChange2 = (date) => {
    setSelectedDate2(date);
    };

  //------------------------------------------------------
  function CalculaTotal(cod_vendedor) {
    var indice = data2.length;
    var somaPedValor = 0;
    for (var i = 0; i < indice; i++) {
      if (
        parseInt(data2[i].Ped_Vendedores) === cod_vendedor &&
        data2[i].Ped_Situacao === "F"
      ) {
        somaPedValor = somaPedValor + parseFloat(data2[i].Ped_Valor);
      }
    }
    const formatado = somaPedValor.toFixed(2);
    return formatado;
  }
  //------------------------------------------------------
  
  function CalculaTotalMercad(cod_vendedor) {
    var indice = data2.length;
    var somaPedValorMercad = 0;
    for (var i = 0; i < indice; i++) {
      if (
        parseInt(data2[i].Ped_Vendedores) === cod_vendedor &&
        data2[i].Ped_Situacao === "F"
      ) {
        somaPedValorMercad =
          somaPedValorMercad + parseFloat(data2[i].Ped_VlrMercad);
      }
    }
    const formatado = somaPedValorMercad.toFixed(2);
    return formatado;
  }
  //------------------------------------------------------
  function CalculaTotalDesc(cod_vendedor) {
    var indice = data2.length;
    var somaPedValorDesc = 0;
    for (var i = 0; i < indice; i++) {
      if (
        parseInt(data2[i].Ped_Vendedores) === cod_vendedor &&
        data2[i].Ped_Situacao === "F"
      ) {
        somaPedValorDesc = somaPedValorDesc + parseFloat(data2[i].Ped_VlrDesc);
      }
    }
    const formatado = somaPedValorDesc.toFixed(2);
    return formatado;
  }
  
  //------------------------------------------------------
  function TestaSituacao(situacao) {
    if (situacao === "F") {
      return (
        <Badge bg="success" className="w-100">
          Faturado
        </Badge>
      );
    } else if (situacao === "A") {
      return (
        <Badge bg="primary" className="w-100">
          Ativo
        </Badge>
      );
    } else if (situacao === "B") {
      return (
        <Badge bg="warning" className="w-100">
          Bloqueado
        </Badge>
      );
    } else if (situacao === "C") {
      return (
        <Badge bg="danger" className="w-100">
          Cancelado
        </Badge>
      );
    }
  }
  //------------------------------------------------------
  
  async function loadVendedores() {
    const { data } = await Api.get("/consultarVendedores");
    setData(data);
  }
  //------------------------------------------------------
  async function loadPedidosVenda(dataInicio, dataFim) {
    setLoading(true);
    const { data } = await Api.get("/consultarPedidosVenda?dataInicio=" + dataInicio + "&dataFim=" + dataFim);
    setData2(data)
    //loadTotais(data);
    setLoading(false);
  }
  //------------------------------------------------------
  async function consultaItensPedido(nrPedido) {
    setLoading(true);
    const { data } = await Api.get("/consultaItens?PedNumero=" + nrPedido);
    setData3(data);
    setLoading(false);
  }
  //------------------------------------------------------
  async function consultaVendedor(cod_vendedor) {
    setLoading(true);
    const { data } = await Api.get("/consultaVendedor?Ped_Vendedores=" + cod_vendedor);
    setTempVendedor(data);
    setLoading(false);
  }
  //------------------------------------------------------
  async function consultaCliente(cod_cliente) {
    setLoading(true);
    const { data } = await Api.get("/consultaCliente?Cli_Codigo=" + cod_cliente);
    setTempCliente(data);
    setLoading(false);
  }
  //------------------------------------------------------
  //function loadTotais(dataP) {
    //var indice = dataP.length;
    //------------------------------
    //var somaPedValorDescAtivo = 0;
    //var somaPedValorMercadAtivo = 0;
    //var somaPedValorAtivo = 0;
    //-------------------------------
    //var somaPedValorDescFaturado = 0;
    //var somaPedValorMercadFaturado = 0;
    //var somaPedValorFaturado = 0;
    //-------------------------------
    //var somaPedValorDescBloqueados = 0;
    //var somaPedValorMercadBloqueados = 0;
    //var somaPedValorBloqueados = 0;
    //-------------------------------
    //var somaPedValorDescCancelados = 0;
    //var somaPedValorMercadCancelados = 0;
    //var somaPedValorCancelados = 0;

    //for (var i = 0; i < indice; i++) {
      
      //if(dataP[i].Ped_Situacao === 'A'){
      //  somaPedValorDescAtivo = somaPedValorDescAtivo + parseFloat(dataP[i].Ped_VlrDesc);
      //  somaPedValorMercadAtivo = somaPedValorMercadAtivo + parseFloat(dataP[i].Ped_VlrMercad);
      //  somaPedValorAtivo = somaPedValorAtivo + parseFloat(dataP[i].Ped_Valor);
      //}
      //if(dataP[i].Ped_Situacao === 'F'){
      //  somaPedValorDescFaturado = somaPedValorDescFaturado + parseFloat(dataP[i].Ped_VlrDesc);
      //  somaPedValorMercadFaturado = somaPedValorMercadFaturado + parseFloat(dataP[i].Ped_VlrMercad);
      //  somaPedValorFaturado = somaPedValorFaturado + parseFloat(dataP[i].Ped_Valor);
      //}
      //if(dataP[i].Ped_Situacao === 'B'){
      //  somaPedValorDescBloqueados = somaPedValorDescBloqueados + parseFloat(dataP[i].Ped_VlrDesc);
      //  somaPedValorMercadBloqueados = somaPedValorMercadBloqueados + parseFloat(dataP[i].Ped_VlrMercad);
      //  somaPedValorBloqueados = somaPedValorBloqueados + parseFloat(dataP[i].Ped_Valor);
      //}
      //if(dataP[i].Ped_Situacao === 'C'){
      //  somaPedValorDescCancelados = somaPedValorDescCancelados + parseFloat(dataP[i].Ped_VlrDesc);
      //  somaPedValorMercadCancelados = somaPedValorMercadCancelados + parseFloat(dataP[i].Ped_VlrMercad);
      //  somaPedValorCancelados = somaPedValorCancelados + parseFloat(dataP[i].Ped_Valor);
      //}
   // }
    //setTotalDescAtivo(somaPedValorDescAtivo.toFixed(2));
    //setTotalMercAtivo(somaPedValorMercadAtivo.toFixed(2));
    //setTotalPedAtivo(somaPedValorAtivo.toFixed(2));

    //setTotalDescFaturado(somaPedValorDescFaturado.toFixed(2));
    //setTotalMercFaturado(somaPedValorMercadFaturado.toFixed(2));
    //setTotalPedFaturado(somaPedValorFaturado.toFixed(2));

    //setTotalDescBloqueado(somaPedValorDescBloqueados.toFixed(2));
    //setTotalMercBloqueado(somaPedValorMercadBloqueados.toFixed(2));
    //setTotalPedBloqueado(somaPedValorBloqueados.toFixed(2));

    //setTotalDescCancelado(somaPedValorDescCancelados.toFixed(2));
    //setTotalMercCancelado(somaPedValorMercadCancelados.toFixed(2));
    //setTotalPedCancelado(somaPedValorCancelados.toFixed(2));
  //}
  //------------------------------------------------------
  useEffect(() => {
    loadVendedores();
    loadPedidosVenda(selectedDate, selectedDate2);

  }, []);
  //------------------------------------------------------
  
  return (
    <AreaHome>
      <Container>
 <br></br>
 {/* Componente  */}
        <Paper elevation={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.dataPickerMargin}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Data Inicio"
              value={selectedDate}
              autoOk={true}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              className={classes.dataPickerMargin}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Data Fim"
              value={selectedDate2}
              autoOk={true}
              onChange={handleDateChange2}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>

          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => loadPedidosVenda(selectedDate, selectedDate2)}
          >
            Atualizar
          </Button>
          
        </Paper>
        <br></br>
        {/* Componente */}
        <GraficoPizza  dataInicio={selectedDate} dataFim={selectedDate2}></GraficoPizza>
        <br></br>
        <GraficoBubble  dataInicio={selectedDate} dataFim={selectedDate2}></GraficoBubble>
        <br></br>
        
      
         


          

        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <br></br>
        <h5>Pedidos faturados por Vendedor</h5>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Cod</TableCell>
                <TableCell>Nome</TableCell>
                
                <TableCell align="left">Desconto Max %</TableCell>
                <TableCell align="left">Valor Mercadorias</TableCell>
                <TableCell align="left">Valor Descontos</TableCell>
                <TableCell align="left">Valor Pedido</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item) => (
                <TableRow key={item.Ven_Codigo} className={classes.rowHorver}>
                  <TableCell align="left">{item.Ven_Codigo}</TableCell>
                  <TableCell align="left">{item.Ven_Nome}</TableCell>
                 
                  <TableCell align="left">{item.Ven_DescMax}%</TableCell>
                  <TableCell align="left">
                    <b>R$ {CalculaTotalMercad(item.Ven_Codigo)}</b>
                  </TableCell>
                  <TableCell align="left">
                    <b className="text-danger">R$ - {CalculaTotalDesc(item.Ven_Codigo)}</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>R$ {CalculaTotal(item.Ven_Codigo)}</b>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell>Cod</TableCell>
                <TableCell>Nome</TableCell>
                
                <TableCell align="left">Desconto Max %</TableCell>
                <TableCell align="left">Total Mercadorias</TableCell>
                <TableCell align="left">Total Descontos</TableCell>
                <TableCell align="left">Total Pedidos</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

        <br></br>
        <h5>Pedidos do período</h5>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Numero</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Data</TableCell>
                <TableCell align="left">Hora</TableCell>
                <TableCell align="left">Vendedor</TableCell>
                <TableCell align="left">Valor Mercadoria</TableCell>
                <TableCell align="left">% Desconto</TableCell>
                <TableCell align="left">Valor Desconto</TableCell>
                <TableCell align="left">Valor Total</TableCell>
                
                <TableCell align="left">Situacao</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data2?.map((item) => (
                <TableRow key={item.Ped_Numero} className={classes.rowHorver}>
                  <TableCell align="left">
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => {
                        setLgShow(true);
                        setTempPedido(item);
                        consultaItensPedido(item.Ped_Numero);
                        consultaCliente(item.Cli_Codigo);
                        consultaVendedor(item.Ped_Vendedores);
                      }}
                    >
                      <OpenInNewIcon />
                      {item.Ped_Numero}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{item.Cli_Codigo}</TableCell>
                  <TableCell align="left">{item.Ped_Data}</TableCell>
                  <TableCell component="th" scope="row">
                    {item.Ped_Hora}
                  </TableCell>
                  <TableCell align="left">{item.Ped_Vendedores}</TableCell>
                  <TableCell align="left">R$ {item.Ped_VlrMercad}</TableCell>
                  <TableCell align="left">% {item.Ped_PercDesc}</TableCell>
                  <TableCell align="left"><b className="text-danger">R$ - {item.Ped_VlrDesc}</b></TableCell>
                  <TableCell align="left">R$ {item.Ped_Valor}</TableCell>
                  
                  
                  <TableCell align="left">
                    {TestaSituacao(item.Ped_Situacao)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell>Numero</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Data</TableCell>
                <TableCell align="left">Hora</TableCell>
                <TableCell align="left">Vendedor</TableCell>
                <TableCell align="left">Valor Mercadoria</TableCell>
                <TableCell align="left">% Desconto</TableCell>
                <TableCell align="left">Valor Desconto</TableCell>
                <TableCell align="left">Valor Total</TableCell>
                <TableCell align="left">Situacao</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <br></br>
        
      </Container>




      <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Pedido : <b className="text-primary">{tempPedido.Ped_Numero} </b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <ListGroup horizontal>
          <ListGroup.Item>
                Cliente : <b>{tempCliente.Cli_Codigo} - {tempCliente.Cli_Nome}</b> 
              </ListGroup.Item>
              <ListGroup.Item>
                Email : <b>{tempCliente.Cli_Email}</b> 
              </ListGroup.Item>
            </ListGroup>
            <ListGroup horizontal>
              <ListGroup.Item >
                Numero Pedido : <b>{tempPedido.Ped_Numero}</b>
              </ListGroup.Item>
              <ListGroup.Item>
                Situação : <b >{tempPedido.Ped_Situacao}</b>
              </ListGroup.Item>
              <ListGroup.Item>
                Data Pedido : <b >{tempPedido.Ped_Data} - {tempPedido.Ped_Hora}</b>
              </ListGroup.Item>
              
            </ListGroup>
            <ListGroup horizontal>
          <ListGroup.Item>
                Vendedor : <b>{tempVendedor.Ven_Codigo} - {tempVendedor.Ven_Nome}</b> 
              </ListGroup.Item>
              
            </ListGroup>
            <br></br>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Cod Prod.</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell align="left">Qtde</TableCell>
                    <TableCell align="left">VlrUnitario</TableCell>
                    <TableCell align="left">PercDesc</TableCell>
                    <TableCell align="left">VlrDesc</TableCell>
                    <TableCell align="left">VlrTotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data3?.map((item) => (
                    <TableRow
                      key={item.PedItm_ID}
                      className={classes.rowHorver}
                    >
                      <TableCell align="left">{item.PedItm_ID}</TableCell>
                      <TableCell align="left">{item.Pro_Codigo}</TableCell>
                      
      
                      <TableCell align="left" > <Typography variant="caption" display="block" gutterBottom>{item.produto.Pro_Descricao}</Typography></TableCell>
                      <TableCell component="th" scope="row">
                        {item.PedItm_Qtde}
                      </TableCell>
                      <TableCell align="left">
                        {item.PedItm_VlrUnitario}
                      </TableCell>
                      <TableCell align="left">{item.PedItm_PercDesc}</TableCell>
                      <TableCell align="left">{item.PedItm_VlrDesc}</TableCell>
                      <TableCell align="left">
                        <b>{item.PedItm_VlrTotal}</b>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Cod Prod.</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell align="left">Qtde</TableCell>
                    <TableCell align="left">VlrUnitario</TableCell>
                    <TableCell align="left">PercDesc</TableCell>
                    <TableCell align="left">VlrDesc</TableCell>
                    <TableCell align="left">VlrTotal</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <br></br>
            <ListGroup horizontal >
              <ListGroup.Item>
                Valor Mercadoria :<b> R$ {tempPedido.Ped_VlrMercad}</b>
              </ListGroup.Item>
              <ListGroup.Item>
                % Desconto : <b>{tempPedido.Ped_PercDesc}</b>
              </ListGroup.Item>
              <ListGroup.Item>
                Valor Desconto : <b className="text-danger">R$ -{tempPedido.Ped_VlrDesc}</b>
              </ListGroup.Item>
              <ListGroup.Item>
                Valor Total : <b className="text-success">R$ {tempPedido.Ped_Valor}</b>
              </ListGroup.Item>
            </ListGroup>
            
          </Modal.Body>
        </Modal>
       
        
    </AreaHome>

    




  );
}

export default Page;

//<div class="card-group">
        
//<Card className="card text-white bg-primary mb-1">

//<div className="card-body">
//<h5 className="card-title">Ativos</h5>

//<h6>Total Mercadoria <Badge bg="secondary">R$ {totalMercAtivo}</Badge></h6>
//<h6>Total Desconto <Badge bg="secondary">R$ {totalDescAtivo}</Badge></h6>
//<h6>Total Pedido <Badge bg="secondary">R$ {totalPedAtivo}</Badge></h6>
//</div>
//</Card>
//<Card className="card text-white bg-success mb-1">

//<div className="card-body">
//<h5 className="card-title">Faturados</h5>
//<h6>Total Mercadoria <Badge bg="secondary">R$ {totalMercFaturado}</Badge></h6>
//<h6>Total Desconto <Badge bg="secondary">R$ {totalDescFaturado}</Badge></h6>
//<h6>Total Pedido <Badge bg="secondary">R$ {totalPedFaturado}</Badge></h6>
//</div>
//</Card>
//<Card className="card text-white bg-warning mb-1">

//<div className="card-body">
//<h5 className="card-title">Bloqueados</h5>
//<h6>Total Mercadoria <Badge bg="secondary">R$ {totalMercBloqueado}</Badge></h6>
//<h6>Total Desconto <Badge bg="secondary">R$ {totalDescBloqueado}</Badge></h6>
//<h6>Total Pedido <Badge bg="secondary">R$ {totalPedBloqueado}</Badge></h6>
//</div>
//</Card>
//<Card className="card text-white bg-danger mb-1">

//<div className="card-body">
//<h5 className="card-title">Cancelados</h5>
//<h6>Total Mercadoria <Badge bg="secondary">R$ {totalMercCancelado}</Badge></h6>
//<h6>Total Desconto <Badge bg="secondary">R$ {totalDescCancelado}</Badge></h6>
//<h6>Total Pedido <Badge bg="secondary">R$ {totalPedCancelado}</Badge></h6>
//</div>
//</Card>
//</div>


