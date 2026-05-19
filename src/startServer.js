import http from "node:http";
import { appPaths } from "./config/defaults.js";
import { createDiskClawApp } from "./app.js";
import { syncSystemMaintenanceSchedule } from "./services/schedules/systemScheduleSync.js";
import { ensureDirectory } from "./utils/fs.js";
import { handleDiskClawRequest } from "./routes.js";

export async function startDiskClawServer(options = {}) {
  const services = createDiskClawApp();

  await ensureDirectory(appPaths.dataRoot);
  await ensureDirectory(appPaths.reportsDir);
  await ensureDirectory(appPaths.quarantineDir);
  await ensureDirectory(appPaths.exportsDir);
  await ensureDirectory(appPaths.archiveDir);
  await syncSystemMaintenanceSchedule(services.scheduleStore, await services.preferenceStore.get());

  const server = http.createServer((request, response) =>
    handleDiskClawRequest(request, response, services)
  );
  server.on("close", () => {
    services.schedulerService.stop();
  });

  const requestedPort = Number(options.port ?? process.env.PORT ?? 3100);

  await new Promise((resolve) => {
    server.listen(requestedPort, () => resolve());
  });

  services.schedulerService.start();

  const address = server.address();
  const actualPort = typeof address === "object" && address ? Number(address.port) : requestedPort;

  return {
    port: actualPort,
    server,
    services
  };
}
