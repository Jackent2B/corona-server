async function getData(){
			let countries=[];
			let deaths=[];
			let deathsForGraph=[];
			let cases=[];
			let caseToday=[];
			let caseTodayForGraph=[];
			let recovered=[];
			let active=[];
			let critical=[];
			let perMillion=[];
			let details={
				countries,deaths,cases,recovered,active,critical,perMillion,caseToday
			}
			const response = await fetch('https://coronavirus-19-api.herokuapp.com/countries');
			const data = await response.json();
			console.log(data);



			 //Searching an element
				const searchBar = document.forms["search-country"].querySelector('input');

				searchBar.addEventListener('keypress',(e)=>{
					if (e.key === 'Enter'){
					const term = e.target.value.toUpperCase();
					data.forEach(data=>{
						if(term==data.country.toUpperCase()){
							// console.log(data.country,data.deaths,data.active);			
							var table = document.getElementById("myTable");

							// Create an empty <tr> element and add it to the 1st position of the table:
							var row = table.insertRow(2);
							row.className = "searchedRow";

							// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
							var cell1 = row.insertCell(0);
							var cell2 = row.insertCell(1);
							var cell3 = row.insertCell(2);
							var cell4 = row.insertCell(3);
							var cell5 = row.insertCell(4);
							var cell6 = row.insertCell(5);
							var cell7 = row.insertCell(6);
							var cell8 = row.insertCell(7);
							var cell9 = row.insertCell(8);
							var cell10 = row.insertCell(9);						

							// Add some text to the new cells:
							cell1.innerHTML = data.country;
							cell2.innerHTML = data.cases;
							cell3.innerHTML =  data.todayCases;
							cell4.innerHTML =  data.deaths;
							cell5.innerHTML = data.todayDeaths;
							cell6.innerHTML = data.recovered;
							cell7.innerHTML = data.active;
							cell8.innerHTML = data.critical;
							cell9.innerHTML = data.casesPerOneMillion;
							cell10.innerHTML = ((data.deaths/data.cases)*100).toFixed(3);									
						}
					})
					e.preventDefault();
					}					
				});

			 //Search ends
			 if(data.length>0){
				var temp="";

				//to get world data starts
				//Initializing variables
			    let worlddeaths=0;
			    let worldCases=0;
			    let worldTodayCases=0;
			    let worldTodaydeaths=0;
			    let worldRecovered=0;
			    let worldActive=0;
			    let worldCritical=0;
			    let worldperM=0;
			    let worldMortality=0;

				data.forEach(data=>{
				    worlddeaths = worlddeaths+data.deaths;
					worldCases = worldCases+data.cases;
					worldTodayCases = worldTodayCases+data.todayCases;
					worldTodaydeaths = worldTodaydeaths+data.todayDeaths;
					worldRecovered = worldRecovered+data.recovered;
					worldActive = worldActive+data.active;
					worldCritical = worldCritical+data.critical;
					worldperM = worldperM+data.casesPerOneMillion;
				})
				    worldMortality = worldMortality + ((worlddeaths/worldCases)*100).toFixed(3);

				temp+="<tr id='world'>";
					temp+="<td>"+"World*"+"</td>";
					temp+="<td>"+worldCases+"</td>";
					temp+="<td>"+worldTodayCases+"</td>";
					temp+="<td>"+worlddeaths+"</td>";
					temp+="<td>"+worldTodaydeaths+"</td>";
					temp+="<td>"+worldRecovered+"</td>";
					temp+="<td>"+worldActive+"</td>";
					temp+="<td>"+worldCritical+"</td>";
					temp+="<td>"+worldperM+"</td>";
					temp+="<td>"+worldMortality+"</td>";
				//world data ends	

				
			for(let i=0;i<20;i++){
				countries.push(data[i].country);
				deaths.push(data[i].deaths);
				cases.push(data[i].cases);
				caseTodayForGraph.push(data[i].todayCases);
				deathsForGraph.push(data[i].deaths);	
				caseToday.push(data[i].todayCases);
				recovered.push(data[i].recovered);
				active.push(data[i].active);
				critical.push(data[i].critical);	
				perMillion.push(data[i].casesPerOneMillion);
			}

			//Today cases graph most today cases and country name details
			 caseTodayForGraph.sort(function(a, b){return b-a}); 
			 document.getElementById("mosTdyCase").textContent = caseTodayForGraph[0];

			//country name
			for(let i=0;i<20;i++){
				if(caseTodayForGraph[0]==caseToday[i]){
					document.getElementById("mosTdyCaseCntry").textContent = countries[i];
				}
			}			 
			
			//deaths graph most deaths and country name details
			 deathsForGraph.sort(function(a, b){return b-a}); 
			 document.getElementById("mostDeaths").textContent = deathsForGraph[0];
			 
			 //country name
			for(let i=0;i<20;i++){
				if(deathsForGraph[0]==deaths[i]){
				 document.getElementById("mostDeathsCntry").textContent = countries[i];
				}
			}

			//sum of death of first 8 countries
			let first8countryDeaths=0;
			for (var i = 0; i < 8; i++) {
			first8countryDeaths = first8countryDeaths+data[i].deaths; 
			}

			let restDeaths = worlddeaths-first8countryDeaths;
			//adding restDeaths property to details object.
			details.restDeaths=restDeaths;
				
				 //country data starts
				for(let i=0;i<data.length;i++){
					temp+="<tr>";
					temp+="<td>"+data[i].country+"</td>";
					temp+="<td>"+data[i].cases+"</td>";
					temp+="<td>"+data[i].todayCases+"</td>";
					temp+="<td>"+data[i].deaths+"</td>";
					temp+="<td>"+data[i].todayDeaths+"</td>";
					temp+="<td>"+data[i].recovered+"</td>";
					temp+="<td>"+data[i].active+"</td>";
					temp+="<td>"+data[i].critical+"</td>";
					temp+="<td>"+data[i].casesPerOneMillion+"</td>";
					temp+="<td>"+((data[i].deaths/data[i].cases)*100).toFixed(3)+"</td>";
				}	
				//counry data ends
				document.getElementById("data").innerHTML = temp;

			}
			return details;
		} 

			//calling chartGets()
        chartGets();
        //chart starts
		async function chartGets(){
			//calling getData() here using await so that data loads earlier thann graph
		const details =  await getData();
		const ctx1 = document.getElementById('chart1').getContext('2d');
		const ctx2 = document.getElementById('chart2').getContext('2d');
		const ctx3 = document.getElementById('chart3').getContext('2d');
		const ctx4 = document.getElementById('chart4').getContext('2d');

		const myChart1 = new Chart(ctx1, {
		    type: 'line',
		    data: {
		        labels: details.countries,
		        datasets: [
		        {
		            label: 'Country Wise Total cases',
		            data: details.cases ,
		            fill: false,
		            backgroundColor:
		                'white'
		            ,
		            borderColor: 
		                'rgba(255, 99, 132, 1)',
		            borderWidth: 1
		        },
		        {
		            label: 'Country Wise active cases',
		            data: details.active ,
		            fill: false,
		            backgroundColor:
		                'white'
		            ,
		            borderColor: 
		                'rgb(0, 153, 255)',
		            borderWidth: 1
		        }
		        ]
		    },
		    options: {
        scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value;
			                    }
			                }
			            }]
			        },
			        responsive: false
			    }
		});




		const myChart2 = new Chart(ctx2, {
		    type: 'line',
		    data: {
		        labels: details.countries,
		        datasets: [
		        {
		            label: 'Country Wise Cases Per Million',
		            data: details.perMillion ,
		            fill: false,
		            backgroundColor:
		                'white'
		            ,
		            borderColor: 
		                'rgb(0, 230, 0)',
		            borderWidth: 1
		        },
		        {
		            label: 'Country Wise Critical cases',
		            data: details.critical ,
		            fill: false,
		            backgroundColor:
		                'white'
		            ,
		            borderColor: 
		                'rgb(255, 255, 0)',
		            borderWidth: 1
		        }
		        ]
		    },
		    options: {
        scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value;
			                    }
			                }
			            }]
			        },
			        responsive: false
			    }
		});

		const myChart3 = new Chart(ctx3, {
		    type: 'pie',
		    data: {
		        labels: [details.countries[0],details.countries[1],details.countries[2],details.countries[3],details.countries[4],details.countries[5],details.countries[6],details.countries[7],'Rest'],
		        datasets: [
		        {
		            label: 'Country Wise Total cases',
		            data: [details.deaths[0],details.deaths[1],details.deaths[2],details.deaths[3],details.deaths[4],details.deaths[5],details.deaths[6],details.deaths[7],details.restDeaths] ,
		            fill: false,
		            backgroundColor:
		                [
                '#ff0066',
                '#005ce6',
                '#cc33ff',
                '#ff9933',
                '#b30000',
                '#00ccff',
                '#ff3333',
                "#000",
                "yellow"
            ]
		            ,
		            borderColor: 
		                'rgba(255, 99, 132, 1)',
		            borderWidth: 1
		        }
		        ]
		    },
		    options: {
        scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value;
			                    }
			                }
			            }]
			        },
			        responsive: false
			    }
		});


				const myChart4 = new Chart(ctx4, {
		    type: 'bar',
		    data: {
		        labels: [details.countries[0],details.countries[1],details.countries[2],details.countries[3],details.countries[4],details.countries[5],details.countries[6],details.countries[7],details.countries[8],details.countries[9],details.countries[10]],
		        datasets: [
		        {
		            label: 'Country Wise Today cases',
		            data: [details.caseToday[0],details.caseToday[1],details.caseToday[2],details.caseToday[3],details.caseToday[4],details.caseToday[5],details.caseToday[6],details.caseToday[7],details.caseToday[8],details.caseToday[9],details.caseToday[10]] ,
		            fill: false,
		            backgroundColor:
		                [
                '#ff0066',
                '#005ce6',
                '#cc33ff',
                '#ff9933',
                '#b30000',
                '#00ccff',
                '#ff3333',
                '#3399ff',
                '#cc33ff',
                '#ff9933',
                '#00ccff',
                "#000"
            ]
		            ,
		            borderColor: 
		                'rgba(255, 99, 132, 1)',
		            borderWidth: 1
		        }
		        ]
		    },
		    options: {
        scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value;
			                    }
			                }
			            }]
			        },
			        responsive: false
			    }
		});


	}	
    //chart ends

