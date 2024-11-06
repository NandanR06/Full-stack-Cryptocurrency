import React, { useEffect ,useState} from 'react'
import chart from 'react-google-charts'

export default function Linechart({historicalData}) {
    const [data ,setData] = useState([['data','prices']]);
    useEffect(()=>{

        let dataCopy = [['data','prices']];
        if(historicalData.prices){
            historicalData.prices.map((item)=>(
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5), item[1]}`])
            ))
            setData(dataCopy)
        }
    },[historicalData]);

  return (
    <chart  
    chartType='LineChart'
    data = {data}
    height="100%"
    legendTogggle 
    />
  )
}
