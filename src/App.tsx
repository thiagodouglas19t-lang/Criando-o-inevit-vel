import { Shield, Terminal, Tv, Wifi, Copy, CheckCircle2 } from 'lucide-react'
import { useMemo, useState } from 'react'

const lessons = [
  {
    title: '1. Descobrir o IP da TV',
    text: 'Na TV: Configurações > Rede > Wi-Fi. Copie o IP, exemplo: 192.168.0.15.',
  },
  {
    title: '2. Ativar modo desenvolvedor',
    text: 'Em Android TV/Google TV, ative opções de desenvolvedor e depuração pela rede. Só faça isso na sua TV.',
  },
  {
    title: '3. Conectar com ADB',
    text: 'O Termux no celular envia comandos para a TV na mesma rede. A TV vai pedir autorização.',
  },
]

function makeCommands(ip: string, message: string, imageUrl: string) {
  const safeIp = ip.trim() || '192.168.0.15'
  const safeMessage = message.trim().replaceAll(' ', '%s') || 'Salve%sTV'
  const safeImage = imageUrl.trim() || 'https://example.com/imagem.jpg'

  return [
    `pkg update && pkg install android-tools -y`,
    `adb connect ${safeIp}:5555`,
    `adb devices`,
    `adb shell input text "${safeMessage}"`,
    `adb shell input keyevent 66`,
    `adb shell am start -a android.intent.action.VIEW -d "${safeImage}"`,
    `adb disconnect ${safeIp}:5555`,
  ]
}

export default function App() {
  const [ip, setIp] = useState('192.168.0.15')
  const [message, setMessage] = useState('Salve da THKLAYUS')
  const [imageUrl, setImageUrl] = useState('')
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
          <h1 className="mt-3 text-4xl font-black md:text-6xl">Painel de programação segura</h1>
          <p className="mt-4 max-w-2xl text-zinc-300">Estudo real: celular + Termux + ADB + sua TV na mesma rede. Nada de invadir terceiros; aqui é laboratório defensivo e controle autorizado.</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card icon={<Terminal />} title="Programação real" text="Você vai aprender comandos, scripts, IP, terminal e automação." />
          <Card icon={<Tv />} title="TV local" text="Conexão permitida com Android TV/Google TV via ADB." />
          <Card icon={<Shield />} title="Hacker do bem" text="Testar o que é seu, entender riscos e corrigir rápido." />
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="flex items-center gap-2 text-2xl font-bold"><Wifi className="text-purple-300" /> Dados da sua TV</h2>
            <label className="mt-5 block text-sm text-zinc-400">IP da TV</label>
            <input value={ip} onChange={(e) => setIp(e.target.value)} className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black p-4 outline-none focus:border-purple-500" />

            <label className="mt-5 block text-sm text-zinc-400">Mensagem para testar</label>
            <input value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black p-4 outline-none focus:border-purple-500" />

            <label className="mt-5 block text-sm text-zinc-400">Link de imagem pública</label>
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://.../imagem.jpg" className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black p-4 outline-none focus:border-purple-500" />

            <div className="mt-5 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-100">
              O navegador não executa ADB sozinho. Você copia os comandos e cola no Termux. Isso é mais seguro e evita abuso.
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-bold">Comandos para Termux</h2>
            <div className="mt-4 space-y-3">
              {commands.map((cmd) => (
                <div key={cmd} className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-black p-3">
                  <code className="flex-1 overflow-x-auto text-sm text-purple-100">{cmd}</code>
                  <button onClick={() => copy(cmd)} className="rounded-xl bg-purple-600 p-3 hover:bg-purple-500" aria-label="copiar comando">
                    {copied === cmd ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
          <h2 className="text-2xl font-bold">Trilha de estudo</h2>
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
