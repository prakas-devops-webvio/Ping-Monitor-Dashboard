# 🖥 Ping Monitor Dashboard

A real-time, web-based network ping monitor that runs all 6 pings in a single browser window — powered by Node.js, WebSockets, and Docker.

> No more juggling multiple CMD windows. Open one tab and watch all your targets live.

![Dashboard Preview](https://img.shields.io/badge/status-active-22c55e?style=flat-square) ![Docker](https://img.shields.io/badge/docker-ready-2496ED?style=flat-square&logo=docker&logoColor=white) ![Node](https://img.shields.io/badge/node-20--alpine-339933?style=flat-square&logo=node.js&logoColor=white) ![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

---
## Screenshot

Web UI portal
<img width="1919" height="1075" alt="image" src="https://github.com/user-attachments/assets/359bb30e-e477-4a2e-b611-baaeb486a9a4" />

Command Line  
<img width="1266" height="787" alt="image" src="https://github.com/user-attachments/assets/7659a448-351f-4e0d-bb0b-c1c68d347e81" />


## ✨ Features

- 📡 **Live ping output** — WebSocket streams results in real time
- 🟢 **Status indicators** — Green (alive), Red (failing), Gray (connecting)
- 🪟 **Single browser window** — All 6 targets visible at once in a clean dashboard
- 📜 **Auto-scrolling logs** — Keeps the last 100 lines per panel, auto-scrolls to latest
- 🐳 **Docker-ready** — One command to build and run
- 🔄 **Auto-restart** — Container restarts automatically on system reboot

---

## 📁 Project Structure

```
ping-monitor/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── server.js
└── public/
    └── index.html
```

---

## 🚀 Quick Start

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed and running
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ping-monitor.git
cd ping-monitor
```

### 2. Configure your targets

Edit the `TARGETS` array in **both** `server.js` and `public/index.html`:

```javascript
const TARGETS = [
      { label: 'pfsense Gateway',    ip: '192.168.1.1' },
      { label: 'Google DNS',       ip: '8.8.8.8'     },
      { label: 'Cloudflare DNS',ip: '1.1.1.1'     },
      { label: 'p1 proxy',  ip: '54.144.16.194' },
      { label: 'p2 proxy',  ip: '54.198.49.157' },
      { label: 'p3 proxy',  ip: '18.209.166.130' },
      { label: 'p4 proxy',  ip: '52.91.215.81' },
];
```

### 3. Build and run

```bash
docker compose up --build
```

### 4. Open your browser

```
http://localhost:3000
```

That's it — all 6 pings are live in one window. ✅

---

## ⚙️ Configuration

| Setting | File | Description |
|---|---|---|
| Target IPs & labels | `server.js` + `public/index.html` | Edit the `TARGETS` array in both files |
| Port | `docker-compose.yml` | Change `3000:3000` to `YOUR_PORT:3000` |
| Ping interval | `server.js` | Change `-i 1` (seconds) in the `spawn` call |
| Max log lines | `public/index.html` | Change `100` in the `removeChild` condition |

---

## 🐳 Docker Details

The app runs on a lightweight `node:20-alpine` image with `iputils` installed to enable the `ping` command inside the container.

```yaml
# docker-compose.yml
cap_add:
  - NET_RAW        # Required for ping to work inside Linux containers
restart: unless-stopped
```

> ⚠️ The `NET_RAW` capability is required for `ping` to function inside a Docker container on Linux. This is safe for internal/trusted network environments.

---

## 🛠 Running Without Docker

If you prefer to run it directly with Node.js:

```bash
# Install dependencies
npm install

# Start the server
node server.js
```

Then open `http://localhost:3000` in your browser.

> **Windows users:** In `server.js`, replace `ping -i 1` with `ping -t` since Windows uses a different flag for continuous ping.

---

## 📸 Dashboard Preview

| Panel | Description |
|---|---|
| 🟢 Green dot | Host is responding |
| 🔴 Red dot | Timeout or unreachable |
| ⚫ Gray dot | Connecting / waiting for first response |

Each panel shows live scrolling output like a real terminal window, color-coded by status:

- **Green text** — successful replies with response time
- **Red text** — timeouts or host unreachable errors
- **Gray text** — info lines (startup, headers)

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + Express |
| Real-time | WebSockets (`ws` library) |
| Frontend | Vanilla HTML/CSS/JS |
| Container | Docker + Docker Compose |
| Base image | `node:20-alpine` + `iputils` |

---

## 🗺 Roadmap

- [ ] Configurable targets via UI (no code edit needed)
- [ ] Sound/browser alert on host failure
- [ ] Ping history graph per target
- [ ] Email/Slack notification on status change
- [ ] Export logs to CSV

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ for network engineers tired of juggling CMD windows.</p>
