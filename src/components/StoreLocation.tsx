import React from 'react';
import { 
  MapPin, 
  ExternalLink, 
  Clock, 
  Phone, 
  Mail, 
  Instagram, 
  Truck, 
  ShieldCheck, 
  Navigation,
  Factory
} from 'lucide-react';

export const StoreLocation: React.FC = () => {
  return (
    <section id="location" className="py-16 bg-zinc-950/80 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Factory className="w-3.5 h-3.5" />
            <span>Chennai Showroom & Manufacturing Plant</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Visit Our Factory & Testing Showroom
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Located in Pattalam, Purasaiwalkam, Chennai. Test our heavy-duty benches, inspect Olympic plates, and consult directly on custom gym packages.
          </p>
        </div>

        {/* 2-Column Layout: Store Details + Embedded Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business Details & Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Address Card */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-base text-white">
                    Factory & Showroom Address
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm mt-1 leading-relaxed">
                    <strong>Sekar Fitness Equipments</strong><br />
                    27/18, Ethiraj Garden St, Pattalam,<br />
                    Purasaiwalkam, Chennai, Tamil Nadu 600012
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <a
                      href="https://maps.app.goo.gl/XiBAcDBPM8RfEKNL7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>

                    <a
                      href="https://instagram.com/sekar_fitness_equipments"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-semibold text-xs border border-zinc-700 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      <span>@sekar_fitness_equipments</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Working Hours
                  </h3>
                  <div className="mt-2 space-y-1 text-xs text-zinc-300 font-mono-num">
                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-400 font-sans">Monday – Saturday:</span>
                      <span className="font-semibold text-zinc-100">9:30 AM – 8:30 PM</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-400 font-sans">Sunday:</span>
                      <span className="font-semibold text-amber-400">10:00 AM – 4:00 PM</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-zinc-500 block mt-2">
                    Prior call recommended for bulk commercial gym walkthroughs.
                  </span>
                </div>
              </div>
            </div>

            {/* Phone & Inquiries */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-base text-white">
                    Direct Factory Phone & WhatsApp
                  </h3>
                  <div className="mt-2 space-y-1.5 text-xs">
                    <p className="text-zinc-300">
                      <strong>Hotline / Orders:</strong>{' '}
                      <a href="tel:+916381914335" className="text-amber-400 font-mono-num font-semibold hover:underline">
                        +91 63819 14335
                      </a>
                    </p>
                    <p className="text-zinc-400">
                      Direct WhatsApp dispatch coordination available 7 days a week.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Critical Policy Reinforcement */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-200">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Sekar Fitness Equipment Policies</span>
              </div>
              <p>• <strong>Transportation Cost Extra:</strong> Calculated on actual lorry / carrier weight and destination distance.</p>
              <p>• <strong>100% Advance Payment:</strong> Orders are dispatched from Chennai only upon receipt of full payment.</p>
            </div>

          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-7 h-[420px] lg:h-[540px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 relative shadow-2xl">
            <iframe
              title="Sekar Fitness Equipments Google Maps Location"
              src="https://maps.google.com/maps?q=27/18,%20Ethiraj%20Garden%20St,%20Pattalam,%20Purasaiwalkam,%20Chennai,%20Tamil%20Nadu%20600012&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 filter invert contrast-125 hue-rotate-180 opacity-90 hover:opacity-100 transition-opacity"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Location floating pin banner */}
            <div className="absolute top-4 left-4 right-4 sm:right-auto bg-zinc-950/90 backdrop-blur-md border border-zinc-700/80 px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold text-white">Sekar Fitness Equipments</span>
                <span className="text-zinc-500">·</span>
                <span className="text-zinc-400 hidden sm:inline">Pattalam, Chennai</span>
              </div>
              <a
                href="https://maps.app.goo.gl/XiBAcDBPM8RfEKNL7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 font-bold hover:underline shrink-0 text-[11px]"
              >
                Get Directions →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
