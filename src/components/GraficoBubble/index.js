import React, { useEffect, useState, useCallback } from "react";
import { Chart } from "react-google-charts";
import Api from "../../Api";

function App({ dataInicio, dataFim }) {
  const [options, setOptions] = useState({ title: "Peidos de Venda",hAxis: { title: 'Data/Hora' },
  vAxis: { title: 'Valor' },
  bubble: { textStyle: { fontSize: 11 } }, });
  const [dataGrafico, setDataGrafico] = useState();
  
  const loadPedidosVenda = useCallback(async () => {
    const { data } = await Api.get("/consultarPedidosVenda?dataInicio=" + dataInicio + "&dataFim=" + dataFim);
    const dadosProcessados = processamento(data);
    setDataGrafico(dadosProcessados);
  }, [dataFim, dataInicio]);


  
  https://pt-br.reactjs.org/docs/hooks-reference.html#usecallback

  useEffect(() => {
    loadPedidosVenda();
  }, [loadPedidosVenda]);

  function processamento(listaPedidos) {
    
    var retorno = [['ID', 'Data/Hora', 'Valor', 'Vendedor', 'Valor'],];
    listaPedidos.forEach((item) => {
      var dt = item.Ped_Data;
      var hr = item.Ped_Hora;
      var ano,mes,dia,hora,minuto;
      ano = dt.substring(0,4);
      mes = dt.substring(5,7);
      dia = dt.substring(8,10);
      hora = hr.substring(0,2);
      minuto = hr.substring(3,5);
      console.log("ano : " +ano)
      console.log("mes " + mes);
      console.log("dia " + dia);
      var dataDoPedido = new Date(ano, mes, dia, hora, minuto);
      retorno.push([item.Ped_Situacao, dataDoPedido, item.Ped_Valor, item.Ped_Vendedores, item.Ped_Valor],)  
    });

    
    return retorno;

    
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="BubbleChart"
            data={dataGrafico}
            options={options}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
