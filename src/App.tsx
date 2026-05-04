import { BookOpen, CheckCircle2, ChevronRight, Copy, Lock, Network, Shield, Terminal, Tv, Wifi } from 'lucide-react'
import { useMemo, useState } from 'react'

type Lesson = {
  id: string
  level: string
  title: string
  goal: string
  concept: string
  task: string
  command?: string
  checklist: string[]
}

const lessons: Lesson[] = [
  {
    id: 'rede-01',
    level: 'Iniciante',
    title: 'Entender IP na rede local',
    goal: 'Saber identificar o endereço da sua TV e do seu celular no mesmo Wi‑Fi.',
    concept: 'IP é o endereço de um dispositivo dentro da rede. Sem IP certo, não existe conexão direta.',
    task: 'Abra as configurações de rede da TV e anote o IP. Depois compare com o IP do celular: os três primeiros blocos geralmente devem ser parecidos, tipo 192.168.0.x.',
    checklist: ['Anotei o IP da TV', 'Confirmei que celular e TV estão no mesmo Wi‑Fi', 'Entendi que IP não é senha'],
  },
  {
    id: 'adb-01',
    level: 'Prático',
    title: 'Preparar Termux para ADB',
    goal: 'Instalar a ferramenta que permite conversar com Android TV/Google TV autorizada.',
    concept: 'ADB é uma ponte de desenvolvedor. Ele só deve funcionar quando o dispositivo permite e autoriza.',
    task: 'Instale o pacote android-tools no Termux. Leia a saída do terminal e veja se deu erro.',
    command: 'pkg update && pkg install android-tools -y',
    checklist: ['Abri o Termux', 'Instalei android-tools', 'Não apareceu erro vermelho no final'],
  },
  {
    id: 'tv-01',
    level: 'Prático',
    title: 'Conectar na sua TV',
    goal: 'Fazer uma conexão autorizada entre celular e TV pela rede local.',
    concept: 'A porta 5555 é usada pelo ADB via rede. A TV deve mostrar uma solicitação de autorização.',
    task: 'Ative depuração pela rede na TV, copie o comando gerado no painel e aceite a permissão na tela da TV.',
    command: 'adb connect 192.168.0.15:5555',
    checklist: ['Ativei depuração na TV', 'Executei adb connect', 'A TV pediu autorização', 'Eu autorizei apenas meu celular'],
  },
  {
    id: 'cmd-01',
    level: 'Comando',
    title: 'Enviar comando simples',
    goal: 'Testar se você realmente consegue controlar algo autorizado.',
    concept: 'input text envia texto para o campo ativo. keyevent simula botão do controle remoto.',
    task: 'Abra algum campo de busca na TV e envie uma mensagem curta pelo Termux.',
    command: 'adb shell input text "Salve%sthklayus"',
    checklist: ['Abri um campo de texto na TV', 'Enviei texto por comando', 'Entendi o %s como espaço'],
  },
  {
    id: 'img-01',
    level: 'Automação',
    title: 'Abrir imagem por comando',
    goal: 'Abrir uma imagem pública na sua TV usando um intent do Android.',
    concept: 'Intent é uma intenção do Android. Aqui você pede para a TV abrir uma URL com um app compatível.',
    task: 'Cole um link de imagem no painel, copie o comando gerado e veja qual app da TV abre a imagem.',
    command: 'adb shell am start -a android.intent.action.VIEW -d "https://example.com/imagem.jpg"',
    checklist: ['Usei um link público', 'A TV tentou abrir a imagem', 'Entendi que imagem local do celular precisa ser hospedada ou transferida'],
  },
  {
    id: 'defesa-01',
    level: 'Defesa',
    title: 'Pensar como defensor',
    goal: 'Entender por que autorização, senha forte e WPS desligado protegem seus dispositivos.',
    concept: 'Segurança boa reduz portas abertas, permissões soltas e acessos sem controle.',
    task: 'Faça um checklist do seu Wi‑Fi: senha forte, WPS desligado, painel do roteador com senha própria e dispositivos conhecidos.',
    checklist: ['Sei quais dispositivos são meus', 'Entendi o risco de WPS', 'Entendi por que não deixar depuração ligada sempre'],
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
    { title: 'Preparar Termux', cmd: 'pkg update && pkg install android-tools -y' },
    { title: 'Conectar na TV', cmd: `adb connect ${safeIp}:5555` },
    { title: 'Ver dispositivos autorizados', cmd: 'adb devices' },
    { title: 'Enviar texto', cmd: `adb shell input text "${safeMessage}"` },
    { title: 'Apertar OK/Enter', cmd: 'adb shell input keyevent 66' },
    { title: 'Abrir imagem', cmd: `adb shell am start -a android.intent.action.VIEW -d "${safeImage}"` },
    { title: 'Desconectar', cmd: `adb disconnect ${safeIp}:5555` },
  ]
}

export default function App() {
  const [ip, setIp] = useState('192.168.0.15')
  const [message, setMessage] = useState('Salve da THKLAYUS')
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1518779578993-ec3579fee39f')
  const [activeLesson, setActiveLesson] = useState(lessons[0])
  const [done, setDone] = useState<string[]>([])
  const [copied, setCopied] = useState('')

  const commands = useMemo(() => makeCommands(ip, message, imageUrl), [ip, message, imageUrl])
  const progress = Math.round((done.length / lessons.length) * 100)

  async function copy(text: string) {
    await navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(''), 1200)
  }

  function toggleDone(id: string) {
    setDone((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-5 py-8">
        <header className="rounded-[36px] border border-purple-500/30 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.35),transparent_35%),linear-gradient(135deg,rgba(24,24,27,0.95),#000)] p-6 shadow-2xl shadow-purple-950/30 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.45em] text-purple-300">THKLAYUS SECURITY LAB</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-black leading-tight md:text-6xl">Aprenda fazendo, não copiando.</h1>
              <p className="mt-4 max-w-3xl text-zinc-300">Uma plataforma de estudo guiado para programação, rede local, ADB, TV e segurança defensiva. Cada módulo tem conceito, tarefa, comando e checklist.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/50 p-5">
              <div className="flex items-center justify-between text-sm text-zinc-300"><span>Progresso</span><strong>{progress}%</strong></div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800"><div className="h-full bg-purple-500" style={{ width: `${progress}%` }} /></div>
              <p className="mt-3 text-sm text-zinc-400">{done.length} de {lessons.length} tarefas concluídas</p>
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <Metric icon={<BookOpen />} title="Aulas" value={`${lessons.length}`} />
          <Metric icon={<Network />} title="Rede local" value="IP + porta" />
          <Metric icon={<Tv />} title="TV" value="ADB" />
          <Metric icon={<Lock />} title="Foco" value="Defesa" />
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4">
            <h2 className="px-2 text-xl font-black">Trilha guiada</h2>
            <div className="mt-4 space-y-2">
              {lessons.map((lesson) => {
                const selected = activeLesson.id === lesson.id
                const completed = done.includes(lesson.id)
                return (
                  <button key={lesson.id} onClick={() => setActiveLesson(lesson)} className={`w-full rounded-2xl border p-4 text-left transition ${selected ? 'border-purple-500 bg-purple-500/15' : 'border-zinc-800 bg-black hover:border-zinc-700'}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-300">{lesson.level}</p>
                        <h3 className="mt-1 font-bold">{lesson.title}</h3>
                      </div>
                      {completed ? <CheckCircle2 className="text-purple-300" /> : <ChevronRight className="text-zinc-500" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-300">{activeLesson.level}</p>
            <h2 className="mt-2 text-3xl font-black">{activeLesson.title}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Info title="Objetivo" text={activeLesson.goal} />
              <Info title="Conceito" text={activeLesson.concept} />
            </div>
            <div className="mt-4 rounded-3xl border border-zinc-800 bg-black p-5">
              <h3 className="font-black text-purple-200">Tarefa prática</h3>
              <p className="mt-2 text-zinc-300">{activeLesson.task}</p>
              {activeLesson.command && <CommandBlock title="Comando da aula" command={activeLesson.command} copied={copied} onCopy={copy} />}
            </div>
            <div className="mt-4 rounded-3xl border border-zinc-800 bg-black p-5">
              <h3 className="font-black text-purple-200">Checklist</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                {activeLesson.checklist.map((item) => <li key={item}>✓ {item}</li>)}
              </ul>
              <button onClick={() => toggleDone(activeLesson.id)} className="mt-5 rounded-2xl bg-purple-600 px-5 py-3 font-bold hover:bg-purple-500">
                {done.includes(activeLesson.id) ? 'Marcar como não concluída' : 'Concluir tarefa'}
              </button>
            </div>
          </article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="flex items-center gap-2 text-2xl font-black"><Wifi className="text-purple-300" /> Gerador do laboratório</h2>
            <label className="mt-5 block text-sm text-zinc-400">IP da sua TV</label>
            <input value={ip} onChange={(e) => setIp(e.target.value)} className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black p-4 outline-none focus:border-purple-500" />
            <label className="mt-5 block text-sm text-zinc-400">Texto de teste</label>
            <input value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black p-4 outline-none focus:border-purple-500" />
            <label className="mt-5 block text-sm text-zinc-400">Imagem de exemplo</label>
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black p-4 outline-none focus:border-purple-500" />
            <div className="mt-5 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-100">Use só em dispositivos seus/autorizados. Ao terminar, desconecte o ADB e desligue depuração se não for usar.</div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-black">Comandos seguros</h2>
            <div className="mt-4 space-y-3">
              {commands.map((item) => <CommandBlock key={item.title} title={item.title} command={item.cmd} copied={copied} onCopy={copy} />)}
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

function Info({ title, text }: { title: string; text: string }) {
  return <div className="rounded-3xl border border-zinc-800 bg-black p-5"><h3 className="font-black text-purple-200">{title}</h3><p className="mt-2 text-sm text-zinc-300">{text}</p></div>
}

function CommandBlock({ title, command, copied, onCopy }: { title: string; command: string; copied: string; onCopy: (text: string) => void }) {
  return <div className="mt-3 rounded-2xl border border-zinc-800 bg-black p-3"><div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-purple-300">{title}</div><div className="flex items-center gap-3"><code className="flex-1 overflow-x-auto text-sm text-purple-100">{command}</code><button onClick={() => onCopy(command)} className="rounded-xl bg-purple-600 p-3 hover:bg-purple-500" aria-label="copiar comando">{copied === command ? <CheckCircle2 size={18} /> : <Copy size={18} />}</button></div></div>
}
