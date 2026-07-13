import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft, FileText, Lock, Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Links das 5 imagens do entregável via ImgBB
  const entregableImages = [
    "https://i.ibb.co/XkXkPmj2/image.png",
    "https://i.ibb.co/sd7JXC2j/image.png",
    "https://i.ibb.co/MJ50BWn/image.png",
    "https://i.ibb.co/39HjG5sH/image.png",
    "https://i.ibb.co/GvKyFZ8m/image.png"
  ];

  // Efeito para passar o carrossel automaticamente a cada 3 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % entregableImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [entregableImages.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowFloatingCTA(true);
      } else {
        setShowFloatingCTA(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % entregableImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + entregableImages.length) % entregableImages.length);
  };

  const scrollToPricing = () => {
    document.getElementById("precios")?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full min-h-[100dvh] bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">

      {/* Decorative background glow — desktop only (blur is too expensive on mobile) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 hidden md:block">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute top-[40%] left-0 w-[35%] h-[35%] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <div className="w-full relative z-10 overflow-x-hidden">
        {/* 1. HERO SECTION */}
        <section className="pt-24 pb-20 md:pt-32 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center text-center">

          {/* MOCKUP NO TOPO ABSOLUTO E CENTRALIZADO (VERSÃO MENOR) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-xs mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.15)] flex justify-center"
          >
            <img 
              src="https://i.ibb.co/mFCZ7Zn4/ff80246e-39f7-48d4-b94f-3fd21aa1f5cc.png" 
              className="w-auto max-h-[180px] md:max-h-[220px] object-contain rounded-sm mx-auto"
              alt="Vista previa"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="mb-8"
          >
            <Badge variant="outline" className="px-4 py-1.5 border-primary/30 text-primary/90 text-sm font-medium tracking-wide uppercase">
              Para el pastor bi-vocacional
            </Badge>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white mb-6 leading-[1.1]"
          >
            ¿Vas a predicar el domingo y <span className="text-primary italic">todavía no tienes mensaje?</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mb-10 leading-relaxed"
          >
            Prepara tu próximo mensaje en menos de 15 minutes con más de 1,000 bosquejos bíblicos listos para predicar. Tu tiempo es sagrado, inviértelo sabiamente.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
  size="lg" 
  onClick={() => {
    const basicCard = document.getElementById("plan-basico");
    if (basicCard) {
      // No celular, o -20 esconde o título "Invierte en..." e foca direto no topo do card básico
      // No desktop, usa -80 para alinhar a seção inteira
      const yOffset = window.innerWidth < 768 ? -20 : -80;
      const y = basicCard.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }}
  className="text-lg px-8 py-7 bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm font-bold tracking-wide shadow-[0_0_40px_-10px_rgba(212,175,55,0.4)] transition-all hover:scale-105"
>
  Ver Oferta Especial
  <ChevronRight className="ml-2 w-5 h-5" />
</Button>
            <div className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary/70" />
              Garantía de 7 días. Acceso inmediato.
            </div>
          </motion.div>
        </section>

        {/* 2. EL GRAN DOLOR */}
        <section className="py-20 bg-card/40 border-y border-border/50 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-10">
                Sabemos lo agotador que es.
              </h2>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="space-y-6">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Trabajas 40 horas a la semana en un empleo secular. Regresas a casa agotado, con la mente nublada, y apenas tienes tempo para tu familia. Y aún así, el domingo se acerca rápidamente.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Sientes el peso del púlpito. El miedo a repetir el mismo mensaje, la angustia de subir a predicar sin estar preparado, y la soledad del ministerio bi-vocacional.
                  </p>
                </div>
                <div className="space-y-6">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    No es falta de fe ni de consagración. Es una simple cuestión de tempo. La congregación necesita alimento espiritual profundo, pero a ti se te agotan las horas.
                  </p>
                  <p className="text-white text-xl font-serif font-medium border-l-2 border-primary pl-4 py-2">
                    No tienes que sacrificar tu descanso ni tu familia para llevar un buen mensaje.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. LA SOLUCIÓN */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
              1,000 Bosquejos Bíblicos
            </h2>
            <p className="text-xl text-primary font-medium tracking-wide">
              Tu biblioteca personal de sermones, lista para usar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp} className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-full shrink-0">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Profundidad y Variedad</h3>
                  <p className="text-muted-foreground">Más de 1,000 bosquejos que cubren todos los temas fundamentales de la Biblia. Antiguo y Nuevo Testamento, doctrinas, familia, fe y esperanza.</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-full shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Ahorro de Tiempo Masivo</h3>
                  <p className="text-muted-foreground">Estructuras lógicas de tres puntos, con textos bíblicos de apoyo ya integrados. Solo necesitas copiar, pegar, orar y predicar.</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-full shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Formato Práctico</h3>
                  <p className="text-muted-foreground">Entregado en formato digital de alta qualidade. Imprímelo de ser necesario, llévalo en tu tablet, o léelo desde tu teléfono directamente en el púlpito.</p>
                </div>
              </motion.div>
            </motion.div>

            {/* ÍNDICE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="min-h-[620px] md:aspect-[4/5] rounded-sm bg-gradient-to-tr from-card via-card to-primary/5 border border-border p-5 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent opacity-30" />

                <div className="relative z-10 w-full">
                  <div className="w-16 h-2 bg-primary/50 mb-5 md:mb-6" />

                  <h4 className="text-xl md:text-2xl font-serif font-bold text-white mb-1 text-center">
                    ÍNDICE
                  </h4>

                  <p className="text-[11px] md:text-xs text-primary text-center tracking-widest uppercase mb-5 md:mb-6">
                    Temas Principales Incluidos
                  </p>

                  <ul className="space-y-2.5 font-serif text-sm md:text-base text-muted-foreground/90">
                    <li><span className="text-primary mr-2">01.</span>Amor divino y humano</li>
                    <li><span className="text-primary mr-2">02.</span>La Biblia – La Palabra de Dios</li>
                    <li><span className="text-primary mr-2">03.</span>Biografías Bíblicas</li>
                    <li><span className="text-primary mr-2">04.</span>Consagración – Santificación</li>
                    <li><span className="text-primary mr-2">05.</span>Cuidado de Dios (Protección)</li>
                    <li><span className="text-primary mr-2">06.</span>Decálogo – La Ley de Dios</li>
                    <li><span className="text-primary mr-2">07.</span>Educación – Enseñanza</li>
                    <li><span className="text-primary mr-2">08.</span>Espíritu Santo</li>
                    <li><span className="text-primary mr-2">09.</span>Evangelismo</li>
                    <li><span className="text-primary mr-2">10.</span>Felicidad y Paz</li>
                    <li><span className="text-primary mr-2">11.</span>Fragilidad Humana</li>
                    <li><span className="text-primary mr-2">12.</span>Futuros Eventos</li>
                    <li><span className="text-primary mr-2">13.</span>Jesucristo: Salvador y Amigo</li>
                    <li><span className="text-primary mr-2">14.</span>Hogar Cristiano</li>
                    <li><span className="text-primary mr-2">15.</span>Resurrección y Vida Eterna</li>
                  </ul>
                </div>

                <div className="relative z-10 flex justify-center text-[11px] md:text-xs text-muted-foreground/40 mt-5">
                  <span>Mil bosquejos de sermones bíblicos</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. SEÇÃO DE ENTREGÁVEIS EM FORMATO CARROSSEL AUTOMÁTICO */}
        <section className="py-20 bg-card/20 border-t border-border/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Una Vista Por Dentro de tu Material
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Así es exactamente como se ven las herramientas organizadas, claras y listas para usar que transformarán tu tiempo de estudo.
              </p>
            </motion.div>

            {/* Container do Carrossel - Proporção A4 */}
            <div className="relative w-full max-w-[300px] md:max-w-[360px] mx-auto">
              <div className="relative aspect-[210/297] rounded-lg overflow-hidden bg-white border border-primary/20 shadow-[0_20px_60px_rgba(0,0,0,.45)]">

                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={entregableImages[currentSlide]}
                    alt={`Vista Previa ${currentSlide + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 w-full h-full object-contain p-1 bg-white"
                  />
                </AnimatePresence>

              </div>
            </div>

            {/* Controles do Carrossel */}
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="flex items-center gap-6">

                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="rounded-full border-primary/30 bg-primary/15 hover:bg-primary/25 text-primary w-12 h-12 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                {/* Indicadores */}
                <div className="flex gap-2">
                  {entregableImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "w-8 bg-primary"
                          : "w-2.5 bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="rounded-full border-primary/30 bg-primary/15 hover:bg-primary/25 text-primary w-12 h-12 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

              </div>
            </div>

          </div>
        </section>

        {/* 5. LOS BONOS */}
        <section className="py-24 bg-card/20 border-y border-border/50 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Bonos Exclusivos
              </h2>
              <p className="text-muted-foreground text-lg">
                Disponibles únicamente en el Plan Premium Completo.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-background border-primary/20 h-full">
                  <CardContent className="p-8">
                    <div className="mb-6 flex justify-between items-start">
                      <Badge variant="default" className="bg-primary/10 text-primary border-none text-xs font-bold uppercase tracking-wider">
                        Bono 1
                      </Badge>
                      <Star className="w-5 h-5 text-primary" fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-4">
                      500 Ilustraciones de Sermones
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Historias, metáforas y analogías poderosas para enriquecer tu predicación y hacerla verdaderamente memorable en la mente de tus oyentes. El puente entre la teología y la vida diaria.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-background border-primary/20 h-full">
                  <CardContent className="p-8">
                    <div className="mb-6 flex justify-between items-start">
                      <Badge variant="default" className="bg-primary/10 text-primary border-none text-xs font-bold uppercase tracking-wider">
                        Bono 2
                      </Badge>
                      <Star className="w-5 h-5 text-primary" fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-4">
                      Bosquejos para Cada Ocasión
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Colección especial de sermones listos para esos momentos donde no puedes improvisar: bodas, bautismos, funerales, quinceañeras, Navidad, Semana Santa, Día de la Madre y más.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECCIÓN: TESTIMONIOS */}
        <section className="py-24 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Lo Que Dicen Otros Líderes y Pastores
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Líderes de toda América Latina que recuperaron su tiempo familiar sin descuidar la profundidad del mensaje.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonio 1 */}
              <Card className="bg-card border-border/40 flex flex-col justify-between">
                <CardContent className="p-6 pt-8 relative">
                  <MessageSquare className="absolute top-4 right-4 text-primary/10 w-8 h-8" />
                  <p className="text-muted-foreground leading-relaxed italic mb-6">
                    "Entre las visitas al hospital, la administración de la iglesia y las consejerías, la semana se desarma. Este material optimiza el 70% del trabajo de escritorio. El resto es oración y ponerle mi propia voz."
                  </p>
                  <div className="flex items-center gap-3">
                    <img src="https://i.ibb.co/9mpVBghT/494899138-2966921366821797-9074009184064295111-n.jpg" alt="Pastor Carlos" loading="lazy" decoding="async" className="w-12 h-12 rounded-full object-cover border border-primary/30" />
                    <div>
                      {/* 5 Estrelas acima do nome */}
                      <div className="flex gap-0.5 mb-1 text-primary">
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                      </div>
                      <h4 className="text-white font-bold text-sm">Pastor Carlos Mendoza</h4>
                      <p className="text-xs text-muted-foreground">Colombia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonio 2 */}
              <Card className="bg-card border-border/40 flex flex-col justify-between">
                <CardContent className="p-6 pt-8 relative">
                  <MessageSquare className="absolute top-4 right-4 text-primary/10 w-8 h-8" />
                  <p className="text-muted-foreground leading-relaxed italic mb-6">
                    "Viajo mucho predicando en diferentes altares y a veces la mente se agota. Usar este material como chispazo para nuevas series de mensajes ha sido una bendición para mi mente."
                  </p>
                  <div className="flex items-center gap-3">
                    <img src="https://i.ibb.co/fzX5TQS1/686202462-10232880034930706-4041396154218817519-n.jpg" alt="Evangelista Marcos" loading="lazy" decoding="async" className="w-12 h-12 rounded-full object-cover border border-primary/30" />
                    <div>
                      {/* 5 Estrelas acima do nome */}
                      <div className="flex gap-0.5 mb-1 text-primary">
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                      </div>
                      <h4 className="text-white font-bold text-sm">Evang. Marcos Ortiz</h4>
                      <p className="text-xs text-muted-foreground">México</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Testimonio 3 */}
              <Card className="bg-card border-border/40 flex flex-col justify-between">
                <CardContent className="p-6 pt-8 relative">
                  <MessageSquare className="absolute top-4 right-4 text-primary/10 w-8 h-8" />
                  <p className="text-muted-foreground leading-relaxed italic mb-6">
                    "Además de liderar el ministerio de mujeres, apoyo a mi esposo en las células. Mi tiempo es oro. Este material me dio un respiro gigante; los temas son profundos pero están explicados de una forma que cualquiera en la iglesia los entiende."
                  </p>
                  <div className="flex items-center gap-3">
                    <img src="https://i.ibb.co/XrmKyDWK/491278299-122204556698145600-7351154097795961159-n.jpg" alt="Pastora Elena" loading="lazy" decoding="async" className="w-12 h-12 rounded-full object-cover border border-primary/30" />
                    <div>
                      {/* 5 Estrelas acima do nome */}
                      <div className="flex gap-0.5 mb-1 text-primary">
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                        <Star className="w-3.5 h-3.5" fill="currentColor" />
                      </div>
                      <h4 className="text-white font-bold text-sm">Pastora Elena Ríos</h4>
                      <p className="text-xs text-muted-foreground">Perú</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 6. PRECIOS */}
        <section id="precios" className="py-24 w-full scroll-m-20">
          <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
              Invierte en tu ministerio.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Obtén acceso inmediato a todo el material. Sin suscripciones, pagas una sola vez y el material es tuyo para siempre.
            </p>
          </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-sm md:max-w-none mx-auto w-full">
            {/* Plan Básico */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              {/* ADICIONADO O ID "plan-basico" AQUI */}
              <Card id="plan-basico" className="w-full bg-card border-border shadow-xl relative overflow-hidden">
                {/* Ajustado o padding lateral para telas pequenas */}
                <CardContent className="p-4 xs:p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-white mb-2">Plan Básico</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-serif font-bold text-white">$5</span>
                    <span className="text-muted-foreground">USD</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">1,000 Bosquejos Bíblicos</span>
                    </li>
                    <li className="flex items-start gap-3 opacity-40">
                      <div className="w-5 h-5 shrink-0 mt-0.5 border-2 border-muted-foreground/30 rounded-full" />
                      <span className="text-muted-foreground line-through">Bono: 500 Ilustraciones</span>
                    </li>
                    <li className="flex items-start gap-3 opacity-40">
                      <div className="w-5 h-5 shrink-0 mt-0.5 border-2 border-muted-foreground/30 rounded-full" />
                      <span className="text-muted-foreground line-through">Bono: Para Cada Ocasión</span>
                    </li>
                  </ul>

                  <Button variant="outline" className="w-full h-12 text-md border-primary/30 hover:bg-primary/10" asChild>
                    <a href="https://pay.hotmart.com/Y106702539Q" target="_blank" rel="noopener noreferrer">
                      Comprar Plan Básico
                    </a>
                  </Button>
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Pago único • Sin suscripciones
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Plan Premium */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full"
            >
              <div className="absolute -top-4 inset-x-0 flex justify-center z-10">
                <Badge className="bg-primary text-primary-foreground font-bold px-4 py-1 border-none shadow-lg">
                  El más elegido ✓
                </Badge>
              </div>

              {/* ADICIONADO O ID AQUI PARA O BOTÃO FLUTUANTE ENCONTRAR */}
                <Card id="plan-premium" className="w-full bg-card border-primary ring-1 ring-primary/50 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                  <CardContent className="p-4 xs:p-6 sm:p-8 pt-10">
                  <h3 className="text-2xl font-bold text-primary mb-2">Plan Premium Completo</h3>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-5xl font-serif font-bold text-white">$9.99</span>
                    <span className="text-muted-foreground">USD</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">Original $47</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-white font-medium">1,000 Bosquejos Bíblicos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-white font-medium">Bono: 500 Ilustraciones</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-white font-medium">Bono: Bosquejos Para Cada Ocasión</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-white font-medium">Acceso Vitalicio</span>
                    </li>
                  </ul>

                    <Button className="w-full h-14 text-base md:text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_20px_-5px_rgba(212,175,55,0.5)] animate-pulse" asChild>
                      <a href="https://pay.hotmart.com/D106702430V?checkoutMode=10" target="_blank" rel="noopener noreferrer">
                        ¡Obtener Acceso Premium!
                      </a>
                    </Button>
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Pago único • Acceso de por vida
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          </div>
        </section>

        {/* 7. GARANTÍA Y CONFIANZA */}
        <section className="py-20 bg-background border-t border-border/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-card border border-primary/30 flex items-center justify-center mb-6 shadow-xl relative">
                <ShieldCheck className="w-10 h-10 text-primary" />
                <div className="absolute inset-0 rounded-full ring-2 ring-primary/20 ring-offset-4 ring-offset-background" />
              </div>

              <h2 className="text-3xl font-serif font-bold text-white mb-4">
                Garantía de Satisfacción de 7 Días
              </h2>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Si por cualquier razón no estás satisfecho con el material, te devolvemos el 100% de tu inversión. Sin preguntas, sin complicaciones. Tu confianza lo es todo para nosotros.
              </p>

              <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground tracking-wide">
                  Pago 100% seguro y encriptado
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 8. PREGUNTAS FRECUENTES */}
        <section className="py-24 bg-card/30 border-t border-border/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-bold text-white">
                Preguntas Frecuentes
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border border-border/50 rounded-sm px-6 bg-background/50 data-[state=open]:bg-card/50 transition-colors">
                  <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-primary">
                    ¿Cómo recibo el material?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    Inmediatamente después de tu compra recibirás un correo electrónico con el enlace de acceso. Todo en formato digital listo para usar desde tu celular, tablet o computadora.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border border-border/50 rounded-sm px-6 bg-background/50 data-[state=open]:bg-card/50 transition-colors">
                  <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-primary">
                    ¿Sirve para cualquier denominación?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    Sí. Los bosquejos están basados puramente en la Biblia y son fundamentalmente cristianos. Pastores bautistas, pentecostales, metodistas y de otras denominaciones ya los están usando con gran éxito.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border border-border/50 rounded-sm px-6 bg-background/50 data-[state=open]:bg-card/50 transition-colors">
                  <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-primary">
                    ¿Es un pago único o hay mensualidades?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    Es un pago único. Pagas una sola vez y el material es tuyo para siempre. Sin suscripciones, sin sorpresas, sin cobros ocultos.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border border-border/50 rounded-sm px-6 bg-background/50 data-[state=open]:bg-card/50 transition-colors">
                  <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-primary">
                    ¿Y si no me satisface el material?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    Tienes 7 días de garantía incondicional. Si al revisar el contenido sientes que no aporta valor a tu ministerio, te devolvemos tu dinero al 100%, sin hacer preguntas.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border border-border/50 rounded-sm px-6 bg-background/50 data-[state=open]:bg-card/50 transition-colors">
                  <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-primary">
                    ¿En qué formato está el material?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    Todos los bosquejos y bonos están en formato digital claro y legible, perfectamente organizados. Puedes visualizarlos fácilmente o leerlos desde cualquier dispositivo digital que prefieras usar en el púlpito.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Footer Minimalista */}
        <footer className="py-8 text-center text-muted-foreground/50 text-sm border-t border-border/30">
          <p>© {new Date().getFullYear()} 1000 Bosquejos Bíblicos. Todos los derechos reservados.</p>
        </footer>
      </div>

      {/* Floating Mobile CTA */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border z-50 md:hidden flex justify-center"
          >
            <Button
  size="lg"
  onClick={() => {
    const premiumCard = document.getElementById("plan-premium");
    if (premiumCard) {
      const y = premiumCard.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }}
  className="w-full max-w-sm h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg"
>
  Obtener el Paquete por $9.99
</Button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
