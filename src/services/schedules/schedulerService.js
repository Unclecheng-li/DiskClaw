function addMinutes(dateIso, minutes) {
  return new Date(Date.parse(dateIso) + minutes * 60 * 1000).toISOString();
}

export class SchedulerService {
  constructor({ scheduleStore, taskStore, agent, preferenceStore = null, cleanupExecutor = null }) {
    this.scheduleStore = scheduleStore;
    this.taskStore = taskStore;
    this.agent = agent;
    this.preferenceStore = preferenceStore;
    this.cleanupExecutor = cleanupExecutor;
    this.timer = null;
  }

  start() {
    if (this.timer) {
      return;
    }

    this.timer = setInterval(() => {
      this.runDueSchedules().catch(() => {});
      this.runRetentionCleanup().catch(() => {});
    }, 30000);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  async executeSchedule(schedule, {
    reason = "schedule",
    updateTiming = true
  } = {}) {
    if (!schedule) {
      return null;
    }

    const nowIso = new Date().toISOString();
    const task = this.taskStore.create("scheduled-cleanup", {
      scheduleId: schedule.id,
      name: schedule.name,
      action: schedule.action,
      source: schedule.source || "user",
      reason
    });

    this.taskStore.run(task.taskId, async ({ setProgress, controller }) => {
      setProgress(10, "Running scheduled task...");
      const plan = await this.agent.plan(schedule.targets || [], schedule.options || {}, {
        controller,
        onProgress: (event) => {
          setProgress(
            Math.min(78, Number(event.progress || 10)),
            event.message || "Scanning scheduled targets...",
            {
              phase: event.phase,
              currentPath: event.currentPath,
              scannedFiles: event.scannedFiles,
              candidateFiles: event.candidateFiles,
              candidateBytes: event.candidateBytes,
              directoriesVisited: event.directoriesVisited
            }
          );
        }
      });

      if (schedule.action === "plan-only") {
        return plan;
      }

      const items = (plan.analysis?.recommendedItems || [])
        .filter((item) => item.risk?.level === "low")
        .slice(0, schedule.maxItems);

      setProgress(70, "Executing scheduled cleanup...");
      return this.agent.execute(items, {
        dryRun: schedule.dryRun,
        mode: schedule.cleanupMode,
        archiveDir: schedule.archiveDir || "",
        confirmHighRisk: false
      }, {
        controller,
        onProgress: (event) => {
          setProgress(
            Math.max(72, Number(event.progress || 72)),
            "Executing scheduled cleanup...",
            {
              completedItems: event.completedItems,
              totalItems: event.totalItems,
              releasedBytes: event.releasedBytes,
              currentPath: event.currentPath
            }
          );
        }
      });
    });

    if (updateTiming) {
      await this.scheduleStore.save({
        ...schedule,
        lastRunAt: nowIso,
        nextRunAt: addMinutes(nowIso, schedule.intervalMinutes || 60)
      });
    }

    return task;
  }

  async runNow(scheduleId) {
    const schedules = await this.scheduleStore.list();
    const schedule = schedules.find((item) => item.id === scheduleId) || null;

    if (!schedule) {
      return null;
    }

    return this.executeSchedule(schedule, {
      reason: "manual-run",
      updateTiming: true
    });
  }

  async runDueSchedules() {
    const schedules = await this.scheduleStore.list();
    const now = Date.now();

    for (const schedule of schedules) {
      if (!schedule.enabled) {
        continue;
      }

      const nextRun = Date.parse(schedule.nextRunAt || 0);

      if (Number.isNaN(nextRun) || nextRun > now) {
        continue;
      }
      await this.executeSchedule(schedule, {
        reason: "automatic-run",
        updateTiming: true
      });
    }
  }

  async runRetentionCleanup() {
    if (!this.cleanupExecutor || !this.preferenceStore) {
      return;
    }

    const preferences = await this.preferenceStore.get();
    const retentionDays = Number(preferences.quarantineRetentionDays || 30);
    if (!Number.isFinite(retentionDays) || retentionDays <= 0 || retentionDays >= 9999) {
      return;
    }

    await this.cleanupExecutor.purgeExpiredQuarantineItems(retentionDays);
  }

  async runRetentionCleanupNow() {
    return this.runRetentionCleanup();
  }
}
