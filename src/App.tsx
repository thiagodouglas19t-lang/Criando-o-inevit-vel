import { Shield, Terminal, Tv, Wifi, Copy, CheckCircle2 } from 'lucide-react'
import { useMemo, useState } from 'react'

const lessons = [
  {
    title: '1. Conexão autorizada',
    text: 'Você conecta no seu próprio dispositivo. A TV precisa pedir autorização antes de aceitar comandos.',
  },
  {
    title: '2. Comandos reais',
    text: 'ADB permite abrir links, apps, enviar texto, pressionar botões e automatizar testes no Android TV.',
  },
  {
    title: '3. Defesa dos seus dados',
    text: 'Aprender comando e conexão te ajuda a entender permissões, portas, rede local e como evitar acesso indevido.',
  },
]

function encodeAdbText(value: string) {
  return (value.trim() || 'Salve da THKLAYUS').replaceAll(' ', '%s')
}

function makeCommands(ip: string, message: string, imageUrl: string) {
  const safeIp = ip.trim() || '192.168.0.15'
  const safeMessage = encodeAdbText(message)
  const safeImage = imageUrl.trim() || 'https://example.com/minha-imagem.jpg'

  return [
    {
      title: 'Preparar Termux',
      cmd: 'pkg update && pkg install android-tools -y',
    },
    {
      title: 'Conectar na TV',
      cmd: `adb connect ${safeIp}:5555`,
    },
    {
      title: 'Ver dispositivos conectados',
      cmd: 'adb devices',
    },
    {
      title: 'Enviar texto de teste',
      cmd: `adb shell input text "${safeMessage}"`,
    },
    {
      title: 'Apertar Enter/OK',
      cmd: 'adb shell input keyevent 66',
    },
    {
      title: 'Abrir imagem de exemplo na TV',
      cmd: `adb shell am start -a android.intent.action.VIEW -d "${safeImage}"`,
    },
    {
      title: 'Desconectar com segurança',
      cmd: `adb disconnect ${safeIp}:5555`,
    },
  ]
}

export default function App() {
  const [ip, setIp] = useState('192.168.0.15')
  const [message, setMessage] = useState('Salve da THKLAYUS')
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1518779578993-ec3579fee39f')
  const [copied, setCopied] = useState('')

  const commands = useMemo(() => makeCommands(ip, message, imageUrl), [ip, message, imageUrl])

  async function copy(text: string) {
    await navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(''), 1200)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="rounded-[32px] border border-purple-500/30 bg-gradient-to-br from-purple-950/40 to-black p-6 shadow-2xl shadow-purple-950/30">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-purple-300">THKLAYUS LAB</p>
          <h1 className="mt-3 text-4xl font-black md:text-6xl">Painel hacker de estudo</h1>
          <p className="mt-4 max-w-2xl text-zinc-300">Aprenda conexão, comando, automação e segurança usando seus próprios dispositivos. O foco é entender como funciona para proteger seus dados e controlar sua TV com permissão.</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card icon={<Terminal />} title="Comandos reais" text="ADB, Termux, shell, keyevent, intent e automação básica." />
          <Card icon={<Tv />} title="TV autorizada" text="Conecta na sua Android TV/Google TV pela rede local." />
          <Card icon={<Shield />} title="Segurança defensiva" text="Aprender acesso permitido para entender permissões e proteger o que é seu." />
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="flex items-center gap-2 text-2xl font-bold"><Wifi className="text-purple-300" /> Laboratório local</h2>

            <label className="mt-5 block text-sm text-zinc-400">IP da sua TV</label>
            <input value={ip} onChange={(e) => setIp(e.target.value)} className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black p-4 outline-none focus:border-purple-500" />

            <label className="mt-5 block text-sm text-zinc-400">Texto de teste</label>
            <input value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black p-4 outline-none focus:border-purple-500" />

            <label className="mt-5 block text-sm text-zinc-400">Imagem de exemplo</label>
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black p-4 outline-none focus:border-purple-500" />

            <div className="mt-5 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-100">
              Regra do lab: use só na sua TV, no seu Wi‑Fi, com autorização na tela. Isso é estudo de controle e defesa, não roubo de dados.
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-bold">Comandos para copiar no Termux</h2>
            <div className="mt-4 space-y-3">
              {commands.map((item) => (
                <div key={item.title} className="rounded-2xl border border-zinc-800 bg-black p-3">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-purple-300">{item.title}</div>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 overflow-x-auto text-sm text-purple-100">{item.cmd}</code>
                    <button onClick={() => copy(item.cmd)} className="rounded-xl bg-purple-600 p-3 hover:bg-purple-500" aria-label="copiar comando">
                      {copied === item.cmd ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
          <h2 className="text-2xl font-bold">O que você está aprendendo</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {lessons.map((lesson) => (
              <div key={lesson.title} className="rounded-2xl border border-zinc-800 bg-black p-4">
                <h3 className="font-bold text-purple-200">{lesson.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{lesson.text}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

function Card({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="text-purple-300">{icon}</div>
      <h2 className="mt-3 text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-zinc-400">{text}</p>
    </div>
  )
}
