"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

interface Trabajador {
  nombre: string
  rol: string
  sueldo: number
  meses: number
  anticipoAsignado?: number
  anticipoPorMes?: number
  esEmpresa?: boolean
  porcentaje?: number
}

interface Fase {
  nombre: string
  meses: number
}

function formatNumber(num: number): string {
  return num.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CotizadorSoftware() {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([
    { nombre: "Empresa", rol: "Empresa", sueldo: 0, meses: 18, anticipoAsignado: 0, anticipoPorMes: 0, esEmpresa: true, porcentaje: 15 },
    { nombre: "Bernardo Galvan", rol: "Diseñador UI/UX", sueldo: 0, meses: 0, anticipoAsignado: 0, anticipoPorMes: 0 },
    { nombre: "Andres Buitrago", rol: "Arquitecto Cloud", sueldo: 0, meses: 0, anticipoAsignado: 0, anticipoPorMes: 0 },
    { nombre: "Jesus Altamiranda", rol: "Desarrollador Backend", sueldo: 0, meses: 0, anticipoAsignado: 0, anticipoPorMes: 0 },
    { nombre: "Carlos Guerrero", rol: "Desarrollador Backend", sueldo: 0, meses: 0, anticipoAsignado: 0, anticipoPorMes: 0 },
    { nombre: "Javier Alvarez", rol: "Gerente Comercial", sueldo: 0, meses: 0, anticipoAsignado: 0, anticipoPorMes: 0 },
    { nombre: "Eduard Martinez", rol: "Desarrollador Frontend/Data Analyst", sueldo: 0, meses: 0, anticipoAsignado: 0, anticipoPorMes: 0 }
  ])

  const [fases, setFases] = useState<Fase[]>([
    { nombre: "MVP", meses: 0 },
    { nombre: "2 fase", meses: 0 },
    { nombre: "3 fase", meses: 0 },
    { nombre: "4 fase", meses: 0 }
  ])

  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [nombre, setNombre] = useState('')
  const [rol, setRol] = useState('')
  const [sueldo, setSueldo] = useState('')
  const [meses, setMeses] = useState('')
  const [porcentajeEmpresa, setPorcentajeEmpresa] = useState('15')
  const [porcentajeIVA, setPorcentajeIVA] = useState('19')
  const [porcentajeRetefuente, setPorcentajeRetefuente] = useState('1.5')
  const [porcentajeAnticipo, setPorcentajeAnticipo] = useState('50')
  const [porcentajePSM, setPorcentajePSM] = useState('0')
  const [valorTotalProyecto, setValorTotalProyecto] = useState(334800000)
  const [precioFinalProyecto, setPrecioFinalProyecto] = useState(0)
  const [anticipoTotal, setAnticipoTotal] = useState(0)
  const [mesesGlobal, setMesesGlobal] = useState('')
  const [sueldoGlobal, setSueldoGlobal] = useState('')
  const [nuevaFase, setNuevaFase] = useState<Fase>({ nombre: '', meses: 0 })

  useEffect(() => {
    const totalSueldos = trabajadores.filter(t => !t.esEmpresa).reduce((sum, t) => sum + t.sueldo * t.meses, 0)
    const porcentajeEmpresaTotal = totalSueldos * (parseFloat(porcentajeEmpresa) / 100);
    const porcentajePSMTotal = totalSueldos * (parseFloat(porcentajePSM) / 100);
    const nuevoValorTotalProyecto = totalSueldos + porcentajeEmpresaTotal + porcentajePSMTotal;
    setValorTotalProyecto(nuevoValorTotalProyecto)

    const iva = nuevoValorTotalProyecto * (parseFloat(porcentajeIVA) / 100)
    const retefuente = nuevoValorTotalProyecto * (parseFloat(porcentajeRetefuente) / 100)
    const nuevoAnticipoTotal = nuevoValorTotalProyecto * (parseFloat(porcentajeAnticipo) / 100)
    setAnticipoTotal(nuevoAnticipoTotal)

    const nuevoPrecioFinal = nuevoValorTotalProyecto + iva - retefuente - nuevoAnticipoTotal
    setPrecioFinalProyecto(nuevoPrecioFinal)

    const anticipoEmpresa = nuevoAnticipoTotal * (parseFloat(porcentajeEmpresa) / 100)
    const anticipoTrabajadores = nuevoAnticipoTotal - anticipoEmpresa

    const trabajadoresActualizados = trabajadores.map(t => {
      if (t.esEmpresa) {
        return {
          ...t,
          sueldo: nuevoValorTotalProyecto * (parseFloat(porcentajeEmpresa) / 100) / t.meses,
          anticipoAsignado: anticipoEmpresa,
          anticipoPorMes: parseFloat(porcentajeAnticipo) === 100 ? 0 : anticipoEmpresa / t.meses
        }
      } else {
        const anticipoAsignado = (t.sueldo * t.meses / totalSueldos) * anticipoTrabajadores
        const sueldoRestante = t.sueldo * t.meses - anticipoAsignado
        return {
          ...t,
          anticipoAsignado,
          anticipoPorMes: parseFloat(porcentajeAnticipo) === 100 ? 0 : sueldoRestante / parseInt(mesesGlobal)
        }
      }
    })

    if (JSON.stringify(trabajadoresActualizados) !== JSON.stringify(trabajadores)) {
      setTrabajadores(trabajadoresActualizados)
    }
  }, [porcentajeEmpresa, porcentajeIVA, porcentajeRetefuente, porcentajeAnticipo, porcentajePSM, trabajadores, mesesGlobal])

  const totalMesesProyecto = fases.reduce((sum, fase) => sum + fase.meses, 0)

  const editarTrabajador = (index: number) => {
    const trabajador = trabajadores[index]
    setNombre(trabajador.nombre)
    setRol(trabajador.rol)
    setSueldo(formatNumber(trabajador.sueldo))
    setMeses(trabajador.meses.toString())
    setEditingIndex(index)
  }
  const eliminarTrabajador = (index: number) => {
    const nuevosTrabajadores = trabajadores.filter((_, i) => i !== index)
    setTrabajadores(nuevosTrabajadores)
  }

  const agregarTrabajador = () => {
    if (nombre && rol && sueldo && meses) {
      const nuevoTrabajador = { 
        nombre, 
        rol,
        sueldo: parseFloat(sueldo.replace(/\./g, '').replace(',', '.')), 
        meses: parseInt(meses),
        anticipoAsignado: 0,
        anticipoPorMes: 0
      }
      if (editingIndex !== null) {
        const nuevosTrabajadores = [...trabajadores]
        nuevosTrabajadores[editingIndex] = nuevoTrabajador
        setTrabajadores(nuevosTrabajadores)
        setEditingIndex(null)
      } else {
        setTrabajadores([...trabajadores, nuevoTrabajador])
      }
      setNombre('')
      setRol('')
      setSueldo('')
      setMeses('18')
    }
  }

  const editarFase = (index: number, campo: keyof Fase, valor: string) => {
    const nuevasFases = [...fases]
    const nuevoValor = campo === 'nombre' ? valor : parseInt(valor)
    
    if (campo === 'meses') {
      const totalMesesActual = fases.reduce((sum, f, i) => i !== index ? sum + f.meses : sum, 0)
      const mesesDisponibles = parseInt(mesesGlobal) - totalMesesActual
      if (typeof nuevoValor === 'number' && nuevoValor > mesesDisponibles) {
        alert(`No puedes asignar más de ${mesesDisponibles} meses a esta fase.`)
        return
      }
    }

    nuevasFases[index] = {
      ...nuevasFases[index],
      [campo]: nuevoValor
    }
    setFases(nuevasFases)
  }

  const eliminarFase = (index: number) => {
    const nuevasFases = fases.filter((_, i) => i !== index)
    setFases(nuevasFases)
  }

  const aplicarCambiosGlobales = () => {
    const nuevosMeses = parseInt(mesesGlobal)
    const nuevoSueldo = parseFloat(sueldoGlobal.replace(/\./g, '').replace(',', '.'))
    
    if (!isNaN(nuevosMeses) && !isNaN(nuevoSueldo)) {
      const trabajadoresActualizados = trabajadores.map(t => 
        t.esEmpresa ? t : { ...t, meses: nuevosMeses, sueldo: nuevoSueldo }
      )
      setTrabajadores(trabajadoresActualizados)
    }
  }

  const agregarFase = () => {
    if (nuevaFase.nombre && nuevaFase.meses > 0) {
      setFases([...fases, nuevaFase])
      setNuevaFase({ nombre: '', meses: 0 })
    }
  }

  const empresa = trabajadores.find(t => t.esEmpresa)

  return (
    <Card className="w-full max-w-7xl mx-auto bg-[#282525]">
      <CardHeader className="border-b border-[#A5A5AC]/20 bg-black">
        <CardTitle className="text-[#F2F2F2] text-2xl">Cotizador de Software</CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-[#F2F2F2]">
        <div className="space-y-6">
          <div className="bg-[#FE4D01] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4 text-[#F2F2F2]">Información de la Empresa</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#F2F2F2]">Porcentaje de la empresa</Label>
                <div className="text-2xl font-bold">{porcentajeEmpresa}%</div>
              </div>
              <div>
                <Label className="text-[#F2F2F2]">Meses del proyecto</Label>
                <div className="text-2xl font-bold">{mesesGlobal}</div>
              </div>
              <div>
                <Label className="text-[#F2F2F2]">Anticipo Total</Label>
                <div className="text-2xl font-bold">${formatNumber(empresa?.anticipoAsignado || 0)}</div>
              </div>
              <div>
                <Label className="text-[#F2F2F2]">Anticipo por Mes</Label>
                <div className="text-2xl font-bold">${formatNumber(empresa?.anticipoPorMes || 0)}</div>
              </div>
              <div>
                <Label className="text-[#F2F2F2]">Ganancia Total de la Empresa</Label>
                <div className="text-2xl font-bold">${formatNumber((empresa?.sueldo ?? 0) * (empresa?.meses ?? 0))}</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-black/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Integrantes del equipo</h3>
            <div className="bg-black/30 rounded-lg overflow-hidden">
              <Table >
                <TableHeader>
                  <TableRow className="hover:bg-[#A5A5AC]/10">
                    <TableHead className="text-[#F2F2F2]">Nombre</TableHead>
                    <TableHead className="text-[#F2F2F2]">Rol</TableHead>
                    <TableHead className="text-[#F2F2F2]">Salario</TableHead>
                    <TableHead className="text-[#F2F2F2]">Meses</TableHead>
                    <TableHead className="text-[#F2F2F2]">Total</TableHead>
                    <TableHead className="text-[#F2F2F2]">Anticipo Total</TableHead>
                    <TableHead className="text-[#F2F2F2]">Anticipo por Mes</TableHead>
                    <TableHead className="text-[#F2F2F2]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trabajadores.filter(t => !t.esEmpresa).map((t, index) => (
                    <TableRow key={index} className="hover:bg-[#A5A5AC]/10">
                      <TableCell className="text-[#F2F2F2]">{t.nombre}</TableCell>
                      <TableCell className="text-[#F2F2F2]">{t.rol}</TableCell>
                      <TableCell className="text-[#F2F2F2]">${formatNumber(t.sueldo)}</TableCell>
                      <TableCell className="text-[#F2F2F2]">{t.meses}</TableCell>
                      <TableCell className="text-[#F2F2F2]">${formatNumber(t.sueldo * t.meses)}</TableCell>
                      <TableCell className="text-[#F2F2F2]">${formatNumber(t.anticipoAsignado || 0)}</TableCell>
                      <TableCell className="text-[#F2F2F2]">${formatNumber(t.anticipoPorMes || 0)}</TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => editarTrabajador(index + 1)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 hover:bg-[#FF4B00]/10"
                        >
                          <Pencil className="h-4 w-4 text-[#FF4B00]" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="space-y-6 xl:col-span-1 bg-black/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Agregar Trabajador</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nombre">Nombre del trabajador</Label>
                  <Input 
                    id="nombre" 
                    value={nombre} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                    className="bg-[#F2F2F2] text-black mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="rol">Rol</Label>
                  <Input 
                    id="rol" 
                    value={rol} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRol(e.target.value)}
                    className="bg-[#F2F2F2] text-black mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="sueldo">Sueldo mensual</Label>
                  <Input 
                    id="sueldo" 
                    value={sueldo} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value.replace(/\D/g, '')
                      if (value === '' || /^\d+$/.test(value)) {
                        const formattedValue = new Intl.NumberFormat('es-ES').format(parseInt(value))
                        setSueldo(formattedValue)
                      }
                    }}
                    className="bg-[#F2F2F2] text-black mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="meses">Meses de trabajo</Label>
                  <Input 
                    id="meses" 
                    value={meses} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value.replace(/\D/g, '')
                      if (value === '' || /^\d+$/.test(value)) {
                        setMeses(value)
                      }
                    }}
                    className="bg-[#F2F2F2] text-black mt-2"
                  />
                </div>
                <Button 
                  onClick={agregarTrabajador}
                  className="w-full bg-[#FF4B00] hover:bg-[#FF4B00]/90 text-white"
                >
                  {editingIndex !== null ? 'Actualizar Trabajador' : 'Agregar Trabajador'}
                </Button>
              </div>

              <Separator className="my-6 bg-[#A5A5AC]/20" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cambios Globales</h3>
                <div>
                  <Label htmlFor="mesesGlobal">Meses de trabajo (Global)</Label>
                  <Input
                    id="mesesGlobal"
                    value={mesesGlobal}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      if (value === '' || /^\d+$/.test(value)) {
                        setMesesGlobal(value)
                      }
                    }}
                    className="bg-[#F2F2F2] text-black mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="sueldoGlobal">Sueldo mensual (Global)</Label>
                  <Input
                    id="sueldoGlobal"
                    value={sueldoGlobal}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      if (value === '' || /^\d+$/.test(value)) {
                        const formattedValue = new Intl.NumberFormat('es-ES').format(parseInt(value))
                        setSueldoGlobal(formattedValue)
                      }
                    }}
                    className="bg-[#F2F2F2] text-black mt-2"
                  />
                </div>
                <Button 
                  onClick={aplicarCambiosGlobales}
                  className="w-full bg-[#A5A5AC] hover:bg-[#A5A5AC]/90 text-black"
                >
                  Aplicar Cambios Globales
                </Button>
              </div>
            </div>

            <div className="space-y-6 xl:col-span-1 bg-black/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Configuración del Proyecto</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="porcentajeEmpresa">Porcentaje de la empresa (%)</Label>
                  <Input
                    id="porcentajeEmpresa"
                    value={porcentajeEmpresa}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d.]/g, '')
                      if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        setPorcentajeEmpresa(value)
                      }
                    }}
                    className="bg-[#F2F2F2] text-black mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="porcentajeIVA">Porcentaje de IVA (%)</Label>
                  <Input
                    id="porcentajeIVA"
                    value={porcentajeIVA}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d.]/g, '')
                      if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        setPorcentajeIVA(value)
                      }
                    }}
                    className="bg-[#F2F2F2] text-black mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="porcentajeRetefuente">Porcentaje de Retefuente (%)</Label>
                  <Input
                    id="porcentajeRetefuente"
                    value={porcentajeRetefuente}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d.]/g, '')
                      if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        setPorcentajeRetefuente(value)
                      }
                    }}
                    className="bg-[#F2F2F2] text-black mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="porcentajeAnticipo">Porcentaje de Anticipo (%)</Label>
                  <Input
                    id="porcentajeAnticipo"
                    value={porcentajeAnticipo}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d.]/g, '')
                      if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        setPorcentajeAnticipo(value)
                      }
                    }}
                    className="bg-[#F2F2F2] text-black mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="porcentajePSM">Porcentaje PSM (%)</Label>
                  <Input
                    id="porcentajePSM"
                    value={porcentajePSM}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d.]/g, '')
                      if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        setPorcentajePSM(value)
                      }
                    }}
                    className="bg-[#F2F2F2] text-black mt-2"
                  />
                </div>
              </div>

              <Separator className="my-6 bg-[#A5A5AC]/20" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Fases del Proyecto</h3>
                <div className="bg-black/30 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-[#A333A5AC]/10">
                        <TableHead className="text-[#F2F2F2]">Fase</TableHead>
                        <TableHead className="text-[#F2F2F2]">Meses</TableHead>
                        <TableHead className="text-[#F2F2F2]">Valor</TableHead>
                        <TableHead className="text-[#F2F2F2]">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fases.map((fase, index) => (
                        <TableRow key={index} className="hover:bg-[#A5A5AC]/10">
                          <TableCell className="text-[#F2F2F2]">{fase.nombre}</TableCell>
                          <TableCell>
                            <Input
                              type="text"
                              value={fase.meses}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => editarFase(index, 'meses', e.target.value.replace(/[^\d]/g, ''))}
                              className="bg-[#F2F2F2] text-black w-20"
                            />
                          </TableCell>
                          <TableCell className="text-[#F2F2F2]">
                            ${formatNumber((fase.meses / totalMesesProyecto) * valorTotalProyecto)}
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => eliminarFase(index)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 hover:bg-red-500/10"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Nombre de la fase"
                    value={nuevaFase.nombre}
                    onChange={(e) => setNuevaFase({ ...nuevaFase, nombre: e.target.value })}
                    className="bg-[#F2F2F2] text-black"
                  />
                  <Input
                    type="number"
                    placeholder="Meses"
                    value={nuevaFase.meses || ''}
                    onChange={(e) => setNuevaFase({ ...nuevaFase, meses: parseInt(e.target.value) || 0 })}
                    className="bg-[#F2F2F2] text-black w-24"
                  />
                  <Button onClick={agregarFase} className="bg-[#FF4B00] hover:bg-[#FF4B00]/90 text-white">
                    Agregar Fase
                  </Button>
                </div>
                <div className="mt-2 text-[#A5A5AC]">
                  Meses restantes: {parseInt(mesesGlobal) - fases.reduce((sum, fase) => sum + fase.meses, 0)}
                </div>
              </div>
            </div>

            <div className="space-y-6 xl:col-span-1 bg-black/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Resumen Financiero</h3>
              <div className="space-y-4 bg-black/30 p-4 rounded-lg">
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-[#A5A5AC]">Valor sin Utilidad:</Label>
                  <span className="text-[#F2F2F2]">${formatNumber(valorTotalProyecto / (1 + parseFloat(porcentajeEmpresa) / 100))}</span>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-[#A5A5AC]">Valor con Utilidad:</Label>
                  <span className="text-[#F2F2F2]">${formatNumber(valorTotalProyecto)}</span>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-[#A5A5AC]">Valor con PSM:</Label>
                  <span className="text-[#F2F2F2]">${formatNumber(valorTotalProyecto * (1 + parseFloat(porcentajePSM) / 100))}</span>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-[#A5A5AC]">Valor con IVA:</Label>
                  <span className="text-[#F2F2F2]">${formatNumber(valorTotalProyecto * (1 + parseFloat(porcentajePSM) / 100) * (1 + parseFloat(porcentajeIVA) / 100))}</span>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-[#A5A5AC]">Valor con Retefuente:</Label>
                  <span className="text-[#F2F2F2]">${formatNumber(valorTotalProyecto * (1 + parseFloat(porcentajePSM) / 100) * (1 + parseFloat(porcentajeIVA) / 100) * (1 + parseFloat(porcentajeRetefuente) / 100))}</span>
                </div>
                <Separator className="my-2 bg-[#A5A5AC]/20" />
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-[#A5A5AC]">IVA ({porcentajeIVA}%):</Label>
                  <span className="text-[#F2F2F2]">${formatNumber(valorTotalProyecto * (1 + parseFloat(porcentajePSM) / 100) * (parseFloat(porcentajeIVA) / 100))}</span>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-[#A5A5AC]">Retefuente ({porcentajeRetefuente}%):</Label>
                  <span className="text-[#F2F2F2]">${formatNumber(valorTotalProyecto * (1 + parseFloat(porcentajePSM) / 100) * (parseFloat(porcentajeRetefuente) / 100))}</span>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-[#A5A5AC]">Anticipo Total ({porcentajeAnticipo}%):</Label>
                  <span className="text-[#F2F2F2]">${formatNumber(anticipoTotal)}</span>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-[#A5A5AC]">PSM ({porcentajePSM}%):</Label>
                  <span className="text-[#F2F2F2]">${formatNumber(valorTotalProyecto * (parseFloat(porcentajePSM) / 100))}</span>
                </div>
                <Separator className="my-2 bg-[#A5A5AC]/20" />
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-xl font-bold text-[#FF4B00]">Valor Restante:</Label>
                  <span className="text-xl font-bold text-[#FF4B00]">${formatNumber(precioFinalProyecto)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

