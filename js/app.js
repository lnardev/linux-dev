const DATA = [
{
  id:"sistema", title:"Sistema e información", desc:"Lo primero para saber en qué estado está el servidor: kernel, distro, uptime, hardware.",
  items:[
    {cmd:"uname -a", desc:"Muestra kernel, arquitectura y nombre de host del sistema."},
    {cmd:"lsb_release -a", desc:"Versión exacta de la distribución (Ubuntu/Debian)."},
    {cmd:"hostnamectl", desc:"Info del hostname, SO, kernel y virtualización en un solo lugar."},
    {cmd:"uptime", desc:"Tiempo encendido y carga promedio del sistema (load average)."},
    {cmd:"whoami", desc:"Usuario actual con el que estás logueado."},
    {cmd:"who", desc:"Usuarios conectados actualmente por SSH u otras sesiones."},
    {cmd:"last -a", desc:"Historial de inicios de sesión, útil para auditar accesos."},
    {cmd:"date", desc:"Fecha y hora del servidor; comparala con tu zona horaria."},
    {cmd:"timedatectl", desc:"Ver y configurar zona horaria y sincronización NTP."},
    {cmd:"reboot", desc:"Reinicia el servidor.", flags:"Requiere sudo. Corta todas las conexiones activas."},
    {cmd:"shutdown -h now", desc:"Apaga el servidor inmediatamente.", warn:"Irreversible sin acceso a la consola del proveedor."}
  ]
},
{
  id:"archivos", title:"Archivos, directorios y permisos", desc:"Navegación del filesystem y control de quién puede leer, escribir o ejecutar.",
  items:[
    {cmd:"ls -lah", desc:"Lista archivos con permisos, tamaño y ocultos, en formato legible."},
    {cmd:"cd /ruta", desc:"Cambia de directorio."},
    {cmd:"pwd", desc:"Muestra el directorio actual."},
    {cmd:"find / -name \"archivo\"", desc:"Busca un archivo por nombre en todo el sistema."},
    {cmd:"find . -mtime -1", desc:"Archivos modificados en las últimas 24 horas."},
    {cmd:"du -sh *", desc:"Tamaño de cada carpeta/archivo en el directorio actual."},
    {cmd:"df -h", desc:"Espacio usado y disponible por partición/disco."},
    {cmd:"lsblk", desc:"Lista discos y particiones del sistema en forma de árbol, con tamaños y puntos de montaje."},
    {cmd:"chmod 755 archivo", desc:"Cambia permisos: dueño rwx, grupo y otros r-x.", flags:"<b>r</b>=leer <b>w</b>=escribir <b>x</b>=ejecutar. 644 para archivos, 755 para carpetas/scripts."},
    {cmd:"chown usuario:grupo archivo", desc:"Cambia el propietario y grupo de un archivo o carpeta."},
    {cmd:"chown -R www-data:www-data /var/www", desc:"Cambia propietario recursivamente (típico para Nginx)."},
    {cmd:"tar -czvf backup.tar.gz carpeta/", desc:"Comprime una carpeta en un .tar.gz."},
    {cmd:"tar -xzvf backup.tar.gz", desc:"Descomprime un .tar.gz."},
    {cmd:"cp -r origen/ destino/", desc:"Copia carpetas de forma recursiva."},
    {cmd:"rsync -avz origen/ destino/", desc:"Sincroniza archivos de forma incremental, ideal para backups."},
    {cmd:"ln -s /ruta/real /ruta/link", desc:"Crea un enlace simbólico (symlink)."},
    {cmd:"rm -rf carpeta/", desc:"Elimina una carpeta y su contenido sin confirmación.", danger:true, warn:"No hay papelera de reciclaje. Verificá la ruta dos veces."}
  ]
},
{
  id:"procesos", title:"Procesos y rendimiento", desc:"Ver qué está consumiendo CPU/RAM y matar procesos colgados.",
  items:[
    {cmd:"top", desc:"Monitor interactivo de procesos, CPU y memoria en tiempo real."},
    {cmd:"htop", desc:"Versión mejorada de top con interfaz a color.", flags:"Instalar con: <b>sudo apt install htop</b>"},
    {cmd:"ps aux", desc:"Lista todos los procesos corriendo con su PID y consumo."},
    {cmd:"ps aux | grep nginx", desc:"Filtra procesos por nombre, útil para encontrar un PID puntual."},
    {cmd:"kill -9 PID", desc:"Fuerza el cierre de un proceso por su PID.", warn:"No guarda estado; usar SIGTERM (kill sin -9) primero si es posible."},
    {cmd:"pkill -f nombre_proceso", desc:"Mata todos los procesos que coincidan con un nombre."},
    {cmd:"free -h", desc:"Memoria RAM y swap usada/disponible en formato legible."},
    {cmd:"nproc", desc:"Cantidad de núcleos de CPU disponibles."},
    {cmd:"iostat -x 2", desc:"Uso de disco (I/O) actualizado cada 2 segundos."},
    {cmd:"nice -n 10 comando", desc:"Ejecuta un comando con menor prioridad de CPU."},
    {cmd:"nohup comando &", desc:"Ejecuta un proceso en segundo plano que sobrevive al cerrar la sesión SSH."},
    {cmd:"iotop", desc:"Muestra qué proceso está generando más I/O de disco en tiempo real.", flags:"Instalar con: <b>sudo apt install iotop</b>. Requiere sudo para ver todos los procesos."},
    {cmd:"renice -n 5 -p PID", desc:"Cambia la prioridad de un proceso que ya está corriendo, sin reiniciarlo."}
  ]
},
{
  id:"red", title:"Red y conectividad", desc:"Diagnóstico de red, puertos abiertos y quién está conectado a qué.",
  items:[
    {cmd:"ip a", desc:"Muestra las interfaces de red y sus direcciones IP."},
    {cmd:"ss -tulpn", desc:"Puertos abiertos (TCP/UDP) y qué proceso los está usando.", flags:"Reemplaza al viejo <b>netstat</b>."},
    {cmd:"curl -I https://tudominio.com", desc:"Verifica que un sitio responda y ver sus headers HTTP."},
    {cmd:"ping -c 4 8.8.8.8", desc:"Prueba conectividad hacia una IP, 4 paquetes."},
    {cmd:"traceroute dominio.com", desc:"Muestra la ruta de saltos hasta un destino."},
    {cmd:"dig dominio.com", desc:"Consulta registros DNS de un dominio."},
    {cmd:"nslookup dominio.com", desc:"Alternativa simple para resolver un dominio a IP."},
    {cmd:"wget https://url/archivo", desc:"Descarga un archivo directo desde una URL."},
    {cmd:"scp archivo usuario@ip:/ruta", desc:"Copia un archivo a otro servidor por SSH."},
    {cmd:"nc -zv ip puerto", desc:"Verifica si un puerto específico está abierto (netcat)."}
  ]
},
{
  id:"ufw", title:"Firewall (UFW)", desc:"Uncomplicated Firewall: la primera línea de defensa del VPS. Configuralo antes de exponer cualquier servicio.",
  items:[
    {cmd:"sudo ufw status verbose", desc:"Ver el estado del firewall y las reglas activas."},
    {cmd:"sudo ufw enable", desc:"Activa el firewall.", warn:"Asegurate de permitir el puerto SSH ANTES de activar, o te quedás afuera."},
    {cmd:"sudo ufw disable", desc:"Desactiva el firewall por completo."},
    {cmd:"sudo ufw allow 22/tcp", desc:"Permite el puerto SSH (cambialo si usás uno custom)."},
    {cmd:"sudo ufw allow OpenSSH", desc:"Igual que arriba pero usando el perfil registrado por OpenSSH."},
    {cmd:"sudo ufw allow 80,443/tcp", desc:"Permite tráfico HTTP y HTTPS para Nginx."},
    {cmd:"sudo ufw allow from 190.1.2.3", desc:"Permite acceso solo desde una IP específica (útil para admin panels)."},
    {cmd:"sudo ufw deny 3306", desc:"Bloquea explícitamente un puerto, por ejemplo MySQL hacia afuera."},
    {cmd:"sudo ufw delete allow 8080", desc:"Elimina una regla previamente creada."},
    {cmd:"sudo ufw app list", desc:"Lista perfiles de aplicaciones ya registrados (Nginx Full, OpenSSH, etc)."},
    {cmd:"sudo ufw logging on", desc:"Activa el registro de conexiones bloqueadas en /var/log/ufw.log."}
  ]
},
{
  id:"ssh", title:"SSH y acceso remoto", desc:"Endurecer el acceso remoto es el paso de seguridad más importante en un VPS.",
  items:[
    {cmd:"ssh usuario@ip -p 22", desc:"Conexión básica por SSH a un servidor."},
    {cmd:"ssh-keygen -t ed25519 -C \"mail@ejemplo.com\"", desc:"Genera un par de llaves SSH modernas (más seguras que RSA)."},
    {cmd:"ssh-copy-id usuario@ip", desc:"Copia tu llave pública al servidor para login sin contraseña."},
    {cmd:"sudo nano /etc/ssh/sshd_config", desc:"Archivo de configuración principal del servidor SSH."},
    {cmd:"PermitRootLogin no", desc:"Directiva dentro de sshd_config: desactiva el login directo como root."},
    {cmd:"PasswordAuthentication no", desc:"Directiva: obliga a usar solo llaves SSH, no contraseñas."},
    {cmd:"sudo systemctl restart ssh", desc:"Reinicia el servicio SSH tras editar la configuración."},
    {cmd:"sudo adduser nuevo_usuario", desc:"Crea un usuario nuevo (mejor que operar siempre como root)."},
    {cmd:"sudo usermod -aG sudo nuevo_usuario", desc:"Le da permisos de sudo a ese usuario."},
    {cmd:"sudo usermod -aG docker nuevo_usuario", desc:"Permite ejecutar Docker sin anteponer sudo."}
  ]
},
{
  id:"nginx", title:"Nginx", desc:"Servidor web / proxy reverso: control del servicio, sitios virtuales y certificados.",
  items:[
    {cmd:"sudo systemctl status nginx", desc:"Estado actual del servicio Nginx."},
    {cmd:"sudo systemctl reload nginx", desc:"Recarga la configuración sin cortar conexiones activas."},
    {cmd:"sudo systemctl restart nginx", desc:"Reinicia el servicio completo (corta conexiones brevemente)."},
    {cmd:"sudo nginx -t", desc:"Valida la sintaxis de la configuración antes de aplicarla.", flags:"Corré esto SIEMPRE antes de reload/restart."},
    {cmd:"sudo nano /etc/nginx/sites-available/midominio", desc:"Archivo de configuración de un sitio virtual."},
    {cmd:"sudo ln -s /etc/nginx/sites-available/midominio /etc/nginx/sites-enabled/", desc:"Habilita el sitio creando el symlink correspondiente."},
    {cmd:"sudo rm /etc/nginx/sites-enabled/default", desc:"Elimina el sitio de bienvenida por defecto."},
    {cmd:"tail -f /var/log/nginx/access.log", desc:"Sigue en vivo las peticiones entrantes al servidor."},
    {cmd:"tail -f /var/log/nginx/error.log", desc:"Sigue en vivo los errores de Nginx (500, config, etc)."},
    {cmd:"sudo certbot --nginx -d midominio.com", desc:"Obtiene e instala un certificado SSL gratuito con Let's Encrypt."},
    {cmd:"sudo certbot renew --dry-run", desc:"Simula la renovación automática de certificados SSL."}
  ]
},
{
  id:"docker", title:"Docker", desc:"Contenedores para desplegar tus apps de forma aislada y reproducible.",
  items:[
    {cmd:"docker ps", desc:"Lista los contenedores en ejecución."},
    {cmd:"docker ps -a", desc:"Lista TODOS los contenedores, incluidos los detenidos."},
    {cmd:"docker images", desc:"Lista las imágenes descargadas localmente."},
    {cmd:"docker run -d -p 8080:80 --name web nginx", desc:"Corre un contenedor en segundo plano mapeando puertos."},
    {cmd:"docker stop nombre_contenedor", desc:"Detiene un contenedor en ejecución."},
    {cmd:"docker start nombre_contenedor", desc:"Vuelve a iniciar un contenedor detenido."},
    {cmd:"docker restart nombre_contenedor", desc:"Reinicia un contenedor."},
    {cmd:"docker logs -f nombre_contenedor", desc:"Sigue en vivo los logs de un contenedor."},
    {cmd:"docker exec -it nombre_contenedor bash", desc:"Abre una shell interactiva dentro del contenedor."},
    {cmd:"docker rm nombre_contenedor", desc:"Elimina un contenedor detenido."},
    {cmd:"docker rmi imagen", desc:"Elimina una imagen local."},
    {cmd:"docker system prune -a", desc:"Limpia contenedores, imágenes y redes sin usar.", warn:"Elimina TODO lo que no esté corriendo activamente. Revisar antes de correr."},
    {cmd:"docker build -t miapp .", desc:"Construye una imagen a partir del Dockerfile en el directorio actual."},
    {cmd:"docker compose up -d", desc:"Levanta todos los servicios definidos en docker-compose.yml."},
    {cmd:"docker compose down", desc:"Detiene y elimina los contenedores del compose."},
    {cmd:"docker compose logs -f servicio", desc:"Sigue los logs de un servicio específico del compose."},
    {cmd:"docker stats", desc:"Uso de CPU/RAM en tiempo real de cada contenedor."}
  ]
},
{
  id:"systemd", title:"Systemd (servicios)", desc:"Cómo controlar cualquier servicio del sistema: arrancar, detener, dejar autoarranque en boot.",
  items:[
    {cmd:"sudo systemctl status servicio", desc:"Estado actual de un servicio (activo, fallido, detenido)."},
    {cmd:"sudo systemctl start servicio", desc:"Inicia un servicio."},
    {cmd:"sudo systemctl stop servicio", desc:"Detiene un servicio."},
    {cmd:"sudo systemctl restart servicio", desc:"Reinicia un servicio."},
    {cmd:"sudo systemctl enable servicio", desc:"Hace que el servicio arranque automáticamente al reiniciar el VPS."},
    {cmd:"sudo systemctl disable servicio", desc:"Quita el arranque automático."},
    {cmd:"sudo systemctl list-units --type=service", desc:"Lista todos los servicios activos en el sistema."},
    {cmd:"sudo nano /etc/systemd/system/miapp.service", desc:"Crea una unidad systemd propia para tu app (útil para FastAPI/Node sin PM2)."},
    {cmd:"sudo systemctl daemon-reload", desc:"Recarga systemd tras crear o editar un archivo .service."},
    {cmd:"sudo systemctl list-timers", desc:"Lista los temporizadores (timers) activos: la alternativa moderna a cron basada en systemd."},
    {cmd:"sudo systemctl cat servicio", desc:"Muestra el contenido completo del archivo unit de un servicio, incluidos overrides."},
    {cmd:"sudo systemctl edit servicio", desc:"Crea un archivo de override para modificar un servicio sin tocar el unit original."}
  ]
},
{
  id:"logs", title:"Logs y journalctl", desc:"Diagnóstico de fallas: dónde mirar cuando algo no funciona.",
  items:[
    {cmd:"journalctl -u nombre_servicio -f", desc:"Sigue en vivo los logs de un servicio systemd puntual."},
    {cmd:"journalctl -xe", desc:"Últimos logs del sistema con contexto extendido, ideal tras un fallo."},
    {cmd:"journalctl --since \"1 hour ago\"", desc:"Filtra logs por ventana de tiempo relativa."},
    {cmd:"journalctl -b", desc:"Logs desde el último arranque del sistema."},
    {cmd:"tail -f /var/log/syslog", desc:"Sigue en vivo el log general del sistema (Debian/Ubuntu)."},
    {cmd:"tail -n 100 /var/log/auth.log", desc:"Últimas 100 líneas de intentos de autenticación (SSH, sudo)."},
    {cmd:"grep \"Failed password\" /var/log/auth.log", desc:"Filtra intentos fallidos de login, útil para detectar ataques de fuerza bruta."},
    {cmd:"sudo logrotate -f /etc/logrotate.conf", desc:"Fuerza la rotación de logs para liberar espacio en disco."}
  ]
},
{
  id:"cron", title:"Cron y tareas programadas", desc:"Automatizar backups, renovaciones y limpiezas periódicas.",
  items:[
    {cmd:"crontab -e", desc:"Edita las tareas programadas del usuario actual."},
    {cmd:"crontab -l", desc:"Lista las tareas cron configuradas."},
    {cmd:"0 3 * * * /ruta/backup.sh", desc:"Ejemplo de línea cron: corre un script todos los días a las 3am.", flags:"formato: <b>min hora día mes día-semana</b> comando"},
    {cmd:"*/15 * * * * comando", desc:"Ejecuta un comando cada 15 minutos."},
    {cmd:"sudo systemctl status cron", desc:"Verifica que el servicio cron esté activo."},
    {cmd:"sudo nano /etc/cron.d/tarea", desc:"Alternativa: definir un cron a nivel sistema con usuario explícito."}
  ]
},
{
  id:"paquetes", title:"Gestión de paquetes", desc:"Instalar, actualizar y limpiar software del sistema (Debian/Ubuntu).",
  items:[
    {cmd:"sudo apt update", desc:"Actualiza el índice de paquetes disponibles.", flags:"Correr siempre antes de <b>upgrade</b> o <b>install</b>."},
    {cmd:"sudo apt upgrade", desc:"Actualiza los paquetes instalados a su última versión."},
    {cmd:"sudo apt full-upgrade", desc:"Como upgrade, pero permite instalar/quitar dependencias si hace falta."},
    {cmd:"sudo apt install paquete", desc:"Instala un paquete nuevo."},
    {cmd:"sudo apt remove paquete", desc:"Desinstala un paquete (deja configuración residual)."},
    {cmd:"sudo apt purge paquete", desc:"Desinstala un paquete y su configuración por completo."},
    {cmd:"sudo apt autoremove", desc:"Elimina dependencias huérfanas que ya no usa ningún paquete."},
    {cmd:"apt list --installed", desc:"Lista todos los paquetes instalados en el sistema."},
    {cmd:"dpkg -l | grep nombre", desc:"Busca si un paquete específico está instalado."},
    {cmd:"sudo unattended-upgrades --dry-run", desc:"Simula las actualizaciones de seguridad automáticas configuradas."}
  ]
},
{
  id:"seguridad", title:"Seguridad", desc:"Hardening básico obligatorio en cualquier VPS expuesto a internet.",
  items:[
    {cmd:"sudo apt install fail2ban", desc:"Instala fail2ban: banea IPs tras varios intentos fallidos de login."},
    {cmd:"sudo systemctl status fail2ban", desc:"Verifica que fail2ban esté activo."},
    {cmd:"sudo fail2ban-client status sshd", desc:"Ver IPs baneadas actualmente para el jail de SSH."},
    {cmd:"sudo fail2ban-client set sshd unbanip IP", desc:"Desbanea manualmente una IP."},
    {cmd:"sudo nano /etc/fail2ban/jail.local", desc:"Archivo de configuración local de fail2ban (no tocar jail.conf directo)."},
    {cmd:"sudo passwd -l root", desc:"Bloquea el login directo con contraseña del usuario root."},
    {cmd:"sudo apt install unattended-upgrades", desc:"Habilita actualizaciones de seguridad automáticas."},
    {cmd:"sudo lynis audit system", desc:"Corre una auditoría de seguridad completa del servidor."},
    {cmd:"sudo ss -tulpn | grep LISTEN", desc:"Revisa qué puertos están escuchando; cerrá los que no uses."}
  ]
},
{
  id:"backups", title:"Backups y transferencia", desc:"Nunca confíes solo en el proveedor del VPS: automatizá tus propias copias.",
  items:[
    {cmd:"rsync -avz -e ssh /ruta/local usuario@ip:/ruta/remota", desc:"Sincroniza una carpeta local hacia un servidor remoto por SSH."},
    {cmd:"mysqldump -u usuario -p basededatos > backup.sql", desc:"Exporta una base de datos MySQL/MariaDB a un archivo .sql."},
    {cmd:"mysql -u usuario -p basededatos < backup.sql", desc:"Restaura una base de datos desde un archivo .sql."},
    {cmd:"pg_dump -U usuario basededatos > backup.sql", desc:"Exporta una base de datos PostgreSQL."},
    {cmd:"scp backup.tar.gz usuario@ip:/ruta/", desc:"Copia un archivo de backup hacia otro servidor."},
    {cmd:"crontab -e  →  0 2 * * * /ruta/backup.sh", desc:"Programa un backup automático diario a las 2am."}
  ]
},
{
  id:"monitoreo", title:"Monitoreo y disco", desc:"Vigilar el estado del servidor antes de que un problema se vuelva downtime.",
  items:[
    {cmd:"df -h", desc:"Espacio en disco por partición, en formato legible."},
    {cmd:"du -sh /var/log/*", desc:"Encuentra qué logs están ocupando más espacio."},
    {cmd:"free -h", desc:"RAM y swap disponible."},
    {cmd:"vmstat 2 5", desc:"Estadísticas de memoria, CPU e I/O cada 2 segundos, 5 veces."},
    {cmd:"watch -n 2 docker stats --no-stream", desc:"Refresca cada 2 segundos el consumo de contenedores Docker."},
    {cmd:"sudo apt install netdata", desc:"Dashboard web de monitoreo en tiempo real, liviano de instalar."},
    {cmd:"uptime", desc:"Load average: si supera la cantidad de núcleos de forma sostenida, hay cuello de botella."},
    {cmd:"ncdu /ruta", desc:"Analizador de espacio en disco interactivo y visual, más rápido de navegar que du.", flags:"Instalar con: <b>sudo apt install ncdu</b>."},
    {cmd:"iftop", desc:"Monitor de ancho de banda en tiempo real por conexión activa.", flags:"Instalar con: <b>sudo apt install iftop</b>. Requiere sudo."}
  ]
},
{
  id:"bash", title:"Bash y configuración de shell", desc:"Personalizá tu terminal: alias, variables de entorno, historial y el prompt son las primeras ganancias de productividad en un VPS.",
  items:[
    {cmd:"cat ~/.bashrc", desc:"Archivo de configuración de bash para el usuario actual: alias, funciones y variables de entorno."},
    {cmd:"nano ~/.bashrc", desc:"Edita la configuración de bash del usuario."},
    {cmd:"source ~/.bashrc", desc:"Recarga la configuración de bash en la sesión actual sin cerrar sesión."},
    {cmd:"alias ll='ls -lah'", desc:"Crea un atajo para un comando largo.", flags:"Agregalo al final de <b>~/.bashrc</b> para que persista entre sesiones."},
    {cmd:"unalias ll", desc:"Elimina un alias definido previamente en la sesión actual."},
    {cmd:"export PATH=$PATH:/ruta/nueva", desc:"Agrega un directorio al PATH para ejecutar binarios sin escribir la ruta completa."},
    {cmd:"export EDITOR=nano", desc:"Define el editor por defecto usado por comandos como crontab -e o visudo."},
    {cmd:"history", desc:"Muestra el historial de comandos ejecutados en la sesión."},
    {cmd:"HISTSIZE=5000 HISTFILESIZE=10000", desc:"Variables en .bashrc que controlan cuántos comandos se guardan en memoria y en disco."},
    {cmd:"cat ~/.bash_profile", desc:"Se ejecuta solo en shells de login (ej. al conectarte por SSH), a diferencia de .bashrc que corre en shells interactivas no-login.", flags:"En Debian/Ubuntu normalmente <b>~/.profile</b> hace <b>source</b> de .bashrc automáticamente."},
    {cmd:"echo $PS1", desc:"Muestra el formato actual del prompt (usuario@host:ruta$)."},
    {cmd:"type comando", desc:"Muestra si un comando es un alias, función, builtin o binario, y de dónde viene.", flags:"Útil para depurar por qué un alias no se aplica como esperás."},
    {cmd:"which comando", desc:"Muestra la ruta absoluta del binario que se ejecutaría."},
    {cmd:"chsh -s /bin/bash usuario", desc:"Cambia la shell por defecto de un usuario (ej. de sh a bash o zsh)."},
    {cmd:"cat /etc/environment", desc:"Variables de entorno globales para todos los usuarios del sistema, sin depender de un shell interactivo."}
  ]
}
,{
  id:"pm2", title:"PM2 (gestor de procesos Node.js)", desc:"Alternativa a systemd para apps Node.js: reinicios automáticos, modo cluster y logs centralizados sin escribir un .service a mano.",
  items:[
    {cmd:"npm install -g pm2", desc:"Instala PM2 globalmente en el sistema."},
    {cmd:"pm2 start app.js --name \"miapp\"", desc:"Inicia una app Node.js con PM2 y le asigna un nombre identificable."},
    {cmd:"pm2 list", desc:"Lista todas las apps gestionadas por PM2 con su estado, PID y consumo."},
    {cmd:"pm2 stop miapp", desc:"Detiene una app sin eliminarla del listado de PM2."},
    {cmd:"pm2 restart miapp", desc:"Reinicia una app, típico después de hacer un deploy."},
    {cmd:"pm2 reload miapp", desc:"Recarga la app sin downtime.", flags:"Solo funciona en <b>modo cluster</b> (-i)."},
    {cmd:"pm2 delete miapp", desc:"Elimina una app del listado de PM2 (no borra el código)."},
    {cmd:"pm2 logs miapp", desc:"Sigue en vivo los logs (stdout/stderr) de una app puntual."},
    {cmd:"pm2 monit", desc:"Monitor interactivo de CPU y memoria por cada proceso gestionado."},
    {cmd:"pm2 describe miapp", desc:"Info detallada de un proceso: memoria, uptime, cantidad de reinicios."},
    {cmd:"pm2 start app.js -i max", desc:"Levanta la app en modo cluster usando todos los núcleos de CPU disponibles."},
    {cmd:"pm2 save", desc:"Guarda la lista actual de procesos para poder restaurarla tras un reinicio del VPS."},
    {cmd:"pm2 startup", desc:"Genera el comando systemd necesario para que PM2 arranque automáticamente al bootear.", flags:"Copiá y corré el comando que imprime, con <b>sudo</b>."},
    {cmd:"pm2 resurrect", desc:"Restaura los procesos guardados previamente con pm2 save."},
    {cmd:"pm2 flush", desc:"Limpia todos los logs acumulados de PM2."},
    {cmd:"pm2 delete all", desc:"Elimina TODAS las apps gestionadas por PM2.", danger:true, warn:"Corta todos los procesos Node en producción. Verificá dos veces antes de correrlo."}
  ]
}
];

const toc = document.getElementById('toc');
const content = document.getElementById('content');

DATA.forEach((cat, i)=>{
  const a = document.createElement('a');
  a.href = '#'+cat.id;
  a.innerHTML = `<span class="n">${String(i+1).padStart(2,'0')}</span> ${cat.title}`;
  a.dataset.target = cat.id;
  toc.appendChild(a);

  const sec = document.createElement('section');
  sec.className = 'cat';
  sec.id = cat.id;
  sec.innerHTML = `
    <div class="cat-head"><span class="cat-num">${String(i+1).padStart(2,'0')}</span><h2>${cat.title}</h2></div>
    <p class="cat-desc">${cat.desc}</p>
    <div class="grid"></div>
  `;
  const grid = sec.querySelector('.grid');
  cat.items.forEach(item=>{
    const card = document.createElement('div');
    card.className = 'card' + (item.danger ? ' danger' : '');
    card.dataset.search = (item.cmd + ' ' + item.desc).toLowerCase();
    card.innerHTML = `
      <div class="cmdline">
        <span class="prompt">$</span>
        <code>${escapeHtml(item.cmd)}</code>
        <button class="copybtn" data-cmd="${escapeAttr(item.cmd)}">copiar</button>
      </div>
      <p>${item.desc}</p>
      ${item.flags ? `<div class="flags">${item.flags}</div>` : ''}
      ${item.warn ? `<div class="warn">⚠ ${item.warn}</div>` : ''}
    `;
    grid.appendChild(card);
  });
  content.appendChild(sec);
});

function escapeHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function escapeAttr(s){return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;');}

// copy to clipboard
content.addEventListener('click', e=>{
  const btn = e.target.closest('.copybtn');
  if(!btn) return;
  const text = btn.getAttribute('data-cmd');
  navigator.clipboard.writeText(text).then(()=>{
    const original = btn.textContent;
    btn.textContent = '✓ copiado';
    btn.classList.add('copied');
    setTimeout(()=>{ btn.textContent = original; btn.classList.remove('copied'); }, 1400);
  });
});

// search filter
const search = document.getElementById('search');
search.addEventListener('input', ()=>{
  const q = search.value.trim().toLowerCase();
  document.querySelectorAll('section.cat').forEach(sec=>{
    let visibleCount = 0;
    sec.querySelectorAll('.card').forEach(card=>{
      const match = !q || card.dataset.search.includes(q);
      card.classList.toggle('filtered-hide', !match);
      if(match) visibleCount++;
    });
    sec.classList.toggle('filtered-hide', visibleCount===0);
  });
});
document.addEventListener('keydown', e=>{
  if(e.key === '/' && document.activeElement !== search){ e.preventDefault(); search.focus(); }
});

// active toc highlight on scroll
const sections = document.querySelectorAll('section.cat');
const tocLinks = toc.querySelectorAll('a');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      tocLinks.forEach(l=>l.classList.remove('active'));
      const link = toc.querySelector(`a[data-target="${entry.target.id}"]`);
      if(link) link.classList.add('active');
    }
  });
}, {rootMargin:'-20% 0px -70% 0px'});
sections.forEach(s=>obs.observe(s));