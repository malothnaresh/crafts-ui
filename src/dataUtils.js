import moment from "moment";

export const apiBaseUrl = "http://localhost:8080/api";
export const orderTypes = [
  {
    value: '',
    label: 'All'
  }, {
    value: 'cookies',
    label: 'Cookies'
  }, {
    value: 'cake',
    label: 'Cake'
  }, {
    value: 'muffins',
    label: 'Muffins'
  }
];

export const orderStates = [
  {
    value: '',
    label: 'All'
  }, {
    value: 'created',
    label: 'Created'
  }, {
    value: 'shipped',
    label: 'Shipped'
  }, {
    value: 'delivered',
    label: 'Delivered'
  }, {
    value: 'cancelled',
    label: 'Cancelled'
  }
]

export const getTimeSeriesData = (data) => {
  const year = 2022;
  const result = {
    categories: [`01-${year}`,`02-${year}`,`03-${year}`,`04-${year}`,`05-${year}`,`06-${year}`,`07-${year}`,`08-${year}`,`09-${year}`,`10-${year}`,`11-${year}`,`12-${year}`],
    orders: [0,0,0,0,0,0,0,0,0,0,0,0],
    costs: [0,0,0,0,0,0,0,0,0,0,0,0],
  };
  const costMap = { 'cookies': 50, 'cake': 500, 'muffins': 100 };
  data.forEach(item => {
    for(let i=1; i<=12; i++) {
      if(moment(Number(item.lastUpdated)).format('M') === `${i}`) {
        console.log();
        result.orders[i-1] += 1;
        result.costs[i-1] += costMap[item.orderType];
      }
    }
  });
  return result;
}

const prepareChartData = (data, key) => {
  const result = [];
  const typesMap = {};
  data.forEach(element => {
    if(typesMap[element[key]]) {
      typesMap[element[key]]++;
    } else {
      typesMap[element[key]] = 1;
    }
  });
  Object.keys(typesMap).forEach(key => {
    result.push({
      name: key,
      count: typesMap[key]
    })
  });
  return result;
}
// {
//   muffins: 100,
//   cakes: 500,
//   cookies: 200
// }
export const getDataByType = (data) => {
  return prepareChartData(data, 'orderType');    
}

export const getDataByStatus = (data) => {
  return prepareChartData(data, 'orderStatus');
}

export const getTopBranches = (data, count) => {
  const result = prepareChartData(data, 'branch');
  result.sort((a,b) => b.count - a.count);
  return result.splice(0, count);
}