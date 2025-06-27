"use client";

import { Button, ButtonProps } from '../components/Buttons';
import {useState, useEffect} from "react";
import { Orbit } from "../components/Orbit";
import { twMerge } from 'tailwind-merge';
import {Logo} from "../components/Logo";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { usePathname } from "next/navigation";






type NavItem = {
  name: string;
  href: string;
};

type LoginItem = NavItem & {
  buttonVariant: ButtonProps["variant"];
}


export const navItems:  NavItem[] = [
  {
    name: "Paslaugos",
    href: "#paslaugos",
  },
  {
    name: "Procesas",
    href: "#procesas",
  },
  {
    name: "Pritaikymas",
    href: "#pritaikymas",
  },
  {
    name: "Apie mus",
    href: "#apie mus",
  },
  {
    name: "Kainodara",
    href: "#kainodara",
  },

    ];
// ] satisfies {
//   name: string;
//   href: string;
//   buttonVariant: ButtonProps["variant"];
// }[];

export const loginItems: LoginItem[] = [
  {
    buttonVariant: "tertiary",
    name: "Susisiekite",
    href: "#susisiekite",
  },
  {
    buttonVariant: "primary",
    name: "Išbandykite",
    href: "#išbandykiteDabar",
  },
];

const loginButton: LoginItem = {
  buttonVariant: "tertiary",
  name: "Prisijungti",
  href: "#prisijungti",
};

const registerButton: LoginItem = {
  buttonVariant: "primary",
  name: "Registruotis",
  href: "#registruotis",
};

export const Header = ({ isAuthenticated } : {isAuthenticated: boolean}) => {

const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      navItems.forEach(({ href }) => {
        const section = document.querySelector(href);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = href;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
      <>
      <header className= " fixed top-0 left-0 right-0 border-b border-gray-200/20 z-50 bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className= "container">
         <div className= "h-18 lg:h-20  flex justify-between items-center ">
           <Link href= "/">
          <div className= "flex gap-4 items-center ">
    {/*<Image src= {logo} />*/}
    <Logo />
    <div className= "font-extrabold text-3xl hover:text-purple-500 hover:drop-shadow-[0_0_6px_rgba(236,72,153,0.5)] transition-all duration-300">LorexAI</div>
  </div>
           </Link>

  <div className= "h-full hidden lg:block">
      <nav className= "h-full ">
        {navItems.map(({ name, href }) => (
          <a
              href={href}
              key={name}
              className={twMerge(
                // "h-full px-8 relative font-bold text-sm tracking-widest whitespace-nowrap text-gray-400 uppercase inline-flex items-center before:content-[''] before:absolute before:bottom-0 before:h-2 before:w-px before:bg-gray-200/20 before:left-0  last:after:absolute last:after:bottom-0 last:after:h-2 last:after:w-px last:after:bg-gray-200/20 last:after:right-0 text-gray-400 hover:text-fuchsia-400 hover:drop-shadow-[0_0_6px_rgba(236,72,153,0.5)] transition-all duration-300",
                "h-full px-8 relative font-bold text-sm tracking-widest whitespace-nowrap uppercase inline-flex items-center text-gray-400 transition-all duration-300",
                activeSection === href
                ? "text-fuchsia-400 drop-shadow-[0_0_6px_rgba(236,72,153,0.5)]"
                : "hover:text-fuchsia-400 hover:drop-shadow-[0_0_6px_rgba(236,72,153,0.5)]"
              )}

              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                  setIsMobileNavOpen(false);
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
          >
            {name}
          </a>
        ))}
      </nav>
  </div>

  <div className= "hidden lg:flex gap-4">
    {isAuthenticated ? (
      <>
      <Link href= "/dashboard">
        <Button variant = "secondary" className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-fuchsia-700 hover:to-purple-700 transition-transform transform hover:scale-105 active:scale-95">
          Grįžti į savo paskyrą
        </Button>
      </Link>


            <LogoutLink>
              <Button variant= "primary">Atsijungti</Button>
            </LogoutLink>
      </>
        ) : (
            <>
              <LoginLink >
                <Button variant={loginButton.buttonVariant}>{loginButton.name}</Button>
              </LoginLink>


              <RegisterLink >
                <Button variant={registerButton.buttonVariant}>{registerButton.name}</Button>
              </RegisterLink>
            </>
    )}
  </div>

  <div className= "flex items-center lg:hidden">
    <button className= "size-10 rounded-lg border-2 border-transparent [background:linear-gradient(var(--color-gray-950),var(--color-gray-950))_content-box,conic-gradient(from_45deg,var(--color-violet-400),var(--color-fuchsia-400),var(--color-amber-300),var(--color-teal-300),var(--color-violet-400))] _border-box] relative"
            onClick={() => setIsMobileNavOpen((curr) => !curr)}>
      <div className= "absolute top-1/2 left-1/2 -translate-x-1/2
       -translate-y-1/2 flex flex-col items-center justify-center gap-1">
      <div className= {twMerge(
          "w-5 h-0.5 bg-gray-100 transform transition duration-300 origin-center",
          isMobileNavOpen && "rotate-45 translate-y-0.5 "
      )}
      ></div>

      <div className={twMerge(
          "w-5 h-0.5 bg-gray-100 transform transition duration-300 origin-center",
          isMobileNavOpen && "-translate-y-0.5 -rotate-45"
      )}
      ></div>
      </div>
    </button>
  </div>
</div>
    </div>
    </header>

        {isMobileNavOpen && (
            <div className= "fixed top-18 left-0 bottom-0 right-0 bg-gray-950 z-30 overflow-hidden">
              <div className= "absolute-center isolate -z-10">
                <Orbit />
              </div>
                <div className= "absolute-center isolate -z-10">
                  <Orbit className= "size-[350px]"/>
                </div>
              <div className= "absolute-center isolate -z-10">
                <Orbit className= "size-[500px]"/>
              </div>
              <div className= "absolute-center isolate -z-10">
                <Orbit className= "size-[650px]"/>
              </div>
              <div className= "absolute-center isolate -z-10">
                <Orbit className= "size-[800px]"/>
              </div>
              <div className= "container h-full">
                <nav className= "flex flex-col items-center gap-4 py-8 h-full justify-center">
                  {navItems.map(({name, href}) => (
                      <a
                          href= {href}
                          key= {name}
                          className= {twMerge(
                            // "text-gray-400 uppercase tracking-widest font-bold text-xs h-12"
                            "text-xs uppercase tracking-widest font-bold h-12 transition-all",
                            activeSection === href ? "text-fuchsia-400" : "text-gray-400"
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            const element = document.querySelector(href);
                            if (element) {
                              setIsMobileNavOpen(false);
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                      >{name}</a>
                  ))}

                  {isAuthenticated ? (
                    <>
                      <Link href= "/dashboard">
                        <Button variant= "secondary" className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-fuchsia-500 hover:to-purple-700 transition-transform transform hover:scale-105 active:scale-95">Grįžti į savo paskyrą</Button>
                      </Link>

                      <LogoutLink>
                        <Button variant= "primary">Atsijungti</Button>
                      </LogoutLink>
                    </>
                  ) : (
                        <>
                          <LoginLink  className= "w-full max-w-xs">
                            <Button block variant={loginButton.buttonVariant}>{loginButton.name}</Button>
                          </LoginLink>


                              <RegisterLink  className= "w-full max-w-xs">
                                <Button block variant={registerButton.buttonVariant}>{registerButton.name}</Button>
                              </RegisterLink>
</>

)}


                </nav>
              </div>
            </div>
        )}
        </>
);
};

// export default Header;
