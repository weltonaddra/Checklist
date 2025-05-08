const { saveCheckboxState, loadCheckboxState } = require('./database');

document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
  const checkboxId = `checkbox-${index}`;

  // Load checkbox state from SQLite
  loadCheckboxState(checkboxId, (saved) => {
    if (saved === 1) checkbox.checked = true;
  });

  // Save checkbox state to SQLite on change
  checkbox.addEventListener('change', () => {
    saveCheckboxState(checkboxId, checkbox.checked ? 1 : 0);
  });
});
