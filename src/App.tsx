import { useEffect, useMemo, useState } from 'react'

const familyMothers = ['Mãe', 'Vó', 'Tia', 'Madrinha', 'Prima', 'Irmã', 'Sogra']

const blessings = [
  'Que Deus renove suas forças e coloque paz no seu coração.',
  'Que sua casa seja coberta de amor, sabedoria e proteção.',
  'Que sua fé continue iluminando a nossa família.',
  'Que todo cuidado que você entrega volte em forma de bênção.',
]

const quiz = [
  { question: 'Qual superpoder mais combina com uma mãe da nossa família?', options: ['Multiplicar amor', 'Achar tudo perdido', 'Curar com conselho', 'Perceber tudo sem ninguém falar'], answer: 'Todas estão certas 😭 Mãe tem um pouco de cada superpoder.' },
  { question: 'Na filosofia da família, mãe é...', options: ['Raiz', 'Casa', 'Cuidado', 'Tudo isso junto'], answer: 'Tudo isso junto: raiz, casa, cuidado e oração.' },
]

const cards = [
  { title: 'Bênção', icon: '🙏', text: 'Que o Senhor fortaleça seu coração e guie seus passos com paz.' },
  { title: 'Gratidão', icon: '🌷', text: 'Seu amor fez diferença até nos momentos que ninguém viu.' },
  { title: 'Descanso', icon: '🌙', text: 'Você também merece cuidado. Quem cuida tanto também precisa ser cuidada.' },
  { title: 'Alegria', icon: '✨', text: 'Que Deus transforme seu dia em sorriso sincero e coração leve.' },
]

function useCountdown() {
  const [now, setNow] = useState(Date.now())
  const end = useMemo(() => {
    const saved = localStorage.getItem('amor-em-codigo-end')
    if (saved) return Number(saved)
    const value = Date.now() + 24 * 60 * 60 * 1000
    localStorage.setItem('amor-em-codigo-end', String(value))
    return value
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  const diff = Math.max(0, end - now)
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  const endTime = new Date(end).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  return { hours, minutes, seconds, endTime, ended: diff === 0 }
}

export default function App() {
  const countdown = useCountdown()
  const [started, setStarted] = useState(false)
  const [slide, setSlide] = useState(0)
  const [person, setPerson] = useState('Mãe')
  const [blessingIndex, setBlessingIndex] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [selectedCard, setSelectedCard] = useState(cards[0])

  const slides = useMemo(() => [
    { icon: '🌸', eyebrow: 'Abertura', title: 'Feliz Dia das Mães', content: <><p className="slide-text">Mães são uma das maiores bênçãos da nossa vida. Elas carregam amor quando a gente ainda nem entende o mundo, e sustentam a família com cuidado, fé e presença.</p><p className="verse">“O amor tudo sofre, tudo crê, tudo espera, tudo suporta.” — 1 Coríntios 13:7</p></> },
    { icon: '⏳', eyebrow: 'Tempo especial', title: 'O dia passa, o amor fica', content: <><p className="slide-text">Esta apresentação especial fica em destaque por 24 horas e vai acabar às {countdown.endTime}. Mas Dia das Mães não cabe em uma data.</p><div className="timer-box"><strong>{String(countdown.hours).padStart(2, '0')}</strong><span>h</span><strong>{String(countdown.minutes).padStart(2, '0')}</strong><span>m</span><strong>{String(countdown.seconds).padStart(2, '0')}</strong><span>s</span></div><p className="small-note">A apresentação tem hora para terminar, mas Dia das Mães é todos os dias.</p></> },
    { icon: '🏡', eyebrow: 'Família', title: 'Onde existe mãe, existe casa', content: <><p className="slide-text">Uma família não é feita só de sobrenome. É feita de gente que cuida, perdoa, ora, ensina e permanece. E muitas vezes, esse coração começa em uma mãe.</p><p className="small-note">Mãe é raiz, abrigo e oração em forma de gente.</p></> },
    { icon: '🙏', eyebrow: 'Reflexão', title: `${person} é presença de Deus`, content: <><p className="slide-text">{person}, seu amor não é pequeno. Ele aparece nos detalhes: na preocupação, no conselho, no cuidado silencioso e na força de continuar mesmo cansada.</p><p className="small-note">O mundo chama isso de rotina. A família chama de amor.</p></> },
    { icon: '✨', eyebrow: 'Palavra de fé', title: 'Uma bênção para hoje', content: <><div className="blessing">{blessings[blessingIndex]}</div><button className="primary small" onClick={() => setBlessingIndex((blessingIndex + 1) % blessings.length)}>Sortear outra bênção 🙏</button></> },
    { icon: '🎲', eyebrow: 'Brincadeira', title: 'Quiz das mães da família', content: <><p className="question">{quiz[quizIndex].question}</p><div className="option-grid">{quiz[quizIndex].options.map((option) => <button className="option" key={option} onClick={() => setAnswer(quiz[quizIndex].answer)}>{option}</button>)}</div>{answer && <div className="answer">{answer}</div>}<button className="ghost full" onClick={() => { setAnswer(''); setQuizIndex((quizIndex + 1) % quiz.length) }}>Nova pergunta</button></> },
    { icon: '💌', eyebrow: 'Interativo', title: 'Escolha uma carta', content: <><p className="small-note">Toque em uma carta para receber uma mensagem.</p><div className="card-grid">{cards.map((card) => <button key={card.title} onClick={() => setSelectedCard(card)} className={`gift-card ${selectedCard.title === card.title ? 'active' : ''}`}><span>{card.icon}</span><strong>{card.title}</strong></button>)}</div><div className="answer soft">{selectedCard.text}</div></> },
    { icon: '🕊️', eyebrow: 'Oração', title: 'Uma oração pela família', content: <><p className="slide-text">Senhor, abençoe cada mãe da nossa família. Renove a força, proteja o coração, dê sabedoria nos dias difíceis e alegria nos dias simples.</p><p className="small-note">Que nunca falte amor, união e fé dentro da nossa casa.</p></> },
    { icon: '❤️', eyebrow: 'Encerramento', title: 'Esta homenagem fica guardada', content: <><p className="slide-text">Mãe e família são presentes que a gente não mede em dinheiro. Mede em memória, cuidado, oração e amor.</p><p className="small-note">Esta apresentação acaba às {countdown.endTime}, mas o amor, a honra e a gratidão continuam todos os dias.</p><div className="final-box">Feliz Dia das Mães ❤️</div><button className="ghost full" onClick={() => { setSlide(0); setAnswer('') }}>Ver de novo</button></> },
  ], [person, blessingIndex, quizIndex, answer, selectedCard, countdown])

  const progress = Math.round(((slide + 1) / slides.length) * 100)

  if (!started) return <main className="page"><Background /><section className="deck cover"><div className="ribbon">feito com carinho</div><div className="cover-icon">🌸</div><p className="eyebrow">Presente digital</p><h1>Amor em Código</h1><p className="cover-text">Uma apresentação interativa com carinho, fé, reflexão e brincadeiras para as mães da nossa família.</p><div className="countdown-pill">Acaba às {countdown.endTime} • {String(countdown.hours).padStart(2, '0')}h {String(countdown.minutes).padStart(2, '0')}m restantes</div><p className="small-note">A apresentação tem hora para terminar, mas Dia das Mães é todos os dias.</p><div className="chips">{familyMothers.map((item) => <button key={item} onClick={() => setPerson(item)} className={person === item ? 'chip active' : 'chip'}>{item}</button>)}</div><button className="primary" onClick={() => setStarted(true)}>Começar homenagem 🌸</button></section></main>

  const last = slide === slides.length - 1
  return <main className="page"><Background /><section className="deck"><div className="slide-icon">{slides[slide].icon}</div><div className="top"><div><p className="eyebrow">{slides[slide].eyebrow}</p><h2>{slides[slide].title}</h2></div><span className="counter">{slide + 1}/{slides.length}</span></div><div className="bar"><div style={{ width: `${progress}%` }} /></div><div className="slide-body">{slides[slide].content}</div><div className="nav"><button className="ghost" disabled={slide === 0} onClick={() => setSlide(slide - 1)}>Voltar</button>{!last && <button className="primary" onClick={() => setSlide(slide + 1)}>Continuar</button>}</div></section></main>
}

function Background() {
  return <><div className="bg" /><div className="grid-bg" /><div className="orb orb-a" /><div className="orb orb-b" />{Array.from({ length: 14 }).map((_, i) => <span key={i} className="heart" style={{ left: `${(i * 13) % 100}%`, animationDelay: `${i * .8}s`, animationDuration: `${10 + (i % 5)}s` }}>{i % 3 === 0 ? '🙏' : '🌸'}</span>)}</>
}
