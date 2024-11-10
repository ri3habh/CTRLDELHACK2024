"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Brain, Rocket, Clock, Shield, Award, Users } from 'lucide-react'; // Using Lucide icons


export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    // Set up intersection observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
      });
    }, observerOptions);

    // Observe all elements with the 'animate-on-scroll' class
    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      observer.disconnect();
    };
  }, []);

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-purple-400" />,
      title: "AI-Powered Learning",
      description: "Advanced algorithms adapt to your learning style, creating personalized paths to mastery."
    },
    {
      icon: <Rocket className="w-12 h-12 text-purple-400" />,
      title: "Accelerated Progress",
      description: "Learn up to 5x faster with our optimized curriculum and adaptive testing system."
    },
    {
      icon: <Clock className="w-12 h-12 text-purple-400" />,
      title: "On-Demand Access",
      description: "Learn anytime, anywhere, with 24/7 access to expert-curated content and resources."
    },
    {
      icon: <Shield className="w-12 h-12 text-purple-400" />,
      title: "Guaranteed Results",
      description: "Our proven methodology ensures measurable improvement or your money back."
    },
    {
      icon: <Award className="w-12 h-12 text-purple-400" />,
      title: "Industry Recognition",
      description: "Earn certificates valued by top employers worldwide."
    },
    {
      icon: <Users className="w-12 h-12 text-purple-400" />,
      title: "Global Community",
      description: "Join millions of learners in our vibrant, supportive learning community."
    }
  ];

  return (
    <div className="bg-black">
      <main className="relative w-full bg-gradient-to-b from-black via-purple-900 to-purple-800">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center">
          <h1 className="text-6xl font-bold text-center text-white opacity-0 animate-fade-in-slow">
            Welcome to Omniverse
          </h1>
        </section>

        {/* Main Content Section */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center gap-12">
              {/* Main sentence */}
              <p className="text-2xl text-center text-white opacity-0 animate-on-scroll">
                Bygone are the days of <span className="underline italic">personal</span> tutoring.
              </p>

              {/* Second sentence with scroll effect */}
              <div className="text-center opacity-0 animate-on-scroll">
                <p className="text-xl text-gray-200">
                  Omnivision allows you to take control of what you want to learn, and when you can learn it.
                </p>
              </div>

              {/* Buttons Section */}
              <div className="flex space-x-4 opacity-0 animate-on-scroll">
                {/* Get Started Button */}
                <Link href="/tutors">
                  <button className="px-8 py-3 bg-black text-white font-semibold rounded-md shadow-lg hover:bg-gray-800 transition">
                    Get Started
                  </button>
                </Link>

                {/* Watch Demo Button */}
                <Link href="https://www.youtube.com/embed/dQw4w9WgXcQ">
                  <button className="px-8 py-3 bg-black text-white font-semibold rounded-md shadow-lg hover:bg-gray-800 transition">
                    Watch Demo
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="min-h-screen flex items-center justify-center py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center gap-12">
              {/* Video Box with Responsive Dimensions */}
              <div className="w-full max-w-3xl mx-auto opacity-0 animate-on-scroll">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Omnivision Product Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Text below the video */}
              <div className="text-center max-w-2xl opacity-0 animate-on-scroll">
                <p className="text-lg text-white">
                  What if tutoring no longer had to rely on the tutor's availability? What if you could dictate when to learn? Omnivision is here to make that a reality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center gap-16">
              {/* Section Header */}
              <div className="text-center space-y-4 opacity-0 animate-on-scroll">
                <h2 className="text-4xl font-bold text-white">Why Choose Omniverse?</h2>
                <p className="text-xl text-purple-200 max-w-2xl mx-auto">
                  Experience the future of education with our cutting-edge platform that's revolutionizing how people learn.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {features.map((feature, index) => (
                  <div 
                    key={feature.title}
                    className="bg-black bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 
                             hover:border-purple-500/40 transition-all duration-300 opacity-0 animate-on-scroll"
                  >
                    <div className="space-y-4">
                      <div className="bg-purple-900/50 rounded-lg p-3 w-fit">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      <p className="text-purple-200">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center space-y-6 opacity-0 animate-on-scroll">
                <p className="text-xl text-purple-200">
                  Join over 100,000+ students who have transformed their learning journey
                </p>
                <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md 
                                 shadow-lg transition-all duration-300 hover:scale-105">
                  Start Your Journey Today
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}