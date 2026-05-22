export type EventType = "CONFERENCE" | "SEMINAR" | "WORKSHOP";
export type EventStatus = "UPCOMING" | "COMPLETED";

export interface ScienceEvent {
  id: string;
  title: string;
  dateDay: string;
  dateMonth: string;
  type: EventType;
  status: EventStatus;
  img: string;
  description: string;
  speaker?: string;
  location?: string;
  time?: string;
}

export const eventsData: ScienceEvent[] = [
  {
    id: "evt-01",
    title: "AI Horizons Summit '25",
    dateDay: "12",
    dateMonth: "OCT",
    type: "CONFERENCE",
    status: "UPCOMING",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    description: "Join leading minds in AI research for a full-day summit covering the latest breakthroughs in large language models, computer vision, and AI ethics. Expect keynote speeches, panel discussions, and interactive Q&A sessions.",
    speaker: "Dr. Elena Rostova & Prof. Marcus Chen",
    location: "Main Auditorium, Science Block",
    time: "09:00 AM - 05:00 PM"
  },
  {
    id: "evt-02",
    title: "Quantum Computing Hardware",
    dateDay: "18",
    dateMonth: "OCT",
    type: "SEMINAR",
    status: "UPCOMING",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description: "A deep dive into the physical architecture of quantum computers. We will explore superconducting qubits, trapped ions, and the engineering challenges of scaling up quantum systems while minimizing decoherence.",
    speaker: "Dr. James Aris",
    location: "Room 402, Physics Dept",
    time: "02:00 PM - 04:00 PM"
  },
  {
    id: "evt-03",
    title: "Autonomous Robotics Build V2",
    dateDay: "04",
    dateMonth: "NOV",
    type: "WORKSHOP",
    status: "UPCOMING",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    description: "A hands-on workshop where participants will assemble and program autonomous rovers using ROS (Robot Operating System) and basic computer vision for obstacle avoidance.",
    speaker: "Robotics Club Lead",
    location: "Engineering Lab 3",
    time: "10:00 AM - 03:00 PM"
  },
  {
    id: "evt-04",
    title: "Neural Network Research Seminar",
    dateDay: "22",
    dateMonth: "SEP",
    type: "SEMINAR",
    status: "COMPLETED",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    description: "Review of recent papers on parameter-efficient fine-tuning (PEFT) methods for neural networks, focusing on LoRA and QLoRA.",
    speaker: "Sarah Jenkins, PhD Candidate",
    location: "Virtual (Zoom)",
    time: "06:00 PM - 07:30 PM"
  },
  {
    id: "evt-05",
    title: "Advanced Electronics Architecture",
    dateDay: "14",
    dateMonth: "AUG",
    type: "WORKSHOP",
    status: "COMPLETED",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    description: "An intensive session on PCB design and high-frequency circuit architecture using modern CAD tools.",
    speaker: "Prof. David Lin",
    location: "Electronics Lab 1",
    time: "01:00 PM - 05:00 PM"
  }
];
