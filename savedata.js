// Import required modules
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

// Check the startup parameter for the storage type
const storageType = process.argv[2]; // Parameter for the storage type (e.g., "file" or "db")

// Function to save data to a file
function saveToFile(data) {
  fs.writeFileSync('data.txt', JSON.stringify(data));
  console.log('Data has been saved to the file.');
}

// Function to save data to the database
function saveToDatabase(data) {
  const uri = 'mongodb+srv://<username>:<password>@<cluster-url>/<database>'; // Insert MongoDB connection URI

  MongoClient.connect(uri, function(err, client) {
    if (err) {
      console.log('Error connecting to the database:', err);
    } else {
      const collection = client.db('<database>').collection('<collection>'); // Select the database and collection

      collection.insertOne(data, function(err, result) {
        if (err) {
          console.log('Error saving data to the database:', err);
        } else {
          console.log('Data has been saved to the database.');
        }
        client.close();
      });
    }
  });
}

// Data to be saved
const data = { name: 'Example', value: 123 };

// Decide where to save the data
if (storageType === 'file') {
  saveToFile(data);
} else if (storageType === 'db') {
  saveToDatabase(data);
} else {
  console.log('Invalid storage type. Use "file" or "db" as the parameter.');
}
