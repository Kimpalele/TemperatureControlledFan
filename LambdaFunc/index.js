// load the AWS SDK and the DynamoDB client
const AWS = require('aws-sdk');
const DynamoDB = new AWS.DynamoDB.DocumentClient();
const https = require('https');
var nummer = 1;

// define the Lambda function
exports.handler = (event) => {
  // make an HTTPS request to the external API using the 'https' module
  const response = https.get(`https://api.openweathermap.org/data/2.5/weather?lat=59.305998776&lon=18.021260&appid=9186f9b0851ec31c8e991398ce3e1f98&units=metric`, (res) => {
    let data = '';
    
    // receive the response data in chunks and append it to the 'data' variable
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    // when the response has ended, parse the data as JSON and store it in DynamoDB
    res.on('end', () => {
      const json = JSON.parse(data);
      console.log(json);
      
      
      // create the DynamoDB item object
      const item = {
        id: json.dt.toString(),
        temperature: json.main.temp,
        tempMax: json.main.temp_max,
        tempMin: json.main.temp_min,
        humid: json.main.humidity
      };
      
      // put the item in the DynamoDB table
      DynamoDB.put({
        TableName: 'OutsideTemp',
        Item: item
      }, (err, data) => {
        if (err) {
          // handle the error
          console.error(err);
          console.log(err);
        } else {
          // the item was stored in the table
          console.log(`Stored item with id ${json.id} in table 'table-name'`);
        }
      });
    });
  });
};