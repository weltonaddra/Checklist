const sqlite3 = require('sqlite3').verbose();

// Create or open a database file
const db = new sqlite3.Database('./checklist.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create a table for storing checkbox states
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS checkboxes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      checkbox_id TEXT UNIQUE,
      checked BOOLEAN
    )
  `);

  console.log('Table created or already exists.');
});

// Function to save checkbox state
function saveCheckboxState(checkboxId, isChecked) {
  db.run(
    `INSERT INTO checkboxes (checkbox_id, checked) VALUES (?, ?)
     ON CONFLICT(checkbox_id) DO UPDATE SET checked = ?`,
    [checkboxId, isChecked, isChecked],
    (err) => {
      if (err) {
        console.error('Error saving checkbox state:', err.message);
      } else {
        console.log('Checkbox state saved.');
      }
    }
  );
}

// Function to load checkbox state
function loadCheckboxState(checkboxId, callback) {
  db.get(
    `SELECT checked FROM checkboxes WHERE checkbox_id = ?`,
    [checkboxId],
    (err, row) => {
      if (err) {
        console.error('Error loading checkbox state:', err.message);
        callback(null);
      } else {
        callback(row ? row.checked : null);
      }
    }
  );
}

// Export functions
module.exports = { saveCheckboxState, loadCheckboxState };

// Close the database connection when done
process.on('exit', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
});