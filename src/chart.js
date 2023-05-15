import { useRef } from "react";
import Chart from "react-apexcharts";
import React, { useEffect, useState } from 'react';
import {sortMapByValue} from "./array.js";
import axios from 'axios';

import { CSVLink } from "react-csv";
import{BsGithub} from "react-icons/bs";
import {BsLinkedin} from "react-icons/bs";

const CharT = () => {
  const chartRef = useRef(null);
  const fileName = "chartData.csv";


  const [csvData, setCsvData] = useState([]);
    const [wordFrequency, setWordFrequency] = useState(new Map());
    const [numbers, setNumbers] = useState([]);
    const [chartData, setChartData] = useState([]);

    const fetchData = async () => {  
        try {
          const url = 'https://www.terriblytinytales.com/test.txt';
          const response = await axios.get(url);
          const fileContent = response.data;
          
          const words = fileContent
            .replace(/[^A-Za-z\s/:.@/]+/g, '')
            
            .split(/\/|\s+|\.|@/)
            
            console.log(words);
           const frequencyMap = new Map();
           const csvData = [
            ["Words", "Frequency"]
          ];
          for (const word of words) {
          const normalizedWord = word.toUpperCase();
          
            const count = frequencyMap.get(normalizedWord) || 0;
            frequencyMap.set(normalizedWord, count + 1);
            
          }
          
           
          const sortedFrequencyMap = sortMapByValue(frequencyMap , 20);
         setWordFrequency( sortedFrequencyMap);
        

           
          
      
            
            
          
        } catch (error) { 
          console.error('Error fetching data:', error.message);
        }
      };
      useEffect(() => { 
        fetchData(); 
      },[]);  

    useEffect(()=>{
     console.log(wordFrequency);
     const limit = 21;
     setNumbers(Array.from(wordFrequency.values()).slice(0, limit));
     setChartData(Array.from(wordFrequency.keys()).slice(0, limit));
     const csv = Array.from(wordFrequency.entries())
      .map(([word, frequency]) => `${word},${frequency}`)
      .join('\n');

    // Update csvData state
    setCsvData(csv);

    },[wordFrequency])
 
  const data = { 
    series: [{
      name: 'Frequency',
        data: numbers
      }],
    options: {
        chart: {
            toolbar: {
                show: false // hide the toolbar including the download button
              },
          height: 350,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        tooltip: {
          enabled: true,
          theme: "dark",
          },
        plotOptions: {
          bar: {
            columnWidth: '100%',
            strokeWidth: 2,
            borderRadius:4,
            colors: {
                // Set the border color of all bars to red
                borderColor: 'red'
              }
           
            
          }
        },
        stroke:{
            width: 2,
            colors: ['#2CD3E1']
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        yaxis:{
          labels: {
            style: {
              colors:'white',
              fontSize: '15px',
            }
          },
          title: {
            text: 'Frequency of Words',
            offsetX: -19,
            style: {
              color: 'white',
              fontSize: '25px',
            }
          },

        },
        title: {
          text: 'Histogram of 20 Most Occuring Words from API',
          
          
          align: 'center',
          style: {
            color: 'white',
            fontSize: '25px',
            offset:340,
          }
        },
        
        
        xaxis: { 
          categories:chartData,
          labels: {
            style: {
              colors:'white',
              fontSize: '15px',
              

              
            }
          }
        }
      },
  };
  return (
    <div className='chart'>
    <div className="chart-top">
     <a href="https://github.com/harshprateek39?tab=repositories"> <button style={{ display:"flex" ,backgroundColor:"#36363682", color:"white " ,gap:"1rem", alignItems:"center" ,fontSize:"20px" , border:"none" ,borderRadius:"10px" ,cursor:"pointer"}}><BsGithub/>Github</button></a>
     <a href="https://www.linkedin.com/in/harsh-prateek-87434b1b7/"> <button style={{ display:"flex" ,backgroundColor:"#36363682", color:"white " ,gap:"1rem", alignItems:"center" ,fontSize:"20px" , border:"none" ,borderRadius:"10px" ,cursor:"pointer" }}><BsLinkedin/>LinkedIn</button></a>
      
    </div>
       <Chart  className="cdata" options={data.options} ref={chartRef} series={data.series} type="bar"  height="400px"    />
       <div>
       <CSVLink data={csvData} filename={fileName}><button className="btn">EXPORT </button></CSVLink>
    </div>
    </div>
  )
}

export default CharT;