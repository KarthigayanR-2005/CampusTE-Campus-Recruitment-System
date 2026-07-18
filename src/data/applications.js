const applications = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer Intern",
      location: "Bangalore",
      appliedDate: "2026-07-10",
      status: "Technical Interview",
      progress: 70,
      recruiter: "Priya Sharma",
      mode: "Remote",
      salary: "₹12 LPA",
      timeline: [
        {
          stage: "Applied",
          completed: true,
          date: "10 Jul 2026",
        },
        {
          stage: "Resume Shortlisted",
          completed: true,
          date: "12 Jul 2026",
        },
        {
          stage: "Assessment",
          completed: true,
          date: "15 Jul 2026",
        },
        {
          stage: "Technical Interview",
          completed: false,
          date: "Upcoming",
        },
        {
          stage: "HR Interview",
          completed: false,
          date: "-",
        },
        {
          stage: "Offer",
          completed: false,
          date: "-",
        },
      ],
    },
  
    {
      id: 2,
      company: "Microsoft",
      role: "Frontend Developer",
      location: "Hyderabad",
      appliedDate: "2026-07-08",
      status: "Assessment",
      progress: 50,
      recruiter: "Rahul Mehta",
      mode: "Hybrid",
      salary: "₹14 LPA",
      timeline: [
        {
          stage: "Applied",
          completed: true,
          date: "08 Jul 2026",
        },
        {
          stage: "Resume Shortlisted",
          completed: true,
          date: "10 Jul 2026",
        },
        {
          stage: "Assessment",
          completed: false,
          date: "Tomorrow",
        },
        {
          stage: "Technical Interview",
          completed: false,
          date: "-",
        },
        {
          stage: "HR Interview",
          completed: false,
          date: "-",
        },
        {
          stage: "Offer",
          completed: false,
          date: "-",
        },
      ],
    },
  
    {
      id: 3,
      company: "Amazon",
      role: "AI Engineer",
      location: "Chennai",
      appliedDate: "2026-07-05",
      status: "Offer Released",
      progress: 100,
      recruiter: "Sneha Kapoor",
      mode: "On-site",
      salary: "₹18 LPA",
      timeline: [
        {
          stage: "Applied",
          completed: true,
          date: "05 Jul 2026",
        },
        {
          stage: "Resume Shortlisted",
          completed: true,
          date: "07 Jul 2026",
        },
        {
          stage: "Assessment",
          completed: true,
          date: "09 Jul 2026",
        },
        {
          stage: "Technical Interview",
          completed: true,
          date: "12 Jul 2026",
        },
        {
          stage: "HR Interview",
          completed: true,
          date: "14 Jul 2026",
        },
        {
          stage: "Offer",
          completed: true,
          date: "16 Jul 2026",
        },
      ],
    },
  
    {
      id: 4,
      company: "Adobe",
      role: "UI/UX Designer",
      location: "Remote",
      appliedDate: "2026-07-02",
      status: "Rejected",
      progress: 100,
      recruiter: "Aman Verma",
      mode: "Remote",
      salary: "₹10 LPA",
      timeline: [
        {
          stage: "Applied",
          completed: true,
          date: "02 Jul 2026",
        },
        {
          stage: "Resume Shortlisted",
          completed: true,
          date: "04 Jul 2026",
        },
        {
          stage: "Assessment",
          completed: true,
          date: "06 Jul 2026",
        },
        {
          stage: "Technical Interview",
          completed: true,
          date: "09 Jul 2026",
        },
        {
          stage: "Rejected",
          completed: true,
          date: "11 Jul 2026",
        },
      ],
    },
  ];
  
  export default applications;