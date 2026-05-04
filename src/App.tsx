import { BookOpen, CheckCircle2, Copy, Lightbulb, Lock, Network, Play, Terminal, Tv, Wifi } from 'lucide-react'
import { useMemo, useState } from 'react'

type Lesson = {
  id: string
  title: string
  level: string
  why: string
  learn: string
  mission: string
  command: string
  breakdown: { part: string; means: string }[]
  expected: string
  question: string
}

const lessons: Lesson[] = [
  {
    id: 'termux-01',
    title: 'Primeiro contato com o terminal',
    level: 'Base real',
    why: 'Antes de controlar TV ou rede, você precisa entender que terminal é conversa direta com o sistema.',
    learn: 'Você vai aprender prompt, comando, saída e erro.',
    mission: 'Abra o Termux, digite o comando, observe a resposta e escreva com suas palavras o que apareceu.',
    command: 'pwd',
    breakdown: [
      { part: 'pwd', means: 'print working directory: mostra em qual pasta você está agora.' },
    ],
    expected: 'Deve aparecer um caminho parecido com /data/data/com.termux/files/home.',
    question: 'O que o comando pwd mostrou no seu celular?',
  },
  {
    id: 'termux-02',
    title: 'Listar arquivos sem medo',
    level: 'Base real',
    why: 'Todo dev precisa navegar por pastas antes de rodar scripts e ferramentas.',
    learn: 'Você vai entender listagem de arquivos e opções de comando.',
    mission: 'Rode o comando e veja se aparecem pastas/arquivos. Depois teste também só ls.',
    command: 'ls -la',
    breakdown: [
      { part: 'ls', means: 'lista arquivos da pasta atual.' },
      { part: '-l', means: 'mostra em formato detalhado.' },
      { part: '-a', means: 'mostra arquivos ocultos também.' },
    ],
    expected: 'Deve aparecer uma lista. Arquivos começando com ponto são ocultos.',
    question: 'Qual diferença você viu entre ls e ls -la?',
  },
  {
    id: 'termux-03',
    title: 'Atualizar pacotes do Termux',
    level: 'Ferramentas',
    why: 'Ferramentas antigas quebram. Atualizar é manutenção básica de dev.',
    learn: 'Você vai entender gerenciador de pacotes e instalação segura.',
    mission: 'Rode o comando, leia se ele pede confirmação e veja se finaliza sem erro.',
    command: 'pkg update',
    breakdown: [
      { part: 'pkg', means: 'gerenciador de pacotes do Termux.' },
      { part: 'update', means: 'atualiza a lista de versões disponíveis.' },
    ],
    expected: 'Pode baixar listas e pedir confirmação. Erro comum: internet ruim ou repositório instável.',
    question: 'O comando terminou normal ou apareceu erro? Qual?',
  },
  {
    id: 'adb-01',
    title: 'Instalar ADB',
    level: 'TV autorizada',
    why: 'ADB é a ponte oficial de desenvolvedor para conversar com Android/Android TV.',
    learn: 'Você vai instalar uma ferramenta real, usada por devs.',
    mission: 'Instale android-tools e depois rode adb version para confirmar.',
    command: 'pkg install android-tools -y && adb version',
    breakdown: [
      { part: 'pkg install', means: 'instala um pacote.' },
      { part: 'android-tools', means: 'pacote que contém o adb.' },
      { part: '-y', means: 'responde sim automaticamente para instalar.' },
      { part: '&&', means: 'só roda o próximo comando se o anterior der certo.' },
      { part: 'adb version', means: 'mostra a versão instalada do ADB.' },
    ],
    expected: 'Deve aparecer Android Debug Bridge version.',
    question: 'Qual versão do ADB apareceu?',
  },
  {
    id: 'rede-01',
    title: 'Entender IP da TV',
    level: 'Rede local',
    why: 'Sem endereço certo, seu celular não sabe para onde mandar o comando.',
    learn: 'Você vai entender IP, rede local e porta.',
    mission: 'Pegue o IP da sua TV nas configurações de rede e coloque no gerador abaixo.',
    command: 'adb connect 192.168.0.15:5555',
    breakdown: [
      { part: 'adb connect', means: 'pede conexão com um dispositivo Android autorizado.' },
      { part: '192.168.0.15', means: 'IP de exemplo da TV. Você troca pelo IP real.' },
      { part: ':5555', means: 'porta usada pelo ADB via Wi‑Fi.' },
    ],
    expected: 'A TV pode pedir autorização. Aceite só se for seu celular.',
    question: 'Qual é o IP da sua TV?',
  },
  {
    id: 'tv-01',
    title: 'Abrir imagem na TV',
    level: 'Automação',
    why: 'Aqui você junta rede + ADB + intenção do Android para abrir algo na tela.',
    learn: 'Você vai entender intent: um pedido para o Android abrir uma ação.',
    mission: 'Use um link de imagem pública e execute o comando gerado. Observe qual app da TV abre.',
    command: 'adb shell am start -a android.intent.action.VIEW -d "https://example.com/imagem.jpg"',
    breakdown: [
      { part: 'adb shell', means: 'manda um comando para o sistema da TV.' },
      { part: 'am start', means: 'Activity Manager: inicia uma ação/app.' },
      { part: '-a android.intent.action.VIEW', means: 'ação de visualizar algo.' },
      { part: '-d URL', means: 'dados que serão abertos, aqui o link da imagem.' },
    ],
    expected: 'A TV tenta abrir a imagem com navegador, galeria ou app compatível.',
    question: 'A TV abriu a imagem? Qual app apareceu?',
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
    { title: 'Conectar', cmd: `adb connect ${safeIp}:5555`, explain: 'Troque o IP pelo da sua TV. A TV precisa autorizar.' },
    { title: 'Conferir', cmd: 'adb devices', explain: 'Mostra se existe dispositivo autorizado conectado.' },
    { title: 'Texto', cmd: `adb shell input text "${safeMessage}"`, explain: 'Envia texto para o campo ativo da TV. Espaços viram %s.' },
    { title: 'OK/Enter', cmd: 'adb shell input keyevent 66', explain: 'Simula o botão OK/Enter.' },
    { title: 'Imagem', cmd: `adb shell am start -a android.intent.action.VIEW -d "${safeImage}"`, explain: 'Pede para a TV abrir o link da imagem.' },
    { title: 'Desconectar', cmd: `adb disconnect ${safeIp}:5555`, explain: 'Fecha a conexão ADB com segurança.' },
  ]
}

export default function App() {
  const [active, setActive] = useState(lessons[0])
  const [done, setDone] = useState<string[]>([])
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [ip, setIp] = useState('192.168.0.15')
  const [message, setMessage] = useState('Salve da THKLAYUS')
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1518779578993-ec3579fee39f')
  const [copied, setCopied] = useState('')

  const commands = useMemo(() => makeCommands(ip, message, imageUrl), [ip, message, imageUrl])
  const progress = Math.round((done.length / lessons.length) * 100)

  async function copy(text: string) {
    await navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(''), 1000)
  }

  function finishLesson() {
    if (!done.includes(active.id)) setDone([...done, active.id])
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-5 py-8">
        <header className="rounded-[36px] border border-purple-500/30 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.35),transparent_35%),linear-gradient(135deg,rgba(24,24,27,0.95),#000)] p-6 shadow-2xl shadow-purple-950/30 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.45em] text-purple-300">THKLAYUS TERMUX ACADEMY</p>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Aprenda Termux fazendo.</h1>
          <p className="mt-4 max-w-3xl text-zinc-300">Nada de só copiar comando. Cada aula explica o motivo, separa o comando em partes, te dá uma missão e pede sua resposta.</p>
          <div className="mt-6 rounded-3xl border border-white/10 bg-black/50 p-5">
            <div className="flex items-center justify-between text-sm text-zinc-300"><span>Progresso real</span><strong>{progress}%</strong></div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800"><div className="h-full bg-purple-500" style={{ width: `${progress}%` }} /></div>
          </div>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <Metric icon={<Terminal />} title="Foco" value="Termux" />
          <Metric icon={<Network />} title="Rede" value="IP/Porta" />
          <Metric icon={<Tv />} title="Prática" value="TV" />
          <Metric icon={<Lock />} title="Regra" value="Autorizado" />
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4">
            <h2 className="px-2 text-xl font-black">Aulas práticas</h2>
            <div className="mt-4 space-y-2">
              {lessons.map((lesson) => (
                <button key={lesson.id} onClick={() => setActive(lesson)} className={`w-full rounded-2xl border p-4 text-left ${active.id === lesson.id ? 'border-purple-500 bg-purple-500/15' : 'border-zinc-800 bg-black'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-300">{lesson.level}</p>
                      <h3 className="mt-1 font-bold">{lesson.title}</h3>
                    </div>
                    {done.includes(lesson.id) && <CheckCircle2 className="text-purple-300" />}
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-300">{active.level}</p>
            <h2 className="mt-2 text-3xl font-black">{active.title}</h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Info icon={<Lightbulb />} title="Por que aprender isso?" text={active.why} />
              <Info icon={<BookOpen />} title="O que você vai entender" text={active.learn} />
            </div>

            <div className="mt-4 rounded-3xl border border-zinc-800 bg-black p-5">
              <h3 className="flex items-center gap-2 font-black text-purple-200"><Play size={18} /> Missão</h3>
              <p className="mt-2 text-zinc-300">{active.mission}</p>
              <CommandBlock title="Comando da missão" command={active.command} copied={copied} onCopy={copy} />
            </div>

            <div className="mt-4 rounded-3xl border border-zinc-800 bg-black p-5">
              <h3 className="font-black text-purple-200">Entenda o comando</h3>
              <div className="mt-3 space-y-3">
                {active.breakdown.map((item) => (
                  <div key={item.part} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3">
                    <code className="text-purple-200">{item.part}</code>
                    <p className="mt-1 text-sm text-zinc-400">{item.means}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-2xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-100">Resultado esperado: {active.expected}</p>
            </div>

            <div className="mt-4 rounded-3xl border border-zinc-800 bg-black p-5">
              <h3 className="font-black text-purple-200">Sua resposta</h3>
              <p className="mt-2 text-sm text-zinc-400">{active.question}</p>
              <textarea value={notes[active.id] || ''} onChange={(e) => setNotes({ ...notes, [active.id]: e.target.value })} className="mt-3 min-h-28 w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 outline-none focus:border-purple-500" placeholder="Escreve aqui o que aconteceu no seu Termux..." />
              <button onClick={finishLesson} className="mt-4 rounded-2xl bg-purple-600 px-5 py-3 font-bold hover:bg-purple-500">Concluir aula</button>
            </div>
          </article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="flex items-center gap-2 text-2xl font-black"><Wifi className="text-purple-300" /> Laboratório da TV</h2>
            <label className="mt-5 block text-sm text-zinc-400">IP da TV</label>
            <input value={ip} onChange={(e) => setIp(e.target.value)} className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black p-4 outline-none focus:border-purple-500" />
            <label className="mt-5 block text-sm text-zinc-400">Mensagem</label>
            <input value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black p-4 outline-none focus:border-purple-500" />
            <label className="mt-5 block text-sm text-zinc-400">Link da imagem</label>
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black p-4 outline-none focus:border-purple-500" />
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-black">Comandos explicados</h2>
            <div className="mt-4 space-y-3">
              {commands.map((item) => <CommandBlock key={item.title} title={`${item.title} — ${item.explain}`} command={item.cmd} copied={copied} onCopy={copy} />)}
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

function Metric({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5"><div className="text-purple-300">{icon}</div><p className="mt-3 text-sm text-zinc-400">{title}</p><strong className="text-2xl">{value}</strong></div>
}

function Info({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="rounded-3xl border border-zinc-800 bg-black p-5"><div className="text-purple-300">{icon}</div><h3 className="mt-3 font-black text-purple-200">{title}</h3><p className="mt-2 text-sm text-zinc-300">{text}</p></div>
}

function CommandBlock({ title, command, copied, onCopy }: { title: string; command: string; copied: string; onCopy: (text: string) => void }) {
  return <div className="mt-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-3"><div className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-purple-300">{title}</div><div className="flex items-center gap-3"><code className="flex-1 overflow-x-auto text-sm text-purple-100">{command}</code><button onClick={() => onCopy(command)} className="rounded-xl bg-purple-600 p-3 hover:bg-purple-500" aria-label="copiar comando">{copied === command ? <CheckCircle2 size={18} /> : <Copy size={18} />}</button></div></div>
}
