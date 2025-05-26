import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect, useRef } from "react";
import { 
  Brain, 
  ExternalLink, 
  ChevronRight,
  ArrowUpRight,
  ChevronLeft,
  Bot,
  Sparkles,
  Rocket,
  Phone,
  Send
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useForm as useFormspree } from '@formspree/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

function App() {
  // const [openDemo, setOpenDemo] = useState(false);
  // const [openPrototype, setOpenPrototype] = useState(false);
  // const [openConsultation, setOpenConsultation] = useState(false);
  const [openContactForm, setOpenContactForm] = useState(false);
  // const [email, setEmail] = useState("");
  // const [websiteUrl, setWebsiteUrl] = useState("");
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [manualScrollTimeout, setManualScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm();
  const [bookACallFormState, sendToFormspree] = useFormspree("mjkwalwv");
  
  const { register: registerContact, handleSubmit: handleSubmitContact, reset: resetContact, formState: { errors: errorsContact } } = useForm();
  const [contactFormState, sendToContactFormspree] = useFormspree("xblozwqw");

  const onSubmit = async (data: any) => {
    try {
      await sendToFormspree(data);
      toast.success("Thanks! We'll get back to you shortly.");
      setOpenContactForm(false);
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const onSubmitContact = async (data: any) => {
    try {
      await sendToContactFormspree(data);
      toast.success("Message sent successfully! We'll get back to you soon.");
      resetContact();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const scrollContainer = testimonialRef.current;
    if (!scrollContainer || !isAutoScrolling) return;

    const scroll = () => {
      if (scrollContainer) {
        setScrollPosition((prev) => {
          const newPosition = prev + 1;
          if (newPosition > scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            return 0;
          }
          return newPosition;
        });
        scrollContainer.scrollLeft = scrollPosition;
      }
    };

    const interval = setInterval(scroll, 50);
    return () => clearInterval(interval);
  }, [scrollPosition, isAutoScrolling]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (manualScrollTimeout) {
      clearTimeout(manualScrollTimeout);
    }
    
    setIsAutoScrolling(false);
    const scrollContainer = testimonialRef.current;
    if (!scrollContainer) return;

    const cardWidth = 400 + 24;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    const timeout = setTimeout(() => {
      setIsAutoScrolling(true);
      setScrollPosition(scrollContainer.scrollLeft);
    }, 10000);
    
    setManualScrollTimeout(timeout);
  };

  const testimonials = [
  {
    name: "James Wilson",
    displayName: "James W - CTO",
    image: "https://images.pexels.com/photos/12437056/pexels-photo-12437056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://example.com/james-wilson",
    text: "The AI integration has completely transformed our customer service operations. Response times are down 70% and customer satisfaction is at an all-time high."
  },
  {
    name: "Michael Chen",
    displayName: "Michael C - Founder",
    image: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://example.com/michael-chen",
    text: "VeltekAI's lead generation system has been a game-changer. We've seen a 300% increase in qualified leads within just two months."
  },
  {
    name: "David Rodriguez",
    displayName: "David R - Head of Operations",
    image: "https://images.pexels.com/photos/3777952/pexels-photo-3777952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://example.com/david-rodriguez",
    text: "We started using their AI phone call automation and it's been a total time-saver. It handles all our initial screening calls, and it sounds incredibly natural too."
  },
  {
    name: "Robert Thompson",
    displayName: "Robert T - CEO",
    image: "https://images.pexels.com/photos/3785110/pexels-photo-3785110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://example.com/robert-thompson",
    text: "Implementing VeltekAI's solutions was the best decision we made this year. Our ROI has been phenomenal."
  },
  {
    name: "Thomas Anderson",
    displayName: "Thomas A - Marketing Director",
    image: "https://images.pexels.com/photos/4345160/pexels-photo-4345160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://example.com/thomas-anderson",
    text: "I didn't expect the AI live chat agent to handle real customer questions so well. It's freed up our team and our support quality has gone up."
  },
  {
    name: "William Zhang",
    displayName: "William Z - Product Manager",
    image: "https://images.pexels.com/photos/17582358/pexels-photo-17582358/free-photo-of-man-in-suit.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://example.com/william-zhang",
    text: "Their AI lead system helped us go from 15 to over 200 contacts per day. It's literally working while we sleep."
  },
  {
    name: "Christopher Lee",
    displayName: "Christopher L - Sales Director",
    image: "https://images.pexels.com/photos/23496905/pexels-photo-23496905/free-photo-of-a-man-in-a-suit-and-tie-standing-in-an-office.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://example.com/christopher-lee",
    text: "Our sales team's productivity has doubled since implementing VeltekAI's automation tools. The results speak for themselves."
  },
  {
    name: "Kevin Park",
    displayName: "Kevin P - Operations Manager",
    image: "https://images.pexels.com/photos/18642682/pexels-photo-18642682/free-photo-of-man-in-suit-with-tie.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://example.com/kevin-park",
    text: "Their voice automation handled follow-up calls better than some of our reps. Honestly shocked at how natural it sounds."
  },
  {
    name: "Andrew Johnson",
    displayName: "Andrew J - Founder",
    image: "https://images.pexels.com/photos/3780030/pexels-photo-3780030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://example.com/andrew-johnson",
    text: "We used their lead gen AI and started seeing responses within the first 24 hours. It's like having a sales intern working nonstop."
  }
];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold">VeltekAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#who-we-are" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#packages" className="hover:text-purple-400 transition-colors">Services</a>
            <a href="#testimonials" className="hover:text-purple-400 transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
            <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500/20" onClick={() => setOpenContactForm(true)}>
              Book a Call <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-purple-500/50 text-purple-400">
              AI-Powered Business Solutions
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Automate Your Business.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                Generate More Leads.
              </span>
              <br />
              Save Time with AI.
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Discover the power of cutting-edge AI systems to transform your business processes today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700" onClick={() => setOpenContactForm(true)}>
                Book - Your Demo Call <ArrowUpRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-purple-500/50 hover:bg-purple-500/20">
                <a href="#packages" className="hover:text-purple-400 transition-colors">Our Services</a>
              </Button>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex -space-x-4 mb-4">
                <img src="https://images.pexels.com/photos/23496905/pexels-photo-23496905/free-photo-of-a-man-in-a-suit-and-tie-standing-in-an-office.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="User" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                <img src="https://images.pexels.com/photos/3785110/pexels-photo-3785110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="User" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                <img src="https://images.pexels.com/photos/12437056/pexels-photo-12437056.jpeg" alt="User" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                <img src="https://images.pexels.com/photos/17582358/pexels-photo-17582358/free-photo-of-man-in-suit.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="User" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                <img src="https://images.pexels.com/photos/18642682/pexels-photo-18642682/free-photo-of-man-in-suit-with-tie.jpeg" alt="User" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-400">Loved by Business Leaders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Time Savings Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-purple-400 text-xl mb-4">SAVE HUNDREDS OF HOURS</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              We know you are tired of this
              <div className="relative inline-block ml-2">
                <div className="absolute bottom-0 left-0 w-full h-2 bg-purple-500/30 -rotate-1"></div>
              </div>
            </h3>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              We know you're tired of wasting hundreds of hours on repetitive tasks and manual processes. Our AI solutions automate everything so you can focus on growing your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-purple-500/20 -z-10 hidden lg:block"></div>
            
            <Card className="bg-black/40 border-purple-500/20 p-6 text-center hover:border-purple-500/40 transition-all">
              <p className="text-purple-400 text-2xl font-bold mb-2">80h+</p>
              <p className="text-sm text-gray-400">Manual customer service & support</p>
            </Card>
            
            <Card className="bg-black/40 border-purple-500/20 p-6 text-center hover:border-purple-500/40 transition-all">
              <p className="text-purple-400 text-2xl font-bold mb-2">240h+</p>
              <p className="text-sm text-gray-400">Lead generation & outreach</p>
            </Card>
            
            <Card className="bg-black/40 border-purple-500/20 p-6 text-center hover:border-purple-500/40 transition-all">
              <p className="text-purple-400 text-2xl font-bold mb-2">6h+</p>
              <p className="text-sm text-gray-400">Processing each lead manually</p>
            </Card>
            
            <Card className="bg-black/40 border-purple-500/20 p-6 text-center hover:border-purple-500/40 transition-all">
              <p className="text-purple-400 text-2xl font-bold mb-2">2h+</p>
              <p className="text-sm text-gray-400">Per customer interaction</p>
            </Card>
            
            <Card className="bg-black/40 border-purple-500/20 p-6 text-center hover:border-purple-500/40 transition-all">
              <p className="text-purple-400 text-2xl font-bold mb-2">10h+</p>
              <p className="text-sm text-gray-400">Data entry & management</p>
            </Card>
            
            <Card className="bg-black/40 border-purple-500/20 p-6 text-center hover:border-purple-500/40 transition-all">
              <p className="text-purple-400 text-2xl font-bold mb-2">∞</p>
              <p className="text-sm text-gray-400">Other repetitive tasks</p>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-xl text-purple-400">
              = <span className="font-bold">338+ saved hours</span> per month with{" "}
              <span className="text-white">VeltekAI automation</span>
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="who-we-are" className="py-20 bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Are</h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              VeltekAI is a modern AI automation agency specializing in building powerful, custom-tailored automation systems that transform how businesses operate. We turn your automation dreams into reality.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="bg-black/40 border-purple-500/20 p-8 hover:border-purple-500/40 transition-all hover:translate-y-[-4px]">
              <Bot className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Customer Service</h3>
              <p className="text-gray-400">
                Intelligent AI agents that handle customer support directly on your website, providing instant responses and solving issues 24/7 without human intervention.
              </p>
            </Card>

            <Card className="bg-black/40 border-purple-500/20 p-8 hover:border-purple-500/40 transition-all hover:translate-y-[-4px]">
              <Sparkles className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Lead Generation AI</h3>
              <p className="text-gray-400">
                Our AI system autonomously identifies and reaches out to hundreds of potential leads daily, maintaining natural conversations and qualifying prospects automatically.
              </p>
            </Card>

            <Card className="bg-black/40 border-purple-500/20 p-8 hover:border-purple-500/40 transition-all hover:translate-y-[-4px]">
              <Phone className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Automated Phone Callers</h3>
              <p className="text-gray-400">
                Advanced AI-powered phone systems that handle appointments, inquiries, and follow-ups with natural-sounding conversations, available 24/7 for your business needs.
              </p>
            </Card>

            <Card className="bg-black/40 border-purple-500/20 p-8 hover:border-purple-500/40 transition-all hover:translate-y-[-4px]">
              <Rocket className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Custom Solutions</h3>
              <p className="text-gray-400">
                Dream it. We build it. From automated workflow systems to complex AI integrations, we create custom solutions that perfectly match your business needs.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose the Right AI Solution</h2>
            <p className="text-xl text-gray-400">
              Powerful packages designed to scale with your business needs
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 items-start">
            {/* AI Customer Service Card */}
            <Card className="bg-black/40 border-purple-500/20 p-8 hover:border-purple-500/40 transition-all">
              <h3 className="text-2xl font-bold mb-2">AI Customer Service</h3>
              <p className="text-gray-400 mb-6">
                Smart, dynamic, and fully automated customer service agents integrated with your CRM.
                They handle inquiries, bookings, and support around the clock—without the need for human reps.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-300">
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  24/7 customer support
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  Automated appointment booking
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  CRM integration
                </li>
              </ul>
              <Button 
  className="w-full bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm md:text-base px-2 py-3 leading-tight text-center"
  onClick={() => setOpenContactForm(true)}
>
  Get Your Free Prototype
</Button>

            </Card>

            {/* Lead Generation AI Card */}
            <Card className="bg-black/40 border-purple-500/20 p-10 hover:border-purple-500/40 transition-all transform scale-105 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/20">
                Most Popular
              </Badge>
              <h3 className="text-3xl font-bold mb-3">Lead Generation AI</h3>
              <p className="text-gray-400 mb-2">
                Effortlessly boost your lead flow with a fully built AI system that finds and contacts ideal clients.
              </p>
              <p className="text-gray-400 mb-2">
                Start generating qualified leads daily—automatically, consistently, and at scale.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-300">
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  Automated lead identification
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  Smart contact scheduling
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  Performance analytics
                </li>
              </ul>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-sm sm:text-base py-5"
                onClick={() => setOpenContactForm(true)}
              >
                Book Your Demo Call
              </Button>
            </Card>

            {/* AI Automated Phone Callers Card */}
            <Card className="bg-black/40 border-purple-500/20 p-8 hover:border-purple-500/40 transition-all">
              <h3 className="text-2xl font-bold mb-2">AI Phone Automation</h3>
              <p className="text-gray-400 mb-6">
                Transform your phone operations with AI-powered calling systems that handle appointments, follow-ups, and customer inquiries with natural-sounding conversations.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-300">
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  Natural voice interactions
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  24/7 availability
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  Automated scheduling
                </li>
              </ul>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-sm sm:text-base"
                onClick={() => setOpenContactForm(true)}
              >
                Get Your Free Prototype
              </Button>
            </Card>

            {/* Custom AI Solutions Card */}
            <Card className="bg-black/40 border-purple-500/20 p-8 hover:border-purple-500/40 transition-all">
              <h3 className="text-2xl font-bold mb-2">Custom AI Solutions</h3>
              <p className="text-gray-400 mb-6">
                If you can dream it, we can build it—AI automation tailored exactly to your needs.
                From internal tools to full-scale customer systems, we create custom solutions that work the way you do.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-300">
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  Custom development
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  Dedicated support
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  Scalable infrastructure
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full border-purple-500 hover:bg-purple-500/20 text-sm sm:text-base"
                onClick={() => setOpenContactForm(true)}
              >
                Book a Consultation
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-purple-900/20 to-transparent overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-400">Success stories from businesses like yours</p>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={() => handleScroll('left')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-purple-600/80 hover:bg-purple-600 rounded-full p-2 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={() => handleScroll('right')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2  z-10 bg-purple-600/80 hover:bg-purple-600 rounded-full p-2 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={testimonialRef}
            className="flex gap-6 overflow-x-hidden whitespace-nowrap pb-8"
            style={{ scrollBehavior: 'smooth' }}
          >
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <Card key={index} className="bg-black/40 border-purple-500/20 p-8 min-w-[400px] whitespace-normal">
                <p className="text-gray-300 mb-6 h-32">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-end gap-3">
                  <div className="text-right">
                    <a 
                      href={testimonial.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-semibold text-white hover:underline flex items-center gap-3"
                    >
                      {testimonial.displayName}
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-purple-500/50 text-purple-400">
              FREQUENTLY ASKED QUESTIONS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Common Questions About Our AI Solutions</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Looking for answers? Browse our FAQ below or reach out to our team{" "}
              <a
                href="#contact"
                className="font-bold underline text-purple-400 hover:text-purple-300 transition-colors"
              >
                directly
              </a>
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border-purple-500/20 px-6">
                <AccordionTrigger className="text-left hover:text-purple-400 text-lg">
                  How quickly can I get started with VeltekAI?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Most of our AI solutions can be implemented within 24–48 hours. After your initial consultation, we'll customize the AI system to your needs and have you up and running quickly. Our team handles all the technical setup, making the process seamless for you.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-purple-500/20 px-6">
                <AccordionTrigger className="text-left hover:text-purple-400 text-lg">
                  Do you offer full ownership or monthly retainers?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Yes, we offer both options depending on your needs. With <strong>full ownership</strong>, you purchase the entire AI system and receive training before we hand it off — it's yours to manage. However, with <strong>monthly retainers</strong>, you get a hands-off experience where we handle everything — from operation to maintenance — while you pay a monthly fee.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-purple-500/20 px-6">
                <AccordionTrigger className="text-left hover:text-purple-400 text-lg">
                  What kind of results can I expect?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Our clients typically see a 70% reduction in response times, 300% increase in lead generation, and save 300+ hours per month through automation. Results vary based on your specific implementation and business needs, but we consistently deliver significant ROI.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-purple-500/20 px-6">
                <AccordionTrigger className="text-left hover:text-purple-400 text-lg">
                  Do I need technical knowledge to use your AI solutions?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  No technical knowledge is required. Our systems are designed to be user-friendly and we provide full training and support. Our team handles all the technical aspects while you focus on growing your business.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-purple-500/20 px-6">
                <AccordionTrigger className="text-left hover:text-purple-400 text-lg">
                  How customizable are your AI solutions?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Our AI solutions are fully customizable to your specific business needs. Whether you need custom workflows, specific integrations, or unique automation rules, we can tailor every aspect of the system to work exactly as you need it to.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-purple-500/20 px-6">
                <AccordionTrigger className="text-left hover:text-purple-400 text-lg">
                  What kind of support do you provide?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  We provide comprehensive support including 24/7 technical assistance, regular system updates, performance monitoring, and ongoing optimization. Our team is always available to help you get the most out of your AI automation system.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-xl text-gray-400">
                Have a question or want to learn more? Send us a message and we'll get back to you shortly.
              </p>
            </div>

            <Card className="bg-black/40 border-purple-500/20 p-8">
              <form onSubmit={handleSubmitContact(onSubmitContact)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Your Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="you@example.com"
                    {...registerContact("email", { required: true })}
                    className="bg-black/50 border-purple-500/20 focus:border-purple-500"
                  />
                  {errorsContact.email && <span className="text-red-500 text-sm">Email is required</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="What's this about?"
                    {...registerContact("subject", { required: true })}
                    className="bg-black/50 border-purple-500/20 focus:border-purple-500"
                  />
                  {errorsContact.subject && <span className="text-red-500 text-sm">Subject is required</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    {...registerContact("message", { required: true })}
                    className="bg-black/50 border-purple-500/20 focus:border-purple-500 min-h-[200px]"
                  />
                  {errorsContact.message && <span className="text-red-500 text-sm">Message is required</span>}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={contactFormState.submitting}
                >
                  {contactFormState.submitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Take the first step towards automation and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xl mx-auto">
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 px-11 py-7 text-xl w-full sm:w-auto"
              >
                <a href="#packages" className="hover:text-white transition-colors">
                  Get Your Free Demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <Dialog open={openContactForm} onOpenChange={setOpenContactForm}>
        <DialogContent className="bg-black/95 border-purple-500/20 max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">Book Your Demo Call</DialogTitle>
            <DialogDescription>
              Fill out the form below and we'll get back to you as soon as possible
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: true })}
                className="bg-black/50 border-purple-500/20 focus:border-purple-500"
              />
              {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">What Service is this call about?</Label>
              <Controller
                name="subject"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-black/50 border-purple-500/20">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-purple-500/20">
                      <SelectItem value="lead-generation">Lead Generation AI</SelectItem>
                      <SelectItem value="customer-service">AI Customer Service Agent</SelectItem>
                      <SelectItem value="phone-automation">Phone Call Automation</SelectItem>
                      <SelectItem value="custom">Custom Solutions</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.subject && <span className="text-red-500 text-sm">Please select a service</span>}
            </div>

            <div className="space-y-2">
              <Label>Select 3 times you're available for a 30-minute meeting</Label>
              <div className="space-y-3">
                {[1, 2, 3].map((index) => (
                  <Input
                    key={index}
                    placeholder="e.g. Feb 2 at 3:00 PM EST"
                    {...register(`time${index}`, { required: true })}
                    className="bg-black/50 border-purple-500/20 focus:border-purple-500"
                  />
                ))}
              </div>
              {(errors.time1 || errors.time2 || errors.time3) && (
                <span className="text-red-500 text-sm">Please provide 3 time slots</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Details (optional)</Label>
              <Textarea
                id="message"
                placeholder="Feel free to share any other information about your request..."
                {...register("message")}
                className="bg-black/50 border-purple-500/20 focus:border-purple-500 min-h-[100px]"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={bookACallFormState.submitting}
            >
              {bookACallFormState.submitting ? "Sending..." : "Send Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400">
              © {new Date().getFullYear()} VeltekAI All rights reserved.
            </div>
            <nav className="flex gap-6 text-gray-400">
              <a href="#who-we-are" className="hover:text-purple-400 transition-colors">About Us</a>
              <a href="#testimonials" className="hover:text-purple-400 transition-colors">Testimonials</a>
              <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;