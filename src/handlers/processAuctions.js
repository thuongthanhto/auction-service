import { getEndedAuctions } from '../lib/getEndedAuctions';

async function processAuctions(event, context) {
  const auctionsToClose = await getEndedAuctions();
  console.log(auctionsToClose);

  //   const now = new Date();
  //   const params = {
  //     TableName: process.env.AUCTIONS_TABLE_NAME,
  //     IndexName: 'statusAndEndDate',
  //     KeyConditionExpression: '#status = :status AND endingAt <= :now',
  //     ExpressionAttributeValues: {
  //       ':status': 'OPEN',
  //       ':now': now.toISOString(),
  //     },
  //     ExpressionAttributeNames: {
  //       '#status': 'status',
  //     },
  //   };
  //   const result = await dynamodb.query(params).promise();
  //   const { Items: auctions } = result;
  //   if (auctions.length === 0) {
  //     return {
  //       statusCode: 200,
  //       body: JSON.stringify({ message: 'There are no auctions to process' }),
  //     };
  //   }
  //   const closePromises = auctions.map((auction) => {
  //     const params = {
  //       TableName: process.env.AUCTIONS_TABLE_NAME,
  //       Key: { id: auction.id },
  //       UpdateExpression: 'set #status = :status',
  //       ExpressionAttributeValues: {
  //         ':status': 'CLOSED',
  //       },
  //       ExpressionAttributeNames: {
  //         '#status': 'status',
  //       },
  //     };
  //     return dynamodb.update(params).promise();
  //   });
  //   await Promise.all(closePromises);
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ message: 'Auctions closed successfully' }),
  //   };
}

export const handler = processAuctions;
