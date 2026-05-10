import { useEffect, useMemo, useState } from 'react'

const qualities = [
  { label: 'Amor', value: '999%' },
  { label: 'Fé', value: 'Firme em Deus' },
  { label: 'Coragem', value: 'Todo dia' },
  { label: 'Sabedoria', value: 'Presente de Deus' },
  { label: 'Cuidado', value: 'Que abraça a família' },
  { label: 'Importância', value: 'Impossível medir' },
]

const cards = [
  { title: 'Benção', icon: '🙏', text: 'Que o Senhor fortaleça seu coração, renove suas forças e guie seus passos com paz.' },
  { title: 'Gratidão', icon: '🌷', text: 'Hoje a família reconhece: seu amor fez diferença em muitos momentos que talvez ninguém tenha visto.' },
  { title: 'Descanso', icon: '🌙', text: 'Você também merece cuidado. Quem cuida tanto também precisa ser cuidada.' },
  { title: 'Alegria', icon: '✨', text: 'Que Deus transforme o seu dia em lembrança boa, sorriso sincero e coração leve.' },
]

const familyMothers = ['Mãe', 'Vó', 'Tia', 'Madrinha', 'Prima', 'Irmã', 'Sogra']

const blessings = [
  'Que Deus renove suas forças.',
  'Que sua casa receba paz.',
  'Que sua fé continue iluminando a família.',
  'Que o amor que você entrega volte em forma de cuidado.',
]

const quiz = [
  { question: 'Qual superpoder mais combina com uma mãe da nossa família?', options: ['Multiplicar amor', 'Achar tudo perdido', 'Curar com conselho', 'Perceber tudo sem ninguém falar'], answer: 'Todas as opções estão certas 😭' },
  { question: 'O que uma mãe carrega que ninguém consegue medir?', options: ['Cansaço', 'Fé', 'Amor', 'Todas'], answer: 'Todas. E mesmo assim ela continua.' },
  { question: 'Na filosofia da família, mãe é...', options: ['Raiz', 'Casa', 'Cuidado', 'Tudo isso junto'], answer: 'Tudo isso junto: raiz, casa e cuidado.' },
]

function TypeText({ text, speed = 18 }: { text: string; speed?: number }) {
  const [current, setCurrent] = useState('')

  useEffect(() => {
    setCurrent('')
    let i = 0
    const timer = setInterval(() => {
      setCurrent(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(timer)
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return <span>{current}</span>
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState(cards[0])
  const [person, setPerson] = useState('Mãe')
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState('')
  const [blessing, setBlessing] = useState(blessings[0])

  const totalSteps = 6
  const progress = useMemo(() => Math.round(((step + 1) / totalSteps) * 100), [step])
  const currentQuiz = quiz[quizIndex]

  function nextBlessing() {
    const index = blessings.indexOf(blessing)
    setBlessing(blessings[(index + 1) % blessings.length])
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07040a] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,207,232,0.30),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.28),transparent_36%),linear-gradient(135deg,#120715,#07040a_55%,#140818)]" />
      <div className="pointer-events-none fixed inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="heart" style={{ left: `${(i * 11) % 100}%`, animationDelay: `${i * 0.55}s`, animationDuration: `${8 + (i % 6)}s` }}>{i % 3 === 0 ? '🙏' : '❤️'}</span>
        ))}
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-5 sm:px-5 sm:py-8">
        {!opened ? (
          <div className="card-shine w-full rounded-[1.8rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-pink-950/40 backdrop-blur-xl sm:rounded-[2.2rem] sm:p-8 md:p-10">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-pink-200 sm:text-xs sm:tracking-[0.35em]">Presente digital para as mães da família</p>
            <h1 className="glow-text mt-4 text-4xl font-black leading-none sm:text-6xl md:text-8xl">Amor em Código</h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-pink-50/85 sm:text-lg md:text-2xl">Uma homenagem com carinho, fé, brincadeira e gratidão para todas as mulheres que cuidam, ensinam e mantêm a família de pé.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {familyMothers.map((item) => <button key={item} onClick={() => setPerson(item)} className={`rounded-full border px-4 py-2 text-sm font-bold sm:text-base ${person === item ? 'border-pink-200 bg-pink-200 text-pink-950' : 'border-white/15 bg-black/25 text-white'}`}>{item}</button>)}
            </div>
            <button onClick={() => setOpened(true)} className="mt-8 w-full rounded-full bg-white px-7 py-4 font-black text-pink-700 shadow-xl shadow-pink-950/30 transition active:scale-95 sm:w-auto sm:hover:scale-105">Abrir homenagem 🎁</button>
          </div>
        ) : (
          <div className="w-full rounded-[1.8rem] border border-white/15 bg-black/35 p-4 shadow-2xl shadow-pink-950/40 backdrop-blur-xl sm:rounded-[2.2rem] sm:p-6 md:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-pink-200 sm:text-xs sm:tracking-[0.3em]">Homenagem da família</p><h2 className="mt-2 text-2xl font-black sm:text-3xl md:text-5xl">Feliz Dia das Mães 🌸</h2></div>
              <div className="rounded-full border border-pink-200/30 px-3 py-2 text-xs text-pink-100 sm:text-sm">{progress}%</div>
            </div>
            <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-pink-200 to-fuchsia-300 transition-all duration-500" style={{ width: `${progress}%` }} /></div>

            {step === 0 && <Panel title="Mensagem inicial"><p className="text-lg leading-relaxed text-white/90 sm:text-2xl md:text-3xl"><TypeText text={`${person}, hoje a homenagem é para lembrar que mãe não é apenas presença: é raiz, abrigo e oração em forma de gente.`} /></p><p className="mt-5 text-base text-pink-100/80 sm:text-lg">Que Deus abençoe cada mãe da nossa família com força, paz e alegria.</p></Panel>}

            {step === 1 && <Panel title="Análise da família"><div className="grid gap-3 sm:grid-cols-2">{qualities.map((item) => <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg shadow-pink-950/10"><p className="text-sm text-pink-100/70">✔ {item.label}</p><strong className="text-xl text-white sm:text-2xl">{item.value}</strong></div>)}</div></Panel>}

            {step === 2 && <Panel title="Palavra de fé"><p className="text-2xl leading-relaxed text-white/90 sm:text-3xl md:text-4xl">“Honra teu pai e tua mãe.”</p><p className="mt-3 text-pink-100/80">Êxodo 20:12</p><div className="mt-6 rounded-3xl border border-pink-200/30 bg-black/30 p-5 text-lg text-pink-50 sm:text-2xl">{blessing}</div><button onClick={nextBlessing} className="mt-5 w-full rounded-full bg-pink-300 px-5 py-3 font-black text-pink-950 sm:w-auto">Sortear outra bênção 🙏</button></Panel>}

            {step === 3 && <Panel title="Brincadeira rápida"><p className="mb-5 text-lg font-bold leading-relaxed text-white/90 sm:text-2xl">{currentQuiz.question}</p><div className="grid gap-3 sm:grid-cols-2">{currentQuiz.options.map((option) => <button key={option} onClick={() => setQuizAnswer(currentQuiz.answer)} className="rounded-2xl border border-pink-200/20 bg-white/10 p-4 text-left text-base font-bold text-white shadow-lg shadow-pink-950/10 transition active:scale-[0.98] sm:rounded-3xl sm:text-lg sm:hover:scale-[1.02]">{option}</button>)}</div>{quizAnswer && <div className="mt-5 rounded-3xl bg-white p-5 text-lg font-black text-pink-700 shadow-xl sm:text-xl">{quizAnswer}</div>}<button onClick={() => { setQuizAnswer(''); setQuizIndex((quizIndex + 1) % quiz.length) }} className="mt-5 w-full rounded-full border border-white/15 px-5 py-3 font-bold text-white/80 sm:w-auto">Próxima pergunta</button></Panel>}

            {step === 4 && <Panel title="Cartas para o coração"><p className="mb-5 text-base text-white/80 sm:text-lg">Escolha uma carta para receber uma mensagem:</p><div className="grid grid-cols-2 gap-3 md:grid-cols-4">{cards.map((card) => <button key={card.title} onClick={() => setSelected(card)} className={`rounded-2xl border p-4 text-left transition active:scale-95 sm:rounded-3xl sm:p-5 ${selected.title === card.title ? 'border-pink-200 bg-pink-200 text-pink-950' : 'border-white/10 bg-white/10 text-white'}`}><div className="text-2xl sm:text-3xl">{card.icon}</div><strong className="mt-2 block text-lg sm:text-2xl">{card.title}</strong><p className="mt-1 text-xs opacity-80 sm:text-sm">Toque para revelar</p></button>)}</div><div className="mt-5 rounded-3xl border border-pink-200/30 bg-black/30 p-5 text-lg text-pink-50 sm:text-2xl">{selected.text}</div></Panel>}

            {step === 5 && <Panel title="Mensagem final"><p className="text-lg leading-relaxed text-white/90 sm:text-2xl md:text-3xl">Para todas as mães da nossa família: que Deus recompense cada cuidado silencioso, cada oração feita no secreto e cada gesto de amor que sustentou a nossa casa.</p><p className="mt-6 text-base text-pink-100/90 sm:text-2xl">O tempo passa, a família cresce, as fases mudam. Mas o amor de mãe continua sendo um dos jeitos mais bonitos de Deus ensinar cuidado.</p><div className="mt-7 rounded-3xl bg-white p-5 text-center text-2xl font-black text-pink-700 md:text-4xl">Feliz Dia das Mães ❤️</div></Panel>}

            <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">{step > 0 && <button onClick={() => setStep(step - 1)} className="rounded-full border border-white/15 px-5 py-3 font-bold text-white/80">Voltar</button>}<button onClick={() => setStep(Math.min(totalSteps - 1, step + 1))} className="rounded-full bg-pink-300 px-6 py-3 font-black text-pink-950 transition active:scale-95 sm:hover:scale-105">{step === totalSteps - 1 ? 'Finalizado ❤️' : 'Continuar'}</button></div>
          </div>
        )}
      </section>
    </main>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="min-h-[360px] rounded-[1.5rem] border border-white/10 bg-white/10 p-4 sm:min-h-[430px] sm:rounded-[2rem] sm:p-6 md:min-h-[480px] md:p-8"><p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-pink-200 sm:mb-5 sm:text-xs sm:tracking-[0.28em]">{title}</p>{children}</section>
}
