'use client';

import designFit from "../assets/images/AI_fashion3.png";
import fastDelivery from "../assets/images/smart_delivery.png";
import designYouFit from "../assets/images/logo11.png";
import socialLogo from "../assets/images/logo12.png";
import qualityLogo from "../assets/images/logo15.png";
import simpleLogo from  "../assets/images/logo14.png";
import fitLogo from "../assets/images/logo16.png";
import gsrLogo from "../assets/images/logo13.png";
import {SectionBorder} from "../components/SectionBorder";
import {SectionContent} from "../components/SectionContent";
import {Button} from "../components/Buttons";
import {Orbit} from "../components/Orbit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import {Logo} from "../components/Logo";
import Image from "next/dist/client/legacy/image";
import { motion} from "framer-motion";
import * as React from "react";




export const features = [
  "AI modelių generavimas",
  "Greitas pristatymas",
  "Skirtingo stiliaus parinkimas",
  "Paruoštas socialiniams tinklams ir e-komercijai",
  "Aukštos kokybės rezultatas",
  "Paprasta naudojimo patirtis",
  "Pritaikyta Jūsų prekės ženklui",

];


export const logos = [
  {
    src: designFit,
    alt: "AI model logo",
    rotate: 0,
  },
  {
    src: fastDelivery,
    alt: "fast delivery logo",
    rotate: 45,
  },
  {
    src: designYouFit,
    alt: "fashion style logo",
    rotate: 90,
  },
  {
    src: socialLogo,
    alt: "social networks logo",
    rotate: 135,
  },
  {
    src: qualityLogo,
    alt: "high quality logo",
    rotate: 180,
  },
  {
    src: simpleLogo,
    alt: "easy to use logo",
    rotate: 225,
  },
  {
    src: fitLogo,
    alt: "fit to brand logo",
    rotate: 270,
  },
  {
    src: gsrLogo,
    alt: "gsr logo",
    rotate: 315,
  },
];

export const Features = () => {
  return <section id= "paslaugos">
    <div className= "container">
      <SectionBorder borderTop>
<SectionContent className= "md:px-20 lg-px-40">
  <div className= "grid grid-cols-1 lg:grid-cols-2 gap-20">
    <div>
  <h2 className= "text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-200 leading-tight">
    Pagrindinės galimybės:
  </h2>
  <ul className= "mt-12 flex flex-col gap-8" >
    {features.map((features) => (
<li key={features} className= "flex items-center gap-4">
  <FontAwesomeIcon icon={faCircleCheck} className= "size-6 text-violet-400"/>
  <span className= "text-xl font-medium">{features}</span>
</li>
    ))}
  </ul>
  <Button className= "mt-16">Išbandykite dabar</Button>
    </div>
    <div className= "flex justify-center ">
  <div className= "size-[270px] md:size-[450px] relative flex flex-shrink-0">
    <div className= "absolute inset-0">
<Orbit className= "size-full"/>
    </div>
    <div className= "absolute-center">
      <Orbit className= "size-[180px] md:size-[300px]"/>
    </div>
    <div className= "absolute-center">
      <Logo className= "size-24"/>
    </div>
      {logos.map(({ src, alt, rotate}) => (
          <motion.div
              className= "absolute inset-0 rotate-0"
              initial={{
                rotate: rotate,
              }}
              animate={{
                rotate: [
                    rotate,
                    rotate + 45,
                    rotate + 45,
                    rotate + 90,
                    rotate + 90,
                    rotate + 135,
                    rotate + 135,
                    rotate + 180,
                    rotate + 180,
                    rotate + 225,
                    rotate + 225,
                    rotate + 270,
                    rotate + 270,
                    rotate + 315,
                    rotate + 315,
                    rotate + 360,
                    rotate + 360,
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
              }}
               key={alt}
          >
            <motion.div
                className= "inline-flex size-10 md:size-14 items-center justify-center
                 border border-[var(--color-border)] rounded-lg absolute
                 left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-0
                 bg-gray-950"
                initial={{
                  translate: "-50% -50%",
                  rotate: -rotate,
                }}
                animate={{
                  rotate: [
                    -rotate,
                    -rotate - 45,
                    -rotate - 45,
                    -rotate - 90,
                    -rotate - 90,
                    -rotate - 135,
                    -rotate - 135,
                    -rotate - 180,
                    -rotate - 180,
                    -rotate - 225,
                    -rotate - 225,
                    -rotate - 270,
                    -rotate - 270,
                    -rotate - 315,
                    -rotate - 315,
                    -rotate - 360,
                    -rotate - 360,
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                }}
            >
              <Image src={src} alt= {alt} className= "size-6 md:size-9"/>
            </motion.div>
          </motion.div>
      ) )}
    {/*<div className= "outline outline-1 outline-red-500 absolute inset-0 rotate-45">*/}
    {/*  <div className= "outline outline-1 outline-red-500 inline-flex size-10 items-center justify-center border border-[var(--color-border)] rounded-lg absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 ">*/}
    {/*    <Image*/}
    {/*        src={dockerLogo}*/}
    {/*        alt= "docker logo"*/}
    {/*        className= "size-6"/>*/}
    {/*  </div>*/}
    {/*</div>*/}
    {/*<div className= "outline outline-1 outline-red-500 absolute inset-0 rotate-0 "*/}
    {/*style={{*/}
    {/*transform: `rotate(0deg)`,*/}
    {/*}}*/}
    {/*>*/}
    {/*  <div className= "outline outline-1 outline-red-500 inline-flex size-10 items-center justify-center border border-[var(--color-border)] rounded-lg absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-0 "*/}
    {/*       style={{*/}
    {/*         transform: "translate(-50%, -50%) rotate(-0deg)",*/}
    {/*       }}*/}
    {/*  >*/}
    {/*    <Image src={slackLogo} alt= "slack logo" className= "size-6"/>*/}
    {/*  </div>*/}
    {/*</div>*/}
    {/*<div className= "outline outline-1 outline-red-500 absolute inset-0 rotate-45">*/}
    {/*  <div className= "outline outline-1 outline-red-500 inline-flex size-10 items-center justify-center border border-[var(--color-border)] rounded-lg absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 ">*/}
    {/*    <Image*/}
    {/*        src={dockerLogo}*/}
    {/*        alt= "docker logo"*/}
    {/*        className= "size-6"/>*/}
    {/*  </div>*/}
    {/*</div>*/}
  </div>
  </div>
  </div>
</SectionContent>
      </SectionBorder>
    </div>
    </section>;
};

export default Features;
