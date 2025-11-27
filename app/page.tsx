"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import {
  Download,
  ExternalLink,
  Github,
  Mail,
  Send,
  Code,
  Database,
  Globe,
  MessageCirclePlus,
} from "lucide-react";

type Language = "en" | "ru" | "uz";

const translations = {
  en: {
    name: "Akmaljon Kadirov",
    title: "Frontend Developer",
    description:
      "Frontend Junior+ ReactJS developer with 1+ years of experience building modern, responsive web applications. Passionate about creating beautiful user interfaces and exceptional user experiences.",
    downloadResume: "Download Resume",
    getInTouch: "Get In Touch",
    professionalPhoto: "Professional Photo",
    uploadPhoto: "Upload Photo",
    uploadPhotoDesc: "Upload your professional photo here",
    aboutMe: "About Me",
    aboutDesc:
      "Frontend Junior+ ReactJS developer passionate about creating beautiful, responsive web applications. I specialize in React, Next.js, and modern frontend technologies. I love transforming designs into pixel-perfect, interactive user interfaces that provide exceptional user experiences.",
    skillsTitle: "Frontend Skills & Technologies",
    frontend: "Core Frontend",
    frameworks: "Frameworks & Libraries",
    tools: "Tools & Others",
    featuredProjects: "Featured Projects",
    code: "Code",
    demo: "Demo",
    sendMessage: "Send a Message",
    sendMessageDesc:
      "I'd love to hear about your project. Let's discuss how we can work together.",
    yourName: "Your Name",
    yourEmail: "Your Email",
    yourMessage: "Your Message",
    sendBtn: "Send Message",
    connectWithMe: "Connect With Me",
    availableForWork: "Available for Work",
    availableDesc:
      "I'm currently available for freelance projects and frontend development opportunities.",
    footer: "© 2025 Akmaljon Kadirov. Built with Next.js and Tailwind CSS.",
  },
  ru: {
    name: "Акмалжон Кадиров",
    title: "Frontend Разработчик",
    description:
      "Frontend Junior+ ReactJS разработчик с 1+ годами опыта создания современных, отзывчивых веб-приложений. Увлечен созданием красивых пользовательских интерфейсов.",
    downloadResume: "Скачать Резюме",
    getInTouch: "Связаться",
    professionalPhoto: "Профессиональное Фото",
    uploadPhoto: "Загрузить Фото",
    uploadPhotoDesc: "Загрузите ваше профессиональное фото здесь",
    aboutMe: "Обо Мне",
    aboutDesc:
      "Frontend Junior+ ReactJS разработчик, увлеченный созданием красивых, отзывчивых веб-приложений. Специализируюсь на React, Next.js и современных frontend технологиях.",
    skillsTitle: "Frontend Навыки и Технологии",
    frontend: "Основные Frontend",
    frameworks: "Фреймворки и Библиотеки",
    tools: "Инструменты и Другое",
    featuredProjects: "Избранные Проекты",
    code: "Код",
    demo: "Демо",
    sendMessage: "Отправить Сообщение",
    sendMessageDesc:
      "Я хотел бы услышать о вашем проекте. Давайте обсудим, как мы можем работать вместе.",
    yourName: "Ваше Имя",
    yourEmail: "Ваш Email",
    yourMessage: "Ваше Сообщение",
    sendBtn: "Отправить",
    connectWithMe: "Связаться со Мной",
    availableForWork: "Доступен для Работы",
    availableDesc:
      "В настоящее время я доступен для фриланс проектов и frontend разработки.",
    footer: "© 2025 Акмалжон Кадиров. Создано с Next.js и Tailwind CSS.",
  },
  uz: {
    name: "Akmaljon Kadirov",
    title: "Frontend Dasturchi",
    description:
      "Chiroyli, moslashuvchan veb-ilovalar yaratishga ishtiyoqli Frontend Junior+ ReactJS dasturchi. React, Next.js va zamonaviy frontend texnologiyalarida mutaxassis.",
    downloadResume: "Rezyumeni Yuklab Olish",
    getInTouch: "Bog'lanish",
    professionalPhoto: "Professional Surat",
    uploadPhoto: "Surat Yuklash",
    uploadPhotoDesc: "Professional suratingizni shu yerga yuklang",
    aboutMe: "Men Haqimda",
    aboutDesc:
      "Men web dasturlashga qiziqadigan va bu sohada o‘z yo‘lini topishga intilayotgan dasturchiman. Asosiy yo‘nalishim — Frontend: React, Next.js va TypeScript yordamida foydalanuvchilar uchun qulay va chiroyli web sahifalar yarataman. Ish jarayonida kod sifatiga, dizayn detallariga va moslashuvchanlikka katta e’tibor beraman. Har bir loyiham men uchun nafaqat ish, balki yangi narsalarni o‘rganish va o‘zimni sinovdan o‘tkazish imkoniyati. Men doimiy rivojlanishga intilaman va yaxshi jamoa bilan birgalikda katta loyihalarni amalga oshirishni orzu qilaman.",
    skillsTitle: "Frontend Ko'nikmalar va Texnologiyalar",
    frontend: "Asosiy Frontend",
    frameworks: "Freymvorklar va Kutubxonalar",
    tools: "Vositalar va Boshqalar",
    featuredProjects: "Tanlangan Loyihalar",
    code: "Kod",
    demo: "Demo",
    sendMessage: "Xabar Yuborish",
    sendMessageDesc:
      "Loyihangiz haqida eshitishni istardim. Qanday hamkorlik qilishimizni muhokama qilaylik.",
    yourName: "Ismingiz",
    yourEmail: "Emailingiz",
    yourMessage: "Xabaringiz",
    sendBtn: "Xabar Yuborish",
    connectWithMe: "Men Bilan Bog'laning",
    availableForWork: "Ish Uchun Mavjud",
    availableDesc:
      "Hozirda frilanser loyihalari va frontend dasturlash imkoniyatlari uchun mavjudman.",
    footer:
      "© 2025 Akmaljon Kadirov. Next.js va Tailwind CSS bilan yaratilgan.",
  },
};

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [currentLanguage, setCurrentLanguage] = useState<Language>("uz");
  const backgroundRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLanguage];

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "portfolio-language"
    ) as Language;
    if (savedLanguage && ["en", "ru", "uz"].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }

    setIsVisible(true);
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("[v0] Language state updated to:", currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/KadirovCV.pdf";
    link.download = "KadirovCV.pdf";
    link.click();
  };

  const skills = {
    frontend: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "Responsive Design",
      "CSS Grid",
      "Flexbox",
    ],
    frameworks: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Redux Toolkit",
      "React-Router-DOM",
      "Sass/SCSS",
    ],
    tools: ["Git", "Webpack", "Vite", "Figma", "VS Code", "npm"],
  };

  const projects = [
    {
      title: "DoneTodo mini-app",
      description:
        "Oddiy va zamonaviy To-Do ilova. Vazifalarni qo‘shish, o‘chirish va ustuvorlik belgilash imkoniyati mavjud. React va Tailwind CSS yordamida yaratilgan.",
      technologies: ["React", "Tailwind CSS", "Context API"],
      github: "https://github.com/KADIROOV/my_todoApp",
      demo: "https://donetodo-app.vercel.app/",
    },
    {
      title: "TimerCountdown mini-app",
      description:
        "Sodda va tezkor Counter ilova. Vaqtni belgilash hamda orqa fon o'zgartirish funksiyalari mavjud. React va Tailwind CSS yordamida yaratilgan.",
      technologies: ["React", "Tailwind CSS", "Shadcn"],
      github: "https://github.com/KADIROOV/timer-countdown",
      demo: "https://timer-countdown-beige.vercel.app/",
    },
    {
      title: "77 | Grade Marketing Agency",
      description:
        "77|Grade uchun zamonaviy landing page. Mobile, tablet va desktop qurilmalarga moslashtirilgan responsive dizayn. Reactjs yordamida ishlab chiqilgan.",
      technologies: ["React", "Tailwindcss", "CSS Grid"],
      github: "https://github.com/KADIROOV/77grd",
      demo: "https://77grd.vercel.app/",
    },
  ];

  const handleLanguageChange = (language: Language) => {
    console.log("[v0] Language change requested:", language);
    console.log("[v0] Current language:", currentLanguage);
    setCurrentLanguage((prevLang) => {
      console.log("[v0] Updating language from", prevLang, "to", language);
      localStorage.setItem("portfolio-language", language);
      console.log("[v0] Language saved to localStorage:", language);
      return language;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Light mode fon (oq fon ustida qora grid) */}
      <div
        className="absolute inset-0 pointer-events-none dark:hidden z-0"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
          linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px)
        `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
        }}
      />

      {/* Dark mode fon (qora fon ustida oq grid) */}
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block z-0"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
        }}
      />
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logoIcon.jpg" width={32} height={32} />
            <span className="text-lg font-semibold text-foreground tracking-wide">
              Kadirov
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} /> */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section
        id="hero"
        className="pt-24 pb-16 px-4 bg-gradient-to-br from-gray-50/30 via-background to-gray-50/10 dark:from-gray-950/20 dark:via-background dark:to-gray-950/10 relative z-10"
      >
        <div className="container mx-auto max-w-6xl text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="bg-background/60 backdrop-blur-sm border-gray-900 dark:border-gray-100 shadow-xl">
              <CardContent className="p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="flex-1 text-center ">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance dark:text-white">
                    {t.name}
                  </h1>
                  <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
                    {t.title}
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl lg:max-w-none mb-8 text-pretty">
                    {t.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="group bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                      onClick={downloadResume}
                    >
                      <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                      {t.downloadResume}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-950/50 bg-transparent"
                      onClick={() => scrollToSection("contact")}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      {t.getInTouch}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-4 relative">
        <div
          className="absolute inset-0 bg-background/10"
          style={{
            backgroundSize: "25px 25px, 25px 25px, 5px 5px",
            backgroundPosition: "0 0, 0 0, 0 0",
          }}
        ></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">{t.aboutMe}</h2>
            <Card className="hover:shadow-xl transition-all duration-300 bg-background border-gray-900 dark:border-gray-100">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-950/30 dark:to-slate-950/30 rounded-xl shadow-sm">
                    <Code className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-center text-muted-foreground">
                  {t.aboutDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="skills" className="py-16 px-4 relative">
        <div
          className="absolute inset-0 bg-background/10"
          style={{
            backgroundSize: "25px 25px, 25px 25px, 5px 5px",
            backgroundPosition: "0 0, 0 0, 0 0",
          }}
        ></div>
        <div className="absolute inset-0 bg-background/10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              {t.skillsTitle}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-background border-gray-900 dark:border-gray-100 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl mb-4 shadow-sm">
                    <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-foreground text-lg">
                    {t.frontend}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {skills.frontend.map((skill, index) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-2 py-1 text-xs hover:scale-105 transition-all duration-200 cursor-default bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-background border-gray-900 dark:border-gray-100 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto p-4 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl mb-4 shadow-sm">
                    <Code className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-foreground text-lg">
                    {t.frameworks}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {skills.frameworks.map((skill, index) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-2 py-1 text-xs hover:scale-105 transition-all duration-200 cursor-default bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-background border-gray-900 dark:border-gray-100 h-full sm:col-span-2 lg:col-span-1">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto p-4 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl mb-4 shadow-sm">
                    <Database className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-foreground text-lg">
                    {t.tools}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {skills.tools.map((skill, index) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-2 py-1 text-xs hover:scale-105 transition-all duration-200 cursor-default bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-16 px-4 relative">
        <div
          className="absolute inset-0 bg-background/10"
          style={{
            backgroundSize: "25px 25px, 25px 25px, 5px 5px",
            backgroundPosition: "0 0, 0 0, 0 0",
          }}
        ></div>
        <div className="absolute inset-0 bg-background/20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              {t.featuredProjects}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Card
                  key={project.title}
                  className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group bg-background/95 backdrop-blur-sm border-gray-900 dark:border-gray-100"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="group-hover:text-foreground transition-colors duration-200">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs border-border"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent hover:bg-muted border-border"
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="mr-2 h-3 w-3" />
                        {t.code}
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-foreground text-background hover:bg-foreground/90"
                        onClick={() => window.open(project.demo, "_blank")}
                      >
                        <ExternalLink className="mr-2 h-3 w-3" />
                        {t.demo}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 px-4 relative">
        <div
          className="absolute inset-0 bg-background/10"
          style={{
            backgroundSize: "25px 25px, 25px 25px, 5px 5px",
            backgroundPosition: "0 0, 0 0, 0 0",
          }}
        ></div>
        <div className="absolute inset-0 bg-background/10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              {t.getInTouch}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover:shadow-xl transition-all duration-300 bg-background/90 backdrop-blur-sm border-gray-900 dark:border-gray-100">
                <CardHeader>
                  <CardTitle>{t.sendMessage}</CardTitle>
                  <CardDescription>{t.sendMessageDesc}</CardDescription>
                </CardHeader>

                {/* FORM TAGINI QO‘SHDIK */}
                <form
                  action="https://kadirov.app.n8n.cloud/webhook-test/5369360c-29b7-4bc3-be73-5bd5eba9f294" // O‘Z URLINGNI BU YERGA QO‘Y
                  method="POST"
                  className="space-y-4"
                >
                  <CardContent className="space-y-4">
                    <div>
                      <Input
                        name="name" // name="name" qo‘shdik
                        placeholder={t.yourName}
                        required
                        className="border-border focus:border-gray-400 dark:focus:border-gray-500"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email" // name="email" qo‘shdik
                        placeholder={t.yourEmail}
                        required
                        className="border-border focus:border-gray-400 dark:focus:border-gray-500"
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message" // name="message" qo‘shdik
                        placeholder={t.yourMessage}
                        rows={4}
                        required
                        className="border-border focus:border-gray-400 dark:focus:border-gray-500"
                      />
                    </div>

                    <Button
                      type="submit" // type="submit" qilib o‘zgartirdik
                      className="w-full group text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 bg-neutral-800"
                    >
                      <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      {t.sendBtn}
                    </Button>
                  </CardContent>
                </form>
              </Card>

              <div className="space-y-6">
                <Card className="hover:shadow-xl transition-all duration-300 bg-background/90 backdrop-blur-sm border-gray-900 dark:border-gray-100">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">{t.connectWithMe}</h3>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start group bg-transparent hover:bg-gray-50 dark:hover:bg-gray-950/50 border-border"
                        onClick={() =>
                          (window.location.href =
                            "mailto:akmaljonqodirov1223@email.com")
                        }
                      >
                        <Mail className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                        akmaljonqodirov1223@email.com
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start group bg-transparent hover:bg-gray-50 dark:hover:bg-gray-950/50 border-border"
                        onClick={() =>
                          window.open("https://t.me/kadirov_akmaljon", "_blank")
                        }
                      >
                        <MessageCirclePlus className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                        Telegram Profile
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start group bg-transparent hover:bg-gray-50 dark:hover:bg-gray-950/50 border-border"
                        onClick={() =>
                          window.open("https://github.com/kadiroov", "_blank")
                        }
                      >
                        <Github className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                        GitHub Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 dark:bg-gray-950/20 backdrop-blur-sm border-gray-900 dark:border-gray-100">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">{t.availableForWork}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t.availableDesc}
                    </p>
                    <Button
                      className="w-full text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 bg-neutral-800"
                      onClick={downloadResume}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {t.downloadResume}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border bg-muted/30 relative z-10">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground">{t.footer}</p>
        </div>
      </footer>
    </div>
  );
}
