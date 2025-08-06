"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Recycle, Users, TrendingUp, AlertTriangle, BookOpen, Target, Leaf, ArrowRight, Sparkles, Globe, Heart, User, Award, Mail, Phone, Facebook, Twitter, Instagram, Upload, Filter, Clock, X, Edit, Trash2, Eye } from 'lucide-react'

// Tipos para los datos
interface Reporte {
  id: number
  titulo: string
  descripcion: string
  prioridad: 'baja' | 'media' | 'alta' | 'critica'
  ubicacion: string
  fecha: string
  estado: 'pendiente' | 'en-proceso' | 'resuelto'
  imagen?: string
}

interface PuntoAcopio {
  id: number
  titulo: string
  descripcion: string
  tipoResiduos: string
  ubicacion: string
  telefono: string
  horario: string
  fecha: string
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("inicio")
  
  // Estados para reportes y puntos de acopio
  const [reportes, setReportes] = useState<Reporte[]>([
    {
      id: 1,
      titulo: "Acumulación de basura en Av. Municipalidad",
      descripcion: "Gran cantidad de residuos sólidos acumulados en la esquina",
      prioridad: "alta",
      ubicacion: "Av. Municipalidad 123",
      fecha: "2024-01-15",
      estado: "pendiente",
      imagen: "/basura-acumulada-esquina.png",
    },
    {
      id: 2,
      titulo: "Contenedor desbordado en Plaza de Armas",
      descripcion: "Contenedor de basura completamente lleno y desbordando",
      prioridad: "media",
      ubicacion: "Plaza de Armas",
      fecha: "2024-01-14",
      estado: "en-proceso",
      imagen: "/lleno-contenedor-basura.png",
    },
  ])

  const [puntosAcopio, setPuntosAcopio] = useState<PuntoAcopio[]>([
    {
      id: 1,
      titulo: "Centro de Reciclaje Municipal",
      descripcion: "Centro principal de acopio de materiales reciclables",
      tipoResiduos: "Papel, Plástico, Vidrio",
      ubicacion: "Calle Los Ángeles 456",
      telefono: "+51 956 123 456",
      horario: "Lunes a Viernes 8:00 AM - 6:00 PM",
      fecha: "2024-01-10",
    },
    {
      id: 2,
      titulo: "Punto Verde Mercado Central",
      descripcion: "Punto de acopio en el mercado central",
      tipoResiduos: "Orgánicos, Papel",
      ubicacion: "Mercado Central - Stand 15",
      telefono: "+51 956 789 123",
      horario: "Todos los días 6:00 AM - 4:00 PM",
      fecha: "2024-01-08",
    },
  ])

  const metricas = {
    toneladas: 1247,
    ciudadanos: 3892,
    reportes: reportes.length,
    puntos: puntosAcopio.length,
  }

  const navigateTo = (page: string) => {
    setCurrentPage(page)
  }

  if (currentPage !== "inicio") {
    return (
      <div className="min-h-screen">
        {currentPage === "mapa" && <MapaPage onNavigate={navigateTo} reportes={reportes} setReportes={setReportes} puntosAcopio={puntosAcopio} setPuntosAcopio={setPuntosAcopio} />}
        {currentPage === "blog" && <BlogPage onNavigate={navigateTo} reportes={reportes} setReportes={setReportes} puntosAcopio={puntosAcopio} setPuntosAcopio={setPuntosAcopio} />}
        {currentPage === "nosotros" && <NosotrosPage onNavigate={navigateTo} />}
        {currentPage === "contacto" && <ContactoPage onNavigate={navigateTo} />}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Navigation */}
      <header className="fixed top-0 w-full bg-black/20 backdrop-blur-lg border-b border-white/10 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Leaf className="h-10 w-10 text-emerald-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  LimpIA Ica
                </span>
                <div className="text-xs text-emerald-300/70">Gestión Inteligente</div>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <button className="text-white/90 hover:text-emerald-400 transition-all duration-300 font-medium">
                Inicio
              </button>
              <button
                onClick={() => navigateTo("mapa")}
                className="text-white/70 hover:text-emerald-400 transition-all duration-300 font-medium"
              >
                Mapa
              </button>
              <button
                onClick={() => navigateTo("blog")}
                className="text-white/70 hover:text-emerald-400 transition-all duration-300 font-medium"
              >
                Blog
              </button>
              <button
                onClick={() => navigateTo("nosotros")}
                className="text-white/70 hover:text-emerald-400 transition-all duration-300 font-medium"
              >
                Nosotros
              </button>
              <button
                onClick={() => navigateTo("contacto")}
                className="text-white/70 hover:text-emerald-400 transition-all duration-300 font-medium"
              >
                Contacto
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-emerald-400 mr-2" />
            <span className="text-emerald-300 text-sm font-medium">Tecnología para el Cambio Social</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
            LimpIA Ica
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-white/80 leading-relaxed">
            La plataforma digital más avanzada para transformar la gestión de residuos sólidos urbanos en Ica. 
            <span className="text-emerald-300"> Únete a la revolución verde</span> y ayuda a crear una ciudad más limpia y sostenible.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
              onClick={() => navigateTo("mapa")}
            >
              <AlertTriangle className="mr-3 h-6 w-6" />
              Reportar Punto Crítico
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400 bg-transparent backdrop-blur-sm px-8 py-4 text-lg font-semibold transition-all duration-300"
              onClick={() => navigateTo("mapa")}
            >
              <Recycle className="mr-3 h-6 w-6" />
              Explorar Reciclaje
            </Button>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <TrendingUp className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{metricas.toneladas}</div>
              <div className="text-emerald-300/80 text-sm">Toneladas Recicladas</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <Users className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{metricas.ciudadanos}</div>
              <div className="text-cyan-300/80 text-sm">Ciudadanos Activos</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <AlertTriangle className="h-8 w-8 text-orange-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{metricas.reportes}</div>
              <div className="text-orange-300/80 text-sm">Reportes Realizados</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <MapPin className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{metricas.puntos}</div>
              <div className="text-purple-300/80 text-sm">Puntos de Acopio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Descubre Nuestras Funcionalidades
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Herramientas poderosas diseñadas para empoderar a la comunidad y crear un impacto real
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div
              className="group bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-lg border border-emerald-500/20 rounded-3xl p-8 hover:from-emerald-500/20 hover:to-emerald-600/10 transition-all duration-500 cursor-pointer"
              onClick={() => navigateTo("blog")}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Blog Educativo</h3>
                  <div className="text-emerald-300/70">Contenido especializado</div>
                </div>
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">
                Accede a contenido educativo de alta calidad sobre reciclaje, gestión de residuos y sostenibilidad ambiental. 
                Aprende de expertos y comparte conocimiento con la comunidad.
              </p>
              <div className="flex items-center text-emerald-400 font-semibold group-hover:text-emerald-300 transition-colors">
                Explorar Contenido
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              className="group bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 backdrop-blur-lg border border-cyan-500/20 rounded-3xl p-8 hover:from-cyan-500/20 hover:to-cyan-600/10 transition-all duration-500 cursor-pointer"
              onClick={() => navigateTo("nosotros")}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Nuestro Proyecto</h3>
                  <div className="text-cyan-300/70">Misión y visión</div>
                </div>
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">
                Descubre más sobre nuestra misión, visión y el equipo apasionado detrás de LimpIA Ica. 
                Conoce cómo estamos transformando la gestión urbana con tecnología.
              </p>
              <div className="flex items-center text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
                Conocer Más
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-cyan-600/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Globe className="h-16 w-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Únete al Cambio
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Cada acción cuenta. Cada reporte importa. Cada ciudadano puede hacer la diferencia. 
              <span className="text-emerald-300">Juntos construimos una Ica más sostenible.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                onClick={() => navigateTo("mapa")}
              >
                <Heart className="mr-3 h-6 w-6" />
                Comenzar Ahora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent backdrop-blur-sm px-8 py-4 text-lg font-semibold transition-all duration-300"
                onClick={() => navigateTo("contacto")}
              >
                Contáctanos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Leaf className="h-8 w-8 text-emerald-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  LimpIA Ica
                </span>
              </div>
              <p className="text-white/60 leading-relaxed">
                Plataforma digital para mejorar la gestión de residuos sólidos urbanos en Ica.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Enlaces Rápidos</h4>
              <ul className="space-y-3 text-white/60">
                <li><button className="hover:text-emerald-400 transition-colors">Inicio</button></li>
                <li><button onClick={() => navigateTo("mapa")} className="hover:text-emerald-400 transition-colors">Mapa</button></li>
                <li><button onClick={() => navigateTo("blog")} className="hover:text-emerald-400 transition-colors">Blog</button></li>
                <li><button onClick={() => navigateTo("nosotros")} className="hover:text-emerald-400 transition-colors">Nosotros</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Servicios</h4>
              <ul className="space-y-3 text-white/60">
                <li>Reportes de Problemas</li>
                <li>Puntos de Acopio</li>
                <li>Contenido Educativo</li>
                <li>Voluntariados</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Contacto</h4>
              <ul className="space-y-3 text-white/60">
                <li>contacto@limpiaica.pe</li>
                <li>+51 956 123 456</li>
                <li>Universidad Nacional San Luis Gonzaga de Ica</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50">
            <p>
              &copy; 2024 LimpIA Ica. Todos los derechos reservados. Desarrollado con ❤️ por estudiantes de Ingeniería de Sistemas - UNICA.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Componente de página de Mapa
function MapaPage({ onNavigate, reportes, setReportes, puntosAcopio, setPuntosAcopio }: { 
  onNavigate: (page: string) => void
  reportes: Reporte[]
  setReportes: React.Dispatch<React.SetStateAction<Reporte[]>>
  puntosAcopio: PuntoAcopio[]
  setPuntosAcopio: React.Dispatch<React.SetStateAction<PuntoAcopio[]>>
}) {
  const [activeTab, setActiveTab] = useState("ver-mapa")
  const [reportForm, setReportForm] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "",
    ubicacion: "",
    imagen: null as File | null,
  })
  const [acopioForm, setAcopioForm] = useState({
    titulo: "",
    descripcion: "",
    tipoResiduos: "",
    ubicacion: "",
    telefono: "",
    horario: "",
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setReportForm({ ...reportForm, imagen: file })
    }
  }

  const handleSubmitReport = () => {
    if (!reportForm.titulo || !reportForm.descripcion || !reportForm.prioridad || !reportForm.ubicacion) {
      return
    }

    const newReport: Reporte = {
      id: Date.now(),
      titulo: reportForm.titulo,
      descripcion: reportForm.descripcion,
      prioridad: reportForm.prioridad as 'baja' | 'media' | 'alta' | 'critica',
      ubicacion: reportForm.ubicacion,
      fecha: new Date().toISOString().split('T')[0],
      estado: "pendiente",
      imagen: reportForm.imagen ? URL.createObjectURL(reportForm.imagen) : undefined,
    }

    setReportes([...reportes, newReport])
    setReportForm({
      titulo: "",
      descripcion: "",
      prioridad: "",
      ubicacion: "",
      imagen: null,
    })
    // Resetear el input de archivo
    const fileInput = document.getElementById('image-upload') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const handleSubmitAcopio = () => {
    if (!acopioForm.titulo || !acopioForm.tipoResiduos || !acopioForm.ubicacion) {
      return
    }

    const newAcopio: PuntoAcopio = {
      id: Date.now(),
      titulo: acopioForm.titulo,
      descripcion: acopioForm.descripcion,
      tipoResiduos: acopioForm.tipoResiduos,
      ubicacion: acopioForm.ubicacion,
      telefono: acopioForm.telefono,
      horario: acopioForm.horario,
      fecha: new Date().toISOString().split('T')[0],
    }

    setPuntosAcopio([...puntosAcopio, newAcopio])
    setAcopioForm({
      titulo: "",
      descripcion: "",
      tipoResiduos: "",
      ubicacion: "",
      telefono: "",
      horario: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/20 backdrop-blur-lg border-b border-white/10 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold text-white">LimpIA Ica</span>
            </div>
            <div className="flex space-x-6">
              <button onClick={() => onNavigate("inicio")} className="text-white/70 hover:text-emerald-400 transition-colors">Inicio</button>
              <button className="text-emerald-400 font-semibold">Mapa</button>
              <button onClick={() => onNavigate("blog")} className="text-white/70 hover:text-emerald-400 transition-colors">Blog</button>
              <button onClick={() => onNavigate("nosotros")} className="text-white/70 hover:text-emerald-400 transition-colors">Nosotros</button>
              <button onClick={() => onNavigate("contacto")} className="text-white/70 hover:text-emerald-400 transition-colors">Contacto</button>
            </div>
          </div>
        </nav>
      </header>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Mapa Interactivo
            </h1>
            <p className="text-xl text-white/70">Explora, reporta y contribuye a una Ica más limpia</p>
          </div>

          {/* Dashboard de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-lg border border-red-500/30 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-red-300 mb-2">{reportes.filter(r => r.estado === 'pendiente').length}</div>
              <div className="text-red-200/80">Reportes Activos</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">{puntosAcopio.length}</div>
              <div className="text-blue-200/80">Puntos de Acopio</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">{Math.round((reportes.filter(r => r.estado === 'resuelto').length / reportes.length) * 100) || 0}%</div>
              <div className="text-green-200/80">Reportes Resueltos</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-300 mb-2">24h</div>
              <div className="text-purple-200/80">Tiempo Promedio</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveTab("ver-mapa")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "ver-mapa"
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                Ver Mapa
              </button>
              <button
                onClick={() => setActiveTab("reportar")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "reportar"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                Reportar Problema
              </button>
              <button
                onClick={() => setActiveTab("registrar")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "registrar"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                Registrar Acopio
              </button>
            </div>

            {activeTab === "ver-mapa" && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition-colors">
                    <Filter className="mr-2 h-4 w-4 inline" />
                    Todos
                  </button>
                  <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-colors">
                    <AlertTriangle className="mr-2 h-4 w-4 inline" />
                    Reportes
                  </button>
                  <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-colors">
                    <Recycle className="mr-2 h-4 w-4 inline" />
                    Puntos de Acopio
                  </button>
                </div>

                <div className="h-96 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-20 w-20 text-emerald-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">Mapa Interactivo de Ica</h3>
                    <p className="text-white/70 mb-6">Aquí se mostraría el mapa con marcadores dinámicos</p>
                    <div className="flex justify-center gap-6">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-white/80">Reportes ({reportes.length})</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-white/80">Puntos de Acopio ({puntosAcopio.length})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reportar" && (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <AlertTriangle className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Reportar Problema</h3>
                  <p className="text-white/70">Ayúdanos a identificar puntos críticos de acumulación de basura</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white/80 font-semibold mb-2">Título del Reporte *</label>
                    <input
                      type="text"
                      placeholder="Ej: Acumulación de basura en..."
                      value={reportForm.titulo}
                      onChange={(e) => setReportForm({ ...reportForm, titulo: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 font-semibold mb-2">Descripción *</label>
                    <textarea
                      placeholder="Describe detalladamente el problema..."
                      rows={4}
                      value={reportForm.descripcion}
                      onChange={(e) => setReportForm({ ...reportForm, descripcion: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 font-semibold mb-2">Nivel de Prioridad *</label>
                      <Select value={reportForm.prioridad} onValueChange={(value) => setReportForm({ ...reportForm, prioridad: value })}>
                        <SelectTrigger className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all">
                          <SelectValue placeholder="Selecciona la prioridad" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="baja" className="text-white hover:bg-slate-700">Baja</SelectItem>
                          <SelectItem value="media" className="text-white hover:bg-slate-700">Media</SelectItem>
                          <SelectItem value="alta" className="text-white hover:bg-slate-700">Alta</SelectItem>
                          <SelectItem value="critica" className="text-white hover:bg-slate-700">Crítica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-white/80 font-semibold mb-2">Ubicación *</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Dirección o referencia"
                          value={reportForm.ubicacion}
                          onChange={(e) => setReportForm({ ...reportForm, ubicacion: e.target.value })}
                          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all"
                        />
                        <button className="px-4 py-3 bg-orange-500/20 border border-orange-500/30 rounded-xl text-orange-300 hover:bg-orange-500/30 transition-colors">
                          <MapPin className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 font-semibold mb-2">Imagen de Referencia</label>
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-orange-400/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="h-12 w-12 text-white/40 mx-auto mb-4" />
                        <p className="text-white/60 mb-2">
                          {reportForm.imagen ? reportForm.imagen.name : "Arrastra una imagen aquí o haz clic para seleccionar"}
                        </p>
                        <p className="text-white/40 text-sm">PNG, JPG hasta 10MB</p>
                      </label>
                    </div>
                  </div>
                  <Button 
                    onClick={handleSubmitReport}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 text-lg font-semibold"
                  >
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Enviar Reporte
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "registrar" && (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <Recycle className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Registrar Punto de Acopio</h3>
                  <p className="text-white/70">Registra un nuevo punto de recolección de materiales reciclables</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white/80 font-semibold mb-2">Título *</label>
                    <input
                      type="text"
                      placeholder="Nombre del punto de acopio"
                      value={acopioForm.titulo}
                      onChange={(e) => setAcopioForm({ ...acopioForm, titulo: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 font-semibold mb-2">Descripción</label>
                    <textarea
                      placeholder="Describe el punto de acopio..."
                      rows={3}
                      value={acopioForm.descripcion}
                      onChange={(e) => setAcopioForm({ ...acopioForm, descripcion: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 font-semibold mb-2">Tipo de Residuos *</label>
                      <input
                        type="text"
                        placeholder="Ej: Papel, Plástico, Vidrio"
                        value={acopioForm.tipoResiduos}
                        onChange={(e) => setAcopioForm({ ...acopioForm, tipoResiduos: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 font-semibold mb-2">Teléfono</label>
                      <input
                        type="text"
                        placeholder="+51 xxx xxx xxx"
                        value={acopioForm.telefono}
                        onChange={(e) => setAcopioForm({ ...acopioForm, telefono: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 font-semibold mb-2">Ubicación *</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Dirección completa"
                        value={acopioForm.ubicacion}
                        onChange={(e) => setAcopioForm({ ...acopioForm, ubicacion: e.target.value })}
                        className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                      />
                      <button className="px-4 py-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-300 hover:bg-blue-500/30 transition-colors">
                        <MapPin className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 font-semibold mb-2">Horario de Atención</label>
                    <input
                      type="text"
                      placeholder="Ej: Lunes a Viernes 8:00 AM - 6:00 PM"
                      value={acopioForm.horario}
                      onChange={(e) => setAcopioForm({ ...acopioForm, horario: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                    />
                  </div>
                  <Button 
                    onClick={handleSubmitAcopio}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 text-lg font-semibold"
                  >
                    <Recycle className="mr-2 h-5 w-5" />
                    Registrar Punto de Acopio
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente de página de Blog
function BlogPage({ onNavigate, reportes, setReportes, puntosAcopio, setPuntosAcopio }: { 
  onNavigate: (page: string) => void
  reportes: Reporte[]
  setReportes: React.Dispatch<React.SetStateAction<Reporte[]>>
  puntosAcopio: PuntoAcopio[]
  setPuntosAcopio: React.Dispatch<React.SetStateAction<PuntoAcopio[]>>
}) {
  const [activeTab, setActiveTab] = useState("contenido")
  const [selectedReport, setSelectedReport] = useState<Reporte | null>(null)
  const [selectedAcopio, setSelectedAcopio] = useState<PuntoAcopio | null>(null)
  const [showDeleteNotification, setShowDeleteNotification] = useState(false)

  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case 'critica': return 'bg-red-500/30 border-red-400/50 text-red-300'
      case 'alta': return 'bg-red-500/20 border-red-400/40 text-red-300'
      case 'media': return 'bg-yellow-500/20 border-yellow-400/40 text-yellow-300'
      case 'baja': return 'bg-green-500/20 border-green-400/40 text-green-300'
      default: return 'bg-gray-500/20 border-gray-400/40 text-gray-300'
    }
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'bg-orange-500/20 border-orange-400/30 text-orange-300'
      case 'en-proceso': return 'bg-blue-500/20 border-blue-400/30 text-blue-300'
      case 'resuelto': return 'bg-green-500/20 border-green-400/30 text-green-300'
      default: return 'bg-gray-500/20 border-gray-400/30 text-gray-300'
    }
  }

  const updateReportStatus = (reportId: number, newStatus: 'pendiente' | 'en-proceso' | 'resuelto') => {
    setReportes(reportes.map(report => 
      report.id === reportId ? { ...report, estado: newStatus } : report
    ))
    setSelectedReport(null)
  }

  const deleteReport = (reportId: number) => {
    setReportes(reportes.filter(report => report.id !== reportId))
    setSelectedReport(null)
    setShowDeleteNotification(true)
    setTimeout(() => setShowDeleteNotification(false), 3000)
  }

  const deleteAcopio = (acopioId: number) => {
    setPuntosAcopio(puntosAcopio.filter(acopio => acopio.id !== acopioId))
    setSelectedAcopio(null)
    setShowDeleteNotification(true)
    setTimeout(() => setShowDeleteNotification(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/20 backdrop-blur-lg border-b border-white/10 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold text-white">LimpIA Ica</span>
            </div>
            <div className="flex space-x-6">
              <button onClick={() => onNavigate("inicio")} className="text-white/70 hover:text-emerald-400 transition-colors">Inicio</button>
              <button onClick={() => onNavigate("mapa")} className="text-white/70 hover:text-emerald-400 transition-colors">Mapa</button>
              <button className="text-emerald-400 font-semibold">Blog</button>
              <button onClick={() => onNavigate("nosotros")} className="text-white/70 hover:text-emerald-400 transition-colors">Nosotros</button>
              <button onClick={() => onNavigate("contacto")} className="text-white/70 hover:text-emerald-400 transition-colors">Contacto</button>
            </div>
          </div>
        </nav>
      </header>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Blog y Comunidad
            </h1>
            <p className="text-xl text-white/70">Conocimiento, reportes y puntos de acopio en un solo lugar</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <button
              onClick={() => setActiveTab("contenido")}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "contenido"
                  ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              Contenido Educativo
            </button>
            <button
              onClick={() => setActiveTab("reportes")}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "reportes"
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              Reportes ({reportes.length})
            </button>
            <button
              onClick={() => setActiveTab("puntos")}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "puntos"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              Puntos de Acopio ({puntosAcopio.length})
            </button>
          </div>

          {activeTab === "contenido" && (
            <div className="space-y-8">
              {/* Búsqueda y filtros */}
              <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all"
                />
                <Select>
                  <SelectTrigger className="px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all">
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="todas" className="text-white hover:bg-slate-700">Todas las categorías</SelectItem>
                    <SelectItem value="reciclaje" className="text-white hover:bg-slate-700">Reciclaje</SelectItem>
                    <SelectItem value="educacion" className="text-white hover:bg-slate-700">Educación</SelectItem>
                    <SelectItem value="sostenibilidad" className="text-white hover:bg-slate-700">Sostenibilidad</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Artículo destacado */}
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 max-w-6xl mx-auto">
                <div className="md:flex items-center gap-8">
                  <div className="md:w-1/2 mb-6 md:mb-0">
                    <img
                      src="/destacado-reciclaje.png"
                      alt="Artículo destacado"
                      className="w-full h-64 object-cover rounded-2xl"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <div className="inline-block px-4 py-2 bg-purple-500/30 border border-purple-400/50 rounded-full text-purple-200 text-sm font-semibold mb-4">
                      ⭐ Destacado
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Guía Completa de Reciclaje en Casa</h3>
                    <p className="text-white/70 mb-6 leading-relaxed">
                      Aprende cómo implementar un sistema de reciclaje efectivo en tu hogar con esta guía paso a paso. 
                      Descubre técnicas profesionales y consejos prácticos para maximizar tu impacto ambiental.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-white/60 text-sm">
                        <span>Equipo LimpIA • 10 Ene 2024</span>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                        Leer Más
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid de artículos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group">
                    <img
                      src={`/reciclaje-en-casa.png`}
                      alt="Artículo"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-6">
                      <div className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-xs font-semibold mb-3">
                        Reciclaje
                      </div>
                      <h3 className="font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                        Impacto Ambiental de los Residuos Sólidos
                      </h3>
                      <p className="text-white/60 text-sm mb-4">
                        Conoce el impacto que tienen los residuos mal gestionados en nuestro ambiente...
                      </p>
                      <div className="flex items-center justify-between text-xs text-white/50">
                        <span>Dr. María González</span>
                        <span>8 Ene 2024</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reportes" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                <input
                  type="text"
                  placeholder="Buscar reportes..."
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-red-400 focus:bg-white/20 transition-all"
                />
                <Select>
                  <SelectTrigger className="px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-red-400 focus:bg-white/20 transition-all">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="todos" className="text-white hover:bg-slate-700">Todos los estados</SelectItem>
                    <SelectItem value="pendiente" className="text-white hover:bg-slate-700">Pendiente</SelectItem>
                    <SelectItem value="en-proceso" className="text-white hover:bg-slate-700">En proceso</SelectItem>
                    <SelectItem value="resuelto" className="text-white hover:bg-slate-700">Resuelto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {reportes.map((reporte) => (
                  <Dialog key={reporte.id}>
                    <DialogTrigger asChild>
                      <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 backdrop-blur-lg border border-red-500/20 rounded-2xl overflow-hidden hover:from-red-500/20 hover:to-red-600/10 transition-all duration-300 group cursor-pointer">
                        {reporte.imagen && (
                          <img
                            src={reporte.imagen || "/placeholder.svg"}
                            alt={reporte.titulo}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(reporte.prioridad)}`}>
                              {reporte.prioridad.charAt(0).toUpperCase() + reporte.prioridad.slice(1)} Prioridad
                            </div>
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(reporte.estado)}`}>
                              {reporte.estado === 'en-proceso' ? 'En Proceso' : reporte.estado.charAt(0).toUpperCase() + reporte.estado.slice(1)}
                            </div>
                          </div>
                          <h3 className="font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
                            {reporte.titulo}
                          </h3>
                          <p className="text-white/60 text-sm mb-4">
                            {reporte.descripcion.substring(0, 100)}...
                          </p>
                          <div className="flex items-center justify-between text-xs text-white/50">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{reporte.ubicacion}</span>
                            </div>
                            <span>{reporte.fecha}</span>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-slate-900 border-slate-700">
                      <DialogHeader>
                        <DialogTitle className="text-white">{reporte.titulo}</DialogTitle>
                        <DialogDescription className="text-slate-300">Detalles del reporte</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        {reporte.imagen && (
                          <img
                            src={reporte.imagen || "/placeholder.svg"}
                            alt={reporte.titulo}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        )}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-slate-400 text-sm">Prioridad</label>
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${getPriorityColor(reporte.prioridad)}`}>
                              {reporte.prioridad.charAt(0).toUpperCase() + reporte.prioridad.slice(1)} Prioridad
                            </div>
                          </div>
                          <div>
                            <label className="text-slate-400 text-sm">Estado</label>
                            <Select 
                              value={reporte.estado}
                              onValueChange={(value) => updateReportStatus(reporte.id, value as 'pendiente' | 'en-proceso' | 'resuelto')}
                            >
                              <SelectTrigger className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                <SelectItem value="pendiente" className="text-white hover:bg-slate-700">Pendiente</SelectItem>
                                <SelectItem value="en-proceso" className="text-white hover:bg-slate-700">En Proceso</SelectItem>
                                <SelectItem value="resuelto" className="text-white hover:bg-slate-700">Resuelto</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <label className="text-slate-400 text-sm">Descripción</label>
                          <p className="text-white mt-1">{reporte.descripcion}</p>
                        </div>
                        <div>
                          <label className="text-slate-400 text-sm">Ubicación</label>
                          <p className="text-white mt-1">{reporte.ubicacion}</p>
                        </div>
                        <div>
                          <label className="text-slate-400 text-sm">Fecha de Reporte</label>
                          <p className="text-white mt-1">{reporte.fecha}</p>
                        </div>
                        <div className="flex gap-4">
                          <Button 
                            onClick={() => updateReportStatus(reporte.id, 'resuelto')}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Marcar como Resuelto
                          </Button>
                          <Button 
                            onClick={() => deleteReport(reporte.id)}
                            variant="destructive"
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          )}

          {activeTab === "puntos" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                <input
                  type="text"
                  placeholder="Buscar puntos de acopio..."
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                />
                <Select>
                  <SelectTrigger className="px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all">
                    <SelectValue placeholder="Todos los tipos" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="todos" className="text-white hover:bg-slate-700">Todos los tipos</SelectItem>
                    <SelectItem value="papel" className="text-white hover:bg-slate-700">Papel</SelectItem>
                    <SelectItem value="plastico" className="text-white hover:bg-slate-700">Plástico</SelectItem>
                    <SelectItem value="vidrio" className="text-white hover:bg-slate-700">Vidrio</SelectItem>
                    <SelectItem value="organicos" className="text-white hover:bg-slate-700">Orgánicos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {puntosAcopio.map((punto) => (
                  <Dialog key={punto.id}>
                    <DialogTrigger asChild>
                      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-6 hover:from-blue-500/20 hover:to-blue-600/10 transition-all duration-300 group cursor-pointer">
                        <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                            <Recycle className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors">
                              {punto.titulo}
                            </h3>
                            <div className="text-blue-300/70 text-sm">Registrado: {punto.fecha}</div>
                          </div>
                        </div>
                        <p className="text-white/60 text-sm mb-6">
                          {punto.descripcion || "Centro de acopio de materiales reciclables"}
                        </p>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center">
                            <div className="inline-block px-2 py-1 bg-blue-500/20 border border-blue-400/30 rounded text-blue-300 text-xs mr-3">
                              Residuos
                            </div>
                            <span className="text-white/70">{punto.tipoResiduos}</span>
                          </div>
                          <div className="flex items-center text-white/60">
                            <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                            <span>{punto.ubicacion}</span>
                          </div>
                          {punto.telefono && (
                            <div className="flex items-center text-white/60">
                              <Phone className="h-4 w-4 mr-2 text-blue-400" />
                              <span>{punto.telefono}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-slate-900 border-slate-700">
                      <DialogHeader>
                        <DialogTitle className="text-white">{punto.titulo}</DialogTitle>
                        <DialogDescription className="text-slate-300">Detalles del punto de acopio</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-slate-400 text-sm">Tipo de Residuos</label>
                            <p className="text-white mt-1">{punto.tipoResiduos}</p>
                          </div>
                          <div>
                            <label className="text-slate-400 text-sm">Teléfono</label>
                            <p className="text-white mt-1">{punto.telefono || "No especificado"}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-slate-400 text-sm">Descripción</label>
                          <p className="text-white mt-1">{punto.descripcion || "Sin descripción disponible"}</p>
                        </div>
                        <div>
                          <label className="text-slate-400 text-sm">Ubicación</label>
                          <p className="text-white mt-1">{punto.ubicacion}</p>
                        </div>
                        <div>
                          <label className="text-slate-400 text-sm">Horario de Atención</label>
                          <p className="text-white mt-1">{punto.horario || "No especificado"}</p>
                        </div>
                        <div>
                          <label className="text-slate-400 text-sm">Fecha de Registro</label>
                          <p className="text-white mt-1">{punto.fecha}</p>
                        </div>
                        <div className="flex gap-4">
                          <Button 
                            onClick={() => onNavigate("mapa")}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            Ver en Mapa
                          </Button>
                          <Button 
                            onClick={() => deleteAcopio(punto.id)}
                            variant="destructive"
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Notificación de eliminación */}
      {showDeleteNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-semibold">Borrado exitosamente</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente de página Nosotros
function NosotrosPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const integrantes = [
    { nombre: "Perez Injante, Jhamir Antonio", rol: "Desarrollador Frontend", biografia: "Estudiante de Ingeniería de Sistemas especializado en desarrollo de interfaces de usuario", contacto: "jhamir.perez@unica.edu.pe" },
    { nombre: "Alviar Carhuayo, Manuel Jesus", rol: "Desarrollador Backend", biografia: "Estudiante de Ingeniería de Sistemas enfocado en desarrollo de APIs y bases de datos", contacto: "manuel.alviar@unica.edu.pe" },
    { nombre: "Curioso Hernandez, Jeremy Fabian", rol: "Analista de Sistemas", biografia: "Estudiante de Ingeniería de Sistemas especializado en análisis y diseño de sistemas", contacto: "jeremy.curioso@unica.edu.pe" },
    { nombre: "Navarrete Osis, Aldhair Alexis", rol: "Diseñador UX/UI", biografia: "Estudiante de Ingeniería de Sistemas enfocado en experiencia de usuario y diseño", contacto: "aldhair.navarrete@unica.edu.pe" },
    { nombre: "Ore Huillca, Johan Sebastian", rol: "Gestor de Proyecto", biografia: "Estudiante de Ingeniería de Sistemas especializado en gestión y coordinación de proyectos", contacto: "johan.ore@unica.edu.pe" },
  ]

  const docente = {
    nombre: "Ing. Erwin Peña Casas",
    rol: "Docente Asesor",
    biografia: "Ingeniero de Sistemas con amplia experiencia en desarrollo de software y gestión de proyectos tecnológicos",
    contacto: "erwin.pena@unica.edu.pe"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/20 backdrop-blur-lg border-b border-white/10 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold text-white">LimpIA Ica</span>
            </div>
            <div className="flex space-x-6">
              <button onClick={() => onNavigate("inicio")} className="text-white/70 hover:text-emerald-400 transition-colors">Inicio</button>
              <button onClick={() => onNavigate("mapa")} className="text-white/70 hover:text-emerald-400 transition-colors">Mapa</button>
              <button onClick={() => onNavigate("blog")} className="text-white/70 hover:text-emerald-400 transition-colors">Blog</button>
              <button className="text-emerald-400 font-semibold">Nosotros</button>
              <button onClick={() => onNavigate("contacto")} className="text-white/70 hover:text-emerald-400 transition-colors">Contacto</button>
            </div>
          </div>
        </nav>
      </header>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Nosotros
            </h1>
            <p className="text-xl text-white/70">Conoce al equipo y la visión detrás de LimpIA Ica</p>
          </div>

          {/* Misión y Visión */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-lg border border-emerald-500/30 rounded-3xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Nuestra Misión</h3>
              <p className="text-white/70 leading-relaxed">
                Una plataforma web desarrollada por estudiantes de Ingeniería de Sistemas para mejorar la gestión de
                residuos sólidos urbanos en Ica. Su objetivo es promover la participación ciudadana activa mediante
                una plataforma digital que permita reportar, monitorear y visibilizar el estado de los espacios
                públicos.
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 backdrop-blur-lg border border-cyan-500/30 rounded-3xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Nuestra Visión</h3>
              <p className="text-white/70 leading-relaxed">
                Ser la principal herramienta tecnológica de impacto social en Ica para empoderar a la comunidad y
                facilitar una gestión urbana más eficiente, transparente y colaborativa para el año 2030.
              </p>
            </div>
          </div>

          {/* Integrantes */}
          <div className="mb-20">
            <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Integrantes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {integrantes.map((integrante, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {integrante.nombre}
                  </h4>
                  <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-semibold mb-4">
                    {integrante.rol}
                  </div>
                  <p className="text-white/60 text-sm mb-6 leading-relaxed">{integrante.biografia}</p>
                  <a 
                    href={`mailto:${integrante.contacto}`} 
                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                  >
                    {integrante.contacto}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Docente */}
          <div className="mb-20">
            <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Docente
            </h3>
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-lg border border-yellow-500/30 rounded-2xl p-8 text-center hover:bg-yellow-500/15 transition-all duration-300 group">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-16 w-16 text-white" />
                </div>
                <h4 className="font-bold text-2xl text-white mb-2 group-hover:text-yellow-300 transition-colors">
                  {docente.nombre}
                </h4>
                <div className="inline-block px-4 py-2 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-yellow-300 text-sm font-semibold mb-6">
                  {docente.rol}
                </div>
                <p className="text-white/70 text-base mb-6 leading-relaxed">{docente.biografia}</p>
                <a 
                  href={`mailto:${docente.contacto}`} 
                  className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
                >
                  {docente.contacto}
                </a>
              </div>
            </div>
          </div>

          {/* Objetivos Estratégicos */}
          <div className="mb-20">
            <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Objetivos Estratégicos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-lg border border-emerald-500/30 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-xl flex items-center justify-center mr-4">
                    <span className="text-lg font-bold">1</span>
                  </div>
                  <h4 className="font-bold text-white text-lg">Participación Ciudadana</h4>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Fomentar la participación activa de los ciudadanos en la gestión de residuos sólidos urbanos.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl flex items-center justify-center mr-4">
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <h4 className="font-bold text-white text-lg">Transparencia</h4>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Proporcionar transparencia en la gestión municipal de residuos y espacios públicos.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-xl flex items-center justify-center mr-4">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <h4 className="font-bold text-white text-lg">Educación Ambiental</h4>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Educar a la comunidad sobre prácticas sostenibles y gestión responsable de residuos.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-lg border border-orange-500/30 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-xl flex items-center justify-center mr-4">
                    <span className="text-lg font-bold">4</span>
                  </div>
                  <h4 className="font-bold text-white text-lg">Tecnología Social</h4>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Utilizar la tecnología como herramienta de impacto social positivo en la comunidad.
                </p>
              </div>
            </div>
          </div>

          {/* Institución de Respaldo */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-lg border border-yellow-500/30 rounded-3xl p-12 text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">Institución de Respaldo</h3>
            <h4 className="text-2xl text-yellow-300 font-semibold mb-4">Universidad Nacional San Luis Gonzaga de Ica</h4>
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto">
              Este proyecto es desarrollado por estudiantes de la Facultad de Ingeniería de Sistemas como parte de su
              compromiso con el desarrollo sostenible y la responsabilidad social universitaria.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente de página de Contacto
function ContactoPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const faqs = [
    {
      pregunta: "¿Cómo puedo reportar un punto crítico de basura?",
      respuesta: "Puedes reportar un punto crítico navegando a la sección 'Mapa', seleccionando la pestaña 'Reportar Problema' y completando el formulario con la información requerida."
    },
    {
      pregunta: "¿Es gratuito usar la plataforma?",
      respuesta: "Sí, LimpIA Ica es completamente gratuita para todos los ciudadanos de Ica. Nuestro objetivo es promover la participación ciudadana en la gestión de residuos."
    },
    {
      pregunta: "¿Cómo puedo encontrar puntos de reciclaje cerca de mi ubicación?",
      respuesta: "En la sección 'Mapa', puedes ver todos los puntos de acopio marcados en azul. También puedes usar los filtros para mostrar solo los puntos de reciclaje."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/20 backdrop-blur-lg border-b border-white/10 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold text-white">LimpIA Ica</span>
            </div>
            <div className="flex space-x-6">
              <button onClick={() => onNavigate("inicio")} className="text-white/70 hover:text-emerald-400 transition-colors">Inicio</button>
              <button onClick={() => onNavigate("mapa")} className="text-white/70 hover:text-emerald-400 transition-colors">Mapa</button>
              <button onClick={() => onNavigate("blog")} className="text-white/70 hover:text-emerald-400 transition-colors">Blog</button>
              <button onClick={() => onNavigate("nosotros")} className="text-white/70 hover:text-emerald-400 transition-colors">Nosotros</button>
              <button className="text-emerald-400 font-semibold">Contacto</button>
            </div>
          </div>
        </nav>
      </header>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Contacto
            </h1>
            <p className="text-xl text-white/70">Estamos aquí para ayudarte y escuchar tus ideas</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Formulario de Contacto */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Envíanos tu Consulta</h3>
                <p className="text-white/70 mb-8">Completa el formulario y nos pondremos en contacto contigo</p>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 font-semibold mb-2">Nombre *</label>
                      <input
                        type="text"
                        placeholder="Tu nombre completo"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 font-semibold mb-2">Email *</label>
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 font-semibold mb-2">Teléfono</label>
                    <input
                      type="text"
                      placeholder="+51 xxx xxx xxx"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 font-semibold mb-2">Asunto *</label>
                    <input
                      type="text"
                      placeholder="Asunto de tu consulta"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 font-semibold mb-2">Mensaje *</label>
                    <textarea
                      placeholder="Describe tu consulta..."
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all resize-none"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id="terminos" className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                      <label htmlFor="terminos" className="text-white/80 text-sm">
                        Acepto los términos y condiciones *
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id="newsletter" className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
                      <label htmlFor="newsletter" className="text-white/80 text-sm">
                        Suscribirme al newsletter
                      </label>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 text-lg font-semibold">
                    <Mail className="mr-2 h-5 w-5" />
                    Enviar Consulta
                  </Button>
                </div>
              </div>
            </div>

            {/* Panel Lateral */}
            <div className="space-y-6">
              {/* Información de Contacto */}
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-lg border border-emerald-500/30 rounded-2xl p-6">
                <h4 className="font-bold text-white text-lg mb-6">Información de Contacto</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-emerald-400" />
                    <a href="mailto:contacto@limpiaica.pe" className="text-emerald-300 hover:text-emerald-200 transition-colors">
                      contacto@limpiaica.pe
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-emerald-400" />
                    <a href="tel:+51956123456" className="text-emerald-300 hover:text-emerald-200 transition-colors">
                      +51 956 123 456
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-emerald-400" />
                    <span className="text-white/80">Universidad Nacional San Luis Gonzaga de Ica</span>
                  </div>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6">
                <h4 className="font-bold text-white text-lg mb-6">Síguenos</h4>
                <div className="flex space-x-4">
                  <button className="w-12 h-12 bg-blue-500/20 border border-blue-400/30 rounded-xl flex items-center justify-center text-blue-300 hover:bg-blue-500/30 hover:text-blue-200 transition-all">
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button className="w-12 h-12 bg-blue-500/20 border border-blue-400/30 rounded-xl flex items-center justify-center text-blue-300 hover:bg-blue-500/30 hover:text-blue-200 transition-all">
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button className="w-12 h-12 bg-blue-500/20 border border-blue-400/30 rounded-xl flex items-center justify-center text-blue-300 hover:bg-blue-500/30 hover:text-blue-200 transition-all">
                    <Instagram className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Preguntas Frecuentes
            </h3>
            <div className="mb-8">
              <input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
              />
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
                  <button className="w-full px-6 py-4 text-left text-white font-semibold hover:bg-white/10 transition-colors">
                    {faq.pregunta}
                  </button>
                  <div className="px-6 pb-4 text-white/70">
                    {faq.respuesta}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Llamada a la Acción Final */}
          <div className="mt-20 text-center">
            <h3 className="text-3xl font-bold mb-4 text-white">¿Listo para hacer la diferencia?</h3>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Únete a nuestra comunidad y ayuda a crear una Ica más limpia y sostenible
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold"
                onClick={() => onNavigate("mapa")}
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                Reportar Problema
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent backdrop-blur-sm px-8 py-4 text-lg font-semibold"
                onClick={() => onNavigate("blog")}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Explorar Blog
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
