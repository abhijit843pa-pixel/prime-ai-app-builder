import React,{useEffect,useMemo,useState} from "react";
import {createRoot} from "react-dom/client";
import {Bot,Code2,Rocket,ShieldCheck,Palette,Bug,Search,BarChart3,Settings,Plus,Play,Download,Eye,Users,Zap,Menu,X,Database,KeyRound,LogOut,CheckCircle2,AlertTriangle,Globe2,Smartphone,Lock,Activity,UserPlus} from "lucide-react";
import "./styles.css";

const KEY="prime_v2_state";
const agents=[
["manager","AI Manager","Plans work and delegates tasks.",Bot],
["developer","Developer Agent","Creates and edits code.",Code2],
["designer","UI/UX Agent","Designs responsive interfaces.",Palette],
["tester","Testing Agent","Runs project checks.",Bug],
["security","Security Agent","Checks common security risks.",ShieldCheck],
["deploy","Deployment Agent","Prepares safe deployments.",Rocket],
["seo","SEO Agent","Prepares metadata and SEO.",Search],
["analytics","Analytics Agent","Tracks builds and usage.",BarChart3]
];
const starter=`<!doctype html>
<html>
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Prime Project</title>
<style>
body{margin:0;font-family:system-ui;background:#0b1020;color:#fff}
main{min-height:100vh;display:grid;place-items:center;padding:24px}
.card{max-width:720px;text-align:center;padding:48px;border:1px solid #27304a;border-radius:28px;background:#121a31}
button{padding:13px 20px;border:0;border-radius:12px;cursor:pointer}
</style></head>
<body><main><section class="card"><h1>Build with Prime AI</h1><p>Your project is ready.</p><button onclick="alert('Prime is working!')">Test</button></section></main></body></html>`;

function load(){
 try{return JSON.parse(localStorage.getItem(KEY))||null}catch{return null}
}
const defaultState={
 session:null,projects:[{id:1,name:"Prime Demo",code:starter,status:"Draft",updated:"Just now"}],
 agents:Object.fromEntries(agents.map(a=>[a[0],true])),
 logs:["Prime V2 initialized.","Owner controls loaded."],
 settings:{aiProvider:"Not configured",deployment:"Not connected",maintenance:false}
};

function App(){
 const [state,setState]=useState(load()||defaultState);
 const [page,setPage]=useState("dashboard"),[mobile,setMobile]=useState(false),[auth,setAuth]=useState(!state.session);
 useEffect(()=>localStorage.setItem(KEY,JSON.stringify(state)),[state]);
 const [projectId,setProjectId]=useState(1);
 const project=state.projects.find(p=>p.id===projectId)||state.projects[0];
 const update=(patch)=>setState(s=>({...s,...patch}));
 const log=(msg)=>update({logs:[`${new Date().toLocaleTimeString()} — ${msg}`,...state.logs].slice(0,20)});
 function signIn(name,email){update({session:{name,email,role:"owner"}});setAuth(false);log("Owner signed in.");}
 function logout(){update({session:null});setAuth(true)}
 function newProject(){
  const p={id:Date.now(),name:"New Prime Project",code:starter,status:"Draft",updated:"Just now"};
  update({projects:[p,...state.projects]});setProjectId(p.id);setPage("builder");log("New project created.");
 }
 function saveProject(patch){update({projects:state.projects.map(p=>p.id===project.id?{...p,...patch,updated:"Just now"}:p)})}
 function build(){
  saveProject({status:"Built"});log("Manager delegated Developer → Tester → Security checks.");log("Build completed locally.");
 }
 function deploy(){
  saveProject({status:"Deployment Ready"});log("Deployment package prepared. Connect a hosting provider to publish publicly.");
  setPage("deploy");
 }
 if(auth) return <Auth onSignIn={signIn}/>;
 const nav=[["dashboard","Dashboard",BarChart3],["builder","AI Builder",Bot],["projects","Projects",Code2],["agents","AI Teams",Users],["deploy","Deploy",Rocket],["owner","Owner Control",ShieldCheck],["settings","Settings",Settings]];
 return <div className="app">
  <aside className={"sidebar "+(mobile?"open":"")}>
   <div className="brand"><div className="logo">P</div><div><b>PRIME</b><span>AI APP BUILDER V2</span></div><button className="close" onClick={()=>setMobile(false)}><X/></button></div>
   <div className="owner"><div className="avatar">{state.session.name?.[0]||"O"}</div><div><b>{state.session.name}</b><span>Master Owner</span></div><span className="live"/></div>
   <nav>{nav.map(([id,label,I])=><button className={page===id?"active":""} key={id} onClick={()=>{setPage(id);setMobile(false)}}><I/><span>{label}</span></button>)}</nav>
   <div className="kill"><ShieldCheck/><div><b>Owner-controlled</b><small>Agents, keys, quotas and deployment stay under your control.</small></div></div>
  </aside>
  <main className="main">
   <header><button className="hamb" onClick={()=>setMobile(true)}><Menu/></button><div><small>PRIME WORKSPACE</small><h1>{nav.find(x=>x[0]===page)?.[1]}</h1></div><div className="header-actions"><span className="status"><i/> Online</span><button className="primary" onClick={newProject}><Plus/> New Project</button><button className="logout" onClick={logout}><LogOut/></button></div></header>
   {page==="dashboard"&&<Dashboard state={state} newProject={newProject}/>}
   {page==="builder"&&<Builder project={project} saveProject={saveProject} build={build} deploy={deploy} log={log}/>}
   {page==="projects"&&<Projects state={state} setProjectId={setProjectId} setPage={setPage} newProject={newProject}/>}
   {page==="agents"&&<Agents state={state} update={update} log={log}/>}
   {page==="deploy"&&<Deploy state={state} deploy={deploy}/>}
   {page==="owner"&&<Owner state={state} update={update} log={log}/>}
   {page==="settings"&&<SettingsPage state={state} update={update}/>}
  </main>
 </div>
}

function Auth({onSignIn}){
 const [signup,setSignup]=useState(false),[name,setName]=useState("Abhi"),[email,setEmail]=useState("owner@example.com"),[pass,setPass]=useState("");
 return <div className="auth"><div className="auth-card"><div className="auth-logo">P</div><div className="eyebrow">OWNER-FIRST PLATFORM</div><h1>{signup?"Create Owner Workspace":"Welcome to Prime"}</h1><p>{signup?"Create the local demo owner account.":"Sign in to your Prime master workspace."}</p>{signup&&<input placeholder="Owner name" value={name} onChange={e=>setName(e.target.value)}/>}<input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><input type="password" placeholder="Password (demo only)" value={pass} onChange={e=>setPass(e.target.value)}/><button className="primary full" onClick={()=>onSignIn(name||"Owner",email||"owner@example.com")}>{signup?<UserPlus/>:<Lock/>}{signup?"Create & Enter":"Sign In"}</button><button className="link" onClick={()=>setSignup(!signup)}>{signup?"Already have an account? Sign in":"Create owner workspace"}</button><small>V2 demo auth is local-only. Production auth must use a real backend/database.</small></div></div>
}

function Dashboard({state,newProject}){
 return <section className="content"><div className="hero-banner"><div><div className="eyebrow">AI ORCHESTRATION WORKSPACE</div><h2>Build apps with a team of AI agents.</h2><p>Prime coordinates planning, development, design, testing, security, SEO and deployment workflows while keeping master controls with you.</p><button className="primary big" onClick={newProject}><Zap/> Start Building</button></div><div className="orb"><Bot/></div></div><div className="stats"><Stat t="Projects" v={state.projects.length} I={Code2}/><Stat t="Active Agents" v={Object.values(state.agents).filter(Boolean).length} I={Bot}/><Stat t="Builds" v={state.projects.filter(p=>p.status==="Built").length} I={Rocket}/><Stat t="Owner" v="You" I={ShieldCheck}/></div><div className="grid2"><Card title="Agent health">{Object.entries(state.agents).map(([k,v])=><div className="agent-row" key={k}><i className={"dot "+(v?"on":"off")}/><span>{agents.find(a=>a[0]===k)?.[1]}</span><small>{v?"Ready":"Disabled"}</small></div>)}</Card><Card title="Recent activity"><div className="logs">{state.logs.slice(0,10).map((x,i)=><div key={i}>{x}</div>)}</div></Card></div></section>
}
function Stat({t,v,I}){return <div className="stat"><I/><div><small>{t}</small><strong>{v}</strong></div></div>}
function Card({title,children}){return <div className="card"><b className="card-title">{title}</b>{children}</div>}

function Builder({project,saveProject,build,deploy,log}){
 const src=useMemo(()=>`data:text/html;charset=utf-8,${encodeURIComponent(project.code)}`,[project.code]);
 return <section className="content"><div className="builder-top"><div><input className="project-name" value={project.name} onChange={e=>saveProject({name:e.target.value,status:"Draft"})}/><span className="pill">{project.status}</span></div><div className="toolbar"><button className="primary" onClick={()=>{build();log("AI agents finished the requested build checks.")}}><Play/> Build & Test</button><button onClick={()=>{const b=new Blob([project.code],{type:"text/html"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="prime-project.html";a.click()}}><Download/> Export</button><button onClick={deploy}><Rocket/> Deploy</button></div></div><div className="builder-grid"><div className="editor"><div className="editor-head"><Code2/> index.html <span>Sandbox editor</span></div><textarea spellCheck="false" value={project.code} onChange={e=>saveProject({code:e.target.value,status:"Draft"})}/></div><div className="preview"><div className="preview-head"><Eye/> Live Preview <span>Browser sandbox</span></div><iframe title="preview" src={src}/></div></div><div className="tip"><Bot/><div><b>AI Manager</b><p>Use the production backend to connect an AI provider. Keep API keys server-side and run arbitrary user builds in an isolated sandbox.</p></div></div></section>
}

function Projects({state,setProjectId,setPage,newProject}){return <section className="content"><div className="section-head"><div><h2>Projects</h2><p>Your local Prime workspaces.</p></div><button className="primary" onClick={newProject}><Plus/> New Project</button></div><div className="project-grid">{state.projects.map(p=><div className="project-card" key={p.id}><div className="project-icon"><Code2/></div><h3>{p.name}</h3><p>Website / PWA workspace</p><div className="project-meta"><span>{p.status}</span><small>{p.updated}</small></div><button onClick={()=>{setProjectId(p.id);setPage("builder")}}><Eye/> Open Builder</button></div>)}</div></section>}

function Agents({state,update,log}){return <section className="content"><div className="section-head"><div><h2>AI Agent Teams</h2><p>Every agent is permission-controlled by the owner.</p></div></div><div className="agent-grid">{agents.map(([id,name,desc,I])=><div className="agent-card" key={id}><div className="agent-icon"><I/></div><div><h3>{name}</h3><p>{desc}</p></div><label className="switch"><input type="checkbox" checked={state.agents[id]} onChange={e=>{update({agents:{...state.agents,[id]:e.target.checked}});log(`${name} ${e.target.checked?"enabled":"disabled"}.`)}}/><span/></label></div>)}</div></section>}

function Deploy({state,deploy}){return <section className="content"><div className="hero-small"><Rocket/><div><h2>Deployment Center</h2><p>Connect a hosting provider when you want public publishing.</p></div></div><div className="grid2"><Card title="Website deployment"><div className="connection"><Globe2/><div><b>{state.settings.deployment}</b><small>Provider connection</small></div></div><p className="muted">V2 prepares the deployment workflow. A real provider API should be connected server-side before automatic publishing.</p><button className="primary" onClick={deploy}><Rocket/> Prepare Deployment</button></Card><Card title="PWA / Android"><div className="connection"><Smartphone/><div><b>PWA Ready</b><small>Native signing not configured</small></div></div><p className="muted">PWA can be hosted as a web app. APK/AAB generation needs an isolated Android build/signing service.</p><button onClick={()=>alert("Next integration: server-side Android build pipeline.")}>Configure</button></Card></div></section>}

function Owner({state,update,log}){return <section className="content"><div className="section-head"><div><h2>Master Owner Control</h2><p>Emergency and governance controls.</p></div></div><div className="owner-grid"><div className="owner-box"><ShieldCheck/><h3>Global Agent Kill Switch</h3><p>Immediately disable every AI agent.</p><button className="danger" onClick={()=>{update({agents:Object.fromEntries(agents.map(a=>[a[0],false]))});log("GLOBAL KILL SWITCH activated.")}}>Disable All Agents</button></div><div className="owner-box"><Activity/><h3>Restore Team</h3><p>Enable the default agent team.</p><button onClick={()=>{update({agents:Object.fromEntries(agents.map(a=>[a[0],true]))});log("All agents restored.")}}>Enable All Agents</button></div><div className="owner-box"><KeyRound/><h3>AI Gateway</h3><p>Provider credentials belong on your backend.</p><span className="pill">Server-side only</span></div><div className="owner-box"><Database/><h3>Database</h3><p>Connect Supabase/Postgres or another backend in production.</p><span className="pill">Not connected</span></div></div></section>}

function SettingsPage({state,update}){return <section className="content"><div className="section-head"><div><h2>Settings</h2><p>Production integration placeholders.</p></div></div><div className="settings-list"><Setting I={KeyRound} title="AI Provider" value={state.settings.aiProvider} action={()=>update({settings:{...state.settings,aiProvider:"Backend required"}})}/><Setting I={Globe2} title="Deployment Provider" value={state.settings.deployment} action={()=>update({settings:{...state.settings,deployment:"Backend required"}})}/><Setting I={Database} title="Database" value="Local browser storage" action={()=>alert("Production: connect a real database through the backend.")}/><Setting I={ShieldCheck} title="Maintenance Mode" value={state.settings.maintenance?"ON":"OFF"} action={()=>update({settings:{...state.settings,maintenance:!state.settings.maintenance}})}/></div></section>}
function Setting({I,title,value,action}){return <div className="setting"><I/><div><b>{title}</b><p>{value}</p></div><button onClick={action}>Configure</button></div>}

createRoot(document.getElementById("root")).render(<App/>);