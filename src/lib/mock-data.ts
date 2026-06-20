import type { StoredAnalysis } from "@/types/analysis";

export const mockAnalysis: StoredAnalysis = {
  id: "demo-meridian-001",
  filename: "Meridian_v_Atlas_Contract_2023.pdf",
  fileSize: 2847392,
  pageCount: 34,
  createdAt: "2024-01-15T10:30:00Z",
  status: "completed",
  result: {
    summary:
      "This matter involves a high-stakes breach of contract dispute between Meridian Corporation (Plaintiff) and Atlas Holdings LLC (Defendant) arising from a $4.2 million enterprise software development agreement executed on March 15, 2023. Atlas Holdings failed to deliver Phase 2 milestones by the contractual deadline of September 30, 2023, prompting Meridian to issue a formal notice of breach on October 15, 2023, and subsequently file suit in the Delaware Court of Chancery on November 8, 2023.\n\nThe central dispute concerns whether Atlas Holdings materially breached Section 7.3 of the Agreement by failing to deliver functional ERP modules within the agreed timeframe, and whether Meridian is entitled to $1.8 million in direct damages, consequential damages, and injunctive relief preventing Atlas from deploying the partially-developed software to third parties. Atlas Holdings has filed a counterclaim for $800,000 in unpaid milestone payments, alleging Meridian's specification changes constituted a constructive modification of deliverables.\n\nKey strategic considerations include an upcoming preliminary injunction hearing on February 14, 2024, ambiguous IP ownership language in Section 8.2 that may complicate injunctive relief, and the approaching discovery cutoff of April 30, 2024. Immediate attention is required to respond to the counterclaim by February 5, 2024, and to strengthen the injunction motion with technical expert testimony.",
    parties: [
      {
        id: "p1",
        name: "Meridian Corporation",
        role: "Plaintiff",
        type: "company",
        mentioned_count: 47,
      },
      {
        id: "p2",
        name: "Atlas Holdings LLC",
        role: "Defendant / Counter-Claimant",
        type: "company",
        mentioned_count: 41,
      },
      {
        id: "p3",
        name: "Hon. Katherine Chen",
        role: "Presiding Judge",
        type: "individual",
        mentioned_count: 8,
      },
      {
        id: "p4",
        name: "Morrison & Foerster LLP",
        role: "Counsel for Plaintiff",
        type: "company",
        mentioned_count: 12,
      },
      {
        id: "p5",
        name: "Skadden, Arps LLP",
        role: "Counsel for Defendant",
        type: "company",
        mentioned_count: 9,
      },
      {
        id: "p6",
        name: "Delaware Court of Chancery",
        role: "Jurisdiction",
        type: "government",
        mentioned_count: 6,
      },
    ],
    key_dates: [
      {
        id: "d1",
        date: "2023-03-15",
        description: "Software Development Agreement executed between parties",
        type: "agreement",
        importance: "high",
      },
      {
        id: "d2",
        date: "2023-06-30",
        description: "Phase 1 delivery completed and accepted",
        type: "event",
        importance: "medium",
      },
      {
        id: "d3",
        date: "2023-09-30",
        description: "Phase 2 delivery deadline — missed by Defendant",
        type: "deadline",
        importance: "high",
      },
      {
        id: "d4",
        date: "2023-10-15",
        description: "Formal notice of material breach issued by Plaintiff",
        type: "filing",
        importance: "high",
      },
      {
        id: "d5",
        date: "2023-11-08",
        description: "Complaint filed in Delaware Court of Chancery",
        type: "filing",
        importance: "high",
      },
      {
        id: "d6",
        date: "2023-12-01",
        description: "Defendant served with summons and complaint",
        type: "event",
        importance: "medium",
      },
      {
        id: "d7",
        date: "2024-01-15",
        description: "Answer and counterclaim filed by Atlas Holdings",
        type: "filing",
        importance: "high",
      },
      {
        id: "d8",
        date: "2024-02-05",
        description: "Deadline to respond to counterclaim",
        type: "deadline",
        importance: "high",
      },
      {
        id: "d9",
        date: "2024-02-14",
        description: "Preliminary injunction hearing (scheduled)",
        type: "hearing",
        importance: "high",
      },
      {
        id: "d10",
        date: "2024-04-30",
        description: "Discovery cutoff",
        type: "deadline",
        importance: "high",
      },
      {
        id: "d11",
        date: "2024-07-15",
        description: "Expert witness designation deadline",
        type: "deadline",
        importance: "medium",
      },
      {
        id: "d12",
        date: "2024-10-01",
        description: "Trial date (scheduled)",
        type: "hearing",
        importance: "high",
      },
    ],
    events: [
      {
        id: "e1",
        date: "2023-03-15",
        title: "Software Development Agreement Executed",
        description:
          "Meridian Corporation and Atlas Holdings LLC executed a $4.2M enterprise software development agreement (the 'Agreement') for development of a custom ERP system with delivery in two phases.",
        type: "agreement",
        parties_involved: ["p1", "p2"],
      },
      {
        id: "e2",
        date: "2023-06-30",
        title: "Phase 1 Delivery Accepted",
        description:
          "Atlas Holdings completed and delivered Phase 1 modules on schedule. Meridian's acceptance testing confirmed all Phase 1 deliverables met specifications. Milestone payment of $2.1M released.",
        type: "other",
        parties_involved: ["p1", "p2"],
      },
      {
        id: "e3",
        date: "2023-08-14",
        title: "Atlas Holdings Issues Delay Warning",
        description:
          "Atlas Holdings sent written notice to Meridian Corporation flagging potential Phase 2 delays due to semiconductor supply chain disruptions affecting development hardware. Estimated delay of 3–6 weeks cited.",
        type: "notice",
        parties_involved: ["p1", "p2"],
      },
      {
        id: "e4",
        date: "2023-09-30",
        title: "Phase 2 Delivery Deadline Missed",
        description:
          "Atlas Holdings failed to deliver Phase 2 ERP modules by the contractual deadline. Defendant claims Meridian changed specifications in July 2023 constituting a scope modification; Plaintiff denies any agreed modification.",
        type: "other",
        parties_involved: ["p1", "p2"],
      },
      {
        id: "e5",
        date: "2023-10-15",
        title: "Formal Notice of Material Breach Issued",
        description:
          "Meridian Corporation issued formal written notice of material breach pursuant to Section 12.3 of the Agreement, demanding cure within 30 days or commencement of damages and litigation.",
        type: "notice",
        parties_involved: ["p1", "p2"],
      },
      {
        id: "e6",
        date: "2023-11-08",
        title: "Complaint Filed — Delaware Court of Chancery",
        description:
          "Meridian filed complaint seeking $1.8M in direct damages, consequential damages, and preliminary/permanent injunctive relief preventing Atlas from deploying partial software to any third party.",
        type: "filing",
        parties_involved: ["p1", "p3"],
      },
      {
        id: "e7",
        date: "2023-12-01",
        title: "Defendant Served",
        description:
          "Atlas Holdings LLC formally served with summons and complaint at its registered Delaware address. 30-day clock for responsive pleading initiated.",
        type: "filing",
        parties_involved: ["p2", "p3"],
      },
      {
        id: "e8",
        date: "2024-01-15",
        title: "Answer and Counterclaim Filed",
        description:
          "Atlas Holdings filed answer denying material breach and asserting constructive contract modification defense. Counterclaim filed for $800K in unpaid Phase 2 milestone payments, alleging Plaintiff withheld payments in bad faith.",
        type: "filing",
        parties_involved: ["p2", "p3"],
      },
      {
        id: "e9",
        date: "2024-02-14",
        title: "Preliminary Injunction Hearing",
        description:
          "Scheduled hearing on Plaintiff's motion for preliminary injunction. Court will evaluate likelihood of success, irreparable harm, balance of equities, and public interest factors.",
        type: "hearing",
        parties_involved: ["p1", "p2", "p3"],
      },
    ],
    obligations: [
      {
        id: "o1",
        party: "Meridian Corporation",
        description: "File response to Atlas Holdings counterclaim",
        due_date: "2024-02-05",
        status: "pending",
      },
      {
        id: "o2",
        party: "Meridian Corporation",
        description: "Supplement preliminary injunction motion with expert declaration",
        due_date: "2024-02-10",
        status: "pending",
      },
      {
        id: "o3",
        party: "Both Parties",
        description: "Complete initial document production and interrogatory responses",
        due_date: "2024-04-30",
        status: "pending",
      },
      {
        id: "o4",
        party: "Both Parties",
        description: "Designate and disclose expert witnesses with reports",
        due_date: "2024-07-15",
        status: "pending",
      },
      {
        id: "o5",
        party: "Atlas Holdings LLC",
        description: "Preserve all development code, commits, and communications regarding Phase 2",
        due_date: null,
        status: "pending",
      },
    ],
    risks: [
      {
        id: "r1",
        title: "Counterclaim Exposure — $800K",
        description:
          "Atlas Holdings' counterclaim for unpaid milestone payments could substantially offset any damages award. The counterclaim rests on a plausible argument that Meridian's July 2023 communications constituted a scope modification. Assess strength of this evidence immediately.",
        severity: "high",
        category: "financial",
      },
      {
        id: "r2",
        title: "IP Ownership Ambiguity in Section 8.2",
        description:
          "Section 8.2 of the Agreement contains ambiguous 'work-made-for-hire' language that could be interpreted to vest IP ownership in Atlas Holdings for partially-completed modules, potentially undermining the injunctive relief strategy.",
        severity: "high",
        category: "contractual",
      },
      {
        id: "r3",
        title: "Preliminary Injunction Standard",
        description:
          "Failure to demonstrate irreparable harm at the February 14 hearing may result in denial of injunctive relief, allowing Atlas to deploy partial software to third parties and mooting a key claim.",
        severity: "high",
        category: "legal",
      },
      {
        id: "r4",
        title: "Constructive Modification Defense",
        description:
          "Atlas's defense that Meridian's July 2023 communications constituted an agreed scope modification could negate the breach finding. Discovery must focus on contradicting this narrative with contemporaneous records.",
        severity: "medium",
        category: "legal",
      },
      {
        id: "r5",
        title: "Discovery Exposure — Internal Communications",
        description:
          "Broad discovery requests from Atlas may surface internal Meridian communications discussing Phase 2 specification changes, potentially corroborating the modification defense.",
        severity: "medium",
        category: "operational",
      },
      {
        id: "r6",
        title: "Supply Chain Force Majeure Argument",
        description:
          "Atlas may argue semiconductor supply chain disruptions triggered force majeure provisions in Section 11.4, potentially excusing late performance. Review force majeure clause definition carefully.",
        severity: "medium",
        category: "contractual",
      },
    ],
    recommendations: [
      {
        id: "rec1",
        title: "Respond to Counterclaim by February 5",
        description:
          "The 21-day deadline to respond to Atlas Holdings' counterclaim expires February 5, 2024. Failure to respond will result in default on the counterclaim. Prepare answer with affirmative defenses including accord and satisfaction, waiver, and estoppel.",
        priority: "urgent",
        action_type: "immediate_action",
      },
      {
        id: "rec2",
        title: "Engage Technical Expert for Injunction Hearing",
        description:
          "Retain a software engineering expert by February 7 to provide declaration on the distinctiveness and deployability of the partial Phase 2 code. Expert testimony is critical to establish irreparable harm at the February 14 hearing.",
        priority: "urgent",
        action_type: "immediate_action",
      },
      {
        id: "rec3",
        title: "Issue Comprehensive Litigation Hold",
        description:
          "Immediately issue litigation hold notices to all Meridian personnel with access to communications regarding Phase 2 specifications. Preserve all emails, Slack messages, project management systems, and change request records.",
        priority: "high",
        action_type: "immediate_action",
      },
      {
        id: "rec4",
        title: "Commission IP Ownership Analysis",
        description:
          "Obtain expert legal opinion on Section 8.2 IP ownership provisions before the injunction hearing. If Atlas holds colorable IP claims to partial deliverables, revise injunction strategy to focus on misappropriation rather than property rights.",
        priority: "high",
        action_type: "consult",
      },
      {
        id: "rec5",
        title: "Evaluate Force Majeure Clause Applicability",
        description:
          "Review Section 11.4 force majeure definition against documented semiconductor supply chain data from August–September 2023. If force majeure arguably applies, proactively develop counterarguments before Atlas raises it at hearing.",
        priority: "high",
        action_type: "review",
      },
      {
        id: "rec6",
        title: "Assess Mediation Viability",
        description:
          "Given Atlas's partial performance and the costs of full discovery and trial, evaluate whether structured mediation before April 30 could achieve a favorable settlement, including escrow of Phase 2 code and revised delivery schedule.",
        priority: "medium",
        action_type: "review",
      },
    ],
  },
};

export const mockAnalysisList: StoredAnalysis[] = [
  mockAnalysis,
  {
    id: "demo-nda-002",
    filename: "Henderson_NDA_Executed_2024.pdf",
    fileSize: 847234,
    pageCount: 8,
    createdAt: "2024-01-10T14:22:00Z",
    status: "completed",
    result: null,
  },
  {
    id: "demo-lease-003",
    filename: "Commercial_Lease_Agreement_FY2024.pdf",
    fileSize: 3241089,
    pageCount: 52,
    createdAt: "2024-01-08T09:15:00Z",
    status: "completed",
    result: null,
  },
  {
    id: "demo-emp-004",
    filename: "Employment_Contract_Senior_VP.pdf",
    fileSize: 1204567,
    pageCount: 18,
    createdAt: "2024-01-05T16:45:00Z",
    status: "completed",
    result: null,
  },
];
