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
      <div className="relative bg-turq-50 pt-10 pb-20 sm:pb-24 lg:pt-14">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <Blob variant={0} className="absolute top-20 -left-32 w-[24rem] opacity-60" color="#dcf3ef" />
          <Cloud className="absolute top-4 right-[8%] w-32 opacity-90" />
        </div>

        <div className="container-site relative grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">
                <Daisy className="size-5" color="#F4B6C2" />
                {t.contacts.eyebrow}
              </p>
              <h2
                id="contacts-title"
                className="mt-4 text-[clamp(2rem,4.4vw,3rem)] leading-[1.08] font-extrabold tracking-tight text-ink"
              >
                {t.contacts.title}
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="mt-9 space-y-5">
                {rows.map(({ icon: Icon, label, content }, i) => (
                  <div key={label} className="flex gap-4">
                    <dt className="contents">
                      <span
                        className={`grid size-12 shrink-0 place-items-center rounded-[1rem_1rem_1rem_0.35rem] shadow-soft ${
                          i % 2 ? "bg-powder-100 text-[#a4495d]" : "bg-white text-turq-dark"
                        }`}
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="sr-only">{label}</span>
                    </dt>
                    <dd className="min-w-0 pt-0.5">
                      <span aria-hidden="true" className="block text-[0.78rem] font-bold tracking-[0.08em] text-ink/55 uppercase">
                        {label}
                      </span>
                      <span className="mt-0.5 block text-[1.02rem] leading-snug font-semibold text-ink">{content}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.14} className="mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
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
            <Flower className="absolute -top-5 -right-2 z-10 w-14 animate-float sm:-right-5" />
            <Sparkle className="absolute -bottom-3 left-[30%] z-10 w-6" color="#F4B6C2" />
            <div className="frame-map relative overflow-hidden bg-white p-2.5 shadow-lift">
              <div className="frame-map relative h-[22rem] overflow-hidden bg-turq-100 sm:h-[26rem] lg:h-[30rem]">
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
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 pl-2 text-[0.95rem] font-semibold">
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
