"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    address: "",
    description: ""
  });

  // Native Next.js hash tracking - opens precisely when href="#contact" is called anywhere
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#contact") {
        setIsOpen(true);
        document.body.style.overflow = "hidden"; // Prevent background scroll lock
      } else {
        setIsOpen(false);
        setStatus("idle");
        document.body.style.overflow = "";
      }
    };

    handleHashChange(); // Run on mount initially

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const close = () => {
    window.location.hash = ""; 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear aggressive validation warning dynamically as user types
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.description.trim()) newErrors.description = "A brief description is required.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus("submitting");

    // Synthesize physical request weight delay for premium UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus("success");

    // Secure payload builder strictly targeting standard mailto architecture
    const subject = encodeURIComponent(`New Contact Form Submission from ${formData.name}`);
    const bodyText = `Name: ${formData.name}\nCompany: ${formData.company}\nAddress: ${formData.address}\n\nMessage:\n${formData.description}`;
    const body = encodeURIComponent(bodyText);

    // Provide user adequate read-time of 'Success' before offloading safely to mail client
    setTimeout(() => {
      window.location.href = `mailto:ghanshamgavande49@gmail.com?subject=${subject}&body=${body}`;
      
      // Auto-purge memory and close UI
      setTimeout(() => {
         close();
         setFormData({ name: "", company: "", address: "", description: "" });
      }, 1000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8">
          
          {/* Deep blur backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />

          {/* Absolute Core Glassmorphic Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#080808] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col"
          >
            <button 
              onClick={close}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-10">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">Let&apos;s connect.</h2>
              <p className="text-white/40 tracking-wide mt-2 font-light text-sm md:text-base">Fill out the details below and I&apos;ll get back to you shortly.</p>
            </div>

            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16"
              >
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/20">
                   <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-3xl font-semibold text-white tracking-tight mb-2">Message Compiled!</h3>
                <p className="text-white/50 text-center font-light">Redirecting securely to your local mail client...</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/50">Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-[#050505] border ${errors.name ? 'border-red-500/50' : 'border-white/10'} focus:border-white/30 rounded-xl px-5 py-4 text-white outline-none transition-colors text-sm shadow-inner`}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/50">Company</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-[#050505] border border-white/10 focus:border-white/30 rounded-xl px-5 py-4 text-white outline-none transition-colors text-sm shadow-inner"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/50">Address</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-white/10 focus:border-white/30 rounded-xl px-5 py-4 text-white outline-none transition-colors text-sm shadow-inner"
                    placeholder="City, Country"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/50">Message <span className="text-red-500">*</span></label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full bg-[#050505] border ${errors.description ? 'border-red-500/50' : 'border-white/10'} focus:border-white/30 rounded-xl px-5 py-4 text-white outline-none transition-colors text-sm resize-none shadow-inner`}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-white text-black font-bold tracking-wide py-5 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:active:scale-100"
                  >
                    {status === "submitting" ? (
                      <span className="animate-pulse">Formulating Payload...</span>
                    ) : (
                      <>
                        Compile & Send
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
