import crypto from "node:crypto";

function buildTaskId(type) {
  return `${type}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
}

export class TaskStore {
  constructor() {
    this.tasks = new Map();
    this.controllers = new Map();
  }

  create(type, payload = {}) {
    const controller = {
      paused: false,
      cancelled: false
    };

    const task = {
      taskId: buildTaskId(type),
      type,
      status: "queued",
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      message: "Task queued.",
      payload,
      details: {},
      result: null,
      error: null
    };

    this.tasks.set(task.taskId, task);
    this.controllers.set(task.taskId, controller);
    return task;
  }

  update(taskId, patch) {
    const current = this.tasks.get(taskId);

    if (!current) {
      return null;
    }

    const next = {
      ...current,
      ...patch,
      details: patch.details === undefined ? current.details : patch.details,
      updatedAt: new Date().toISOString()
    };

    this.tasks.set(taskId, next);
    return next;
  }

  get(taskId) {
    return this.tasks.get(taskId) || null;
  }

  getController(taskId) {
    return this.controllers.get(taskId) || null;
  }

  list() {
    return Array.from(this.tasks.values())
      .sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt))
      .slice(0, 50);
  }

  run(taskId, executor) {
    const task = this.get(taskId);
    const controller = this.getController(taskId);

    if (!task) {
      return;
    }

    Promise.resolve()
      .then(async () => {
        this.update(taskId, {
          status: "running",
          progress: 10,
          message: "Task started."
        });
        const result = await executor({
          controller,
          setProgress: (progress, message, details = undefined) => {
            this.update(taskId, {
              progress,
              message: message || this.get(taskId)?.message || "Task running.",
              details
            });
          }
        });
        this.update(taskId, {
          status: controller?.cancelled ? "cancelled" : "completed",
          progress: 100,
          message: controller?.cancelled ? "Task cancelled." : "Task completed.",
          result
        });
      })
      .catch((error) => {
        if (error.code === "task_cancelled") {
          this.update(taskId, {
            status: "cancelled",
            progress: 100,
            message: "Task cancelled."
          });
          return;
        }

        this.update(taskId, {
          status: "failed",
          progress: 100,
          message: error.message || "Task failed.",
          error: {
            message: error.message || "Task failed."
          }
        });
      });
  }

  pause(taskId) {
    const controller = this.getController(taskId);
    const task = this.get(taskId);

    if (!controller || !task || task.status !== "running") {
      return null;
    }

    controller.paused = true;
    return this.update(taskId, {
      status: "paused",
      message: "Task paused."
    });
  }

  resume(taskId) {
    const controller = this.getController(taskId);
    const task = this.get(taskId);

    if (!controller || !task || task.status !== "paused") {
      return null;
    }

    controller.paused = false;
    return this.update(taskId, {
      status: "running",
      message: "Task resumed."
    });
  }

  cancel(taskId) {
    const controller = this.getController(taskId);
    const task = this.get(taskId);

    if (!controller || !task || ["completed", "failed", "cancelled"].includes(task.status)) {
      return null;
    }

    controller.cancelled = true;
    controller.paused = false;

    return this.update(taskId, {
      status: "cancelled",
      message: "Task cancellation requested."
    });
  }
}
