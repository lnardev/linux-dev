# 🖥️ root@vps — Manual de Autogestión de un VPS

> Página estática HTML autocontenida con +180 comandos de Linux para administrar tu propio servidor. Sin dependencias externas, sin build tools, sin frameworks.

## ¿Qué es esto?

Una **cheat-sheet interactiva** con todos los comandos de Linux que necesitás para administrar un VPS: sistema, archivos, red, firewall, servicios, Docker, Nginx y más. Diseñada para ser una referencia rápida — abrís el HTML en el browser y listo.

## 🚀 Cómo usarlo

1. Descargá o cloná el repositorio
2. Abrí `index.html` en cualquier navegador (doble clic o `file://`)
3. ¡Listo! No hay servidor, build, ni compilación

```
git clone <tu-repo>
cd linux-commands
start index.html    # Windows
open index.html     # macOS
xdg-open index.html # Linux
```

## ✨ Características

- **Búsqueda en tiempo real** — filtrá comandos escribiendo en la barra superior (o presioná `/`)
- **Copia con un clic** — cada comando tiene un botón "copiar" para pegarlo directo en la terminal
- **17 categorías** organizadas por tema
- **Sin dependencias** — todo el HTML, CSS y JS vive en un solo archivo
- **Tema terminal** — interfaz oscura con estética de terminal real
- **Navegación lateral** — TOC sticky con highlight por scroll
- **Warnings visuales** — comandos destructivos marcados en rojo con advertencias
- **Responsive** — funciona en desktop y mobile

## 📂 Estructura del proyecto

```
linux-commands/
├── index.html    ← Todo vive aquí: HTML + CSS + JS + datos
├── README.md
├── AGENTS.md
└── CLAUDE.md
```

**No hay nada más.** Un solo archivo autocontenido. Así de simple.

## 📋 Categorías

| # | Categoría | Descripción |
|---|-----------|-------------|
| 01 | Sistema e información | Kernel, distro, uptime, hardware |
| 02 | Archivos, directorios y permisos | Navegación del filesystem y control de acceso |
| 03 | Procesos y rendimiento | CPU, RAM, matar procesos colgados |
| 04 | Red y conectividad | Diagnóstico, puertos, DNS |
| 05 | Firewall (UFW) | Primera línea de defensa del VPS |
| 06 | SSH y acceso remoto | Endurecimiento y autenticación por llaves |
| 07 | Nginx | Servidor web / proxy reverso, SSL |
| 08 | Docker | Contenedores, compose, imágenes |
| 09 | Systemd (servicios) | Control de servicios, autoarranque |
| 10 | Logs y journalctl | Diagnóstico de fallas |
| 11 | Cron y tareas programadas | Automatización de backups y limpiezas |
| 12 | Gestión de paquetes | apt, dpkg, actualizaciones |
| 13 | Seguridad | fail2ban, hardening, auditorías |
| 14 | Backups y transferencia | rsync, dumps de BD, programación |
| 15 | Monitoreo y disco | Uso de disco, RAM, herramientas visuales |
| 16 | Bash y configuración de shell | Alias, variables, prompt, historial |
| 17 | PM2 (gestor de procesos Node.js) | Reinicios, cluster, logs de Node |

## 🛠️ Cómo editar / contribuir

Todo el contenido vive en el array `DATA` dentro del `<script>` de `index.html` (~línea 173).

Cada categoría tiene esta estructura:

```javascript
{
  id: "slug-unico",
  title: "Nombre de la categoría",
  desc: "Descripción breve de la categoría",
  items: [
    {
      cmd: "comando_ejemplo",
      desc: "Descripción del comando",
      flags: "<b>-f</b> fuerza la operación",  // opcional
      warn: "Cuidado con esto",                  // opcional
      danger: true                               // opcional - marca en rojo
    }
  ]
}
```

### Reglas al editar

- El contenido está en **español** — mantener consistencia
- **No escapar** `cmd` ni `desc` — el JS lo hace automáticamente con `escapeHtml`/`escapeAttr`
- Si agregás o quitás una categoría, **actualizá el número en el footer** (`17 categorías · ...`)
- Para que un comando sea buscable, incluí palabras clave en `desc` — el filtro busca en `cmd + desc`

## 🧪 Verificación

No hay tests ni build. Simplemente abrí `index.html` en el browser y verificá visualmente que todo se vea bien.

## Stack

- HTML5
- CSS custom (variables, grid, flexbox, backdrop-filter)
- Vanilla JavaScript (sin frameworks)
- Fuente: JetBrains Mono + IBM Plex Sans

## 📄 Licencia

Uso local. Generado como referencia personal.

---

*Hecho con ❤️ para la comunidad de auto-gestión de servidores.*
