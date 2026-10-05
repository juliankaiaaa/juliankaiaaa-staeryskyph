// Data access for services. Every query is parameterised.

export async function getAll(pool) {
  const result = await pool.query(
    'SELECT id, number, title, summary, description FROM services ORDER BY sort_order, id'
  )
  return result.rows
}

export async function update(pool, id, { title, summary, description }) {
  const result = await pool.query(
    `UPDATE services
     SET title = $1, summary = $2, description = $3
     WHERE id = $4
     RETURNING id, number, title, summary, description`,
    [title, summary, description, id]
  )
  return result.rows[0] ?? null
}
