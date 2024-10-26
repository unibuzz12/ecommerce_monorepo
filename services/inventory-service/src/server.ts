import app from './app';
import { PORT } from './config/dotenv';
import { createProductsTable } from './db/migrations/createProductsTable';
import { createOrdersTable } from './db/migrations/createOrdersTable';

const main = async () => {
  await createProductsTable();
  await createOrdersTable();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
};

main();
