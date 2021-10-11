import React, { useEffect, useState, useCallback } from "react";
import { Chart } from "react-google-charts";
import Api from "../../Api";

function App({ dataInicio, dataFim }) {
  const [options, setOptions] = useState({ title: "Peidos de Venda" });
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
    var somaPedValorAtivo = 0;
    var somaPedValorFaturado = 0;
    var somaPedValorBloqueado = 0;
    var somaPedValorCancelado = 0;
    listaPedidos.forEach((item) => {
      if (item.Ped_Situacao === "F") {
        somaPedValorFaturado = somaPedValorFaturado + parseFloat(item.Ped_Valor);
      }

      if (item.Ped_Situacao === "A") {
        somaPedValorAtivo = somaPedValorAtivo + parseFloat(item.Ped_Valor);
      }

      if (item.Ped_Situacao === "B") {
        somaPedValorBloqueado = somaPedValorBloqueado + parseFloat(item.Ped_Valor);
      }

      if (item.Ped_Situacao === "C") {
        somaPedValorCancelado = somaPedValorCancelado + parseFloat(item.Ped_Valor);
      }
    });

    return [
      ["Situação", "Total"],
      ["Ativo", somaPedValorAtivo],
      ["Cancelados", somaPedValorCancelado],
      ["Bloqueado", somaPedValorBloqueado],
      ["Faturado", somaPedValorFaturado],
      
      
    ];

    
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="PieChart"
            data={dataGrafico}
            options={options}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
