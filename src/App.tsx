import { useEffect, useMemo, useState } from 'react'

const qualities = [
  { label: 'Força', value: '100%' },
  { label: 'Amor', value: '999%' },
  { label: 'Coragem', value: '100%' },
  { label: 'Orgulho', value: 'Infinito ❤️' },
  { label: 'Carinho', value: 'Eterno' },
  { label: 'Importância', value: 'Impossível medir' },
]

const cards = [
  {
    title: 'Orgulho',
    text: 'Prêmio desbloqueado: orgulho infinito do seu filho ❤️',
  },
  {
    title: 'Descanso',
    text: 'Você cuida de tanta gente. Hoje, lembra também de cuidar de você.',
  },
  {
    title: 'Vitória',
    text: 'Cada aula, cada atendimento e cada esforço seu contam. Você está construindo algo lindo.',
  },
]

function TypeText({ text, speed = 28 }: { text: string; speed?: number }) {
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

  const progress = useMemo(() => Math.min(100, (step + 1) * 25), [step])

  return (
    <main className="min-h-screen overflow-hidden bg-[#07040a] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.24),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.26),transparent_35%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:42px_42px]" />

      <section className="relative mx-auto flex min-h-screen max-w-5xl items-center px-5 py-8">
        {!opened ? (
          <div className="w-full rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl shadow-pink-950/40 backdrop-blur-xl md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-pink-200">Presente digital</p>
            <h1 className="mt-5 text-5xl font-black leading-none md:text-8xl">MÃE</h1>
            <p className="mt-5 max-w-2xl text-lg text-pink-50/80 md:text-2xl">
              Fiz isso usando um pouco do que estou aprendendo em programação.
              Não é caro, mas foi feito com carinho.
            </p>
            <button onClick={() => setOpened(true)} className="mt-8 rounded-full bg-white px-7 py-4 font-black text-pink-700 shadow-xl shadow-pink-950/30 transition hover:scale-105">
              Abrir surpresa 🎁
            </button>
          </div>
        ) : (
          <div className="w-full rounded-[2rem] border border-white/15 bg-black/35 p-5 shadow-2xl shadow-pink-950/40 backdrop-blur-xl md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-pink-200">Sistema de homenagem</p>
                <h2 className="mt-2 text-2xl font-black md:text-4xl">Feliz Dia das Mães 🌸</h2>
              </div>
              <div className="hidden rounded-full border border-pink-200/30 px-4 py-2 text-sm text-pink-100 md:block">{progress}% carinho</div>
            </div>

            <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-pink-300 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            {step === 0 && (
              <Panel title="Mensagem inicial">
                <p className="text-xl leading-relaxed text-white/90 md:text-3xl">
                  <TypeText text="Hoje é dia de homenagear uma mulher que não apenas cuida de mim, mas também cuida de vidas." />
                </p>
                <p className="mt-5 text-pink-100/80">Mãe, estudante, fisioterapeuta e dona do próprio caminho.</p>
              </Panel>
            )}

            {step === 1 && (
              <Panel title="Analisando sua jornada...">
                <div className="grid gap-3 md:grid-cols-2">
                  {qualities.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                      <p className="text-sm text-pink-100/70">✔ {item.label}</p>
                      <strong className="text-2xl text-white">{item.value}</strong>
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {step === 2 && (
              <Panel title="Agora é sua vez, mãe">
                <p className="mb-5 text-lg text-white/80">Escolha uma carta para guardar no coração hoje:</p>
                <div className="grid gap-3 md:grid-cols-3">
                  {cards.map((card) => (
                    <button key={card.title} onClick={() => setSelected(card)} className={`rounded-3xl border p-5 text-left transition hover:scale-[1.02] ${selected.title === card.title ? 'border-pink-200 bg-pink-200 text-pink-950' : 'border-white/10 bg-white/10 text-white'}`}>
                      <strong className="text-2xl">{card.title}</strong>
                      <p className="mt-3 text-sm opacity-80">Toque para revelar</p>
                    </button>
                  ))}
                </div>
                <div className="mt-5 rounded-3xl border border-pink-200/30 bg-black/30 p-5 text-xl text-pink-50">
                  {selected.text}
                </div>
              </Panel>
            )}

            {step === 3 && (
              <Panel title="Mensagem final">
                <p className="text-xl leading-relaxed text-white/90 md:text-3xl">
                  Mãe, talvez eu ainda não consiga retribuir tudo. Mas eu consigo reconhecer: você é exemplo de amor, coragem e propósito.
                </p>
                <p className="mt-6 text-lg text-pink-100/90">
                  Na fisioterapia, você ajuda pessoas a se levantarem. Na vida, você me ensina a continuar de pé.
                </p>
                <div className="mt-7 rounded-3xl bg-white p-5 text-center text-2xl font-black text-pink-700">
                  Eu tenho orgulho de você ❤️
                </div>
              </Panel>
            )}

            <div className="mt-6 flex gap-3">
              {step > 0 && <button onClick={() => setStep(step - 1)} className="rounded-full border border-white/15 px-5 py-3 font-bold text-white/80">Voltar</button>}
              <button onClick={() => setStep(Math.min(3, step + 1))} className="rounded-full bg-pink-300 px-6 py-3 font-black text-pink-950 transition hover:scale-105">
                {step === 3 ? 'Finalizado ❤️' : 'Continuar'}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="min-h-[420px] rounded-[2rem] border border-white/10 bg-white/10 p-5 md:p-8">
      <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-pink-200">{title}</p>
      {children}
    </section>
  )
}
