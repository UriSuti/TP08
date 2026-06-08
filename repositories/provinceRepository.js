
import dotenv from "dotenv";
dotenv.config();

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
const hasDbParts = Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASSWORD);

if (!hasDatabaseUrl && !hasDbParts) {
  throw new Error('No database configuration found. Set DATABASE_URL or DB_HOST/DB_USER/DB_PASSWORD in .env');
}

let pool;
try {
  const { Pool } = await import('pg');
  if (hasDatabaseUrl) {
    try {
      pool = new Pool({ connectionString: process.env.DATABASE_URL.trim(), ssl: { rejectUnauthorized: false } });
    } catch (err) {
      throw new Error(`Invalid DATABASE_URL: ${err.message}`);
    }
  } else {
    try {
      pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'postgres',
        ssl: { rejectUnauthorized: false }
      });
    } catch (err) {
      throw new Error(`Invalid DB_* configuration: ${err.message}`);
    }
  }
} catch (err) {
  // rethrow with guidance
  throw new Error(`Postgres pool creation failed: ${err.message}. Ensure .env contains a valid DATABASE_URL or DB_HOST/DB_USER/DB_PASSWORD.`);
}

const getAll = async () => {
  const res = await pool.query('SELECT * FROM provinces ORDER BY id');
  return res.rows;
};

const getById = async (id) => {
  const res = await pool.query('SELECT * FROM provinces WHERE id = $1', [id]);
  return res.rows[0] || null;
};

const add = async (data) => {
  const res = await pool.query(
    'INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [data.name, data.full_name, data.latitude, data.longitude, data.display_order]
  );
  return res.rows[0];
};

const addWithId = async (id, data) => {
  const res = await pool.query(
    'INSERT INTO provinces (id, name, full_name, latitude, longitude, display_order) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [id, data.name, data.full_name, data.latitude, data.longitude, data.display_order]
  );
  return res.rows[0];
};

const update = async (id, data) => {
  const res = await pool.query(
    'UPDATE provinces SET name=$1, full_name=$2, latitude=$3, longitude=$4, display_order=$5 WHERE id=$6 RETURNING *',
    [data.name, data.full_name, data.latitude, data.longitude, data.display_order, id]
  );
  return res.rows[0] || null;
};

const remove = async (id) => {
  const res = await pool.query('DELETE FROM provinces WHERE id=$1 RETURNING id', [id]);
  return res.rowCount > 0;
};

export default {
  getAll,
  getById,
  add,
  addWithId,
  update,
  remove
};
