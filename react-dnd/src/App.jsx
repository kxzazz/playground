import { useState } from 'react';
import './App.css';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Column from './components/Column/Column';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Input from './components/Input/Input';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Add tests to homepage' },
    { id: 2, title: 'Fix styling in about section' },
    { id: 3, title: 'Learn how to center a div' },
  ]);

  const addTask = (title) => {
    setTasks((tasks) => [{ id: tasks.length + 1, title: title }, ...tasks]);
  };
  const getTaskPos = (id) => tasks.findIndex((task) => task.id == id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id == over.id) return;

    setTasks((tasks) => {
      const orginalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, orginalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <div className="App">
      <h1>MyTasks ✅</h1>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <Input onSubmit={addTask} />
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}

export default App;
