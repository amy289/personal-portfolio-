import { Quote } from 'lucide-react';
import { TestimonialItem } from '../types';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-16 md:py-24 border-t border-stone-200/90 dark:border-stone-800/90 bg-stone-100/40 dark:bg-stone-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12 text-center items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
            Endorsements & Trust
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 tracking-tight">
            What Teammates & Collaborators Say
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
            Direct perspectives from engineering leaders, product designers, and managers I have built software with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              id={`testimonial-${item.id}`}
              className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 flex flex-col justify-between shadow-2xs hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
            >
              <div>
                <Quote className="w-6 h-6 text-stone-300 dark:text-stone-700 mb-4" />
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic mb-6">
                  "{item.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800/70">
                <div className="w-9 h-9 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center font-display font-bold text-xs text-stone-700 dark:text-stone-200">
                  {item.avatarText}
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-xs text-stone-900 dark:text-stone-100">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    {item.role} • {item.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
