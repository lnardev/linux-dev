function escapeHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function escapeAttr(s){return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;');}

// theme toggle (independiente de la carga de datos)
const themeToggle = document.getElementById('theme-toggle');
if(themeToggle){
  themeToggle.addEventListener('click', ()=>{
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try{ localStorage.setItem('theme', next); }catch(e){}
  });
}

async function init(){
  let DATA;
  try{
    const res = await fetch('./js/data.json');
    if(!res.ok) throw new Error('HTTP ' + res.status);
    DATA = await res.json();
  }catch(e){
    document.getElementById('content').innerHTML =
      '<div class="empty-state">⚠ No se pudo cargar <b>js/data.json</b> (' + escapeHtml(e.message) + ').' +
      '<br>Este sitio ahora se sirve por HTTP: corré <b>python -m http.server</b> en la carpeta del proyecto, o subilo a GitHub Pages.</div>';
    return;
  }

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
}

init();
