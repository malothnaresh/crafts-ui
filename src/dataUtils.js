export const getTimeSeriesData = (data) => {
  const result = [];
  data.forEach(item => {
    const costMap = { 'cookies': 100, 'cake': 200, 'muffins': 250 };
    result.push({
      cost: costMap[item.orderType],
      lastUpdated: item.lastUpdated,
      ordersCount: Math.random() * (10000 - 0 + 1) + 0
    })
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