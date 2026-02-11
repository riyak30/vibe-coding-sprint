// Simple client-side state for planned shifts
const shifts = [];

const planForm = document.getElementById('plan-form');
const shiftList = document.getElementById('shift-list');
const shiftListEmpty = document.getElementById('shift-list-empty');
const totalHoursEl = document.getElementById('total-hours');
const hoursBar = document.getElementById('hours-bar');
const reflectionForm = document.getElementById('reflection-form');
const reflectionSelect = document.getElementById('reflection-shift');
const reflectionStatus = document.getElementById('reflection-status');

function renderTotals() {
  const total = shifts.reduce((sum, s) => sum + s.hours, 0);
  totalHoursEl.textContent = total.toString();
  const pct = Math.max(0, Math.min(100, (total / 10) * 100));
  hoursBar.style.width = `${pct}%`;
}

function renderShiftList() {
  if (shifts.length === 0) {
    shiftList.hidden = true;
    reflectionForm.hidden = true;
    shiftListEmpty.hidden = false;
    return;
  }

  shiftList.hidden = false;
  shiftListEmpty.hidden = true;

  // Clear existing
  shiftList.innerHTML = '';

  shifts.forEach((shift, index) => {
    const item = document.createElement('div');
    item.className = 'shift-item';

    const meta = document.createElement('div');
    meta.className = 'shift-meta';
    meta.textContent = `${shift.dateLabel} • ${shift.org || 'Food bank'} • ${
      shift.hours
    } hour${shift.hours === 1 ? '' : 's'}`;

    const tasks = document.createElement('div');
    tasks.className = 'shift-tasks';
    tasks.textContent =
      shift.tasks.length > 0
        ? `Planned tasks: ${shift.tasks.join(', ')}`
        : 'Planned tasks: (none listed)';

    const leftCol = document.createElement('div');
    leftCol.appendChild(meta);
    leftCol.appendChild(tasks);

    const actions = document.createElement('div');
    actions.className = 'shift-actions';

    const chip = document.createElement('span');
    chip.className = `chip ${shift.completed ? 'done' : 'planned'}`;
    chip.textContent = shift.completed ? 'Completed' : 'Planned';

    const checkboxLabel = document.createElement('label');
    checkboxLabel.className = 'checkbox-label';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = shift.completed;
    checkbox.addEventListener('change', () => {
      shift.completed = checkbox.checked;
      renderShiftList();
      updateReflectionOptions();
    });
    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(
      document.createTextNode('Mark done')
    );

    actions.appendChild(chip);
    actions.appendChild(checkboxLabel);

    item.appendChild(leftCol);
    item.appendChild(actions);

    shiftList.appendChild(item);
  });
}

function updateReflectionOptions() {
  const completed = shifts.filter((s) => s.completed);
  if (completed.length === 0) {
    reflectionForm.hidden = true;
    return;
  }

  reflectionForm.hidden = false;
  reflectionSelect.innerHTML = '';
  completed.forEach((shift, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `${shift.dateLabel} • ${shift.org || 'Food bank'} • ${
      shift.hours
    }h`;
    reflectionSelect.appendChild(opt);
  });
}

planForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('vol-name').value.trim();
  const org = document.getElementById('org-name').value.trim();
  const date = document.getElementById('date').value;
  const hoursRaw = document.getElementById('hours').value;
  const tasksRaw = document.getElementById('tasks').value.trim();

  const hours = parseFloat(hoursRaw);
  if (!date || Number.isNaN(hours) || hours <= 0) {
    alert('Please add at least a date and a positive number of hours.');
    return;
  }

  const dateLabel = new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  const tasks =
    tasksRaw.length > 0
      ? tasksRaw.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

  shifts.push({
    name,
    org,
    date,
    dateLabel,
    hours,
    tasks,
    completed: false,
  });

  // Quick reset but keep name and org so planning multiple shifts is easier
  document.getElementById('date').value = '';
  document.getElementById('hours').value = '';
  document.getElementById('tasks').value = '';

  renderTotals();
  renderShiftList();
  updateReflectionOptions();
});

const reflectionFormEl = document.getElementById('reflection-form');
const wentWellEl = document.getElementById('went-well');
const improveEl = document.getElementById('improve');

reflectionFormEl?.addEventListener('submit', (event) => {
  event.preventDefault();
  const wentWell = wentWellEl.value.trim();
  const improve = improveEl.value.trim();

  if (!wentWell && !improve) {
    reflectionStatus.textContent =
      'Please add at least one short note before saving.';
    reflectionStatus.style.color = '#b91c1c';
    return;
  }

  // In a real app this would be sent to a backend.
  reflectionStatus.textContent =
    'Reflection saved locally for this prototype (no data is uploaded).';
  reflectionStatus.style.color = '#166534';

  wentWellEl.value = '';
  improveEl.value = '';
});

// Initial render
renderTotals();
renderShiftList();
updateReflectionOptions();

