import React, { useEffect ,useState} from 'react'
import Chart from 'react-google-charts';

export default function Linechart({historicalData}) {
    const [data ,setData] = useState([['data','prices']]);
    console.log(historicalData.prices);
    useEffect(()=>{

        let dataCopy = [['data','prices']];
        if(historicalData.prices){
            
            historicalData.prices.map((item)=>{
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]])
        })
            setData(dataCopy)
        }
    },[historicalData]);
    

    useEffect(()=>{
      const disableRightClick=(e)=>{
        e.preventDefault();
      }
       document.addEventListener("contextmenu",disableRightClick);
       return()=>{document.removeEventListener('contextmenu',disableRightClick)};
    },[])

    

  return (
    <Chart 
    chartType='LineChart'
    data = {data}
    height="100%"
    legendTogggle 
    />
  )
}
