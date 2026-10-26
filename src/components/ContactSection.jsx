import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'Personalized Coaching',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        interest: 'Personalized Coaching',
        message: '',
      });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[rgba(229,251,212,0.15)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B2CD9C] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E5FBD4]" />
            <span>COMMUNICATION CHANNEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#E5FBD4]">
            Connect With Our Coaches
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-sm text-[#B2CD9C] font-mono">
          DIRECT INQUIRIES // ATHLETE CONSULTATIONS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Column */}
        <div className="lg:col-span-5 bg-[#233306] border border-[rgba(229,251,212,0.12)] rounded-xl p-8 space-y-6 shadow-xl shadow-black/40">
          <div>
            <h3 className="text-xl font-bold text-[#E5FBD4] mb-2">Squat Fitness HQ</h3>
            <p className="text-sm text-[#B2CD9C] leading-relaxed">
              Have questions about your biometric telemetry, customized strength programming, or nutrition periodization? We respond within 24 hours.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[rgba(229,251,212,0.1)]">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1B2804] border border-[rgba(229,251,212,0.15)] flex items-center justify-center text-[#E5FBD4] shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#B2CD9C] block">Direct Email</span>
                <a href="mailto:performance@squatfitness.com" className="text-sm font-mono text-[#E5FBD4] hover:text-white transition-colors">
                  performance@squatfitness.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1B2804] border border-[rgba(229,251,212,0.15)] flex items-center justify-center text-[#E5FBD4] shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#B2CD9C] block">Phone Support</span>
                <span className="text-sm font-mono text-[#E5FBD4]">+1 (800) 428-SQUAT</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1B2804] border border-[rgba(229,251,212,0.15)] flex items-center justify-center text-[#E5FBD4] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#B2CD9C] block">Flagship Facility</span>
                <span className="text-sm font-mono text-[#E5FBD4]">400 Kinetic Way, Suite 800, San Francisco, CA</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#141E03] border border-[rgba(229,251,212,0.12)] text-xs font-mono text-[#B2CD9C] flex items-center justify-between">
            <span>OFFICE HOURS</span>
            <span className="text-[#E5FBD4]">MON-SAT 06:00 - 21:00 PST</span>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 bg-[#233306] border border-[rgba(229,251,212,0.12)] rounded-xl p-8 shadow-xl shadow-black/40">
          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#E5FBD4]/10 border border-[#E5FBD4] flex items-center justify-center text-[#E5FBD4]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#E5FBD4]">Inquiry Transmitted</h3>
              <p className="text-sm text-[#B2CD9C] max-w-sm">
                Thank you for reaching out. A senior performance coach has received your message and will review your parameters shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#B2CD9C] uppercase block mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#141E03] border border-[rgba(229,251,212,0.15)] rounded-lg px-4 py-2.5 text-[#E5FBD4] font-mono text-sm focus:border-[#E5FBD4] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#B2CD9C] uppercase block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#141E03] border border-[rgba(229,251,212,0.15)] rounded-lg px-4 py-2.5 text-[#E5FBD4] font-mono text-sm focus:border-[#E5FBD4] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#B2CD9C] uppercase block mb-1.5">
                  Area of Interest
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full bg-[#141E03] border border-[rgba(229,251,212,0.15)] rounded-lg px-4 py-2.5 text-[#E5FBD4] font-mono text-sm focus:border-[#E5FBD4] focus:outline-none transition-colors"
                >
                  <option value="Personalized Coaching" className="bg-[#141E03]">Personalized Strength &amp; Conditioning</option>
                  <option value="Nutrition Periodization" className="bg-[#141E03]">Nutrition &amp; Macro Periodization</option>
                  <option value="Biometric Telemetry Support" className="bg-[#141E03]">Tracker &amp; Biometric Telemetry Support</option>
                  <option value="Enterprise / Team Training" className="bg-[#141E03]">Athletic Team / Corporate Wellness</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-[#B2CD9C] uppercase block mb-1.5">
                  Message / Goal Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your current fitness level, objectives, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#141E03] border border-[rgba(229,251,212,0.15)] rounded-lg px-4 py-2.5 text-[#E5FBD4] font-mono text-sm focus:border-[#E5FBD4] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#E5FBD4] text-[#1D2B04] font-bold text-xs tracking-wider uppercase hover:bg-white transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-md shadow-black/40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
