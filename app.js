const serverContainer = document.querySelector(".server_container");
const inputTask = document.querySelector("#inputTask");
const waiting = document.querySelector(".waiting_area");
// const

//! Adding a server box (Add a server button)
function addServerBox() {
  const box = `<div class="server"></div>`;
  serverContainer.innerHTML += box;
}

//! Removing a server box (Remove a server button)
function removeServerBox() {
  const servers = document.querySelectorAll(".server");

  for (let i = servers.length - 1; i >= 0; i--) {
    if (!servers[i].firstElementChild) {
      servers[i].remove();
      break;
    }
  }
}

//! Adding a task (Add tasks button) -> Adding Progress bar
let waitingCount = 0;
function addTask() {
  const taskTemplate = `<div id="myProgress"><div id="myBar"></div></div>`;

  const waitingTaskTemplate = `<div>
                                  <div id="myProgress">
                                      <div id="myBar" style="width: 0%;">waiting...</div>
                                  </div><img src="./img/trash.png" alt="" id="trash" onclick="deleteTask()">
                              </div>`;

  const servers = document.querySelectorAll(".server");

  let taskCount = inputTask.value;
  inputTask.value = null;
  let serverCount = servers.length;

  for (let i = 0; i < serverCount; i++) {
    if (!servers[i].firstElementChild && (taskCount > 0 || waitingCount > 0)) {
      servers[i].innerHTML = taskTemplate;

      taskCount > 0 ? taskCount-- : waitingCount--;

      (function () {
        let task = servers[i].firstElementChild.firstElementChild;
        let tempValue = 0;
        let intervalId = setInterval(executeTask, 10);

        function executeTask() {
          if (tempValue < 100) {
            tempValue += 0.5;
            task.style.width = tempValue + "%";
          } else {
            clearInterval(intervalId);
            servers[i].firstElementChild.remove();

            if (waitingCount > 0) {
              waiting.firstElementChild.remove();
              addTask();
            }
          }
        }
      })();
    }
  }

  let n = taskCount;
  while (n-- > 0) {
    waiting.innerHTML += waitingTaskTemplate;
    waitingCount++;
  }
}

//! Delete waiting area task
function deleteTask() {
  waiting.firstElementChild.remove();
  waitingCount--;
}
