function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}

const generateData = () => {
    const dataSeries = [];
    const getOrderType = () => {
        const types = ['cake', 'cookies', 'muffins'];
        return types[Math.floor(Math.random() * (2 - 0 + 1) + 0)];
    };
    const getOrderState = () => {
        const types = ['created', 'shipped', 'delivered', 'cancelled'];
        return types[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
    };
    const getLastUpdated = () => {
        return randomDate(new Date(2020, 0, 1), new Date(), 0, 24).getTime();
    }
    const getUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    for(let i=0; i<10000; i++) {
        dataSeries.push({
            orderType: getOrderType(),
            orderStatus: getOrderState(),
            lastUpdated: getLastUpdated(),
            branch: Math.floor(Math.random() * (1000 - 1 + 1) + 1),
            customerId: getUUID()
        })
    }
    return dataSeries;
}

console.log(JSON.stringify(generateData()));