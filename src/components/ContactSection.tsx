import { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  Sparkles, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { SocialLinks, ContactSubmission } from '../types';

interface ContactSectionProps {
  socials: SocialLinks;
  location: string;
  onSendMessage: (submission: Omit<ContactSubmission, 'id' | 'date'>) => void;
}

export default function ContactSection({ socials, location, onSendMessage }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please provide your name, email, and message.');
      setStatus('error');
      return;
    }

    // Email regex check
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailValid) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      onSendMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-stone-200/90 dark:border-stone-800/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
            Get In Touch
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 tracking-tight">
            Let's build something enduring together.
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
            Currently open to senior engineering roles, high-impact consulting contracts, and interesting distributed systems discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Coordinates & Direct Links Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                <Mail className="w-3.5 h-3.5" />
                <span>Direct Inbox</span>
              </div>
              
              <div className="flex items-center justify-between gap-3 mt-1">
                <a
                  id="contact-mailto-link"
                  href={`mailto:${socials.email}`}
                  className="font-display font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors break-all"
                >
                  {socials.email}
                </a>
                <button
                  id="contact-copy-email-btn"
                  type="button"
                  onClick={copyEmail}
                  className="p-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {copied && (
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-2">
                  ✓ Copied email address to clipboard!
                </p>
              )}
            </div>

            {/* Location & Timezone Details */}
            <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-2xs space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-stone-400 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Location
                  </h4>
                  <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 mt-0.5">
                    {location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <Clock className="w-4 h-4 text-stone-400 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Response Expectations
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">
                    Typically responds within 24 hours. PST / UTC-8 timezone working hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Notice */}
            <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Status: Available for Work</span>
              </div>
              <p className="text-xs text-emerald-800/90 dark:text-emerald-400 mt-1 leading-relaxed">
                Currently taking calls for Q2 and Q3 product design, front-end overhaul, and distributed engineering initiatives.
              </p>
            </div>

          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 sm:p-8 shadow-2xs">
              
              {status === 'success' ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">
                    Message Sent Successfully
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Your message has been safely received and stored. I will respond to your provided email address shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 transition-colors"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form id="portfolio-contact-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-stone-400" />
                    <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100">
                      Send a Direct Message
                    </h3>
                  </div>

                  {status === 'error' && (
                    <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 flex items-center gap-2 text-xs font-medium text-rose-800 dark:text-rose-300">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-stone-950 border border-stone-300/80 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-500 focus:bg-white dark:focus:bg-stone-900 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-stone-950 border border-stone-300/80 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-500 focus:bg-white dark:focus:bg-stone-900 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Product design partnership / Senior Role"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-stone-950 border border-stone-300/80 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-500 focus:bg-white dark:focus:bg-stone-900 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, or open role requirements..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-stone-950 border border-stone-300/80 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-500 focus:bg-white dark:focus:bg-stone-900 transition-all resize-y"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">
                      * Required fields
                    </span>
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white rounded-xl transition-all disabled:opacity-50 shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
