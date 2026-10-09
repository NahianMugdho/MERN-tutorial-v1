// ===== পেজ লিস্ট: [ফাইল, আইকন, লেবেল] =====
const P=[['index','fa-home','ড্যাশবোর্ড'],['roadmap','fa-route','⭐ ইন্টারেক্টিভ রোডম্যাপ'],['setup','fa-cogs','১-২ সেটআপ ও স্ট্রাকচার'],['backend','fa-server','৩ ব্যাকেন্ড ভার্শন ১'],['backend-v2','fa-folder-tree','ব্যাকেন্ড ভার্শন ২ (প্রজেক্ট)'],['advanced','fa-shield-halved','অ্যাডভান্সড সিকিউরিটি'],['secure-project','fa-lock','সিকিউর মিনি প্রজেক্ট'],['connect','fa-plug','ফ্রন্টেন্ড ↔ ব্যাকেন্ড'],['frontend','fa-brands fa-react','৪-৫ ফ্রন্টেন্ড ও Firebase'],['jwt','fa-key','৬ JWT'],['deploy','fa-cloud-arrow-up','৭-৮ ডেপ্লয়'],['terminal','fa-terminal','টার্মিনাল সিমুলেটর'],['quiz','fa-list-check','কুইজ (২৫টি)'],['project','fa-code','ফুল প্রজেক্ট কোড']];
const cur=document.body.dataset.p,i=P.findIndex(p=>p[0]==cur);
// ফন্ট ও আইকন লাইব্রেরি
document.head.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Fira+Code&display=swap" rel="stylesheet">');
// ডার্ক/লাইট থিম (localStorage এ সেভ হয়)
const root=document.documentElement;
try{if(localStorage.theme=='dark'||(!('theme' in localStorage)&&matchMedia('(prefers-color-scheme: dark)').matches))root.classList.add('dark')}catch(e){}
// সাইডবার লেআউট তৈরি: main কে .col এর ভেতরে নেওয়া
const main=document.querySelector('main'),app=document.createElement('div'),col=document.createElement('div');
app.className='app';col.className='col';
app.innerHTML=`<aside id=sb><h1><i class="fa-brands fa-node-js"></i> MERN Guide</h1><nav>${P.map(p=>`<a href="${p[0]}.html" class="${p[0]==cur?'on':''}"><i class="${p[1].includes('brands')?p[1]:'fa-solid '+p[1]}"></i>${p[2]}</a>`).join('')}</nav><footer>Created for MERN Learners</footer></aside>`;
col.innerHTML='<div class=top><button id=ob>☰</button><b>MERN Complete Guide (বাংলা)</b><button id=th>🌙 / ☀️</button></div><div class=ban><b>MERN Stack — Complete Development Guide</b><div class=chips><span>React 18</span><span>Node.js/Express</span><span>MongoDB</span><span>Firebase</span></div></div>';
document.body.prepend(app);app.append(col);col.append(main);
document.getElementById('ob').onclick=()=>document.getElementById('sb').classList.toggle('open');
document.getElementById('th').onclick=()=>{root.classList.toggle('dark');try{localStorage.theme=root.classList.contains('dark')?'dark':'light'}catch(e){}};
// টোস্ট নোটিফিকেশন
document.body.insertAdjacentHTML('beforeend','<div id=toast>কপি হয়েছে!</div>');
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2500)}
// আগের/পরের পেজ বাটন
main.insertAdjacentHTML('beforeend',`<div class=pg><span>${i>0?`<a href="${P[i-1][0]}.html">← ${P[i-1][2]}</a>`:''}</span><span>${i<P.length-1?`<a href="${P[i+1][0]}.html">${P[i+1][2]} →</a>`:''}</span></div><footer>— Prepared for Mugdho | MERN Stack Complete Guide —</footer>`);
// কোড ব্লক: <script type="text/plain" data-f="ফাইলনাম"> থেকে dark code block বানায়
document.querySelectorAll('script[type="text/plain"]').forEach(s=>{
  const w=document.createElement('div'),pre=document.createElement('pre');
  if(s.dataset.f){const f=document.createElement('div');f.className='f';f.textContent=s.dataset.f;w.append(f)}
  pre.textContent=s.textContent.replace(/^\n/,'').trimEnd();
  const b=document.createElement('button');b.className='cp';b.textContent='Copy';
  b.onclick=()=>{navigator.clipboard.writeText(pre.textContent).catch(()=>{});toast('Code copied to clipboard!')};
  pre.prepend(b);w.append(pre);s.replaceWith(w)});
// ===== টার্মিনাল সিমুলেটর =====
function term(el){
  const T=(el.dataset.tasks||'').split('|').filter(Boolean),done=new Set(),H=[];let hi=0;
  const D=new Set(['/home']),F={};let cwd='/home';
  el.innerHTML='<div class=tk></div><div class=tb><i style=background:#ef4444></i><i style=background:#eab308></i><i style=background:#22c55e></i><span>bash — user@pc</span></div><div class=tm><div class=out></div><div class=ln><span class=ps></span><input spellcheck=false autocomplete=off></div></div>';
  const out=el.querySelector('.out'),inp=el.querySelector('input'),ps=el.querySelector('.ps'),tk=el.querySelector('.tk');
  const pr=()=>ps.textContent='user@pc:'+cwd.replace('/home','~')+'$';
  const say=(t,c)=>{const d=document.createElement('div');d.textContent=t;if(c)d.className=c;out.append(d);out.scrollTop=1e9};
  const rs=p=>{const r=[];(p[0]=='/'?p:cwd+'/'+p).split('/').forEach(x=>{if(x=='..')r.pop();else if(x&&x!='.')r.push(x)});return '/'+r.join('/')};
  const par=p=>p.replace(/\/[^/]*$/,'')||'/';
  const mkd=p=>{D.add(rs(p))},mkf=(p,c)=>{F[rs(p)]=c||''};
  const showT=()=>{tk.innerHTML='<b>টাস্ক (ক্লিক করলে কমান্ড বসবে):</b>';T.forEach(t=>{const d=document.createElement('div');d.className='t'+(done.has(t)?' ok':'');d.textContent=(done.has(t)?'✅ ':'⬜ ')+t;d.onclick=()=>{inp.value=t;inp.focus()};tk.append(d)})};
  const hasPkg=()=>(cwd+'/package.json') in F||(cwd=='/'?'':cwd)+'/package.json' in F;
  const npmErr=()=>say('npm ERR! package.json পাওয়া যায়নি! আগে প্রজেক্ট ফোল্ডারে cd করো বা npm init -y চালাও','er');
  function ex(n){
    const [a,...r]=n.split(' '),arg=r.join(' ');
    if(a=='help')say('কমান্ড: ls cd mkdir touch cat echo pwd clear node -v npm(create vite|init -y|install|run dev|run build) npx tailwindcss init -p vercel firebase');
    else if(a=='clear')out.innerHTML='';
    else if(a=='pwd')say(cwd);
    else if(a=='ls'){const t=arg?rs(arg):cwd,k=[];D.forEach(d=>{if(d!=t&&par(d)==t)k.push(d.split('/').pop()+'/')});Object.keys(F).forEach(f=>{if(par(f)==t)k.push(f.split('/').pop())});say(k.join('  ')||'(খালি)')}
    else if(a=='cd'){const t=!arg||arg=='~'?'/home':rs(arg);if(D.has(t))cwd=t;else say('cd: '+arg+': No such directory','er')}
    else if(a=='mkdir'){r.filter(x=>x[0]!='-').forEach(mkd)}
    else if(a=='touch')r.forEach(x=>mkf(x));
    else if(a=='cat'){const f=rs(arg);if(f in F)say(F[f]||'(খালি ফাইল)');else say('cat: '+arg+': No such file','er')}
    else if(a=='echo'){const m=arg.match(/^(.*?)\s*>\s*(\S+)$/);if(m)mkf(m[2],m[1]);else say(arg)}
    else if(n=='node -v')say('v20.11.0');else if(n=='npm -v')say('10.2.4');
    else if(a=='npm'&&r[0]=='create'){const nm=r[1+(r[1]&&r[1][0]=='-'?1:1)]||'my-project';mkd(nm);mkd(nm+'/src');mkf(nm+'/package.json','{ "name": "'+nm+'" }');mkf(nm+'/index.html');mkf(nm+'/vite.config.js');mkf(nm+'/src/App.jsx');mkf(nm+'/src/main.jsx');say('Scaffolding project in ./'+nm+' ... Done. এখন: cd '+nm,'ok')}
    else if(n=='npm init -y'){mkf('package.json','{ "name": "my-backend", "version": "1.0.0" }');say('Wrote to package.json','ok')}
    else if(a=='npm'&&(r[0]=='install'||r[0]=='i')){if(r.includes('-g'))say('added 1 package globally','ok');else if(!r[1]&&!hasPkg()||!hasPkg())npmErr();else say('added '+(12+r.length*17)+' packages in 3s','ok')}
    else if(a=='npm'&&r[0]=='run'){if(!hasPkg())npmErr();else if(r[1]=='dev'&&(cwd+'/index.js') in F)say('[nodemon] starting `node index.js`\nServer running on port 5000\nMongoDB Connected','ok');else if(r[1]=='dev')say('VITE ready — Local: http://localhost:5173/  (Ctrl+C দিয়ে বন্ধ)','ok');else if(r[1]=='build'){mkd('dist');say('✓ built in 2.1s → dist/ ফোল্ডার তৈরি হয়েছে','ok')}else say('Missing script: '+r[1],'er')}
    else if(n=='npx tailwindcss init -p'){mkf('tailwind.config.js');mkf('postcss.config.js');say('Created tailwind.config.js\nCreated postcss.config.js','ok')}
    else if(a=='vercel')say(r[0]=='login'?'Vercel লগইন সফল ✔':'🔗 Production: https://your-project.vercel.app ✔ (Env variable Dashboard এ দিতে ভুলো না)','ok');
    else if(a=='firebase'){const s=r.join(' ');say(s=='login'?'✔ Success! Logged in':s=='init hosting'?'Public directory? dist | SPA? Yes → firebase.json তৈরি':s.startsWith('deploy')?'✔ Deploy complete! Hosting URL: https://your-project.web.app':'firebase: অজানা সাব-কমান্ড','ok')}
    else if(a[0]!='#')say(a+': command not found (help লিখে দেখো)','er');
  }
  function run(c){
    say(ps.textContent+' '+c,'cm');c=c.trim();if(!c)return;H.push(c);hi=H.length;
    c.split('&&').map(x=>x.trim().replace(/\s+/g,' ')).forEach(p=>{ex(p);if(T.includes(p)){done.add(p)}});
    if(T.includes(c.replace(/\s+/g,' ')))done.add(c.replace(/\s+/g,' '));
    pr();showT();if(T.length&&done.size==T.length)say('🎉 সব টাস্ক শেষ! দারুণ!','ok')}
  inp.onkeydown=e=>{if(e.key=='Enter'){run(inp.value);inp.value=''}else if(e.key=='ArrowUp'&&hi>0)inp.value=H[--hi];else if(e.key=='ArrowDown')inp.value=H[++hi]||''};
  el.querySelector('.tm').onclick=()=>inp.focus();
  pr();showT();say('স্বাগতম! help লিখে কমান্ড দেখো।','ok');
}
document.querySelectorAll('.term').forEach(term);

// ===== শেয়ার্ড স্টেপ-অ্যানিমেশন: flow(id, [[লেবেল, ব্যাখ্যা], ...]) =====
function flow(id,S){const el=document.getElementById(id);let k=-1,tm=null;
  el.innerHTML='<div class=fl></div><div class="box s fx">▶ ধাপে ক্লিক করো বা "পরের ধাপ" চাপো</div><button class=fb data-d=-1>◀ আগে</button><button class=fb data-d=1>পরের ধাপ ▶</button><button class=fb data-a=1>▶▶ অটো প্লে</button>';
  const fl=el.querySelector('.fl'),fx=el.querySelector('.fx');
  S.forEach((s,n)=>fl.insertAdjacentHTML('beforeend',(n?'<span>→</span>':'')+'<div data-n='+n+'>'+s[0]+'</div>'));
  const go=n=>{k=(n+S.length)%S.length;fl.querySelectorAll('div').forEach((d,j)=>d.classList.toggle('on',j==k));fx.innerHTML=(k+1)+'/'+S.length+' — '+S[k][1]};
  fl.onclick=e=>{if(e.target.dataset.n)go(+e.target.dataset.n)};
  el.querySelectorAll('.fb').forEach(b=>b.onclick=()=>{if(b.dataset.a){if(tm){clearInterval(tm);tm=null;b.textContent='▶▶ অটো প্লে'}else{tm=setInterval(()=>go(k+1),2500);b.textContent='⏸ থামাও'}}else go(k+ +b.dataset.d)})}
