"use client";

import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { mapEmbedUrl, mapLinks, site } from "@shared/config/site";
import { Cloud, Daisy, Flower, Wave } from "@shared/decor/Decorations";
import { useLanguage } from "@shared/i18n/LanguageProvider";
import { InstagramIcon } from "@shared/ui/InstagramIcon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Contacts() {
  const { t, lang } = useLanguage();
  const links = mapLinks();

  const rows = [
    { icon: MapPin, label: t.contacts.address, content: <address className="not-italic">{site.address.full[lang]}</address> },
    {
      icon: Phone,
      label: t.contacts.phone,
      content: (
        <a href={site.phone.href} className="underline decoration-turq decoration-2 underline-offset-[3px]">
          {site.phone.display}
        </a>
      ),
    },
    {
      icon: InstagramIcon,
      label: t.contacts.instagram,
      content: (
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all underline decoration-powder decoration-2 underline-offset-[3px]"
        >
          {site.instagram.handle}
        </a>
      ),
    },
    { icon: Clock, label: t.contacts.hours, content: <span>{site.hours.display}, {t.contacts.days}</span> },
  ];

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="relative">
      <div className="bg-milk">
        <Wave fill="#effaf8" variant={1} heightClass="h-5" className="-mb-px" />
      </div>
      <div className="relative bg-turq-50 pt-3 pb-8">
        <Cloud className="pointer-events-none absolute top-1 right-4 w-14" />

        <div className="m-container">
          {/* Group 1 — how to reach us */}
          <Reveal>
            <SectionHeading
              id="contacts-title"
              eyebrow={t.contacts.eyebrow}
              title={t.contacts.title}
              icon={<Daisy className="size-3" color="#F4B6C2" />}
            />
          </Reveal>

          <Reveal delay={60}>
            <dl className="mt-4 divide-y divide-turq/15 rounded-[1.4rem_1.4rem_1.4rem_0.5rem] bg-white px-3.5 shadow-soft">
              {rows.map(({ icon: Icon, label, content }, i) => (
                <div key={label} className="flex items-start gap-3 py-3">
                  <dt className="contents">
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-[0.65rem_0.65rem_0.65rem_0.2rem] ${
                        i % 2 ? "bg-powder-100 text-[#a4495d]" : "bg-turq-100 text-turq-dark"
                      }`}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="sr-only">{label}</span>
                  </dt>
                  <dd className="min-w-0 flex-1">
                    <span aria-hidden="true" className="m-caption block">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-[0.875rem] leading-snug font-medium break-words text-ink">{content}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={100} className="mt-3 grid grid-cols-2 gap-2">
            <a href={site.phone.href} className="m-btn m-btn-primary px-3">
              <Phone className="size-4" aria-hidden="true" />
              {t.common.call}
            </a>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="m-btn m-btn-ghost px-3">
              <InstagramIcon className="size-4 text-turq-dark" />
              Instagram
            </a>
            {site.whatsapp && (
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="m-btn m-btn-ghost col-span-2"
              >
                <MessageCircle className="size-4 text-turq-dark" aria-hidden="true" />
                {t.contacts.whatsapp}
              </a>
            )}
          </Reveal>

          {/* Group 2 — the map */}
          <Reveal delay={60} className="relative mt-6">
            <Flower className="absolute -top-2.5 right-3 z-10 w-7" />
            <div className="m-frame-map overflow-hidden bg-white p-1.5 shadow-soft">
              <div className="m-frame-map relative h-[clamp(200px,32svh,260px)] overflow-hidden bg-turq-100">
                <iframe
                  key={lang}
                  title={t.contacts.mapTitle}
                  src={mapEmbedUrl(lang)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="mt-1 flex justify-between gap-2 px-1 text-[0.8125rem] font-medium">
              <a href={links.twoGis} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-turq-dark">
                {t.contacts.open2gis}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
              <a href={links.google} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-turq-dark">
                {t.contacts.openGoogle}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
