import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

dotenv.config();

const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/jobportal";
        await mongoose.connect(mongoUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

const demoCompanies = [
    {
        name: "TechCorp Solutions",
        description: "Leading technology company specializing in software development and digital transformation.",
        website: "https://techcorp.com",
        location: "Bangalore, India",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center"
    },
    {
        name: "DataFlow Analytics",
        description: "Data science and analytics company helping businesses make data-driven decisions.",
        website: "https://dataflow.com",
        location: "Mumbai, India",
        logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center"
    },
    {
        name: "CloudTech Innovations",
        description: "Cloud infrastructure and DevOps solutions provider.",
        website: "https://cloudtech.com",
        location: "Hyderabad, India",
        logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop&crop=center"
    },
    {
        name: "DesignStudio Pro",
        description: "Creative design agency specializing in UI/UX and brand identity.",
        website: "https://designstudio.com",
        location: "Delhi, India",
        logo: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=100&h=100&fit=crop&crop=center"
    },
    {
        name: "FinTech Solutions",
        description: "Financial technology company revolutionizing digital banking.",
        website: "https://fintech.com",
        location: "Pune, India",
        logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=100&fit=crop&crop=center"
    },
    {
        name: "HealthTech Innovations",
        description: "Healthcare technology company developing innovative medical solutions.",
        website: "https://healthtech.com",
        location: "Chennai, India",
        logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop&crop=center"
    }
];

const demoJobs = [
    {
        title: "Senior Frontend Developer",
        description: "We are looking for an experienced Frontend Developer to join our team. You will be responsible for building user-facing web applications using React, TypeScript, and modern web technologies.",
        requirements: [
            "5+ years of experience in frontend development",
            "Strong proficiency in React, TypeScript, and JavaScript",
            "Experience with modern CSS frameworks (Tailwind CSS, Styled Components)",
            "Knowledge of state management libraries (Redux, Zustand)",
            "Experience with testing frameworks (Jest, React Testing Library)",
            "Understanding of responsive design principles"
        ],
        salary: 15,
        experienceLevel: 5,
        location: "Bangalore, India",
        jobType: "Full-time",
        position: 2
    },
    {
        title: "Backend Developer - Node.js",
        description: "Join our backend team to build scalable APIs and microservices. You'll work with Node.js, Express, MongoDB, and cloud technologies to deliver high-performance applications.",
        requirements: [
            "3+ years of experience in backend development",
            "Proficiency in Node.js and Express.js",
            "Experience with MongoDB and database design",
            "Knowledge of RESTful API design principles",
            "Experience with cloud platforms (AWS, Azure, GCP)",
            "Understanding of authentication and security best practices"
        ],
        salary: 12,
        experienceLevel: 3,
        location: "Mumbai, India",
        jobType: "Full-time",
        position: 3
    },
    {
        title: "Data Scientist",
        description: "We're seeking a Data Scientist to analyze complex datasets and build machine learning models. You'll work on exciting projects involving predictive analytics and data visualization.",
        requirements: [
            "4+ years of experience in data science",
            "Strong programming skills in Python and R",
            "Experience with machine learning libraries (scikit-learn, TensorFlow, PyTorch)",
            "Knowledge of statistical analysis and data visualization",
            "Experience with SQL and database querying",
            "Understanding of big data technologies (Hadoop, Spark)"
        ],
        salary: 18,
        experienceLevel: 4,
        location: "Hyderabad, India",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "UI/UX Designer",
        description: "Create beautiful and intuitive user experiences for our digital products. You'll work closely with product managers and developers to design user-centered solutions.",
        requirements: [
            "3+ years of experience in UI/UX design",
            "Proficiency in design tools (Figma, Adobe Creative Suite)",
            "Strong portfolio showcasing design skills",
            "Understanding of user research and usability testing",
            "Knowledge of design systems and component libraries",
            "Experience with prototyping tools"
        ],
        salary: 10,
        experienceLevel: 3,
        location: "Delhi, India",
        jobType: "Full-time",
        position: 2
    },
    {
        title: "DevOps Engineer",
        description: "Help us build and maintain our cloud infrastructure. You'll work with CI/CD pipelines, containerization, and automation tools to ensure smooth deployments.",
        requirements: [
            "4+ years of experience in DevOps",
            "Experience with cloud platforms (AWS, Azure, GCP)",
            "Knowledge of containerization (Docker, Kubernetes)",
            "Experience with CI/CD pipelines (Jenkins, GitLab CI)",
            "Proficiency in infrastructure as code (Terraform, CloudFormation)",
            "Understanding of monitoring and logging tools"
        ],
        salary: 16,
        experienceLevel: 4,
        location: "Pune, India",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "Full Stack Developer",
        description: "Join our development team to build end-to-end web applications. You'll work on both frontend and backend technologies to deliver complete solutions.",
        requirements: [
            "3+ years of full-stack development experience",
            "Proficiency in React, Node.js, and JavaScript",
            "Experience with databases (MongoDB, PostgreSQL)",
            "Knowledge of RESTful APIs and GraphQL",
            "Understanding of version control (Git)",
            "Experience with testing and deployment"
        ],
        salary: 14,
        experienceLevel: 3,
        location: "Chennai, India",
        jobType: "Full-time",
        position: 2
    },
    {
        title: "Mobile App Developer (React Native)",
        description: "Develop cross-platform mobile applications using React Native. You'll create engaging mobile experiences for both iOS and Android platforms.",
        requirements: [
            "3+ years of mobile development experience",
            "Proficiency in React Native and JavaScript",
            "Experience with native mobile development (iOS/Android)",
            "Knowledge of mobile app architecture patterns",
            "Understanding of app store deployment processes",
            "Experience with mobile testing frameworks"
        ],
        salary: 13,
        experienceLevel: 3,
        location: "Bangalore, India",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "Product Manager",
        description: "Lead product development initiatives and work with cross-functional teams to deliver innovative solutions. You'll define product strategy and roadmap.",
        requirements: [
            "5+ years of product management experience",
            "Strong analytical and problem-solving skills",
            "Experience with agile development methodologies",
            "Knowledge of product analytics and user research",
            "Excellent communication and leadership skills",
            "Understanding of technical concepts and constraints"
        ],
        salary: 20,
        experienceLevel: 5,
        location: "Mumbai, India",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "Cybersecurity Analyst",
        description: "Protect our systems and data from cyber threats. You'll monitor security events, conduct vulnerability assessments, and implement security measures.",
        requirements: [
            "4+ years of cybersecurity experience",
            "Knowledge of security frameworks and standards",
            "Experience with security tools and technologies",
            "Understanding of network security and protocols",
            "Certifications (CISSP, CISM, CEH) preferred",
            "Strong analytical and problem-solving skills"
        ],
        salary: 17,
        experienceLevel: 4,
        location: "Hyderabad, India",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "Marketing Manager",
        description: "Drive marketing initiatives and brand awareness. You'll develop marketing strategies, manage campaigns, and analyze performance metrics.",
        requirements: [
            "4+ years of marketing experience",
            "Experience with digital marketing channels",
            "Knowledge of marketing analytics and tools",
            "Strong creative and analytical skills",
            "Experience with content creation and social media",
            "Understanding of SEO and SEM"
        ],
        salary: 11,
        experienceLevel: 4,
        location: "Delhi, India",
        jobType: "Full-time",
        position: 1
    }
];

const addDemoData = async () => {
    try {
        await connectDB();

        // Create demo recruiter user
        const hashedPassword = await bcrypt.hash("demo123", 10);
        const recruiter = await User.create({
            fullname: "Demo Recruiter",
            email: "recruiter@demo.com",
            phoneNumber: "9876543210",
            password: hashedPassword,
            role: "recruiter",
            profile: {
                profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                bio: "Experienced recruiter helping companies find top talent",
                skills: ["Recruitment", "HR Management", "Talent Acquisition"],
                resume: "",
                resumeOriginalName: ""
            }
        });

        console.log("Demo recruiter created:", recruiter.email);

        // Create demo companies
        const createdCompanies = [];
        for (const companyData of demoCompanies) {
            const company = await Company.create({
                ...companyData,
                userId: recruiter._id
            });
            createdCompanies.push(company);
            console.log(`Company created: ${company.name}`);
        }

        // Create demo jobs
        for (let i = 0; i < demoJobs.length; i++) {
            const jobData = demoJobs[i];
            const company = createdCompanies[i % createdCompanies.length]; // Distribute jobs across companies
            
            const job = await Job.create({
                ...jobData,
                company: company._id,
                created_by: recruiter._id,
                applications: []
            });
            console.log(`Job created: ${job.title} at ${company.name}`);
        }

        console.log("\n✅ Demo data added successfully!");
        console.log(`📊 Created:`);
        console.log(`   - 1 Demo Recruiter`);
        console.log(`   - ${createdCompanies.length} Demo Companies`);
        console.log(`   - ${demoJobs.length} Demo Jobs`);
        console.log("\n🔑 Demo Login Credentials:");
        console.log(`   Email: recruiter@demo.com`);
        console.log(`   Password: demo123`);
        console.log(`   Role: Recruiter`);

    } catch (error) {
        console.error("Error adding demo data:", error);
    } finally {
        await mongoose.connection.close();
        console.log("\n📝 Database connection closed.");
    }
};

// Run the script
addDemoData();
