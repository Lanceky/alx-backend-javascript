export default function taskBlock(trueOrFalse) {
  let task = false;  // Use let instead of var
  let task2 = true;  // Use let instead of var

  if (trueOrFalse) {
    let task = true;   // New block-scoped task
    let task2 = false; // New block-scoped task2
  }

  return [task, task2]; 
}
