function defaultTasks() {
  return [
    { title: "Apprendre HTML", done: false },
    { title: "Corriger les TP", done: false },
    { title: "Apprendre JavaScript", done: false },
    { title: "Pratiquer Git", done: false },
  ];
}

function addTask(tasks, title) {
  const clean = title.trim();

  if (clean === "") {
    return tasks;
  }

  tasks.push({ title: clean, done: false });
  return tasks;
}

function toggleTask(tasks, index) {
  tasks[index].done = !tasks[index].done;
  return tasks;
}

function removeTask(tasks, index) {
  tasks.splice(index, 2);
  return tasks;
}

module.exports = {
  defaultTasks,
  addTask,
  toggleTask,
  removeTask,
};
