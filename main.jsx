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
    
         
       
        
    
    />
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
  const [isTyping, setIsTyping] = useState(false);
  const [ceoStatus, setCeoStatus] = useState("Ready");
  const [awaitingApproval, setAwaitingApproval] = useState(false);
  const [approvedAgent, setApprovedAgent] = useState("");
  const detectDepartment = (message) => {
  const text = message.toLowerCase();

  if (text.includes("security") || text.includes("hack") || text.includes("cyber")) {
    return "Cyber Security";
  }

  if (text.includes("website") || text.includes("web")) {
    return "Web Development";
  }

  if (text.includes("app") || text.includes("android") || text.includes("mobile")) {
    return "Mobile Development";
  }

  if (text.includes("game")) {
    return "Game Studio";
  }

  if (text.includes("marketing") || text.includes("promotion")) {
    return "Marketing";
  }

  if (text.includes("sales") || text.includes("client")) {
    return "Sales";
  }

  if (text.includes("database") || text.includes("data")) {
    return "Data & Database";
  }

  return "AI CEO";
};
  const detectAgent = (message, department) => {
  const text = message.toLowerCase();

  if (department === "Cyber Security") {
    if (text.includes("security") || text.includes("hack")) {
      return "Security Agent";
    }
    return "Cyber Security Agent";
  }

  if (department === "Web Development") {
    if (text.includes("frontend") || text.includes("ui")) {
      return "Frontend Agent";
    }
    return "Web Development Agent";
  }

  if (department === "Mobile Development") {
    return "Mobile Development Agent";
  }

  if (department === "Game Studio") {
    return "Game Development Agent";
  }

  if (department === "Marketing") {
    return "Marketing Agent";
  }

  if (department === "Sales") {
    return "Sales Agent";
  }

  if (department === "Data & Database") {
    return "Data Agent";
  }

  return "CEO Agent";
};
  const getAgentRole = (agent) => {
  const roles = {
    "Security Agent": "Handle security analysis, threat detection, vulnerability review, and security planning.",
    "Cyber Security Agent": "Handle cybersecurity architecture, protection, monitoring, and security planning.",
    "Frontend Agent": "Handle frontend UI development, responsive layouts, components, and user experience implementation.",
    "Web Development Agent": "Handle website architecture, frontend/backend web development, APIs, performance, and deployment planning.",
    "Mobile Development Agent": "Handle mobile app architecture, Android/iOS development, APIs, testing, and release planning.",
    "Game Development Agent": "Handle game architecture, gameplay systems, graphics integration, testing, and development planning.",
    "Marketing Agent": "Handle marketing strategy, campaigns, content planning, audience growth, and brand promotion.",
    "Sales Agent": "Handle client requirements, sales opportunities, proposals, and business development.",
    "Data Agent": "Handle data architecture, databases, data processing, analytics, and data security.",
    "CEO Agent": "Coordinate executive planning, company operations, departments, and strategic decisions."
  };

  return roles[agent] || "Handle the assigned task according to the department requirements.";
};
  const departmentInstruction = (department) => {
  return `Route this request to the ${department} department. Explain what that department should handle next.`;
};
const getCEOReply = async (msg, onChunk) => {
  try {
    const response = await fetch("https://nexora-ai-ceo.onrender.com/ceo-stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: msg
      })
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return data.error || "AI CEO could not process the command.";
    }

    if (!response.body) {
      return "AI CEO server ne streaming response nahi diya.";
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullReply = "";

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullReply += chunk;

      if (onChunk) {
        onChunk(fullReply);
      }
    }

    return fullReply || "AI CEO returned no response.";
  } catch (error) {
    console.error(error);
    return "AI CEO server se connection nahi ho pa raha.";
  }
};
    
  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = input.trim();

if (
  userMessage.toLowerCase().includes("create") &&
  userMessage.toLowerCase().includes("project")
) {
  const nameMatch = userMessage.match(
    /project named\s+["']?([^"'\n]+?)["']?(?:\s+with|\s*$)/i
  );

  if (nameMatch) {
    localStorage.setItem(
  "nexora_ceo_project",
  JSON.stringify({
    id: Date.now(),
    name: nameMatch[1].trim(),
    description: "",
    status: "Planning",
    department: "Web Development",
    agent: "Web Development Agent",
    plan: "Requirements → UI/UX → Development → QA → Deployment",
    tasks: [
      {
        id: 1,
        name: "Requirements",
        agent: "Web Development Agent",
        status: "Pending"
      },
      {
        id: 2,
        name: "UI/UX",
        agent: "Frontend Agent",
        status: "Pending"
      },
      {
        id: 3,
        name: "Development",
        agent: "Web Development Agent",
        status: "Pending"
      },
      {
        id: 4,
        name: "QA & Testing",
        agent: "QA Agent",
        status: "Pending"
      },
      {
        id: 5,
        name: "Deployment",
        agent: "Cloud & DevOps Agent",
        status: "Pending"
      }
    ]
  })
);
  }
}
      if (
    userMessage.toLowerCase().includes("start") &&
    userMessage.toLowerCase().includes("project")
  ) {
    let startNameMatch = userMessage.match(
      /start\s+project\s+named\s+["']?(.+?)["']?\s*$/i
    );

    if (!startNameMatch) {
      startNameMatch = userMessage.match(
        /start(?:\s+the)?\s+(.+?)\s+project\s*$/i
      );
    }

    if (startNameMatch) {
      window.dispatchEvent(
        new CustomEvent("nexora:start-project", {
          detail: {
            name: startNameMatch[1]
          }
        })
      );
    }
  }
  const department =
    userMessage.toLowerCase().includes("project") ||
    userMessage.toLowerCase().includes("phase") ||
    userMessage.toLowerCase().includes("approve")
      ? "AI CEO"
      : detectDepartment(userMessage);

  const agent = detectAgent(userMessage, department) || "CEO Agent";
  const agentRole = getAgentRole(agent);

  const departmentInstruction = `You are the AI CEO of Nexora.
Handle the Owner request directly.
Route work to the correct department and agent when needed.
Explain clear execution steps, required departments, dependencies, and what happens next.

Department: ${department}
Agent: ${agent}
Agent Role: ${agentRole}`;

  setIsTyping(true);
  setCeoStatus("Thinking...");

  setMessages((prev) => [
    ...prev,
    { role: "owner", text: userMessage },
    { role: "ceo", text: "" }
  ]);

  setInput("");
  setCeoStatus(`Responding... → ${department} → ${agent}`);

  await getCEOReply(
    `${departmentInstruction}\n\nOwner request: ${userMessage}`,
    (streamingReply) => {
      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;

        if (updated[lastIndex]?.role === "ceo") {
          updated[lastIndex] = {
            ...updated[lastIndex],
            text: streamingReply
          };
        }

        return updated;
      });
    }
  );

  setIsTyping(false);
  setApprovedAgent(agent);
  setAwaitingApproval(true);
  setCeoStatus("Ready");
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
        <span className="status">● {ceoStatus}</span>
      </div>
    </div>

    <div className="chat-box">
      {isTyping && (
  <div className="chat-message ceo">
    <b>AI CEO</b>
    <p>CEO is typing...</p>
  </div>
)}
      {awaitingApproval && (
  <div className="approval-box">
    <p><b>Owner Approval Required</b></p>
    <button
      className="primary"
      onClick={() => {
  setAwaitingApproval(false);
  setCeoStatus("Execution Started");
  setTimeout(() => {
  setCeoStatus(`Working... → ${approvedAgent}`);

   setTimeout(() => {
  setCeoStatus(`Completed → ${approvedAgent}`);
     }, 2000);
}, 1000);
}}
    >
      Approve Plan
    </button>
  </div>
)}
      {messages.map((message, index) => (
        <div key={index} className={`chat-message ${message.role}`}>
          <b>{message.role === "ceo" ? "AI CEO" : "Owner"}</b>
          <p>{message.text}</p>
        </div>
      ))}
    </div>

    <div className="chat-input">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask AI CEO anything..."
      />
      <button className="primary" onClick={sendMessage}>
        Send
      </button>
    </div>
  </section>
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
    function Projects() {
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projects, setProjects] = useState(() => {
  const savedProjects = localStorage.getItem("nexora_projects");
  return savedProjects ? JSON.parse(savedProjects) : [];
});
useEffect(() => {
  const savedProject = localStorage.getItem("nexora_ceo_project");

  if (savedProject) {
    const project = JSON.parse(savedProject);

    setProjects((prevProjects) => {
      if (prevProjects.some((item) => item.id === project.id)) {
        return prevProjects;
      }

      return [...prevProjects, project];
    });

    localStorage.removeItem("nexora_ceo_project");
  }
}, []);
  const createProject = () => {
    const name = projectName.trim();

    if (!name) {
      alert("Please enter a project name");
      return;
    }

    const newProject = {
      id: Date.now(),
      name: name,
      description: projectDescription.trim(),
      status: "Planning",
      department: "Web Development",
      agent: "Web Development Agent",
      plan: "Requirements → UI/UX → Development → QA → Deployment",
      tasks: [
        {
          id: 1,
          name: "Requirements",
          agent: "Web Development Agent",
          status: "Pending"
        },
        {
          id: 2,
          name: "UI/UX",
          agent: "Frontend Agent",
          status: "Pending"
        },
        {
          id: 3,
          name: "Development",
          agent: "Web Development Agent",
          status: "Pending"
        },
        {
          id: 4,
          name: "QA & Testing",
          agent: "QA Agent",
          status: "Pending"
        },
        {
          id: 5,
          name: "Deployment",
          agent: "Cloud & DevOps Agent",
          status: "Pending"
        }
      ]
    };

    setProjects((prevProjects) => [
      ...prevProjects,
      newProject
    ]);

    setProjectName("");
    setProjectDescription("");
    setShowForm(false);
  };
      const createProjectFromCEO = (name, description) => {
  if (!name.trim()) return;

  const newProject = {
    id: Date.now(),
    name: name.trim(),
    description: description.trim(),
    status: "Planning",
    department: "Web Development",
    agent: "Web Development Agent",
    plan: "Requirements → UI/UX → Development → QA → Deployment",
    tasks: [
      {
        id: 1,
        name: "Requirements",
        agent: "Web Development Agent",
        status: "Pending"
      },
      {
        id: 2,
        name: "UI/UX",
        agent: "Frontend Agent",
        status: "Pending"
      },
      {
        id: 3,
        name: "Development",
        agent: "Web Development Agent",
        status: "Pending"
      },
      {
        id: 4,
        name: "QA & Testing",
        agent: "QA Agent",
        status: "Pending"
      },
      {
        id: 5,
        name: "Deployment",
        agent: "Cloud & DevOps Agent",
        status: "Pending"
      }
    ]
  };

  setProjects((prevProjects) => [
    ...prevProjects,
    newProject
  ]);
};
  const startProject = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              status: "In Progress"
            }
          : project
      )
    );
  };
  useEffect(() => {
    const handleStartProject = (event) => {
      const projectName = event.detail?.name?.trim().toLowerCase();

      if (!projectName) return;

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.name.trim().toLowerCase() === projectName
            ? {
                ...project,
                status: "In Progress"
              }
            : project
        )
      );
    };

    window.addEventListener("nexora:start-project", handleStartProject);

    return () => {
      window.removeEventListener("nexora:start-project", handleStartProject);
    };
  }, []);
  const startTask = (projectId, taskId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      status: "In Progress"
                    }
                  : task
              )
            }
          : project
      )
    );
  };

  const completeTask = (projectId, taskId) => {
  setProjects((prevProjects) =>
    prevProjects.map((project) => {
      if (project.id !== projectId) {
        return project;
      }

      const updatedTasks = project.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "Completed"
            }
          : task
      );

      const allTasksCompleted = updatedTasks.every(
        (task) => task.status === "Completed"
      );

      return {
        ...project,
        tasks: updatedTasks,
        status: allTasksCompleted ? "Completed" : project.status
      };
    })
  );
};

  return (
    <section className="content">
      <div className="page-head">
        <div>
          <small>DELIVERY</small>
          <h2>Projects</h2>
          <p>
            Projects will be coordinated by CEO and departments.
          </p>
        </div>

        <button
          className="primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Create New Project</h3>

          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project name"
          />

          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Describe the project..."
            rows={5}
          />

          <div>
            <button
              className="primary"
              onClick={createProject}
            >
              Create Project
            </button>

            <button
              onClick={() => {
                setShowForm(false);
                setProjectName("");
                setProjectDescription("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {projects.length === 0 && !showForm && (
        <Empty
          title="No projects yet"
          text="Create your first Nexora project."
        />
      )}

      {projects.length > 0 && (
        <div className="cards">
          {projects.map((project) => (
            <div className="card" key={project.id}>
              <h3>{project.name}</h3>

              <p>
                {project.description ||
                  "No description provided."}
              </p>

              <p>
                <b>Status:</b> {project.status}
              </p>

              <p>
                <b>Department:</b> {project.department}
              </p>

              <p>
                <b>AI Agent:</b> {project.agent}
              </p>

              <p>
                <b>CEO Plan:</b> {project.plan}
              </p>

              {project.status === "Planning" && (
                <button
                  className="primary"
                  onClick={() => startProject(project.id)}
                >
                  Start Project
                </button>
              )}

              <div>
                <h4>Project Tasks</h4>

                {project.tasks.map((task) => (
                  <div className="card" key={task.id}>
                    <p>
                      <b>{task.name}</b>
                    </p>

                    <p>
                      <b>Agent:</b> {task.agent}
                    </p>

                    <p>
                      <b>Status:</b> {task.status}
                    </p>

                    {task.status === "Pending" && (
                      <button
                        className="primary"
                        onClick={() =>
                          startTask(project.id, task.id)
                        }
                      >
                        Start Task
                      </button>
                    )}

                    {task.status === "In Progress" && (
                      <button
                        className="primary"
                        onClick={() =>
                          completeTask(project.id, task.id)
                        }
                      >
                        Complete Task
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
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
