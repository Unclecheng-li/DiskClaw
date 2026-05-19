function renderStyles() {
  return String.raw`
    :root {
      --bg: #f9fafb;
      --bg-strong: #eef6f2;
      --surface: rgba(255, 255, 255, 0.92);
      --surface-strong: #ffffff;
      --surface-muted: #f3f4f6;
      --text: #1f2937;
      --text-soft: #6b7280;
      --line: rgba(148, 163, 184, 0.24);
      --shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
      --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.08);
      --green: #10b981;
      --green-deep: #059669;
      --blue: #3b82f6;
      --orange: #f59e0b;
      --red: #ef4444;
      --radius-lg: 24px;
      --radius-md: 16px;
      --radius-sm: 12px;
      --sidebar-width: 240px;
      --transition: 220ms ease;
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      min-height: 100%;
    }

    body {
      font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(16, 185, 129, 0.16), transparent 26%),
        radial-gradient(circle at 82% 12%, rgba(59, 130, 246, 0.14), transparent 22%),
        linear-gradient(180deg, #fbfcfd 0%, #f3f7f5 100%);
    }

    button,
    input,
    select,
    textarea {
      font: inherit;
    }

    button {
      border: 0;
      cursor: pointer;
    }

    input,
    select,
    textarea {
      width: 100%;
      border: 1px solid rgba(148, 163, 184, 0.28);
      background: #f8fafc;
      color: var(--text);
      border-radius: 12px;
      padding: 12px 14px;
      outline: none;
      transition: border-color var(--transition), box-shadow var(--transition), background var(--transition);
    }

    input:focus,
    select:focus,
    textarea:focus {
      border-color: rgba(16, 185, 129, 0.6);
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
    }

    textarea {
      min-height: 108px;
      resize: vertical;
    }

    a {
      color: var(--blue);
      text-decoration: none;
    }

    .app-shell {
      display: grid;
      grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
      min-height: 100vh;
    }

    .sidebar {
      background: rgba(255, 255, 255, 0.94);
      border-right: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 12px 0 28px rgba(15, 23, 42, 0.04);
      padding: 28px 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 28px;
      position: sticky;
      top: 0;
      min-height: 100vh;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .brand-badge {
      width: 52px;
      height: 52px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.98);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 12px 24px rgba(16, 185, 129, 0.22);
      overflow: hidden;
      padding: 4px;
    }

    .brand-badge img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }

    .brand-title {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .brand-copy {
      margin: 4px 0 0;
      color: var(--text-soft);
      font-size: 13px;
      line-height: 1.5;
    }

    .nav-list {
      display: grid;
      gap: 10px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 14px 16px;
      border-radius: 16px;
      background: transparent;
      color: var(--text);
      text-align: left;
      transition: transform var(--transition), background var(--transition), color var(--transition), box-shadow var(--transition);
    }

    .nav-item:hover {
      transform: translateY(-1px);
      background: rgba(16, 185, 129, 0.08);
    }

    .nav-item.active {
      background: linear-gradient(135deg, var(--green) 0%, #34d399 100%);
      color: white;
      box-shadow: 0 10px 20px rgba(16, 185, 129, 0.26);
    }

    .nav-icon {
      width: 34px;
      height: 34px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.05);
      font-size: 13px;
      font-weight: 700;
      flex: 0 0 auto;
    }

    .nav-item.active .nav-icon {
      background: rgba(255, 255, 255, 0.22);
    }

    .sidebar-footer {
      margin-top: auto;
      padding-top: 18px;
      border-top: 1px solid rgba(226, 232, 240, 0.8);
      display: grid;
      gap: 12px;
    }

    .sidebar-version {
      color: var(--text-soft);
      font-size: 12px;
      line-height: 1.6;
    }

    .ghost-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: rgba(59, 130, 246, 0.08);
      color: var(--blue);
      border-radius: 12px;
      font-weight: 600;
    }

    .workspace {
      padding: 28px 32px 40px;
      display: grid;
      gap: 20px;
    }

    .topbar {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(16, 185, 129, 0.1);
      color: var(--green-deep);
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 14px;
    }

    .page-title {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.03em;
    }

    .page-copy {
      margin: 10px 0 0;
      color: var(--text-soft);
      line-height: 1.7;
      max-width: 760px;
      font-size: 15px;
    }

    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .status-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid rgba(226, 232, 240, 0.9);
      color: var(--text-soft);
      font-size: 13px;
      box-shadow: var(--shadow-soft);
    }

    .status-dot {
      width: 9px;
      height: 9px;
      border-radius: 999px;
      background: var(--green);
      box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.12);
    }

    .status-dot.warn {
      background: var(--orange);
      box-shadow: 0 0 0 6px rgba(245, 158, 11, 0.14);
    }

    .status-dot.error {
      background: var(--red);
      box-shadow: 0 0 0 6px rgba(239, 68, 68, 0.12);
    }

    .task-banner {
      display: none;
      padding: 18px 22px;
      border-radius: 18px;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%);
      border: 1px solid rgba(16, 185, 129, 0.14);
      box-shadow: var(--shadow-soft);
    }

    .task-banner.active {
      display: block;
    }

    .task-banner-head {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: flex-start;
    }

    .task-banner-title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
    }

    .task-banner-copy {
      margin: 6px 0 0;
      color: var(--text-soft);
      line-height: 1.6;
      font-size: 13px;
    }

    .task-banner-actions,
    .button-row,
    .inline-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .task-banner-meta {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 12px;
    }

    .meta-pill {
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.7);
      color: var(--text-soft);
      font-size: 12px;
      border: 1px solid rgba(148, 163, 184, 0.18);
    }

    .view-mount {
      display: grid;
      gap: 20px;
    }

    .card {
      background: var(--surface);
      border: 1px solid rgba(226, 232, 240, 0.86);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      padding: 24px;
      backdrop-filter: blur(10px);
    }

    .section-title {
      margin: 0 0 10px;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .section-copy {
      margin: 0;
      color: var(--text-soft);
      line-height: 1.7;
      font-size: 14px;
    }

    .home-hero {
      min-height: 680px;
      display: grid;
      align-items: center;
      justify-items: center;
      text-align: center;
      background:
        radial-gradient(circle at top, rgba(16, 185, 129, 0.14), transparent 34%),
        radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.12), transparent 28%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(244, 248, 246, 0.98) 100%);
      position: relative;
      overflow: hidden;
    }

    .home-hero::before,
    .home-hero::after {
      content: "";
      position: absolute;
      border-radius: 999px;
      filter: blur(12px);
      opacity: 0.65;
      pointer-events: none;
    }

    .home-hero::before {
      width: 220px;
      height: 220px;
      background: rgba(16, 185, 129, 0.12);
      top: -70px;
      left: -30px;
    }

    .home-hero::after {
      width: 280px;
      height: 280px;
      background: rgba(59, 130, 246, 0.08);
      bottom: -100px;
      right: -70px;
    }

    .home-stack {
      width: min(760px, 100%);
      display: grid;
      gap: 22px;
      position: relative;
      z-index: 1;
    }

    .hero-kpis {
      width: min(780px, 100%);
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .hero-kpi-card {
      padding: 18px 20px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.84);
      border: 1px solid rgba(226, 232, 240, 0.92);
      box-shadow: var(--shadow-soft);
      text-align: left;
    }

    .hero-kpi-card strong {
      display: block;
      margin-top: 10px;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.03em;
    }

    .hero-kpi-card span {
      display: block;
      margin-top: 8px;
      color: var(--text-soft);
      font-size: 13px;
      line-height: 1.7;
    }

    .hero-logo {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 82px;
      height: 82px;
      margin: 0 auto;
      border-radius: 28px;
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 22px 40px rgba(16, 185, 129, 0.25);
      overflow: hidden;
      padding: 8px;
    }

    .hero-logo img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }

    .hero-logo.success {
      position: relative;
      width: 108px;
      height: 108px;
      border-radius: 34px;
      padding: 12px;
      background:
        radial-gradient(circle at top, rgba(255, 255, 255, 0.98), rgba(239, 246, 243, 0.98)),
        linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(241, 250, 246, 0.96));
      box-shadow:
        0 24px 48px rgba(16, 185, 129, 0.22),
        0 0 0 10px rgba(16, 185, 129, 0.08);
    }

    .hero-logo.success::before {
      content: "";
      position: absolute;
      inset: -16px;
      border-radius: 42px;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.18), transparent 68%);
      z-index: 0;
    }

    .hero-logo.success img {
      position: relative;
      z-index: 1;
    }

    .success-badge {
      position: absolute;
      right: -8px;
      bottom: -8px;
      width: 38px;
      height: 38px;
      border-radius: 999px;
      background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
      color: white;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 700;
      box-shadow: 0 10px 22px rgba(16, 185, 129, 0.28);
      border: 3px solid rgba(255, 255, 255, 0.96);
      z-index: 2;
    }

    .home-title {
      margin: 0;
      font-size: clamp(32px, 6vw, 48px);
      font-weight: 700;
      letter-spacing: -0.04em;
    }

    .home-subtitle {
      margin: 0;
      color: var(--text-soft);
      font-size: 16px;
      line-height: 1.8;
    }

    .hero-orb {
      width: clamp(220px, 26vw, 260px);
      height: clamp(220px, 26vw, 260px);
      margin: 0 auto;
      border-radius: 50%;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.82)),
        conic-gradient(from 180deg, rgba(16, 185, 129, 0.16), rgba(59, 130, 246, 0.14), rgba(16, 185, 129, 0.16));
      border: 1px solid rgba(226, 232, 240, 0.9);
      box-shadow: 0 24px 55px rgba(15, 23, 42, 0.12);
      display: grid;
      place-items: center;
      padding: 20px;
      position: relative;
      overflow: hidden;
      transition: transform var(--transition), box-shadow var(--transition);
    }

    .hero-orb:hover {
      transform: translateY(-2px) scale(1.01);
      box-shadow: 0 28px 60px rgba(15, 23, 42, 0.14);
    }

    .hero-orb.scan-button {
      background:
        radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.86)),
        linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(59, 130, 246, 0.12));
    }

    .hero-orb.progress {
      background:
        radial-gradient(circle at center, rgba(255, 255, 255, 0.96) 0 58%, transparent 59%),
        conic-gradient(var(--green) 0 calc(var(--progress, 0) * 1%), rgba(16, 185, 129, 0.12) 0 100%);
      box-shadow: 0 24px 55px rgba(16, 185, 129, 0.18);
    }

    .hero-orb.progress::after {
      content: "";
      position: absolute;
      inset: 17px;
      border-radius: 50%;
      border: 1px dashed rgba(16, 185, 129, 0.16);
      animation: orbit 2.4s linear infinite;
    }

    @keyframes orbit {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    .hero-orb-state {
      display: grid;
      gap: 8px;
      justify-items: center;
    }

    .hero-orb-mark {
      font-size: 34px;
      font-weight: 700;
      color: var(--green-deep);
    }

    .hero-orb-label {
      font-size: 17px;
      font-weight: 700;
      color: var(--text);
      line-height: 1.5;
    }

    .hero-orb-note {
      color: var(--text-soft);
      font-size: 13px;
      line-height: 1.5;
    }

    .target-row {
      width: min(620px, 100%);
      margin: 0 auto;
      display: grid;
      gap: 10px;
    }

    .target-card {
      padding: 16px 18px;
      border-radius: 18px;
      border: 1px solid rgba(226, 232, 240, 0.92);
      background: rgba(255, 255, 255, 0.84);
      box-shadow: var(--shadow-soft);
    }

    .target-card.active {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(239, 246, 243, 0.98) 100%);
      border-color: rgba(16, 185, 129, 0.24);
      box-shadow: 0 10px 24px rgba(16, 185, 129, 0.08);
    }

    .target-card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }

    .label {
      display: inline-block;
      color: var(--text-soft);
      font-size: 13px;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .label-inline {
      color: var(--text-soft);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .footer-note {
      color: var(--text-soft);
      font-size: 13px;
      line-height: 1.7;
    }

    .hero-metrics,
    .summary-grid,
    .category-grid,
    .history-grid,
    .settings-grid,
    .report-grid {
      display: grid;
      gap: 14px;
    }

    .summary-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .category-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .history-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .history-scroll {
      max-height: 540px;
      overflow: auto;
      padding-right: 6px;
      margin-top: 18px;
    }

    .quarantine-scroll {
      max-height: 540px;
      overflow: auto;
      padding-right: 6px;
      margin-top: 18px;
    }

    .history-timeline {
      position: relative;
      padding-left: 22px;
    }

    .history-timeline::before {
      content: "";
      position: absolute;
      top: 6px;
      bottom: 6px;
      left: 6px;
      width: 2px;
      background: linear-gradient(180deg, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.12));
    }

    .settings-shell {
      display: grid;
      grid-template-columns: 260px minmax(0, 1fr);
      align-items: start;
      gap: 18px;
    }

    .settings-grid {
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .settings-nav {
      display: grid;
      gap: 10px;
      position: sticky;
      top: 20px;
      align-self: start;
    }

    .settings-nav-card {
      padding: 18px;
    }

    .settings-nav-title {
      margin: 0 0 12px;
      font-size: 13px;
      font-weight: 700;
      color: var(--text-soft);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .settings-nav-list {
      display: grid;
      gap: 8px;
    }

    .settings-nav-item {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 14px;
      background: transparent;
      color: var(--text);
      text-align: left;
      transition: background var(--transition), color var(--transition), transform var(--transition), box-shadow var(--transition);
    }

    .settings-nav-item:hover {
      transform: translateX(2px);
      background: rgba(16, 185, 129, 0.08);
    }

    .settings-nav-item.active {
      background: linear-gradient(135deg, var(--green) 0%, #34d399 100%);
      color: white;
      box-shadow: 0 12px 24px rgba(16, 185, 129, 0.22);
    }

    .settings-nav-icon {
      width: 34px;
      height: 34px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.06);
      font-size: 12px;
      font-weight: 700;
      flex: 0 0 auto;
    }

    .settings-nav-item.active .settings-nav-icon {
      background: rgba(255, 255, 255, 0.18);
    }

    .settings-nav-text {
      display: grid;
      gap: 4px;
    }

    .settings-nav-label {
      font-size: 15px;
      font-weight: 700;
    }

    .settings-nav-copy {
      font-size: 12px;
      line-height: 1.5;
      color: var(--text-soft);
    }

    .settings-panel {
      min-width: 0;
    }

    .settings-section {
      display: grid;
      gap: 14px;
    }

    .settings-section-header {
      padding: 18px 20px;
      border-radius: 18px;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.06));
      border: 1px solid rgba(16, 185, 129, 0.12);
      box-shadow: var(--shadow-soft);
    }

    .settings-section-kicker {
      margin: 0 0 8px;
      color: var(--green-deep);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .settings-section-title {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .settings-section-copy {
      margin: 10px 0 0;
      color: var(--text-soft);
      line-height: 1.7;
      font-size: 14px;
    }

    .setting-group {
      overflow: hidden;
    }

    .setting-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      width: 100%;
      text-align: left;
      padding: 0;
      background: transparent;
    }

    .setting-head-text {
      display: grid;
      gap: 6px;
    }

    .setting-name {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .setting-copy {
      color: var(--text-soft);
      line-height: 1.7;
      font-size: 14px;
    }

    .setting-body {
      margin-top: 18px;
      padding-top: 18px;
      border-top: 1px solid rgba(226, 232, 240, 0.92);
    }

    .metric-card,
    .category-card,
    .report-card,
    .list-card,
    .setting-card,
    .dialog-card,
    .empty-card {
      background: var(--surface-strong);
      border: 1px solid rgba(226, 232, 240, 0.88);
      border-radius: 18px;
      box-shadow: var(--shadow-soft);
    }

    .metric-card,
    .category-card,
    .setting-card,
    .empty-card {
      padding: 18px;
    }

    .metric-label,
    .card-kicker,
    .row-note {
      color: var(--text-soft);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .metric-value {
      margin-top: 10px;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.03em;
    }

    .metric-copy,
    .category-copy,
    .report-copy,
    .list-copy {
      margin-top: 8px;
      color: var(--text-soft);
      font-size: 13px;
      line-height: 1.7;
    }

    .category-card {
      background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
    }

    .category-title {
      margin: 10px 0 0;
      font-size: 18px;
      font-weight: 700;
    }

    .category-value {
      margin-top: 10px;
      font-size: 26px;
      font-weight: 700;
      color: var(--green-deep);
    }

    .home-actions {
      justify-content: center;
    }

    .button-primary,
    .button-secondary,
    .button-warn,
    .button-subtle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 18px;
      border-radius: 14px;
      font-weight: 700;
      transition: transform var(--transition), box-shadow var(--transition), background var(--transition), opacity var(--transition);
      min-height: 46px;
    }

    .button-primary {
      background: linear-gradient(135deg, var(--green) 0%, #34d399 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }

    .button-primary.warm {
      background: linear-gradient(135deg, var(--orange) 0%, #fbbf24 100%);
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }

    .button-secondary {
      background: rgba(59, 130, 246, 0.1);
      color: var(--blue);
    }

    .button-warn {
      background: rgba(239, 68, 68, 0.12);
      color: var(--red);
    }

    .button-subtle {
      background: rgba(15, 23, 42, 0.04);
      color: var(--text);
    }

    .button-primary:hover,
    .button-secondary:hover,
    .button-warn:hover,
    .button-subtle:hover {
      transform: translateY(-1px);
    }

    .button-primary:disabled,
    .button-secondary:disabled,
    .button-warn:disabled,
    .button-subtle:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .hero-tip,
    .panel-tip {
      margin: 0;
      color: var(--text-soft);
      font-size: 13px;
      line-height: 1.7;
    }

    .hero-summary {
      width: min(860px, 100%);
      margin: 0 auto;
      display: grid;
      gap: 20px;
      text-align: left;
    }

    .hero-amount {
      margin: 0;
      font-size: clamp(32px, 5vw, 46px);
      font-weight: 700;
      letter-spacing: -0.04em;
      text-align: center;
    }

    .hero-caption {
      margin: 12px auto 0;
      max-width: 680px;
      color: var(--text-soft);
      line-height: 1.8;
      font-size: 15px;
      text-align: center;
    }

    .story-card {
      padding: 20px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(226, 232, 240, 0.88);
      box-shadow: var(--shadow-soft);
    }

    .story-title {
      margin: 0 0 10px;
      font-size: 18px;
      font-weight: 700;
    }

    .story-copy {
      margin: 0;
      color: var(--text-soft);
      line-height: 1.8;
      font-size: 14px;
    }

    .priority-list,
    .quarantine-list,
    .history-list,
    .log-list {
      display: grid;
      gap: 14px;
    }

    .priority-item,
    .quarantine-item,
    .history-item,
    .log-item {
      padding: 18px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.96);
      border: 1px solid rgba(226, 232, 240, 0.92);
      box-shadow: var(--shadow-soft);
    }

    .priority-item {
      cursor: pointer;
      transition: transform var(--transition), border-color var(--transition);
    }

    .priority-item:hover {
      transform: translateY(-1px);
      border-color: rgba(16, 185, 129, 0.28);
    }

    .priority-head,
    .quarantine-head,
    .history-head,
    .log-head,
    .dialog-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
    }

    .priority-title,
    .quarantine-title,
    .history-title,
    .dialog-title {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
    }

    .priority-copy {
      margin: 10px 0 0;
      color: var(--text-soft);
      line-height: 1.7;
      font-size: 14px;
    }

    .progress-bar {
      width: 100%;
      height: 12px;
      border-radius: 999px;
      background: rgba(148, 163, 184, 0.18);
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--green) 0%, #34d399 100%);
      transition: width 300ms ease;
    }

    .current-path {
      padding: 12px 14px;
      border-radius: 14px;
      background: rgba(15, 23, 42, 0.04);
      color: var(--text-soft);
      font-size: 13px;
      line-height: 1.7;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .split-layout {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 20px;
    }

    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }

    .toolbar-start {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .toolbar-end {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .toolbar-select {
      width: auto;
      min-width: 130px;
    }

    .quarantine-item,
    .history-item {
      display: grid;
      gap: 12px;
      transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
    }

    .quarantine-item:hover,
    .history-item:hover {
      transform: translateY(-1px);
      border-color: rgba(16, 185, 129, 0.24);
      box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
    }

    .quarantine-meta,
    .history-meta,
    .report-meta,
    .dialog-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      color: var(--text-soft);
      font-size: 12px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.05);
      color: var(--text-soft);
      font-size: 12px;
      font-weight: 600;
    }

    .chip.low {
      background: rgba(16, 185, 129, 0.12);
      color: var(--green-deep);
    }

    .chip.medium {
      background: rgba(245, 158, 11, 0.12);
      color: #b45309;
    }

    .chip.high {
      background: rgba(239, 68, 68, 0.12);
      color: #b91c1c;
    }

    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .checkbox-row.grow {
      align-items: flex-start;
    }

    .quarantine-main {
      display: grid;
      gap: 8px;
    }

    .quarantine-path {
      padding: 12px 14px;
      border-radius: 14px;
      background: rgba(15, 23, 42, 0.04);
      color: var(--text-soft);
      font-size: 12px;
      line-height: 1.7;
      word-break: break-word;
    }

    .history-title-block {
      display: grid;
      gap: 10px;
    }

    .history-summary {
      color: var(--text-soft);
      font-size: 14px;
      line-height: 1.7;
      margin: 0;
    }

    .history-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .history-select-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .history-select-row input[type="checkbox"] {
      width: 18px;
      height: 18px;
      margin-top: 4px;
    }

    .checkbox-row input[type="checkbox"] {
      width: 18px;
      height: 18px;
      padding: 0;
      border-radius: 6px;
    }

    .empty-card {
      text-align: center;
      padding: 42px 24px;
      color: var(--text-soft);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }

    .form-grid.single {
      grid-template-columns: 1fr;
    }

    .form-row {
      display: grid;
      gap: 8px;
    }

    .hint {
      color: var(--text-soft);
      font-size: 12px;
      line-height: 1.6;
    }

    .log-toolbar {
      display: grid;
      grid-template-columns: 1fr auto auto auto;
      gap: 10px;
      margin-bottom: 14px;
    }

    .log-item {
      background: #ffffff;
    }

    .log-level {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .log-level.success {
      color: var(--green-deep);
    }

    .log-level.warn {
      color: #b45309;
    }

    .log-level.error {
      color: #b91c1c;
    }

    .log-level.info {
      color: var(--blue);
    }

    .log-copy {
      margin: 10px 0 0;
      color: var(--text-soft);
      font-size: 13px;
      line-height: 1.7;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .code-block {
      margin: 0;
      padding: 16px;
      border-radius: 16px;
      background: #0f172a;
      color: #e2e8f0;
      font-size: 12px;
      line-height: 1.7;
      overflow: auto;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: rgba(15, 23, 42, 0.38);
      backdrop-filter: blur(8px);
      z-index: 40;
    }

    .modal-overlay.active {
      display: flex;
    }

    .dialog-card {
      width: min(900px, 100%);
      max-height: 90vh;
      overflow: auto;
      padding: 24px;
    }

    .dialog-card.small {
      width: min(520px, 100%);
    }

    .dialog-body {
      display: grid;
      gap: 18px;
      margin-top: 18px;
    }

    .toast-host {
      position: fixed;
      top: 20px;
      right: 20px;
      display: grid;
      gap: 10px;
      z-index: 50;
      width: min(360px, calc(100vw - 32px));
    }

    .toast {
      padding: 14px 16px;
      border-radius: 16px;
      color: white;
      box-shadow: 0 18px 35px rgba(15, 23, 42, 0.22);
      animation: toast-in 220ms ease;
    }

    .toast.success {
      background: linear-gradient(135deg, var(--green) 0%, #34d399 100%);
    }

    .toast.warn {
      background: linear-gradient(135deg, var(--orange) 0%, #fbbf24 100%);
    }

    .toast.error {
      background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
    }

    .toast.info {
      background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    }

    .toast-title {
      margin: 0;
      font-size: 14px;
      font-weight: 700;
    }

    .toast-copy {
      margin: 6px 0 0;
      font-size: 13px;
      line-height: 1.6;
      opacity: 0.94;
    }

    @keyframes toast-in {
      from {
        opacity: 0;
        transform: translateY(-6px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .celebration {
      position: relative;
      min-height: 110px;
    }

    .confetti {
      position: absolute;
      top: 12px;
      left: 50%;
      width: 10px;
      height: 24px;
      border-radius: 999px;
      animation: confetti-fall 1.4s ease forwards;
      opacity: 0;
    }

    .confetti.c1 { background: #10b981; transform: translate(-140px, -16px) rotate(12deg); animation-delay: 0.02s; }
    .confetti.c2 { background: #3b82f6; transform: translate(-96px, -8px) rotate(-18deg); animation-delay: 0.07s; }
    .confetti.c3 { background: #f59e0b; transform: translate(-48px, -12px) rotate(10deg); animation-delay: 0.12s; }
    .confetti.c4 { background: #ef4444; transform: translate(0px, -18px) rotate(-8deg); animation-delay: 0.17s; }
    .confetti.c5 { background: #10b981; transform: translate(46px, -12px) rotate(16deg); animation-delay: 0.22s; }
    .confetti.c6 { background: #3b82f6; transform: translate(92px, -10px) rotate(-12deg); animation-delay: 0.28s; }
    .confetti.c7 { background: #f59e0b; transform: translate(136px, -18px) rotate(20deg); animation-delay: 0.34s; }

    @keyframes confetti-fall {
      0% {
        opacity: 0;
        margin-top: -14px;
      }

      20% {
        opacity: 1;
      }

      100% {
        opacity: 0;
        margin-top: 84px;
      }
    }

    @media (max-width: 1180px) {
      .summary-grid,
      .category-grid,
      .history-grid,
      .form-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .settings-grid {
        grid-template-columns: 240px minmax(0, 1fr);
      }

      .split-layout {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 900px) {
      .app-shell {
        grid-template-columns: 1fr;
      }

      .sidebar {
        position: static;
        min-height: auto;
        border-right: 0;
        border-bottom: 1px solid rgba(226, 232, 240, 0.8);
      }

      .workspace {
        padding: 22px 16px 32px;
      }

      .summary-grid,
      .category-grid,
      .history-grid,
      .settings-grid,
      .form-grid,
      .log-toolbar {
        grid-template-columns: 1fr;
      }

      .settings-nav {
        position: static;
      }

      .topbar,
      .task-banner-head,
      .toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .topbar-actions {
        justify-content: flex-start;
      }

      .dialog-card {
        padding: 18px;
      }
    }
  `;
}

function renderClientScript() {
  return String.raw`
    (() => {
      const STORAGE_KEYS = {
        view: "diskclaw.v2.current-view",
        scanSettings: "diskclaw.v2.scan-settings",
        debugMode: "diskclaw.v2.debug-mode",
        settingsSection: "diskclaw.v2.settings-section"
      };

      const DEFAULT_SCAN_SETTINGS = {
        scanTarget: "",
        maxDepth: 5,
        maxFiles: 3000,
        largeFileThresholdBytes: 536870912,
        staleDays: 90
      };

      const DEFAULT_LLM_FORM = {
        enabled: false,
        provider: "openai-compatible",
        baseUrl: "https://api.openai.com/v1",
        apiKey: "",
        timeoutMs: 20000,
        maxRetries: 1,
        chatModel: "gpt-4.1-mini",
        reasonModel: "gpt-4.1",
        summaryModel: "gpt-4.1-mini"
      };

      const VIEW_META = {
        home: {
          eyebrow: "核心功能",
          title: "首页",
          copy: "打开软件后，先做一次智能扫描，再由系统用最安全的方式帮您完成清理。"
        },
        quarantine: {
          eyebrow: "安全恢复",
          title: "隔离区",
          copy: "所有清理结果都会先移动到隔离区，您可以随时恢复，也可以按需永久删除。"
        },
        history: {
          eyebrow: "结果回看",
          title: "清理历史",
          copy: "按时间查看每次扫描和清理记录，必要时导出报告，方便回顾释放空间的效果。"
        },
        settings: {
          eyebrow: "高级选项",
          title: "设置",
          copy: "集中管理扫描、清理、系统和 AI 相关配置。"
        }
      };

      const SETTINGS_SECTIONS = [
        { key: "basic", label: "基础设置", copy: "自动扫描、通知和默认目录。", icon: "基" },
        { key: "llm", label: "LLM 配置", copy: "第三方模型接入与密钥。", icon: "AI" },
        { key: "rules", label: "规则配置", copy: "扫描范围、白黑名单与阈值。", icon: "规" },
        { key: "system", label: "系统设置", copy: "窗口、语言、更新与启动项。", icon: "系" },
        { key: "data", label: "数据管理", copy: "备份、恢复和重置配置。", icon: "数" },
        { key: "schedule", label: "计划任务", copy: "系统与用户计划任务管理。", icon: "计" },
        { key: "update", label: "应用更新", copy: "检查版本与更新链接。", icon: "更" },
        { key: "advanced", label: "高级设置", copy: "日志、调试与关于信息。", icon: "高" }
      ];

      function normalizeSettingsSection(section) {
        return SETTINGS_SECTIONS.some((item) => item.key === section) ? section : "basic";
      }

      function getActiveSettingsSection() {
        const next = normalizeSettingsSection(appState.settings.activeSection);
        if (appState.settings.activeSection !== next) {
          appState.settings.activeSection = next;
          writeLocalJson(STORAGE_KEYS.settingsSection, next);
        }
        return next;
      }

      function setActiveSettingsSection(section) {
        const next = normalizeSettingsSection(section);
        appState.settings.activeSection = next;
        writeLocalJson(STORAGE_KEYS.settingsSection, next);
      }

      const systemMaintenanceScheduleId = "system-auto-maintenance";
      const appIconPath = "/electron/icon.png";

      const appState = {
        currentView: readLocalJson(STORAGE_KEYS.view, "home"),
        health: {
          ready: false,
          llm: {
            ok: false,
            reason: "姝ｅ湪妫€娴?.."
          }
        },
        activeTaskId: null,
        activeTaskType: null,
        activeTaskTitle: "",
        activeTaskTimer: null,
        activeTask: null,
        home: {
          status: "idle",
          progress: 0,
          scanStats: {
            scannedFiles: 0,
            candidateBytes: 0,
            currentPath: ""
          },
          cleanupStats: {
            completedItems: 0,
            totalItems: 0,
            releasedBytes: 0,
            currentPath: ""
          },
          plan: null,
          cleanup: null
        },
        reports: [],
        reportAnalytics: null,
        reportRange: "all",
        reportTypeFilter: "all",
        reportSearch: "",
        reportSort: "date-desc",
        reportDialog: null,
        reportDialogReportId: null,
        selectedReports: [],
        scheduleDialog: null,
        quarantine: {
          items: [],
          selectedIds: [],
          search: "",
          statusFilter: "all",
          sort: "date-desc"
        },
        settings: {
          preferences: null,
          llm: null,
          rules: null,
          desktop: null,
          schedules: [],
          scheduleEditor: null,
          update: null,
          appVersion: "0.1.0",
          activeSection: normalizeSettingsSection(readLocalJson(STORAGE_KEYS.settingsSection, "basic"))
        },
        logs: [],
        logsExpanded: false,
        debugMode: Boolean(readLocalJson(STORAGE_KEYS.debugMode, false))
      };

      const root = document;
      const mount = root.getElementById("viewMount");
      const navMount = root.getElementById("sideNav");
      const topbarMount = root.getElementById("topbar");
      const taskBannerMount = root.getElementById("taskBanner");
      const toastHost = root.getElementById("toastHost");

      let pendingConfirmResolver = null;

      function readLocalJson(key, fallbackValue) {
        try {
          const raw = window.localStorage.getItem(key);
          return raw ? JSON.parse(raw) : fallbackValue;
        } catch {
          return fallbackValue;
        }
      }

      function writeLocalJson(key, value) {
        try {
          window.localStorage.setItem(key, JSON.stringify(value));
        } catch {}
      }

      function getScanSettings() {
        return {
          ...DEFAULT_SCAN_SETTINGS,
          ...(readLocalJson(STORAGE_KEYS.scanSettings, {}) || {})
        };
      }

      function saveScanSettings(next) {
        writeLocalJson(STORAGE_KEYS.scanSettings, {
          ...getScanSettings(),
          ...next
        });
      }

      function escapeHtml(value) {
        return String(value  "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");
      }

      function fileNameFromPath(filePath) {
        const parts = String(filePath || "").split(/[\\\\/]/).filter(Boolean);
        return parts[parts.length - 1] || String(filePath || "鏈懡鍚嶆枃浠?);
      }

      function truncateMiddle(value, maxLength = 68) {
        const text = String(value || "");
        if (text.length <= maxLength) {
          return text;
        }

        const side = Math.max(10, Math.floor((maxLength - 3) / 2));
        return text.slice(0, side) + "..." + text.slice(text.length - side);
      }

      function formatBytes(value) {
        const size = Number(value || 0);
        if (!Number.isFinite(size) || size <= 0) {
          return "0 B";
        }
        if (size < 1024) {
          return size + " B";
        }

        const units = ["KB", "MB", "GB", "TB"];
        let next = size;
        let unitIndex = -1;

        do {
          next /= 1024;
          unitIndex += 1;
        } while (next >= 1024 && unitIndex < units.length - 1);

        return next.toFixed(next >= 10 ? 1 : 2) + " " + units[unitIndex];
      }

      function formatDate(value) {
        if (!value) {
          return "鏈煡";
        }
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
          return "鏈煡";
        }
        return date.toLocaleString("zh-CN", {
          hour12: false
        });
      }

      function daysSince(value) {
        const time = Date.parse(value || 0);
        if (!time) {
          return null;
        }
        const diff = Date.now() - time;
        return Math.max(0, Math.floor(diff / (24 * 60 * 60 * 1000)));
      }

      function typeLabel(type) {
        const map = {
          plan: "鏅鸿兘鎵弿",
          cleanup: "涓€閿竻鐞?,
          "duplicate-cleanup": "閲嶅鏂囦欢娓呯悊",
          "hotspot-cleanup": "涓嶅父鐢ㄧ洰褰曟竻鐞?,
          restore: "闅旂鎭㈠",
          "quarantine-delete": "闅旂鍖哄垹闄?,
          "quarantine-clear": "闅旂鍖烘竻绌?,
          "scheduled-cleanup": "鑷姩璁″垝浠诲姟"
        };

        return map[type] || type || "鏈煡绫诲瀷";
      }

      function riskChipLabel(level) {
        const map = {
          low: "浣庨闄?,
          medium: "涓闄?,
          high: "楂橀闄?
        };
        return map[level] || "鏈煡椋庨櫓";
      }

      function flattenExecutionResults(result) {
        if (!result) {
          return [];
        }

        if (Array.isArray(result.results)) {
          return result.results;
        }

        if (Array.isArray(result.groupResults)) {
          return result.groupResults.flatMap((item) => item.cleanupResults || []);
        }

        if (Array.isArray(result.hotspotResults)) {
          return result.hotspotResults.flatMap((item) => item.cleanupResults || []);
        }

        return [];
      }

      function summarizeCleanupResult(result) {
        const rows = flattenExecutionResults(result);
        const completed = rows.filter((item) => ["moved", "archived", "deleted", "recycled", "planned", "purged"].includes(item.status));
        return {
          count: completed.length,
          releasedBytes: completed.reduce((sum, item) => sum + Number(item.sizeBytes || 0), 0)
        };
      }

      function getLatestCleanupEntry() {
        return (appState.reports || []).find((item) => ["cleanup", "duplicate-cleanup", "hotspot-cleanup"].includes(item.type)) || null;
      }

      function getSystemMaintenanceSchedule() {
        return (appState.settings.schedules || []).find((item) => item.id === systemMaintenanceScheduleId) || null;
      }

      function formatIntervalMinutes(value) {
        const minutes = Number(value || 0);
        if (!minutes) {
          return "鏈缃?;
        }
        if (minutes >= 30 * 24 * 60) {
          return "姣忔湀";
        }
        if (minutes >= 7 * 24 * 60) {
          return "姣忓懆";
        }
        if (minutes >= 24 * 60) {
          return "姣忓ぉ";
        }
        return "姣?" + minutes + " 鍒嗛挓";
      }

      function summarizeScheduleAction(action) {
        return action === "auto-cleanup"
          ? "鎵弿瀹屾垚鍚庤嚜鍔ㄦ竻鐞嗕綆椋庨櫓椤?
          : "浠呰嚜鍔ㄦ壂鎻忓苟鐢熸垚鍒嗘瀽缁撴灉";
      }

      function formatScheduleSource(source) {
        return source === "system-preferences" ? "绯荤粺鑷姩璁″垝" : "鐢ㄦ埛鑷畾涔夎鍒?;
      }

      function formatUpdateState(update) {
        if (!update) {
          return "鏈鏌?;
        }

        if (!update.ok) {
          return update.reason || "妫€鏌ュけ璐?;
        }

        return update.updateAvailable
          ? "鍙戠幇鏂扮増鏈?" + update.latestVersion
          : "褰撳墠宸叉槸鏈€鏂扮増鏈?" + update.currentVersion;
      }

      function updateDownloadUrl() {
        return appState.settings.update?.downloadUrl || "";
      }

      function titleForScheduleRun(schedule = null) {
        if (!schedule) {
          return "璁″垝浠诲姟鎵ц涓?;
        }

        return schedule.action === "auto-cleanup"
          ? "鑷姩璁″垝娓呯悊涓?
          : "鑷姩璁″垝鎵弿涓?;
      }

      function buildUserScheduleDraft(schedule = null) {
        const defaults = {
          id: "",
          source: "user",
          name: "",
          enabled: true,
          action: "plan-only",
          cleanupMode: appState.settings.preferences?.defaultCleanupMode || "quarantine",
          dryRun: true,
          maxItems: 10,
          intervalMinutes: 10080,
          targetPath: getEffectiveTarget() || ""
        };

        if (!schedule) {
          return defaults;
        }

        return {
          ...defaults,
          id: schedule.id || "",
          source: schedule.source || "user",
          name: schedule.name || "",
          enabled: schedule.enabled !== false,
          action: schedule.action || defaults.action,
          cleanupMode: schedule.cleanupMode || defaults.cleanupMode,
          dryRun: schedule.dryRun !== false,
          maxItems: Number(schedule.maxItems || defaults.maxItems),
          intervalMinutes: Number(schedule.intervalMinutes || defaults.intervalMinutes),
          targetPath: schedule.targets?.[0]?.path || defaults.targetPath
        };
      }

      function downloadJsonFile(filename, data) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
      }

      function describeScheduleMissingReason(preferences = {}) {
        const target = String(preferences.defaultScanTarget || preferences.recentTargets?.[0] || "").trim();

        if (!target) {
          return "褰撳墠娌℃湁鍚敤鑷姩璁″垝浠诲姟锛屽洜涓鸿繕娌℃湁璁剧疆榛樿鎵弿鐩綍銆?;
        }

        if (!preferences.autoScanEnabled && !preferences.autoCleanupEnabled) {
          return "褰撳墠娌℃湁鍚敤鑷姩璁″垝浠诲姟锛屽洜涓鸿嚜鍔ㄦ壂鎻忓拰鑷姩娓呯悊閮藉浜庡叧闂姸鎬併€?;
        }

        return "褰撳墠娌℃湁鍚敤鑷姩璁″垝浠诲姟銆傚彧瑕佹偍璁剧疆榛樿鎵弿鐩綍锛屽苟寮€鍚嚜鍔ㄦ壂鎻忔垨鑷姩娓呯悊锛岀郴缁熷氨浼氳嚜鍔ㄥ垱寤鸿鍒掋€?;
      }

      function getHomeFooterText() {
        const latestCleanup = getLatestCleanupEntry();

        if (latestCleanup) {
          const days = daysSince(latestCleanup.createdAt);
          const daysText = days === null ? "鏈€杩? : days === 0 ? "浠婂ぉ" : (days + " 澶╁墠");
          const released = formatBytes(latestCleanup.reclaimedBytes || 0);
          return "涓婃娓呯悊锛? + daysText + "锛屽凡閲婃斁 " + released + " 绌洪棿銆?;
        }

        return "AI 鏅鸿兘鍒嗘瀽鎮ㄧ殑纾佺洏锛屽畨鍏ㄦ竻鐞嗗瀮鍦炬枃浠躲€?;
      }

      function getEffectiveTarget() {
        const localTarget = getScanSettings().scanTarget;
        if (localTarget) {
          return localTarget;
        }

        const preferred = appState.settings.preferences?.defaultScanTarget;
        if (preferred) {
          return preferred;
        }

        const remembered = appState.settings.preferences?.recentTargets?.[0];
        return remembered || "";
      }

      function toPathArray(value) {
        return String(value || "")
          .split(/\\r?\\n/)
          .map((item) => item.trim())
          .filter(Boolean);
      }

      function checked(value) {
        return value ? "checked" : "";
      }

      function selected(value, expected) {
        return value === expected ? "selected" : "";
      }

      function makeChip(text, variant = "") {
        return '<span class="chip' + (variant ? " " + variant : "") + '">' + escapeHtml(text) + "</span>";
      }

      function logEvent(message, data = null, level = "info") {
        appState.logs.unshift({
          id: Date.now() + "-" + Math.random().toString(16).slice(2),
          timeIso: new Date().toISOString(),
          message,
          data,
          level
        });

        appState.logs = appState.logs.slice(0, 500);
        renderLogsPanel();
      }

      function showToast(type, title, copy) {
        const node = document.createElement("div");
        node.className = "toast " + type;
        node.innerHTML =
          '<p class="toast-title">' + escapeHtml(title) + "</p>" +
          '<p class="toast-copy">' + escapeHtml(copy) + "</p>";
        toastHost.appendChild(node);

        window.setTimeout(() => {
          node.remove();
        }, 3200);
      }

      function showRequestErrorToast(error, fallbackTitle = "鎿嶄綔澶辫触") {
        const copy = error?.message || "璇锋眰娌℃湁鎴愬姛瀹屾垚銆?;
        showToast("error", fallbackTitle, copy);
        logEvent(fallbackTitle, {
          code: error?.code || "request_failed",
          message: copy
        }, "error");
      }

      async function requestJson(path, options = {}) {
        const response = await fetch(path, {
          headers: {
            "Content-Type": "application/json"
          },
          ...options
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          const error = new Error(payload?.error?.message || "璇锋眰澶辫触銆?);
          error.code = payload?.error?.code || "request_failed";
          error.payload = payload;
          throw error;
        }

        return payload;
      }

      function renderNavigation() {
        const items = [
          { view: "home", icon: "首", label: "首页" },
          { view: "quarantine", icon: "隔", label: "隔离区" },
          { view: "history", icon: "历", label: "清理历史" },
          { view: "settings", icon: "设", label: "设置" }
        ];

        navMount.innerHTML = items.map((item) => {
          const isActive = appState.currentView === item.view;
          return '<button class="nav-item' + (isActive ? " active" : "") + '" data-action="switch-view" data-view="' + item.view + '">' +
            '<span class="nav-icon">' + item.icon + "</span>" +
            '<span>' + item.label + "</span>" +
          "</button>";
        }).join("");
      }

      function renderTopbar() {
        const meta = VIEW_META[appState.currentView] || VIEW_META.home;
        const llmStatus = appState.health.llm?.ok
          ? '<span class="status-dot"></span>AI 已连接'
          : '<span class="status-dot ' + (appState.health.ready ? "warn" : "") + '"></span>' + escapeHtml(appState.health.llm?.reason || "AI 未配置");
        const target = getEffectiveTarget();

        topbarMount.innerHTML =
          '<div>' +
            '<div class="eyebrow">' + escapeHtml(meta.eyebrow) + "</div>" +
            '<h1 class="page-title">' + escapeHtml(meta.title) + "</h1>" +
            '<p class="page-copy">' + escapeHtml(meta.copy) + "</p>" +
          "</div>" +
          '<div class="topbar-actions">' +
            '<div class="status-chip">' + llmStatus + "</div>" +
            '<div class="status-chip"><span class="status-dot ' + (target ? "" : "warn") + '"></span>' + escapeHtml(target ? ("当前目录：" + truncateMiddle(target, 30)) : "尚未选择扫描位置") + "</div>" +
            '<button class="button-subtle" data-action="refresh-data">刷新数据</button>' +
          "</div>";
      }

      function renderTaskBanner() {
        if (!appState.activeTask) {
          taskBannerMount.className = "task-banner";
          taskBannerMount.innerHTML = "";
          return;
        }

        const task = appState.activeTask;
        const statusText = task.status === "paused" ? "宸叉殏鍋? : task.status === "cancelled" ? "宸插彇娑? : task.status === "failed" ? "鎵ц澶辫触" : "鎵ц涓?;
        const details = task.details || {};
        const meta = [];

        if (typeof details.scannedFiles === "number") {
          meta.push("宸叉壂鎻?" + details.scannedFiles + " 涓枃浠?);
        }

        if (typeof details.candidateFiles === "number") {
          meta.push("鍙戠幇 " + details.candidateFiles + " 涓€欓€夐」");
        }

        if (typeof details.completedItems === "number") {
          meta.push("宸插鐞?" + details.completedItems + " / " + (details.totalItems || 0) + " 涓枃浠?);
        }

        if (typeof details.releasedBytes === "number") {
          meta.push("宸查噴鏀?" + formatBytes(details.releasedBytes));
        }

        if (details.currentPath) {
          meta.push(truncateMiddle(details.currentPath, 44));
        }

        const canPause = task.status === "running";
        const canResume = task.status === "paused";
        const canCancel = ["queued", "running", "paused"].includes(task.status);

        taskBannerMount.className = "task-banner active";
        taskBannerMount.innerHTML =
          '<div class="task-banner-head">' +
            '<div>' +
              '<p class="task-banner-title">' + escapeHtml(appState.activeTaskTitle || typeLabel(task.type)) + " 路 " + escapeHtml(statusText) + "</p>" +
              '<p class="task-banner-copy">' + escapeHtml((task.message || "浠诲姟姝ｅ湪鍚庡彴鎵ц銆?) + " 褰撳墠杩涘害 " + (task.progress || 0) + "%") + "</p>" +
            "</div>" +
            '<div class="task-banner-actions">' +
              '<button class="button-subtle" data-action="pause-task" ' + (canPause ? "" : "disabled") + ">鏆傚仠</button>" +
              '<button class="button-subtle" data-action="resume-task" ' + (canResume ? "" : "disabled") + ">缁х画</button>" +
              '<button class="button-warn" data-action="cancel-task" ' + (canCancel ? "" : "disabled") + ">鍙栨秷</button>" +
            "</div>" +
          "</div>" +
          '<div class="task-banner-meta">' +
            meta.map((item) => '<span class="meta-pill">' + escapeHtml(item) + "</span>").join("") +
          "</div>";
      }

      function buildCategoryCards(plan) {
        const items = plan?.analysis?.recommendedItems || [];
        const duplicateGroups = plan?.analysis?.candidateSummary?.duplicateGroups || [];
        const sumBy = (predicate) => items
          .filter(predicate)
          .reduce((sum, item) => sum + Number(item.sizeBytes || 0), 0);

        return [
          {
            label: "绯荤粺鍨冨溇",
            value: sumBy((item) => ["temp", "cache", "log", "recycle-bin"].includes(item.category)),
            copy: "缂撳瓨銆佷复鏃舵枃浠躲€佹棩蹇楃瓑浣庨闄╁唴瀹?
          },
          {
            label: "閲嶅鏂囦欢",
            value: duplicateGroups.reduce((sum, item) => sum + Number(item.wastedBytes || 0), 0),
            copy: "閲嶅鍓湰鍜岄噸澶嶅畨瑁呭寘"
          },
          {
            label: "涓嬭浇鏂囦欢",
            value: sumBy((item) => item.category === "installer" || /downloads/i.test(item.path || "")),
            copy: "涓嬭浇鐩綍涓殑瀹夎鍖呬笌鍘嬬缉鏂囦欢"
          },
          {
            label: "涓嶅父鐢ㄦ枃浠?,
            value: sumBy((item) => item.category === "stale" || item.category === "large-file"),
            copy: "闀挎湡鏈闂垨浣撶Н鍋忓ぇ鐨勬枃浠?
          }
        ];
      }

      function getOneClickCleanupItems(plan) {
        return (plan?.analysis?.recommendedItems || [])
          .filter((item) => item.risk?.level === "low" && item.risk?.deletionAllowed)
          .map((item) => ({
            path: item.path,
            risk: item.risk,
            sizeBytes: item.sizeBytes
          }));
      }

      function renderAppIcon(alt = "DiskClaw") {
        return '<img src="' + appIconPath + '" alt="' + escapeHtml(alt) + '">';
      }

      function renderHomeIdle(target) {
        return \`
          <section class="card home-hero">
            <div class="home-stack">
              <div class="hero-logo">\${renderAppIcon("DiskClaw 鍥炬爣")}</div>
              <div>
                <h2 class="home-title">纾佺洏娓呯悊澶ц櫨</h2>
                <p class="home-subtitle">AI 鏅鸿兘鍒嗘瀽鎮ㄧ殑纾佺洏锛屽畨鍏ㄦ竻鐞嗗瀮鍦炬枃浠躲€?/p>
              </div>
              <button class="hero-orb scan-button" data-action="start-home-scan">
                <div class="hero-orb-state">
                  <div class="hero-orb-mark">鎵?/div>
                  <div class="hero-orb-label">\${target ? "涓€閿櫤鑳芥壂鎻? : "閫夋嫨鏂囦欢澶瑰紑濮?}</div>
                  <div class="hero-orb-note">\${target ? "鎵撳紑杞欢鍚庯紝涓夋瀹屾垚鎵弿涓庢竻鐞? : "鍏堥€夋嫨涓€涓父鐢ㄦ枃浠跺す"}</div>
                </div>
              </button>
              <div class="hero-kpis">
                <div class="hero-kpi-card">
                  <div class="card-kicker">鏍稿績娴佺▼</div>
                  <strong>3 姝ュ畬鎴?/strong>
                  <span>閫夋嫨鐩綍銆佹櫤鑳芥壂鎻忋€佸畨鍏ㄦ竻鐞嗭紝鍏ㄧ▼鍥寸粫鏅€氱敤鎴风殑鏈€鐭矾寰勮璁°€?/span>
                </div>
                <div class="hero-kpi-card">
                  <div class="card-kicker">瀹夊叏绛栫暐</div>
                  <strong>鍏堥殧绂诲悗澶勭悊</strong>
                  <span>鎵€鏈変竴閿竻鐞嗛兘浼氫紭鍏堣繘鍏ラ殧绂诲尯锛岀粰鎭㈠鍜屽鏌ョ暀鍑鸿冻澶熶綑鍦般€?/span>
                </div>
                <div class="hero-kpi-card">
                  <div class="card-kicker">鏅鸿兘鍒嗘瀽</div>
                  <strong>\${appState.health.llm?.ok ? "AI 宸茶繛鎺? : "鏈湴瑙勫垯鍙敤"}</strong>
                  <span>\${escapeHtml(appState.health.llm?.ok ? "浼氱粨鍚?LLM 鐢熸垚鏇存槗鐞嗚В鐨勬竻鐞嗗缓璁€? : "鍗充娇鏈厤缃?LLM锛屼篃鑳藉厛瀹屾垚鏈湴鎵弿鍜屽熀纭€鍒ゆ柇銆?)}</span>
                </div>
              </div>
              <div class="target-row">
                <div class="target-card \${target ? "active" : ""}">
                  <div class="target-card-head">
                    <span class="label-inline">鎵弿浣嶇疆</span>
                    <div class="inline-actions">
                      <button class="button-subtle" data-action="browse-target">閫夋嫨鏂囦欢澶?/button>
                    </div>
                  </div>
                  <input id="homeTargetInput" value="\${escapeHtml(target)}" placeholder="渚嬪锛欳:\\\\Users\\\\YourName\\\\Downloads">
                </div>
              </div>
              <p class="footer-note">\${escapeHtml(getHomeFooterText())}</p>
            </div>
          </section>
        \`;
      }

      function renderHomeScanning(target) {
        const stats = appState.home.scanStats;
        return \`
          <section class="card home-hero">
            <div class="home-stack">
              <div class="hero-logo">\${renderAppIcon("DiskClaw 鍥炬爣")}</div>
              <div>
                <h2 class="home-title">姝ｅ湪鎵弿涓?..</h2>
                <p class="home-subtitle">璇风◢鍊欙紝绯荤粺姝ｅ湪鍒嗘瀽褰撳墠鐩綍涓殑鍙竻鐞嗗唴瀹广€?/p>
              </div>
              <div class="hero-orb progress" style="--progress:\${Math.max(6, appState.home.progress || 0)};">
                <div class="hero-orb-state">
                  <div class="hero-orb-mark">\${Math.max(0, Math.round(appState.home.progress || 0))}%</div>
                  <div class="hero-orb-label">姝ｅ湪鎵弿涓?..</div>
                  <div class="hero-orb-note">鎵弿浼氬湪鍚庡彴缁х画鎵ц</div>
                </div>
              </div>
              <div class="summary-grid">
                <div class="metric-card">
                  <div class="metric-label">宸叉壂鎻忔枃浠舵暟</div>
                  <div class="metric-value">\${stats.scannedFiles || 0}</div>
                  <div class="metric-copy">鎵弿杩涘害浼氭寔缁疄鏃舵洿鏂般€?/div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">宸插彂鐜板彲娓呯悊绌洪棿</div>
                  <div class="metric-value">\${formatBytes(stats.candidateBytes || 0)}</div>
                  <div class="metric-copy">鏍规嵁宸插畬鎴愮殑閮ㄥ垎鎵弿缁撴灉浼扮畻銆?/div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">褰撳墠鐩綍</div>
                  <div class="metric-value">\${escapeHtml(fileNameFromPath(target || stats.currentPath || "鏈缃?))}</div>
                  <div class="metric-copy">姝ｅ湪閫愬眰妫€鏌ユ枃浠朵笌瀛愮洰褰曘€?/div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">鍚庡彴鎵ц</div>
                  <div class="metric-value">宸插紑鍚?/div>
                  <div class="metric-copy">鎮ㄥ彲浠ュ垏鎹㈠埌鍏朵粬椤甸潰缁х画鎿嶄綔銆?/div>
                </div>
              </div>
              <div class="current-path" title="\${escapeHtml(stats.currentPath || target || "")}">\${escapeHtml(stats.currentPath || target || "姝ｅ湪鍑嗗鎵弿鐩綍...")}</div>
              <div class="home-actions">
                <button class="button-secondary" data-action="browse-target">鏇存崲浣嶇疆</button>
                <button class="button-warn" data-action="cancel-task">鍙栨秷鎵弿</button>
              </div>
            </div>
          </section>
        \`;
      }

      function renderHomeScanComplete() {
        const plan = appState.home.plan;
        const categoryCards = buildCategoryCards(plan);
        const cleanupItems = getOneClickCleanupItems(plan);
        const priorities = plan?.analysis?.priorities || [];
        const summary = plan?.analysis?.candidateSummary || {};
        const story = plan?.llm?.output?.userMessage || plan?.analysis?.summaryText || "AI 宸插畬鎴愬垵姝ュ垎鏋愶紝寤鸿浼樺厛澶勭悊浣庨闄╃殑鍨冨溇鏂囦欢銆?;

        return \`
          <section class="card home-hero">
            <div class="home-stack" style="width:min(980px, 100%);">
              <div class="hero-summary">
                <div>
                  <div class="eyebrow" style="margin:0 auto 14px; width:max-content;">鎵弿瀹屾垚</div>
                  <h2 class="hero-amount">鍙竻鐞嗙┖闂达細\${formatBytes(summary.reclaimableBytes || 0)}</h2>
                  <p class="hero-caption">绯荤粺宸茬粡瀹屾垚鎵弿涓庡垎鏋愩€備笅闈㈡槸鏈€鍊煎緱浼樺厛澶勭悊鐨勫洓绫荤┖闂存満浼氥€?/p>
                </div>
                <div class="category-grid">
                  \${categoryCards.map((item) => \`
                    <div class="category-card">
                      <div class="card-kicker">\${escapeHtml(item.label)}</div>
                      <h3 class="category-title">\${escapeHtml(item.label)}</h3>
                      <div class="category-value">\${formatBytes(item.value)}</div>
                      <p class="category-copy">\${escapeHtml(item.copy)}</p>
                    </div>
                  \`).join("")}
                </div>
                <div class="home-actions">
                  <button class="button-primary warm" data-action="start-home-cleanup" \${cleanupItems.length ? "" : "disabled"}>涓€閿竻鐞?/button>
                  <button class="button-secondary" data-action="rerun-home-scan">閲嶆柊鎵弿</button>
                  <button class="button-subtle" data-action="switch-view" data-view="history">鏌ョ湅璇︽儏</button>
                </div>
                <p class="hero-tip">鎵€鏈夋枃浠跺皢鍏堢Щ鍔ㄥ埌闅旂鍖猴紝鍙殢鏃舵仮澶嶃€傚綋鍓嶄竴閿竻鐞嗕粎浼樺厛澶勭悊浣庨闄╅」锛屽叡 \${cleanupItems.length} 椤广€?/p>
                <div class="story-card">
                  <h3 class="story-title">AI 鍒嗘瀽缁撴灉</h3>
                  <p class="story-copy">\${escapeHtml(story)}</p>
                </div>
                <div class="split-layout">
                  <div class="story-card">
                    <h3 class="story-title">鏈鎵弿鎽樿</h3>
                    <div class="summary-grid">
                      <div class="metric-card">
                        <div class="metric-label">鍊欓€夋枃浠舵暟</div>
                        <div class="metric-value">\${summary.totalCandidates || 0}</div>
                      </div>
                      <div class="metric-card">
                        <div class="metric-label">浣庨闄╅」</div>
                        <div class="metric-value">\${summary.riskCounts?.low || 0}</div>
                      </div>
                      <div class="metric-card">
                        <div class="metric-label">閲嶅鏂囦欢缁?/div>
                        <div class="metric-value">\${(summary.duplicateGroups || []).length}</div>
                      </div>
                      <div class="metric-card">
                        <div class="metric-label">涓嶅父鐢ㄧ洰褰?/div>
                        <div class="metric-value">\${(summary.directoryHotspots || []).length}</div>
                      </div>
                    </div>
                  </div>
                  <div class="story-card">
                    <h3 class="story-title">浼樺厛寤鸿</h3>
                    <div class="priority-list">
                      \${priorities.length ? priorities.slice(0, 3).map((item) => \`
                        <div class="priority-item" data-action="switch-view" data-view="history">
                          <div class="priority-head">
                            <h4 class="priority-title">\${escapeHtml(item.title || "浼樺厛澶勭悊椤?)}</h4>
                            \${makeChip(formatBytes(item.impactedBytes || 0))}
                          </div>
                          <p class="priority-copy">\${escapeHtml(item.description || "寤鸿灏藉揩鏌ョ湅璇︾粏鎶ュ憡銆?)}</p>
                        </div>
                      \`).join("") : '<div class="empty-card">褰撳墠娌℃湁棰濆浼樺厛寤鸿锛屾偍鍙互鐩存帴寮€濮嬫竻鐞嗐€?/div>'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        \`;
      }

      function renderHomeCleaning() {
        const cleanup = appState.home.cleanupStats;
        return \`
          <section class="card home-hero">
            <div class="home-stack">
              <div class="hero-logo">\${renderAppIcon("DiskClaw 鍥炬爣")}</div>
              <div>
                <h2 class="home-title">姝ｅ湪瀹夊叏娓呯悊...</h2>
                <p class="home-subtitle">鎵€鏈夋枃浠堕兘浼氬厛杩涘叆闅旂鍖猴紝鎮ㄤ箣鍚庝粛鍙仮澶嶃€?/p>
              </div>
              <div class="story-card" style="text-align:left;">
                <div class="progress-bar">
                  <div class="progress-fill" style="width:\${Math.max(8, appState.home.progress || 0)}%;"></div>
                </div>
                <div class="summary-grid" style="margin-top:18px;">
                  <div class="metric-card">
                    <div class="metric-label">宸叉竻鐞嗘枃浠?/div>
                    <div class="metric-value">\${cleanup.completedItems || 0}</div>
                  </div>
                  <div class="metric-card">
                    <div class="metric-label">鐩爣鏂囦欢</div>
                    <div class="metric-value">\${cleanup.totalItems || 0}</div>
                  </div>
                  <div class="metric-card">
                    <div class="metric-label">宸查噴鏀剧┖闂?/div>
                    <div class="metric-value">\${formatBytes(cleanup.releasedBytes || 0)}</div>
                  </div>
                  <div class="metric-card">
                    <div class="metric-label">褰撳墠杩涘害</div>
                    <div class="metric-value">\${Math.round(appState.home.progress || 0)}%</div>
                  </div>
                </div>
                <div class="current-path" title="\${escapeHtml(cleanup.currentPath || "")}">\${escapeHtml(cleanup.currentPath || "姝ｅ湪鍑嗗娓呯悊鏂囦欢...")}</div>
              </div>
              <div class="home-actions">
                <button class="button-warn" data-action="cancel-task">鍙栨秷娓呯悊</button>
                <button class="button-subtle" data-action="switch-view" data-view="quarantine">鏌ョ湅闅旂鍖?/button>
              </div>
            </div>
          </section>
        \`;
      }

      function renderHomeCleanComplete() {
        const result = appState.home.cleanup;
        const summary = summarizeCleanupResult(result);
        return \`
          <section class="card home-hero">
            <div class="home-stack">
              <div class="celebration">
                <span class="confetti c1"></span>
                <span class="confetti c2"></span>
                <span class="confetti c3"></span>
                <span class="confetti c4"></span>
                <span class="confetti c5"></span>
                <span class="confetti c6"></span>
                <span class="confetti c7"></span>
              </div>
              <div class="hero-logo success">\${renderAppIcon("DiskClaw 鍥炬爣")}<span class="success-badge">鉁?/span></div>
              <div>
                <h2 class="home-title">娓呯悊瀹屾垚锛?/h2>
                <p class="home-subtitle">鏈鍏遍噴鏀?\${formatBytes(summary.releasedBytes)}锛屾竻鐞嗕簡 \${summary.count} 涓枃浠躲€傛墍鏈夌粨鏋滈兘宸茬粡杩涘叆闅旂鍖烘垨鎸夋偍鐨勬墽琛屾柟寮忓鐞嗗畬鎴愩€?/p>
              </div>
              <div class="summary-grid">
                <div class="metric-card">
                  <div class="metric-label">鎵ц妯″紡</div>
                  <div class="metric-value">\${escapeHtml(result?.mode || "quarantine")}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">鎴愬姛澶勭悊</div>
                  <div class="metric-value">\${summary.count}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">闅旂鍖烘枃浠舵暟</div>
                  <div class="metric-value">\${appState.quarantine.items.filter((item) => !item.restoredAt).length}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">鎶ュ憡缂栧彿</div>
                  <div class="metric-value">\${escapeHtml(result?.reportId || "宸茬敓鎴?)}</div>
                </div>
              </div>
              <div class="story-card">
                <h3 class="story-title">鏈鏀跺熬鎻愮ず</h3>
                <p class="story-copy">濡傛灉浣犲彧鏄兂纭缁撴灉鏄惁瀹夊叏锛屽彲浠ュ厛鍘婚殧绂诲尯鎶芥煡鍑犻」锛涘鏋滀綘鎯冲鐩樻湰娆℃竻鐞嗘敹鐩婏紝鍙互鐩存帴鏌ョ湅璇︾粏鎶ュ憡銆?/p>
              </div>
              <div class="home-actions">
                <button class="button-primary" data-action="open-latest-history">鏌ョ湅璇︽儏</button>
                <button class="button-secondary" data-action="home-reset">杩斿洖棣栭〉</button>
              </div>
            </div>
          </section>
        \`;
      }

      function renderHomeView() {
        const target = getEffectiveTarget();

        if (appState.home.status === "scanning") {
          return renderHomeScanning(target);
        }

        if (appState.home.status === "scanComplete" && appState.home.plan) {
          return renderHomeScanComplete();
        }

        if (appState.home.status === "cleaning") {
          return renderHomeCleaning();
        }

        if (appState.home.status === "cleanComplete" && appState.home.cleanup) {
          return renderHomeCleanComplete();
        }

        return renderHomeIdle(target);
      }

      function quarantineMatchesSearch(item) {
        const query = String(appState.quarantine.search || "").trim().toLowerCase();
        if (!query) {
          return true;
        }

        const haystack = [
          item.id,
          item.originalPath,
          fileNameFromPath(item.originalPath),
          formatDate(item.createdAt),
          formatBytes(item.sizeBytes || 0)
        ].join(" ").toLowerCase();

        return haystack.includes(query);
      }

      function quarantineMatchesStatus(item) {
        if (appState.quarantine.statusFilter === "all") {
          return true;
        }

        if (appState.quarantine.statusFilter === "active") {
          return !item.restoredAt;
        }

        if (appState.quarantine.statusFilter === "restored") {
          return Boolean(item.restoredAt);
        }

        return true;
      }

      function compareQuarantineItems(left, right) {
        const sortMode = appState.quarantine.sort || "date-desc";

        if (sortMode === "size-desc") {
          return Number(right.sizeBytes || 0) - Number(left.sizeBytes || 0);
        }

        if (sortMode === "name-asc") {
          return fileNameFromPath(left.originalPath).localeCompare(fileNameFromPath(right.originalPath), "zh-CN");
        }

        return Date.parse(right.createdAt || 0) - Date.parse(left.createdAt || 0);
      }

      function filteredQuarantineItems() {
        return (appState.quarantine.items || [])
          .filter((item) => quarantineMatchesSearch(item) && quarantineMatchesStatus(item))
          .sort(compareQuarantineItems);
      }

      function summarizeSelectedQuarantine() {
        const selected = (appState.quarantine.items || []).filter((item) => appState.quarantine.selectedIds.includes(item.id));
        return {
          count: selected.length,
          totalBytes: selected.reduce((sum, item) => sum + Number(item.sizeBytes || 0), 0)
        };
      }

      function renderQuarantineView() {
        const activeItems = appState.quarantine.items.filter((item) => !item.restoredAt);
        const visibleItems = filteredQuarantineItems();
        const selectedSummary = summarizeSelectedQuarantine();
        const totalBytes = activeItems.reduce((sum, item) => sum + Number(item.sizeBytes || 0), 0);
        const retention = appState.settings.preferences?.quarantineRetentionDays || 30;

        if (!appState.quarantine.items.length) {
          return \`
            <section class="card">
              <div class="toolbar">
                <div>
                  <h2 class="section-title">闅旂鍖?/h2>
                  <p class="section-copy">褰撳墠娌℃湁闅旂鏂囦欢锛屽悗缁竴閿竻鐞嗙殑缁撴灉浼氳嚜鍔ㄥ嚭鐜板湪杩欓噷銆?/p>
                </div>
              </div>
              <div class="empty-card">杩樻病鏈夐殧绂绘枃浠躲€傛竻鐞嗗畬鎴愬悗锛屾偍鍙互鍦ㄨ繖閲岃繘琛屾仮澶嶆垨姘镐箙鍒犻櫎銆?/div>
            </section>
          \`;
        }

        return \`
          <section class="card">
            <div class="toolbar">
              <div>
                <h2 class="section-title">闅旂鍖?/h2>
                <p class="section-copy">鍏遍殧绂?\${activeItems.length} 涓枃浠讹紝鍗犵敤 \${formatBytes(totalBytes)} 绌洪棿銆傞殧绂绘枃浠跺皢鍦?\${retention} 澶╁悗鑷姩姘镐箙鍒犻櫎銆?/p>
              </div>
              <div class="toolbar-end">
                <input id="quarantineSearchInput" class="toolbar-select" value="\${escapeHtml(appState.quarantine.search)}" placeholder="鎼滅储鏂囦欢鍚?/ 璺緞 / 鏃堕棿">
                <select class="toolbar-select" id="quarantineStatusSelect">
                  <option value="all" \${selected(appState.quarantine.statusFilter, "all")}>鍏ㄩ儴鐘舵€?/option>
                  <option value="active" \${selected(appState.quarantine.statusFilter, "active")}>寰呮仮澶?/option>
                  <option value="restored" \${selected(appState.quarantine.statusFilter, "restored")}>宸叉仮澶?/option>
                </select>
                <select class="toolbar-select" id="quarantineSortSelect">
                  <option value="date-desc" \${selected(appState.quarantine.sort, "date-desc")}>鎸夐殧绂绘椂闂存帓搴?/option>
                  <option value="size-desc" \${selected(appState.quarantine.sort, "size-desc")}>鎸夋枃浠跺ぇ灏忔帓搴?/option>
                  <option value="name-asc" \${selected(appState.quarantine.sort, "name-asc")}>鎸夋枃浠跺悕鎺掑簭</option>
                </select>
                <button class="button-secondary" data-action="restore-selected" \${appState.quarantine.selectedIds.length ? "" : "disabled"}>鎭㈠閫変腑椤?/button>
                <button class="button-warn" data-action="delete-selected" \${appState.quarantine.selectedIds.length ? "" : "disabled"}>姘镐箙鍒犻櫎閫変腑椤?/button>
                <button class="button-warn" data-action="clear-quarantine" \${activeItems.length ? "" : "disabled"}>娓呯┖闅旂鍖?/button>
              </div>
            </div>
            <div class="summary-grid" style="margin-bottom:18px;">
              <div class="metric-card">
                <div class="metric-label">闅旂鏂囦欢鏁?/div>
                <div class="metric-value">\${activeItems.length}</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">褰撳墠鍗犵敤绌洪棿</div>
                <div class="metric-value">\${formatBytes(totalBytes)}</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">宸查€夋枃浠?/div>
                <div class="metric-value">\${appState.quarantine.selectedIds.length}</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">閫変腑鏂囦欢绌洪棿</div>
                <div class="metric-value">\${formatBytes(selectedSummary.totalBytes)}</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">淇濈暀鏃堕棿</div>
                <div class="metric-value">\${retention} 澶?/div>
              </div>
            </div>
            <div class="quarantine-list history-scroll">
              <div class="quarantine-item">
                <div class="quarantine-head">
                  <div class="checkbox-row grow">
                    <input type="checkbox" id="selectAllQuarantine" data-action="toggle-all-quarantine" \${visibleItems.length && visibleItems.every((item) => appState.quarantine.selectedIds.includes(item.id)) ? "checked" : ""}>
                    <div class="quarantine-main">
                      <label for="selectAllQuarantine">鍏ㄩ€夊綋鍓嶆湭鎭㈠鏂囦欢</label>
                      <p class="history-summary">鎵归噺鎭㈠閫傚悎璇垹澶嶅師锛屾壒閲忔案涔呭垹闄や細鐩存帴閲婃斁闅旂鍖哄崰鐢ㄧ┖闂淬€傚綋鍓嶇瓫閫夌粨鏋滃叡 \${visibleItems.length} 椤广€?/p>
                    </div>
                  </div>
                </div>
                <div class="history-actions">
                  <span class="chip">\${selectedSummary.count} 宸查€?/span>
                  <span class="chip">\${formatBytes(selectedSummary.totalBytes)} 閫変腑绌洪棿</span>
                </div>
              </div>
              \${visibleItems.map((item) => {
                const selected = appState.quarantine.selectedIds.includes(item.id);
                return \`
                  <div class="quarantine-item">
                    <div class="quarantine-head">
                      <div class="checkbox-row grow">
                        <input type="checkbox" data-action="toggle-quarantine-item" data-id="\${escapeHtml(item.id)}" \${selected ? "checked" : ""} \${item.restoredAt ? "disabled" : ""}>
                        <div class="quarantine-main">
                          <h3 class="quarantine-title">\${escapeHtml(fileNameFromPath(item.originalPath))}</h3>
                          <div class="quarantine-meta">
                            \${makeChip(item.restoredAt ? "宸叉仮澶? : "寰呮仮澶?, item.restoredAt ? "" : "low")}
                            \${makeChip("鏂囦欢澶у皬 " + formatBytes(item.sizeBytes || 0))}
                            \${makeChip("闅旂鏃堕棿 " + formatDate(item.createdAt))}
                          </div>
                        </div>
                      </div>
                      <div class="inline-actions">
                        <button class="button-secondary" data-action="restore-quarantine-item" data-id="\${escapeHtml(item.id)}" \${item.restoredAt ? "disabled" : ""}>鎭㈠</button>
                        <button class="button-warn" data-action="delete-quarantine-item" data-id="\${escapeHtml(item.id)}" \${item.restoredAt ? "disabled" : ""}>姘镐箙鍒犻櫎</button>
                      </div>
                    </div>
                    <div class="quarantine-path" title="\${escapeHtml(item.originalPath)}">鍘熻矾寰勶細\${escapeHtml(item.originalPath)}</div>
                  </div>
                \`;
              }).join("")}
            </div>
          </section>
        \`;
      }

      function reportMatchesRange(report) {
        if (appState.reportRange === "all") {
          return true;
        }

        const days = Number(appState.reportRange || 0);
        if (!days) {
          return true;
        }

        const time = Date.parse(report.createdAt || 0);
        if (!time) {
          return false;
        }

        return Date.now() - time <= days * 24 * 60 * 60 * 1000;
      }

      function reportMatchesType(report) {
        if (appState.reportTypeFilter === "all") {
          return true;
        }

        if (appState.reportTypeFilter === "plan") {
          return report.type === "plan";
        }

        if (appState.reportTypeFilter === "restore") {
          return report.type === "restore";
        }

        if (appState.reportTypeFilter === "execution") {
          return ["cleanup", "duplicate-cleanup", "hotspot-cleanup", "quarantine-delete", "quarantine-clear"].includes(report.type);
        }

        return true;
      }

      function reportMatchesSearch(report) {
        const query = String(appState.reportSearch || "").trim().toLowerCase();
        if (!query) {
          return true;
        }

        const haystack = [
          report.reportId,
          report.type,
          formatDate(report.createdAt),
          report.itemCount,
          report.candidateCount,
          report.reclaimedBytes,
          report.reclaimableBytes
        ].join(" ").toLowerCase();

        return haystack.includes(query);
      }

      function compareReports(left, right) {
        const sortMode = appState.reportSort || "date-desc";

        if (sortMode === "space-desc") {
          return Number(right.reclaimedBytes || right.reclaimableBytes || 0) - Number(left.reclaimedBytes || left.reclaimableBytes || 0);
        }

        if (sortMode === "files-desc") {
          const rightCount = Number(right.itemCount || right.candidateCount || 0);
          const leftCount = Number(left.itemCount || left.candidateCount || 0);
          return rightCount - leftCount;
        }

        return Date.parse(right.createdAt || 0) - Date.parse(left.createdAt || 0);
      }

      function renderHistoryView() {
        const reports = (appState.reports || [])
          .filter((report) => reportMatchesRange(report) && reportMatchesType(report) && reportMatchesSearch(report))
          .sort(compareReports);
        const selectedSummary = summarizeReportsByIds(appState.selectedReports);
        const analytics = appState.reportAnalytics || {
          last7Days: { reportCount: 0, reclaimedBytes: 0 },
          last30Days: { reportCount: 0, reclaimedBytes: 0 }
        };

        return \`
          <section class="card">
            <div class="toolbar">
              <div>
                <h2 class="section-title">娓呯悊鍘嗗彶</h2>
                <p class="section-copy">鎸夋椂闂村€掑簭鏌ョ湅鎵€鏈夊巻鍙茶褰曪紝骞跺彲鎵撳紑璇︾粏鎶ュ憡鎴栫洿鎺ュ鍑恒€?/p>
              </div>
              <div class="toolbar-end">
                <input id="historySearchInput" class="toolbar-select" value="\${escapeHtml(appState.reportSearch)}" placeholder="鎼滅储鎶ュ憡 ID / 绫诲瀷 / 鏃堕棿">
                <select class="toolbar-select" id="historyRangeSelect">
                  <option value="all" \${selected(appState.reportRange, "all")}>鍏ㄩ儴鏃堕棿</option>
                  <option value="7" \${selected(appState.reportRange, "7")}>鏈€杩?7 澶?/option>
                  <option value="30" \${selected(appState.reportRange, "30")}>鏈€杩?30 澶?/option>
                </select>
                <select class="toolbar-select" id="historyTypeSelect">
                  <option value="all" \${selected(appState.reportTypeFilter, "all")}>鍏ㄩ儴绫诲瀷</option>
                  <option value="plan" \${selected(appState.reportTypeFilter, "plan")}>鎵弿璁板綍</option>
                  <option value="execution" \${selected(appState.reportTypeFilter, "execution")}>鎵ц璁板綍</option>
                  <option value="restore" \${selected(appState.reportTypeFilter, "restore")}>鎭㈠璁板綍</option>
                </select>
                <select class="toolbar-select" id="historySortSelect">
                  <option value="date-desc" \${selected(appState.reportSort, "date-desc")}>鎸夋椂闂存帓搴?/option>
                  <option value="space-desc" \${selected(appState.reportSort, "space-desc")}>鎸夐噴鏀剧┖闂存帓搴?/option>
                  <option value="files-desc" \${selected(appState.reportSort, "files-desc")}>鎸夋枃浠舵暟鎺掑簭</option>
                </select>
                <button class="button-subtle" data-action="refresh-history">鍒锋柊鍘嗗彶</button>
                <button class="button-warn" data-action="delete-selected-reports" \${appState.selectedReports.length ? "" : "disabled"}>鍒犻櫎閫変腑鎶ュ憡</button>
              </div>
            </div>
            <div class="history-grid" style="margin-bottom:18px;">
              <div class="metric-card">
                <div class="metric-label">杩?7 澶╂姤鍛婃暟</div>
                <div class="metric-value">\${analytics.last7Days.reportCount || 0}</div>
                <div class="metric-copy">杩?7 澶╂柊澧炵殑鎵弿涓庢竻鐞嗚褰曘€?/div>
              </div>
              <div class="metric-card">
                <div class="metric-label">杩?7 澶╅噴鏀剧┖闂?/div>
                <div class="metric-value">\${formatBytes(analytics.last7Days.reclaimedBytes || 0)}</div>
                <div class="metric-copy">鍖呭惈宸叉墽琛屼笌璁″垝閲婃斁鐨勭┖闂存€婚噺銆?/div>
              </div>
              <div class="metric-card">
                <div class="metric-label">杩?30 澶╅噴鏀剧┖闂?/div>
                <div class="metric-value">\${formatBytes(analytics.last30Days.reclaimedBytes || 0)}</div>
                <div class="metric-copy">甯姪鎮ㄤ簡瑙ｉ暱鏈熸竻鐞嗘敹鐩娿€?/div>
              </div>
            </div>
            \${reports.length ? \`
              <div class="history-list history-timeline history-scroll">
                <div class="history-item">
                  <div class="history-head">
                    <div class="history-title-block">
                      <div class="history-select-row">
                        <input type="checkbox" data-action="toggle-all-reports" \${reports.length && reports.every((report) => appState.selectedReports.includes(report.reportId)) ? "checked" : ""}>
                        <div>
                          <h3 class="history-title">鎵归噺绠＄悊</h3>
                          <p class="history-summary">鍙湪杩欓噷鎵归噺閫夋嫨銆佹煡鐪嬨€佸鍑烘垨鍒犻櫎鎶ュ憡銆傞暱鍒楄〃浼氬湪妯″潡鍐呴儴婊氬姩锛屼笉浼氭媺闀挎暣涓〉闈€?/p>
                        </div>
                      </div>
                    </div>
                    <div class="history-actions">
                      <span class="chip">\${appState.selectedReports.length} 宸查€?/span>
                      <span class="chip">\${formatBytes(selectedSummary.reclaimableBytes)} 鍏宠仈绌洪棿</span>
                    </div>
                  </div>
                </div>
                \${reports.map((report) => \`
                  <div class="history-item">
                    <div class="history-head">
                      <div class="history-title-block">
                        <div class="history-select-row">
                          <input type="checkbox" data-action="toggle-report" data-report-id="\${escapeHtml(report.reportId)}" \${appState.selectedReports.includes(report.reportId) ? "checked" : ""}>
                          <h3 class="history-title">\${escapeHtml(typeLabel(report.type))}</h3>
                        </div>
                        <div class="history-meta">
                          \${makeChip(formatDate(report.createdAt))}
                          \${report.itemCount ? makeChip("鏂囦欢鏁?" + report.itemCount) : ""}
                          \${report.candidateCount ? makeChip("鍊欓€夐」 " + report.candidateCount) : ""}
                          \${report.reclaimedBytes || report.reclaimableBytes ? makeChip("绌洪棿 " + formatBytes(report.reclaimedBytes || report.reclaimableBytes || 0), "low") : ""}
                        </div>
                        <p class="history-summary">\${escapeHtml(
                          report.type === "plan"
                            ? "鏈璁板綍鏉ヨ嚜鎵弿涓庡垎鏋愶紝鐢ㄤ簬甯姪鍒ゆ柇鍝簺绌洪棿鏈€鍊煎緱浼樺厛澶勭悊銆?
                            : report.type === "restore"
                              ? "杩欐槸涓€鏉￠殧绂诲尯鎭㈠璁板綍锛屽彲鐢ㄤ簬鍥炵湅鎭㈠缁撴灉銆?
                              : "杩欐槸涓€鏉″疄闄呮墽琛岃褰曪紝鍖呭惈娓呯悊缁撴灉鍜岀┖闂存敹鐩娿€?
                        )}</p>
                      </div>
                      <div class="history-actions">
                        <button class="button-secondary" data-action="view-report" data-report-id="\${escapeHtml(report.reportId)}">鏌ョ湅鎶ュ憡</button>
                        <button class="button-subtle" data-action="export-report" data-report-id="\${escapeHtml(report.reportId)}" data-format="json">瀵煎嚭 JSON</button>
                        <button class="button-subtle" data-action="export-report" data-report-id="\${escapeHtml(report.reportId)}" data-format="md">瀵煎嚭 Markdown</button>
                        <button class="button-warn" data-action="delete-report" data-report-id="\${escapeHtml(report.reportId)}">鍒犻櫎</button>
                      </div>
                    </div>
                  </div>
                \`).join("")}
              </div>
            \` : '<div class="empty-card">褰撳墠绛涢€夎寖鍥村唴杩樻病鏈夊巻鍙茶褰曘€?/div>'}
          </section>
        \`;
      }

      function filteredReports() {
        return (appState.reports || []).filter((report) => reportMatchesRange(report) && reportMatchesType(report) && reportMatchesSearch(report));
      }

      function getAdjacentReportId(direction) {
        const reports = filteredReports();
        const currentId = appState.reportDialogReportId;
        const index = reports.findIndex((item) => item.reportId === currentId);
        if (index < 0) {
          return null;
        }

        const nextIndex = direction === "prev" ? index - 1 : index + 1;
        if (nextIndex < 0 || nextIndex >= reports.length) {
          return null;
        }

        return reports[nextIndex].reportId;
      }

      function renderSettingSection(sectionKey, title, copy, body) {
        const open = getActiveSettingsSection() === sectionKey;
        return \`
          <section class="setting-card setting-group">
            <button class="setting-head" aria-expanded="\${open ? "true" : "false"}" data-action="switch-settings-section" data-section="\${sectionKey}">
              <div class="setting-head-text">
                <span class="setting-name">\${escapeHtml(title)}</span>
                <span class="setting-copy">\${escapeHtml(copy)}</span>
              </div>
              <span class="fold-indicator">鈱?/span>
            </button>
            <div class="setting-body" style="\${open ? "" : "display:none;"}">
              \${body}
            </div>
          </section>
        \`;
      }

      function renderSettingsView() {
        const pref = appState.settings.preferences || {
          autoScanEnabled: false,
          autoScanInterval: "weekly",
          autoCleanupEnabled: false,
          quarantineRetentionDays: 30,
          notifications: {
            scanComplete: true,
            cleanupComplete: true,
            errors: true
          },
          language: "zh-CN",
          checkUpdates: "auto",
          rememberWindowBounds: true
        };
        const llm = appState.settings.llm || {
          ...DEFAULT_LLM_FORM,
          hasApiKey: false
        };
        const rules = appState.settings.rules || {
          excludePaths: [],
          whitelistPaths: [],
          blacklistPaths: []
        };
        const desktop = appState.settings.desktop || {
          isAlwaysOnTop: false,
          closeBehavior: "ask",
          openAtLogin: false
        };
        const systemSchedule = getSystemMaintenanceSchedule();
        const userSchedules = (appState.settings.schedules || []).filter((item) => item.id !== systemMaintenanceScheduleId);
        const update = appState.settings.update;
        const scan = getScanSettings();

        return \`
          <section class="settings-grid">
            \${renderSettingSection("basic", "鍩虹璁剧疆", "鏅€氱敤鎴锋渶甯哥敤鐨勯厤缃兘闆嗕腑鍦ㄨ繖閲屻€?, \`
              <div class="story-card" style="margin-bottom:18px;">
                <h3 class="story-title">褰撳墠鑷姩璁″垝鎽樿</h3>
                \${systemSchedule ? \`
                  <div class="summary-grid" style="margin-top:14px;">
                    <div class="metric-card">
                      <div class="metric-label">璁″垝鐘舵€?/div>
                      <div class="metric-value">宸插惎鐢?/div>
                      <div class="metric-copy">\${escapeHtml(systemSchedule.name || "鑷姩鎵弿")}</div>
                    </div>
                    <div class="metric-card">
                      <div class="metric-label">鎵ц棰戠巼</div>
                      <div class="metric-value">\${escapeHtml(formatIntervalMinutes(systemSchedule.intervalMinutes))}</div>
                      <div class="metric-copy">?\${escapeHtml(formatDate(systemSchedule.nextRunAt))}</div>
                    </div>
                    <div class="metric-card">
                      <div class="metric-label">鎵ц鍔ㄤ綔</div>
                      <div class="metric-value">\${escapeHtml(systemSchedule.action === "auto-cleanup" ? "鑷姩娓呯悊" : "鑷姩鎵弿")}</div>
                      <div class="metric-copy">\${escapeHtml(summarizeScheduleAction(systemSchedule.action))}</div>
                    </div>
                    <div class="metric-card">
                      <div class="metric-label">鎵弿鐩綍</div>
                      <div class="metric-value">\${escapeHtml(fileNameFromPath(systemSchedule.targets?.[0]?.path || "鏈缃?))}</div>
                      <div class="metric-copy" title="\${escapeHtml(systemSchedule.targets?.[0]?.path || "")}">\${escapeHtml(truncateMiddle(systemSchedule.targets?.[0]?.path || "鏈缃?, 36))}</div>
                    </div>
                  </div>
                  <div class="button-row" style="margin-top:14px;">
                    <button class="button-secondary" data-action="run-system-schedule-now" data-schedule-id="\${escapeHtml(systemSchedule.id)}">绔嬪嵆鎵ц涓€娆?/button>
                    <button class="button-subtle" data-action="refresh-system-schedule">鍒锋柊鑷姩璁″垝</button>
                  </div>
                \` : \`
                  <p class="story-copy">\${escapeHtml(describeScheduleMissingReason(pref))}</p>
                \`}
              </div>
              <div class="form-grid">
                <label class="form-row">
                  <span class="label">鑷姩鎵弿</span>
                  <div class="checkbox-row">
                    <input id="prefAutoScanEnabled" type="checkbox" \${checked(pref.autoScanEnabled)}>
                    <span>寮€鍚嚜鍔ㄦ壂鎻?/span>
                  </div>
                </label>
                <label class="form-row">
                  <span class="label">鎵弿闂撮殧</span>
                  <select id="prefAutoScanInterval">
                    <option value="daily" \${selected(pref.autoScanInterval, "daily")}>姣忓ぉ</option>
                    <option value="weekly" \${selected(pref.autoScanInterval, "weekly")}>姣忓懆</option>
                    <option value="monthly" \${selected(pref.autoScanInterval, "monthly")}>姣忔湀</option>
                  </select>
                </label>
                <label class="form-row">
                  <span class="label">鑷姩娓呯悊</span>
                  <div class="checkbox-row">
                    <input id="prefAutoCleanupEnabled" type="checkbox" \${checked(pref.autoCleanupEnabled)}>
                    <span>鎵弿瀹屾垚鍚庤嚜鍔ㄦ竻鐞嗕綆椋庨櫓椤?/span>
                  </div>
                </label>
                <label class="form-row">
                  <span class="label">闅旂鏂囦欢淇濈暀鏃堕棿</span>
                  <select id="prefRetentionDays">
                    <option value="7" \${selected(String(pref.quarantineRetentionDays), "7")}>7 澶?/option>
                    <option value="15" \${selected(String(pref.quarantineRetentionDays), "15")}>15 澶?/option>
                    <option value="30" \${selected(String(pref.quarantineRetentionDays), "30")}>30 澶?/option>
                    <option value="9999" \${selected(String(pref.quarantineRetentionDays), "9999")}>姘镐箙</option>
                  </select>
                </label>
              </div>
              <div class="form-grid" style="margin-top:14px;">
                <label class="form-row">
                  <span class="label">閫氱煡璁剧疆</span>
                  <div class="checkbox-row">
                    <input id="prefNotifyScan" type="checkbox" \${checked(pref.notifications?.scanComplete)}>
                    <span>鎵弿瀹屾垚閫氱煡</span>
                  </div>
                </label>
                <label class="form-row">
                  <span class="label">&nbsp;</span>
                  <div class="checkbox-row">
                    <input id="prefNotifyCleanup" type="checkbox" \${checked(pref.notifications?.cleanupComplete)}>
                    <span>娓呯悊瀹屾垚閫氱煡</span>
                  </div>
                </label>
                <label class="form-row">
                  <span class="label">&nbsp;</span>
                  <div class="checkbox-row">
                    <input id="prefNotifyErrors" type="checkbox" \${checked(pref.notifications?.errors)}>
                    <span>閿欒閫氱煡</span>
                  </div>
                </label>
              </div>
              <div class="button-row" style="margin-top:18px;">
                <button class="button-primary" data-action="save-basic-settings">淇濆瓨鍩虹璁剧疆</button>
              </div>
            \`)}
            \${renderSettingSection("llm", "LLM 閰嶇疆", "榛樿鎶樺彔锛屽彧鏈夊湪闇€瑕佹帴鍏ョ涓夋柟妯″瀷鏃跺啀灞曞紑淇敼銆?, \`
              <p class="panel-tip">淇敼姝ら厤缃彲鑳藉奖鍝?AI 鍒嗘瀽鍑嗙‘鎬э紝闈炲繀瑕佽鍕夸慨鏀广€?/p>
              <div class="form-grid" style="margin-top:14px;">
                <label class="form-row">
                  <span class="label">鍚敤 AI 鍒嗘瀽</span>
                  <div class="checkbox-row">
                    <input id="llmEnabled" type="checkbox" \${checked(llm.enabled)}>
                    <span>鍏佽璋冪敤澶栭儴 LLM 鎺ュ彛</span>
                  </div>
                </label>
                <label class="form-row">
                  <span class="label">鏈嶅姟绫诲瀷</span>
                  <select id="llmProvider">
                    <option value="openai-compatible" \${selected(llm.provider, "openai-compatible")}>OpenAI Compatible</option>
                  </select>
                </label>
                <label class="form-row">
                  <span class="label">Base URL</span>
                  <input id="llmBaseUrl" value="\${escapeHtml(llm.baseUrl || "")}" placeholder="https://api.openai.com/v1">
                </label>
                <label class="form-row">
                  <span class="label">API Key</span>
                  <input id="llmApiKey" value="" placeholder="\${escapeHtml(llm.hasApiKey ? "宸蹭繚瀛橈紝濡傞渶鏇存崲璇烽噸鏂拌緭鍏? : "sk-...")}">
                </label>
                <label class="form-row">
                  <span class="label">瀵硅瘽妯″瀷</span>
                  <input id="llmChatModel" value="\${escapeHtml(llm.models?.chat || DEFAULT_LLM_FORM.chatModel)}">
                </label>
                <label class="form-row">
                  <span class="label">鍒嗘瀽妯″瀷</span>
                  <input id="llmReasonModel" value="\${escapeHtml(llm.models?.reason || DEFAULT_LLM_FORM.reasonModel)}">
                </label>
                <label class="form-row">
                  <span class="label">鎬荤粨妯″瀷</span>
                  <input id="llmSummaryModel" value="\${escapeHtml(llm.models?.summary || DEFAULT_LLM_FORM.summaryModel)}">
                </label>
                <label class="form-row">
                  <span class="label">瓒呮椂鏃堕棿锛坢s锛?/span>
                  <input id="llmTimeoutMs" type="number" value="\${Number(llm.timeoutMs || DEFAULT_LLM_FORM.timeoutMs)}">
                </label>
                <label class="form-row">
                  <span class="label">閲嶈瘯娆℃暟</span>
                  <input id="llmMaxRetries" type="number" value="\${Number(llm.maxRetries || DEFAULT_LLM_FORM.maxRetries)}">
                </label>
              </div>
              <div class="button-row" style="margin-top:18px;">
                <button class="button-subtle" data-action="load-llm-config">璇诲彇宸蹭繚瀛橀厤缃?/button>
                <button class="button-subtle" data-action="fill-llm-defaults">浣跨敤榛樿閰嶇疆</button>
                <button class="button-secondary" data-action="test-llm-config">娴嬭瘯杩炴帴</button>
                <button class="button-primary" data-action="save-llm-config">淇濆瓨閰嶇疆</button>
              </div>
            \`)}
            \${renderSettingSection("rules", "瑙勫垯閰嶇疆", "淇濈暀 v1.0 鐨勮鍒欒兘鍔涳紝骞剁粰鍑烘帹鑽愰厤缃叆鍙ｃ€?, \`
              <p class="panel-tip">淇敼姝ら厤缃彲鑳藉鑷磋鍒犻噸瑕佹枃浠讹紝璇疯皑鎱庢搷浣溿€?/p>
              <div class="form-grid" style="margin-top:14px;">
                <label class="form-row">
                  <span class="label">榛樿鎵弿鐩綍</span>
                  <input id="rulesScanTarget" value="\${escapeHtml(scan.scanTarget || "")}" placeholder="C:\\\\Users\\\\YourName\\\\Downloads">
                </label>
                <div class="form-row">
                  <span class="label">閫夋嫨鐩綍</span>
                  <div class="button-row">
                    <button class="button-subtle" data-action="browse-target">娴忚鏂囦欢澶?/button>
                  </div>
                </div>
                <label class="form-row">
                  <span class="label">鏈€澶ф壂鎻忔繁搴?/span>
                  <input id="rulesMaxDepth" type="number" value="\${Number(scan.maxDepth || DEFAULT_SCAN_SETTINGS.maxDepth)}">
                </label>
                <label class="form-row">
                  <span class="label">鏈€澶ф枃浠舵暟</span>
                  <input id="rulesMaxFiles" type="number" value="\${Number(scan.maxFiles || DEFAULT_SCAN_SETTINGS.maxFiles)}">
                </label>
                <label class="form-row">
                  <span class="label">澶ф枃浠堕槇鍊硷紙bytes锛?/span>
                  <input id="rulesLargeFileThreshold" type="number" value="\${Number(scan.largeFileThresholdBytes || DEFAULT_SCAN_SETTINGS.largeFileThresholdBytes)}">
                </label>
                <label class="form-row">
                  <span class="label">鏈闂ぉ鏁伴槇鍊?/span>
                  <input id="rulesStaleDays" type="number" value="\${Number(scan.staleDays || DEFAULT_SCAN_SETTINGS.staleDays)}">
                </label>
              </div>
              <div class="form-grid single" style="margin-top:14px;">
                <label class="form-row">
                  <span class="label">鎺掗櫎璺緞</span>
                  <textarea id="rulesExcludePaths" placeholder="姣忚涓€涓矾寰?>\${escapeHtml((rules.excludePaths || []).join("\\n"))}</textarea>
                </label>
                <label class="form-row">
                  <span class="label">鐧藉悕鍗曡矾寰?/span>
                  <textarea id="rulesWhitelistPaths" placeholder="姣忚涓€涓矾寰?>\${escapeHtml((rules.whitelistPaths || []).join("\\n"))}</textarea>
                </label>
                <label class="form-row">
                  <span class="label">榛戝悕鍗曡矾寰?/span>
                  <textarea id="rulesBlacklistPaths" placeholder="姣忚涓€涓矾寰?>\${escapeHtml((rules.blacklistPaths || []).join("\\n"))}</textarea>
                </label>
              </div>
              <div class="button-row" style="margin-top:18px;">
                <button class="button-subtle" data-action="load-rules">璇诲彇瑙勫垯</button>
                <button class="button-subtle" data-action="reset-rules">鎭㈠榛樿瑙勫垯</button>
                <button class="button-primary" data-action="save-rules">淇濆瓨瑙勫垯閰嶇疆</button>
              </div>
            \`)}
            \${renderSettingSection("system", "绯荤粺璁剧疆", "绐楀彛銆侀€氱煡銆佽瑷€涓庢洿鏂板亸濂介兘鏀惧湪杩欓噷銆?, \`
              <div class="form-grid">
                <label class="form-row">
                  <span class="label">寮€鏈鸿嚜鍔ㄥ惎鍔?/span>
                  <div class="checkbox-row">
                    <input id="sysOpenAtLogin" type="checkbox" \${checked(desktop.openAtLogin)}>
                    <span>绯荤粺鍚姩鍚庤嚜鍔ㄨ繍琛?/span>
                  </div>
                </label>
                <label class="form-row">
                  <span class="label">鍏抽棴绐楀彛鏃?/span>
                  <select id="sysCloseBehavior">
                    <option value="ask" \${selected(desktop.closeBehavior, "ask")}>姣忔璇㈤棶</option>
                    <option value="tray" \${selected(desktop.closeBehavior, "tray")}>鏈€灏忓寲鍒版墭鐩?/option>
                  </select>
                </label>
                <label class="form-row">
                  <span class="label">鎬绘槸缃《</span>
                  <div class="checkbox-row">
                    <input id="sysAlwaysOnTop" type="checkbox" \${checked(desktop.isAlwaysOnTop)}>
                    <span>涓荤獥鍙ｄ繚鎸佸湪鏈€鍓?/span>
                  </div>
                </label>
                <label class="form-row">
                  <span class="label">璁颁綇绐楀彛澶у皬</span>
                  <div class="checkbox-row">
                    <input id="sysRememberBounds" type="checkbox" \${checked(pref.rememberWindowBounds)}>
                    <span>閲嶅惎鍚庢仮澶嶄笂娆＄獥鍙ｅ昂瀵?/span>
                  </div>
                </label>
                <label class="form-row">
                  <span class="label">璇█</span>
                  <select id="sysLanguage">
                    <option value="zh-CN" \${selected(pref.language, "zh-CN")}>绠€浣撲腑鏂?/option>
                    <option value="en" \${selected(pref.language, "en")}>English</option>
                  </select>
                </label>
                <label class="form-row">
                  <span class="label">妫€鏌ユ洿鏂?/span>
                  <select id="sysCheckUpdates">
                    <option value="auto" \${selected(pref.checkUpdates, "auto")}>鑷姩妫€鏌?/option>
                    <option value="manual" \${selected(pref.checkUpdates, "manual")}>鎵嬪姩妫€鏌?/option>
                  </select>
                </label>
                <label class="form-row">
                  <span class="label">鏇存柊娓呭崟鍦板潃</span>
                  <input id="updateManifestUrl" value="\${escapeHtml(pref.updateManifestUrl || "")}" placeholder="https://example.com/diskclaw-update.json">
                </label>
              </div>
              <div class="button-row" style="margin-top:18px;">
                <button class="button-subtle" data-action="load-desktop-settings">璇诲彇妗岄潰璁剧疆</button>
                <button class="button-secondary" data-action="test-notification">娴嬭瘯绯荤粺閫氱煡</button>
                <button class="button-primary" data-action="save-system-settings">淇濆瓨绯荤粺璁剧疆</button>
              </div>
            \`)}
            \${renderSettingSection("data", "鏁版嵁绠＄悊", "澶囦唤閰嶇疆銆佹仮澶嶉厤缃€侀噸缃墍鏈夎缃€?, \`
              <div class="story-card">
                <h3 class="story-title">澶囦唤涓庢仮澶?/h3>
                <p class="story-copy">浣犲彲浠ユ妸褰撳墠閰嶇疆瀵煎嚭鎴愪竴浠?JSON 澶囦唤锛屼篃鍙互鎶婂浠芥仮澶嶅洖褰撳墠璁惧銆傞噸缃細娓呴櫎鎵€鏈夐厤缃苟鎭㈠榛樿鍊笺€?/p>
                <div class="button-row" style="margin-top:16px;">
                  <button class="button-secondary" data-action="backup-config">澶囦唤閰嶇疆</button>
                  <button class="button-subtle" data-action="restore-config">鎭㈠閰嶇疆</button>
                  <button class="button-warn" data-action="reset-all-config">閲嶇疆鎵€鏈夎缃?/button>
                </div>
                <p class="story-copy" style="margin-top:12px;">闅旂鏂囦欢浼氭寜鈥滀繚鐣欐椂闂粹€濊嚜鍔ㄦ竻鐞嗭紝褰撳墠璁剧疆涓殑鑷姩璁″垝浼氭寔缁悓姝ャ€?/p>
              </div>
            \`) }
          </section>
          <section class="card" style="margin-top:20px;">
            <h2 class="section-title">璁″垝浠诲姟</h2>
            <p class="section-copy">绯荤粺鑷姩璁″垝鏉ヨ嚜鍩虹璁剧疆锛岀敤鎴疯鍒掑垯鏉ヨ嚜鎵嬪姩閰嶇疆銆備袱鑰呭垎寮€灞曠ず锛岄伩鍏嶆贩娣嗐€?/p>
            <div class="split-layout" style="margin-top:18px;">
              <div class="story-card">
                <h3 class="story-title">绯荤粺鑷姩璁″垝</h3>
                \${systemSchedule ? \`
                  <div class="history-item" style="margin-top:14px;">
                    <div class="history-head">
                      <div>
                        <h4 class="history-title">\${escapeHtml(systemSchedule.name)}</h4>
                        <div class="history-meta">
                          \${makeChip(formatScheduleSource(systemSchedule.source), "low")}
                          \${makeChip(formatIntervalMinutes(systemSchedule.intervalMinutes))}
                          \${makeChip(systemSchedule.action === "auto-cleanup" ? "鑷姩娓呯悊" : "鑷姩鎵弿")}
                        </div>
                      </div>
                      <div class="inline-actions">
                        <button class="button-secondary" data-action="run-system-schedule-now" data-schedule-id="\${escapeHtml(systemSchedule.id)}">绔嬪嵆鎵ц涓€娆?/button>
                      </div>
                    </div>
                    <p class="list-copy">?\${escapeHtml(formatDate(systemSchedule.nextRunAt))}</p>
                    <p class="list-copy" title="\${escapeHtml(systemSchedule.targets?.[0]?.path || "")}">?\${escapeHtml(truncateMiddle(systemSchedule.targets?.[0]?.path || "?", 84))}</p>
                  </div>
                \` : '<div class="empty-card" style="margin-top:14px;">褰撳墠娌℃湁绯荤粺鑷姩璁″垝銆傚紑鍚嚜鍔ㄦ壂鎻忔垨鑷姩娓呯悊鍚庝細鑷姩鍒涘缓銆?/div>'}
              </div>
              <div class="story-card">
                <h3 class="story-title">鐢ㄦ埛鑷畾涔夎鍒?/h3>
                <div class="button-row" style="margin-top:14px;">
                  <button class="button-primary" data-action="new-user-schedule">鏂板缓鐢ㄦ埛璁″垝</button>
                  \${appState.settings.scheduleEditor ? '<button class="button-subtle" data-action="cancel-user-schedule-edit">鍙栨秷缂栬緫</button>' : ""}
                </div>
                \${appState.settings.scheduleEditor ? \`
                  <div class="story-card" style="margin-top:14px;">
                    <h4 class="story-title">\${appState.settings.scheduleEditor.id ? "缂栬緫鐢ㄦ埛璁″垝" : "鏂板缓鐢ㄦ埛璁″垝"}</h4>
                    <div class="form-grid" style="margin-top:14px;">
                      <label class="form-row">
                        <span class="label">璁″垝鍚嶇О</span>
                        <input id="userScheduleName" value="\${escapeHtml(appState.settings.scheduleEditor.name || "")}" placeholder="渚嬪锛氭瘡鍛ㄤ笅杞界洰褰曟壂鎻?>
                      </label>
                      <label class="form-row">
                        <span class="label">鎵弿鐩綍</span>
                        <input id="userScheduleTargetPath" value="\${escapeHtml(appState.settings.scheduleEditor.targetPath || "")}" placeholder="C:\\\\Users\\\\YourName\\\\Downloads">
                      </label>
                      <label class="form-row">
                        <span class="label">鎵ц棰戠巼</span>
                        <select id="userScheduleInterval">
                          <option value="1440" \${selected(String(appState.settings.scheduleEditor.intervalMinutes), "1440")}>姣忓ぉ</option>
                          <option value="10080" \${selected(String(appState.settings.scheduleEditor.intervalMinutes), "10080")}>姣忓懆</option>
                          <option value="43200" \${selected(String(appState.settings.scheduleEditor.intervalMinutes), "43200")}>姣忔湀</option>
                        </select>
                      </label>
                      <label class="form-row">
                        <span class="label">鎵ц鍔ㄤ綔</span>
                        <select id="userScheduleAction">
                          <option value="plan-only" \${selected(appState.settings.scheduleEditor.action, "plan-only")}>浠呮壂鎻?/option>
                          <option value="auto-cleanup" \${selected(appState.settings.scheduleEditor.action, "auto-cleanup")}>鑷姩娓呯悊浣庨闄╅」</option>
                        </select>
                      </label>
                      <label class="form-row">
                        <span class="label">娓呯悊妯″紡</span>
                        <select id="userScheduleCleanupMode">
                          <option value="quarantine" \${selected(appState.settings.scheduleEditor.cleanupMode, "quarantine")}>闅旂鍖?/option>
                          <option value="archive" \${selected(appState.settings.scheduleEditor.cleanupMode, "archive")}>褰掓。</option>
                          <option value="recycle-bin" \${selected(appState.settings.scheduleEditor.cleanupMode, "recycle-bin")}>鍥炴敹绔?/option>
                          <option value="permanent" \${selected(appState.settings.scheduleEditor.cleanupMode, "permanent")}>姘镐箙鍒犻櫎</option>
                        </select>
                      </label>
                      <label class="form-row">
                        <span class="label">鏈€澶у鐞嗛」</span>
                        <input id="userScheduleMaxItems" type="number" value="\${Number(appState.settings.scheduleEditor.maxItems || 10)}">
                      </label>
                    </div>
                    <div class="form-grid" style="margin-top:14px;">
                      <label class="form-row">
                        <span class="label">璁″垝鐘舵€?/span>
                        <div class="checkbox-row">
                          <input id="userScheduleEnabled" type="checkbox" \${checked(appState.settings.scheduleEditor.enabled)}>
                          <span>鍚敤姝よ鍒?/span>
                        </div>
                      </label>
                      <label class="form-row">
                        <span class="label">Dry Run</span>
                        <div class="checkbox-row">
                          <input id="userScheduleDryRun" type="checkbox" \${checked(appState.settings.scheduleEditor.dryRun)}>
                          <span>浠呮ā鎷熸墽琛岋紝涓嶇湡姝ｆ竻鐞?/span>
                        </div>
                      </label>
                    </div>
                    <div class="button-row" style="margin-top:18px;">
                      <button class="button-subtle" data-action="browse-user-schedule-target">閫夋嫨鐩綍</button>
                      <button class="button-primary" data-action="save-user-schedule">\${appState.settings.scheduleEditor.id ? "淇濆瓨淇敼" : "鍒涘缓璁″垝"}</button>
                    </div>
                  </div>
                \` : ""}
                \${userSchedules.length ? \`
                  <div class="history-list" style="margin-top:14px;">
                    \${userSchedules.map((item) => \`
                      <div class="history-item">
                        <div class="history-head">
                          <div>
                            <h4 class="history-title">\${escapeHtml(item.name || "鏈懡鍚嶈鍒?)}</h4>
                            <div class="history-meta">
                              \${makeChip(formatScheduleSource(item.source))}
                              \${makeChip(formatIntervalMinutes(item.intervalMinutes))}
                              \${makeChip(item.action === "auto-cleanup" ? "鑷姩娓呯悊" : item.action === "plan-only" ? "浠呮壂鎻? : item.action)}
                            </div>
                          </div>
                          <div class="inline-actions">
                            <button class="button-secondary" data-action="run-user-schedule-now" data-schedule-id="\${escapeHtml(item.id)}">绔嬪嵆鎵ц</button>
                            <button class="button-subtle" data-action="view-user-schedule" data-schedule-id="\${escapeHtml(item.id)}">鏌ョ湅璇︽儏</button>
                            <button class="button-subtle" data-action="edit-user-schedule" data-schedule-id="\${escapeHtml(item.id)}">缂栬緫</button>
                            <button class="button-warn" data-action="delete-user-schedule" data-schedule-id="\${escapeHtml(item.id)}">鍒犻櫎</button>
                          </div>
                        </div>
                        <p class="list-copy">?\${escapeHtml(formatDate(item.nextRunAt))}</p>
                        <p class="list-copy" title="\${escapeHtml(item.targets?.[0]?.path || "")}">?\${escapeHtml(truncateMiddle(item.targets?.[0]?.path || "?", 72))}</p>
                      </div>
                    \`).join("")}
                  </div>
                \` : '<div class="empty-card" style="margin-top:14px;">褰撳墠娌℃湁鐢ㄦ埛鑷畾涔夎鍒掋€?/div>'}
              </div>
            </div>
          </section>
          <section class="card" style="margin-top:20px;">
            <h2 class="section-title">搴旂敤鏇存柊</h2>
            <p class="section-copy">浣犲彲浠ユ墜鍔ㄦ鏌ョ増鏈紝涔熷彲浠ュ紑鍚嚜鍔ㄦ鏌ャ€傛洿鏂版鏌ョ粨鏋滀細鏄剧ず鍦ㄨ繖閲岋紝骞跺彲鐩存帴鎵撳紑涓嬭浇椤点€?/p>
            <div class="summary-grid" style="margin-top:18px;">
              <div class="metric-card">
                <div class="metric-label">褰撳墠鐗堟湰</div>
                <div class="metric-value">v\${escapeHtml(appState.settings.appVersion || "0.1.0")}</div>
                <div class="metric-copy">涓庡畨瑁呭寘鐗堟湰淇濇寔涓€鑷淬€?/div>
              </div>
              <div class="metric-card">
                <div class="metric-label">鏇存柊鐘舵€?/div>
                <div class="metric-value">\${escapeHtml(formatUpdateState(update))}</div>
                <div class="metric-copy">\${escapeHtml(update?.downloadUrl ? "鍙洿鎺ユ墦寮€涓嬭浇椤点€? : "璇峰厛閰嶇疆鏇存柊娓呭崟鍦板潃銆?)}</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">鑷姩妫€鏌?/div>
                <div class="metric-value">\${pref.checkUpdates === "auto" ? "寮€鍚? : "鍏抽棴"}</div>
                <div class="metric-copy">淇濆瓨鍚庝細鍦ㄥ惎鍔ㄦ椂鍜屽畾鏃惰疆璇㈡椂妫€鏌ャ€?/div>
              </div>
              <div class="metric-card">
                <div class="metric-label">鏇存柊鍦板潃</div>
                <div class="metric-value">\${escapeHtml(pref.updateManifestUrl ? "?" : "?")}</div>
                <div class="metric-copy" title="\${escapeHtml(pref.updateManifestUrl || "")}">\${escapeHtml(truncateMiddle(pref.updateManifestUrl || "?", 52))}</div>
              </div>
            </div>
            <div class="button-row" style="margin-top:18px;">
              <button class="button-secondary" data-action="check-update-now">绔嬪嵆妫€鏌ユ洿鏂?/button>
              <button class="button-subtle" data-action="open-update-url" \${update?.downloadUrl ? "" : "disabled"}>鎵撳紑涓嬭浇椤?/button>
            </div>
            <div class="story-card" style="margin-top:16px;">
              <h3 class="story-title">鏇存柊璇存槑</h3>
              <p class="story-copy">\${escapeHtml(update?.releaseNotes || "鏆傛棤鏇存柊璇存槑銆?)}</p>
            </div>
          </section>
          <section class="card" style="margin-top:20px;">
            \${renderSettingSection("advanced", "楂樼骇璁剧疆", "鏃ュ織涓庤皟璇曡兘鍔涢粯璁ゆ姌鍙狅紝閬垮厤鎵撴壈鏅€氱敤鎴枫€?, \`
              <div class="log-toolbar">
                <input id="logSearch" placeholder="鎼滅储鏃ュ織鍏抽敭璇?>
                <select id="logLevelFilter">
                  <option value="all">鍏ㄩ儴绾у埆</option>
                  <option value="info">淇℃伅</option>
                  <option value="success">鎴愬姛</option>
                  <option value="warn">璀﹀憡</option>
                  <option value="error">閿欒</option>
                </select>
                <select id="logTimeFilter">
                  <option value="all">鍏ㄩ儴鏃堕棿</option>
                  <option value="5m">鏈€杩?5 鍒嗛挓</option>
                  <option value="1h">鏈€杩?1 灏忔椂</option>
                  <option value="24h">鏈€杩?24 灏忔椂</option>
                </select>
                <button class="button-subtle" id="toggleLogExpand" data-action="toggle-log-expand">\${appState.logsExpanded ? "鏀惰捣" : "灞曞紑鍏ㄩ儴"}</button>
              </div>
              <div class="button-row" style="margin-bottom:14px;">
                <button class="button-subtle" data-action="export-logs" data-format="txt">瀵煎嚭 TXT</button>
                <button class="button-subtle" data-action="export-logs" data-format="json">瀵煎嚭 JSON</button>
                <button class="button-warn" data-action="clear-logs">娓呯┖鏃ュ織</button>
                <button class="button-subtle" data-action="toggle-debug-mode">\${appState.debugMode ? "鍏抽棴璋冭瘯妯″紡" : "寮€鍚皟璇曟ā寮?}</button>
                <button class="button-warn" data-action="reset-local-ui">閲嶇疆鐣岄潰璁剧疆</button>
              </div>
              <div class="log-list" id="logList"></div>
            \`)}
          </section>
          <section class="card" style="margin-top:20px;">
            <h2 class="section-title">鍏充簬鎴戜滑</h2>
            <p class="section-copy">纾佺洏娓呯悊澶ц櫨 v2.0 姝ｅ湪浠庡紑鍙戣€呭伐浣滃彴鍗囩骇涓洪潰鍚戞櫘閫氱敤鎴风殑绠€绾︽闈骇鍝併€傛湰娆℃敼閫犲畬鍏ㄥ鐢ㄧ幇鏈夋妧鏈爤锛屼笉寮曞叆鏂扮殑鍓嶇妗嗘灦銆?/p>
          </section>
        \`;
      }

      function renderCurrentView() {
        if (appState.currentView === "quarantine") {
          mount.innerHTML = renderQuarantineView();
          return;
        }

        if (appState.currentView === "history") {
          mount.innerHTML = renderHistoryView();
          return;
        }

        if (appState.currentView === "settings") {
          getActiveSettingsSection();
          mount.innerHTML = renderSettingsView();
          enhanceSettingsLayout();
          renderLogsPanel();
          syncSettingsFormSelections();
          return;
        }

        mount.innerHTML = renderHomeView();
      }

      function enhanceSettingsLayout() {
        if (appState.currentView !== "settings") {
          return;
        }

        const grid = mount.querySelector(".settings-grid");
        if (!grid || mount.querySelector(".settings-nav")) {
          return;
        }

        const activeSection = getActiveSettingsSection();
        const shell = document.createElement("section");
        shell.className = "settings-shell";

        const nav = document.createElement("aside");
        nav.className = "settings-nav";
        nav.innerHTML = \`
          <section class="card settings-nav-card">
            <h3 class="settings-nav-title">设置菜单</h3>
            <div class="settings-nav-list">
              \${SETTINGS_SECTIONS.map((item) => \`
                <button class="settings-nav-item\${item.key === activeSection ? " active" : ""}" data-action="switch-settings-section" data-section="\${item.key}">
                  <span class="settings-nav-icon">\${escapeHtml(item.icon)}</span>
                  <span class="settings-nav-text">
                    <span class="settings-nav-label">\${escapeHtml(item.label)}</span>
                    <span class="settings-nav-copy">\${escapeHtml(item.copy)}</span>
                  </span>
                </button>
              \`).join("")}
            </div>
          </section>
        \`;

        const panel = document.createElement("div");
        panel.className = "settings-panel";

        shell.appendChild(nav);
        shell.appendChild(panel);
        mount.innerHTML = "";
        mount.appendChild(shell);
        panel.appendChild(grid);
      }

      function syncSettingsFormSelections() {
        const rangeSelect = root.getElementById("historyRangeSelect");
        if (rangeSelect) {
          rangeSelect.value = appState.reportRange;
        }

        const typeSelect = root.getElementById("historyTypeSelect");
        if (typeSelect) {
          typeSelect.value = appState.reportTypeFilter;
        }

        const sortSelect = root.getElementById("historySortSelect");
        if (sortSelect) {
          sortSelect.value = appState.reportSort;
        }
      }

      function renderApp() {
        renderNavigation();
        renderTopbar();
        renderTaskBanner();
        renderCurrentView();
      }

      function openConfirmDialog(config) {
        const overlay = root.getElementById("confirmOverlay");
        const titleNode = root.getElementById("confirmTitle");
        const messageNode = root.getElementById("confirmMessage");
        const impactNode = root.getElementById("confirmImpact");
        const keywordWrap = root.getElementById("confirmKeywordWrap");
        const keywordInput = root.getElementById("confirmKeywordInput");
        const rememberRow = root.getElementById("confirmRememberRow");
        const rememberInput = root.getElementById("confirmRemember");
        const confirmProceed = root.getElementById("confirmProceed");

        titleNode.textContent = config.title || "璇风‘璁ゆ搷浣?;
        messageNode.textContent = config.message || "姝ゆ搷浣滀細淇敼鏈湴鏁版嵁锛岃纭鍚庣户缁€?;
        impactNode.textContent = config.impact || "鏃?;
        keywordWrap.style.display = config.keyword ? "block" : "none";
        keywordWrap.setAttribute("data-keyword", config.keyword || "");
        keywordInput.value = "";
        rememberInput.checked = false;
        rememberRow.style.display = config.allowRemember ? "flex" : "none";
        confirmProceed.textContent = config.confirmLabel || "纭鎵ц";
        keywordInput.placeholder = config.keyword ? ("璇疯緭鍏モ€? + config.keyword + "鈥?) : "璇疯緭鍏ョ‘璁ゆ枃瀛?;
        overlay.classList.add("active");
      }

      function closeConfirmDialog() {
        root.getElementById("confirmOverlay").classList.remove("active");
      }

      async function confirmAction(config) {
        return new Promise((resolve) => {
          pendingConfirmResolver = (result) => {
            const rememberInput = root.getElementById("confirmRemember");
            closeConfirmDialog();
            resolve({
              confirmed: result,
              remember: Boolean(rememberInput.checked)
            });
          };

          openConfirmDialog(config);
        });
      }

      function renderReportDialog() {
        const overlay = root.getElementById("reportOverlay");
        const content = root.getElementById("reportDialogContent");
        const report = appState.reportDialog;
        const prevReportId = getAdjacentReportId("prev");
        const nextReportId = getAdjacentReportId("next");

        if (!report) {
          overlay.classList.remove("active");
          content.innerHTML = "";
          return;
        }

        const summaryText =
          report.analysis?.summaryText ||
          report.llm?.output?.userMessage ||
          report.message ||
          "鏆傛棤鎽樿銆?;
        const candidateSummary = report.analysis?.candidateSummary || {};
        const executionSummary = summarizeCleanupResult(report);

        content.innerHTML =
          '<div class="dialog-head">' +
            '<div>' +
              '<p class="card-kicker">' + escapeHtml(typeLabel(report.type)) + "</p>" +
              '<h3 class="dialog-title">鎶ュ憡璇︽儏</h3>' +
            "</div>" +
            '<div class="inline-actions">' +
              '<button class="button-subtle" data-action="view-adjacent-report" data-direction="prev" ' + (prevReportId ? "" : "disabled") + ">涓婁竴鏉?/button>" +
              '<button class="button-subtle" data-action="view-adjacent-report" data-direction="next" ' + (nextReportId ? "" : "disabled") + ">涓嬩竴鏉?/button>" +
              '<button class="button-subtle" data-action="export-report" data-report-id="' + escapeHtml(report.reportId) + '" data-format="json">瀵煎嚭 JSON</button>' +
              '<button class="button-subtle" data-action="export-report" data-report-id="' + escapeHtml(report.reportId) + '" data-format="md">瀵煎嚭 Markdown</button>' +
              '<button class="button-warn" data-action="close-report">鍏抽棴</button>' +
            "</div>" +
          "</div>" +
          '<div class="dialog-body">' +
            '<div class="report-grid summary-grid">' +
              '<div class="metric-card"><div class="metric-label">鎶ュ憡绫诲瀷</div><div class="metric-value">' + escapeHtml(typeLabel(report.type)) + "</div></div>" +
              '<div class="metric-card"><div class="metric-label">鍒涘缓鏃堕棿</div><div class="metric-value">' + escapeHtml(formatDate(report.createdAt)) + "</div></div>" +
              '<div class="metric-card"><div class="metric-label">鍊欓€夐」 / 鏂囦欢鏁?/div><div class="metric-value">' + String(candidateSummary.totalCandidates || executionSummary.count || 0) + "</div></div>" +
              '<div class="metric-card"><div class="metric-label">绌洪棿鏀剁泭</div><div class="metric-value">' + formatBytes(candidateSummary.reclaimableBytes || executionSummary.releasedBytes || 0) + "</div></div>" +
            "</div>" +
            '<div class="story-card"><h4 class="story-title">鎽樿</h4><p class="story-copy">' + escapeHtml(summaryText) + "</p></div>" +
            '<pre class="code-block">' + escapeHtml(JSON.stringify(report, null, 2)) + "</pre>" +
          "</div>";

        overlay.classList.add("active");
      }

      function closeReportDialog() {
        appState.reportDialog = null;
        appState.reportDialogReportId = null;
        renderReportDialog();
      }

      function renderScheduleDialog() {
        const overlay = root.getElementById("scheduleOverlay");
        const content = root.getElementById("scheduleDialogContent");
        const schedule = appState.scheduleDialog;

        if (!schedule) {
          overlay.classList.remove("active");
          content.innerHTML = "";
          return;
        }

        content.innerHTML =
          '<div class="dialog-head">' +
            '<div>' +
              '<p class="card-kicker">' + escapeHtml(formatScheduleSource(schedule.source)) + "</p>" +
              '<h3 class="dialog-title">璁″垝璇︽儏</h3>' +
            "</div>" +
            '<div class="inline-actions">' +
              '<button class="button-secondary" data-action="run-user-schedule-now" data-schedule-id="' + escapeHtml(schedule.id) + '">绔嬪嵆鎵ц</button>' +
              '<button class="button-subtle" data-action="edit-user-schedule" data-schedule-id="' + escapeHtml(schedule.id) + '">缂栬緫</button>' +
              '<button class="button-warn" data-action="close-schedule">鍏抽棴</button>' +
            "</div>" +
          "</div>" +
          '<div class="dialog-body">' +
            '<div class="summary-grid">' +
              '<div class="metric-card"><div class="metric-label">璁″垝鍚嶇О</div><div class="metric-value">' + escapeHtml(schedule.name || "鏈懡鍚嶈鍒?) + "</div></div>" +
              '<div class="metric-card"><div class="metric-label">璁″垝鏉ユ簮</div><div class="metric-value">' + escapeHtml(formatScheduleSource(schedule.source)) + "</div></div>" +
              '<div class="metric-card"><div class="metric-label">鎵ц鏂瑰紡</div><div class="metric-value">' + escapeHtml(schedule.action === "auto-cleanup" ? "鑷姩娓呯悊" : "浠呮壂鎻?) + "</div></div>" +
              '<div class="metric-card"><div class="metric-label">鎵ц棰戠巼</div><div class="metric-value">' + escapeHtml(formatIntervalMinutes(schedule.intervalMinutes)) + "</div></div>" +
            "</div>" +
            '<div class="story-card"><h4 class="story-title">杩愯淇℃伅</h4><p class="story-copy">涓嬫鎵ц锛? + escapeHtml(formatDate(schedule.nextRunAt)) + '</p><p class="story-copy">涓婃鎵ц锛? + escapeHtml(formatDate(schedule.lastRunAt)) + '</p></div>' +
            '<div class="story-card"><h4 class="story-title">鐩綍涓庡弬鏁?/h4><p class="story-copy">鎵弿鐩綍锛? + escapeHtml(schedule.targets?.[0]?.path || "鏈缃?) + '</p><p class="story-copy">娓呯悊妯″紡锛? + escapeHtml(schedule.cleanupMode || "quarantine") + '锛屾渶澶у鐞嗛」锛? + String(schedule.maxItems || 0) + '</p></div>' +
            '<pre class="code-block">' + escapeHtml(JSON.stringify(schedule, null, 2)) + "</pre>" +
          "</div>";

        overlay.classList.add("active");
      }

      function closeScheduleDialog() {
        appState.scheduleDialog = null;
        renderScheduleDialog();
      }

      function syncSelectedReportsAfterFilter() {
        const visible = new Set(
          (appState.reports || [])
            .filter((item) => reportMatchesRange(item) && reportMatchesType(item) && reportMatchesSearch(item))
            .map((item) => item.reportId)
        );
        appState.selectedReports = appState.selectedReports.filter((reportId) => visible.has(reportId));
      }

      function syncSelectedQuarantineAfterFilter() {
        const visible = new Set(filteredQuarantineItems().map((item) => item.id));
        appState.quarantine.selectedIds = appState.quarantine.selectedIds.filter((itemId) => visible.has(itemId));
      }

      function toggleReportSelection(reportId, checkedState) {
        if (!reportId) {
          return;
        }

        if (checkedState) {
          if (!appState.selectedReports.includes(reportId)) {
            appState.selectedReports.push(reportId);
          }
        } else {
          appState.selectedReports = appState.selectedReports.filter((item) => item !== reportId);
        }
      }

      function summarizeReportsByIds(reportIds = []) {
        const selected = (appState.reports || []).filter((report) => reportIds.includes(report.reportId));
        const reclaimableBytes = selected.reduce((sum, report) => {
          return sum + Number(report.reclaimedBytes || report.reclaimableBytes || 0);
        }, 0);

        return {
          count: selected.length,
          reclaimableBytes
        };
      }

      async function deleteReports(reportIds) {
        const uniqueIds = Array.from(new Set((reportIds || []).filter(Boolean)));
        if (!uniqueIds.length) {
          showToast("warn", "娌℃湁鍙垹闄ょ殑鎶ュ憡", "璇峰厛閫夋嫨鑷冲皯涓€鏉℃姤鍛娿€?);
          return;
        }

        const summary = summarizeReportsByIds(uniqueIds);

        const result = await confirmAction({
          title: "纭鍒犻櫎鎶ュ憡",
          message: "鍒犻櫎鍚庯紝鎶ュ憡鏂囦欢鍜岀储寮曢兘浼氳绉婚櫎銆?,
          impact: "鏈灏嗗垹闄?" + summary.count + " 鏉℃姤鍛婏紝鍏宠仈绌洪棿璁板綍绾?" + formatBytes(summary.reclaimableBytes) + "銆?,
          confirmLabel: "鍒犻櫎鎶ュ憡"
        });

        if (!result.confirmed) {
          showToast("warn", "宸插彇娑堟搷浣?, "娌℃湁鍒犻櫎浠讳綍鎶ュ憡銆?);
          return;
        }

        const deleted = await requestJson("/api/reports", {
          method: "DELETE",
          body: JSON.stringify({
            reportIds: uniqueIds
          })
        });

        appState.selectedReports = appState.selectedReports.filter((reportId) => !uniqueIds.includes(reportId));
        await loadReports();
        syncSelectedReportsAfterFilter();
        rerenderIfView("history");
        showToast("success", "鎶ュ憡宸插垹闄?, "閫変腑鐨勬姤鍛婂凡缁忕Щ闄ゃ€?);
        logEvent("宸插垹闄ゆ姤鍛?, deleted, "success");
      }

      function renderLogsPanel() {
        const list = root.getElementById("logList");
        if (!list) {
          return;
        }

        const keyword = String(root.getElementById("logSearch")?.value || "").trim().toLowerCase();
        const level = String(root.getElementById("logLevelFilter")?.value || "all");
        const timeFilter = String(root.getElementById("logTimeFilter")?.value || "all");
        const now = Date.now();
        const filtered = appState.logs.filter((entry) => {
          if (level !== "all" && entry.level !== level) {
            return false;
          }

          if (timeFilter !== "all") {
            const minutes = timeFilter === "5m" ? 5 : timeFilter === "1h" ? 60 : 24 * 60;
            if (Date.parse(entry.timeIso || 0) < now - minutes * 60 * 1000) {
              return false;
            }
          }

          if (!keyword) {
            return true;
          }

          const haystack = (entry.message + " " + JSON.stringify(entry.data || {})).toLowerCase();
          return haystack.includes(keyword);
        });

        const visible = appState.logsExpanded ? filtered : filtered.slice(0, 5);

        if (!filtered.length) {
          list.innerHTML = '<div class="empty-card">褰撳墠娌℃湁鏃ュ織璁板綍銆?/div>';
          return;
        }

        list.innerHTML = visible.map((entry) => {
          return '<div class="log-item">' +
            '<div class="log-head">' +
              '<div>' +
                '<div class="log-level ' + escapeHtml(entry.level) + '">' + escapeHtml(entry.level) + "</div>" +
                '<h4 class="history-title" style="margin-top:8px;">' + escapeHtml(entry.message) + "</h4>" +
              "</div>" +
              '<div class="history-meta">' + escapeHtml(formatDate(entry.timeIso)) + "</div>" +
            "</div>" +
            '<p class="log-copy">' + escapeHtml(entry.data ? JSON.stringify(entry.data, null, 2) : "鏃犻檮鍔犱俊鎭€?) + "</p>" +
          "</div>";
        }).join("");
      }

      function exportTextFile(name, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = name;
        link.click();
        URL.revokeObjectURL(link.href);
      }

      function buildScanPayload() {
        const settings = getScanSettings();
        const target = settings.scanTarget || getEffectiveTarget();

        return {
          targets: [
            {
              path: target
            }
          ],
          options: {
            maxDepth: Number(settings.maxDepth || DEFAULT_SCAN_SETTINGS.maxDepth),
            maxFiles: Number(settings.maxFiles || DEFAULT_SCAN_SETTINGS.maxFiles),
            largeFileThresholdBytes: Number(settings.largeFileThresholdBytes || DEFAULT_SCAN_SETTINGS.largeFileThresholdBytes),
            staleDays: Number(settings.staleDays || DEFAULT_SCAN_SETTINGS.staleDays)
          }
        };
      }

      function collectLlmPayload() {
        return {
          enabled: Boolean(root.getElementById("llmEnabled")?.checked),
          provider: String(root.getElementById("llmProvider")?.value || "openai-compatible"),
          baseUrl: String(root.getElementById("llmBaseUrl")?.value || "").trim(),
          apiKey: String(root.getElementById("llmApiKey")?.value || "").trim(),
          models: {
            chat: String(root.getElementById("llmChatModel")?.value || "").trim(),
            reason: String(root.getElementById("llmReasonModel")?.value || "").trim(),
            summary: String(root.getElementById("llmSummaryModel")?.value || "").trim()
          },
          timeoutMs: Number(root.getElementById("llmTimeoutMs")?.value || 20000),
          maxRetries: Number(root.getElementById("llmMaxRetries")?.value || 1)
        };
      }

      function fillLlmDefaultsInForm() {
        const values = DEFAULT_LLM_FORM;
        const pairs = [
          ["llmEnabled", values.enabled],
          ["llmProvider", values.provider],
          ["llmBaseUrl", values.baseUrl],
          ["llmApiKey", values.apiKey],
          ["llmChatModel", values.chatModel],
          ["llmReasonModel", values.reasonModel],
          ["llmSummaryModel", values.summaryModel],
          ["llmTimeoutMs", values.timeoutMs],
          ["llmMaxRetries", values.maxRetries]
        ];

        pairs.forEach(([id, value]) => {
          const node = root.getElementById(id);
          if (!node) {
            return;
          }

          if (node.type === "checkbox") {
            node.checked = Boolean(value);
          } else {
            node.value = value;
          }
        });
      }

      function collectBasicPreferencesPayload() {
        const targetInput = root.getElementById("rulesScanTarget");
        const homeInput = root.getElementById("homeTargetInput");
        const targetPath = String(targetInput?.value || homeInput?.value || getEffectiveTarget() || "").trim();
        return {
          ...(appState.settings.preferences || {}),
          defaultScanTarget: targetPath,
          autoScanEnabled: Boolean(root.getElementById("prefAutoScanEnabled")?.checked),
          autoScanInterval: String(root.getElementById("prefAutoScanInterval")?.value || "weekly"),
          autoCleanupEnabled: Boolean(root.getElementById("prefAutoCleanupEnabled")?.checked),
          quarantineRetentionDays: Number(root.getElementById("prefRetentionDays")?.value || 30),
          notifications: {
            scanComplete: Boolean(root.getElementById("prefNotifyScan")?.checked),
            cleanupComplete: Boolean(root.getElementById("prefNotifyCleanup")?.checked),
            errors: Boolean(root.getElementById("prefNotifyErrors")?.checked)
          }
        };
      }

      function collectSystemPreferencesPayload() {
        return {
          ...(appState.settings.preferences || {}),
          language: String(root.getElementById("sysLanguage")?.value || "zh-CN"),
          checkUpdates: String(root.getElementById("sysCheckUpdates")?.value || "auto"),
          updateManifestUrl: String(root.getElementById("updateManifestUrl")?.value || "").trim(),
          rememberWindowBounds: Boolean(root.getElementById("sysRememberBounds")?.checked)
        };
      }

      function collectRulesPayload() {
        return {
          excludePaths: toPathArray(root.getElementById("rulesExcludePaths")?.value || ""),
          whitelistPaths: toPathArray(root.getElementById("rulesWhitelistPaths")?.value || ""),
          blacklistPaths: toPathArray(root.getElementById("rulesBlacklistPaths")?.value || "")
        };
      }

      function saveScanSettingsFromRulesForm() {
        saveScanSettings({
          scanTarget: String(root.getElementById("rulesScanTarget")?.value || "").trim(),
          maxDepth: Number(root.getElementById("rulesMaxDepth")?.value || DEFAULT_SCAN_SETTINGS.maxDepth),
          maxFiles: Number(root.getElementById("rulesMaxFiles")?.value || DEFAULT_SCAN_SETTINGS.maxFiles),
          largeFileThresholdBytes: Number(root.getElementById("rulesLargeFileThreshold")?.value || DEFAULT_SCAN_SETTINGS.largeFileThresholdBytes),
          staleDays: Number(root.getElementById("rulesStaleDays")?.value || DEFAULT_SCAN_SETTINGS.staleDays)
        });
      }

      function fillRulesDefaultsInForm() {
        const scan = DEFAULT_SCAN_SETTINGS;
        const mapping = [
          ["rulesScanTarget", scan.scanTarget],
          ["rulesMaxDepth", scan.maxDepth],
          ["rulesMaxFiles", scan.maxFiles],
          ["rulesLargeFileThreshold", scan.largeFileThresholdBytes],
          ["rulesStaleDays", scan.staleDays],
          ["rulesExcludePaths", ""],
          ["rulesWhitelistPaths", ""],
          ["rulesBlacklistPaths", ""]
        ];

        mapping.forEach(([id, value]) => {
          const node = root.getElementById(id);
          if (node) {
            node.value = value;
          }
        });
      }

      async function refreshHealth() {
        const payload = await requestJson("/api/health");
        appState.health.ready = true;
        appState.health.llm = payload.llm || {
          ok: false,
          reason: "LLM 鏈厤缃€?
        };
        renderTopbar();
      }

      async function loadPreferences() {
        const payload = await requestJson("/api/preferences");
        appState.settings.preferences = payload;

        if (!getScanSettings().scanTarget && payload.recentTargets?.[0]) {
          saveScanSettings({
            scanTarget: payload.recentTargets[0]
          });
        }
      }

      async function loadLlmConfig() {
        appState.settings.llm = await requestJson("/api/config/llm");
      }

      async function loadRules() {
        appState.settings.rules = await requestJson("/api/rules");
      }

      async function loadDesktopSettings() {
        if (!window.diskClawDesktop?.getWindowState) {
          appState.settings.desktop = {
            isAlwaysOnTop: false,
            closeBehavior: "ask",
            openAtLogin: false
          };
          return;
        }

        appState.settings.desktop = await window.diskClawDesktop.getWindowState();
      }

      async function loadSchedules() {
        appState.settings.schedules = await requestJson("/api/schedules");
      }

      async function loadAppVersion() {
        if (!window.diskClawDesktop?.getAppVersion) {
          appState.settings.appVersion = "0.1.0";
          return;
        }

        const result = await window.diskClawDesktop.getAppVersion();
        appState.settings.appVersion = result?.version || "0.1.0";
      }

      async function checkForAppUpdate() {
        if (!window.diskClawDesktop?.checkUpdate) {
          appState.settings.update = {
            ok: false,
            reason: "褰撳墠鐜鏃犳硶妫€鏌ユ洿鏂般€?,
            updateAvailable: false
          };
          rerenderIfView("settings");
          return appState.settings.update;
        }

        const result = await window.diskClawDesktop.checkUpdate({
          currentVersion: appState.settings.appVersion || "0.1.0",
          manifestUrl: appState.settings.preferences?.updateManifestUrl || ""
        });
        appState.settings.update = result;
        rerenderIfView("settings");
        return result;
      }

      function beginTrackedTask(task, title) {
        if (!task?.taskId) {
          return;
        }

        appState.activeTaskId = task.taskId;
        appState.activeTaskType = task.type;
        appState.activeTaskTitle = title || typeLabel(task.type);
        appState.activeTask = task;
        renderTaskBanner();
        startTaskPolling();
      }

      function scheduleAutoUpdateCheck() {
        const mode = appState.settings.preferences?.checkUpdates || "auto";

        if (appState.updateTimer) {
          window.clearInterval(appState.updateTimer);
          appState.updateTimer = null;
        }

        if (mode !== "auto") {
          return;
        }

        appState.updateTimer = window.setInterval(() => {
          checkForAppUpdate().catch(() => {});
        }, 60 * 60 * 1000);
      }

      function handleExternalOpenPath(pathValue) {
        if (!pathValue) {
          return;
        }

        saveScanSettings({
          scanTarget: String(pathValue || "").trim()
        });

        const homeInput = root.getElementById("homeTargetInput");
        if (homeInput) {
          homeInput.value = pathValue;
        }

        const rulesInput = root.getElementById("rulesScanTarget");
        if (rulesInput) {
          rulesInput.value = pathValue;
        }

        switchView("home");
        showToast("info", "宸茶浇鍏ユ壂鎻忕洰褰?, "澶栭儴璺緞宸插噯澶囧ソ锛屽彲浠ョ洿鎺ュ紑濮嬫壂鎻忋€?);
      }

      async function loadQuarantine() {
        appState.quarantine.items = await requestJson("/api/quarantine");
        appState.quarantine.selectedIds = appState.quarantine.selectedIds.filter((id) => appState.quarantine.items.some((item) => item.id === id));
        syncSelectedQuarantineAfterFilter();
      }

      async function loadReports() {
        appState.reports = await requestJson("/api/reports");
        appState.reportAnalytics = await requestJson("/api/reports/analytics");
        syncSelectedReportsAfterFilter();
      }

      async function recoverRunningTask() {
        const tasks = await requestJson("/api/tasks");
        const task = tasks.find((item) => ["running", "paused", "queued"].includes(item.status));
        if (!task) {
          return;
        }

        appState.activeTaskId = task.taskId;
        appState.activeTaskType = task.type;
        appState.activeTaskTitle = typeLabel(task.type);
        appState.activeTask = task;
        syncHomeStateFromTask(task);
        startTaskPolling();
      }

      function syncHomeStateFromTask(task) {
        const details = task.details || {};

        if (task.type === "plan" || task.type === "scan") {
          appState.home.status = task.status === "completed" ? "scanComplete" : "scanning";
          appState.home.progress = Number(task.progress || 0);
          appState.home.scanStats = {
            scannedFiles: Number(details.scannedFiles || 0),
            candidateBytes: Number(details.candidateBytes || 0),
            currentPath: String(details.currentPath || "")
          };
        }

        if (["cleanup", "duplicate-cleanup", "hotspot-cleanup"].includes(task.type)) {
          appState.home.status = task.status === "completed" ? "cleanComplete" : "cleaning";
          appState.home.progress = Number(task.progress || 0);
          appState.home.cleanupStats = {
            completedItems: Number(details.completedItems || 0),
            totalItems: Number(details.totalItems || 0),
            releasedBytes: Number(details.releasedBytes || 0),
            currentPath: String(details.currentPath || "")
          };
        }
      }

      async function pollActiveTask() {
        if (!appState.activeTaskId) {
          return;
        }

        const task = await requestJson("/api/tasks/" + encodeURIComponent(appState.activeTaskId));
        appState.activeTask = task;
        syncHomeStateFromTask(task);
        renderTaskBanner();

        if (appState.currentView === "home") {
          renderCurrentView();
        }

        if (task.status === "completed") {
          window.clearInterval(appState.activeTaskTimer);
          appState.activeTaskTimer = null;

          if (task.type === "plan") {
            appState.home.plan = task.result;
            appState.home.status = "scanComplete";
            appState.home.progress = 100;
            logEvent("鏅鸿兘鎵弿宸插畬鎴?, {
              reportId: task.result?.reportId || null
            }, "success");
            showToast("success", "鎵弿瀹屾垚", "宸茬粡涓烘偍鏁寸悊濂藉彲娓呯悊绌洪棿涓庝紭鍏堝缓璁€?);
          } else if (["cleanup", "duplicate-cleanup", "hotspot-cleanup"].includes(task.type)) {
            appState.home.cleanup = task.result;
            appState.home.status = "cleanComplete";
            appState.home.progress = 100;
            const summary = summarizeCleanupResult(task.result);
            logEvent("娓呯悊浠诲姟宸插畬鎴?, summary, "success");
            showToast("success", "娓呯悊瀹屾垚", "鏈鍏遍噴鏀?" + formatBytes(summary.releasedBytes) + " 绌洪棿銆?);
          }

          appState.activeTaskId = null;
          appState.activeTaskType = null;
          appState.activeTaskTitle = "";
          appState.activeTask = null;
          await Promise.allSettled([loadReports(), loadQuarantine(), loadPreferences()]);
          renderApp();
          maybeSendDesktopNotification(task);
          return;
        }

        if (task.status === "failed") {
          window.clearInterval(appState.activeTaskTimer);
          appState.activeTaskTimer = null;
          appState.activeTaskId = null;
          appState.activeTaskType = null;
          appState.activeTaskTitle = "";
          appState.activeTask = null;
          if (appState.home.status === "scanning") {
            appState.home.status = appState.home.plan ? "scanComplete" : "idle";
          } else if (appState.home.status === "cleaning") {
            appState.home.status = appState.home.plan ? "scanComplete" : "idle";
          }
          showToast("error", "浠诲姟澶辫触", task.error?.message || task.message || "璇风◢鍚庡啀璇曘€?);
          logEvent("鍚庡彴浠诲姟澶辫触", {
            type: task.type,
            message: task.error?.message || task.message
          }, "error");
          renderApp();
          return;
        }

        if (task.status === "cancelled") {
          window.clearInterval(appState.activeTaskTimer);
          appState.activeTaskTimer = null;
          appState.activeTaskId = null;
          appState.activeTaskType = null;
          appState.activeTaskTitle = "";
          appState.activeTask = null;
          appState.home.status = appState.home.plan ? "scanComplete" : "idle";
          showToast("warn", "浠诲姟宸插彇娑?, "褰撳墠鍚庡彴浠诲姟宸插仠姝€?);
          logEvent("鍚庡彴浠诲姟宸插彇娑?, { type: task.type }, "warn");
          renderApp();
        }
      }

      function startTaskPolling() {
        if (appState.activeTaskTimer) {
          window.clearInterval(appState.activeTaskTimer);
        }

        pollActiveTask().catch((error) => {
          showRequestErrorToast(error, "浠诲姟鐘舵€佸埛鏂板け璐?);
        });

        appState.activeTaskTimer = window.setInterval(() => {
          pollActiveTask().catch((error) => {
            showRequestErrorToast(error, "浠诲姟鐘舵€佸埛鏂板け璐?);
          });
        }, 1200);
      }

      async function maybeSendDesktopNotification(task) {
        if (!window.diskClawDesktop?.notify) {
          return;
        }

        const pref = appState.settings.preferences || {};
        if (task.type === "plan" && pref.notifications?.scanComplete === false) {
          return;
        }
        if (["cleanup", "duplicate-cleanup", "hotspot-cleanup"].includes(task.type) && pref.notifications?.cleanupComplete === false) {
          return;
        }

        try {
          await window.diskClawDesktop.notify("纾佺洏娓呯悊澶ц櫨", task.type === "plan" ? "鎵弿宸茬粡瀹屾垚銆? : "娓呯悊宸茬粡瀹屾垚銆?);
        } catch {}
      }

      function switchView(view) {
        appState.currentView = view;
        writeLocalJson(STORAGE_KEYS.view, view);
        renderApp();
      }

      async function browseTarget() {
        if (!window.diskClawDesktop?.chooseFolder) {
          showToast("warn", "褰撳墠鐜涓嶆敮鎸?, "娴忚鏂囦欢澶逛粎鍦ㄦ闈㈢鍙敤銆?);
          return;
        }

        const selectedPath = await window.diskClawDesktop.chooseFolder();
        if (!selectedPath) {
          return;
        }

        saveScanSettings({
          scanTarget: selectedPath
        });

        const homeInput = root.getElementById("homeTargetInput");
        if (homeInput) {
          homeInput.value = selectedPath;
        }

        const rulesInput = root.getElementById("rulesScanTarget");
        if (rulesInput) {
          rulesInput.value = selectedPath;
        }

        logEvent("宸叉洿鏂版壂鎻忕洰褰?, { path: selectedPath }, "success");
        renderTopbar();
        if (appState.currentView === "home") {
          renderCurrentView();
        }
      }

      async function startHomeScan() {
        const homeInput = root.getElementById("homeTargetInput");
        if (homeInput) {
          saveScanSettings({
            scanTarget: String(homeInput.value || "").trim()
          });
        }

        const scanTarget = getEffectiveTarget();
        if (!scanTarget) {
          showToast("warn", "鍏堥€夋嫨鎵弿浣嶇疆", "璇峰厛閫夋嫨涓€涓父鐢ㄦ枃浠跺す锛屽啀寮€濮嬫櫤鑳芥壂鎻忋€?);
          return;
        }

        const task = await requestJson("/api/tasks/agent/plan", {
          method: "POST",
          body: JSON.stringify(buildScanPayload())
        });

        appState.activeTaskId = task.taskId;
        appState.activeTaskType = task.type;
        appState.activeTaskTitle = "鏅鸿兘鎵弿涓?;
        appState.activeTask = task;
        appState.home.status = "scanning";
        appState.home.progress = 8;
        appState.home.scanStats = {
          scannedFiles: 0,
          candidateBytes: 0,
          currentPath: scanTarget
        };
        logEvent("宸插紑濮嬫櫤鑳芥壂鎻?, { path: scanTarget }, "info");
        renderApp();
        startTaskPolling();
      }

      async function startHomeCleanup() {
        const items = getOneClickCleanupItems(appState.home.plan);
        if (!items.length) {
          showToast("warn", "鏆傛棤鍙墽琛岄」", "褰撳墠鎵弿缁撴灉涓病鏈夐€傚悎涓€閿竻鐞嗙殑浣庨闄╂枃浠躲€?);
          return;
        }

        const totalBytes = items.reduce((sum, item) => sum + Number(item.sizeBytes || 0), 0);
        const result = await confirmAction({
          title: "纭寮€濮嬩竴閿竻鐞?,
          message: "绯荤粺浼氫紭鍏堝鐞嗕綆椋庨櫓椤癸紝骞跺厛绉诲姩鍒伴殧绂诲尯銆?,
          impact: "鏈灏嗗鐞?" + items.length + " 涓枃浠讹紝棰勮閲婃斁 " + formatBytes(totalBytes) + " 绌洪棿銆?,
          confirmLabel: "寮€濮嬫竻鐞?
        });

        if (!result.confirmed) {
          showToast("warn", "宸插彇娑堟搷浣?, "鏈娓呯悊娌℃湁寮€濮嬨€?);
          return;
        }

        const task = await requestJson("/api/tasks/cleanup/execute", {
          method: "POST",
          body: JSON.stringify({
            items,
            options: {
              dryRun: false,
              mode: "quarantine",
              confirmHighRisk: false
            }
          })
        });

        appState.activeTaskId = task.taskId;
        appState.activeTaskType = task.type;
        appState.activeTaskTitle = "涓€閿竻鐞嗕腑";
        appState.activeTask = task;
        appState.home.status = "cleaning";
        appState.home.progress = 20;
        appState.home.cleanupStats = {
          completedItems: 0,
          totalItems: items.length,
          releasedBytes: 0,
          currentPath: ""
        };
        logEvent("宸插紑濮嬩竴閿竻鐞?, { itemCount: items.length }, "info");
        renderApp();
        startTaskPolling();
      }

      async function pauseTask() {
        if (!appState.activeTaskId) {
          return;
        }

        await requestJson("/api/tasks/" + encodeURIComponent(appState.activeTaskId) + "/pause", {
          method: "POST",
          body: JSON.stringify({})
        });
        logEvent("宸茶姹傛殏鍋滀换鍔?, { taskId: appState.activeTaskId }, "warn");
      }

      async function resumeTask() {
        if (!appState.activeTaskId) {
          return;
        }

        await requestJson("/api/tasks/" + encodeURIComponent(appState.activeTaskId) + "/resume", {
          method: "POST",
          body: JSON.stringify({})
        });
        logEvent("宸茶姹傜户缁换鍔?, { taskId: appState.activeTaskId }, "info");
      }

      async function cancelTask() {
        if (!appState.activeTaskId) {
          return;
        }

        await requestJson("/api/tasks/" + encodeURIComponent(appState.activeTaskId) + "/cancel", {
          method: "POST",
          body: JSON.stringify({})
        });
        logEvent("宸茶姹傚彇娑堜换鍔?, { taskId: appState.activeTaskId }, "warn");
      }

      async function restoreQuarantineItems(items) {
        const result = await confirmAction({
          title: "纭鎭㈠闅旂鏂囦欢",
          message: "鎭㈠鍚庯紝鏂囦欢浼氬洖鍒板師鏉ョ殑浣嶇疆銆?,
          impact: "鏈灏嗘仮澶?" + items.length + " 涓枃浠躲€?,
          confirmLabel: "寮€濮嬫仮澶?
        });

        if (!result.confirmed) {
          showToast("warn", "宸插彇娑堟搷浣?, "娌℃湁鎭㈠浠讳綍鏂囦欢銆?);
          return;
        }

        const restored = await requestJson("/api/quarantine/restore", {
          method: "POST",
          body: JSON.stringify({
            items
          })
        });
        await Promise.allSettled([loadQuarantine(), loadReports()]);
        renderCurrentView();
        logEvent("宸叉仮澶嶉殧绂绘枃浠?, { count: restored.results?.length || 0 }, "success");
        showToast("success", "鎭㈠瀹屾垚", "閫変腑鐨勬枃浠跺凡缁忔仮澶嶅埌鍘熻矾寰勩€?);
      }

      async function deleteQuarantineItems(items, isClearAll = false) {
        const result = await confirmAction({
          title: isClearAll ? "纭娓呯┖闅旂鍖? : "纭姘镐箙鍒犻櫎闅旂鏂囦欢",
          message: "姝ゆ搷浣滀笉鍙仮澶嶏紝璇风‘璁ゅ悗缁х画銆?,
          impact: isClearAll ? "灏嗘竻绌烘墍鏈夋湭鎭㈠鐨勯殧绂绘枃浠躲€? : "鏈灏嗘案涔呭垹闄?" + items.length + " 涓枃浠躲€?,
          confirmLabel: isClearAll ? "娓呯┖闅旂鍖? : "姘镐箙鍒犻櫎"
        });

        if (!result.confirmed) {
          showToast("warn", "宸插彇娑堟搷浣?, "娌℃湁鍒犻櫎浠讳綍闅旂鏂囦欢銆?);
          return;
        }

        if (isClearAll) {
          await requestJson("/api/quarantine/clear", {
            method: "POST",
            body: JSON.stringify({})
          });
        } else {
          await requestJson("/api/quarantine/delete", {
            method: "POST",
            body: JSON.stringify({
              items
            })
          });
        }

        await Promise.allSettled([loadQuarantine(), loadReports()]);
        renderCurrentView();
        logEvent(isClearAll ? "宸叉竻绌洪殧绂诲尯" : "宸叉案涔呭垹闄ら殧绂绘枃浠?, { count: items.length }, "success");
        showToast("success", isClearAll ? "闅旂鍖哄凡娓呯┖" : "鍒犻櫎瀹屾垚", "鎵€閫夋枃浠跺凡浠庨殧绂诲尯姘镐箙绉婚櫎銆?);
      }

      async function openReport(reportId) {
        const report = await requestJson("/api/reports/" + encodeURIComponent(reportId));
        appState.reportDialog = report;
        appState.reportDialogReportId = reportId;
        renderReportDialog();
      }

      async function viewAdjacentReport(direction) {
        const targetReportId = getAdjacentReportId(direction);
        if (!targetReportId) {
          return;
        }

        await openReport(targetReportId);
      }

      async function exportReport(reportId, format) {
        const exported = await requestJson("/api/reports/" + encodeURIComponent(reportId) + "/export", {
          method: "POST",
          body: JSON.stringify({ format })
        });

        showToast("success", "鎶ュ憡宸插鍑?, "鏂囦欢宸插鍑哄埌 " + exported.exportPath);
        logEvent("宸插鍑烘姤鍛?, exported, "success");
      }

      async function saveBasicSettings() {
        const payload = collectBasicPreferencesPayload();
        appState.settings.preferences = await requestJson("/api/preferences", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        await loadSchedules();
        saveScanSettings({
          scanTarget: payload.defaultScanTarget || ""
        });
        renderCurrentView();
        showToast("success", "鍩虹璁剧疆宸蹭繚瀛?, "鏂扮殑鍋忓ソ璁剧疆宸茬粡鐢熸晥銆?);
        logEvent("宸蹭繚瀛樺熀纭€璁剧疆", payload, "success");
      }

      async function saveLlmConfig() {
        const payload = collectLlmPayload();
        payload.hasApiKey = Boolean(payload.apiKey) || Boolean(appState.settings.llm?.hasApiKey);
        appState.settings.llm = await requestJson("/api/config/llm", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        await refreshHealth();
        renderCurrentView();
        showToast("success", "AI 閰嶇疆宸蹭繚瀛?, "鏂扮殑 LLM 閰嶇疆宸茬粡鏇存柊銆?);
        logEvent("宸蹭繚瀛?LLM 閰嶇疆", {
          baseUrl: payload.baseUrl,
          provider: payload.provider
        }, "success");
      }

      async function testLlmConfig() {
        const payload = collectLlmPayload();
        payload.hasApiKey = Boolean(payload.apiKey);
        const result = await requestJson("/api/config/llm/test", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        showToast(result.ok ? "success" : "warn", "杩炴帴娴嬭瘯瀹屾垚", result.ok ? "妯″瀷杩炴帴鎴愬姛銆? : "妯″瀷杩炴帴鏈垚鍔熴€?);
        logEvent("宸叉祴璇?LLM 杩炴帴", result, result.ok ? "success" : "warn");
      }

      async function saveRules() {
        saveScanSettingsFromRulesForm();
        const settings = getScanSettings();
        appState.settings.rules = await requestJson("/api/rules", {
          method: "POST",
          body: JSON.stringify(collectRulesPayload())
        });
        appState.settings.preferences = await requestJson("/api/preferences", {
          method: "POST",
          body: JSON.stringify({
            ...(appState.settings.preferences || {}),
            defaultScanTarget: settings.scanTarget || ""
          })
        });
        await loadSchedules();
        showToast("success", "瑙勫垯宸蹭繚瀛?, "鎵弿鍙傛暟鍜岃矾寰勮鍒欏凡鏇存柊銆?);
        logEvent("宸蹭繚瀛樿鍒欓厤缃?, appState.settings.rules, "success");
      }

      async function saveSystemSettings() {
        const preferences = collectSystemPreferencesPayload();
        appState.settings.preferences = await requestJson("/api/preferences", {
          method: "POST",
          body: JSON.stringify(preferences)
        });

        if (window.diskClawDesktop?.setWindowState) {
          appState.settings.desktop = await window.diskClawDesktop.setWindowState({
            isAlwaysOnTop: Boolean(root.getElementById("sysAlwaysOnTop")?.checked),
            closeBehavior: String(root.getElementById("sysCloseBehavior")?.value || "ask"),
            openAtLogin: Boolean(root.getElementById("sysOpenAtLogin")?.checked)
          });
        }

        renderCurrentView();
        showToast("success", "绯荤粺璁剧疆宸蹭繚瀛?, "绐楀彛涓庣郴缁熷亸濂藉凡缁忔洿鏂般€?);
        logEvent("宸蹭繚瀛樼郴缁熻缃?, {
          preferences,
          desktop: appState.settings.desktop
        }, "success");
        scheduleAutoUpdateCheck();
      }

      async function backupConfig() {
        const backup = await requestJson("/api/config/backup");
        downloadJsonFile("diskclaw-config-backup.json", backup);
        showToast("success", "閰嶇疆宸插浠?, "澶囦唤鏂囦欢宸茬粡涓嬭浇銆?);
        logEvent("宸插浠介厤缃?, backup, "success");
      }

      async function restoreConfig() {
        const result = await confirmAction({
          title: "纭鎭㈠閰嶇疆",
          message: "杩欎細鐢ㄥ浠借鐩栧綋鍓嶈缃€?,
          impact: "寤鸿鍏堜笅杞戒竴浠芥渶鏂板浠斤紝鍐嶆墽琛屾仮澶嶃€?,
          confirmLabel: "鎭㈠閰嶇疆"
        });

        if (!result.confirmed) {
          showToast("warn", "宸插彇娑堟搷浣?, "娌℃湁鎭㈠浠讳綍閰嶇疆銆?);
          return;
        }

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "application/json";
        fileInput.style.display = "none";
        document.body.appendChild(fileInput);

        const payload = await new Promise((resolve, reject) => {
          fileInput.addEventListener("change", async () => {
            try {
              const file = fileInput.files?.[0];
              if (!file) {
                resolve(null);
                return;
              }
              const text = await file.text();
              resolve(JSON.parse(text));
            } catch (error) {
              reject(error);
            } finally {
              fileInput.remove();
            }
          }, { once: true });

          fileInput.click();
        }).catch((error) => {
          showRequestErrorToast(error, "鎭㈠閰嶇疆澶辫触");
          return null;
        });

        if (!payload) {
          showToast("warn", "鏈€夋嫨鏂囦欢", "娌℃湁鎵ц鎭㈠銆?);
          return;
        }

        const restored = await requestJson("/api/config/restore", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        await Promise.allSettled([loadPreferences(), loadRules(), loadDesktopSettings(), loadLlmConfig(), loadSchedules()]);
        rerenderIfView("settings");
        showToast("success", "閰嶇疆宸叉仮澶?, "澶囦唤閰嶇疆宸插簲鐢ㄣ€?);
        logEvent("宸叉仮澶嶉厤缃?, restored, "success");
      }

      async function resetAllConfig() {
        const result = await confirmAction({
          title: "纭閲嶇疆鎵€鏈夎缃?,
          message: "姝ゆ搷浣滀細娓呴櫎鎵€鏈夐厤缃苟鎭㈠榛樿鍊笺€?,
          impact: "鍖呮嫭 LLM銆佽鍒欍€佽鍒掍换鍔″拰绐楀彛璁剧疆銆?,
          confirmLabel: "閲嶇疆鎵€鏈夎缃?
        });

        if (!result.confirmed) {
          showToast("warn", "宸插彇娑堟搷浣?, "娌℃湁閲嶇疆浠讳綍璁剧疆銆?);
          return;
        }

        const reset = await requestJson("/api/config/reset-all", {
          method: "POST",
          body: JSON.stringify({})
        });

        await Promise.allSettled([loadPreferences(), loadRules(), loadDesktopSettings(), loadLlmConfig(), loadSchedules()]);
        appState.settings.scheduleEditor = null;
        rerenderIfView("settings");
        showToast("success", "宸查噸缃墍鏈夎缃?, "绯荤粺宸茬粡鎭㈠涓洪粯璁ょ姸鎬併€?);
        logEvent("宸查噸缃墍鏈夎缃?, reset, "success");
        scheduleAutoUpdateCheck();
      }

      async function checkUpdateNow() {
        const result = await checkForAppUpdate();
        if (result.ok) {
          showToast(result.updateAvailable ? "warn" : "success", "鏇存柊妫€鏌ュ畬鎴?, formatUpdateState(result));
        } else {
          showToast("warn", "鏇存柊妫€鏌ュけ璐?, result.reason || "鏃犳硶妫€鏌ユ洿鏂般€?);
        }
      }

      async function openUpdateUrl() {
        const url = updateDownloadUrl();
        if (!url) {
          showToast("warn", "鏆傛棤涓嬭浇閾炬帴", "璇峰厛瀹屾垚鏇存柊妫€鏌ャ€?);
          return;
        }

        if (!window.diskClawDesktop?.openExternal) {
          showToast("warn", "褰撳墠鐜涓嶆敮鎸?, "鏃犳硶鎵撳紑澶栭儴閾炬帴銆?);
          return;
        }

        await window.diskClawDesktop.openExternal(url);
      }

      async function runScheduleNow(scheduleId) {
        const schedule = (appState.settings.schedules || []).find((item) => item.id === scheduleId) || null;
        const task = await requestJson("/api/schedules/" + encodeURIComponent(scheduleId) + "/run", {
          method: "POST",
          body: JSON.stringify({})
        });

        beginTrackedTask(task, titleForScheduleRun(schedule));
        await loadSchedules();
        closeScheduleDialog();
        switchView("home");
        showToast("success", "鑷姩璁″垝宸插惎鍔?, "浠诲姟宸茬粡鍦ㄥ悗鍙板紑濮嬫墽琛屻€?);
        logEvent("宸叉墜鍔ㄨЕ鍙戣鍒掍换鍔?, {
          scheduleId
        }, "success");
      }

      function viewUserSchedule(scheduleId) {
        const schedule = (appState.settings.schedules || []).find((item) => item.id === scheduleId) || null;
        if (!schedule) {
          showToast("warn", "璁″垝涓嶅瓨鍦?, "娌℃湁鎵惧埌瀵瑰簲鐨勭敤鎴疯鍒掋€?);
          return;
        }

        appState.scheduleDialog = schedule;
        renderScheduleDialog();
      }

      function startNewUserSchedule() {
        appState.settings.scheduleEditor = buildUserScheduleDraft();
        rerenderIfView("settings");
      }

      function startEditUserSchedule(scheduleId) {
        const schedule = (appState.settings.schedules || []).find((item) => item.id === scheduleId) || null;
        if (!schedule) {
          showToast("warn", "璁″垝涓嶅瓨鍦?, "娌℃湁鎵惧埌瀵瑰簲鐨勭敤鎴疯鍒掋€?);
          return;
        }

        appState.settings.scheduleEditor = buildUserScheduleDraft(schedule);
        closeScheduleDialog();
        rerenderIfView("settings");
      }

      function cancelUserScheduleEdit() {
        appState.settings.scheduleEditor = null;
        rerenderIfView("settings");
      }

      async function browseUserScheduleTarget() {
        if (!window.diskClawDesktop?.chooseFolder) {
          showToast("warn", "褰撳墠鐜涓嶆敮鎸?, "娴忚鏂囦欢澶逛粎鍦ㄦ闈㈢鍙敤銆?);
          return;
        }

        const selectedPath = await window.diskClawDesktop.chooseFolder();
        if (!selectedPath) {
          return;
        }

        const node = root.getElementById("userScheduleTargetPath");
        if (node) {
          node.value = selectedPath;
        }
      }

      async function saveUserSchedule() {
        const current = appState.settings.scheduleEditor || buildUserScheduleDraft();
        const targetPath = String(root.getElementById("userScheduleTargetPath")?.value || "").trim();
        const payload = {
          id: current.id || undefined,
          source: "user",
          name: String(root.getElementById("userScheduleName")?.value || "").trim(),
          enabled: Boolean(root.getElementById("userScheduleEnabled")?.checked),
          action: String(root.getElementById("userScheduleAction")?.value || "plan-only"),
          cleanupMode: String(root.getElementById("userScheduleCleanupMode")?.value || "quarantine"),
          dryRun: Boolean(root.getElementById("userScheduleDryRun")?.checked),
          maxItems: Number(root.getElementById("userScheduleMaxItems")?.value || 10),
          intervalMinutes: Number(root.getElementById("userScheduleInterval")?.value || 10080),
          targets: [
            {
              path: targetPath
            }
          ],
          options: {
            maxDepth: Number(getScanSettings().maxDepth || DEFAULT_SCAN_SETTINGS.maxDepth),
            maxFiles: Number(getScanSettings().maxFiles || DEFAULT_SCAN_SETTINGS.maxFiles),
            largeFileThresholdBytes: Number(getScanSettings().largeFileThresholdBytes || DEFAULT_SCAN_SETTINGS.largeFileThresholdBytes),
            staleDays: Number(getScanSettings().staleDays || DEFAULT_SCAN_SETTINGS.staleDays)
          }
        };

        const saved = await requestJson("/api/schedules", {
          method: "POST",
          body: JSON.stringify(payload)
        });

        await loadSchedules();
        appState.settings.scheduleEditor = null;
        rerenderIfView("settings");
        showToast("success", current.id ? "璁″垝宸叉洿鏂? : "璁″垝宸插垱寤?, "鐢ㄦ埛鑷畾涔夎鍒掑凡缁忎繚瀛樸€?);
        logEvent(current.id ? "宸叉洿鏂扮敤鎴疯鍒? : "宸插垱寤虹敤鎴疯鍒?, {
          scheduleId: saved.id,
          name: saved.name
        }, "success");
      }

      async function deleteUserSchedule(scheduleId) {
        const schedule = (appState.settings.schedules || []).find((item) => item.id === scheduleId) || null;
        const result = await confirmAction({
          title: "纭鍒犻櫎鐢ㄦ埛璁″垝",
          message: "鍒犻櫎鍚庯紝姝よ鍒掑皢涓嶅啀鑷姩鎵ц銆?,
          impact: "璁″垝鍚嶇О锛? + (schedule?.name || "鏈懡鍚嶈鍒?),
          confirmLabel: "鍒犻櫎璁″垝"
        });

        if (!result.confirmed) {
          showToast("warn", "宸插彇娑堟搷浣?, "鐢ㄦ埛璁″垝娌℃湁琚垹闄ゃ€?);
          return;
        }

        await requestJson("/api/schedules/" + encodeURIComponent(scheduleId), {
          method: "DELETE",
          body: JSON.stringify({})
        });
        await loadSchedules();
        closeScheduleDialog();
        rerenderIfView("settings");
        showToast("success", "璁″垝宸插垹闄?, "鐢ㄦ埛鑷畾涔夎鍒掑凡缁忕Щ闄ゃ€?);
        logEvent("宸插垹闄ょ敤鎴疯鍒?, {
          scheduleId,
          name: schedule?.name || null
        }, "success");
      }

      function resetLocalUi() {
        window.localStorage.removeItem(STORAGE_KEYS.scanSettings);
        window.localStorage.removeItem(STORAGE_KEYS.view);
        appState.currentView = "home";
        appState.logsExpanded = false;
        showToast("success", "鐣岄潰璁剧疆宸查噸缃?, "鏈湴鎵弿鍙傛暟鍜岀晫闈㈢姸鎬佸凡鎭㈠榛樿銆?);
        logEvent("宸查噸缃湰鍦扮晫闈㈣缃?, null, "success");
        renderApp();
      }

      function toggleDebugMode() {
        appState.debugMode = !appState.debugMode;
        writeLocalJson(STORAGE_KEYS.debugMode, appState.debugMode);
        showToast("info", appState.debugMode ? "璋冭瘯妯″紡宸插紑鍚? : "璋冭瘯妯″紡宸插叧闂?, "褰撳墠浠呭奖鍝嶇晫闈㈢骇鍒殑鏃ュ織璁板綍銆?);
        renderCurrentView();
      }

      function rerenderIfView(viewName) {
        if (appState.currentView === viewName) {
          renderCurrentView();
        }
      }

      root.addEventListener("click", async (event) => {
        const actionNode = event.target.closest("[data-action]");
        if (!actionNode) {
          return;
        }

        const action = actionNode.getAttribute("data-action");

        try {
          if (action === "switch-view") {
            switchView(actionNode.getAttribute("data-view"));
            return;
          }

          if (action === "refresh-data") {
            await Promise.allSettled([refreshHealth(), loadPreferences(), loadReports(), loadQuarantine()]);
            renderApp();
            showToast("success", "鏁版嵁宸插埛鏂?, "椤甸潰灞曠ず鐨勪俊鎭凡缁忔洿鏂般€?);
            return;
          }

          if (action === "browse-target") {
            await browseTarget();
            return;
          }

          if (action === "start-home-scan" || action === "rerun-home-scan") {
            await startHomeScan();
            return;
          }

          if (action === "start-home-cleanup") {
            await startHomeCleanup();
            return;
          }

          if (action === "pause-task") {
            await pauseTask();
            return;
          }

          if (action === "resume-task") {
            await resumeTask();
            return;
          }

          if (action === "cancel-task") {
            await cancelTask();
            return;
          }

          if (action === "toggle-all-quarantine") {
            const activeItems = filteredQuarantineItems().filter((item) => !item.restoredAt);
            const checkedNow = Boolean(actionNode.checked);
            appState.quarantine.selectedIds = checkedNow ? activeItems.map((item) => item.id) : [];
            rerenderIfView("quarantine");
            return;
          }

          if (action === "toggle-quarantine-item") {
            const id = actionNode.getAttribute("data-id");
            if (!id) {
              return;
            }

            if (actionNode.checked) {
              if (!appState.quarantine.selectedIds.includes(id)) {
                appState.quarantine.selectedIds.push(id);
              }
            } else {
              appState.quarantine.selectedIds = appState.quarantine.selectedIds.filter((item) => item !== id);
            }

            rerenderIfView("quarantine");
            return;
          }

          if (action === "restore-selected") {
            await restoreQuarantineItems(appState.quarantine.selectedIds.map((id) => ({ id })));
            appState.quarantine.selectedIds = [];
            return;
          }

          if (action === "delete-selected") {
            await deleteQuarantineItems(appState.quarantine.selectedIds.map((id) => ({ id })));
            appState.quarantine.selectedIds = [];
            return;
          }

          if (action === "clear-quarantine") {
            await deleteQuarantineItems([], true);
            appState.quarantine.selectedIds = [];
            return;
          }

          if (action === "restore-quarantine-item") {
            await restoreQuarantineItems([{ id: actionNode.getAttribute("data-id") }]);
            return;
          }

          if (action === "delete-quarantine-item") {
            await deleteQuarantineItems([{ id: actionNode.getAttribute("data-id") }]);
            return;
          }

          if (action === "view-report") {
            await openReport(actionNode.getAttribute("data-report-id"));
            return;
          }

          if (action === "view-adjacent-report") {
            await viewAdjacentReport(actionNode.getAttribute("data-direction"));
            return;
          }

          if (action === "export-report") {
            await exportReport(actionNode.getAttribute("data-report-id"), actionNode.getAttribute("data-format"));
            return;
          }

          if (action === "refresh-history") {
            await loadReports();
            syncSelectedReportsAfterFilter();
            rerenderIfView("history");
            return;
          }

          if (action === "toggle-all-reports") {
            const reports = filteredReports();
            const checkedState = Boolean(actionNode.checked);
            appState.selectedReports = checkedState ? reports.map((report) => report.reportId) : [];
            rerenderIfView("history");
            return;
          }

          if (action === "toggle-report") {
            toggleReportSelection(actionNode.getAttribute("data-report-id"), Boolean(actionNode.checked));
            rerenderIfView("history");
            return;
          }

          if (action === "delete-report") {
            await deleteReports([actionNode.getAttribute("data-report-id")]);
            return;
          }

          if (action === "delete-selected-reports") {
            await deleteReports(appState.selectedReports);
            return;
          }

          if (action === "save-basic-settings") {
            await saveBasicSettings();
            return;
          }

          if (action === "refresh-system-schedule") {
            await loadSchedules();
            rerenderIfView("settings");
            showToast("success", "鑷姩璁″垝宸插埛鏂?, "褰撳墠璁″垝鐘舵€佸凡缁忔洿鏂般€?);
            return;
          }

          if (action === "run-system-schedule-now") {
            await runScheduleNow(actionNode.getAttribute("data-schedule-id"));
            return;
          }

          if (action === "check-update") {
            await checkUpdateNow();
            return;
          }

          if (action === "check-update-now") {
            await checkUpdateNow();
            return;
          }

          if (action === "open-update-url") {
            await openUpdateUrl();
            return;
          }

          if (action === "run-user-schedule-now") {
            await runScheduleNow(actionNode.getAttribute("data-schedule-id"));
            return;
          }

          if (action === "new-user-schedule") {
            startNewUserSchedule();
            return;
          }

          if (action === "view-user-schedule") {
            viewUserSchedule(actionNode.getAttribute("data-schedule-id"));
            return;
          }

          if (action === "edit-user-schedule") {
            startEditUserSchedule(actionNode.getAttribute("data-schedule-id"));
            return;
          }

          if (action === "delete-user-schedule") {
            await deleteUserSchedule(actionNode.getAttribute("data-schedule-id"));
            return;
          }

          if (action === "cancel-user-schedule-edit") {
            cancelUserScheduleEdit();
            return;
          }

          if (action === "browse-user-schedule-target") {
            await browseUserScheduleTarget();
            return;
          }

          if (action === "save-user-schedule") {
            await saveUserSchedule();
            return;
          }

          if (action === "load-llm-config") {
            await loadLlmConfig();
            rerenderIfView("settings");
            return;
          }

          if (action === "fill-llm-defaults") {
            fillLlmDefaultsInForm();
            showToast("info", "宸插～鍏呴粯璁ら厤缃?, "鎮ㄥ彲浠ユ寜闇€淇敼鍚庡啀淇濆瓨銆?);
            return;
          }

          if (action === "test-llm-config") {
            await testLlmConfig();
            return;
          }

          if (action === "save-llm-config") {
            await saveLlmConfig();
            return;
          }

          if (action === "load-rules") {
            await Promise.allSettled([loadRules(), loadPreferences()]);
            rerenderIfView("settings");
            return;
          }

          if (action === "reset-rules") {
            fillRulesDefaultsInForm();
            showToast("info", "宸叉仮澶嶉粯璁よ鍒?, "鍒繕浜嗙偣鍑讳繚瀛樿鍒欓厤缃€?);
            return;
          }

          if (action === "save-rules") {
            await saveRules();
            return;
          }

          if (action === "load-desktop-settings") {
            await loadDesktopSettings();
            rerenderIfView("settings");
            return;
          }

          if (action === "test-notification") {
            if (!window.diskClawDesktop?.notify) {
              showToast("warn", "褰撳墠鐜涓嶆敮鎸?, "绯荤粺閫氱煡浠呭湪 Electron 妗岄潰绔彲鐢ㄣ€?);
              return;
            }
            await window.diskClawDesktop.notify("纾佺洏娓呯悊澶ц櫨", "杩欐槸涓€鏉℃祴璇曢€氱煡銆?);
            showToast("success", "閫氱煡宸插彂閫?, "璇锋鏌ョ郴缁熼€氱煡鍖哄煙銆?);
            return;
          }

          if (action === "save-system-settings") {
            await saveSystemSettings();
            return;
          }

          if (action === "backup-config") {
            await backupConfig();
            return;
          }

          if (action === "restore-config") {
            await restoreConfig();
            return;
          }

          if (action === "reset-all-config") {
            await resetAllConfig();
            return;
          }

          if (action === "switch-settings-section") {
            const section = actionNode.getAttribute("data-section");
            setActiveSettingsSection(section);
            rerenderIfView("settings");
            return;
          }

          if (action === "toggle-log-expand") {
            appState.logsExpanded = !appState.logsExpanded;
            root.getElementById("toggleLogExpand").textContent = appState.logsExpanded ? "鏀惰捣" : "灞曞紑鍏ㄩ儴";
            renderLogsPanel();
            return;
          }

          if (action === "export-logs") {
            if (!appState.logs.length) {
              showToast("warn", "娌℃湁鍙鍑虹殑鏃ュ織", "褰撳墠鏃ュ織鍒楄〃涓虹┖銆?);
              return;
            }
            const format = actionNode.getAttribute("data-format");
            const content = format === "txt"
              ? appState.logs.map((entry) => "[" + formatDate(entry.timeIso) + "] [" + entry.level + "] " + entry.message + (entry.data ? "\\n" + JSON.stringify(entry.data, null, 2) : "")).join("\\n\\n")
              : JSON.stringify(appState.logs, null, 2);
            exportTextFile(format === "txt" ? "diskclaw-log.txt" : "diskclaw-log.json", content, format === "txt" ? "text/plain" : "application/json");
            showToast("success", "鏃ュ織宸插鍑?, "瀵煎嚭鏂囦欢宸茬粡鐢熸垚銆?);
            return;
          }

          if (action === "clear-logs") {
            const result = await confirmAction({
              title: "纭娓呯┖鏃ュ織",
              message: "杩欎細娓呯┖褰撳墠鐣岄潰涓殑鏃ュ織璁板綍銆?,
              impact: "褰撳墠鏃ュ織灏嗗叏閮ㄦ竻绌恒€?,
              confirmLabel: "娓呯┖鏃ュ織"
            });
            if (!result.confirmed) {
              showToast("warn", "宸插彇娑堟搷浣?, "鏃ュ織娌℃湁琚竻绌恒€?);
              return;
            }
            appState.logs = [];
            renderLogsPanel();
            showToast("success", "鏃ュ織宸叉竻绌?, "褰撳墠鏃ュ織鍒楄〃宸茬粡閲嶇疆銆?);
            return;
          }

          if (action === "toggle-debug-mode") {
            toggleDebugMode();
            return;
          }

          if (action === "reset-local-ui") {
            const result = await confirmAction({
              title: "纭閲嶇疆鐣岄潰璁剧疆",
              message: "杩欎細娓呯┖鏈湴淇濆瓨鐨勬壂鎻忓弬鏁板拰褰撳墠瑙嗗浘銆?,
              impact: "涓嶄細褰卞搷宸蹭繚瀛樼殑 AI 閰嶇疆銆佽鍒欏拰鍘嗗彶鏁版嵁銆?,
              confirmLabel: "绔嬪嵆閲嶇疆"
            });
            if (!result.confirmed) {
              showToast("warn", "宸插彇娑堟搷浣?, "鏈湴鐣岄潰璁剧疆淇濇寔涓嶅彉銆?);
              return;
            }
            resetLocalUi();
            return;
          }

          if (action === "open-latest-history") {
            switchView("history");
            const latest = appState.reports[0];
            if (latest) {
              await openReport(latest.reportId);
            }
            return;
          }

          if (action === "home-reset") {
            appState.home.status = "idle";
            renderCurrentView();
            return;
          }

          if (action === "close-report") {
            closeReportDialog();
            return;
          }

          if (action === "close-schedule") {
            closeScheduleDialog();
            return;
          }

          if (action === "check-update") {
            showToast("info", "妫€鏌ユ洿鏂?, "褰撳墠寮€鍙戠増鏆傛湭鎺ュ叆鑷姩鏇存柊鏈嶅姟銆?);
            return;
          }

          if (action === "confirm-cancel") {
            if (pendingConfirmResolver) {
              const resolver = pendingConfirmResolver;
              pendingConfirmResolver = null;
              resolver(false);
            }
            return;
          }

          if (action === "confirm-proceed") {
            const keywordWrap = root.getElementById("confirmKeywordWrap");
            const keywordInput = root.getElementById("confirmKeywordInput");
            const requiredKeyword = keywordWrap.getAttribute("data-keyword") || "";

            if (requiredKeyword && keywordInput.value.trim() !== requiredKeyword) {
              showToast("error", "纭澶辫触", "璇疯緭鍏ユ纭殑纭鏂囧瓧鍚庡啀缁х画銆?);
              return;
            }

            if (pendingConfirmResolver) {
              const resolver = pendingConfirmResolver;
              pendingConfirmResolver = null;
              resolver(true);
            }
          }
        } catch (error) {
          showRequestErrorToast(error);
        }
      });

      window.addEventListener("diskclaw:open-path", (event) => {
        handleExternalOpenPath(event.detail);
      });

      root.addEventListener("change", async (event) => {
        const target = event.target;

        if (target.id === "historyRangeSelect") {
          appState.reportRange = String(target.value || "all");
          syncSelectedReportsAfterFilter();
          rerenderIfView("history");
          return;
        }

        if (target.id === "historyTypeSelect") {
          appState.reportTypeFilter = String(target.value || "all");
          syncSelectedReportsAfterFilter();
          rerenderIfView("history");
          return;
        }

        if (target.id === "quarantineStatusSelect") {
          appState.quarantine.statusFilter = String(target.value || "all");
          syncSelectedQuarantineAfterFilter();
          rerenderIfView("quarantine");
          return;
        }

        if (target.id === "quarantineSortSelect") {
          appState.quarantine.sort = String(target.value || "date-desc");
          syncSelectedQuarantineAfterFilter();
          rerenderIfView("quarantine");
          return;
        }

        if (target.id === "historySortSelect") {
          appState.reportSort = String(target.value || "date-desc");
          syncSelectedReportsAfterFilter();
          rerenderIfView("history");
          return;
        }

        if (target.id === "homeTargetInput") {
          saveScanSettings({
            scanTarget: String(target.value || "").trim()
          });
          renderTopbar();
          return;
        }

        if (target.id === "logLevelFilter" || target.id === "logTimeFilter") {
          renderLogsPanel();
        }
      });

      root.addEventListener("input", (event) => {
        if (event.target.id === "logSearch") {
          renderLogsPanel();
          return;
        }

        if (event.target.id === "historySearchInput") {
          appState.reportSearch = String(event.target.value || "");
          syncSelectedReportsAfterFilter();
          rerenderIfView("history");
          return;
        }

        if (event.target.id === "quarantineSearchInput") {
          appState.quarantine.search = String(event.target.value || "");
          syncSelectedQuarantineAfterFilter();
          rerenderIfView("quarantine");
          return;
        }

        if (event.target.id === "rulesScanTarget") {
          saveScanSettings({
            scanTarget: String(event.target.value || "").trim()
          });
          renderTopbar();
          return;
        }
      });

      root.getElementById("reportOverlay").addEventListener("click", (event) => {
        if (event.target.id === "reportOverlay") {
          closeReportDialog();
        }
      });

      root.getElementById("scheduleOverlay").addEventListener("click", (event) => {
        if (event.target.id === "scheduleOverlay") {
          closeScheduleDialog();
        }
      });

      window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          if (appState.reportDialog) {
            closeReportDialog();
          }

          if (appState.scheduleDialog) {
            closeScheduleDialog();
          }

          if (pendingConfirmResolver) {
            const resolver = pendingConfirmResolver;
            pendingConfirmResolver = null;
            resolver(false);
          }
        }
      });

      root.getElementById("confirmOverlay").addEventListener("click", (event) => {
        if (event.target.id === "confirmOverlay" && pendingConfirmResolver) {
          const resolver = pendingConfirmResolver;
          pendingConfirmResolver = null;
          resolver(false);
        }
      });

      async function initialize() {
        renderApp();
        logEvent("鐣岄潰宸插垵濮嬪寲", null, "info");

        const tasks = [
          refreshHealth(),
          loadPreferences(),
          loadLlmConfig(),
          loadRules(),
          loadSchedules(),
          loadAppVersion(),
          loadDesktopSettings(),
          loadQuarantine(),
          loadReports(),
          recoverRunningTask()
        ];

        const results = await Promise.allSettled(tasks);
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            logEvent("鍒濆鍖栦换鍔″け璐?, {
              step: index,
              message: result.reason?.message || "鏈煡閿欒"
            }, "error");
          }
        });

        renderApp();
        scheduleAutoUpdateCheck();
        checkForAppUpdate().catch(() => {});
      }

      initialize().catch((error) => {
        showRequestErrorToast(error, "鍒濆鍖栧け璐?);
      });
    })();
  `.replace(/\\`/g, "`").replace(/\\\$\{/g, "${");
}

export function renderDashboardHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>纾佺洏娓呯悊澶ц櫨</title>
  <style>${renderStyles()}</style>
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-badge"><img src="/electron/icon.png" alt="DiskClaw 鍥炬爣"></div>
        <div>
          <h1 class="brand-title">纾佺洏娓呯悊澶ц櫨</h1>
          <p class="brand-copy">鍍忎笓瀹朵竴鏍锋壘鍑虹┖闂撮粦娲烇紝鍍忓姪鎵嬩竴鏍峰畨鍏ㄥ畬鎴愭竻鐞嗐€?/p>
        </div>
      </div>
      <nav class="nav-list" id="sideNav"></nav>
      <div class="sidebar-footer">
        <div class="sidebar-version">
          <div>鐗堟湰锛歷2.0 寮€鍙戜腑</div>
          <div>鎶€鏈爤鏈彉鏇达紝姝ｅ湪閲嶆瀯 ToC 浣撻獙銆?/div>
        </div>
        <button class="ghost-link" data-action="check-update">妫€鏌ユ洿鏂?/button>
      </div>
    </aside>
    <main class="workspace">
      <header class="topbar" id="topbar"></header>
      <section class="task-banner" id="taskBanner"></section>
      <section class="view-mount" id="viewMount"></section>
    </main>
  </div>

  <div class="toast-host" id="toastHost"></div>

  <div class="modal-overlay" id="confirmOverlay">
    <div class="dialog-card small">
      <div class="dialog-head">
        <div>
          <p class="card-kicker">鎿嶄綔纭</p>
          <h3 class="dialog-title" id="confirmTitle">璇风‘璁ゆ搷浣?/h3>
        </div>
      </div>
      <div class="dialog-body">
        <p class="section-copy" id="confirmMessage">姝ゆ搷浣滀細淇敼鏈湴鏁版嵁锛岃纭鍚庣户缁€?/p>
        <div class="story-card">
          <h4 class="story-title">褰卞搷鑼冨洿</h4>
          <p class="story-copy" id="confirmImpact">鏃?/p>
        </div>
        <label class="checkbox-row" id="confirmRememberRow" style="display:none;">
          <input id="confirmRemember" type="checkbox">
          <span>璁颁綇杩欐閫夋嫨</span>
        </label>
        <div id="confirmKeywordWrap" data-keyword="" style="display:none;">
          <label class="label" for="confirmKeywordInput">璇疯緭鍏ョ‘璁ゆ枃瀛?/label>
          <input id="confirmKeywordInput" placeholder="璇疯緭鍏ョ‘璁ゆ枃瀛?>
        </div>
        <div class="button-row">
          <button class="button-subtle" data-action="confirm-cancel">鍙栨秷</button>
          <button class="button-warn" data-action="confirm-proceed" id="confirmProceed">纭鎵ц</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal-overlay" id="reportOverlay">
    <div class="dialog-card" id="reportDialogContent"></div>
  </div>

  <div class="modal-overlay" id="scheduleOverlay">
    <div class="dialog-card" id="scheduleDialogContent"></div>
  </div>

  <script>${renderClientScript()}</script>
</body>
</html>`;
}


