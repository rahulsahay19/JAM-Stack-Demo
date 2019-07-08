import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { CosmosClient } from '@azure/cosmos';
const endpoint = process.env.AZURE_COSMOS_ENDPOINT;
const masterKey = process.env.AZURE_COSMOS_MASTER_KEY;
const databaseId = process.env.AZURE_COSMOS_DATABASE_ID;
const productContainerName = 'movies';
const client = new CosmosClient({endpoint, auth: { masterKey}});
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
   if (req.method === 'GET') {
    const { result } = await client
           .database(databaseId)
           .container(productContainerName)
           .items.readAll().toArray();
    context.res = { status: 200, body: result };
    return;
  }
  context.res = { status: 400, body: 'Bad Request' };
};
export default httpTrigger;