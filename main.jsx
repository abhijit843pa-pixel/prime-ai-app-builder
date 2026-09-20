import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  LayoutDashboard,
  Brain,
  Building2,
  Users,
  FolderKanban,
  ShieldCheck,
  Code2,
  Globe,
  Smartphone,
  Gamepad2,
  Palette,
  TestTube2,
  Database,
  Cloud,
  BarChart3,
  Search,
  Megaphone,
  Handshake,
  Wallet,
  UserCog,
  Headphones,
  Scale,
  Lightbulb,
  Phone,
  MessageSquare,
  Settings,
  Menu,
  X,
  Plus,
  ChevronRight,
  Activity,
} from "lucide-react";
import "./styles.css";

const departments = [
  ["Engineering", "Software Engineering", Code2],
  ["Web Development", "Websites & Web Apps", Globe],
  ["Mobile", "Android & iOS", Smartphone],
  ["Game Studio", "Game Development", Gamepad2],
  ["AI & Research", "AI, ML & Research", Brain],
  ["UI/UX & Creative", "Design & Creative", Palette],
  ["QA & Testing", "Quality Assurance", TestTube2],
  ["Cyber Security", "Security Operations", ShieldCheck],
  ["Data & Database", "Data & Database", Database],
  ["Cloud & DevOps", "Servers & Infrastructure", Cloud],
  ["Analytics", "Business Intelligence", BarChart3],
  ["SEO", "Search Optimization", Search],
  ["Marketing", "Marketing & Social", Megaphone],
  ["Sales", "Sales & Business Development", Handshake],
  ["Finance", "Finance & Billing", Wallet],
  ["HR & Operations", "People & Operations", UserCog],
  ["Customer Support", "Client Support", Headphones],
  ["Legal & Compliance", "Legal & Compliance", Scale],
  ["Product & Innovation", "Products & Innovation", Lightbulb],
];

const agents = [
  ["AI CEO", "Company Management", "Active"],
  ["Engineering Manager", "Engineering", "Active"],
  ["Security Manager", "Cyber Security", "Active"],
  ["Project Manager", "Project Management", "Active"],
  ["AI Receptionist", "Customer Support", "Planned"],
];

function App() {
  const [page, setPage] = useState("dashboard");
  const [mobile, setMobile] = useState(false);

  const nav = [
  ["master", "Master Control", ShieldCheck],
  ["dashboard", "Owner HQ", LayoutDashboard],
 
    ["ceo", "AI CEO", Brain],
    ["departments", "Departments", Building2],
    ["agents", "AI Agents", Users],
    ["clients", "Clients", Handshake],
    ["projects", "Projects", FolderKanban],
    ["security", "Cyber Security", ShieldCheck],
    ["settings", "Settings", Settings],
  ];

  return (
    <div className="app">
      <aside className={`sidebar ${mobile ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-logo">N</div>
          <div>
            <b>NEXORA</b>
            <small>AI COMPANY OS</small>
          </div>
          <button className="close-btn" onClick={() => setMobile(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="owner-box">
          <span>OWNER</span>
          <b>Company Owner</b>
          <small>Highest authority</small>
        </div>

        <nav>
          {nav.map(([id, label, Icon]) => (
            <button
              key={id}
              className={page === id ? "active" : ""}
              onClick={() => {
                setPage(id);
                setMobile(false);
              }}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {mobile && (
        <div className="overlay" onClick={() => setMobile(false)} />
      )}

      <main className="main">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setMobile(true)}>
            <Menu size={22} />
          </button>

          <div>
            <small>NEXORA COMPANY</small>
            <h1>Owner Command Center</h1>
          </div>

          <div className="top-actions">
            <button onClick={() => setPage("ceo")}>
              <Phone size={18} />
              Talk to CEO
            </button>
          </div>
        </header>
        {page === "master" && <MasterControl />}

        {page === "dashboard" && <Dashboard setPage={setPage} />}
        {page === "ceo" && <CEO />}
        {page === "departments" && <Departments />}
        {page === "agents" && <Agents />}
        {page === "clients" && <Clients />}
        {page === "projects" && <Projects />}
        {page === "security" && <Security />}
        {page === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}
function MasterControl() {
  const [freeAccess, setFreeAccess] = useState(false);
  const [discounts, setDiscounts] = useState(true);
  const [paidServices, setPaidServices] = useState(true);
  const [autoPricing, setAutoPricing] = useState(false);
  const [serviceMode, setServiceMode] = useState({
  "Web Development": "PAID",
"Mobile Development": "PAID",
"AI Services": "PAID",
"UI/UX Design": "PAID",
"Cyber Security": "PAID",
});
  const [servicePrices, setServicePrices] = useState({
  "Web Development": 5000,
  "Mobile Development": 7000,
  "AI Services": 10000,
  "UI/UX Design": 4000,
  "Cyber Security": 12000,
});
  const updatePrice = (service) => {
  const newPrice = prompt(
    `Enter price for ${service}`,
    servicePrices[service]
  );

  if (newPrice) {
    setServicePrices({
      ...servicePrices,
      [service]: Number(newPrice),
    });
  }
};
  const [approvalRequired, setApprovalRequired] = useState(true);
const [pendingApproval, setPendingApproval] = useState(null);

const requestApproval = (service) => {
  setPendingApproval({
    service,
    price: servicePrices[service],
    status: "PENDING",
  });
};
  const approveRequest = () => {
  if (!pendingApproval) return;

  setPendingApproval({
    ...pendingApproval,
    status: "APPROVED",
  });
};

const rejectRequest = () => {
  if (!pendingApproval) return;

  setPendingApproval({
    ...pendingApproval,
    status: "REJECTED",
  });
};

  return (
    <section className="content">
      <div className="page-head">
        <div>
          <small>MASTER AUTHORITY</small>
          <h2>Master Control</h2>
          <p>
            Company-wide control for pricing, access and approvals.
          </p>
        </div>
      </div>

      <div className="hero">
        <div>
          <span className="eyebrow">CONTROL CENTER</span>
          <h2>Free or Paid</h2>
          <p>
            Control whether services are free, paid or require Owner approval.
          </p>
        </div>
      </div>

      <div className="stats">
        <Stat title="Free Access" value={freeAccess ? "ON" : "OFF"} />
        <Stat title="Discounts" value={discounts ? "ON" : "OFF"} />
        <Stat title="AI Pricing" value={autoPricing ? "ON" : "OFF"} />
        <Stat title="Approval" value="OWNER" />
        <Stat title="Paid Services" value={paidServices ? "ON" : "OFF"} />
      </div>

      <div className="section-title">
        <div>
          <small>COMMERCIAL CONTROL</small>
          <h2>Pricing Rules</h2>
        </div>
      </div>
      <div className="section-title">
  <div>
    <small>SERVICE ACCESS</small>
    <h2>Service-wise Free / Paid</h2>
  </div>
</div>

<div className="cards">
  {Object.entries(serviceMode).map(([service, mode]) => (
    <Card
      key={service}
      icon={Wallet}
      title={`${service} — ${mode} — ₹${servicePrices[service]}`}
      text={`Price: ₹${servicePrices[service]}. Tap to change price or switch Free/Paid.`}
      action={() => {
  updatePrice(service);
}}
    
         
       
        
    
   
  ))}
</div>

      <div className="cards">
        <Card
          icon={ShieldCheck}
          title="Free Service"
          text="Allow selected services or clients to receive services for free."
          action={() => setFreeAccess(!freeAccess)}
        />

        <Card
          icon={Wallet}
          title="Paid Services"
          text="Services and projects can be offered as paid products or subscriptions."
          action={() => setPaidServices(!paidServices)}
        />

        <Card
          icon={Settings}
          title="Discount Control"
          text="Control whether discounts are allowed."
          action={() => setDiscounts(!discounts)}
        />

        <Card
          icon={Brain}
          title="AI Pricing"
          text="AI CEO can recommend pricing and quotations. Final authority remains with Owner."
          action={() => setAutoPricing(!autoPricing)}
        />
      </div>

      <div className="section-title">
        <div>
          <small>APPROVALS</small>
          <h2>Company Rules</h2>
        </div>
      </div>

      <div className="cards">
        <Card
          icon={ShieldCheck}
          title="Owner Approval"
          text="Major pricing, discounts and payment changes require Owner approval."
        />

        <Card
          icon={Brain}
          title="AI CEO"
          text="AI CEO can analyze deals and prepare quotations according to company rules."
        />

        <Card
          icon={Users}
          title="Future Expansion"
          text="New departments, AI agents, products and services can be added later."
        />
      </div>
    </section>
  );
}
function Dashboard({ setPage }) {
  return (
    <section className="content">
      <div className="hero">
        <div>
          <span className="eyebrow">AI-POWERED IT + ALL-ROUNDER COMPANY</span>
          <h2>Welcome to Nexora.</h2>
          <p>
            Your central company platform for AI management, departments,
            projects, clients and future expansion.
          </p>
        </div>

        <button className="primary" onClick={() => setPage("ceo")}>
          <Brain size={18} />
          Talk to AI CEO
        </button>
      </div>

      <div className="stats">
        <Stat title="AI Departments" value="19" />
        <Stat title="AI Agents" value="5" />
        <Stat title="Active Projects" value="0" />
        <Stat title="Security Status" value="Protected" />
      </div><div className="section-title">
  <div>
    <small>OWNER ACTIONS</small>
    <h2>Pending Approvals</h2>
  </div>
</div>

<div className="cards">
  <Card
    icon={ShieldCheck}
    title="No Pending Approvals"
    text="Major pricing, discounts, payments and high-risk company actions will appear here."
  />

  <Card
    icon={Wallet}
    title="Commercial Decisions"
    text="Owner approval will be required for important pricing and payment decisions."
  />

  <Card
    icon={Brain}
    title="AI CEO Recommendations"
    text="AI CEO recommendations waiting for Owner review will appear here."
  />
</div>

      <div className="section-title">
        <div>
          <small>COMPANY CONTROL</small>
          <h2>Core Systems</h2>
        </div>
      </div>

      <div className="cards">
        <Card
          icon={Brain}
          title="AI CEO"
          text="Company planning, delegation, meetings and management."
          action={() => setPage("ceo")}
        />
        <Card
          icon={Building2}
          title="Departments"
          text="Manage Nexora's IT and all-rounder company divisions."
          action={() => setPage("departments")}
        />
        <Card
          icon={Users}
          title="AI Workforce"
          text="Create and manage specialized AI employees."
          action={() => setPage("agents")}
        />
        <Card
          icon={ShieldCheck}
          title="Cyber Security"
          text="Security operations, monitoring and protection."
          action={() => setPage("security")}
        />
      </div>
    </section>
  );
}

function CEO() {
  const [messages, setMessages] = useState([
    { role: "ceo", text: "Hello Owner. How can I help manage Nexora today?" }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
const getCEOReply = async (msg) => {
  setIsThinking(true);
  try {
    const response = await fetch("https://nexora-ai-ceo.onrender.com/ceo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: msg
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return data.error || "AI CEO could not process the command.";
    }

    return data.reply || "AI CEO returned no response.";
  } catch (error) {
    console.error(error);
return "AI CEO server se connection nahi ho pa raha.";
  } finally {
  setIsThinking(false);
}
};
  const sendMessage = async () => {
    if (!input.trim()) return;
const userMessage = input;
  setMessages([
  ...messages,
  { role: "owner", text: userMessage }
]);

const reply = await getCEOReply(userMessage);

setMessages((prev) => [
  ...prev,
  {
    role: "ceo",
    text: reply
  }
]);


 setInput("");
};
  return (
  <section className="content">
    <div className="page-head">
      <div>
        <small>COMPANY LEADERSHIP</small>
        <h2>AI CEO</h2>
        <p>Your AI company management assistant.</p>
      </div>
    </div>

    <div className="ceo-card">
      <div className="ceo-avatar">
        <Brain size={38} />
      </div>
      <div>
        <h2>AI CEO</h2>
        <p>Company Management Agent</p>
        <span className="status">● Ready</span>
      </div>
    </div>

    <div className="chat-box">
      {messages.map((message, index) => (
        <div key={index} className={`chat-message ${message.role}`}>
          <b>{message.role === "ceo" ? "AI CEO" : "Owner"}</b>
          <p>{message.text}</p>
        </div>
      ))}
      {isThinking && (
  <div className="chat-message ceo">
    <b>AI CEO</b>
    <p>🧠 AI CEO is thinking...</p>
  </div>
)}
    </div>

    <div className="chat-input">
  <textarea
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder={isThinking ? "AI CEO is thinking..." : "Ask AI CEO anything..."}
    disabled={isThinking}
    rows={3}
  />

  <button
    className="primary"
    onClick={sendMessage}
    disabled={isThinking}
  >
    {isThinking ? "Thinking..." : "Send"}
  </button>
</div>
);
}

function Departments() {
  return (
    <section className="content">
      <div className="page-head">
        <div>
          <small>AI COMPANY ORGANIZATION</small>
          <h2>Departments</h2>
          <p>Nexora's IT + all-rounder company structure.</p>
        </div>
        <button className="primary">
          <Plus size={18} />
          Add Department
        </button>
      </div>

      <div className="department-grid">
        {departments.map(([name, description, Icon]) => (
          <div className="department" key={name}>
            <div className="department-icon">
              <Icon size={22} />
            </div>
            <div>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
            <ChevronRight size={18} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Agents() {
    const [agentList, setAgentList] = useState(agents);
  return (
    <section className="content">
      <div className="page-head">
        <div>
          <small>AI WORKFORCE</small>
          <h2>AI Agents</h2>
          <p>Specialized AI employees across Nexora.</p>
        </div>
        <button 
  className="primary"
  onClick={() => alert("Create Agent system will be connected here.")}
>
          <Plus size={18} />
          Create Agent
        </button>
      </div>

      <div className="table">
  <div className="row">
    <b>Agent</b>
    <b>Department</b>
    <b>Status</b>
    <b>Action</b>
  </div>

  {agentList.map(([name, dept, status]) => (
    <div className="row" key={name}>
      <div className="agent-avatar">
        <Brain size={18} />
      </div>

      <div className="grow">
        <b>{name}</b>
        <small>{dept}</small>
      </div>

      <span className="status">{status}</span>

      <button
        className="secondary"
        onClick={() => alert(`${name} selected`)}
      >
        Open 
      </button>
    </div>
  ))}
</div>
           
  </section>
);
}
    
  
function Clients() {
  return (
    <section className="content">
      <div className="page-head">
        <div>
          <small>BUSINESS</small>
          <h2>Clients</h2>
          <p>Client requirements, contacts and future projects.</p>
        </div>
        <button className="primary">
          <Plus size={18} />
          Add Client
        </button>
      </div>

      <Empty title="No clients yet" text="Client management will be connected to the Nexora backend." />
    </section>
  );
}

function Projects() {
  return (
    <section className="content">
      <div className="page-head">
        <div>
          <small>DELIVERY</small>
          <h2>Projects</h2>
          <p>Projects will be coordinated by CEO and departments.</p>
        </div>
        <button className="primary">
          <Plus size={18} />
          New Project
        </button>
      </div>

      <Empty title="No projects yet" text="Projects will appear here after the backend is connected." />
    </section>
  );
}

function Security() {
  return (
    <section className="content">
      <div className="page-head">
        <div>
          <small>SECURITY OPERATIONS</small>
          <h2>Cyber Security</h2>
          <p>Dedicated security department for Nexora.</p>
        </div>
      </div>

      <div className="stats">
        <Stat title="Security Status" value="Protected" />
        <Stat title="Threats" value="0" />
        <Stat title="Alerts" value="0" />
        <Stat title="Monitoring" value="Ready" />
      </div>

      <div className="security-box">
        <ShieldCheck size={32} />
        <div>
          <h3>Security foundation ready</h3>
          <p>
            Real monitoring, vulnerability management, incident response and
            security tools will be connected during the backend phase.
          </p>
        </div>
      </div>
    </section>
  );
}

function SettingsPage() {
  return (
    <section className="content">
      <div className="page-head">
        <div>
          <small>OWNER CONTROL</small>
          <h2>Settings</h2>
          <p>Future controls for company, AI, security and automation.</p>
        </div>
      </div>

      <div className="cards">
        <Card icon={UserCog} title="Owner Control" text="Owner permissions and company authority." />
        <Card icon={Brain} title="AI Controls" text="CEO and AI agent permissions." />
        <Card icon={ShieldCheck} title="Security" text="Security policies and approvals." />
        <Card icon={Activity} title="System Monitoring" text="Platform health and activity." />
      </div>
    </section>
  );
}

function Stat({ title, value }) {
  return (
    <div className="stat">
      <small>{title}</small>
      <strong>{value}</strong>
    </div>
  );
}

function Card({ icon: Icon, title, text, action }) {
  return (
    <button className="card" onClick={action}>
      <div className="card-icon">
        <Icon size={22} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <ChevronRight size={18} />
    </button>
  );
}

function Empty({ title, text }) {
  return (
    <div className="empty">
      <FolderKanban size={34} />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
