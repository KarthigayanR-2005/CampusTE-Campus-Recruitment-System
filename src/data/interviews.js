const interviews = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer Intern",
      interviewer: "Rahul Sharma",
      round: "Technical Interview",
      date: "24 Jul 2026",
      time: "10:30 AM",
      duration: "60 Minutes",
      mode: "Online",
      location: "Google Meet",
      meetingLink: "https://meet.google.com/example-google",
      status: "Upcoming",
      salary: "₹12 LPA",
      instructions: [
        "Join 10 minutes before the scheduled time.",
        "Keep your webcam turned on throughout the interview.",
        "Have a stable internet connection.",
        "Carry a valid college ID."
      ],
      documents: [
        "Resume",
        "Government ID",
        "Academic Transcript"
      ],
      timeline: [
        {
          stage: "Application Submitted",
          completed: true,
          date: "10 Jul 2026",
        },
        {
          stage: "Resume Shortlisted",
          completed: true,
          date: "13 Jul 2026",
        },
        {
          stage: "Assessment Completed",
          completed: true,
          date: "18 Jul 2026",
        },
        {
          stage: "Technical Interview",
          completed: false,
          date: "24 Jul 2026",
        },
        {
          stage: "HR Interview",
          completed: false,
          date: "-",
        },
      ],
    },
  
    {
      id: 2,
      company: "Microsoft",
      role: "Frontend Developer Intern",
      interviewer: "Priya Nair",
      round: "HR Interview",
      date: "28 Jul 2026",
      time: "02:00 PM",
      duration: "45 Minutes",
      mode: "Hybrid",
      location: "Microsoft Office, Bangalore",
      meetingLink: "",
      status: "Upcoming",
      salary: "₹10 LPA",
      instructions: [
        "Dress in business casual attire.",
        "Carry two copies of your resume.",
      ],
      documents: [
        "Resume",
        "Passport-size Photograph",
      ],
      timeline: [
        {
          stage: "Application Submitted",
          completed: true,
          date: "09 Jul 2026",
        },
        {
          stage: "Resume Shortlisted",
          completed: true,
          date: "12 Jul 2026",
        },
        {
          stage: "Technical Interview",
          completed: true,
          date: "22 Jul 2026",
        },
        {
          stage: "HR Interview",
          completed: false,
          date: "28 Jul 2026",
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
      role: "SDE Intern",
      interviewer: "Amit Verma",
      round: "Technical Interview",
      date: "15 Jul 2026",
      time: "11:00 AM",
      duration: "60 Minutes",
      mode: "Online",
      location: "Amazon Chime",
      meetingLink: "https://amazon.com/interview",
      status: "Completed",
      salary: "₹14 LPA",
      instructions: [
        "Use a laptop.",
        "Test your microphone beforehand.",
      ],
      documents: [
        "Resume",
      ],
      timeline: [
        {
          stage: "Application Submitted",
          completed: true,
          date: "01 Jul 2026",
        },
        {
          stage: "Resume Shortlisted",
          completed: true,
          date: "05 Jul 2026",
        },
        {
          stage: "Assessment",
          completed: true,
          date: "09 Jul 2026",
        },
        {
          stage: "Technical Interview",
          completed: true,
          date: "15 Jul 2026",
        },
      ],
    },
  
    {
      id: 4,
      company: "Adobe",
      role: "UI/UX Intern",
      interviewer: "Sneha Kapoor",
      round: "HR Interview",
      date: "18 Jul 2026",
      time: "09:30 AM",
      duration: "30 Minutes",
      mode: "Offline",
      location: "Adobe Bangalore Campus",
      meetingLink: "",
      status: "Missed",
      salary: "₹9 LPA",
      instructions: [
        "Reach the venue 30 minutes early.",
      ],
      documents: [
        "Resume",
        "College ID",
      ],
      timeline: [
        {
          stage: "Application Submitted",
          completed: true,
          date: "02 Jul 2026",
        },
        {
          stage: "Resume Shortlisted",
          completed: true,
          date: "06 Jul 2026",
        },
        {
          stage: "HR Interview",
          completed: false,
          date: "18 Jul 2026",
        },
      ],
    },
  ];
  
  export default interviews;