function newsCard(n){
  return `<a class="card" href="#" onclick="openNews(${n.id});return false"><img loading="lazy" src="${img(n.img,540,304)}" alt="${n.title}"><h3>${n.title}</h3><small>${n.date}</small></a>`;
}

function darkModeButton(){
  return `<button class="theme-toggle theme-toggle-footer" type="button" aria-label="Toggle dark mode" title="Toggle dark mode" aria-pressed="false" onclick="toggleDarkMode()"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 18h6m-5 3h4m-7-7a7 7 0 1 1 10 0c-1.2 1.1-1.8 2.1-2 4h-6c-.2-1.9-.8-2.9-2-4Z"/></svg></button>`;
}

function showLoadingScreen(){
  const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  try{
    if(sessionStorage.getItem("iu-baseball-loader-seen")==="true")return async()=>{};
    sessionStorage.setItem("iu-baseball-loader-seen","true");
  }catch(error){
    console.warn("Could not save loading-screen settings.",error);
  }
  const startedAt=performance.now();
  const screen=document.createElement("div");
  screen.className="loading-screen";
  screen.setAttribute("role","status");
  screen.setAttribute("aria-label","Loading Indiana Hoosiers Baseball");
  screen.innerHTML='<div class="loading-content"><div class="loading-mark"><img src="images/iu-altius-logo.jpg" alt=""></div><p class="loading-team">INDIANA</p><p class="loading-sport">BASEBALL</p><div class="loading-progress" aria-hidden="true"><span></span></div></div>';
  document.body.prepend(screen);
  return async()=>{
    const remaining=reducedMotion?0:Math.max(0,1250-(performance.now()-startedAt));
    if(remaining)await new Promise(resolve=>setTimeout(resolve,remaining));
    screen.classList.add("is-leaving");
    screen.setAttribute("aria-hidden","true");
    if(!reducedMotion)await new Promise(resolve=>setTimeout(resolve,450));
    screen.remove();
  };
}

function setupSharedNavigation(){
  const nav=document.querySelector(".sub");
  if(nav){
    const links=Array.from(nav.querySelectorAll("a"));
    if(!links.some(link=>link.getAttribute("href")==="Alumni.html")){
      const alumni=document.createElement("a");
      alumni.href="Alumni.html";
      alumni.textContent="Alumni";
      alumni.className=document.getElementById("app")?.dataset.view==="alumni"?"on":"";
      if(alumni.classList.contains("on"))alumni.setAttribute("aria-current","page");
      nav.insertBefore(alumni,nav.querySelector(".site-search"));
    }
    nav.querySelector(".theme-toggle")?.remove();
  }
  const footer=document.querySelector("footer");
  if(footer&&!footer.querySelector(".theme-toggle"))footer.insertAdjacentHTML("beforeend",darkModeButton());
  applyDarkMode(readDarkMode());
}

function readDarkMode(){
  try{return sessionStorage.getItem("iu-baseball-dark-mode")==="true";}
  catch(error){console.warn("Could not read saved display settings.",error);return false;}
}

function applyDarkMode(enabled){
  document.documentElement.dataset.theme=enabled?"dark":"light";
  const button=document.querySelector(".theme-toggle");
  if(button){
    button.setAttribute("aria-pressed",String(enabled));
    button.setAttribute("aria-label",enabled?"Switch to light mode":"Switch to dark mode");
    button.title=enabled?"Switch to light mode":"Switch to dark mode";
  }
}

function toggleDarkMode(){
  const enabled=document.documentElement.dataset.theme!=="dark";
  applyDarkMode(enabled);
  try{sessionStorage.setItem("iu-baseball-dark-mode",String(enabled));}
  catch(error){console.warn("Could not save display settings.",error);}
}

function printPage(){
  window.print();
}

function printButton(label){
  return `<button type="button" class="print-button no-print" onclick="printPage()">Print ${label}</button>`;
}

function rotationSection(){
  if(!PROJECTED_STARTERS.length)return `<section class="panel rotation-panel"><h2>Projected Starting Rotation</h2><p class="empty-state">Weekend starters for the 2027 season have not been announced.</p></section>`;
  return `<section class="panel rotation-panel"><h2>Projected Starting Rotation</h2><div class="rotation-grid">${PROJECTED_STARTERS.map((starter,index)=>`<div><span>Starter ${index+1}</span><b>${escapeHtml(starter.name)}</b><small>${escapeHtml(starter.throws||"")}</small></div>`).join("")}</div></section>`;
}

function gameDayScoreBar(game){
  if(!game||game.status!=="live")return "";
  const home=game.home||"Indiana",away=game.away||"Opponent";
  const bar=document.createElement("aside");
  bar.className="game-day-score-bar";
  bar.setAttribute("role","status");
  bar.innerHTML=`<span class="live-indicator">LIVE</span><strong>${escapeHtml(away)} ${escapeHtml(game.awayScore??0)}</strong><span>@</span><strong>${escapeHtml(home)} ${escapeHtml(game.homeScore??0)}</strong><span>${escapeHtml(game.inning||"In progress")}</span>`;
  document.body.prepend(bar);
  const nav=document.querySelector(".sub");
  if(nav)nav.style.top=`${bar.offsetHeight}px`;
  return bar;
}

function winProbabilityChart(game){
  const points=Array.isArray(game?.winProbability)?game.winProbability:[];
  if(points.length<3)return `<p class="empty-state">Win probability will appear when live game data is available.</p>`;
  const coordinates=points.map((point,index)=>{
    const value=Number(point.indiana);
    if(!Number.isFinite(value))throw new Error("Win probability data must contain numeric Indiana probabilities.");
    const x=40+(index/(points.length-1))*520;
    const y=180-Math.max(0,Math.min(1,value))*150;
    return `${x},${y}`;
  });
  return `<svg class="win-probability-chart" viewBox="0 0 600 220" role="img" aria-label="Indiana win probability over the game"><line x1="40" y1="30" x2="560" y2="30"></line><line x1="40" y1="105" x2="560" y2="105"></line><line x1="40" y1="180" x2="560" y2="180"></line><polyline points="${coordinates.join(" ")}"></polyline><text x="4" y="34">100%</text><text x="15" y="110">50%</text><text x="27" y="185">0%</text></svg>`;
}

function isEmptyStats(stats){
  return !stats||typeof stats!=="object"||!Object.values(stats).some(value=>value!==null&&value!==undefined&&value!=="");
}

function videoCard(v){
  return `<a class="card vid" href="#" onclick="openVideo(${v.id});return false"><img loading="lazy" src="${img(SA+"images/"+v.thumb,540,304)}" alt="${v.title}"><h3>${v.title}</h3><small>${v.date}</small></a>`;
}

function gameRow(g){
  return g[5].map(d=>`<div class="game"><b>${d}</b><img src="${img(SA+"images/logos/"+g[1],84,84)}" alt="" onerror="this.hidden=true"><div><b>${g[2]} ${g[0]}${g[6]?` <i class="pill">${g[7]}</i>`:''}</b><span>${g[3]}</span></div><span class="t">${g[4]}</span></div>`).join("");
}

function escapeHtml(value){
  return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}

function useIuFallback(image){
  if(image.dataset.fallbackApplied==="true"){
    image.hidden=true;
    return;
  }
  image.dataset.fallbackApplied="true";
  image.src=IU_LOGO;
}

function openGameAction(action,seriesIndex){
  const game=SCH[seriesIndex];
  if(!game)throw new Error(`Schedule entry not found: ${seriesIndex}`);
  const messages={
    Tickets:"Ticket information has not been added yet.",
    Watch:"Broadcast information has not been announced yet.",
    Listen:"Radio information has not been announced yet."
  };
  document.getElementById("mTitle").textContent=`${action} · ${game[0]}`;
  document.getElementById("mBody").innerHTML=`<p class="empty-state">${escapeHtml(messages[action]||"Information is not available yet.")}</p><p><a href="Game.html?series=${seriesIndex}&amp;game=0">View game preview</a></p>`;
  document.getElementById("modalBg").classList.add("open");
}

function scheduleSeries(g,index){
  const venue=g[2]==="vs"?"home":"away";
  const group=g[6]?"conference":"nonconference";
  return `<article class="series" data-venue="${venue}" data-group="${group}">
    <div class="series-head">
      <img src="${img(SA+"images/logos/"+g[1],84,84)}" alt="${g[0]} logo" onerror="this.hidden=true">
      <div><h3>${g[2]} ${g[0]}</h3><p>${g[7]||"Non-Conference"} &middot; ${g[3]}</p></div>
      <span class="series-badge">${venue==="home"?"Home":"Away"}</span>
    </div>
    <div class="series-dates">${g[5].map((d,dateIndex)=>`<div class="game-date"><button class="game-preview" type="button" onclick="openGamePreview(${index},${dateIndex})"><b>${d}</b><span>${g[4]}</span><small>Preview &rarr;</small></button><button class="game-calendar" type="button" onclick="downloadGameCalendar(${index},${dateIndex})">Add to calendar</button></div>`).join("")}</div>
    <div class="game-actions" aria-label="Game information"><button type="button" onclick="openGameAction('Tickets',${index})">Tickets</button><button type="button" onclick="openGameAction('Watch',${index})">Watch</button><button type="button" onclick="openGameAction('Listen',${index})">Listen</button></div>
  </article>`;
}

let featuredIndex=1;
let featuredTimer=null;
let featuredChangeTimer=null;
let featuredGeneration=0;
const PLAYER_STATS={};

function heroCarousel(){
  const first=NEWS[featuredIndex];
  return `<section class="hero-slider" id="heroSlider" aria-label="Featured stories" aria-roledescription="carousel">
    <a class="hero" id="heroLink" href="#" data-news-id="${first.id}" onclick="openNews(Number(this.dataset.newsId));return false">
      <img class="hero-image active" id="heroImageA" src="${first.img}" alt="">
      <img class="hero-image" id="heroImageB" alt="">
      <div class="hero-content"><span class="tag">Baseball</span><span class="date" id="heroDate" style="color:#eee">${first.date}</span><h1 id="heroTitle">${first.title}</h1></div>
    </a>
    <div class="hero-controls">
      <button type="button" aria-label="Previous story" onclick="changeFeaturedStory(-1)">&lsaquo;</button>
      <div class="hero-dots" role="group" aria-label="Choose featured story">${NEWS.map((n,i)=>`<button type="button" class="story-dot${i===featuredIndex?" on":""}" aria-label="Show story: ${n.title}" aria-pressed="${i===featuredIndex}" onclick="showFeaturedStory(${i},true)"></button>`).join("")}</div>
      <button type="button" aria-label="Next story" onclick="changeFeaturedStory(1)">&rsaquo;</button>
    </div>
  </section>`;
}

function showFeaturedStory(index,resetTimer=false){
  featuredIndex=(index+NEWS.length)%NEWS.length;
  const n=NEWS[featuredIndex];
  const hero=document.getElementById("heroLink");
  const images=Array.from(hero.querySelectorAll(".hero-image"));
  const active=images.find(image=>image.classList.contains("active"));
  const next=images.find(image=>image!==active);
  const generation=++featuredGeneration;
  window.clearTimeout(featuredChangeTimer);
  const activate=()=>{
    if(generation!==featuredGeneration)return;
    next.classList.add("active");
    active.classList.remove("active");
    hero.dataset.newsId=n.id;
    document.getElementById("heroDate").textContent=n.date;
    document.getElementById("heroTitle").textContent=n.title;
  };
  next.onload=activate;
  next.onerror=()=>console.error(`Featured story image failed to load: ${n.img}`);
  next.src=n.img;
  if(next.complete&&next.naturalWidth>0)activate();
  document.querySelectorAll(".story-dot").forEach((dot,i)=>{
    dot.classList.toggle("on",i===featuredIndex);
    dot.setAttribute("aria-pressed",String(i===featuredIndex));
  });
  if(resetTimer) startFeaturedTimer();
}

function changeFeaturedStory(step){
  showFeaturedStory(featuredIndex+step,true);
}

function startFeaturedTimer(){
  window.clearInterval(featuredTimer);
  featuredTimer=window.setInterval(()=>showFeaturedStory(featuredIndex+1),6500);
}

function filterSchedule(filter,button){
  const series=Array.from(document.querySelectorAll(".series"));
  series.forEach(card=>{
    const show=filter==="all"||card.dataset.venue===filter||card.dataset.group===filter;
    card.hidden=!show;
  });
  document.querySelectorAll(".schedule-filters button").forEach(b=>b.classList.toggle("on",b===button));
  const visibleSeries=series.filter(card=>!card.hidden).length;
  document.getElementById("scheduleCount").textContent=filter==="all"?"Showing all opponents":`Showing ${visibleSeries} of ${series.length} opponents`;
}

function rosterRoleKeys(player){
  const positions=player[2].toUpperCase().split("/");
  const keys=[];
  if(positions.some(position=>["P","RP","SP","RHP","LHP"].includes(position)))keys.push("pitchers");
  if(positions.includes("C"))keys.push("catchers");
  if(positions.some(position=>["INF","1B","2B","SS","3B"].includes(position)))keys.push("infield");
  if(positions.includes("OF"))keys.push("outfield");
  return keys;
}

function positionTypes(position){
  const roles=position.toUpperCase().split("/");
  const pitcher=roles.some(role=>["P","RP","SP","RHP","LHP"].includes(role));
  const fielder=roles.some(role=>!["P","RP","SP","RHP","LHP"].includes(role));
  return {pitcher,fielder};
}

function filterRoster(filter,button){
  const cards=Array.from(document.querySelectorAll(".roster-grid .pl"));
  cards.forEach(card=>{card.hidden=filter!=="all"&&!card.dataset.roles.split(" ").includes(filter);});
  document.querySelectorAll(".roster-filters button").forEach(item=>item.classList.toggle("on",item===button));
  const shown=cards.filter(card=>!card.hidden).length;
  document.getElementById("rosterCount").textContent=`Showing ${shown} of ${cards.length} players`;
}

function historicalRosterCard(player,season){
  const profileStats=PLAYER_CAREER_STATS.players[player.id]?.statsBySeason?.[season]?.seasonStats;
  const stats=player.stats||profileStats;
  const hitting=stats?.hittingStats;
  const pitching=stats?.pitchingStats;
  const statLine=hitting
    ? `<p class="past-roster-statline">AVG ${escapeHtml(hitting.avg||"—")} · ${escapeHtml(hitting.hits||"—")} H · ${escapeHtml(hitting.homeRuns||"—")} HR</p>`
    : pitching
      ? `<p class="past-roster-statline">ERA ${escapeHtml(pitching.earnedRunAverage||"—")} · ${escapeHtml(pitching.wins||"—")} W · ${escapeHtml(pitching.strikeouts||"—")} K</p>`
      : `<p class="past-roster-statline">Individual stats unavailable</p>`;
  const playerUrl=`Player.html?id=${encodeURIComponent(player.id)}&season=${encodeURIComponent(season)}`;
  return `<a class="card past-roster-card" href="${playerUrl}">
    <img class="past-roster-logo" src="${IU_LOGO}" alt="Indiana University logo" loading="lazy">
    <span class="profile-number">#${escapeHtml(player.number||"—")}</span>
    <h3>${escapeHtml(player.name)}</h3>
    <p>${escapeHtml(player.position||"Baseball")} · ${escapeHtml(player.classYear||"")}</p>
    ${statLine}
    <span class="past-roster-link">View player stats &rarr;</span>
  </a>`;
}

function historicalRosterView(season){
  const roster=PAST_ROSTERS[season];
  if(!roster)throw new Error(`Historical roster data is missing for ${season}.`);
  return `<div class="wrap">
    <div class="page-heading"><div><span class="schedule-eyebrow">Indiana Hoosiers Baseball</span><h2>${escapeHtml(season)} Roster</h2></div>${seasonControl(season,["2026-27",...Object.keys(PAST_ROSTERS).sort((a,b)=>Number(b)-Number(a))])}</div>
    <p class="schedule-count">Showing ${roster.players.length} players · Player cards use the IU logo.${roster.statsAvailableFromOfficialSeasonTable?" Select a player to view available season stats.":" Official individual season statistics are not available for this roster year."}</p>
    <div class="grid alumni-grid past-roster-grid">${roster.players.map(player=>historicalRosterCard(player,season)).join("")}</div>
  </div>`;
}

function player(p){
  const [num,name,pos,yr,ht,wt,bt,home,school,prev,id]=p;
  const ph=getPlayerPhoto(id);
  const safePhoto=ph.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const photoBlock = ph
    ? `<img class="ph" src="${safePhoto}" alt="${escapeHtml(name)}" onerror="useIuFallback(this)">`
    : `<div class="ph"><i>#${num}</i><img class="iulogo" src="${IU_LOGO}" alt="Indiana University logo"><small>${pos}</small></div>`;
  return `<div class="pl" data-roles="${rosterRoleKeys(p).join(" ")}" onclick="openPlayerPage('${id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openPlayerPage('${id}')}" tabindex="0" role="link" aria-label="Open ${name} profile">
    <div class="ph-wrap" style="position:relative">${photoBlock}
      <div class="ov">
        <button onclick="event.stopPropagation();openPlayerPage('${id}')">Player profile</button>
        <button onclick="event.stopPropagation();openPlayer('${id}','stats')">Stats</button>
      </div>
    </div>
    <div class="meta"><h3>${name}</h3><p>#${num} &middot; ${pos} &middot; ${yr}</p><p>${home}</p></div>
  </div>`;
}

function openPlayerPage(id){
  location.href=`Player.html?id=${encodeURIComponent(id)}`;
}

const PLAYER_PHOTOS_KEY="iuBaseballPlayerPhotos";
let pendingManagedPhoto="";

function getSavedPlayerPhotos(){
  const raw=localStorage.getItem(PLAYER_PHOTOS_KEY);
  if(!raw)return {};
  const saved=JSON.parse(raw);
  if(!saved||typeof saved!=="object"||Array.isArray(saved))throw new Error("Saved player photos must be a JSON object.");
  return saved;
}

function getPlayerPhoto(id){
  return PHOTOS[id]||"";
}

function photoManager(){
  let saved={};
  let error="";
  try{saved=getSavedPlayerPhotos();}catch(e){error=e.message;console.error("Could not read saved player photos.",e);}
  const options=ROSTER.map(p=>`<option value="${p[10]}">#${p[0]} ${p[1]} (${p[2]})</option>`).join("");
  return `<div class="wrap photo-manager">
    <h2>Player Photo Manager</h2>
    <p>Choose a player, then paste an image URL or upload a photo from your device. Photos are saved in this browser and used on the roster. Uploaded images are resized to fit player cards.</p>
    <p class="note">To move your photo assignments to another browser or device, export the photo list here and import it there.</p>
    <p id="photoManagerStatus" class="manager-status${error?" error":""}" role="status" aria-live="polite">${error?`Could not read saved photos: ${error}`:""}</p>
    <label for="photoPlayer">Player</label>
    <select id="photoPlayer" onchange="loadManagedPhoto()">${options}</select>
    <div class="photo-editor">
      <div class="photo-preview"><img id="managedPhotoPreview" alt="Selected player's photo preview" hidden><span id="photoPreviewEmpty">IU logo placeholder</span></div>
      <div class="photo-fields">
        <label for="photoUrl">Image URL</label>
        <input id="photoUrl" type="url" placeholder="https://example.com/player-photo.jpg" autocomplete="url" oninput="pendingManagedPhoto=''">
        <label for="photoFile">Or upload a photo</label>
        <input id="photoFile" type="file" accept="image/*" onchange="previewManagedFile(event)">
        <div class="manager-actions">
          <button class="manager-primary" type="button" onclick="saveManagedPhoto()">Save photo</button>
          <button type="button" onclick="clearManagedPhoto()">Use IU logo</button>
        </div>
      </div>
    </div>
    <details class="photo-transfer"><summary>Back up or move photo assignments</summary>
      <div class="manager-actions">
        <button type="button" onclick="exportManagedPhotos()">Export photo list</button>
        <button type="button" onclick="importManagedPhotos()">Import photo list</button>
      </div>
      <label for="photoTransferData">Photo list JSON</label>
      <textarea id="photoTransferData" rows="6" placeholder="Export to copy your assignments, or paste a photo list here to import it."></textarea>
    </details>
  </div>`;
}

function photoManagerStatus(message,isError=false){
  const status=document.getElementById("photoManagerStatus");
  status.textContent=message;
  status.classList.toggle("error",isError);
}

function showManagedPreview(src){
  const preview=document.getElementById("managedPhotoPreview");
  const empty=document.getElementById("photoPreviewEmpty");
  if(src){
    preview.src=src;
    preview.hidden=false;
    empty.hidden=true;
    preview.onerror=()=>photoManagerStatus("The selected image could not be loaded. Check its URL or choose another image.",true);
  }else{
    preview.removeAttribute("src");
    preview.hidden=true;
    empty.hidden=false;
  }
}

function loadManagedPhoto(){
  const id=document.getElementById("photoPlayer").value;
  pendingManagedPhoto="";
  document.getElementById("photoFile").value="";
  try{
    const photo=getSavedPlayerPhotos()[id]||"";
    document.getElementById("photoUrl").value=photo.startsWith("http")?photo:"";
    showManagedPreview(photo);
    photoManagerStatus("");
  }catch(error){
    photoManagerStatus(`Could not load saved photo: ${error.message}`,true);
  }
}

function previewManagedFile(event){
  pendingManagedPhoto="";
  const file=event.target.files[0];
  if(!file)return;
  if(!file.type.startsWith("image/")){
    photoManagerStatus("Choose an image file.",true);
    return;
  }
  const objectUrl=URL.createObjectURL(file);
  const image=new Image();
  image.onload=()=>{
    const scale=Math.min(1,900/image.width,1200/image.height);
    const canvas=document.createElement("canvas");
    canvas.width=Math.max(1,Math.round(image.width*scale));
    canvas.height=Math.max(1,Math.round(image.height*scale));
    const context=canvas.getContext("2d");
    if(!context){
      URL.revokeObjectURL(objectUrl);
      photoManagerStatus("Your browser could not prepare this photo.",true);
      return;
    }
    context.fillStyle="#fff";
    context.fillRect(0,0,canvas.width,canvas.height);
    context.drawImage(image,0,0,canvas.width,canvas.height);
    pendingManagedPhoto=canvas.toDataURL("image/jpeg",.78);
    URL.revokeObjectURL(objectUrl);
    document.getElementById("photoUrl").value="";
    showManagedPreview(pendingManagedPhoto);
    photoManagerStatus("Photo ready. Choose Save photo to add it to the roster.");
  };
  image.onerror=()=>{
    URL.revokeObjectURL(objectUrl);
    photoManagerStatus("Could not read that image file.",true);
  };
  image.src=objectUrl;
}

function saveManagedPhoto(){
  const id=document.getElementById("photoPlayer").value;
  const url=document.getElementById("photoUrl").value.trim();
  const photo=pendingManagedPhoto||url;
  if(!photo||!(photo.startsWith("data:image/")||/^https?:\/\//i.test(photo))){
    photoManagerStatus("Paste a valid HTTP(S) image URL or choose an image file first.",true);
    return;
  }
  try{
    const saved=getSavedPlayerPhotos();
    saved[id]=photo;
    localStorage.setItem(PLAYER_PHOTOS_KEY,JSON.stringify(saved));
    pendingManagedPhoto="";
    photoManagerStatus("Photo saved for this browser. Open the roster to see the update.");
    showManagedPreview(photo);
  }catch(error){
    console.error("Could not save player photo.",error);
    photoManagerStatus(`Could not save photo: ${error.message}. Try a smaller image or use an image URL.`,true);
  }
}

function clearManagedPhoto(){
  const id=document.getElementById("photoPlayer").value;
  try{
    const saved=getSavedPlayerPhotos();
    delete saved[id];
    localStorage.setItem(PLAYER_PHOTOS_KEY,JSON.stringify(saved));
    pendingManagedPhoto="";
    document.getElementById("photoUrl").value="";
    document.getElementById("photoFile").value="";
    showManagedPreview("");
    photoManagerStatus("Removed the custom photo. This player will use the IU logo.");
  }catch(error){
    console.error("Could not remove player photo.",error);
    photoManagerStatus(`Could not update saved photos: ${error.message}`,true);
  }
}

function exportManagedPhotos(){
  try{
    const data=JSON.stringify(getSavedPlayerPhotos(),null,2);
    document.getElementById("photoTransferData").value=data;
    const link=document.createElement("a");
    link.href=URL.createObjectURL(new Blob([data],{type:"application/json"}));
    link.download="iu-baseball-player-photos.json";
    link.click();
    window.setTimeout(()=>URL.revokeObjectURL(link.href),1000);
    photoManagerStatus("Photo list exported.");
  }catch(error){
    console.error("Could not export player photos.",error);
    photoManagerStatus(`Could not export photo list: ${error.message}`,true);
  }
}

function importManagedPhotos(){
  try{
    const imported=JSON.parse(document.getElementById("photoTransferData").value);
    if(!imported||typeof imported!=="object"||Array.isArray(imported))throw new Error("Paste a JSON object of player IDs and photo URLs.");
    const validIds=new Set(ROSTER.map(p=>p[10]));
    const photos={};
    for(const [id,src] of Object.entries(imported)){
      if(!validIds.has(id)||typeof src!=="string"||!(src.startsWith("data:image/")||/^https?:\/\//i.test(src)))throw new Error(`Invalid player ID or image for ${id}.`);
      photos[id]=src;
    }
    localStorage.setItem(PLAYER_PHOTOS_KEY,JSON.stringify(photos));
    loadManagedPhoto();
    photoManagerStatus("Photo list imported. Your roster will use the imported assignments.");
  }catch(error){
    console.error("Could not import player photos.",error);
    photoManagerStatus(`Could not import photo list: ${error.message}`,true);
  }
}

function coachCard(c){
  return `<a class="co coach-card" href="Coach.html?id=${encodeURIComponent(c[2])}" aria-label="View ${escapeHtml(c[0])}'s coach profile"><img src="${img(SA+"images/"+c[4]+"/"+c[3],140,190)}" alt=""><div><b>${escapeHtml(c[0])}</b><br><small class="date">${escapeHtml(c[1])}</small><span class="coach-link">View coach profile &rarr;</span></div></a>`;
}

function countdownBlock(compact=false){
  return `<div class="countdown${compact?" countdown-compact":""}" id="countdown">
    <div><h3>Next Game</h3><div class="opp">${NEXT_GAME.where}</div><small>${NEXT_GAME.when}</small></div>
    <div class="cd-nums" id="cdNums"><div><b id="cdD">0</b><span>Days</span></div><div><b id="cdH">0</b><span>Hrs</span></div><div><b id="cdM">0</b><span>Min</span></div><div><b id="cdS">0</b><span>Sec</span></div></div>
  </div>`;
}

function startCountdown(){
  const el=document.getElementById("cdNums");
  if(!el) return;
  const target=new Date(NEXT_GAME.iso).getTime();
  function tick(){
    const diff=target-Date.now();
    if(diff<=0){document.getElementById("countdown").innerHTML=`<h3>First pitch has arrived &mdash; Go Hoosiers!</h3>`;clearInterval(t);return;}
    const d=Math.floor(diff/86400000),h=Math.floor(diff/3600000)%24,m=Math.floor(diff/60000)%60,s=Math.floor(diff/1000)%60;
    document.getElementById("cdD").textContent=d;
    document.getElementById("cdH").textContent=String(h).padStart(2,"0");
    document.getElementById("cdM").textContent=String(m).padStart(2,"0");
    document.getElementById("cdS").textContent=String(s).padStart(2,"0");
  }
  tick();
  const t=setInterval(tick,1000);
}

const BATTING_COLUMNS=[["avg","AVG"],["ops","OPS"],["ab","AB"],["r","R"],["h","H"],["hr","HR"],["rbi","RBI"],["bb","BB"],["so","K"],["sb","SB-ATT"]];
const PITCHING_COLUMNS=[["era","ERA"],["whip","WHIP"],["w","W"],["l","L"],["appgs","APP-GS"],["ip","IP"],["h","H"],["er","ER"],["bb","BB"],["so","K"],["sv","SV"]];
let statsSort={type:"batting",key:"avg",descending:true};
let activeStatsSeason="";

function statValue(player,type,key){
  const value=Array.isArray(player)?PLAYER_STATS[player[10]]?.[type]?.[key]:player[key];
  return value===undefined||value===null||value===""?"":value;
}

function sortableValue(value){
  const parsed=Number(value);
  return Number.isNaN(parsed)?String(value).toLowerCase():parsed;
}

function statsRows(type){
  const columns=type==="batting"?BATTING_COLUMNS:PITCHING_COLUMNS;
  const players=[...(INDIVIDUAL_STATS[activeStatsSeason]?.[type]||officialPlayerStatsRows(activeStatsSeason,type))].filter(player=>columns.some(([key])=>statValue(player,type,key)!==""));
  const {key,descending}=statsSort;
  if(statsSort.type===type){
    players.sort((a,b)=>{
      const left=sortableValue(statValue(a,type,key));
      const right=sortableValue(statValue(b,type,key));
      if(left===right)return a.name.localeCompare(b.name);
      return (left>right?1:-1)*(descending?-1:1);
    });
  }
  return players.map(player=>{
    const rosterPlayer=ROSTER.find(candidate=>candidate[10]===player.id||candidate[1].toLowerCase()===player.name.toLowerCase());
    const playerName=rosterPlayer?`<a href="Player.html?id=${encodeURIComponent(rosterPlayer[10])}&amp;season=${encodeURIComponent(activeStatsSeason)}">${escapeHtml(player.name)}</a>`:escapeHtml(player.name);
    return `<tr><td>${playerName}</td>${columns.map(([column])=>{
      const value=column==="appgs"&&player.app!==undefined?`${player.app} - ${player.gs}`:statValue(player,type,column);
      return `<td>${escapeHtml(value||"—")}</td>`;
    }).join("")}</tr>`;
  }).join("");
}

function officialPlayerStatsRows(season,type){
  const rows=[];
  for(const [id,profile] of Object.entries(PLAYER_CAREER_STATS.players)){
    const record=profile.statsBySeason[season];
    const stats=record?.seasonStats;
    const source=type==="batting"?stats?.hittingStats:stats?.pitchingStats;
    if(!source)continue;
    const name=ROSTER.find(player=>player[10]===id)?.[1]||record.name;
    const number=(value)=>Number.parseFloat(value)||0;
    if(type==="batting"){
      const obp=number(source.onbasePercentage);
      const slg=number(source.sluggingPercentage);
      rows.push({id,name,avg:source.avg,ops:(obp+slg).toFixed(3).replace(/^0\./,"."),ab:source.atBats,r:source.runs,h:source.hits,hr:source.homeRuns,rbi:source.runsBattedIn,bb:source.walks,so:source.strikeouts,sb:`${source.stolenBases||0} - ${(number(source.stolenBases)+number(source.caughtStealing))}`});
    }else{
      const outs=baseballInningsToOuts(source.inningsPitched);
      const whip=outs?((number(source.hitsAllowed)+number(source.walksAllowed))*3/outs).toFixed(2):"";
      rows.push({id,name,era:source.earnedRunAverage,whip,w:source.wins,l:source.losses,appgs:`${source.appearances} - ${source.gamesStarted}`,ip:source.inningsPitched,h:source.hitsAllowed,er:source.earnedRunsAllowed,bb:source.walksAllowed,so:source.strikeouts,sv:source.saves});
    }
  }
  return rows;
}

function baseballInningsToOuts(value){
  const innings=String(value||"").match(/^(\d+)(?:\.(\d))?$/);
  if(!innings)return 0;
  const partial=Number(innings[2]||0);
  if(partial>2)return 0;
  return Number(innings[1])*3+partial;
}

function sortStatsTable(type,key){
  if(statsSort.type===type&&statsSort.key===key)statsSort.descending=!statsSort.descending;
  else statsSort={type,key,descending:true};
  const body=document.querySelector(`[data-stats-body="${type}"]`);
  if(body)body.innerHTML=statsRows(type)||`<tr><td colspan="${(type==="batting"?BATTING_COLUMNS:PITCHING_COLUMNS).length+1}" class="empty-cell">No ${type} statistics are available for this season.</td></tr>`;
  document.querySelectorAll(`[data-stats-table="${type}"] button`).forEach(button=>{
    const active=button.dataset.key===key;
    button.setAttribute("aria-sort",active?(statsSort.descending?"descending":"ascending"):"none");
  });
}

function sortedStatsTable(type){
  const columns=type==="batting"?BATTING_COLUMNS:PITCHING_COLUMNS;
  const rows=statsRows(type);
  return `<div class="table-scroll"><table class="stats-table" data-stats-table="${type}"><thead><tr><th>Player</th>${columns.map(([key,label])=>`<th><button type="button" data-key="${key}" aria-sort="none" onclick="sortStatsTable('${type}','${key}')">${label}</button></th>`).join("")}</tr></thead><tbody data-stats-body="${type}">${rows||`<tr><td colspan="${columns.length+1}" class="empty-cell">No ${type} statistics are available for this season.</td></tr>`}</tbody></table></div>`;
}

function changeStatsSeason(value){
  const url=new URL(location.href);
  url.searchParams.set("season",value);
  location.href=url.href;
}

function seasonControl(selected,seasons=SUPPORTED_SEASONS){
  return `<label class="season-control">Season <select aria-label="Select season" onchange="changeStatsSeason(this.value)">${seasons.map(season=>`<option value="${season}"${selected===season?" selected":""}>${season}</option>`).join("")}</select></label>`;
}

let draftSort={key:"year",descending:true};

function draftTeamName(pick){
  if(pick.draftOrganization==="Los Angeles (AL)"&&pick.year<=1996)return "California Angels";
  if(pick.draftOrganization==="Texas"&&pick.year===1968)return "Washington Senators";
  if(pick.draftOrganization==="Cleveland"&&pick.year<2022)return "Cleveland Indians";
  if(pick.draftOrganization==="Miami"&&pick.year<2012)return "Florida Marlins";
  if(pick.draftOrganization==="Tampa Bay"&&pick.year<2008)return "Tampa Bay Devil Rays";
  if(pick.draftOrganization==="Washington"&&pick.year<2005)return "Montreal Expos";
  return pick.draftTeam;
}

function draftTeamLogo(pick){
  const organization=pick.draftOrganization;
  if(organization==="Kansas City"&&pick.year===1966)return "images/mlb/historical/kansas-city-athletics.png";
  if(organization==="Los Angeles (AL)"&&pick.year<=1970)return "images/mlb/historical/california-angels-1966-1970.svg";
  if(organization==="Los Angeles (AL)"&&pick.year<=1988)return "images/mlb/historical/california-angels-1972-1988.svg";
  if(organization==="Texas"&&pick.year===1968)return "images/mlb/historical/washington-senators-1968-1971.svg";
  if(organization==="Cleveland"&&pick.year<2022)return "images/mlb/historical/cleveland-indians-cap.svg";
  if(organization==="Miami"&&pick.year<2012)return "images/mlb/historical/florida-marlins.png";
  if(organization==="Tampa Bay"&&pick.year<2008)return "images/mlb/historical/tampa-bay-devil-rays-1998-2000.png";
  if(organization==="Washington"&&pick.year<2005)return "images/mlb/historical/montreal-expos.svg";
  return `images/mlb/${pick.draftTeamId}.svg`;
}

function draftCurrentLevel(pick){
  const assigned=CURRENT_PRO_HOOSIERS.find(player=>player.name===pick.name);
  if(assigned)return assigned.level;
  if(pick.notes.some(note=>note.toLowerCase().includes("did not sign")))return "Did Not Sign";
  const alumniStatus=MLB_ALUMNI_DETAILS[pick.name]?.status;
  if(alumniStatus==="Retired"||alumniStatus==="Free Agent")return alumniStatus;
  if(alumniStatus==="Active MLB player")return "MLB";
  if(alumniStatus==="Former MLB player")return "Former MLB player";
  if(alumniStatus==="Minor Leagues")return "Minor Leagues";
  return "Unverified";
}

function draftHistoryRows(){
  const history=[...MLB_DRAFT_HISTORY];
  const {key,descending}=draftSort;
  history.sort((a,b)=>{
    let comparison;
    if(key==="year")comparison=a.year-b.year;
    else if(key==="round")comparison=a.roundOrder-b.roundOrder;
    else if(key==="position")comparison=a.positionName.localeCompare(b.positionName);
    else comparison=draftTeamName(a).localeCompare(draftTeamName(b));
    if(comparison===0)comparison=a.pick-b.pick;
    if(comparison===0)comparison=a.name.localeCompare(b.name);
    return comparison*(descending?-1:1);
  });
  return history.map(pick=>`<tr>
    <td>${pick.year}</td>
    <td>${escapeHtml(pick.name)}${pick.notes.length?`<small class="draft-note">${escapeHtml(pick.notes.join(" · "))}</small>`:""}</td>
    <td>${escapeHtml(pick.positionName)}</td>
    <td><span class="draft-team"><img src="${draftTeamLogo(pick)}" alt="" loading="lazy"><span>${escapeHtml(draftTeamName(pick))}</span></span></td>
    <td>${escapeHtml(pick.round)}</td>
    <td>${pick.pick}</td>
    <td>${escapeHtml(draftCurrentLevel(pick))}</td>
  </tr>`).join("");
}

function sortDraftHistory(key){
  if(!["team","round","year","position"].includes(key))throw new Error(`Unsupported draft-history sort: ${key}`);
  if(draftSort.key===key)draftSort.descending=!draftSort.descending;
  else draftSort={key,descending:key==="year"};
  updateDraftHistory();
}

function toggleDraftSort(){
  draftSort.descending=!draftSort.descending;
  updateDraftHistory();
}

function updateDraftHistory(){
  const body=document.getElementById("draftHistoryBody");
  if(body)body.innerHTML=draftHistoryRows();
  const button=document.getElementById("draftSortOrder");
  if(button){
    button.textContent=draftSort.descending?"Descending":"Ascending";
    button.setAttribute("aria-label",`Sort ${draftSort.descending?"ascending":"descending"}`);
  }
}

function alumniCard(alumnus){
  const details=MLB_ALUMNI_DETAILS[alumnus.name];
  if(!details)throw new Error(`Alumni details are missing for ${alumnus.name}.`);
  const pick=MLB_DRAFT_HISTORY.find(row=>row.name===alumnus.name&&!row.notes.includes("Did not sign"));
  const proAssignment=CURRENT_PRO_HOOSIERS.find(player=>player.name===alumnus.name);
  const currentPro=proAssignment?.level==="MLB"?proAssignment:null;
  const draftTeam=pick?draftTeamName(pick):alumnus.draftTeam;
  const draftTeamId=pick?.draftTeamId||alumnus.draftTeamId;
  const draftYear=pick?.year||alumnus.draftYear;
  const draftRound=pick?.round||alumnus.draftRound;
  const draftPick=pick?.pick||alumnus.draftPick;
  const draftPosition=pick?.positionName||"—";
  const draftLogo=pick?draftTeamLogo(pick):`images/mlb/${draftTeamId}.svg`;
  const draftDetails=draftTeam?`<div class="alumni-draft"><img src="${draftLogo}" alt="${escapeHtml(draftTeam)} logo" loading="lazy" onerror="this.hidden=true"><div><span>Drafted by</span><strong>${escapeHtml(draftTeam)}</strong><small>${escapeHtml(draftYear)} · Round ${escapeHtml(draftRound)} · Pick ${escapeHtml(draftPick)}</small></div></div>`:"";
  const years=details.iuYears?`<p>Indiana: ${escapeHtml(details.iuYears)}</p>`:"";
  const pastTeams=details.pastTeams.length?`<dt>Past MLB teams</dt><dd>${details.pastTeams.map(escapeHtml).join(" · ")}</dd>`:"";
  const debutDate=new Date(`${details.debutDate}T12:00:00`).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
  const latestTeam=currentPro?.team||details.currentTeam;
  const teamLabel=currentPro?"Current MLB team":proAssignment?.level==="Retired"?"Final MLB team":"Current / latest club";
  return `<article class="panel alumni-card${currentPro?" current-pro-card":""}">
    ${draftDetails}<span class="profile-number">${escapeHtml(details.position)}</span><h3>${escapeHtml(alumnus.name)}</h3>${years}
    <dl><dt>Pro status / level</dt><dd>${escapeHtml(proAssignment?.level||details.status)}</dd><dt>${teamLabel}</dt><dd>${escapeHtml(latestTeam)}</dd>${pastTeams}<dt>MLB debut</dt><dd>${escapeHtml(debutDate)} · ${escapeHtml(details.debutTeam)}</dd><dt>IU draft position</dt><dd>${escapeHtml(draftPosition)}</dd></dl>
  </article>`;
}

const STAT_LABELS={
 atBats:"At Bats",runs:"Runs",avg:"Batting Average",sluggingPercentage:"Slugging %",onbasePercentage:"On-Base %",hits:"Hits",runsBattedIn:"RBIs",doubles:"Doubles",triples:"Triples",homeRuns:"Home Runs",walks:"Walks",intentionalWalks:"Intentional Walks",strikeouts:"Strikeouts",strikeoutsLooking:"Strikeouts Looking",hitByPitch:"Hit by Pitch",stolenBases:"Stolen Bases",caughtStealing:"Caught Stealing",sacrificeHits:"Sacrifice Hits",sacrificeFlies:"Sacrifice Flies",reachedOnCatchersInterference:"Reached on Catcher's Interference",reachedOnError:"Reached on Error",reachesOnAFieldersChoice:"Reached on Fielder's Choice",groundOuts:"Ground Outs",flyOuts:"Fly Outs",groundedIntoDoublePlay:"Grounded into Double Plays",pickedOff:"Picked Off",doublePlaysHitInto:"Double Plays Hit Into",triplePlaysHitInto:"Triple Plays Hit Into",
 appearances:"Appearances",wins:"Wins",saves:"Saves",losses:"Losses",gamesStarted:"Games Started",gamesCompleted:"Complete Games",shutouts:"Shutouts",creditForCombinedShutout:"Combined Shutouts",inningsPitched:"Innings Pitched",hitsAllowed:"Hits Allowed",runsAllowed:"Runs Allowed",earnedRunsAllowed:"Earned Runs",walksAllowed:"Walks Allowed",battersFaced:"Batters Faced",opponentAtBats:"Opponent At Bats",doublesAllowed:"Doubles Allowed",triplesAllowed:"Triples Allowed",homerunsAllowed:"Home Runs Allowed",wildPitches:"Wild Pitches",balks:"Balks",inheritedRunners:"Inherited Runners",inheritedRunnersThatScored:"Inherited Runners Scored",sacrificeHitsAllowed:"Sacrifice Hits Allowed",sacrificeFliesAllowed:"Sacrifice Flies Allowed",catchersInterferenceAllowed:"Catcher's Interference Allowed",pitches:"Pitches",flyouts:"Fly Outs",groundouts:"Ground Outs",teamUnearnedRuns:"Team Unearned Runs",earnedRunAverage:"ERA",battingAverage:"Opponent Batting Average",
 putouts:"Putouts",assists:"Assists",errors:"Errors",passedBalls:"Passed Balls",catchersInterference:"Catcher's Interference",stolenBasesAgainst:"Stolen Bases Against",caughtStealingBy:"Caught Stealing By",involvedInDoublePlays:"Double Plays",involvedInTriplePlays:"Triple Plays",totalChances:"Total Chances",fldPct:"Fielding %",fieldingPct:"Fielding %"
};

function statLabel(key){
 return STAT_LABELS[key]||key.replace(/([A-Z])/g," $1").replace(/^./,first=>first.toUpperCase());
}

function statDetailTable(title,stats){
 const entries=Object.entries(stats||{}).filter(([,value])=>value!==null&&value!==undefined&&value!=="");
 if(!entries.length)return "";
 return `<section class="player-stat-category"><h3>${title}</h3><div class="table-scroll"><table class="mini-table"><tbody>${entries.map(([key,value])=>`<tr><th>${escapeHtml(statLabel(key))}</th><td>${escapeHtml(value)}</td></tr>`).join("")}</tbody></table></div></section>`;
}

function teamSeasonControl(selected){
  const seasons=["2027",...Object.keys(TEAM_HISTORY).sort((a,b)=>Number(b)-Number(a))];
  return `<label class="season-control">Season <select aria-label="Select stats season" onchange="changeStatsSeason(this.value)">${seasons.map(season=>`<option value="${season}"${selected===season?" selected":""}>${season}</option>`).join("")}</select></label>`;
}

function resultCard(result){
  return `<button type="button" class="result-card" data-result-id="${escapeHtml(result.id)}" onclick="openBoxScore(this.dataset.resultId)"><span>${escapeHtml(result.date)}</span><b>${escapeHtml(result.home)} ${escapeHtml(result.score)}</b><span>${escapeHtml(result.opponent)}</span><small>View box score</small></button>`;
}

function teamLeaderCards(){
  const definitions=[["batting","avg","AVG"],["batting","hr","HR"],["batting","rbi","RBI"],["pitching","era","ERA"],["pitching","so","K"]];
  const leaders=definitions.map(([type,key,label])=>{
    const player=ROSTER.filter(candidate=>{
      const roles=positionTypes(candidate[2]);
      return (type==="batting"?roles.fielder:roles.pitcher)&&statValue(candidate,type,key)!=="";
    }).sort((a,b)=>{
      const order=sortableValue(statValue(a,type,key))>sortableValue(statValue(b,type,key))?1:-1;
      return order*(label==="ERA"?1:-1);
    })[0];
    return player?{player,value:statValue(player,type,key),label}:null;
  }).filter(Boolean);
  if(!leaders.length)return `<p class="empty-state">2026-27 team leaders will appear when official statistics are available.</p>`;
  return `<div class="leaders-grid">${leaders.map(leader=>`<a class="leader-item" href="Player.html?id=${encodeURIComponent(leader.player[10])}"><img src="${escapeHtml(getPlayerPhoto(leader.player[10])||IU_LOGO)}" alt="" onerror="useIuFallback(this)"><div><strong>${escapeHtml(leader.player[1])}</strong><span>${leader.label}</span><b>${escapeHtml(leader.value)}</b></div></a>`).join("")}</div>`;
}

function openGamePreview(scheduleIndex,dateIndex){
  const game=SCH[scheduleIndex];
  if(!game)throw new Error(`Schedule entry not found: ${scheduleIndex}`);
  if(!game[5][dateIndex])throw new Error(`Game date not found for ${game[0]}.`);
  location.href=`Game.html?series=${scheduleIndex}&game=${dateIndex}`;
}

function calendarDate(dateLabel){
  const match=/^([A-Za-z]{3})\s+(\d{1,2})/.exec(dateLabel);
  const month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].indexOf(match?.[1]);
  if(month<0||!match)throw new Error(`Unsupported schedule date: ${dateLabel}`);
  return {year:2027,month:month+1,day:Number(match[2])};
}

function calendarDateStamp({year,month,day}){
  return `${year}${String(month).padStart(2,"0")}${String(day).padStart(2,"0")}`;
}

function nextCalendarDate({year,month,day}){
  const next=new Date(Date.UTC(year,month-1,day+1));
  return {year:next.getUTCFullYear(),month:next.getUTCMonth()+1,day:next.getUTCDate()};
}

function calendarUtcStamp(date,time){
  const match=/^(\d{1,2})(?::(\d{2}))?\s*([ap])\.?m\.?$/i.exec(time.trim());
  if(!match)return null;
  const hour=Number(match[1])%12+(match[3].toLowerCase()==="p"?12:0);
  const minute=Number(match[2]||0);
  const localAsUtc=Date.UTC(date.year,date.month-1,date.day,hour,minute);
  const parts=new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date(localAsUtc));
  const localParts=Object.fromEntries(parts.filter(part=>part.type!=="literal").map(part=>[part.type,Number(part.value)]));
  const easternOffset=Date.UTC(localParts.year,localParts.month-1,localParts.day,localParts.hour,localParts.minute)-localAsUtc;
  return new Date(localAsUtc-easternOffset);
}

function calendarEvent(scheduleIndex,dateIndex){
  const game=SCH[scheduleIndex];
  if(!game)throw new Error(`Schedule entry not found: ${scheduleIndex}`);
  const dateLabel=game[5][dateIndex];
  if(!dateLabel)throw new Error(`Game date not found for ${game[0]}.`);
  const date=calendarDate(dateLabel);
  const start=calendarUtcStamp(date,game[4]);
  const end=start?new Date(start.getTime()+3*60*60*1000):null;
  const summary=`Indiana Baseball ${game[2]==="vs"?"vs.":"at"} ${game[0]}`;
  const escapeText=value=>String(value).replace(/\\/g,"\\\\").replace(/\n/g,"\\n").replace(/,/g,"\\,").replace(/;/g,"\\;");
  const startLine=start?`DTSTART:${start.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"")}`:`DTSTART;VALUE=DATE:${calendarDateStamp(date)}`;
  const endLine=end?`DTEND:${end.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"")}`:`DTEND;VALUE=DATE:${calendarDateStamp(nextCalendarDate(date))}`;
  return [
    "BEGIN:VEVENT",
    `UID:iu-baseball-2027-${scheduleIndex}-${dateIndex}@iubaseball`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"")}`,
    startLine,
    endLine,
    `SUMMARY:${escapeText(summary)}`,
    `LOCATION:${escapeText(game[3])}`,
    `DESCRIPTION:${escapeText(start?`Game time ${game[4]} Eastern.`:"Game time to be announced.")}`,
    "END:VEVENT"
  ].join("\r\n");
}

function downloadCalendarEvents(events,filename){
  const calendar=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//IU Baseball//Schedule//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH",...events,"END:VCALENDAR"].join("\r\n");
  const url=URL.createObjectURL(new Blob([calendar],{type:"text/calendar;charset=utf-8"}));
  const link=document.createElement("a");
  link.href=url;
  link.download=filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

function downloadGameCalendar(scheduleIndex,dateIndex){
  downloadCalendarEvents([calendarEvent(scheduleIndex,dateIndex)],`iu-baseball-${scheduleIndex}-${dateIndex}.ics`);
}

function downloadFullCalendar(){
  const events=SCH.flatMap((game,scheduleIndex)=>game[5].map((_,dateIndex)=>calendarEvent(scheduleIndex,dateIndex)));
  downloadCalendarEvents(events,"iu-baseball-2027-schedule.ics");
}

function openBoxScore(id){
  const result=RESULTS.find(game=>String(game.id)===String(id));
  if(!result)throw new Error(`Box score not found: ${id}`);
  document.getElementById("mTitle").textContent=`Box Score · ${result.opponent}`;
  const innings=result.innings||[];
  const lineScore=`<div class="table-scroll"><table class="stats-table"><thead><tr><th>Team</th>${innings.map((_,index)=>`<th>${index+1}</th>`).join("")}<th>R</th><th>H</th><th>E</th></tr></thead><tbody>${(result.linescore||[]).map(team=>`<tr><th>${escapeHtml(team.name)}</th>${team.runs.map(run=>`<td>${escapeHtml(run)}</td>`).join("")}<td>${escapeHtml(team.r)}</td><td>${escapeHtml(team.h)}</td><td>${escapeHtml(team.e)}</td></tr>`).join("")}</tbody></table></div>`;
  const playerTable=(title,rows)=>`<h3>${title}</h3>${rows?.length?`<div class="table-scroll"><table class="stats-table"><tbody>${rows.map(row=>`<tr>${Object.values(row).map(value=>`<td>${escapeHtml(value)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:`<p class="empty-state">No ${title.toLowerCase()} stats were provided.</p>`}`;
  document.getElementById("mBody").innerHTML=`${lineScore}${playerTable("Batting",result.batting)}${playerTable("Pitching",result.pitching)}<h3>Scoring Plays</h3>${result.scoringPlays?.length?`<ul>${result.scoringPlays.map(play=>`<li>${escapeHtml(play)}</li>`).join("")}</ul>`:`<p class="empty-state">No scoring plays were provided.</p>`}`;
  document.getElementById("modalBg").classList.add("open");
}

function searchPage(){
  const query=new URLSearchParams(location.search).get("q")?.trim()||"";
  if(!query)return `<div class="wrap"><h2>Search</h2><p class="empty-state">Enter a player, opponent, or headline in the search box.</p></div>`;
  const term=query.toLowerCase();
  const players=ROSTER.filter(p=>p.slice(0,10).join(" ").toLowerCase().includes(term));
  const games=SCH.flatMap((game,index)=>game[5].map((date,dateIndex)=>({game,index,date,dateIndex}))).filter(item=>`${item.game[0]} ${item.game[3]} ${item.game[7]}`.toLowerCase().includes(term));
  const stories=NEWS.filter(story=>`${story.title} ${story.blurb}`.toLowerCase().includes(term));
  return `<div class="wrap"><h2>Search results for “${escapeHtml(query)}”</h2>${players.length?`<h3>Players</h3><div class="grid roster-grid">${players.map(player).join("")}</div>`:""}${games.length?`<h3>Schedule</h3><div class="search-results">${games.map(item=>`<button type="button" onclick="openGamePreview(${item.index},${item.dateIndex})">${escapeHtml(item.game[2])} ${escapeHtml(item.game[0])} · ${escapeHtml(item.date)}</button>`).join("")}</div>`:""}${stories.length?`<h3>News</h3><div class="grid">${stories.map(newsCard).join("")}</div>`:""}${!players.length&&!games.length&&!stories.length?`<p class="empty-state">No players, opponents, or stories matched your search.</p>`:""}</div>`;
}

const VIEWS = {
  index(){
    const feature = NEWS[1];
    return `${heroCarousel()}
    <div class="wrap">
      ${countdownBlock()}
      <h2>Top Stories</h2>
      <div class="grid">${NEWS.filter(n=>n!==feature).slice(0,5).map(newsCard).join("")}</div>
      <div class="two">
        <div><h2>Upcoming Games</h2>${SCH.slice(0,2).map(gameRow).join("")}<p><a href="Schedule.html" style="color:var(--c);font-weight:700">Full 2027 schedule &rarr;</a></p></div>
        <div><h2>Head Coach</h2>${coachCard(COACHES[0])}<p style="margin-top:16px"><a href="Roster.html" style="color:var(--c);font-weight:700">Full roster &amp; staff &rarr;</a></p></div>
      </div>
      <h2>Videos</h2>
      <div class="grid">${VIDS.map(videoCard).join("")}</div>
    </div>`;
  },
  news(){
    return `<div class="wrap"><h2>Baseball News</h2><div class="grid">${NEWS.map(newsCard).join("")}</div></div>`;
  },
  schedule(){
    return `<div class="wrap schedule-page">
      <div class="schedule-title"><div><span class="schedule-eyebrow">Indiana Hoosiers Baseball</span><h2>2027 Schedule</h2><p>Game times Eastern · Big Ten times to be announced</p></div><div class="schedule-title-actions"><a class="schedule-countdown-link" href="Live-stats.html">Game center &rarr;</a><button class="print-button calendar-download" type="button" onclick="downloadFullCalendar()">Download calendar</button>${printButton("schedule")}</div></div>
      ${countdownBlock(true)}
      ${rotationSection()}
      <div class="schedule-season-heading"><h3>Upcoming Games</h3><span>13 series · February–May</span></div>
      <div class="schedule-filters" role="group" aria-label="Filter schedule">
        <button class="on" type="button" onclick="filterSchedule('all',this)">All games</button>
        <button type="button" onclick="filterSchedule('home',this)">Home</button>
        <button type="button" onclick="filterSchedule('away',this)">Away</button>
        <button type="button" onclick="filterSchedule('conference',this)">Big Ten</button>
        <button type="button" onclick="filterSchedule('nonconference',this)">Non-Conference</button>
      </div>
      <p id="scheduleCount" class="schedule-count" aria-live="polite">Showing all opponents</p>
      <div class="schedule-grid">${SCH.map(scheduleSeries).join("")}</div>
    </div>`;
  },
  stats(){
    const seasonOptions=["2027",...Object.keys(TEAM_HISTORY).sort((a,b)=>Number(b)-Number(a))];
    const requestedSeason=new URLSearchParams(location.search).get("season");
    const season=seasonOptions.includes(requestedSeason)?requestedSeason:"2027";
    activeStatsSeason=season;
    const data=TEAM_HISTORY[season];
    if(!data)return `<div class="wrap stats-page"><div class="page-heading"><div><span class="schedule-eyebrow">Indiana Hoosiers Baseball</span><h2>${escapeHtml(season)} Season Stats</h2></div>${teamSeasonControl(season)}</div><p class="empty-state">2027 stats have not been posted yet. Select a previous season to view its stats.</p></div>`;
    const statTable=(heading,rows)=>rows.length?`<section class="panel history-panel"><h3>${heading}</h3><table class="mini-table"><tbody>${rows.map(([label,value])=>`<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join("")}</tbody></table></section>`:"";
    const individualTable=(type,heading)=>{
      const rows=INDIVIDUAL_STATS[season]?.[type]||officialPlayerStatsRows(season,type);
      return `<section class="panel history-panel"><h3>${heading}</h3>${rows.length?sortedStatsTable(type):`<p class="empty-state">Individual ${type} statistics are not available for this season.</p>`}</section>`;
    };
    return `<div class="wrap stats-page"><div class="page-heading"><div><span class="schedule-eyebrow">Indiana Hoosiers Baseball</span><h2>${escapeHtml(season)} Season Stats</h2></div>${teamSeasonControl(season)}</div>
      <section class="record-summary"><div><span>Overall</span><strong>${escapeHtml(data.record)}</strong></div><div><span>Big Ten</span><strong>${escapeHtml(data.conferenceRecord)}</strong></div></section>
      <p class="date">Official team totals. Records are shown as overall and Big Ten.</p>
      <div class="history-stats-grid">${statTable("Batting",data.batting)}${statTable("Pitching",data.pitching)}${statTable("Fielding",data.fielding)}</div>
      <h2>Individual Player Stats</h2><p class="date">Player tables include roster members with statistics available for the selected season.</p><div class="team-stats-row individual-stats-grid">${individualTable("batting","Batting")}${individualTable("pitching","Pitching")}</div>
      <section class="panel season-notes"><h3>Season Notes</h3><ul>${data.highlights.map(note=>`<li>${escapeHtml(note)}</li>`).join("")}</ul></section>
    </div>`;
  },
  game(){
    const params=new URLSearchParams(location.search);
    if(!params.has("series")||!params.has("game"))return `<div class="wrap"><h2>Game preview not found</h2><a href="Schedule.html">Back to schedule</a></div>`;
    const seriesIndex=Number(params.get("series"));
    const gameIndex=Number(params.get("game"));
    const series=SCH[seriesIndex];
    const gameDate=series?.[5]?.[gameIndex];
    if(!series||!gameDate)return `<div class="wrap"><h2>Game preview not found</h2><a href="Schedule.html">Back to schedule</a></div>`;
    const result=RESULTS.find(item=>item.opponent===series[0]&&item.date===gameDate);
    const lineupCard=team=>`<article class="lineup-team"><h4>${escapeHtml(team)}</h4><div class="lineup-starter"><span>Starting pitcher</span><strong>Not announced</strong></div><ol aria-label="${escapeHtml(team)} batting order">${Array.from({length:9},(_,index)=>`<li><span>${index+1}</span><b>Lineup spot</b><small>Not announced</small></li>`).join("")}</ol></article>`;
    return `<div class="wrap game-preview-page">
      <a class="back-link" href="Schedule.html">&larr; Back to schedule</a>
      <section class="game-preview-card">
        <header class="game-preview-hero">
          <div class="game-preview-meta"><span>2027 Indiana Baseball</span><span>${escapeHtml(gameDate)} · ${escapeHtml(series[4])}</span></div>
          <span class="game-preview-badge">${series[6]?escapeHtml(series[7]):"Non-Conference"}</span>
          <h2><span>Indiana</span><span class="game-preview-versus">${series[2]==="vs"?"VS":"AT"}</span><span>${escapeHtml(series[0])}</span></h2>
        </header>
        <dl class="game-facts">
          <div><dt>Opponent record</dt><dd>Not available</dd></div>
          <div><dt>Probable starters</dt><dd>Not announced</dd></div>
          <div><dt>Location</dt><dd>${escapeHtml(series[3])}</dd></div>
          <div><dt>Broadcast</dt><dd>Not announced</dd></div>
        </dl>
        <section class="game-lineups" aria-labelledby="lineups-title">
          <div class="game-lineups-heading"><div><span>Game day</span><h3 id="lineups-title">Starting lineups</h3></div><p>Starters will appear here when announced.</p></div>
          <div class="lineups-grid">${lineupCard("Indiana")}${lineupCard(series[0])}</div>
        </section>
        <p class="game-preview-note">Preview details will be updated when officially announced.</p>
        <div class="game-preview-actions">${result?resultCard(result):`<a class="button-link" href="Live-stats.html">Game center</a>`}</div>
      </section>
    </div>`;
  },
  coach(){
    const id=new URLSearchParams(location.search).get("id")||"";
    const coach=COACHES.find(item=>item[2]===id);
    const profile=COACH_PROFILES[id];
    if(!coach||!profile)return `<div class="wrap"><h2>Coach profile not found</h2><a href="Roster.html">Back to roster</a></div>`;
    const biography=Array.isArray(profile.bio)?profile.bio:[profile.bio];
    const career=profile.journey||profile.highlights||[];
    return `<div class="wrap coach-profile-page"><a class="back-link" href="Roster.html">&larr; Back to roster</a>
      <article class="panel coach-profile"><img src="${img(SA+"images/"+coach[4]+"/"+coach[3],360,480)}" alt="${escapeHtml(coach[0])}">
        <div class="coach-profile-content"><span class="schedule-eyebrow">Indiana Hoosiers Baseball</span><h2>${escapeHtml(coach[0])}</h2><p class="coach-role">${escapeHtml(coach[1])}</p>
        <div class="coach-biography">${biography.map(paragraph=>`<p>${escapeHtml(paragraph)}</p>`).join("")}</div>
        <h3>Coaching Journey &amp; Highlights</h3><ul>${career.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <a class="button-link" href="Roster.html">View coaching staff</a></div>
      </article>
    </div>`;
  },
  search(){return searchPage();},
  alumni(){
    const currentPlayers=MLB_ALUMNI.filter(alumnus=>MLB_ALUMNI_DETAILS[alumnus.name].status==="Active MLB player");
    const otherAlumni=MLB_ALUMNI.filter(alumnus=>MLB_ALUMNI_DETAILS[alumnus.name].status!=="Active MLB player");
    return `<div class="wrap alumni-page">
      <section class="alumni-roster-section"><div class="section-heading"><h2>Current Hoosiers in the Pros</h2></div>
        <div class="grid alumni-grid">${currentPlayers.map(alumniCard).join("")}</div>
      </section>
      <section class="alumni-roster-section"><div class="section-heading"><h2>Other Hoosier MLB Alumni</h2></div>
        <div class="grid alumni-grid">${otherAlumni.map(alumniCard).join("")}</div>
      </section>
      <section class="draft-history-section">
        <div class="section-heading"><h2>IU Draft Picks</h2></div>
        <div class="draft-controls no-print"><label for="draftSort">Sort by</label><select id="draftSort" onchange="sortDraftHistory(this.value)"><option value="year">Year</option><option value="team">Team</option><option value="round">Round</option><option value="position">Position</option></select><button id="draftSortOrder" type="button" onclick="toggleDraftSort()" aria-label="Sort ascending">Descending</button></div>
        <div class="table-scroll draft-table-scroll"><table class="draft-table"><thead><tr><th>Year</th><th>Player</th><th>Draft position</th><th>Drafted by</th><th>Round</th><th>Pick</th><th>Current level / status</th></tr></thead><tbody id="draftHistoryBody">${draftHistoryRows()}</tbody></table></div>
      </section>
    </div>`;
  },
  player(){
    const params=new URLSearchParams(location.search);
    const id=params.get("id")||"";
    const requestedSeason=params.get("season");
    const currentPlayer=ROSTER.find(player=>player[10]===id);
    const historicPlayer=Object.values(PAST_ROSTERS).map(roster=>roster.players.find(player=>player.id===id)).find(Boolean);
    if(!currentPlayer&&!historicPlayer)return `<div class="wrap"><h2>Player not found</h2><a href="Roster.html">Back to roster</a></div>`;
    const officialProfile=PLAYER_CAREER_STATS.players[id];
    const rosterSeasons=Object.keys(PAST_ROSTERS).filter(season=>PAST_ROSTERS[season].players.some(player=>player.id===id));
    const careerSeasons=Object.keys(officialProfile?.statsBySeason||{});
    const seasonOptions=["2027",...new Set([...careerSeasons,...rosterSeasons])].sort((a,b)=>a==="2027"?-1:b==="2027"?1:Number(b)-Number(a));
    const season=seasonOptions.includes(requestedSeason)?requestedSeason:"2027";
    const playerForSeason=PAST_ROSTERS[season]?.players.find(player=>player.id===id)||historicPlayer;
    const currentRecord=officialProfile?.statsBySeason?.[season];
    const seasonStats=currentRecord?.seasonStats||playerForSeason?.stats;
    const seasonRecord=currentRecord||playerForSeason?.stats?{
      position:currentRecord?.position||playerForSeason?.position,
      gp:currentRecord?.gp||seasonStats?.hittingStats?.games||"",
      gs:currentRecord?.gs||seasonStats?.hittingStats?.gamesStarted||"",
      seasonStats
    }:null;
    const categories=[
      ["Hitting",seasonStats?.hittingStats],
      ["Pitching",seasonStats?.pitchingStats],
      ["Fielding",seasonStats?.fieldingStats]
    ];
    const categoryTables=categories.map(([title,values])=>statDetailTable(title,values)).filter(Boolean).join("");
    const seasonHistory=rosterSeasons.length||careerSeasons.length?`<div class="table-scroll"><table class="mini-table"><thead><tr><th>Season</th><th>Games</th><th>Starts</th><th>AVG</th><th>ERA</th></tr></thead><tbody>${seasonOptions.filter(seasonYear=>seasonYear!=="2027"&&(rosterSeasons.includes(seasonYear)||careerSeasons.includes(seasonYear))).map(seasonYear=>{
      const record=officialProfile?.statsBySeason?.[seasonYear];
      const rosterRecord=PAST_ROSTERS[seasonYear]?.players.find(player=>player.id===id);
      const batting=record?.seasonStats?.hittingStats||rosterRecord?.stats?.hittingStats;
      const pitching=record?.seasonStats?.pitchingStats||rosterRecord?.stats?.pitchingStats;
      return `<tr><th><a href="Player.html?id=${encodeURIComponent(id)}&season=${encodeURIComponent(seasonYear)}">${escapeHtml(seasonYear)}</a></th><td>${escapeHtml(record?.gp||batting?.games||"—")}</td><td>${escapeHtml(record?.gs||batting?.gamesStarted||"—")}</td><td>${escapeHtml(batting?.avg||"—")}</td><td>${escapeHtml(pitching?.earnedRunAverage||"—")}</td></tr>`;
    }).join("")}</tbody></table></div>`:`<p class="empty-state">No prior season statistics are available for this player.</p>`;
    const displayPlayer=PAST_ROSTERS[season]?.players.find(player=>player.id===id)||historicPlayer;
    const [num,name,pos,year,height,weight,batsThrows,hometown,school,previousSchool]=currentPlayer&&season==="2027"
      ?currentPlayer
      :[displayPlayer.number,displayPlayer.name,displayPlayer.position,displayPlayer.classYear,displayPlayer.height,displayPlayer.weight,displayPlayer.batsThrows,displayPlayer.hometown,displayPlayer.school,""];
    const photo=season==="2027"&&currentPlayer?getPlayerPhoto(id)||IU_LOGO:IU_LOGO;
    const photoAlt=season==="2027"&&currentPlayer?name:"Indiana University logo";
    const weightText=String(weight||"—").endsWith("lbs")?weight:`${weight||"—"} lbs`;
    const rosterLink=season==="2027"?"Roster.html":`Roster.html?season=${encodeURIComponent(season)}`;
    return `<div class="wrap">
      <a class="back-link" href="${rosterLink}">&larr; Back to ${season==="2027"?"roster":`${escapeHtml(season)} roster`}</a>
      <div class="player-profile">
        <img class="profile-photo" src="${escapeHtml(photo)}" alt="${escapeHtml(photoAlt)}" onerror="useIuFallback(this)">
        <section class="panel profile-bio"><span class="profile-number">#${escapeHtml(num)}</span><h2>${escapeHtml(name)}</h2><p>${escapeHtml(pos)} · ${escapeHtml(year)}</p>
          <dl><dt>Height / Weight</dt><dd>${escapeHtml(height||"—")} / ${escapeHtml(weightText)}</dd><dt>Bats / Throws</dt><dd>${escapeHtml(batsThrows||"—")}</dd><dt>Hometown</dt><dd>${escapeHtml(hometown||"—")}</dd><dt>High School</dt><dd>${escapeHtml(school||"—")}</dd><dt>Previous School</dt><dd>${escapeHtml(previousSchool||"—")}</dd></dl>
        </section>
      </div>
      ${officialProfile?.bio&&officialProfile.bio.length>50?`<section class="panel player-bio-notes"><h2>Player Bio</h2><div class="player-bio-copy">${escapeHtml(officialProfile.bio)}</div></section>`:""}
      <section class="panel profile-stats"><div class="page-heading"><h2>${escapeHtml(season)} Season Stats</h2>${seasonControl(season,seasonOptions)}</div>
        ${seasonRecord?`<p class="date">${escapeHtml(seasonRecord.position||pos)} · ${escapeHtml(seasonRecord.gp||"—")} games · ${escapeHtml(seasonRecord.gs||"—")} starts</p>`:`<p class="empty-state">${season==="2027"?"2027 stats have not been posted yet. Select a previous season to view stats.":`Individual stats are not available for ${escapeHtml(season)}.`}</p>`}
        <div class="player-season-stats">${categoryTables||""}</div>
      </section>
      <section class="panel"><h2>Season-by-Season</h2>${seasonHistory}</section>
      <section class="panel"><h2>Game Log</h2><p class="empty-state">The official roster profiles provide season-by-season totals and game highlights, but do not publish individual game logs.</p></section>
    </div>`;
  },
  videos(){
    return `<div class="wrap"><h2>Baseball Videos</h2><div class="grid">${VIDS.map(videoCard).join("")}</div></div>`;
  },
  photos(){
    const pics=[...NEWS.map(n=>({src:n.img,cap:n.title})),...VIDS.map(v=>({src:SA+"images/"+v.thumb,cap:v.title}))];
    return `<div class="wrap"><h2>Photo Gallery</h2><div class="photo-grid">${pics.map(p=>`<img loading="lazy" src="${img(p.src,500,375)}" alt="${p.cap}" title="${p.cap}">`).join("")}</div></div>`;
  },
  livestats(){
    const live=LIVE_GAME?.status==="live";
    return `<div class="wrap"><h2>Live Stats</h2>
    <div class="ls-board"><div class="ls-head">Indiana Hoosiers Baseball</div>
    <div class="ls-status"><strong>${live?"Game in progress":"No game in progress"}</strong><p>${live?`${escapeHtml(LIVE_GAME.away||"Opponent")} ${escapeHtml(LIVE_GAME.awayScore??0)} at ${escapeHtml(LIVE_GAME.home||"Indiana")} ${escapeHtml(LIVE_GAME.homeScore??0)} · ${escapeHtml(LIVE_GAME.inning||"In progress")}`:`Next up: ${NEXT_GAME.when} &mdash; ${NEXT_GAME.where}.`}</p>
    <p>${live?"Live game feed connected.":"This in-site game center is ready for live score, inning-by-inning linescore, and player stats. A live data feed is not connected yet."}</p></div></div>
    <section class="panel"><h2>Win Probability</h2>${winProbabilityChart(LIVE_GAME)}</section>
    <p><a href="Schedule.html" style="color:var(--c);font-weight:700">View the full schedule &rarr;</a></p></div>`;
  },
  roster(){
    const season=new URLSearchParams(location.search).get("season")||"2026-27";
    if(season!=="2026-27")return PAST_ROSTERS[season]?historicalRosterView(season):`<div class="wrap"><div class="page-heading"><h2>Roster</h2>${seasonControl(season,["2026-27",...Object.keys(PAST_ROSTERS).sort((a,b)=>Number(b)-Number(a))])}</div><p class="empty-state">Roster data for ${escapeHtml(season)} has not been added.</p></div>`;
    return `<div class="wrap"><div class="page-heading"><h2>2027 Baseball Roster</h2><div class="schedule-title-actions">${seasonControl(season,["2026-27",...Object.keys(PAST_ROSTERS).sort((a,b)=>Number(b)-Number(a))])}${printButton("roster")}</div></div>
    <div class="roster-filters" role="group" aria-label="Filter roster">${[["all","All"],["pitchers","Pitchers"],["catchers","Catchers"],["infield","Infield"],["outfield","Outfield"]].map(([filter,label],index)=>`<button type="button" class="${index===0?"on":""}" onclick="filterRoster('${filter}',this)">${label}</button>`).join("")}</div>
    <p id="rosterCount" class="schedule-count">Showing ${ROSTER.length} of ${ROSTER.length} players</p>
    <div class="grid roster-grid">${ROSTER.map(player).join("")}</div>
    <h2>Coaching Staff</h2><div class="grid">${COACHES.map(coachCard).join("")}</div>
    <h2>Support Staff</h2><div class="grid">${STAFF.map(s=>`<div class="co"><img src="${img(SA+"images/"+s[4]+"/"+s[3],140,190)}" alt="${s[0]}"><div><b>${s[0]}</b><br><small class="date">${s[1]}</small></div></div>`).join("")}</div>
    </div>`;
  }
};

function openNews(id){
  const n=NEWS.find(x=>x.id===id);
  document.getElementById("mTitle").innerHTML="News";
  document.getElementById("mBody").innerHTML=`<img src="${img(n.img,900,506)}" style="width:100%;object-fit:contain;background:#f7f0e4;margin-bottom:12px" alt=""><h3 style="margin:0 0 4px">${n.title}</h3><p class="date">${n.date}</p><p>${n.blurb}</p>`;
  document.getElementById("modalBg").classList.add("open");
}
function openVideo(id){
  const v=VIDS.find(x=>x.id===id);
  document.getElementById("mTitle").innerHTML="Video";
  document.getElementById("mBody").innerHTML=`<img src="${img(SA+"images/"+v.thumb,900,506)}" style="width:100%;object-fit:contain;background:#f7f0e4;margin-bottom:12px" alt="${v.title}"><h3 style="margin:0 0 4px">${v.title}</h3><p class="date">${v.date}</p><p class="note">The video thumbnail is shown here; hosted playback is not connected yet.</p>`;
  document.getElementById("modalBg").classList.add("open");
}
function openPlayer(id,tab){
  const p=ROSTER.find(r=>r[10]===id);
  if(!p)throw new Error(`Roster player not found: ${id}`);
  const [num,name,pos,yr,ht,wt,bt,home,school,prev]=p;
  const officialProfile=PLAYER_CAREER_STATS.players[id];
  const season="2027";
  const seasonRecord=officialProfile?.statsBySeason?.[season];
  const seasonStats=seasonRecord?.seasonStats;
  const categories=[["Hitting",seasonStats?.hittingStats],["Pitching",seasonStats?.pitchingStats],["Fielding",seasonStats?.fieldingStats]];
  const categoryTables=categories.map(([title,values])=>statDetailTable(title,values)).filter(Boolean).join("");
  const bio=officialProfile?.bio&&officialProfile.bio.length>50?`<div class="player-bio-copy">${escapeHtml(officialProfile.bio)}</div>`:`<p class="empty-state">No player biography has been published for this roster entry.</p>`;
  const showStatsTab=tab==="stats";
  document.getElementById("mTitle").textContent=name;
  document.getElementById("mBody").innerHTML=`
    <div class="tabs">
      <button class="tb ${tab==='bio'?'on':''}" onclick="showTab('bio')">Bio</button>
      <button class="tb ${tab==='stats'?'on':''}" onclick="showTab('stats')">Stats</button>
    </div>
    <div class="tabpane ${tab==='bio'?'on':''}" id="pane-bio">
      ${bio}
      <table>
        <tr><td>Number</td><td>#${num}</td></tr>
        <tr><td>Position</td><td>${pos}</td></tr>
        <tr><td>Class</td><td>${yr}</td></tr>
        <tr><td>Height / Weight</td><td>${ht} / ${wt} lbs</td></tr>
        <tr><td>Bats / Throws</td><td>${bt}</td></tr>
        <tr><td>Hometown</td><td>${home}</td></tr>
        <tr><td>High School</td><td>${school||'\u2014'}</td></tr>
        <tr><td>Previous School</td><td>${prev||'\u2014'}</td></tr>
      </table>
    </div>
    <div class="tabpane ${showStatsTab?'on':''}" id="pane-stats">
      <h4 style="margin:0 0 8px">${season} Season</h4>
      ${seasonRecord?`<p class="date">${escapeHtml(seasonRecord.gp||"—")} games · ${escapeHtml(seasonRecord.gs||"—")} starts</p><div class="player-season-stats">${categoryTables}</div>`:`<p class="empty-state">2027 stats have not been posted yet.</p>`}
      <p><a href="Player.html?id=${encodeURIComponent(id)}">View player profile and previous seasons &rarr;</a></p>
    </div>`;
  document.getElementById("modalBg").classList.add("open");
}
function showTab(t){
  document.querySelectorAll(".tb").forEach(b=>b.classList.toggle("on",b.textContent.toLowerCase()===t));
  document.querySelectorAll(".tabpane").forEach(p=>p.classList.toggle("on",p.id==="pane-"+t));
}
function closeModal(){document.getElementById("modalBg").classList.remove("open");}
document.addEventListener("click",e=>{if(e.target.id==="modalBg")closeModal();});

async function loadRosterJson(){
  if(location.protocol==="file:")return;
  const response=await fetch("Roster.json");
  if(!response.ok)throw new Error(`Roster.json request failed (${response.status}).`);
  const data=await response.json();
  if(!data||!Array.isArray(data.players)||!data.players.length)throw new Error("Roster.json must contain a non-empty players array.");
  const ids=new Set();
  const nextRoster=data.players.map(p=>{
    if(!p||typeof p!=="object"||!p.id||!p.name||!p.position||!p.classYear||!Number.isInteger(p.jersey))throw new Error("Each roster entry needs an ID, name, position, class year, and jersey number.");
    const id=String(p.id);
    if(ids.has(id))throw new Error(`Duplicate roster player ID: ${id}.`);
    ids.add(id);
    if(typeof p.photo!=="string"||(p.photo&&(p.photo.startsWith("//")||(/^[a-z][a-z0-9+.-]*:/i.test(p.photo)&&!/^https?:\/\//i.test(p.photo)))))throw new Error(`Invalid photo path for ${p.name}. Use an HTTP(S) URL or a relative image path.`);
    PHOTOS[id]=p.photo;
    PLAYER_STATS[id]=p.stats||{};
    return [String(p.jersey),p.name,p.position,p.classYear,p.height||"",p.weight??"",`${p.bats||""}/${p.throws||""}`,p.hometown||"",p.highSchool||"",p.previousSchool||"",id];
  });
  ROSTER=nextRoster;
}

async function initializeSite(){
  const hideLoadingScreen=showLoadingScreen();
  try{
    const app=document.getElementById("app");
    const view=app.dataset.view;
    setupSharedNavigation();
    let rosterWarning="";
    if(location.protocol!=="file:"){
      try{await loadRosterJson();}catch(error){
        console.error("Could not load Roster.json; using the built-in roster.",error);
        rosterWarning=`Roster.json could not be loaded: ${error.message}. The built-in roster is being shown instead.`;
      }
    }
    app.innerHTML=(VIEWS[view]||VIEWS.index)();
    if(rosterWarning)app.insertAdjacentHTML("afterbegin",`<p class="note">${rosterWarning.replace(/</g,"&lt;")}</p>`);
    if(LIVE_GAME?.status==="live")gameDayScoreBar(LIVE_GAME);
    if(view==="index"||view==="schedule")startCountdown();
    if(view==="index"&&NEWS.length>1&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches)startFeaturedTimer();
  }finally{
    await hideLoadingScreen();
  }
}

initializeSite();