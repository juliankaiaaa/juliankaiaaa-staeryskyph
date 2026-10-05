// Data access for requests. Every query is parameterised.

export async function create(pool, { name, contact, service, link, details }) {
  const result = await pool.query(
    `INSERT INTO requests (name, contact, service, link, details)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, contact, service, link, details, created_at`,
    [name, contact, service, link, details]
  )
  return result.rows[0]
}

export async function getAll(pool) {
  const result = await pool.query(
    'SELECT * FROM requests ORDER BY created_at DESC'
  )
  return result.rows
}
