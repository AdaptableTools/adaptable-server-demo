// const { PrismaClient } = require("@prisma/client");

// const ordersjson = require("./orders.json");

// const prisma = new PrismaClient();

// // A `main` function so that you can use async/await
// async function main() {
//   for await (let order of ordersjson) {
//     // console.log(order);
//     delete order.OrderId;
//     if (order.ShipPostalCode) {
//       order.ShipPostalCode = `${order.ShipPostalCode}`;
//     }
//     if (order.IsValid) {
//       order.IsValid =
//         typeof order.IsValid === "string"
//           ? order.IsValid.toLowerCase() === "true"
//             ? true
//             : false
//           : false;
//     }

//     if (order.ShipRegion === null) {
//       delete order.ShipRegion;
//     }

//     ["OrderDate", "RequiredDate", "ShippedDate", "LastUpdatedTime"].forEach(
//       (property) => {
//         if (order[property]) {
//           order[property] = new Date(order[property]);
//         }
//       }
//     );

//     let createdOrder = await prisma.order.create({ data: order });

//     // console.log(createdOrder);
//   }
// }

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.disconnect();
//   });

// module.exports = main;
