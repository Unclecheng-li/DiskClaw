import { DiskCleanupAgent } from "./services/agent/diskCleanupAgent.js";
import { ScanAnalyzer } from "./services/analysis/scanAnalyzer.js";
import { ConfigService } from "./services/config/configService.js";
import { CleanupExecutor } from "./services/execution/cleanupExecutor.js";
import { LlmConfigStore } from "./services/llm/llmConfigStore.js";
import { OnboardingStore } from "./services/onboarding/onboardingStore.js";
import { LlmGateway } from "./services/llm/llmGateway.js";
import { PreferenceStore } from "./services/preferences/preferenceStore.js";
import { ReportStore } from "./services/report/reportStore.js";
import { RuleStore } from "./services/rules/ruleStore.js";
import { FileScanner } from "./services/scan/fileScanner.js";
import { SchedulerService } from "./services/schedules/schedulerService.js";
import { ScheduleStore } from "./services/schedules/scheduleStore.js";
import { UpdateService } from "./services/update/updateService.js";
import { TaskStore } from "./services/tasks/taskStore.js";
import { WindowStateStore } from "./services/window/windowStateStore.js";

export function createDiskClawApp() {
  const llmConfigStore = new LlmConfigStore();
  const llmGateway = new LlmGateway(llmConfigStore);
  const onboardingStore = new OnboardingStore();
  const preferenceStore = new PreferenceStore();
  const reportStore = new ReportStore();
  const ruleStore = new RuleStore();
  const scheduleStore = new ScheduleStore();
  const taskStore = new TaskStore();
  const windowStateStore = new WindowStateStore();
  const cleanupExecutor = new CleanupExecutor();
  const updateService = new UpdateService();
  const agent = new DiskCleanupAgent({
    scanner: new FileScanner(),
    analyzer: new ScanAnalyzer(),
    llmGateway,
    cleanupExecutor,
    reportStore,
    ruleStore,
    preferenceStore
  });
  const schedulerService = new SchedulerService({
    scheduleStore,
    taskStore,
    agent,
    preferenceStore,
    cleanupExecutor
  });
  const configService = new ConfigService({
    llmConfigStore,
    onboardingStore,
    preferenceStore,
    ruleStore,
    scheduleStore,
    windowStateStore
  });

  return {
    llmConfigStore,
    configService,
    llmGateway,
    onboardingStore,
    preferenceStore,
    reportStore,
    ruleStore,
    scheduleStore,
    schedulerService,
    updateService,
    taskStore,
    windowStateStore,
    agent,
    cleanupExecutor
  };
}
