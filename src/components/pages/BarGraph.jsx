import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import Box from '@mui/material/Box';
import "./BarGraph.css";
import ip from '../../ipaddr.js'
import Loading from '../Loading'

function BarGraph({token}) {
  const [data, setDatabaseData] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('Linux');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [domainNames, setDomainNames] = useState([]); // Added domainNames state
  const [loading, setLoading] = useState(false)
  const [initialData, setInitialData] = useState({
    options: {
      colors: ["#FF6384", "#36A2EB", "#FFCE56"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: domainNames, // Use domainNames as categories
      },
    },
    series: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId') 
      try {
        const userId = localStorage.getItem('userId')
        const response = await fetch(
          `http://${ip}:8000/api/quiz-history/`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        const fetchedData = await response.json();

        if (fetchedData) {
          setDatabaseData(fetchedData);

          const uniqueDomainNames = [...new Set(fetchedData.map(item => item.domain))];
          setDomainNames(uniqueDomainNames);
        } else {
          console.error('Fetched data is undefined.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    setLoading(true)

    fetchData();
  }, []);

  useEffect(() => {
    const difficultyLevels = [...new Set(data.map(item => item.difficulty_level))];
    const filteredData = data.filter(item =>
      (!selectedDomain || item.domain === selectedDomain) &&
      (!selectedDifficulty || item.difficulty_level === selectedDifficulty)
    );

    const updatedData = {
      options: {
        colors: selectedDomain && selectedDifficulty
          ? ["#FF6384"]
          : ["#FF6384", "#36A2EB", "#FFCE56"],
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: selectedDomain === "All Domains"
            ? domainNames
            : difficultyLevels.filter(difficulty =>
              filteredData.some(item =>
                item.domain === selectedDomain && item.difficulty_level === difficulty
              )
            ),
        },
      },
      
      series: [],
    };

    if (selectedDomain && selectedDifficulty) {
      // Mapping series data when both domain and difficulty are selected
      const selectedSeries = filteredData
        .filter(item => item.domain === selectedDomain && item.difficulty_level === selectedDifficulty)
        .map(item => ({
          x: item?.submission_time || 0,
          y: item?.score !== undefined ? item.score : 0,
        }));

      updatedData.series = [{
        name: `${selectedDomain}-${selectedDifficulty}`,
        data: selectedSeries,
      }];
    } else if (selectedDomain && !selectedDifficulty) {
      // Mapping series data when only domain is selected
      updatedData.series = difficultyLevels.slice(0, 3).map(difficulty => {
        const seriesData = filteredData
          .filter(item => item.domain === selectedDomain && item.difficulty_level === difficulty)
          .map(item => ({
            x: item?.submission_time || 0,
            y: item?.score !== undefined ? item.score : 0,
          }));

        return {
          name: `${selectedDomain}-${difficulty}`,
          data: seriesData,
        };
      });
    } else {
      const maxScoreData = domainNames.map(domain => {
        const topDifficulties = difficultyLevels.slice(0, 3);
        const seriesDataForDomain = topDifficulties.map(difficulty => {
          const domainData = filteredData
            .filter(item => item.domain === domain && item.difficulty_level === difficulty)
            .map(item => ({
              x: domain,
              y: item?.score !== undefined ? item.score : 0,
            }));

          const maxScoreForDifficulty = Math.max(...domainData.map(score => score.y), 0);

          return {
            name: `${domain}-${difficulty}`,
            data: domainData,
            maxScore: maxScoreForDifficulty,
          };
        });

        return seriesDataForDomain;
      }).flat();

      if (maxScoreData && maxScoreData.length > 0) {
        updatedData.series = maxScoreData;
      } else {
        console.error('Max Score Data is undefined or empty.');
        updatedData.series = [{ data: [] }];
      }

      updatedData.options.xaxis.categories = domainNames;

      updatedData.options.colors = domainNames.map((_, index) => `#${index % 2 ? 'FF6384' : '36A2EB'}`);
    }
    setLoading(false)
    setInitialData(updatedData);
  }, [data, selectedDomain, selectedDifficulty, domainNames]);

  const handleDomainChange = (event) => {
    const selectedDomain = event.target.value;
    setSelectedDomain(selectedDomain);
    setSelectedDifficulty('');
  };

  const handleDifficultyChange = (event) => {
    const selectedDifficulty = event.target.value;
    setSelectedDifficulty(selectedDifficulty);
  };

  return (
    loading ? <Loading/> : (
    <>
       <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="App">
            <h1 style={{ color: '#1565C0' }}>
              Bar Chart <i className="fas fa-chart-bar"></i>
            </h1>
            <div className="divider" style={{ borderBottom: '2px solid #1565C0', fontWeight: 'bold', marginBottom: '10px' }}></div>
            <div className="dropdown-container">
              <label htmlFor="domainDropdown">Select Domain:</label>
              <select id="domainDropdown" onChange={handleDomainChange} value={selectedDomain}>
                {domainNames.map((domain, index) => (
                  <option key={index} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
              {selectedDomain && (
                <>
                  <label htmlFor="difficultyDropdown">Select Difficulty:</label>
                  <select id="difficultyDropdown" onChange={handleDifficultyChange} value={selectedDifficulty}>
                    <option value="">All Difficulties</option>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="difficult">difficult</option>
                  </select>
                </>
              )}
            </div>
            <div className="chart-container">
              <div className="chart-title">Performance Comparison</div>
              <div className="chart">
                <Chart
                  options={initialData.options}
                  series={initialData.series}
                  type="bar"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
    )
  );
}

export default BarGraph;