const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "crypto_payments",
  password: "postgres",
  port: 5432,
});

// Garantizar la conexión con la base de datos
async function connectWithRetry() {
  let retries = 5;
  while (retries) {
    try {
      await pool.connect();
      console.log("Connected to the database successfully!");
      return;
    } catch (err) {
      console.error("Database connection failed. Retrying...", err);
      retries -= 1;
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  throw new Error("Could not connect to the database after multiple attempts.");
}

// Lista de direcciones conocidas y sus respectivos clientes
const knownAddresses = {
  mvd6qFeVkqH6MNAS2Y2cLifbdaX5XUkbZJ: "Wesley Crusher",
  mmFFG4jqAtw9MoCC88hw5FNfreQWuEHADp: "Leonard McCoy",
  mzzg8fvHXydKs8j9D2a8t7KpSXpGgAnk4n: "Jonathan Archer",
  "2N1SP7r92ZZJvYKG2oNtzPwYnzw62up7mTo": "Jadzia Dax",
  mutrAf4usv3HKNdpLwVD4ow2oLArL6Rez8: "Montgomery Scott",
  miTHhiX3iFhVnAEecLjybxvV5g8mKYTtnM: "James T. Kirk",
  mvcyJMiAcSXKAEsQxbW9TYZ369rsMG6rVV: "Spock",
};

// Carga los archivos de transacciones
function loadTransactions(file) {
  try {
    const filePath = path.join(__dirname, "data", file);
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData).transactions;
  } catch (error) {
    console.error(`Error loading file ${file}:`, error.message);
    return [];
  }
}

// Procesa las transacciones y aplica validaciones
async function processTransactions(transactions) {
  try {
    await connectWithRetry();

    const depositSummary = {};
    const unreferencedDeposits = [];
    const processedTxids = new Set(); // Evitar duplicados

    for (const tx of transactions) {
      // Validar transacciones duplicadas
      if (processedTxids.has(tx.txid)) continue;
      processedTxids.add(tx.txid);

      // Evitar transacciones enviadas desde la misma billetera
      if (tx.walletconflicts && tx.walletconflicts.length > 0) continue;

      // Validar categoría y confirmaciones
      if (tx.category !== "receive" || tx.confirmations < 6 || tx.amount <= 0)
        continue;

      const customer = knownAddresses[tx.address];
      if (customer) {
        depositSummary[customer] = depositSummary[customer] || {
          count: 0,
          sum: 0,
        };
        depositSummary[customer].count += 1;
        depositSummary[customer].sum += tx.amount;
      } else {
        unreferencedDeposits.push(tx.amount);
      }

      // Guarda la transacción en la base de datos
      await pool.query(
        `INSERT INTO deposits (txid, address, amount, confirmations, category) VALUES ($1, $2, $3, $4, $5)`,
        [tx.txid, tx.address, tx.amount, tx.confirmations, tx.category]
      );
    }

    return { depositSummary, unreferencedDeposits };
  } catch (error) {
    console.error("Error processing transactions:", error);
  }
}

// Imprime el resumen de depósitos
function printSummary(depositSummary, unreferencedDeposits) {
  Object.keys(knownAddresses).forEach((address) => {
    const customer = knownAddresses[address];
    const result = depositSummary[customer] || { count: 0, sum: 0 };
    console.log(
      `Deposited for ${customer}: count=${
        result.count
      } sum=${result.sum.toFixed(8)}`
    );
  });

  const unrefCount = unreferencedDeposits.length;
  const unrefSum = unreferencedDeposits.reduce((acc, amt) => acc + amt, 0);
  console.log(
    `Deposited without reference: count=${unrefCount} sum=${unrefSum.toFixed(
      8
    )}`
  );

  if (unreferencedDeposits.length > 0) {
    const smallest = Math.min(...unreferencedDeposits);
    const largest = Math.max(...unreferencedDeposits);
    console.log(`Smallest valid deposit: ${smallest.toFixed(8)}`);
    console.log(`Largest valid deposit: ${largest.toFixed(8)}`);
  } else {
    console.log("Smallest valid deposit: 0.00000000");
    console.log("Largest valid deposit: 0.00000000");
  }
}

// Carga y procesa todas las transacciones
(async () => {
  const transactions1 = loadTransactions("transactions-1.json");
  const transactions2 = loadTransactions("transactions-2.json");
  const allTransactions = [...transactions1, ...transactions2];

  await processTransactions(allTransactions);
  const { depositSummary, unreferencedDeposits } = await processTransactions(
    allTransactions
  );
  printSummary(depositSummary, unreferencedDeposits);

  // Cierra la conexión a la base de datos
  await pool.end();
})();
