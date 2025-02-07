import { CosmosClient } from '@azure/cosmos'

const endpoint = 'https://searchifyPD.documents.azure.com:443/';
const key = '`kF55ZJp5d5bQ6zz`'; // Your Cosmos DB key

// Initialize the Cosmos DB client
const client = new CosmosClient({ 
    endpoint, 
    key
});



console.log("The file is running")

const initializeCosmosDb = async () => {
    const databaseId = 'Searchify'; // Replace with your database name
    const containerId = 'ProductDetails'; // Replace with your container name
  

  console.log("The dunction is runing")

  try{

    const { database } = await client.databases.create({ id: databaseId });
    console.log('Database created or accessed:', database.id);
  
  
    // Create the container if it doesn't exist
    const { container } = await database.containers.create({ id: containerId });
    console.log('Container created or accessed:', container.id);
  }catch(err){
    console.log(err)
  }


    // Create the database if it doesn't exist
  }


await initializeCosmosDb()
