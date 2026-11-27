function defaultTasks() {
  return [
    { id: 1, title: "Préparer le cours", done: false },
    { id: 2, title: "Corriger les TP", done: false },
    { id: 3, title: "Mettre à jour le dépôt Git", done: true },
    { id: 4, title: "Envoyer le rapport", done: false },
  ];
}

function addTask(tasks, title) {
  if (typeof title !== "string") {
    return tasks;
  }

  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    return tasks;
  }

  const nextId =
    tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

  tasks.push({
    id: nextId,
    title: trimmedTitle,
    done: false,
  });

  return tasks;
}

function toggleTask(tasks, index) {
  if (index < 0 || index >= tasks.length) {
    return tasks;
  }

  tasks[index].done = !tasks[index].done;
  return tasks;
}

function removeTask(tasks, index) {
  if (index < 0 || index >= tasks.length) {
    return tasks;
  }

  tasks.splice(index, 1);
  return tasks;
}

module.exports = {
  defaultTasks,
  addTask,
  toggleTask,
  removeTask,
};