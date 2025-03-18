export const categories = {
  "security-assessment": {
    id: "security-assessment",
    title: "Security Assessment",
    icon: "🔍",
    description:
      "It's important to establish a baseline and close existing vulnerabilities. When was your last assessment?",
    questions: [
      {
        text: "When was your last security assessment?",
        options: [
          { text: "Never", value: 0 },
          { text: "Over 1 year ago", value: 33 },
          { text: "Within last year", value: 66 },
          { text: "Within last 6 months", value: 100 },
        ],
      },
    ],
    actions: [
      "Schedule a comprehensive security assessment",
      "Document vulnerabilities found during assessment",
      "Create a plan to address critical vulnerabilities",
      "Set a schedule for regular future assessments",
    ],
  },

  "spam-email": {
    id: "spam-email",
    title: "Spam Email",
    icon: "📧",
    description:
      "Secure your email. Most attacks originate in your email. We'll help you choose a service designed to reduce spam and your exposure to attacks on your staff via email.",
    questions: [
      {
        text: "What email security measures do you currently have?",
        options: [
          { text: "Basic/default protection", value: 0 },
          { text: "Enhanced spam filtering", value: 33 },
          { text: "Advanced anti-phishing", value: 66 },
          { text: "Complete email security", value: 100 },
        ],
      },
    ],
    actions: [
      "Implement advanced email filtering solution",
      "Configure anti-phishing protection",
      "Train employees on email security best practices",
    ],
  },

  passwords: {
    id: "passwords",
    title: "Passwords",
    icon: "🔑",
    description:
      "Apply security policies on your network. Examples: Deny or limit USB file storage access, enable enhanced password policies, set user screen timeouts, and limit user access.",
    questions: [
      {
        text: "What is your password policy like?",
        options: [
          { text: "No specific policy", value: 0 },
          { text: "Basic requirements", value: 33 },
          { text: "Strong requirements", value: 66 },
          { text: "Password manager + MFA", value: 100 },
        ],
      },
    ],
    actions: [
      "Implement a password manager for the organization",
      "Create a strong password policy requiring 14+ characters",
      "Enforce unique passwords for all accounts",
      "Implement account lockout policies",
    ],
  },

  "security-awareness": {
    id: "security-awareness",
    title: "Security Awareness",
    icon: "👥",
    description:
      'Train your users - often! Teach them about data security, email attacks, and your policies and procedures. We offer a web-based training solution and "done for you" security policies.',
    questions: [
      {
        text: "How often do you provide security training?",
        options: [
          { text: "Never", value: 0 },
          { text: "Occasionally", value: 33 },
          { text: "Every few months", value: 66 },
          { text: "Monthly + simulations", value: 100 },
        ],
      },
    ],
    actions: [
      "Establish a regular security training program",
      "Conduct simulated phishing exercises",
      "Create security awareness materials and reminders",
    ],
  },

  "endpoint-protection": {
    id: "endpoint-protection",
    title: "Advanced Endpoint Protection",
    icon: "🛡️",
    description:
      "Protect your computers data from malware, viruses, and cyber-attacks with advanced endpoint security. The latest technology (which replaces your outdated anti-virus solution) protects against file-less and script-based threats and can even rollback a ransomware attack.",
    questions: [
      {
        text: "What type of endpoint protection do you use?",
        options: [
          { text: "Basic/free antivirus", value: 0 },
          { text: "Standard antivirus", value: 33 },
          { text: "Advanced protection", value: 66 },
          { text: "EDR solution with rollback", value: 100 },
        ],
      },
    ],
    actions: [
      "Deploy advanced endpoint detection and response solution",
      "Configure anti-malware protection on all devices",
      "Implement application whitelisting for sensitive systems",
    ],
  },

  mfa: {
    id: "mfa",
    title: "Multi-Factor Authentication",
    icon: "🔐",
    description:
      "Utilize Multi Factor Authentication whenever you can, include on your network, banking websites, and even social media. It adds an additional layer of protection to ensure that even if your password does get stolen, your data stays protected.",
    questions: [
      {
        text: "Where do you use multi-factor authentication?",
        options: [
          { text: "Nowhere", value: 0 },
          { text: "Only for banking", value: 33 },
          { text: "Critical accounts only", value: 66 },
          { text: "All business accounts", value: 100 },
        ],
      },
    ],
    actions: [
      "Enable MFA for all email accounts",
      "Enable MFA for admin and sensitive accounts",
      "Enable MFA for all possible business applications",
    ],
  },

  updates: {
    id: "updates",
    title: "Computer Updates",
    icon: "🔄",
    description:
      'Keep Microsoft, Adobe, and Java products updated for better security. We provide a "critical update" service via automation to protect your computers from the latest known attacks.',
    questions: [
      {
        text: "How do you manage software updates?",
        options: [
          { text: "Manually when needed", value: 0 },
          { text: "Some automatic updates", value: 33 },
          { text: "Most are automatic", value: 66 },
          { text: "Fully automated with monitoring", value: 100 },
        ],
      },
    ],
    actions: [
      "Configure automatic updates for operating systems",
      "Set up automated updates for all applications",
      "Implement a patch verification process",
    ],
  },

  "dark-web": {
    id: "dark-web",
    title: "Dark Web Research",
    icon: "🕵️",
    description:
      "Knowing in real-time what passwords and accounts have been posted on the Dark Web will allow you to be proactive in preventing a data breach. We scan the Dark Web and take action to protect your business from stolen credentials that have been posted for sale.",
    questions: [
      {
        text: "Do you monitor for leaked credentials?",
        options: [
          { text: "No monitoring", value: 0 },
          { text: "Basic breach notifications", value: 33 },
          { text: "Regular dark web scans", value: 66 },
          { text: "Real-time monitoring & alerts", value: 100 },
        ],
      },
    ],
    actions: [
      "Implement dark web monitoring for company credentials",
      "Create an alert system for detected breaches",
      "Establish a response procedure for compromised credentials",
    ],
  },

  siem: {
    id: "siem",
    title: "SIEM/Log Management",
    icon: "📊",
    description:
      "Security Incident & Event Management uses big data engines to review all event and security logs from all covered devices to protect against advanced threats and to meet compliance requirements.",
    questions: [
      {
        text: "How do you manage security logs?",
        options: [
          { text: "No log management", value: 0 },
          { text: "Basic log collection", value: 33 },
          { text: "Centralized logging", value: 66 },
          { text: "SIEM with active monitoring", value: 100 },
        ],
      },
    ],
    actions: [
      "Implement centralized log collection",
      "Configure alerts for suspicious activities",
      "Establish regular log review procedures",
    ],
  },

  "web-gateway": {
    id: "web-gateway",
    title: "Web Gateway Security",
    icon: "🌐",
    description:
      "Internet security is a race against time. Cloud based security detects web and email threats as they emerge on the internet and blocks them on your network within seconds – before they reach the user.",
    questions: [
      {
        text: "What web filtering do you use?",
        options: [
          { text: "No web filtering", value: 0 },
          { text: "Basic DNS filtering", value: 33 },
          { text: "Advanced web filtering", value: 66 },
          { text: "Cloud-based security gateway", value: 100 },
        ],
      },
    ],
    actions: [
      "Implement DNS filtering to block malicious domains",
      "Deploy a web content filtering solution",
      "Enable HTTPS inspection for encrypted traffic",
    ],
  },

  mobile: {
    id: "mobile",
    title: "Mobile Device Security",
    icon: "📱",
    description:
      "Today's cyber criminals attempt to steal data or access your network by way of your employees' phones and tablets. They're counting on you to neglect this piece of the puzzle. Mobile device security closes this gap.",
    questions: [
      {
        text: "How do you secure mobile devices?",
        options: [
          { text: "No specific security", value: 0 },
          { text: "Basic requirements only", value: 33 },
          { text: "MDM for company devices", value: 66 },
          { text: "Full MDM with BYOD policies", value: 100 },
        ],
      },
    ],
    actions: [
      "Deploy mobile device management solution",
      "Create BYOD security policy",
      "Enable remote wipe capabilities for all devices",
    ],
  },

  firewall: {
    id: "firewall",
    title: "Firewall",
    icon: "🧱",
    description:
      "Intrusion Detection and Intrusion Prevention features. Send the log files to a managed SIEM. And if your IT team doesn't know what they are, call us today!",
    questions: [
      {
        text: "What type of firewall do you use?",
        options: [
          { text: "Basic router only", value: 0 },
          { text: "Standard firewall", value: 33 },
          { text: "Next-gen firewall", value: 66 },
          { text: "NGFW with IDS/IPS", value: 100 },
        ],
      },
    ],
    actions: [
      "Deploy a next-generation firewall",
      "Configure intrusion detection/prevention",
      "Implement proper network segmentation",
    ],
  },

  encryption: {
    id: "encryption",
    title: "Encryption",
    icon: "🔒",
    description:
      "Whenever possible, the goal is to encrypt files at rest, in motion (think email) and especially on mobile devices.",
    questions: [
      {
        text: "Where do you use encryption?",
        options: [
          { text: "No encryption", value: 0 },
          { text: "Some sensitive data", value: 33 },
          { text: "Most devices & emails", value: 66 },
          { text: "Full encryption everywhere", value: 100 },
        ],
      },
    ],
    actions: [
      "Encrypt all sensitive data at rest",
      "Implement email encryption for sensitive communications",
      "Enable full disk encryption on all devices",
    ],
  },

  backup: {
    id: "backup",
    title: "Backup",
    icon: "💾",
    description:
      "Backup anywhere. Have a backup for each month of the year. Test your backups often. And if you aren't convinced your backups aren't working, call us ASAP.",
    questions: [
      {
        text: "How do you handle backups?",
        options: [
          { text: "Irregular/manual backups", value: 0 },
          { text: "Regular local backups", value: 33 },
          { text: "Dual backup strategy", value: 66 },
          { text: "3-2-1 backup with testing", value: 100 },
        ],
      },
    ],
    actions: [
      "Implement 3-2-1 backup strategy",
      "Configure automated daily backups",
      "Establish monthly backup verification process",
      "Create an isolated backup for disaster recovery",
    ],
  },

  continuity: {
    id: "continuity",
    title: "Business Continuity",
    icon: "⚠️",
    description:
      "Having a plan for when disaster strikes is critical to getting your business back up and running quickly. This includes cyber attacks, natural disasters, and other disruptions.",
    questions: [
      {
        text: "Do you have a disaster recovery plan?",
        options: [
          { text: "No formal plan", value: 0 },
          { text: "Basic recovery steps", value: 33 },
          { text: "Documented DR plan", value: 66 },
          { text: "Tested & updated plan", value: 100 },
        ],
      },
    ],
    actions: [
      "Develop a business continuity/disaster recovery plan",
      "Define roles and responsibilities during an incident",
      "Schedule regular drills and plan testing",
    ],
  },
};

export const recommendations = {
  "security-assessment": {
    title: "Security Assessment",
    low: "Schedule a comprehensive security assessment within the next 30 days to identify vulnerabilities in your systems.",
    medium:
      "Ensure your security assessments are comprehensive and conducted at least annually.",
    high: "Continue with regular security assessments, consider adding penetration testing for additional security insights.",
  },
  "spam-email": {
    title: "Email Security",
    low: "Implement advanced email protection with anti-phishing capabilities and employee training.",
    medium:
      "Enhance your email security with advanced threat protection and link scanning features.",
    high: "Maintain your comprehensive email security and keep training employees on the latest email threats.",
  },
  passwords: {
    title: "Password Management",
    low: "Implement a password manager and establish strong password policies (14+ characters or 5 words).",
    medium:
      "Strengthen your password policies and consider implementing a company-wide password manager.",
    high: "Your password practices are strong. Continue using your password manager and multi-factor authentication.",
  },
  "security-awareness": {
    title: "Security Training",
    low: "Start a regular security awareness training program for all employees with simulated phishing tests.",
    medium:
      "Increase the frequency of security training and include updates on new threats.",
    high: "Your security training program is strong. Consider adding advanced topics and role-specific training.",
  },
  "endpoint-protection": {
    title: "Endpoint Security",
    low: "Upgrade to a modern endpoint detection and response (EDR) solution that can detect and respond to advanced threats.",
    medium:
      "Enhance your current antivirus with EDR capabilities for better protection against fileless attacks.",
    high: "Your endpoint protection is strong. Ensure it remains fully deployed across all company devices.",
  },
  mfa: {
    title: "Multi-Factor Authentication",
    low: "Enable MFA on all business accounts, especially email, banking, and admin accounts.",
    medium:
      "Expand your MFA implementation to cover all business systems and accounts.",
    high: "Your MFA implementation is comprehensive. Consider using hardware keys for the most sensitive accounts.",
  },
  updates: {
    title: "Software Updates",
    low: "Implement automated patching for all systems and create a verification process.",
    medium:
      "Expand your automated updates to cover all software and establish a verification schedule.",
    high: "Your update management is strong. Continue monitoring to ensure all systems remain current.",
  },
  "dark-web": {
    title: "Dark Web Monitoring",
    low: "Implement dark web monitoring to detect leaked credentials before they can be exploited.",
    medium:
      "Enhance your monitoring with automated alerts and a clear response process.",
    high: "Your dark web monitoring is comprehensive. Consider adding automated remediation steps.",
  },
  siem: {
    title: "Log Management",
    low: "Implement centralized logging and consider a SIEM solution for better threat detection.",
    medium:
      "Enhance your log collection and consider adding automated alerting for suspicious activities.",
    high: "Your SIEM implementation is strong. Consider adding more data sources for comprehensive coverage.",
  },
  "web-gateway": {
    title: "Web Security",
    low: "Implement web filtering and consider a cloud security gateway to protect from web threats.",
    medium:
      "Enhance your web filtering with advanced threat protection capabilities.",
    high: "Your web gateway security is strong. Ensure it covers all devices, including remote workers.",
  },
  mobile: {
    title: "Mobile Security",
    low: "Implement mobile device management and security policies for all company devices.",
    medium:
      "Expand your mobile security to include BYOD policies and application controls.",
    high: "Your mobile security is comprehensive. Ensure it addresses new mobile threats as they emerge.",
  },
  firewall: {
    title: "Firewall Protection",
    low: "Upgrade to a next-generation firewall with intrusion detection/prevention capabilities.",
    medium:
      "Enhance your firewall with advanced features and ensure proper configuration.",
    high: "Your firewall protection is strong. Consider adding additional security layers like DNS filtering.",
  },
  encryption: {
    title: "Data Encryption",
    low: "Implement encryption for sensitive data at rest and in transit, especially on mobile devices.",
    medium:
      "Expand your encryption to cover more data categories and communication channels.",
    high: "Your encryption practices are comprehensive. Ensure encryption keys are properly managed.",
  },
  backup: {
    title: "Data Backup",
    low: "Implement a 3-2-1 backup strategy and test restoration procedures regularly.",
    medium:
      "Enhance your backup strategy with more frequent backups and comprehensive testing.",
    high: "Your backup solution is robust. Consider adding immutable backups for ransomware protection.",
  },
  continuity: {
    title: "Business Continuity",
    low: "Develop a formal disaster recovery and business continuity plan.",
    medium:
      "Enhance your recovery plan with detailed procedures and regular testing.",
    high: "Your business continuity planning is strong. Consider running full disaster simulations.",
  },
};

export const statistics = [
  {
    value: "1 in 5",
    text: "Small businesses will suffer a cyber breach this year",
  },
  {
    value: "81%",
    text: "Of all breaches happen to small and medium sized businesses",
  },
  {
    value: "97%",
    text: "Of breaches could have been prevented with today's technology",
  },
];
