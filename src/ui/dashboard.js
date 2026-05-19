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
      width: 38px;
      height: 38px;
      border-radius: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.05);
      flex: 0 0 auto;
    }

    .nav-icon-svg {
      width: 20px;
      height: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: currentColor;
    }

    .nav-icon-svg svg {
      width: 20px;
      height: 20px;
      display: block;
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
      width: 40px;
      height: 40px;
      border-radius: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.06);
      flex: 0 0 auto;
    }

    .settings-nav-icon-svg {
      width: 20px;
      height: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: currentColor;
    }

    .settings-nav-icon-svg svg {
      width: 20px;
      height: 20px;
      display: block;
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
        { key: "basic", label: "基础设置", copy: "自动扫描、通知和默认目录。", icon: "/electron/icons/settings/basic.svg" },
        { key: "llm", label: "LLM 配置", copy: "第三方模型接入与密钥。", icon: "/electron/icons/settings/llm.svg" },
        { key: "rules", label: "规则配置", copy: "扫描范围、白黑名单与阈值。", icon: "/electron/icons/settings/rules.svg" },
        { key: "system", label: "系统设置", copy: "窗口、语言、更新与启动项。", icon: "/electron/icons/settings/system.svg" },
        { key: "data", label: "数据管理", copy: "备份、恢复和重置配置。", icon: "/electron/icons/settings/data.svg" },
        { key: "schedule", label: "计划任务", copy: "系统与用户计划任务管理。", icon: "/electron/icons/settings/schedule.svg" },
        { key: "update", label: "应用更新", copy: "检查版本与更新链接。", icon: "/electron/icons/settings/update.svg" },
        { key: "advanced", label: "高级设置", copy: "日志、调试与关于信息。", icon: "/electron/icons/settings/advanced.svg" }
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
            reason: "正在检测..."
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
        return String(value || "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");
      }

      function fileNameFromPath(filePath) {
        const parts = String(filePath || "").split(/[\\\\/]/).filter(Boolean);
        return parts[parts.length - 1] || String(filePath || "未命名文件");
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
          return "未知";
        }
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
          return "未知";
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
          plan: "智能扫描",
          cleanup: "一键清理",
          "duplicate-cleanup": "重复文件清理",
          "hotspot-cleanup": "热点目录清理",
          restore: "隔离区恢复",
          "quarantine-delete": "隔离区删除",
          "quarantine-clear": "隔离区清空",
          "scheduled-cleanup": "自动计划任务"
        };

        return map[type] || type || "未知类型";
      }

      function riskChipLabel(level) {
        const map = {
          low: "低风险",
          medium: "中风险",
          high: "高风险"
        };
        return map[level] || "未知风险";
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
          return "未设置";
        }
        if (minutes >= 30 * 24 * 60) {
          return "每月";
        }
        if (minutes >= 7 * 24 * 60) {
          return "每周";
        }
        if (minutes >= 24 * 60) {
          return "每天";
        }
        return "每 " + minutes + " 分钟";
      }

      function summarizeScheduleAction(action) {
        return action === "auto-cleanup"
          ? "扫描完成后自动清理低风险项"
          : "仅自动扫描并生成分析结果";
      }

      function formatScheduleSource(source) {
        return source === "system-preferences" ? "系统自动计划" : "用户自定义计划";
      }

      function formatUpdateState(update) {
        if (!update) {
          return "未检查";
        }

        if (!update.ok) {
          return update.reason || "检查失败";
        }

        return update.updateAvailable
          ? "发现新版本 " + update.latestVersion
          : "当前已是最新版本 " + update.currentVersion;
      }

      function updateDownloadUrl() {
        return appState.settings.update?.downloadUrl || "";
      }

      function titleForScheduleRun(schedule = null) {
        if (!schedule) {
          return "计划任务执行中";
        }

        return schedule.action === "auto-cleanup"
          ? "自动计划清理中"
          : "自动计划扫描中";
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
          return "当前没有启用自动计划任务，因为还没有设置默认扫描目录。";
        }

        if (!preferences.autoScanEnabled && !preferences.autoCleanupEnabled) {
          return "当前没有启用自动计划任务，因为自动扫描和自动清理都处于关闭状态。";
        }

        return "当前没有启用自动计划任务。只要您设置默认扫描目录，并开启自动扫描或自动清理，系统就会自动创建计划。";
      }

      function getHomeFooterText() {
        const latestCleanup = getLatestCleanupEntry();

        if (latestCleanup) {
          const days = daysSince(latestCleanup.createdAt);
          const daysText = days === null ? "最近" : days === 0 ? "今天" : (days + " 天前");
          const released = formatBytes(latestCleanup.reclaimedBytes || 0);
          return "上次清理：" + daysText + "，已释放 " + released + " 空间。";
        }

        return "AI 智能分析您的磁盘，安全清理垃圾文件。";
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
        const copy = error?.message || "请求没有成功完成。";
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
          const error = new Error(payload?.error?.message || "请求失败。");
          error.code = payload?.error?.code || "request_failed";
          error.payload = payload;
          throw error;
        }

        return payload;
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
        const statusText = task.status === "paused" ? "已暂停" : task.status === "cancelled" ? "已取消" : task.status === "failed" ? "执行失败" : "执行中";
        const details = task.details || {};
        const meta = [];

        if (typeof details.scannedFiles === "number") {
          meta.push("已扫描 " + details.scannedFiles + " 个文件");
        }

        if (typeof details.candidateFiles === "number") {
          meta.push("发现 " + details.candidateFiles + " 个候选项");
        }

        if (typeof details.completedItems === "number") {
          meta.push("已处理 " + details.completedItems + " / " + (details.totalItems || 0) + " 个文件");
        }

        if (typeof details.releasedBytes === "number") {
          meta.push("已释放 " + formatBytes(details.releasedBytes));
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
              '<p class="task-banner-title">' + escapeHtml(appState.activeTaskTitle || typeLabel(task.type)) + " · " + escapeHtml(statusText) + "</p>" +
              '<p class="task-banner-copy">' + escapeHtml((task.message || "任务正在后台执行。") + " 当前进度 " + (task.progress || 0) + "%") + "</p>" +
            "</div>" +
            '<div class="task-banner-actions">' +
              '<button class="button-subtle" data-action="pause-task" ' + (canPause ? "" : "disabled") + ">暂停</button>" +
              '<button class="button-subtle" data-action="resume-task" ' + (canResume ? "" : "disabled") + ">继续</button>" +
              '<button class="button-warn" data-action="cancel-task" ' + (canCancel ? "" : "disabled") + ">取消</button>" +
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
            label: "系统垃圾",
            value: sumBy((item) => ["temp", "cache", "log", "recycle-bin"].includes(item.category)),
            copy: "缓存、临时文件、日志等低风险内容"
          },
          {
            label: "重复文件",
            value: duplicateGroups.reduce((sum, item) => sum + Number(item.wastedBytes || 0), 0),
            copy: "重复副本和重复安装包"
          },
          {
            label: "下载文件",
            value: sumBy((item) => item.category === "installer" || /downloads/i.test(item.path || "")),
            copy: "下载目录中的安装包与压缩文件"
          },
          {
            label: "不常用文件",
            value: sumBy((item) => item.category === "stale" || item.category === "large-file"),
            copy: "长期未访问或体积偏大的文件"
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

      function renderNavIcon(view, label) {
        const iconSvg = {
          home: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12 12 4l9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
          quarantine: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18"/><path d="M7 7V4h10v3"/><path d="M6 7h12v13H6z"/><path d="M10 11h4"/><path d="M10 15h4"/></svg>',
          history: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/><path d="M8 5v4"/><path d="M16 10v4"/><path d="M12 15v4"/></svg>',
          settings: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.5"/><path d="M19.4 15a1.8 1.8 0 0 0 .1-6l-1.8.5a6.7 6.7 0 0 0-1-1l.5-1.8a1.8 1.8 0 0 0-6-.1l-.5 1.8a6.7 6.7 0 0 0-1 1l-1.8-.5a1.8 1.8 0 0 0-.1 6l1.8.5a6.7 6.7 0 0 0 1 1l-.5 1.8a1.8 1.8 0 0 0 6 .1l.5-1.8a6.7 6.7 0 0 0 1-1z"/></svg>'
        }[view] || "";
        return '<span class="nav-icon-svg" aria-hidden="true">' + iconSvg + '</span>';
      }

      function renderSettingsNavIcon(iconPath, label) {
        const iconSvg = {
          "/electron/icons/settings/basic.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12 12 4l9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
          "/electron/icons/settings/llm.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/><path d="M8 8v8"/><path d="M12 8v8"/><path d="M16 8v8"/></svg>',
          "/electron/icons/settings/rules.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M7 7V4h10v3"/><path d="M6 7h12v13H6z"/><path d="M9 12h6"/><path d="M9 16h6"/></svg>',
          "/electron/icons/settings/system.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.5"/><path d="M19.4 15a1.8 1.8 0 0 0 .1-6l-1.8.5a6.7 6.7 0 0 0-1-1l.5-1.8a1.8 1.8 0 0 0-6-.1l-.5 1.8a6.7 6.7 0 0 0-1 1l-1.8-.5a1.8 1.8 0 0 0-.1 6l1.8.5a6.7 6.7 0 0 0 1 1l-.5 1.8a1.8 1.8 0 0 0 6 .1l.5-1.8a6.7 6.7 0 0 0 1-1z"/></svg>',
          "/electron/icons/settings/data.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>',
          "/electron/icons/settings/schedule.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/><path d="M12 4V2"/><path d="M12 22v-2"/><path d="M4 12H2"/><path d="M22 12h-2"/></svg>',
          "/electron/icons/settings/update.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0 1 14-5"/><path d="M19 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5"/><path d="M5 20v-5h5"/></svg>',
          "/electron/icons/settings/advanced.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/><path d="M8 5v4"/><path d="M12 10v4"/><path d="M16 15v4"/></svg>'
        }[iconPath] || '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.5"/></svg>';
        return '<span class="settings-nav-icon-svg" aria-hidden="true">' + iconSvg + '</span>';
      }

      function renderNavigation() {
        const items = [
          { view: "home", label: "首页" },
          { view: "quarantine", label: "隔离区" },
          { view: "history", label: "清理历史" },
          { view: "settings", label: "设置" }
        ];

        navMount.innerHTML = items.map((item) => {
          const isActive = appState.currentView === item.view;
          return '<button class="nav-item' + (isActive ? " active" : "") + '" data-action="switch-view" data-view="' + item.view + '">' +
            '<span class="nav-icon">' + renderNavIcon(item.view, item.label) + "</span>" +
            '<span>' + item.label + "</span>" +
          "</button>";
        }).join("");
      }

      function renderHomeIdle(target) {
        return \`
          <section class="card home-hero">
            <div class="home-stack">
              <div class="hero-logo">\${renderAppIcon("DiskClaw 图标")}</div>
              <div>
                <h2 class="home-title">磁盘清理大虾</h2>
                <p class="home-subtitle">AI 智能分析您的磁盘，安全清理垃圾文件。</p>
              </div>
              <button class="hero-orb scan-button" data-action="start-home-scan">
                <div class="hero-orb-state">
                  <div class="hero-orb-mark">扫</div>
                  <div class="hero-orb-label">\${target ? "一键智能扫描" : "选择文件夹开始"}</div>
                  <div class="hero-orb-note">\${target ? "打开软件后，三步完成扫描与清理" : "先选择一个常用文件夹"}</div>
                </div>
              </button>
              <div class="hero-kpis">
                <div class="hero-kpi-card">
                  <div class="card-kicker">核心流程</div>
                  <strong>3 步完成</strong>
                  <span>选择目录、智能扫描、安全清理，全程围绕普通用户的最短路径设计。</span>
                </div>
                <div class="hero-kpi-card">
                  <div class="card-kicker">安全策略</div>
                  <strong>先隔离后处理</strong>
                  <span>所有一键清理都会优先进入隔离区，给恢复和复查留出足够余地。</span>
                </div>
                <div class="hero-kpi-card">
                  <div class="card-kicker">智能分析</div>
                  <strong>\${appState.health.llm?.ok ? "AI 已连接" : "本地规则可用"}</strong>
                  <span>\${escapeHtml(appState.health.llm?.ok ? "会结合 LLM 生成更易理解的清理建议。" : "即使未配置 LLM，也能先完成本地扫描和基础判断。")}</span>
                </div>
              </div>
              <div class="target-row">
                <div class="target-card \${target ? "active" : ""}">
                  <div class="target-card-head">
                    <span class="label-inline">扫描位置</span>
                    <div class="inline-actions">
                      <button class="button-subtle" data-action="browse-target">选择文件夹</button>
                    </div>
                  </div>
                  <input id="homeTargetInput" value="\${escapeHtml(target)}" placeholder="例如：C:\\\\Users\\\\YourName\\\\Downloads">
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
              <div class="hero-logo">\${renderAppIcon("DiskClaw 图标")}</div>
              <div>
                <h2 class="home-title">正在扫描中...</h2>
                <p class="home-subtitle">请稍候，系统正在分析当前目录中的可清理内容。</p>
              </div>
              <div class="hero-orb progress" style="--progress:\${Math.max(6, appState.home.progress || 0)};">
                <div class="hero-orb-state">
                  <div class="hero-orb-mark">\${Math.max(0, Math.round(appState.home.progress || 0))}%</div>
                  <div class="hero-orb-label">正在扫描中...</div>
                  <div class="hero-orb-note">扫描会在后台继续执行</div>
                </div>
              </div>
              <div class="summary-grid">
                <div class="metric-card">
                  <div class="metric-label">已扫描文件数</div>
                  <div class="metric-value">\${stats.scannedFiles || 0}</div>
                  <div class="metric-copy">扫描进度会持续实时更新。</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">已发现可清理空间</div>
                  <div class="metric-value">\${formatBytes(stats.candidateBytes || 0)}</div>
                  <div class="metric-copy">根据已完成的部分扫描结果估算。</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">当前目录</div>
                  <div class="metric-value">\${escapeHtml(fileNameFromPath(target || stats.currentPath || "未设置"))}</div>
                  <div class="metric-copy">正在逐层检查文件与子目录。</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">后台执行</div>
                  <div class="metric-value">已开启</div>
                  <div class="metric-copy">您可以切换到其他页面继续操作。</div>
                </div>
              </div>
              <div class="current-path" title="\${escapeHtml(stats.currentPath || target || "")}">\${escapeHtml(stats.currentPath || target || "正在准备扫描目录...")}</div>
              <div class="home-actions">
                <button class="button-secondary" data-action="browse-target">更换位置</button>
                <button class="button-warn" data-action="cancel-task">取消扫描</button>
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
        const story = plan?.llm?.output?.userMessage || plan?.analysis?.summaryText || "AI 已完成初步分析，建议优先处理低风险的垃圾文件。";

        return \`
          <section class="card home-hero">
            <div class="home-stack" style="width:min(980px, 100%);">
              <div class="hero-summary">
                <div>
                  <div class="eyebrow" style="margin:0 auto 14px; width:max-content;">扫描完成</div>
                  <h2 class="hero-amount">可清理空间：\${formatBytes(summary.reclaimableBytes || 0)}</h2>
                  <p class="hero-caption">系统已经完成扫描与分析。下面是最值得优先处理的四类空间机会。</p>
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
                  <button class="button-primary warm" data-action="start-home-cleanup" \${cleanupItems.length ? "" : "disabled"}>一键清理</button>
                  <button class="button-secondary" data-action="rerun-home-scan">重新扫描</button>
                  <button class="button-subtle" data-action="switch-view" data-view="history">查看详情</button>
                </div>
                <p class="hero-tip">所有文件将先移动到隔离区，可随时恢复。当前一键清理仅优先处理低风险项，共 \${cleanupItems.length} 项。</p>
                <div class="story-card">
                  <h3 class="story-title">AI 分析结果</h3>
                  <p class="story-copy">\${escapeHtml(story)}</p>
                </div>
                <div class="split-layout">
                  <div class="story-card">
                    <h3 class="story-title">本次扫描摘要</h3>
                    <div class="summary-grid">
                      <div class="metric-card">
                        <div class="metric-label">候选文件数</div>
                        <div class="metric-value">\${summary.totalCandidates || 0}</div>
                      </div>
                      <div class="metric-card">
                        <div class="metric-label">低风险项</div>
                        <div class="metric-value">\${summary.riskCounts?.low || 0}</div>
                      </div>
                      <div class="metric-card">
                        <div class="metric-label">重复文件组</div>
                        <div class="metric-value">\${(summary.duplicateGroups || []).length}</div>
                      </div>
                      <div class="metric-card">
                        <div class="metric-label">不常用目录</div>
                        <div class="metric-value">\${(summary.directoryHotspots || []).length}</div>
                      </div>
                    </div>
                  </div>
                  <div class="story-card">
                    <h3 class="story-title">优先建议</h3>
                    <div class="priority-list">
                      \${priorities.length ? priorities.slice(0, 3).map((item) => \`
                        <div class="priority-item" data-action="switch-view" data-view="history">
                          <div class="priority-head">
                            <h4 class="priority-title">\${escapeHtml(item.title || "优先处理项")}</h4>
                            \${makeChip(formatBytes(item.impactedBytes || 0))}
                          </div>
                          <p class="priority-copy">\${escapeHtml(item.description || "建议尽快查看详细报告。")}</p>
                        </div>
                      \`).join("") : '<div class="empty-card">当前没有额外优先建议，您可以直接开始清理。</div>'}
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
              <div class="hero-logo">\${renderAppIcon("DiskClaw 图标")}</div>
              <div>
                <h2 class="home-title">正在安全清理...</h2>
                <p class="home-subtitle">所有文件都会先进入隔离区，您之后仍可恢复。</p>
              </div>
              <div class="story-card" style="text-align:left;">
                <div class="progress-bar">
                  <div class="progress-fill" style="width:\${Math.max(8, appState.home.progress || 0)}%;"></div>
                </div>
                <div class="summary-grid" style="margin-top:18px;">
                  <div class="metric-card">
                    <div class="metric-label">已清理文件</div>
                    <div class="metric-value">\${cleanup.completedItems || 0}</div>
                  </div>
                  <div class="metric-card">
                    <div class="metric-label">目标文件</div>
                    <div class="metric-value">\${cleanup.totalItems || 0}</div>
                  </div>
                  <div class="metric-card">
                    <div class="metric-label">已释放空间</div>
                    <div class="metric-value">\${formatBytes(cleanup.releasedBytes || 0)}</div>
                  </div>
                  <div class="metric-card">
                    <div class="metric-label">当前进度</div>
                    <div class="metric-value">\${Math.round(appState.home.progress || 0)}%</div>
                  </div>
                </div>
                <div class="current-path" title="\${escapeHtml(cleanup.currentPath || "")}">\${escapeHtml(cleanup.currentPath || "正在准备清理文件...")}</div>
              </div>
              <div class="home-actions">
                <button class="button-warn" data-action="cancel-task">取消清理</button>
                <button class="button-subtle" data-action="switch-view" data-view="quarantine">查看隔离区</button>
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
              <div class="hero-logo success">\${renderAppIcon("DiskClaw 图标")}<span class="success-badge">✓</span></div>
              <div>
                <h2 class="home-title">清理完成！</h2>
                <p class="home-subtitle">本次共释放 \${formatBytes(summary.releasedBytes)}，清理了 \${summary.count} 个文件。所有结果都已经进入隔离区或按您的执行方式处理完成。</p>
              </div>
              <div class="summary-grid">
                <div class="metric-card">
                  <div class="metric-label">执行模式</div>
                  <div class="metric-value">\${escapeHtml(result?.mode || "quarantine")}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">成功处理</div>
                  <div class="metric-value">\${summary.count}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">隔离区文件数</div>
                  <div class="metric-value">\${appState.quarantine.items.filter((item) => !item.restoredAt).length}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">报告编号</div>
                  <div class="metric-value">\${escapeHtml(result?.reportId || "已生成")}</div>
                </div>
              </div>
              <div class="story-card">
                <h3 class="story-title">本次收尾提示</h3>
                <p class="story-copy">如果您只是想确认结果是否安全，可以先去隔离区抽查几项；如果您想复盘本次清理收益，可以直接查看详细报告。</p>
              </div>
              <div class="home-actions">
                <button class="button-primary" data-action="open-latest-history">查看详情</button>
                <button class="button-secondary" data-action="home-reset">返回首页</button>
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
                  <h2 class="section-title">隔离区</h2>
                  <p class="section-copy">当前没有隔离文件，后续一键清理的结果会自动出现在这里。</p>
                </div>
              </div>
              <div class="empty-card">还没有隔离文件。清理完成后，您可以在这里进行恢复或永久删除。</div>
            </section>
          \`;
        }

        return \`
          <section class="card">
            <div class="toolbar">
              <div>
                <h2 class="section-title">隔离区</h2>
                <p class="section-copy">共隔离 \${activeItems.length} 个文件，占用 \${formatBytes(totalBytes)} 空间。隔离文件将于 \${retention} 天后自动永久删除。</p>
              </div>
              <div class="toolbar-end">
                <input id="quarantineSearchInput" class="toolbar-select" value="\${escapeHtml(appState.quarantine.search)}" placeholder="搜索文件名 / 路径 / 时间">
                <select class="toolbar-select" id="quarantineStatusSelect">
                  <option value="all" \${selected(appState.quarantine.statusFilter, "all")}>全部状态</option>
                  <option value="active" \${selected(appState.quarantine.statusFilter, "active")}>待恢复</option>
                  <option value="restored" \${selected(appState.quarantine.statusFilter, "restored")}>已恢复</option>
                </select>
                <select class="toolbar-select" id="quarantineSortSelect">
                  <option value="date-desc" \${selected(appState.quarantine.sort, "date-desc")}>按隔离时间排序</option>
                  <option value="size-desc" \${selected(appState.quarantine.sort, "size-desc")}>按文件大小排序</option>
                  <option value="name-asc" \${selected(appState.quarantine.sort, "name-asc")}>按文件名排序</option>
                </select>
                <button class="button-secondary" data-action="restore-selected" \${appState.quarantine.selectedIds.length ? "" : "disabled"}>恢复选中项</button>
                <button class="button-warn" data-action="delete-selected" \${appState.quarantine.selectedIds.length ? "" : "disabled"}>永久删除选中项</button>
                <button class="button-warn" data-action="clear-quarantine" \${activeItems.length ? "" : "disabled"}>清空隔离区</button>
              </div>
            </div>
            <div class="summary-grid" style="margin-bottom:18px;">
              <div class="metric-card">
                <div class="metric-label">隔离文件数</div>
                <div class="metric-value">\${activeItems.length}</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">当前占用空间</div>
                <div class="metric-value">\${formatBytes(totalBytes)}</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">已选文件</div>
                <div class="metric-value">\${appState.quarantine.selectedIds.length}</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">选中文件空间</div>
                <div class="metric-value">\${formatBytes(selectedSummary.totalBytes)}</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">保留时间</div>
                <div class="metric-value">\${retention} 天</div>
              </div>
            </div>
            <div class="quarantine-list history-scroll">
              <div class="quarantine-item">
                <div class="quarantine-head">
                  <div class="checkbox-row grow">
                    <input type="checkbox" id="selectAllQuarantine" data-action="toggle-all-quarantine" \${visibleItems.length && visibleItems.every((item) => appState.quarantine.selectedIds.includes(item.id)) ? "checked" : ""}>
                    <div class="quarantine-main">
                      <label for="selectAllQuarantine">全选当前未恢复文件</label>
                      <p class="history-summary">批量恢复适合误删还原，批量永久删除会直接释放隔离区占用空间。当前筛选结果共 \${visibleItems.length} 项。</p>
                    </div>
                  </div>
                </div>
                <div class="history-actions">
                  <span class="chip">\${selectedSummary.count} 已选</span>
                  <span class="chip">\${formatBytes(selectedSummary.totalBytes)} 选中空间</span>
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
                            \${makeChip(item.restoredAt ? "已恢复" : "待恢复", item.restoredAt ? "" : "low")}
                            \${makeChip("文件大小 " + formatBytes(item.sizeBytes || 0))}
                            \${makeChip("隔离时间 " + formatDate(item.createdAt))}
                          </div>
                        </div>
                      </div>
                      <div class="inline-actions">
                        <button class="button-secondary" data-action="restore-quarantine-item" data-id="\${escapeHtml(item.id)}" \${item.restoredAt ? "disabled" : ""}>恢复</button>
                        <button class="button-warn" data-action="delete-quarantine-item" data-id="\${escapeHtml(item.id)}" \${item.restoredAt ? "disabled" : ""}>永久删除</button>
                      </div>
                    </div>
                    <div class="quarantine-path" title="\${escapeHtml(item.originalPath)}">原路径：\${escapeHtml(item.originalPath)}</div>
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
                <h2 class="section-title">清理历史</h2>
                <p class="section-copy">按时间倒序查看所有历史记录，并可打开详细报告或直接导出。</p>
              </div>
              <div class="toolbar-end">
                <input id="historySearchInput" class="toolbar-select" value="\${escapeHtml(appState.reportSearch)}" placeholder="搜索报告 ID / 类型 / 时间">
                <select class="toolbar-select" id="historyRangeSelect">
                  <option value="all" \${selected(appState.reportRange, "all")}>全部时间</option>
                  <option value="7" \${selected(appState.reportRange, "7")}>最近 7 天</option>
                  <option value="30" \${selected(appState.reportRange, "30")}>最近 30 天</option>
                </select>
                <select class="toolbar-select" id="historyTypeSelect">
                  <option value="all" \${selected(appState.reportTypeFilter, "all")}>全部类型</option>
                  <option value="plan" \${selected(appState.reportTypeFilter, "plan")}>扫描记录</option>
                  <option value="execution" \${selected(appState.reportTypeFilter, "execution")}>执行记录</option>
                  <option value="restore" \${selected(appState.reportTypeFilter, "restore")}>恢复记录</option>
                </select>
                <select class="toolbar-select" id="historySortSelect">
                  <option value="date-desc" \${selected(appState.reportSort, "date-desc")}>按时间排序</option>
                  <option value="space-desc" \${selected(appState.reportSort, "space-desc")}>按释放空间排序</option>
                  <option value="files-desc" \${selected(appState.reportSort, "files-desc")}>按文件数排序</option>
                </select>
                <button class="button-subtle" data-action="refresh-history">刷新历史</button>
                <button class="button-warn" data-action="delete-selected-reports" \${appState.selectedReports.length ? "" : "disabled"}>删除选中报告</button>
              </div>
            </div>
            <div class="history-grid" style="margin-bottom:18px;">
              <div class="metric-card">
                <div class="metric-label">近 7 天报告数</div>
                <div class="metric-value">\${analytics.last7Days.reportCount || 0}</div>
                <div class="metric-copy">近 7 天新增的扫描与清理记录。</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">近 7 天释放空间</div>
                <div class="metric-value">\${formatBytes(analytics.last7Days.reclaimedBytes || 0)}</div>
                <div class="metric-copy">包含已执行与计划释放的空间总量。</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">近 30 天释放空间</div>
                <div class="metric-value">\${formatBytes(analytics.last30Days.reclaimedBytes || 0)}</div>
                <div class="metric-copy">帮助您了解长期清理收益。</div>
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
                          <h3 class="history-title">批量管理</h3>
                          <p class="history-summary">可在这里批量选择、查看、导出或删除报告。长列表会在模块内部滚动，不会拉长整个页面。</p>
                        </div>
                      </div>
                    </div>
                    <div class="history-actions">
                      <span class="chip">\${appState.selectedReports.length} 已选</span>
                      <span class="chip">\${formatBytes(selectedSummary.reclaimableBytes)} 关联空间</span>
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
                          \${report.itemCount ? makeChip("文件数 " + report.itemCount) : ""}
                          \${report.candidateCount ? makeChip("候选项 " + report.candidateCount) : ""}
                          \${report.reclaimedBytes || report.reclaimableBytes ? makeChip("空间 " + formatBytes(report.reclaimedBytes || report.reclaimableBytes || 0), "low") : ""}
                        </div>
                        <p class="history-summary">\${escapeHtml(
                          report.type === "plan"
                            ? "本次记录来自扫描与分析，用于帮助判断哪些空间最值得优先处理。"
                            : report.type === "restore"
                              ? "这是一条隔离区恢复记录，可用于回看恢复结果。"
                              : "这是一条实际执行记录，包含清理结果和空间收益。"
                        )}</p>
                      </div>
                      <div class="history-actions">
                        <button class="button-secondary" data-action="view-report" data-report-id="\${escapeHtml(report.reportId)}">查看报告</button>
                        <button class="button-subtle" data-action="export-report" data-report-id="\${escapeHtml(report.reportId)}" data-format="json">导出 JSON</button>
                        <button class="button-subtle" data-action="export-report" data-report-id="\${escapeHtml(report.reportId)}" data-format="md">导出 Markdown</button>
                        <button class="button-warn" data-action="delete-report" data-report-id="\${escapeHtml(report.reportId)}">删除</button>
                      </div>
                    </div>
                  </div>
                \`).join("")}
              </div>
            \` : '<div class="empty-card">当前筛选范围内还没有历史记录。</div>'}
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
              <span class="fold-indicator">▾</span>
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
          notifications: { scanComplete: true, cleanupComplete: true, errors: true },
          language: "zh-CN",
          checkUpdates: "auto",
          rememberWindowBounds: true,
          defaultCleanupMode: "quarantine",
          updateManifestUrl: ""
        };
        const llm = appState.settings.llm || {
          ...DEFAULT_LLM_FORM,
          hasApiKey: false,
          models: {
            chat: DEFAULT_LLM_FORM.chatModel,
            reason: DEFAULT_LLM_FORM.reasonModel,
            summary: DEFAULT_LLM_FORM.summaryModel
          }
        };
        const rules = appState.settings.rules || { excludePaths: [], whitelistPaths: [], blacklistPaths: [] };
        const desktop = appState.settings.desktop || { isAlwaysOnTop: false, closeBehavior: "ask", openAtLogin: false };
        const systemSchedule = getSystemMaintenanceSchedule();
        const userSchedules = (appState.settings.schedules || []).filter((item) => item.id !== systemMaintenanceScheduleId);
        const update = appState.settings.update;
        const scan = getScanSettings();

        const basicBody =
          '<div class="story-card" style="margin-bottom:18px;">' +
            '<h3 class="story-title">当前自动计划</h3>' +
            (systemSchedule
              ? '<div class="summary-grid" style="margin-top:14px;">' +
                  '<div class="metric-card"><div class="metric-label">计划状态</div><div class="metric-value">已启用</div><div class="metric-copy">' + escapeHtml(systemSchedule.name || "自动扫描") + '</div></div>' +
                  '<div class="metric-card"><div class="metric-label">执行频率</div><div class="metric-value">' + escapeHtml(formatIntervalMinutes(systemSchedule.intervalMinutes)) + '</div><div class="metric-copy">下次执行：' + escapeHtml(formatDate(systemSchedule.nextRunAt)) + '</div></div>' +
                  '<div class="metric-card"><div class="metric-label">执行动作</div><div class="metric-value">' + escapeHtml(systemSchedule.action === "auto-cleanup" ? "自动清理" : "自动扫描") + '</div><div class="metric-copy">' + escapeHtml(summarizeScheduleAction(systemSchedule.action)) + '</div></div>' +
                  '<div class="metric-card"><div class="metric-label">扫描目录</div><div class="metric-value">' + escapeHtml(fileNameFromPath(systemSchedule.targets?.[0]?.path || "未设置")) + '</div><div class="metric-copy" title="' + escapeHtml(systemSchedule.targets?.[0]?.path || "") + '">' + escapeHtml(truncateMiddle(systemSchedule.targets?.[0]?.path || "未设置", 36)) + '</div></div>' +
                '</div>' +
                '<div class="button-row" style="margin-top:14px;"><button class="button-secondary" data-action="run-system-schedule-now" data-schedule-id="' + escapeHtml(systemSchedule.id) + '">立即执行一次</button><button class="button-subtle" data-action="refresh-system-schedule">刷新自动计划</button></div>'
              : '<p class="story-copy">' + escapeHtml(describeScheduleMissingReason(pref)) + '</p>') +
          '</div>' +
          '<div class="form-grid">' +
            '<label class="form-row"><span class="label">自动扫描</span><div class="checkbox-row"><input id="prefAutoScanEnabled" type="checkbox" ' + checked(pref.autoScanEnabled) + '><span>开启自动扫描</span></div></label>' +
            '<label class="form-row"><span class="label">扫描间隔</span><select id="prefAutoScanInterval"><option value="daily" ' + selected(pref.autoScanInterval, "daily") + '>每天</option><option value="weekly" ' + selected(pref.autoScanInterval, "weekly") + '>每周</option><option value="monthly" ' + selected(pref.autoScanInterval, "monthly") + '>每月</option></select></label>' +
            '<label class="form-row"><span class="label">自动清理</span><div class="checkbox-row"><input id="prefAutoCleanupEnabled" type="checkbox" ' + checked(pref.autoCleanupEnabled) + '><span>扫描后自动清理低风险项</span></div></label>' +
            '<label class="form-row"><span class="label">隔离区保留天数</span><select id="prefRetentionDays"><option value="7" ' + selected(String(pref.quarantineRetentionDays), "7") + '>7 天</option><option value="15" ' + selected(String(pref.quarantineRetentionDays), "15") + '>15 天</option><option value="30" ' + selected(String(pref.quarantineRetentionDays), "30") + '>30 天</option><option value="9999" ' + selected(String(pref.quarantineRetentionDays), "9999") + '>永久保留</option></select></label>' +
          '</div>' +
          '<div class="form-grid" style="margin-top:14px;">' +
            '<label class="form-row"><span class="label">通知</span><div class="checkbox-row"><input id="prefNotifyScan" type="checkbox" ' + checked(pref.notifications?.scanComplete) + '><span>扫描完成通知</span></div></label>' +
            '<label class="form-row"><span class="label">&nbsp;</span><div class="checkbox-row"><input id="prefNotifyCleanup" type="checkbox" ' + checked(pref.notifications?.cleanupComplete) + '><span>清理完成通知</span></div></label>' +
            '<label class="form-row"><span class="label">&nbsp;</span><div class="checkbox-row"><input id="prefNotifyErrors" type="checkbox" ' + checked(pref.notifications?.errors) + '><span>错误通知</span></div></label>' +
          '</div>' +
          '<div class="button-row" style="margin-top:18px;"><button class="button-primary" data-action="save-basic-settings">保存基础设置</button></div>';

        const llmBody =
          '<p class="panel-tip">配置第三方 LLM 后，AI 分析和问答会启用更完整的能力。</p>' +
          '<div class="form-grid" style="margin-top:14px;">' +
            '<label class="form-row"><span class="label">启用 AI 分析</span><div class="checkbox-row"><input id="llmEnabled" type="checkbox" ' + checked(llm.enabled) + '><span>允许调用外部 LLM 接口</span></div></label>' +
            '<label class="form-row"><span class="label">服务类型</span><select id="llmProvider"><option value="openai-compatible" ' + selected(llm.provider, "openai-compatible") + '>OpenAI Compatible</option></select></label>' +
            '<label class="form-row"><span class="label">Base URL</span><input id="llmBaseUrl" value="' + escapeHtml(llm.baseUrl || "") + '" placeholder="https://api.openai.com/v1"></label>' +
            '<label class="form-row"><span class="label">API Key</span><input id="llmApiKey" value="" placeholder="' + escapeHtml(llm.hasApiKey ? "已保存，如需替换请输入新值" : "sk-...") + '"></label>' +
            '<label class="form-row"><span class="label">对话模型</span><input id="llmChatModel" value="' + escapeHtml(llm.models?.chat || DEFAULT_LLM_FORM.chatModel) + '"></label>' +
            '<label class="form-row"><span class="label">推理模型</span><input id="llmReasonModel" value="' + escapeHtml(llm.models?.reason || DEFAULT_LLM_FORM.reasonModel) + '"></label>' +
            '<label class="form-row"><span class="label">总结模型</span><input id="llmSummaryModel" value="' + escapeHtml(llm.models?.summary || DEFAULT_LLM_FORM.summaryModel) + '"></label>' +
            '<label class="form-row"><span class="label">超时时间（ms）</span><input id="llmTimeoutMs" type="number" value="' + Number(llm.timeoutMs || DEFAULT_LLM_FORM.timeoutMs) + '"></label>' +
            '<label class="form-row"><span class="label">重试次数</span><input id="llmMaxRetries" type="number" value="' + Number(llm.maxRetries || DEFAULT_LLM_FORM.maxRetries) + '"></label>' +
          '</div>' +
          '<div class="button-row" style="margin-top:18px;"><button class="button-subtle" data-action="load-llm-config">读取已保存配置</button><button class="button-subtle" data-action="fill-llm-defaults">填充默认值</button><button class="button-secondary" data-action="test-llm-config">测试连接</button><button class="button-primary" data-action="save-llm-config">保存配置</button></div>';

        const rulesBody =
          '<p class="panel-tip">这些规则会影响扫描结果和清理建议，请谨慎修改。</p>' +
          '<div class="form-grid" style="margin-top:14px;">' +
            '<label class="form-row"><span class="label">默认扫描目录</span><input id="rulesScanTarget" value="' + escapeHtml(scan.scanTarget || "") + '" placeholder="C:\\Users\\YourName\\Downloads"></label>' +
            '<div class="form-row"><span class="label">选择目录</span><div class="button-row"><button class="button-subtle" data-action="browse-target">浏览文件夹</button></div></div>' +
            '<label class="form-row"><span class="label">最大扫描深度</span><input id="rulesMaxDepth" type="number" value="' + Number(scan.maxDepth || DEFAULT_SCAN_SETTINGS.maxDepth) + '"></label>' +
            '<label class="form-row"><span class="label">最大文件数</span><input id="rulesMaxFiles" type="number" value="' + Number(scan.maxFiles || DEFAULT_SCAN_SETTINGS.maxFiles) + '"></label>' +
            '<label class="form-row"><span class="label">大文件阈值（bytes）</span><input id="rulesLargeFileThreshold" type="number" value="' + Number(scan.largeFileThresholdBytes || DEFAULT_SCAN_SETTINGS.largeFileThresholdBytes) + '"></label>' +
            '<label class="form-row"><span class="label">过期天数阈值</span><input id="rulesStaleDays" type="number" value="' + Number(scan.staleDays || DEFAULT_SCAN_SETTINGS.staleDays) + '"></label>' +
          '</div>' +
          '<div class="form-grid single" style="margin-top:14px;">' +
            '<label class="form-row"><span class="label">排除路径</span><textarea id="rulesExcludePaths" placeholder="每行一个路径">' + escapeHtml((rules.excludePaths || []).join("\\n")) + '</textarea></label>' +
            '<label class="form-row"><span class="label">白名单路径</span><textarea id="rulesWhitelistPaths" placeholder="每行一个路径">' + escapeHtml((rules.whitelistPaths || []).join("\\n")) + '</textarea></label>' +
            '<label class="form-row"><span class="label">黑名单路径</span><textarea id="rulesBlacklistPaths" placeholder="每行一个路径">' + escapeHtml((rules.blacklistPaths || []).join("\\n")) + '</textarea></label>' +
          '</div>' +
          '<div class="button-row" style="margin-top:18px;"><button class="button-subtle" data-action="load-rules">读取规则</button><button class="button-subtle" data-action="reset-rules">恢复默认规则</button><button class="button-primary" data-action="save-rules">保存规则配置</button></div>';

        const systemBody =
          '<div class="form-grid">' +
            '<label class="form-row"><span class="label">开机自动启动</span><div class="checkbox-row"><input id="sysOpenAtLogin" type="checkbox" ' + checked(desktop.openAtLogin) + '><span>系统启动后自动运行</span></div></label>' +
            '<label class="form-row"><span class="label">关闭窗口时</span><select id="sysCloseBehavior"><option value="ask" ' + selected(desktop.closeBehavior, "ask") + '>每次询问</option><option value="tray" ' + selected(desktop.closeBehavior, "tray") + '>最小化到托盘</option></select></label>' +
            '<label class="form-row"><span class="label">总是置顶</span><div class="checkbox-row"><input id="sysAlwaysOnTop" type="checkbox" ' + checked(desktop.isAlwaysOnTop) + '><span>主窗口保持在最前</span></div></label>' +
            '<label class="form-row"><span class="label">记住窗口大小</span><div class="checkbox-row"><input id="sysRememberBounds" type="checkbox" ' + checked(pref.rememberWindowBounds) + '><span>重启后恢复上次窗口大小</span></div></label>' +
            '<label class="form-row"><span class="label">语言</span><select id="sysLanguage"><option value="zh-CN" ' + selected(pref.language, "zh-CN") + '>简体中文</option><option value="en" ' + selected(pref.language, "en") + '>English</option></select></label>' +
            '<label class="form-row"><span class="label">检查更新</span><select id="sysCheckUpdates"><option value="auto" ' + selected(pref.checkUpdates, "auto") + '>自动检查</option><option value="manual" ' + selected(pref.checkUpdates, "manual") + '>手动检查</option></select></label>' +
            '<label class="form-row"><span class="label">更新清单地址</span><input id="updateManifestUrl" value="' + escapeHtml(pref.updateManifestUrl || "") + '" placeholder="https://example.com/diskclaw-update.json"></label>' +
          '</div>' +
          '<div class="button-row" style="margin-top:18px;"><button class="button-subtle" data-action="load-desktop-settings">读取桌面设置</button><button class="button-secondary" data-action="test-notification">测试系统通知</button><button class="button-primary" data-action="save-system-settings">保存系统设置</button></div>';

        const dataBody =
          '<div class="story-card">' +
            '<h3 class="story-title">备份与恢复</h3>' +
            '<p class="story-copy">你可以把当前配置导出成一份 JSON 备份，也可以把备份恢复回当前设备。重置会清除所有配置并恢复默认值。</p>' +
            '<div class="button-row" style="margin-top:16px;"><button class="button-secondary" data-action="backup-config">备份配置</button><button class="button-subtle" data-action="restore-config">恢复配置</button><button class="button-warn" data-action="reset-all-config">重置所有设置</button></div>' +
            '<p class="story-copy" style="margin-top:12px;">隔离文件会按保留时间自动清理，系统计划会随着设置自动同步。</p>' +
          '</div>';

        const scheduleBody =
          '<div class="split-layout">' +
            '<div class="story-card">' +
              '<h3 class="story-title">系统自动计划</h3>' +
              (systemSchedule
                ? '<div class="history-item" style="margin-top:14px;">' +
                    '<div class="history-head">' +
                      '<div>' +
                        '<h4 class="history-title">' + escapeHtml(systemSchedule.name) + '</h4>' +
                        '<div class="history-meta">' +
                          makeChip(formatScheduleSource(systemSchedule.source), "low") +
                          makeChip(formatIntervalMinutes(systemSchedule.intervalMinutes)) +
                          makeChip(systemSchedule.action === "auto-cleanup" ? "自动清理" : "自动扫描") +
                        '</div>' +
                      '</div>' +
                      '<div class="inline-actions"><button class="button-secondary" data-action="run-system-schedule-now" data-schedule-id="' + escapeHtml(systemSchedule.id) + '">立即执行一次</button></div>' +
                    '</div>' +
                    '<p class="list-copy">下次执行：' + escapeHtml(formatDate(systemSchedule.nextRunAt)) + '</p>' +
                    '<p class="list-copy" title="' + escapeHtml(systemSchedule.targets?.[0]?.path || "") + '">扫描目录：' + escapeHtml(truncateMiddle(systemSchedule.targets?.[0]?.path || "未设置", 84)) + '</p>' +
                  '</div>'
                : '<div class="empty-card" style="margin-top:14px;">当前没有系统自动计划。开启自动扫描或自动清理后会自动创建。</div>') +
            '</div>' +
            '<div class="story-card">' +
              '<h3 class="story-title">用户自定义计划</h3>' +
              '<div class="button-row" style="margin-top:14px;"><button class="button-primary" data-action="new-user-schedule">新建用户计划</button>' +
                (appState.settings.scheduleEditor ? '<button class="button-subtle" data-action="cancel-user-schedule-edit">取消编辑</button>' : "") +
              '</div>' +
              (appState.settings.scheduleEditor
                ? '<div class="story-card" style="margin-top:14px;">' +
                    '<h4 class="story-title">' + (appState.settings.scheduleEditor.id ? "编辑用户计划" : "新建用户计划") + '</h4>' +
                    '<div class="form-grid" style="margin-top:14px;">' +
                      '<label class="form-row"><span class="label">计划名称</span><input id="userScheduleName" value="' + escapeHtml(appState.settings.scheduleEditor.name || "") + '" placeholder="例如：每周下载目录扫描"></label>' +
                      '<label class="form-row"><span class="label">扫描目录</span><input id="userScheduleTargetPath" value="' + escapeHtml(appState.settings.scheduleEditor.targetPath || "") + '" placeholder="C:\\Users\\YourName\\Downloads"></label>' +
                      '<label class="form-row"><span class="label">执行频率</span><select id="userScheduleInterval"><option value="1440" ' + selected(String(appState.settings.scheduleEditor.intervalMinutes), "1440") + '>每天</option><option value="10080" ' + selected(String(appState.settings.scheduleEditor.intervalMinutes), "10080") + '>每周</option><option value="43200" ' + selected(String(appState.settings.scheduleEditor.intervalMinutes), "43200") + '>每月</option></select></label>' +
                      '<label class="form-row"><span class="label">执行动作</span><select id="userScheduleAction"><option value="plan-only" ' + selected(appState.settings.scheduleEditor.action, "plan-only") + '>仅扫描</option><option value="auto-cleanup" ' + selected(appState.settings.scheduleEditor.action, "auto-cleanup") + '>自动清理低风险项</option></select></label>' +
                      '<label class="form-row"><span class="label">清理模式</span><select id="userScheduleCleanupMode"><option value="quarantine" ' + selected(appState.settings.scheduleEditor.cleanupMode, "quarantine") + '>隔离区</option><option value="archive" ' + selected(appState.settings.scheduleEditor.cleanupMode, "archive") + '>归档</option><option value="recycle-bin" ' + selected(appState.settings.scheduleEditor.cleanupMode, "recycle-bin") + '>回收站</option><option value="permanent" ' + selected(appState.settings.scheduleEditor.cleanupMode, "permanent") + '>永久删除</option></select></label>' +
                      '<label class="form-row"><span class="label">最大处理项</span><input id="userScheduleMaxItems" type="number" value="' + Number(appState.settings.scheduleEditor.maxItems || 10) + '"></label>' +
                    '</div>' +
                    '<div class="form-grid" style="margin-top:14px;">' +
                      '<label class="form-row"><span class="label">计划状态</span><div class="checkbox-row"><input id="userScheduleEnabled" type="checkbox" ' + checked(appState.settings.scheduleEditor.enabled) + '><span>启用此计划</span></div></label>' +
                      '<label class="form-row"><span class="label">Dry Run</span><div class="checkbox-row"><input id="userScheduleDryRun" type="checkbox" ' + checked(appState.settings.scheduleEditor.dryRun) + '><span>仅模拟执行，不真正清理</span></div></label>' +
                    '</div>' +
                    '<div class="button-row" style="margin-top:18px;"><button class="button-subtle" data-action="browse-user-schedule-target">选择目录</button><button class="button-primary" data-action="save-user-schedule">' + (appState.settings.scheduleEditor.id ? "保存修改" : "创建计划") + '</button></div>' +
                  '</div>'
                : "") +
              (userSchedules.length
                ? '<div class="history-list" style="margin-top:14px;">' +
                    userSchedules.map((item) =>
                      '<div class="history-item">' +
                        '<div class="history-head">' +
                          '<div>' +
                            '<h4 class="history-title">' + escapeHtml(item.name || "未命名计划") + '</h4>' +
                            '<div class="history-meta">' +
                              makeChip(formatScheduleSource(item.source)) +
                              makeChip(formatIntervalMinutes(item.intervalMinutes)) +
                              makeChip(item.action === "auto-cleanup" ? "自动清理" : item.action === "plan-only" ? "仅扫描" : item.action) +
                            '</div>' +
                          '</div>' +
                          '<div class="inline-actions">' +
                            '<button class="button-secondary" data-action="run-user-schedule-now" data-schedule-id="' + escapeHtml(item.id) + '">立即执行</button>' +
                            '<button class="button-subtle" data-action="view-user-schedule" data-schedule-id="' + escapeHtml(item.id) + '">查看详情</button>' +
                            '<button class="button-subtle" data-action="edit-user-schedule" data-schedule-id="' + escapeHtml(item.id) + '">编辑</button>' +
                            '<button class="button-warn" data-action="delete-user-schedule" data-schedule-id="' + escapeHtml(item.id) + '">删除</button>' +
                          '</div>' +
                        '</div>' +
                        '<p class="list-copy">下次执行：' + escapeHtml(formatDate(item.nextRunAt)) + '</p>' +
                        '<p class="list-copy" title="' + escapeHtml(item.targets?.[0]?.path || "") + '">扫描目录：' + escapeHtml(truncateMiddle(item.targets?.[0]?.path || "未设置", 72)) + '</p>' +
                      '</div>'
                    ).join("") +
                  '</div>'
                : '<div class="empty-card" style="margin-top:14px;">当前没有用户自定义计划。</div>') +
            '</div>' +
          '</div>';

        const updateBody =
          '<div class="summary-grid">' +
            '<div class="metric-card"><div class="metric-label">当前版本</div><div class="metric-value">v' + escapeHtml(appState.settings.appVersion || "0.1.0") + '</div><div class="metric-copy">与安装包版本保持一致。</div></div>' +
            '<div class="metric-card"><div class="metric-label">更新状态</div><div class="metric-value">' + escapeHtml(formatUpdateState(update)) + '</div><div class="metric-copy">' + escapeHtml(update?.downloadUrl ? "可直接打开下载页。" : "请先配置更新清单地址。") + '</div></div>' +
            '<div class="metric-card"><div class="metric-label">自动检查</div><div class="metric-value">' + (pref.checkUpdates === "auto" ? "开启" : "关闭") + '</div><div class="metric-copy">保存后会在启动时和定时轮询时检查。</div></div>' +
            '<div class="metric-card"><div class="metric-label">更新地址</div><div class="metric-value">' + escapeHtml(pref.updateManifestUrl ? "已配置" : "未配置") + '</div><div class="metric-copy" title="' + escapeHtml(pref.updateManifestUrl || "") + '">' + escapeHtml(truncateMiddle(pref.updateManifestUrl || "未配置", 52)) + '</div></div>' +
          '</div>' +
          '<div class="button-row" style="margin-top:18px;"><button class="button-secondary" data-action="check-update-now">立即检查更新</button><button class="button-subtle" data-action="open-update-url" ' + (update?.downloadUrl ? "" : "disabled") + '>打开下载页</button></div>' +
          '<div class="story-card" style="margin-top:16px;"><h3 class="story-title">更新说明</h3><p class="story-copy">' + escapeHtml(update?.releaseNotes || "暂无更新说明。") + '</p></div>';

        const advancedBody =
          '<div class="log-toolbar">' +
            '<input id="logSearch" placeholder="搜索日志关键词">' +
            '<select id="logLevelFilter"><option value="all">全部级别</option><option value="info">信息</option><option value="success">成功</option><option value="warn">警告</option><option value="error">错误</option></select>' +
            '<select id="logTimeFilter"><option value="all">全部时间</option><option value="5m">最近 5 分钟</option><option value="1h">最近 1 小时</option><option value="24h">最近 24 小时</option></select>' +
            '<button class="button-subtle" id="toggleLogExpand" data-action="toggle-log-expand">' + (appState.logsExpanded ? "收起" : "展开全部") + '</button>' +
          '</div>' +
          '<div class="button-row" style="margin-bottom:14px;"><button class="button-subtle" data-action="export-logs" data-format="txt">导出 TXT</button><button class="button-subtle" data-action="export-logs" data-format="json">导出 JSON</button><button class="button-warn" data-action="clear-logs">清空日志</button><button class="button-subtle" data-action="toggle-debug-mode">' + (appState.debugMode ? "关闭调试模式" : "开启调试模式") + '</button><button class="button-warn" data-action="reset-local-ui">重置界面设置</button></div>' +
          '<div class="log-list" id="logList"></div>' +
          '<section class="card" style="margin-top:20px;"><h2 class="section-title">关于我们</h2><p class="section-copy">磁盘清理大虾正在从开发态工作台演进为面向普通用户的桌面产品，当前版本重点保证扫描、计划、清理和恢复链路稳定可用。</p></section>';

        return [
          '<section class="settings-grid">',
          renderSettingSection("basic", "基础设置", "自动扫描、通知和默认目录。", basicBody),
          renderSettingSection("llm", "LLM 配置", "第三方模型接入与密钥。", llmBody),
          renderSettingSection("rules", "规则配置", "扫描范围、白名单、黑名单与阈值。", rulesBody),
          renderSettingSection("system", "系统设置", "窗口、语言、更新与启动项。", systemBody),
          renderSettingSection("data", "数据管理", "备份、恢复和重置配置。", dataBody),
          renderSettingSection("schedule", "计划任务", "系统计划与用户自定义计划。", scheduleBody),
          renderSettingSection("update", "应用更新", "版本检查、下载地址与更新说明。", updateBody),
          renderSettingSection("advanced", "高级设置", "日志、调试与关于信息。", advancedBody),
          '</section>'
        ].join('');
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
        nav.innerHTML =
          '<section class="card settings-nav-card">' +
            '<h3 class="settings-nav-title">设置菜单</h3>' +
            '<div class="settings-nav-list">' +
              SETTINGS_SECTIONS.map((item) =>
                '<button class="settings-nav-item' + (item.key === activeSection ? ' active' : '') + '" data-action="switch-settings-section" data-section="' + escapeHtml(item.key) + '">' +
                  '<span class="settings-nav-icon">' + renderSettingsNavIcon(item.icon, item.label) + '</span>' +
                  '<span class="settings-nav-text">' +
                    '<span class="settings-nav-label">' + escapeHtml(item.label) + '</span>' +
                    '<span class="settings-nav-copy">' + escapeHtml(item.copy) + '</span>' +
                  '</span>' +
                '</button>'
              ).join("") +
            '</div>' +
          '</section>';


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

        titleNode.textContent = config.title || "请确认操作";
        messageNode.textContent = config.message || "此操作会修改本地数据，请确认后继续。";
        impactNode.textContent = config.impact || "无";
        keywordWrap.style.display = config.keyword ? "block" : "none";
        keywordWrap.setAttribute("data-keyword", config.keyword || "");
        keywordInput.value = "";
        rememberInput.checked = false;
        rememberRow.style.display = config.allowRemember ? "flex" : "none";
        confirmProceed.textContent = config.confirmLabel || "确认执行";
        keywordInput.placeholder = config.keyword ? ("请输入“" + config.keyword + "”") : "请输入确认文字";
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
          "暂无摘要。";
        const candidateSummary = report.analysis?.candidateSummary || {};
        const executionSummary = summarizeCleanupResult(report);

        content.innerHTML =
          '<div class="dialog-head">' +
            '<div>' +
              '<p class="card-kicker">' + escapeHtml(typeLabel(report.type)) + "</p>" +
              '<h3 class="dialog-title">报告详情</h3>' +
            "</div>" +
            '<div class="inline-actions">' +
              '<button class="button-subtle" data-action="view-adjacent-report" data-direction="prev" ' + (prevReportId ? "" : "disabled") + ">上一条</button>" +
              '<button class="button-subtle" data-action="view-adjacent-report" data-direction="next" ' + (nextReportId ? "" : "disabled") + ">下一条</button>" +
              '<button class="button-subtle" data-action="export-report" data-report-id="' + escapeHtml(report.reportId) + '" data-format="json">导出 JSON</button>' +
              '<button class="button-subtle" data-action="export-report" data-report-id="' + escapeHtml(report.reportId) + '" data-format="md">导出 Markdown</button>' +
              '<button class="button-warn" data-action="close-report">关闭</button>' +
            "</div>" +
          "</div>" +
          '<div class="dialog-body">' +
            '<div class="report-grid summary-grid">' +
              '<div class="metric-card"><div class="metric-label">报告类型</div><div class="metric-value">' + escapeHtml(typeLabel(report.type)) + "</div></div>" +
              '<div class="metric-card"><div class="metric-label">创建时间</div><div class="metric-value">' + escapeHtml(formatDate(report.createdAt)) + "</div></div>" +
              '<div class="metric-card"><div class="metric-label">候选项 / 文件数</div><div class="metric-value">' + String(candidateSummary.totalCandidates || executionSummary.count || 0) + "</div></div>" +
              '<div class="metric-card"><div class="metric-label">空间收益</div><div class="metric-value">' + formatBytes(candidateSummary.reclaimableBytes || executionSummary.releasedBytes || 0) + "</div></div>" +
            "</div>" +
            '<div class="story-card"><h4 class="story-title">摘要</h4><p class="story-copy">' + escapeHtml(summaryText) + "</p></div>" +
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
              '<h3 class="dialog-title">计划详情</h3>' +
            "</div>" +
            '<div class="inline-actions">' +
              '<button class="button-secondary" data-action="run-user-schedule-now" data-schedule-id="' + escapeHtml(schedule.id) + '">立即执行</button>' +
              '<button class="button-subtle" data-action="edit-user-schedule" data-schedule-id="' + escapeHtml(schedule.id) + '">编辑</button>' +
              '<button class="button-warn" data-action="close-schedule">关闭</button>' +
            "</div>" +
          "</div>" +
          '<div class="dialog-body">' +
            '<div class="summary-grid">' +
              '<div class="metric-card"><div class="metric-label">计划名称</div><div class="metric-value">' + escapeHtml(schedule.name || "未命名计划") + "</div></div>" +
              '<div class="metric-card"><div class="metric-label">计划来源</div><div class="metric-value">' + escapeHtml(formatScheduleSource(schedule.source)) + "</div></div>" +
              '<div class="metric-card"><div class="metric-label">执行方式</div><div class="metric-value">' + escapeHtml(schedule.action === "auto-cleanup" ? "自动清理" : "仅扫描") + "</div></div>" +
              '<div class="metric-card"><div class="metric-label">执行频率</div><div class="metric-value">' + escapeHtml(formatIntervalMinutes(schedule.intervalMinutes)) + "</div></div>" +
            "</div>" +
            '<div class="story-card"><h4 class="story-title">运行信息</h4><p class="story-copy">下次执行：' + escapeHtml(formatDate(schedule.nextRunAt)) + '</p><p class="story-copy">上次执行：' + escapeHtml(formatDate(schedule.lastRunAt)) + '</p></div>' +
            '<div class="story-card"><h4 class="story-title">目录与参数</h4><p class="story-copy">扫描目录：' + escapeHtml(schedule.targets?.[0]?.path || "未设置") + '</p><p class="story-copy">清理模式：' + escapeHtml(schedule.cleanupMode || "quarantine") + '，最大处理项：' + String(schedule.maxItems || 0) + '</p></div>' +
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
            .filter((item) => reportMatchesRange(item) && reportMatchesType(item))
            .map((item) => item.reportId)
        );
        appState.selectedReports = appState.selectedReports.filter((reportId) => visible.has(reportId));
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
          showToast("warn", "没有可删除的报告", "请先选择至少一条报告。");
          return;
        }

        const summary = summarizeReportsByIds(uniqueIds);

        const result = await confirmAction({
          title: "确认删除报告",
          message: "删除后，报告文件和索引都会被移除。",
          impact: "本次将删除 " + summary.count + " 条报告，关联空间记录约 " + formatBytes(summary.reclaimableBytes) + "。",
          confirmLabel: "删除报告"
        });

        if (!result.confirmed) {
          showToast("warn", "已取消操作", "没有删除任何报告。");
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
        showToast("success", "报告已删除", "选中的报告已经移除。");
        logEvent("已删除报告", deleted, "success");
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
          list.innerHTML = '<div class="empty-card">当前没有日志记录。</div>';
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
            '<p class="log-copy">' + escapeHtml(entry.data ? JSON.stringify(entry.data, null, 2) : "无附加信息。") + "</p>" +
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
          reason: "LLM 未配置。"
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
            reason: "当前环境无法检查更新。",
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
        showToast("info", "已载入扫描目录", "外部路径已经准备好，可以直接开始扫描。");
      }

      async function loadQuarantine() {
        appState.quarantine.items = await requestJson("/api/quarantine");
        appState.quarantine.selectedIds = appState.quarantine.selectedIds.filter((id) => appState.quarantine.items.some((item) => item.id === id));
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
            logEvent("智能扫描已完成", {
              reportId: task.result?.reportId || null
            }, "success");
            showToast("success", "扫描完成", "已经为您整理好可清理空间与优先建议。");
          } else if (["cleanup", "duplicate-cleanup", "hotspot-cleanup"].includes(task.type)) {
            appState.home.cleanup = task.result;
            appState.home.status = "cleanComplete";
            appState.home.progress = 100;
            const summary = summarizeCleanupResult(task.result);
            logEvent("清理任务已完成", summary, "success");
            showToast("success", "清理完成", "本次共释放 " + formatBytes(summary.releasedBytes) + " 空间。");
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
          showToast("error", "任务失败", task.error?.message || task.message || "请稍后再试。");
          logEvent("后台任务失败", {
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
          showToast("warn", "任务已取消", "当前后台任务已经停止。");
          logEvent("已请求取消任务", { type: task.type }, "warn");
          renderApp();
        }
      }

      function startTaskPolling() {
        if (appState.activeTaskTimer) {
          window.clearInterval(appState.activeTaskTimer);
        }

        pollActiveTask().catch((error) => {
          showRequestErrorToast(error, "任务状态刷新失败");
        });

        appState.activeTaskTimer = window.setInterval(() => {
          pollActiveTask().catch((error) => {
            showRequestErrorToast(error, "任务状态刷新失败");
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
          await window.diskClawDesktop.notify("磁盘清理大虾", task.type === "plan" ? "扫描已经完成。" : "清理已经完成。");
        } catch {}
      }

      function switchView(view) {
        appState.currentView = view;
        writeLocalJson(STORAGE_KEYS.view, view);
        renderApp();
      }

      async function browseTarget() {
        if (!window.diskClawDesktop?.chooseFolder) {
          showToast("warn", "当前环境不支持", "浏览文件夹仅在桌面端可用。");
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

        logEvent("已更新扫描目录", { path: selectedPath }, "success");
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
          showToast("warn", "任务状态刷新失败", "当前后台任务状态无法刷新。");
          return;
        }

        const task = await requestJson("/api/tasks/agent/plan", {
          method: "POST",
          body: JSON.stringify(buildScanPayload())
        });

        appState.activeTaskId = task.taskId;
        appState.activeTaskType = task.type;
        appState.activeTaskTitle = "智能扫描中";
        appState.activeTask = task;
        appState.home.status = "scanning";
        appState.home.progress = 8;
        appState.home.scanStats = {
          scannedFiles: 0,
          candidateBytes: 0,
          currentPath: scanTarget
        };
        logEvent("已开始智能扫描", { path: scanTarget }, "info");
        renderApp();
        startTaskPolling();
      }

      async function startHomeCleanup() {
        const items = getOneClickCleanupItems(appState.home.plan);
        if (!items.length) {
          showToast("warn", "先选择扫描位置", "请先选择一个常用文件夹，再开始智能扫描。");
          return;
        }

        const totalBytes = items.reduce((sum, item) => sum + Number(item.sizeBytes || 0), 0);
        const result = await confirmAction({
          title: "确认开始一键清理",
          message: "系统会优先处理低风险项目，并先移动到隔离区。",
          impact: "本次将处理 " + items.length + " 个文件，预计释放 " + formatBytes(totalBytes) + " 空间。",
          confirmLabel: "开始清理"
        });

        if (!result.confirmed) {
          showToast("warn", "已取消操作", "本次清理没有开始。");
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
        appState.activeTaskTitle = "一键清理中";
        appState.activeTask = task;
        appState.home.status = "cleaning";
        appState.home.progress = 20;
        appState.home.cleanupStats = {
          completedItems: 0,
          totalItems: items.length,
          releasedBytes: 0,
          currentPath: ""
        };
        logEvent("已开始一键清理", { itemCount: items.length }, "info");
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
        logEvent("已请求暂停任务", { taskId: appState.activeTaskId }, "warn");
      }

      async function resumeTask() {
        if (!appState.activeTaskId) {
          return;
        }

        await requestJson("/api/tasks/" + encodeURIComponent(appState.activeTaskId) + "/resume", {
          method: "POST",
          body: JSON.stringify({})
        });
        logEvent("已请求继续任务", { taskId: appState.activeTaskId }, "info");
      }

      async function cancelTask() {
        if (!appState.activeTaskId) {
          return;
        }

        await requestJson("/api/tasks/" + encodeURIComponent(appState.activeTaskId) + "/cancel", {
          method: "POST",
          body: JSON.stringify({})
        });
        logEvent("已请求取消任务", { taskId: appState.activeTaskId }, "warn");
      }

      async function restoreQuarantineItems(items) {
        const result = await confirmAction({
          title: "确认恢复隔离文件",
          message: "恢复后，文件会回到原来的位置。",
          impact: "本次将恢复 " + items.length + " 个文件。",
          confirmLabel: "开始恢复"
        });

        if (!result.confirmed) {
          showToast("warn", "已取消操作", "没有恢复任何文件。");
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
        logEvent("已恢复隔离文件", { count: restored.results?.length || 0 }, "success");
        showToast("success", "恢复完成", "选中的文件已经恢复到原路径。");
      }

      async function deleteQuarantineItems(items, isClearAll = false) {
        const result = await confirmAction({
          title: isClearAll ? "确认清空隔离区" : "确认永久删除隔离文件",
          message: "此操作不可恢复，请确认后继续。",
          impact: isClearAll ? "将清空所有未恢复的隔离文件。" : "本次将永久删除 " + items.length + " 个文件。",
          confirmLabel: isClearAll ? "清空隔离区" : "永久删除"
        });

        if (!result.confirmed) {
          showToast("warn", "已取消操作", "没有删除任何隔离文件。");
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
        logEvent(isClearAll ? "已清空隔离区" : "已永久删除隔离文件", { count: items.length }, "success");
        showToast("success", isClearAll ? "隔离区已清空" : "删除完成", "所选文件已从隔离区永久移除。");
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

        showToast("success", "报告已导出", "文件已经导出到 " + exported.exportPath);
        logEvent("已导出报告", exported, "success");
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
        showToast("success", "基础设置已保存", "新的偏好设置已经生效。");
        logEvent("已保存基础设置", payload, "success");
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
        showToast("success", "AI 配置已保存", "新的 LLM 配置已经更新。");
        logEvent("已保存 LLM 配置", {
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
        showToast(result.ok ? "success" : "warn", "连接测试完成", result.ok ? "模型连接成功。" : "模型连接未成功。");
        logEvent("已测试 LLM 连接", result, result.ok ? "success" : "warn");
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
        showToast("success", "规则已保存", "扫描参数和路径规则已更新。");
        logEvent("已保存规则配置", appState.settings.rules, "success");
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
        showToast("success", "系统设置已保存", "窗口与系统偏好已经更新。");
        logEvent("已保存系统设置", {
          preferences,
          desktop: appState.settings.desktop
        }, "success");
        scheduleAutoUpdateCheck();
      }

      async function backupConfig() {
        const backup = await requestJson("/api/config/backup");
        downloadJsonFile("diskclaw-config-backup.json", backup);
        showToast("success", "配置已备份", "备份文件已经下载。");
        logEvent("已备份配置", backup, "success");
      }

      async function restoreConfig() {
        const result = await confirmAction({
          title: "确认恢复配置",
          message: "这会用备份覆盖当前设置。",
          impact: "建议先下载一份最新备份，再执行恢复。",
          confirmLabel: "恢复配置"
        });

        if (!result.confirmed) {
          showToast("warn", "已取消操作", "没有恢复任何配置。");
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
          showRequestErrorToast(error, "恢复配置失败");
          return null;
        });

        if (!payload) {
          showToast("warn", "未选择文件", "没有执行恢复。");
          return;
        }

        const restored = await requestJson("/api/config/restore", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        await Promise.allSettled([loadPreferences(), loadRules(), loadDesktopSettings(), loadLlmConfig(), loadSchedules()]);
        rerenderIfView("settings");
        showToast("success", "配置已恢复", "备份配置已应用。");
        logEvent("已恢复配置", restored, "success");
      }

      async function resetAllConfig() {
        const result = await confirmAction({
          title: "确认重置所有设置",
          message: "此操作会清除所有配置并恢复默认值。",
          impact: "包括 LLM、规则、计划任务和窗口设置。",
          confirmLabel: "重置所有设置"
        });

        if (!result.confirmed) {
          showToast("warn", "已取消操作", "没有重置任何设置。");
          return;
        }

        const reset = await requestJson("/api/config/reset-all", {
          method: "POST",
          body: JSON.stringify({})
        });

        await Promise.allSettled([loadPreferences(), loadRules(), loadDesktopSettings(), loadLlmConfig(), loadSchedules()]);
        appState.settings.scheduleEditor = null;
        rerenderIfView("settings");
        showToast("success", "已重置所有设置", "系统已经恢复为默认状态。");
        logEvent("已重置所有设置", reset, "success");
        scheduleAutoUpdateCheck();
      }

      async function checkUpdateNow() {
        const result = await checkForAppUpdate();
        if (result.ok) {
          showToast(result.updateAvailable ? "warn" : "success", "更新检查完成", formatUpdateState(result));
        } else {
          showToast("warn", "更新检查失败", result.reason || "无法检查更新。");
        }
      }

      async function openUpdateUrl() {
        const url = updateDownloadUrl();
        if (!url) {
          showToast("warn", "暂无下载链接", "请先完成更新检查。");
          return;
        }

        if (!window.diskClawDesktop?.openExternal) {
          showToast("warn", "当前环境不支持", "无法打开外部链接。");
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
        showToast("success", "自动计划已启动", "任务已经在后台开始执行。");
        logEvent("已手动触发计划任务", {
          scheduleId
        }, "success");
      }

      function viewUserSchedule(scheduleId) {
        const schedule = (appState.settings.schedules || []).find((item) => item.id === scheduleId) || null;
        if (!schedule) {
          showToast("warn", "计划不存在", "没有找到对应的用户计划。");
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
          showToast("warn", "计划不存在", "没有找到对应的用户计划。");
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
          showToast("warn", "当前环境不支持", "浏览文件夹仅在桌面端可用。");
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
        showToast("success", current.id ? "计划已更新" : "计划已创建", "用户自定义计划已经保存。");
        logEvent(current.id ? "已更新用户计划" : "已创建用户计划", {
          scheduleId: saved.id,
          name: saved.name
        }, "success");
      }

      async function deleteUserSchedule(scheduleId) {
        const schedule = (appState.settings.schedules || []).find((item) => item.id === scheduleId) || null;
        const result = await confirmAction({
          title: "确认删除用户计划",
          message: "删除后，此计划将不再自动执行。",
          impact: "计划名称：" + (schedule?.name || "未命名计划"),
          confirmLabel: "删除计划"
        });

        if (!result.confirmed) {
          showToast("warn", "已取消操作", "用户计划没有被删除。");
          return;
        }

        await requestJson("/api/schedules/" + encodeURIComponent(scheduleId), {
          method: "DELETE",
          body: JSON.stringify({})
        });
        await loadSchedules();
        closeScheduleDialog();
        rerenderIfView("settings");
        showToast("success", "计划已删除", "用户自定义计划已经移除。");
        logEvent("已删除用户计划", {
          scheduleId,
          name: schedule?.name || null
        }, "success");
      }

      function resetLocalUi() {
        window.localStorage.removeItem(STORAGE_KEYS.scanSettings);
        window.localStorage.removeItem(STORAGE_KEYS.view);
        appState.currentView = "home";
        appState.logsExpanded = false;
        showToast("success", "界面设置已重置", "本地扫描参数和界面状态已恢复默认。");
        logEvent("已重置本地界面设置", null, "success");
        renderApp();
      }

      function toggleDebugMode() {
        appState.debugMode = !appState.debugMode;
        writeLocalJson(STORAGE_KEYS.debugMode, appState.debugMode);
        showToast("info", appState.debugMode ? "调试模式已开启" : "调试模式已关闭", "当前仅影响界面级别的日志记录。");
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
            showToast("success", "数据已刷新", "页面展示的信息已经更新。");
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
            const activeItems = appState.quarantine.items.filter((item) => !item.restoredAt);
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
            showToast("success", "自动计划已刷新", "当前计划状态已经更新。");
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
            showToast("info", "已填充默认配置", "您可以按需修改后再保存。");
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
            showToast("info", "已恢复默认规则", "别忘了点击保存规则配置。");
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
              showToast("warn", "当前环境不支持", "系统通知仅在 Electron 桌面端可用。");
              return;
            }
            await window.diskClawDesktop.notify("磁盘清理大虾", "这是一条测试通知。");
            showToast("success", "通知已发送", "请检查系统通知区域。");
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
            root.getElementById("toggleLogExpand").textContent = appState.logsExpanded ? "收起" : "展开全部";
            renderLogsPanel();
            return;
          }

          if (action === "export-logs") {
            if (!appState.logs.length) {
              showToast("warn", "没有可导出的日志", "当前日志列表为空。");
              return;
            }
            const format = actionNode.getAttribute("data-format");
            const content = format === "txt"
              ? appState.logs.map((entry) => "[" + formatDate(entry.timeIso) + "] [" + entry.level + "] " + entry.message + (entry.data ? "\\n" + JSON.stringify(entry.data, null, 2) : "")).join("\\n\\n")
              : JSON.stringify(appState.logs, null, 2);
            exportTextFile(format === "txt" ? "diskclaw-log.txt" : "diskclaw-log.json", content, format === "txt" ? "text/plain" : "application/json");
            showToast("success", "日志已导出", "导出文件已经生成。");
            return;
          }

          if (action === "clear-logs") {
            const result = await confirmAction({
              title: "确认清空日志",
              message: "这会清空当前界面中的日志记录。",
              impact: "当前日志将全部清空。",
              confirmLabel: "清空日志"
            });
            if (!result.confirmed) {
              showToast("warn", "已取消操作", "日志没有被清空。");
              return;
            }
            appState.logs = [];
            renderLogsPanel();
            showToast("success", "日志已清空", "当前日志列表已经重置。");
            return;
          }

          if (action === "toggle-debug-mode") {
            toggleDebugMode();
            return;
          }

          if (action === "reset-local-ui") {
            const result = await confirmAction({
              title: "确认重置界面设置",
              message: "这会清空本地保存的扫描参数和当前视图。",
              impact: "不会影响已保存的 AI 配置、规则和历史数据。",
              confirmLabel: "立即重置"
            });
            if (!result.confirmed) {
              showToast("warn", "已取消操作", "本地界面设置保持不变。");
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
            showToast("info", "检查更新", "当前开发版暂未接入自动更新服务。");
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
              showToast("error", "确认失败", "请输入正确的确认文字后再继续。");
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
        logEvent("界面已初始化", null, "info");

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
            logEvent("初始化任务失败", {
              step: index,
              message: result.reason?.message || "未知错误"
            }, "error");
          }
        });

        renderApp();
        scheduleAutoUpdateCheck();
        checkForAppUpdate().catch(() => {});
      }

      initialize().catch((error) => {
        showRequestErrorToast(error, "初始化失败");
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
  <title>磁盘清理大虾</title>
  <style>${renderStyles()}</style>
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-badge"><img src="/electron/icon.png" alt="DiskClaw 图标"></div>
        <div>
          <h1 class="brand-title">磁盘清理大虾</h1>
          <p class="brand-copy">像专家一样找出空间黑洞，像助手一样安全完成清理。</p>
        </div>
      </div>
      <nav class="nav-list" id="sideNav"></nav>
      <div class="sidebar-footer">
        <div class="sidebar-version">
          <div>版本：v2.0 开发中</div>
          <div>本地优先、可恢复、带报告留痕。</div>
        </div>
        <button class="ghost-link" data-action="check-update">检查更新</button>
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
          <p class="card-kicker">操作确认</p>
          <h3 class="dialog-title" id="confirmTitle">请确认操作</h3>
        </div>
      </div>
      <div class="dialog-body">
        <p class="section-copy" id="confirmMessage">此操作会修改本地数据，请确认后继续。</p>
        <div class="story-card">
          <h4 class="story-title">影响范围</h4>
          <p class="story-copy" id="confirmImpact">无</p>
        </div>
        <label class="checkbox-row" id="confirmRememberRow" style="display:none;">
          <input id="confirmRemember" type="checkbox">
          <span>记住这次选择</span>
        </label>
        <div id="confirmKeywordWrap" data-keyword="" style="display:none;">
          <label class="label" for="confirmKeywordInput">请输入确认文字</label>
          <input id="confirmKeywordInput" placeholder="请输入确认文字">
        </div>
        <div class="button-row">
          <button class="button-subtle" data-action="confirm-cancel">取消</button>
          <button class="button-warn" data-action="confirm-proceed" id="confirmProceed">确认执行</button>
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



