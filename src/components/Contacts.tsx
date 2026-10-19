"use client";

import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { mapEmbedUrl, mapLinks, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Blob, Cloud, Daisy, Flower, Sparkle, Wave } from "./decor/Decorations";
import { InstagramIcon } from "./InstagramIcon";
import { Reveal } from "./Reveal";

export function Contacts() {
  const { t, lang } = useLanguage();
  const links = mapLinks();

  const rows = [
    {
      icon: MapPin,
      label: t.contacts.address,
      content: <address className="not-italic">{site.address.full[lang]}</address>,
    },
    {
      icon: Phone,
      label: t.contacts.phone,
      content: (
        <a href={site.phone.href} className="underline decoration-turq decoration-2 underline-offset-4 hover:text-turq-dark">
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
          className="break-all underline decoration-powder decoration-2 underline-offset-4 hover:text-turq-dark"
        >
          {site.instagram.handle}
        </a>
      ),
    },
    {
      icon: Clock,
      label: t.contacts.hours,
      content: (
        <span>
          {site.hours.display}, {t.contacts.days}
        </span>
      ),
    },
  ];

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="relative">
      <div className="bg-milk">
        <Wave fill="#effaf8" variant={1} className="-mb-px" />
      </div>
      <div className="relative bg-turq-50 pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <Blob variant={0} className="absolute top-20 -left-32 hidden w-[20rem] opacity-60 md:block" color="#dcf3ef" />
          <Cloud className="absolute top-2 right-[6%] w-16 opacity-90 md:w-24" />
        </div>

        <div className="container-site relative grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">
                <Daisy className="size-3.5" color="#F4B6C2" />
                {t.contacts.eyebrow}
              </p>
              <h2
                id="contacts-title"
                className="mt-2.5 text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.15] font-bold tracking-tight text-ink"
              >
                {t.contacts.title}
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="mt-6 grid gap-3.5 sm:mt-7 sm:gap-4">
                {rows.map(({ icon: Icon, label, content }, i) => (
                  <div key={label} className="flex items-start gap-3">
                    <dt className="contents">
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-[0.8rem_0.8rem_0.8rem_0.3rem] shadow-soft ${
                          i % 2 ? "bg-powder-100 text-[#a4495d]" : "bg-white text-turq-dark"
                        }`}
                      >
                        <Icon className="size-[1.1rem]" aria-hidden="true" />
                      </span>
                      <span className="sr-only">{label}</span>
                    </dt>
                    <dd className="min-w-0 flex-1">
                      <span aria-hidden="true" className="block text-[0.68rem] font-semibold tracking-[0.08em] text-ink/55 uppercase">
                        {label}
                      </span>
                      <span className="mt-0.5 block text-[0.93rem] leading-snug font-medium break-words text-ink">{content}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.14} className="mt-7 grid gap-2.5 min-[400px]:grid-cols-2 sm:flex sm:flex-wrap">
              <a href={site.phone.href} className="btn btn-primary">
                <Phone className="size-4" aria-hidden="true" />
                {t.common.call}
              </a>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <InstagramIcon className="size-4 text-turq-dark" />
                {t.contacts.openInstagram}
              </a>
              {site.whatsapp && (
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <MessageCircle className="size-4 text-turq-dark" aria-hidden="true" />
                  {t.contacts.whatsapp}
                </a>
              )}
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative lg:col-span-7">
            <Flower className="absolute -top-4 right-2 z-10 w-9 sm:-right-3 sm:w-11" />
            <Sparkle className="absolute top-[45%] -left-2 z-10 hidden w-5 md:block" color="#F4B6C2" />
            <div className="frame-map relative overflow-hidden bg-white p-1.5 shadow-lift sm:p-2">
              <div className="frame-map relative h-[15rem] overflow-hidden bg-turq-100 min-[400px]:h-[17rem] sm:h-[20rem] lg:h-[22rem]">
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
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-0 pl-1 text-[0.86rem] font-medium">
              <a
                href={links.twoGis}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 text-turq-dark hover:text-ink"
              >
                {t.contacts.open2gis}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={links.google}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 text-turq-dark hover:text-ink"
              >
                {t.contacts.openGoogle}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
